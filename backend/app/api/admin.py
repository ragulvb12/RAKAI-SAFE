from fastapi import APIRouter, Depends, HTTPException, status, Request, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.api.deps import get_current_admin
from app.models.user import User, UserRole
from app.models.incident import EmergencyIncident, IncidentStatus
from app.models.infrastructure import InfrastructurePlace, StreetlightSegment
from app.models.audit import NotificationLog, AuditEvent, NotificationStatus
from app.schemas.user import UserResponse, UserRegister
from app.schemas.infrastructure import PlaceCreate, PlaceResponse, StreetlightCreate, StreetlightResponse
from app.schemas.audit import AuditEventResponse, NotificationLogResponse, SystemStatsResponse
from app.core.security import hash_password
from app.services.audit_service import AuditService

router = APIRouter(prefix="/admin", tags=["System Administration Portal"])

@router.get("/stats", response_model=SystemStatsResponse)
def get_system_stats(
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    total_users = db.query(User).count()
    police_count = db.query(User).filter(User.role == UserRole.POLICE).count()
    total_incidents = db.query(EmergencyIncident).count()
    active_incidents = db.query(EmergencyIncident).filter(
        EmergencyIncident.status.in_([IncidentStatus.ACTIVE, IncidentStatus.ACKNOWLEDGED, IncidentStatus.DISPATCHED])
    ).count()
    resolved_incidents = db.query(EmergencyIncident).filter(
        EmergencyIncident.status == IncidentStatus.RESOLVED
    ).count()
    verified_places = db.query(InfrastructurePlace).filter(InfrastructurePlace.is_verified == True).count()
    total_streetlights = db.query(StreetlightSegment).count()
    
    total_notifications = db.query(NotificationLog).count()
    delivered_notifications = db.query(NotificationLog).filter(
        NotificationLog.status == NotificationStatus.DELIVERED
    ).count()
    delivery_rate = round((delivered_notifications / total_notifications * 100), 1) if total_notifications > 0 else 100.0

    return SystemStatsResponse(
        total_users=total_users,
        total_incidents=total_incidents,
        active_incidents=active_incidents,
        resolved_incidents=resolved_incidents,
        police_officers=police_count,
        verified_safe_places=verified_places,
        total_streetlights=total_streetlights,
        sms_delivery_rate=delivery_rate
    )


@router.get("/users", response_model=List[UserResponse])
def list_users(
    role_filter: Optional[str] = Query(None, alias="role"),
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    query = db.query(User)
    if role_filter:
        query = query.filter(User.role == role_filter)
    users = query.order_by(User.created_at.desc()).all()
    return [UserResponse.model_validate(u) for u in users]


@router.post("/users/police", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_police_officer(
    payload: UserRegister,
    request: Request,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered.")

    officer = User(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        hashed_password=hash_password(payload.password),
        role=UserRole.POLICE,
        jurisdiction=payload.jurisdiction or "Central Zone",
        badge_number=payload.badge_number or "TN-POL-001",
        is_active=True
    )
    db.add(officer)
    db.commit()
    db.refresh(officer)

    AuditService.log_event(
        db=db,
        action="POLICE_ACCOUNT_CREATED",
        resource_type="USER",
        user_id=admin.id,
        resource_id=officer.id,
        details=f"Admin {admin.email} provisioned police officer {officer.email} ({officer.jurisdiction})",
        ip_address=request.client.host if request.client else None
    )
    return UserResponse.model_validate(officer)


@router.put("/users/{user_id}/status", response_model=UserResponse)
def toggle_user_status(
    user_id: str,
    active: bool,
    request: Request,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    user.is_active = active
    db.commit()
    db.refresh(user)

    AuditService.log_event(
        db=db,
        action="USER_STATUS_TOGGLED",
        resource_type="USER",
        user_id=admin.id,
        resource_id=user.id,
        details=f"Admin set user {user.email} active status to {active}",
        ip_address=request.client.host if request.client else None
    )
    return UserResponse.model_validate(user)


# Infrastructure Management
@router.post("/places", response_model=PlaceResponse, status_code=status.HTTP_201_CREATED)
def add_place(
    payload: PlaceCreate,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    place = InfrastructurePlace(
        category=payload.category,
        name=payload.name,
        name_tamil=payload.name_tamil,
        address=payload.address,
        phone=payload.phone,
        latitude=payload.latitude,
        longitude=payload.longitude,
        jurisdiction=payload.jurisdiction,
        is_verified=payload.is_verified,
        verified_by_admin_id=admin.id,
        operating_hours=payload.operating_hours
    )
    db.add(place)
    db.commit()
    db.refresh(place)
    return PlaceResponse.model_validate(place)


@router.post("/streetlights", response_model=StreetlightResponse, status_code=status.HTTP_201_CREATED)
def add_streetlight(
    payload: StreetlightCreate,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    seg = StreetlightSegment(
        street_name=payload.street_name,
        jurisdiction=payload.jurisdiction,
        start_latitude=payload.start_latitude,
        start_longitude=payload.start_longitude,
        end_latitude=payload.end_latitude,
        end_longitude=payload.end_longitude,
        lighting_status=payload.lighting_status,
        total_lights=payload.total_lights,
        functional_lights=payload.functional_lights,
        is_verified=payload.is_verified,
        source="Authority Inspection"
    )
    db.add(seg)
    db.commit()
    db.refresh(seg)
    return StreetlightResponse.model_validate(seg)


# Notification & Audit Logs
@router.get("/notifications", response_model=List[NotificationLogResponse])
def get_notification_logs(
    limit: int = Query(50, le=200),
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    logs = db.query(NotificationLog).order_by(NotificationLog.created_at.desc()).limit(limit).all()
    return [NotificationLogResponse.model_validate(log) for log in logs]


@router.get("/audit", response_model=List[AuditEventResponse])
def get_audit_logs(
    limit: int = Query(50, le=200),
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    events = db.query(AuditEvent).order_by(AuditEvent.created_at.desc()).limit(limit).all()
    return [AuditEventResponse.model_validate(ev) for ev in events]
