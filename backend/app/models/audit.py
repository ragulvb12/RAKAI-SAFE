import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.db.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class NotificationChannel:
    SMS = "SMS"
    WHATSAPP = "WHATSAPP"

class NotificationStatus:
    SENT = "SENT"
    DELIVERED = "DELIVERED"
    FAILED = "FAILED"
    PENDING = "PENDING"

class NotificationLog(Base):
    __tablename__ = "notification_logs"

    id = Column(String, primary_key=True, default=generate_uuid)
    incident_id = Column(String, ForeignKey("emergency_incidents.id", ondelete="SET NULL"), nullable=True, index=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    recipient_name = Column(String, nullable=False)
    recipient_phone = Column(String, nullable=False)
    channel = Column(String, default=NotificationChannel.SMS)
    status = Column(String, default=NotificationStatus.DELIVERED, index=True)
    message_body = Column(Text, nullable=False)
    provider_reference = Column(String, nullable=True)
    provider_status_code = Column(String, default="200_OK")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)

    incident = relationship("EmergencyIncident", back_populates="notifications")


class AuditEvent(Base):
    __tablename__ = "audit_events"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    action = Column(String, nullable=False, index=True) # e.g. "SOS_TRIGGERED", "INCIDENT_ACKNOWLEDGED", "INCIDENT_RESOLVED", "USER_REGISTERED"
    resource_type = Column(String, nullable=False)      # e.g. "INCIDENT", "USER", "INFRASTRUCTURE"
    resource_id = Column(String, nullable=True)
    details = Column(Text, nullable=True)
    ip_address = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)
