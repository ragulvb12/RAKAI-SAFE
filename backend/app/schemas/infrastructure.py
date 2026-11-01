from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class PlaceBase(BaseModel):
    category: str # POLICE_STATION / HOSPITAL / SAFE_HAVEN
    name: str
    name_tamil: Optional[str] = None
    address: str
    phone: Optional[str] = None
    latitude: float
    longitude: float
    jurisdiction: str = "Central Zone"
    operating_hours: str = "24/7 Active"

class PlaceCreate(PlaceBase):
    is_verified: bool = True

class PlaceResponse(PlaceBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
    is_verified: bool
    created_at: datetime

class StreetlightBase(BaseModel):
    street_name: str
    jurisdiction: str = "Central Zone"
    start_latitude: float
    start_longitude: float
    end_latitude: float
    end_longitude: float
    lighting_status: str = "WELL_LIT" # WELL_LIT, MODERATELY_LIT, POORLY_LIT, UNVERIFIED
    total_lights: int = 10
    functional_lights: int = 10
    is_verified: bool = True
    source: str = "Authority Inspection"

class StreetlightCreate(StreetlightBase):
    pass

class StreetlightResponse(StreetlightBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
    last_inspected_at: Optional[datetime] = None

# Walking Safe Route Schemas
class WalkingRouteRequest(BaseModel):
    start_latitude: float
    start_longitude: float
    destination_latitude: float
    destination_longitude: float

class RouteWaypoint(BaseModel):
    latitude: float
    longitude: float
    label: Optional[str] = None

class WalkingRouteResponse(BaseModel):
    distance_meters: float
    estimated_minutes: int
    lighting_safety_score: int # 0 to 100
    lighting_summary: str      # e.g. "85% Well-Lit Route"
    waypoints: List[RouteWaypoint]
    segments: List[StreetlightResponse] = []
    nearby_safe_havens: List[PlaceResponse] = []
    safety_advisory: str
