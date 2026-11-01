/**
 * Geospatial utilities for distance calculation and formatting
 */

export const calculateDistanceMeters = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
};

export const estimateTravelTimes = (distanceMeters: number): { driveMinutes: number; walkMinutes: number } => {
  // Average drive speed in urban setting ~ 25 km/h = ~416 m/min
  // Average walk speed ~ 4.5 km/h = ~75 m/min
  const driveMinutes = Math.max(1, Math.round(distanceMeters / 416));
  const walkMinutes = Math.max(1, Math.round(distanceMeters / 75));
  return { driveMinutes, walkMinutes };
};
