from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class NotificationLogResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    incident_id: Optional[str] = None
    user_id: str
    recipient_name: str
    recipient_phone: str
    channel: str
    status: str
    message_body: str
    provider_reference: Optional[str] = None
    provider_status_code: Optional[str] = None
    created_at: datetime

class AuditEventResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    user_id: Optional[str] = None
    action: str
    resource_type: str
    resource_id: Optional[str] = None
    details: Optional[str] = None
    ip_address: Optional[str] = None
    created_at: datetime

class SystemStatsResponse(BaseModel):
    total_users: int
    total_incidents: int
    active_incidents: int
    resolved_incidents: int
    police_officers: int
    verified_safe_places: int
    total_streetlights: int
    sms_delivery_rate: float
