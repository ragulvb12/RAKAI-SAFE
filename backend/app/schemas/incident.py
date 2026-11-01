from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from app.schemas.user import UserResponse

class IncidentTriggerRequest(BaseModel):
    mode: str = "SIREN" # SIREN / SILENT / SHAKE / HOTKEY
    latitude: float
    longitude: float
    accuracy_meters: float = 10.0
    jurisdiction: Optional[str] = "Central Zone"

class IncidentLocationUpdate(BaseModel):
    latitude: float
    longitude: float
    accuracy: float = 10.0

class IncidentStatusUpdate(BaseModel):
    status: str # ACKNOWLEDGED, DISPATCHED, ON_SCENE, RESOLVED, FALSE_ALARM
    responder_notes: Optional[str] = None

class IncidentAssignRequest(BaseModel):
    police_id: str

class LocationSnapshotResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    latitude: float
    longitude: float
    accuracy: float
    recorded_at: datetime

class NotificationLogResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    recipient_name: str
    recipient_phone: str
    channel: str
    status: str
    provider_reference: Optional[str] = None
    provider_status_code: Optional[str] = None
    created_at: datetime

class IncidentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    user_id: str
    mode: str
    status: str
    initial_latitude: float
    initial_longitude: float
    current_latitude: float
    current_longitude: float
    accuracy_meters: float
    jurisdiction: Optional[str] = None
    assigned_police_id: Optional[str] = None
    responder_notes: Optional[str] = None
    created_at: datetime
    acknowledged_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None
    user: Optional[UserResponse] = None
    assigned_police: Optional[UserResponse] = None
    location_snapshots: List[LocationSnapshotResponse] = []
    notifications: List[NotificationLogResponse] = []

class LocationShareSessionCreate(BaseModel):
    duration_minutes: int = 60
    current_latitude: Optional[float] = None
    current_longitude: Optional[float] = None

class LocationShareSessionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    token: str
    share_url: str
    expires_at: datetime
    is_active: bool
