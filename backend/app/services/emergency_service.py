from datetime import datetime, timezone, timedelta
from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.incident import EmergencyIncident, IncidentLocationSnapshot, IncidentStatus
from app.models.user import User, EmergencyContact
from app.models.audit import NotificationLog
from app.services.notification_service import NotificationService
from app.services.audit_service import AuditService

class EmergencyService:
    @staticmethod
    def trigger_sos(
        db: Session,
        user: User,
        mode: str,
        latitude: float,
        longitude: float,
        accuracy_meters: float = 10.0,
        jurisdiction: Optional[str] = "Central Zone",
        ip_address: Optional[str] = None
    ) -> EmergencyIncident:
        # Check if an active incident already exists for this user; resolve prior if needed
        existing = db.query(EmergencyIncident).filter(
            EmergencyIncident.user_id == user.id,
            EmergencyIncident.status.in_([IncidentStatus.ACTIVE, IncidentStatus.ACKNOWLEDGED, IncidentStatus.DISPATCHED])
        ).first()

        should_dispatch_sms = True
        if existing:
            existing.current_latitude = latitude
            existing.current_longitude = longitude
            existing.accuracy_meters = accuracy_meters
            db.commit()
            db.refresh(existing)
            incident = existing

            # Prevent duplicate SMS flooding: require at least 60s cooldown for re-dispatch on same incident
            last_sms = db.query(NotificationLog).filter(
                NotificationLog.incident_id == existing.id
            ).order_by(NotificationLog.created_at.desc()).first()

            if last_sms and last_sms.created_at:
                last_time = last_sms.created_at
                if last_time.tzinfo is None:
                    last_time = last_time.replace(tzinfo=timezone.utc)
                if (datetime.now(timezone.utc) - last_time).total_seconds() < 60:
                    should_dispatch_sms = False
        else:
            incident = EmergencyIncident(
                user_id=user.id,
                mode=mode,
                status=IncidentStatus.ACTIVE,
                initial_latitude=latitude,
                initial_longitude=longitude,
                current_latitude=latitude,
                current_longitude=longitude,
                accuracy_meters=accuracy_meters,
                jurisdiction=jurisdiction or "Central Zone",
                created_at=datetime.now(timezone.utc)
            )
            db.add(incident)
            db.commit()
            db.refresh(incident)

        # Record location snapshot
        snapshot = IncidentLocationSnapshot(
            incident_id=incident.id,
            latitude=latitude,
            longitude=longitude,
            accuracy=accuracy_meters
        )
        db.add(snapshot)
        db.commit()

        # Dispatch confirmed notifications to all user emergency contacts if not rate-limited
        if should_dispatch_sms:
            contacts = db.query(EmergencyContact).filter(EmergencyContact.user_id == user.id).all()
            NotificationService.dispatch_emergency_notifications(db, incident, user, contacts)

        db.refresh(incident)

        # Audit event
        AuditService.log_event(
            db=db,
            action="SOS_TRIGGERED",
            resource_type="INCIDENT",
            user_id=user.id,
            resource_id=incident.id,
            details=f"Distress mode: {mode} at {latitude:.5f}, {longitude:.5f} (SMS Dispatched: {should_dispatch_sms})",
            ip_address=ip_address
        )

        return incident

    @staticmethod
    def update_incident_location(
        db: Session,
        incident_id: str,
        latitude: float,
        longitude: float,
        accuracy: float = 10.0
    ) -> Optional[EmergencyIncident]:
        incident = db.query(EmergencyIncident).filter(EmergencyIncident.id == incident_id).first()
        if not incident:
            return None

        incident.current_latitude = latitude
        incident.current_longitude = longitude
        incident.accuracy_meters = accuracy

        snapshot = IncidentLocationSnapshot(
            incident_id=incident.id,
            latitude=latitude,
            longitude=longitude,
            accuracy=accuracy
        )
        db.add(snapshot)
        db.commit()
        db.refresh(incident)
        return incident

    @staticmethod
    def resolve_incident(
        db: Session,
        incident_id: str,
        resolver_id: str,
        status: str = IncidentStatus.RESOLVED,
        notes: Optional[str] = None,
        ip_address: Optional[str] = None
    ) -> Optional[EmergencyIncident]:
        incident = db.query(EmergencyIncident).filter(EmergencyIncident.id == incident_id).first()
        if not incident:
            return None

        incident.status = status
        incident.resolved_at = datetime.now(timezone.utc)
        if notes:
            incident.responder_notes = f"{incident.responder_notes or ''}\n[{status}] {notes}".strip()

        db.commit()
        db.refresh(incident)

        AuditService.log_event(
            db=db,
            action=f"INCIDENT_{status}",
            resource_type="INCIDENT",
            user_id=resolver_id,
            resource_id=incident.id,
            details=f"Resolved with status {status}. Notes: {notes or 'None'}",
            ip_address=ip_address
        )
        return incident
