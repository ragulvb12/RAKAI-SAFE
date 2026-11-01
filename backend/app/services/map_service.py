import math
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.infrastructure import InfrastructurePlace, StreetlightSegment, PlaceCategory, LightingStatus
from app.schemas.infrastructure import WalkingRouteResponse, RouteWaypoint, StreetlightResponse, PlaceResponse

class MapService:
    @staticmethod
    def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Calculates distance between two coordinate pairs in meters."""
        R = 6371000  # Radius of earth in meters
        phi1 = math.radians(lat1)
        phi2 = math.radians(lat2)
        delta_phi = math.radians(lat2 - lat1)
        delta_lambda = math.radians(lon2 - lon1)

        a = math.sin(delta_phi / 2.0) ** 2 + \
            math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0) ** 2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    @classmethod
    def get_nearby_places(
        cls,
        db: Session,
        latitude: float,
        longitude: float,
        radius_meters: float = 5000.0,
        category: Optional[str] = None
    ) -> List[InfrastructurePlace]:
        query = db.query(InfrastructurePlace)
        if category:
            query = query.filter(InfrastructurePlace.category == category)
        
        all_places = query.all()
        nearby = []
        for place in all_places:
            dist = cls.haversine_distance(latitude, longitude, place.latitude, place.longitude)
            if dist <= radius_meters:
                place.distance_meters = round(dist)
                nearby.append(place)
        
        nearby.sort(key=lambda p: getattr(p, "distance_meters", 0))

        # If none found within tight radius, return all available places sorted by proximity
        if not nearby and all_places:
            for place in all_places:
                dist = cls.haversine_distance(latitude, longitude, place.latitude, place.longitude)
                place.distance_meters = round(dist)
            all_places.sort(key=lambda p: getattr(p, "distance_meters", 0))
            return all_places

        return nearby

    @classmethod
    def get_nearby_streetlights(
        cls,
        db: Session,
        latitude: float,
        longitude: float,
        radius_meters: float = 3000.0
    ) -> List[StreetlightSegment]:
        segments = db.query(StreetlightSegment).all()
        nearby = []
        for seg in segments:
            dist1 = cls.haversine_distance(latitude, longitude, seg.start_latitude, seg.start_longitude)
            dist2 = cls.haversine_distance(latitude, longitude, seg.end_latitude, seg.end_longitude)
            if min(dist1, dist2) <= radius_meters:
                nearby.append(seg)

        if not nearby and segments:
            return segments

        return nearby

    @classmethod
    def analyze_walking_route(
        cls,
        db: Session,
        start_lat: float,
        start_lon: float,
        dest_lat: float,
        dest_lon: float
    ) -> WalkingRouteResponse:
        total_dist = cls.haversine_distance(start_lat, start_lon, dest_lat, dest_lon)
        # Average walking speed 4.8 km/h = 80 meters/min
        estimated_minutes = max(1, math.ceil(total_dist / 80.0))

        # Interpolate 5 waypoints along walking corridor
        waypoints = []
        num_steps = 5
        for i in range(num_steps + 1):
            fraction = i / float(num_steps)
            lat = start_lat + (dest_lat - start_lat) * fraction
            lon = start_lon + (dest_lon - start_lon) * fraction
            label = "Origin" if i == 0 else ("Destination" if i == num_steps else f"Waypoint {i}")
            waypoints.append(RouteWaypoint(latitude=round(lat, 6), longitude=round(lon, 6), label=label))

        # Check streetlights along the corridor (within 150m of waypoints)
        all_segments = db.query(StreetlightSegment).all()
        matched_segments = []
        well_lit_count = 0
        total_matched = 0

        for seg in all_segments:
            seg_mid_lat = (seg.start_latitude + seg.end_latitude) / 2.0
            seg_mid_lon = (seg.start_longitude + seg.end_longitude) / 2.0
            
            # Check proximity to any route waypoint
            for wp in waypoints:
                if cls.haversine_distance(wp.latitude, wp.longitude, seg_mid_lat, seg_mid_lon) <= 250:
                    matched_segments.append(StreetlightResponse.model_validate(seg))
                    total_matched += 1
                    if seg.lighting_status == LightingStatus.WELL_LIT:
                        well_lit_count += 1
                    elif seg.lighting_status == LightingStatus.MODERATELY_LIT:
                        well_lit_count += 0.5
                    break

        # Calculate Lighting Safety Score
        if total_matched > 0:
            lighting_score = int(min(100, max(20, (well_lit_count / total_matched) * 100)))
            lighting_summary = f"{lighting_score}% Verified Well-Lit Coverage"
        else:
            lighting_score = 45
            lighting_summary = "Unverified / Partial Municipal Streetlight Data"

        # Nearby safe havens along route
        mid_lat = (start_lat + dest_lat) / 2.0
        mid_lon = (start_lon + dest_lon) / 2.0
        safe_places = cls.get_nearby_places(db, mid_lat, mid_lon, radius_meters=1500)
        safe_havens = [PlaceResponse.model_validate(p) for p in safe_places]

        # Advisory message
        if lighting_score >= 75:
            advisory = "Path passes through well-lit monitored transit corridors. Safe havens are within reach."
        elif lighting_score >= 50:
            advisory = "Moderate lighting on route. Stay on primary avenues and keep RAKAI SAFE active."
        else:
            advisory = "Warning: Several unverified or dim stretches along this walking route. Consider alternate well-lit main roads or shared transit."

        return WalkingRouteResponse(
            distance_meters=round(total_dist, 1),
            estimated_minutes=estimated_minutes,
            lighting_safety_score=lighting_score,
            lighting_summary=lighting_summary,
            waypoints=waypoints,
            segments=matched_segments,
            nearby_safe_havens=safe_havens,
            safety_advisory=advisory
        )
