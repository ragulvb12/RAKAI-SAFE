from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.models.infrastructure import InfrastructurePlace, StreetlightSegment
from app.schemas.infrastructure import (
    PlaceResponse,
    StreetlightResponse,
    WalkingRouteRequest,
    WalkingRouteResponse
)
from app.services.map_service import MapService

router = APIRouter(prefix="/infrastructure", tags=["Safe Infrastructure & Streetlights"])

@router.get("/places", response_model=List[PlaceResponse])
def get_places(
    category: Optional[str] = Query(None),
    latitude: Optional[float] = Query(None),
    longitude: Optional[float] = Query(None),
    radius_meters: float = Query(10000.0),
    db: Session = Depends(get_db)
):
    if latitude is not None and longitude is not None:
        places = MapService.get_nearby_places(db, latitude, longitude, radius_meters, category)
    else:
        query = db.query(InfrastructurePlace)
        if category:
            query = query.filter(InfrastructurePlace.category == category)
        places = query.all()

    return [PlaceResponse.model_validate(p) for p in places]


@router.get("/streetlights", response_model=List[StreetlightResponse])
def get_streetlights(
    latitude: Optional[float] = Query(None),
    longitude: Optional[float] = Query(None),
    radius_meters: float = Query(5000.0),
    db: Session = Depends(get_db)
):
    if latitude is not None and longitude is not None:
        segments = MapService.get_nearby_streetlights(db, latitude, longitude, radius_meters)
    else:
        segments = db.query(StreetlightSegment).all()

    return [StreetlightResponse.model_validate(s) for s in segments]


@router.post("/route/analyze", response_model=WalkingRouteResponse)
def analyze_walking_route(
    payload: WalkingRouteRequest,
    db: Session = Depends(get_db)
):
    return MapService.analyze_walking_route(
        db=db,
        start_lat=payload.start_latitude,
        start_lon=payload.start_longitude,
        dest_lat=payload.destination_latitude,
        dest_lon=payload.destination_longitude
    )
