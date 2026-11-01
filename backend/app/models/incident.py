import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from app.db.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class IncidentStatus:
    ACTIVE = "ACTIVE"
    ACKNOWLEDGED = "ACKNOWLEDGED"
    DISPATCHED = "DISPATCHED"
    ON_SCENE = "ON_SCENE"
    RESOLVED = "RESOLVED"
    FALSE_ALARM = "FALSE_ALARM"

class IncidentMode:
    SIREN = "SIREN"
    SILENT = "SILENT"
    SHAKE = "SHAKE"
    HOTKEY = "HOTKEY"

class EmergencyIncident(Base):
    __tablename__ = "emergency_incidents"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    mode = Column(String, default=IncidentMode.SIREN, nullable=False)
    status = Column(String, default=IncidentStatus.ACTIVE, nullable=False, index=True)
    
    initial_latitude = Column(Float, nullable=False)
    initial_longitude = Column(Float, nullable=False)
    current_latitude = Column(Float, nullable=False)
    current_longitude = Column(Float, nullable=False)
    accuracy_meters = Column(Float, default=10.0)
    
    jurisdiction = Column(String, default="Central Zone", index=True)
    assigned_police_id = Column(String, ForeignKey("users.id"), nullable=True, index=True)
    responder_notes = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)
    acknowledged_at = Column(DateTime, nullable=True)
    resolved_at = Column(DateTime, nullable=True)

    # Relationships
    user = relationship("User", foreign_keys=[user_id], back_populates="incidents")
    assigned_police = relationship("User", foreign_keys=[assigned_police_id], back_populates="assigned_incidents")
    location_snapshots = relationship("IncidentLocationSnapshot", back_populates="incident", cascade="all, delete-orphan")
    notifications = relationship("NotificationLog", back_populates="incident")


class IncidentLocationSnapshot(Base):
    __tablename__ = "incident_location_snapshots"

    id = Column(String, primary_key=True, default=generate_uuid)
    incident_id = Column(String, ForeignKey("emergency_incidents.id", ondelete="CASCADE"), nullable=False, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    accuracy = Column(Float, default=10.0)
    recorded_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    incident = relationship("EmergencyIncident", back_populates="location_snapshots")


class LocationSharingSession(Base):
    __tablename__ = "location_sharing_sessions"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    token = Column(String, unique=True, index=True, default=generate_uuid)
    current_latitude = Column(Float, nullable=True)
    current_longitude = Column(Float, nullable=True)
    expires_at = Column(DateTime, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="location_sessions")
