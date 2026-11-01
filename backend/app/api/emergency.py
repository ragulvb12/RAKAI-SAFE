from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from typing import Optional
from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.incident import EmergencyIncident, IncidentStatus, LocationSharingSession
from app.schemas.incident import (
    IncidentTriggerRequest,
    IncidentResponse,
    IncidentLocationUpdate,
    LocationShareSessionCreate,
    LocationShareSessionResponse
)
from app.services.emergency_service import EmergencyService

router = APIRouter(prefix="/emergency", tags=["Emergency Services"])

@router.post("/trigger", response_model=IncidentResponse, status_code=status.HTTP_201_CREATED)
def trigger_sos(
    payload: IncidentTriggerRequest,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    incident = EmergencyService.trigger_sos(
        db=db,
        user=current_user,
        mode=payload.mode,
        latitude=payload.latitude,
        longitude=payload.longitude,
        accuracy_meters=payload.accuracy_meters,
        jurisdiction=payload.jurisdiction,
        ip_address=request.client.host if request.client else None
    )
    return IncidentResponse.model_validate(incident)

@router.get("/active", response_model=Optional[IncidentResponse])
def get_active_incident(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    incident = db.query(EmergencyIncident).filter(
        EmergencyIncident.user_id == current_user.id,
        EmergencyIncident.status.in_([IncidentStatus.ACTIVE, IncidentStatus.ACKNOWLEDGED, IncidentStatus.DISPATCHED, IncidentStatus.ON_SCENE])
    ).first()
    return IncidentResponse.model_validate(incident) if incident else None

@router.put("/location", response_model=IncidentResponse)
@router.post("/location", response_model=IncidentResponse)
def update_emergency_location(
    location_in: IncidentLocationUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    incident = db.query(EmergencyIncident).filter(
        EmergencyIncident.user_id == current_user.id,
        EmergencyIncident.status.in_([IncidentStatus.ACTIVE, IncidentStatus.ACKNOWLEDGED, IncidentStatus.DISPATCHED, IncidentStatus.ON_SCENE])
    ).first()
    
    if not incident:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active emergency session found to update location."
        )

    updated = EmergencyService.update_incident_location(
        db=db,
        incident_id=incident.id,
        latitude=location_in.latitude,
        longitude=location_in.longitude,
        accuracy=location_in.accuracy
    )
    return IncidentResponse.model_validate(updated)

@router.post("/end", response_model=IncidentResponse)
def end_emergency(
    notes: Optional[str] = "User terminated distress session.",
    request: Request = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    incident = db.query(EmergencyIncident).filter(
        EmergencyIncident.user_id == current_user.id,
        EmergencyIncident.status.in_([IncidentStatus.ACTIVE, IncidentStatus.ACKNOWLEDGED, IncidentStatus.DISPATCHED, IncidentStatus.ON_SCENE])
    ).first()

    if not incident:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active emergency session found."
        )

    resolved = EmergencyService.resolve_incident(
        db=db,
        incident_id=incident.id,
        resolver_id=current_user.id,
        status=IncidentStatus.RESOLVED,
        notes=notes,
        ip_address=request.client.host if request and request.client else None
    )
    return IncidentResponse.model_validate(resolved)

# Consent-based live location sharing with expiring token
@router.post("/share-location", response_model=LocationShareSessionResponse)
def create_location_share(
    payload: LocationShareSessionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=payload.duration_minutes)
    session = LocationSharingSession(
        user_id=current_user.id,
        current_latitude=payload.current_latitude,
        current_longitude=payload.current_longitude,
        expires_at=expires_at,
        is_active=True
    )
    db.add(session)
    db.commit()
    db.refresh(session)

    share_url = f"/track/{session.token}"
    return LocationShareSessionResponse(
        id=session.id,
        token=session.token,
        share_url=share_url,
        expires_at=session.expires_at,
        is_active=session.is_active
    )

@router.get("/track/{token}")
def get_shared_location(token: str, db: Session = Depends(get_db)):
    session = db.query(LocationSharingSession).filter(
        LocationSharingSession.token == token,
        LocationSharingSession.is_active == True
    ).first()
    
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Location link is invalid or expired.")

    if session.expires_at.replace(tzinfo=timezone.utc) < datetime.now(timezone.utc):
        session.is_active = False
        db.commit()
        raise HTTPException(status_code=status.HTTP_410_GONE, detail="Location link has expired.")

    user = db.query(User).filter(User.id == session.user_id).first()
    return {
        "user_name": user.name if user else "Protected User",
        "latitude": session.current_latitude,
        "longitude": session.current_longitude,
        "expires_at": session.expires_at
    }
