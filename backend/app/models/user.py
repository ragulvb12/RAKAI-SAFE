import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship as orm_relationship
from app.db.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class UserRole:
    USER = "USER"
    POLICE = "POLICE"
    ADMIN = "ADMIN"

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    role = Column(String, default=UserRole.USER, nullable=False, index=True)
    jurisdiction = Column(String, nullable=True, index=True)  # For police accounts
    badge_number = Column(String, nullable=True)             # For police verification
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    emergency_contacts = orm_relationship("EmergencyContact", back_populates="user", cascade="all, delete-orphan")
    incidents = orm_relationship("EmergencyIncident", foreign_keys="EmergencyIncident.user_id", back_populates="user")
    assigned_incidents = orm_relationship("EmergencyIncident", foreign_keys="EmergencyIncident.assigned_police_id", back_populates="assigned_police")
    location_sessions = orm_relationship("LocationSharingSession", back_populates="user", cascade="all, delete-orphan")


class EmergencyContact(Base):
    __tablename__ = "emergency_contacts"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    relation_type = Column(String, default="Family")
    priority = Column(Integer, default=1)
    notify_sms = Column(Boolean, default=True)
    notify_whatsapp = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = orm_relationship("User", back_populates="emergency_contacts")
