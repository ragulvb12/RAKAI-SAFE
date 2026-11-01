import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Boolean, DateTime, Integer, ForeignKey
from app.db.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class PlaceCategory:
    POLICE_STATION = "POLICE_STATION"
    HOSPITAL = "HOSPITAL"
    SAFE_HAVEN = "SAFE_HAVEN"

class LightingStatus:
    WELL_LIT = "WELL_LIT"
    MODERATELY_LIT = "MODERATELY_LIT"
    POORLY_LIT = "POORLY_LIT"
    UNVERIFIED = "UNVERIFIED"

class InfrastructurePlace(Base):
    __tablename__ = "infrastructure_places"

    id = Column(String, primary_key=True, default=generate_uuid)
    category = Column(String, nullable=False, index=True)
    name = Column(String, nullable=False)
    name_tamil = Column(String, nullable=True)
    address = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    jurisdiction = Column(String, default="Central Zone", index=True)
    is_verified = Column(Boolean, default=True)
    verified_by_admin_id = Column(String, ForeignKey("users.id"), nullable=True)
    operating_hours = Column(String, default="24/7 Active")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class StreetlightSegment(Base):
    __tablename__ = "streetlight_segments"

    id = Column(String, primary_key=True, default=generate_uuid)
    street_name = Column(String, nullable=False, index=True)
    jurisdiction = Column(String, default="Central Zone")
    start_latitude = Column(Float, nullable=False)
    start_longitude = Column(Float, nullable=False)
    end_latitude = Column(Float, nullable=False)
    end_longitude = Column(Float, nullable=False)
    lighting_status = Column(String, default=LightingStatus.WELL_LIT)
    total_lights = Column(Integer, default=10)
    functional_lights = Column(Integer, default=10)
    is_verified = Column(Boolean, default=True)
    source = Column(String, default="Authority Inspection") # Authority Inspection / Community Report / Third-Party
    last_inspected_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
