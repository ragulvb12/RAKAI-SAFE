from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import hash_password, verify_password, create_access_token
from app.models.user import User, UserRole
from app.schemas.user import UserRegister, UserLogin, UserResponse, TokenResponse, UserProfileUpdate
from app.api.deps import get_current_user
from app.services.audit_service import AuditService

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(user_in: UserRegister, request: Request, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists."
        )
    
    # Restrict direct registration of ADMIN or POLICE roles via public endpoint
    role = UserRole.USER
    if user_in.role in [UserRole.POLICE, UserRole.ADMIN]:
        # Only allow if no admin exists yet (bootstrap)
        admin_count = db.query(User).filter(User.role == UserRole.ADMIN).count()
        if admin_count == 0 and user_in.role == UserRole.ADMIN:
            role = UserRole.ADMIN
        else:
            role = UserRole.USER

    user = User(
        name=user_in.name,
        email=user_in.email,
        phone=user_in.phone,
        hashed_password=hash_password(user_in.password),
        role=role,
        jurisdiction=user_in.jurisdiction,
        badge_number=user_in.badge_number
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    AuditService.log_event(
        db=db,
        action="USER_REGISTERED",
        resource_type="USER",
        user_id=user.id,
        details=f"User {user.email} registered with role {user.role}",
        ip_address=request.client.host if request.client else None
    )

    token = create_access_token(subject=user.id, role=user.role)
    return TokenResponse(access_token=token, user=UserResponse.model_validate(user))


@router.post("/login", response_model=TokenResponse)
def login(login_in: UserLogin, request: Request, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_in.email).first()
    if not user or not verify_password(login_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated. Please contact support."
        )

    AuditService.log_event(
        db=db,
        action="USER_LOGIN",
        resource_type="USER",
        user_id=user.id,
        details=f"User {user.email} logged in ({user.role})",
        ip_address=request.client.host if request.client else None
    )

    token = create_access_token(subject=user.id, role=user.role)
    return TokenResponse(access_token=token, user=UserResponse.model_validate(user))


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return UserResponse.model_validate(current_user)


@router.put("/me", response_model=UserResponse)
def update_me(
    profile_in: UserProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if profile_in.name is not None:
        current_user.name = profile_in.name
    if profile_in.phone is not None:
        current_user.phone = profile_in.phone
    if profile_in.jurisdiction is not None and current_user.role in [UserRole.POLICE, UserRole.ADMIN]:
        current_user.jurisdiction = profile_in.jurisdiction
    
    db.commit()
    db.refresh(current_user)
    return UserResponse.model_validate(current_user)
