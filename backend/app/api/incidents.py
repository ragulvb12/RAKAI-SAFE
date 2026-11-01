from fastapi import APIRouter, Depends, HTTPException, status, Request, Query
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from typing import List, Optional
from app.db.session import get_db
from app.api.deps import get_current_police_or_admin
from app.models.user import User, UserRole
from app.models.incident import EmergencyIncident, IncidentStatus
from app.schemas.incident import IncidentResponse, IncidentStatusUpdate, IncidentAssignRequest
from app.services.emergency_service import EmergencyService
from app.services.audit_service import AuditService

router = APIRouter(prefix="/incidents", tags=["Police & Authority Incidents Queue"])

@router.get("", response_model=List[IncidentResponse])
def list_incidents(
    status_filter: Optional[str] = Query(None, alias="status"),
    jurisdiction_filter: Optional[str] = Query(None, alias="jurisdiction"),
    current_officer: User = Depends(get_current_police_or_admin),
    db: Session = Depends(get_db)
):
    query = db.query(EmergencyIncident)

    # Role-based jurisdiction restriction:
    # Police officers are restricted to their assigned jurisdiction unless ADMIN or assigned jurisdiction is null
    if current_officer.role == UserRole.POLICE and current_officer.jurisdiction:
        query = query.filter(EmergencyIncident.jurisdiction == current_officer.jurisdiction)
    elif jurisdiction_filter:
        query = query.filter(EmergencyIncident.jurisdiction == jurisdiction_filter)

    if status_filter:
        query = query.filter(EmergencyIncident.status == status_filter)

    incidents = query.order_by(EmergencyIncident.created_at.desc()).all()
    return [IncidentResponse.model_validate(inc) for inc in incidents]


@router.get("/{incident_id}", response_model=IncidentResponse)
def get_incident_detail(
    incident_id: str,
    current_officer: User = Depends(get_current_police_or_admin),
    db: Session = Depends(get_db)
):
    incident = db.query(EmergencyIncident).filter(EmergencyIncident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incident record not found")

    # Enforce jurisdiction check for police
    if current_officer.role == UserRole.POLICE and current_officer.jurisdiction:
        if incident.jurisdiction and incident.jurisdiction != current_officer.jurisdiction:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access outside assigned jurisdiction.")

    return IncidentResponse.model_validate(incident)


@router.put("/{incident_id}/status", response_model=IncidentResponse)
def update_incident_status(
    incident_id: str,
    payload: IncidentStatusUpdate,
    request: Request,
    current_officer: User = Depends(get_current_police_or_admin),
    db: Session = Depends(get_db)
):
    incident = db.query(EmergencyIncident).filter(EmergencyIncident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incident not found")

    old_status = incident.status
    incident.status = payload.status

    if payload.status == IncidentStatus.ACKNOWLEDGED and not incident.acknowledged_at:
        incident.acknowledged_at = datetime.now(timezone.utc)
        incident.assigned_police_id = current_officer.id
    elif payload.status in [IncidentStatus.RESOLVED, IncidentStatus.FALSE_ALARM] and not incident.resolved_at:
        incident.resolved_at = datetime.now(timezone.utc)

    if payload.responder_notes:
        timestamp_str = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
        note_entry = f"[{timestamp_str} | Officer {current_officer.name} ({payload.status})]: {payload.responder_notes}"
        incident.responder_notes = f"{incident.responder_notes or ''}\n{note_entry}".strip()

    db.commit()
    db.refresh(incident)

    AuditService.log_event(
        db=db,
        action="INCIDENT_STATUS_CHANGE",
        resource_type="INCIDENT",
        user_id=current_officer.id,
        resource_id=incident.id,
        details=f"Status changed from {old_status} to {payload.status}. Notes: {payload.responder_notes or 'None'}",
        ip_address=request.client.host if request.client else None
    )

    return IncidentResponse.model_validate(incident)


@router.put("/{incident_id}/assign", response_model=IncidentResponse)
def assign_incident(
    incident_id: str,
    payload: IncidentAssignRequest,
    request: Request,
    current_officer: User = Depends(get_current_police_or_admin),
    db: Session = Depends(get_db)
):
    incident = db.query(EmergencyIncident).filter(EmergencyIncident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incident not found")

    assignee = db.query(User).filter(User.id == payload.police_id, User.role.in_([UserRole.POLICE, UserRole.ADMIN])).first()
    if not assignee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Assigned officer not found")

    incident.assigned_police_id = assignee.id
    incident.status = IncidentStatus.DISPATCHED
    db.commit()
    db.refresh(incident)

    AuditService.log_event(
        db=db,
        action="INCIDENT_ASSIGNED",
        resource_type="INCIDENT",
        user_id=current_officer.id,
        resource_id=incident.id,
        details=f"Assigned to officer {assignee.name} (Badge: {assignee.badge_number or 'N/A'})",
        ip_address=request.client.host if request.client else None
    )

    return IncidentResponse.model_validate(incident)
