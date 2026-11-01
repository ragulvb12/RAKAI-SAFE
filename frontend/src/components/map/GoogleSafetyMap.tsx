import React, { useEffect, useRef, useState, useCallback } from 'react';
import { loadGoogleMaps } from '../../utils/googleMapsLoader';
import { InfrastructurePlace, StreetlightSegment } from '../../types';
import { MapPin, Navigation, Phone, Shield, ExternalLink, Compass, AlertCircle } from 'lucide-react';

interface GoogleSafetyMapProps {
  userLat?: number;
  userLng?: number;
  centerLat: number;
  centerLng: number;
  accuracy?: number;
  places: InfrastructurePlace[];
  streetlights: StreetlightSegment[];
  activeRoute?: [number, number][] | null;
  showPolice?: boolean;
  showHospitals?: boolean;
  showSafeHavens?: boolean;
  showStreetlights?: boolean;
  searchQuery?: string;
  selectedPlaceId?: string | null;
  onSelectPlace?: (place: InfrastructurePlace | null) => void;
  onLocationFound?: (lat: number, lng: number, accuracy: number) => void;
  className?: string;
}

// Clean daylight Google Maps styling tailored for the White & Light Pink aesthetic
const GOOGLE_MAP_LIGHT_STYLE: google.maps.MapTypeStyle[] = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#e0f2fe' }]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#fcfafc' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#f5d0fe' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#fce7f3' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#fbcfe8' }]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#f8fafc' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#ecfdf5' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#f1f5f9' }]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#cbd5e1' }, { weight: 0.8 }]
  }
];

export const GoogleSafetyMap: React.FC<GoogleSafetyMapProps> = ({
  userLat,
  userLng,
  centerLat,
  centerLng,
  accuracy = 15,
  places,
  streetlights,
  activeRoute,
  showPolice = true,
  showHospitals = true,
  showSafeHavens = true,
  showStreetlights = true,
  searchQuery = '',
  selectedPlaceId = null,
  onSelectPlace,
  onLocationFound,
  className = 'w-full h-full'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const userAccuracyCircleRef = useRef<google.maps.Circle | null>(null);
  const placeMarkersRef = useRef<google.maps.Marker[]>([]);
  const placeMarkerMapRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const streetlightPolylinesRef = useRef<google.maps.Polyline[]>([]);
  const routePolylinesRef = useRef<google.maps.Polyline[]>([]);
  const destinationMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Initialize Map
  useEffect(() => {
    let isMounted = true;

    loadGoogleMaps()
      .then((googleMaps) => {
        if (!isMounted || !mapContainerRef.current) return;

        if (!mapInstanceRef.current) {
          const map = new googleMaps.Map(mapContainerRef.current, {
            center: { lat: centerLat, lng: centerLng },
            zoom: 14,
            styles: GOOGLE_MAP_LIGHT_STYLE,
            mapTypeControl: true,
            mapTypeControlOptions: {
              position: google.maps.ControlPosition.TOP_RIGHT,
              style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            streetViewControl: true,
            streetViewControlOptions: {
              position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            fullscreenControl: true,
            fullscreenControlOptions: {
              position: google.maps.ControlPosition.RIGHT_TOP
            },
            zoomControl: true,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER
            }
          });

          mapInstanceRef.current = map;
          infoWindowRef.current = new googleMaps.InfoWindow();
        }

        setIsLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn('Google Maps Load Warning:', err);
        setLoadError(err?.message || 'Google Maps API encountered an error.');
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const liveUserLat = userLat ?? centerLat;
  const liveUserLng = userLng ?? centerLng;

  // Update User Live Location Marker & Accuracy Circle
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || typeof google === 'undefined' || !google.maps) return;

    const userPos = { lat: liveUserLat, lng: liveUserLng };

    const userPinSvg: google.maps.Symbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: '#EC4899',
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 3.5
    };

    if (userMarkerRef.current) {
      userMarkerRef.current.setPosition(userPos);
    } else {
      userMarkerRef.current = new google.maps.Marker({
        position: userPos,
        map,
        title: 'Your Live Location',
        icon: userPinSvg,
        zIndex: 999
      });

      userMarkerRef.current.addListener('click', () => {
        if (!infoWindowRef.current) return;
        infoWindowRef.current.setContent(`
          <div style="font-family: inherit; padding: 6px; font-size: 12px; color: #0f172a;">
            <div style="font-weight: 800; color: #ec4899; margin-bottom: 2px;">📍 Your Live Location</div>
            <div>Lat: ${liveUserLat.toFixed(5)}, Lng: ${liveUserLng.toFixed(5)}</div>
            <div style="font-size: 10px; color: #64748b; margin-top: 4px;">Accuracy: ±${Math.round(accuracy)}m</div>
          </div>
        `);
        infoWindowRef.current.open(map, userMarkerRef.current);
      });
    }

    if (userAccuracyCircleRef.current) {
      userAccuracyCircleRef.current.setCenter(userPos);
      userAccuracyCircleRef.current.setRadius(accuracy || 25);
    } else {
      userAccuracyCircleRef.current = new google.maps.Circle({
        strokeColor: '#EC4899',
        strokeOpacity: 0.4,
        strokeWeight: 1.5,
        fillColor: '#F472B6',
        fillOpacity: 0.15,
        map,
        center: userPos,
        radius: accuracy || 25
      });
    }
  }, [liveUserLat, liveUserLng, accuracy]);

  // Smoothly pan map viewport when user location updates
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.panTo({ lat: centerLat, lng: centerLng });
  }, [centerLat, centerLng]);

  // Update Infrastructure Place Markers (Police, Hospitals, Safe Havens)
  // Helper to open Place InfoWindow
  const openPlaceDetails = useCallback((place: InfrastructurePlace, marker: google.maps.Marker) => {
    const map = mapInstanceRef.current;
    if (!map || !infoWindowRef.current) return;

    let pinColor = '#2563EB';
    let categoryTitle = 'Police Station';
    if (place.category === 'HOSPITAL') {
      pinColor = '#DC2626';
      categoryTitle = 'Hospital';
    } else if (place.category === 'SAFE_HAVEN') {
      pinColor = '#059669';
      categoryTitle = 'Safe Haven';
    }

    const navUrl = `https://www.google.com/maps/dir/?api=1&origin=${liveUserLat},${liveUserLng}&destination=${place.latitude},${place.longitude}`;
    const phoneHtml = place.phone
      ? `<a href="tel:${place.phone}" style="display: inline-block; padding: 4px 10px; background: #ec4899; color: white; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 11px;">📞 Call ${place.phone}</a>`
      : '';

    infoWindowRef.current.setContent(`
      <div style="font-family: inherit; padding: 8px; font-size: 12px; color: #0f172a; max-width: 250px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
          <span style="font-size: 10px; font-weight: 800; color: ${pinColor}; text-transform: uppercase;">
            ${categoryTitle}
          </span>
          ${place.is_verified ? '<span style="font-size: 9px; font-weight: 800; background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; padding: 1px 5px; border-radius: 4px;">VERIFIED</span>' : ''}
        </div>
        <div style="font-weight: 800; font-size: 14px; color: #0f172a; margin-bottom: 2px;">
          ${place.name}
        </div>
        ${place.name_tamil ? `<div style="font-size: 11px; font-weight: 600; color: #ec4899; margin-bottom: 4px;">${place.name_tamil}</div>` : ''}
        <div style="color: #475569; font-size: 11px; margin-bottom: 6px; line-height: 1.4;">
          ${place.address}
        </div>
        <div style="font-size: 10px; color: #64748b; margin-bottom: 6px;">
          Hours: ${place.operating_hours || '24/7 Support'}
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px;">
          <a href="${navUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 4px 10px; background: #0f172a; color: white; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 11px;">
            🚗 Google Directions
          </a>
          ${phoneHtml}
        </div>
      </div>
    `);
    infoWindowRef.current.open(map, marker);

    // Subtle bounce effect to draw immediate visual attention
    if (typeof marker.setAnimation === 'function') {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        try {
          marker.setAnimation(null);
        } catch {}
      }, 1400);
    }
  }, [liveUserLat, liveUserLng]);

  // Update Infrastructure Place Markers (Police, Hospitals, Safe Havens)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || typeof google === 'undefined' || !google.maps) return;

    // Clear old markers
    placeMarkersRef.current.forEach((m) => m.setMap(null));
    placeMarkersRef.current = [];
    placeMarkerMapRef.current.clear();

    const filtered = places.filter((p) => {
      if (p.category === 'POLICE_STATION' && !showPolice) return false;
      if (p.category === 'HOSPITAL' && !showHospitals) return false;
      if (p.category === 'SAFE_HAVEN' && !showSafeHavens) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesTamil = p.name_tamil ? p.name_tamil.toLowerCase().includes(q) : false;
        const matchesAddress = p.address.toLowerCase().includes(q);
        return matchesName || matchesTamil || matchesAddress;
      }
      return true;
    });

    filtered.forEach((place) => {
      let pinColor = '#2563EB'; // Blue for police
      let labelText = 'P';

      if (place.category === 'HOSPITAL') {
        pinColor = '#DC2626'; // Red for hospital
        labelText = '+';
      } else if (place.category === 'SAFE_HAVEN') {
        pinColor = '#059669'; // Emerald for safe haven
        labelText = 'H';
      }

      const marker = new google.maps.Marker({
        position: { lat: place.latitude, lng: place.longitude },
        map,
        title: place.name,
        icon: {
          path: 'M 12,2 C 6.48,2 2,6.48 2,12 c 0,7 10,18 10,18 0,0 10,-11 10,-18 0,-5.52 -4.48,-10 -10,-10 z',
          fillColor: pinColor,
          fillOpacity: 0.95,
          scale: 1.35,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
          anchor: new google.maps.Point(12, 30)
        },
        label: {
          text: labelText,
          color: '#FFFFFF',
          fontSize: '11px',
          fontWeight: '900'
        }
      });

      marker.addListener('click', () => {
        if (onSelectPlace) onSelectPlace(place);
        openPlaceDetails(place, marker);
      });

      placeMarkersRef.current.push(marker);
      placeMarkerMapRef.current.set(place.id, marker);
    });
  }, [places, showPolice, showHospitals, showSafeHavens, searchQuery, centerLat, centerLng, onSelectPlace, openPlaceDetails]);

  // Focus and spotlight selected place if requested externally
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedPlaceId) return;

    const place = places.find((p) => p.id === selectedPlaceId);
    if (!place) return;

    map.panTo({ lat: place.latitude, lng: place.longitude });
    map.setZoom(16);

    const marker = placeMarkerMapRef.current.get(selectedPlaceId);
    if (marker) {
      openPlaceDetails(place, marker);
    }
  }, [selectedPlaceId, places, openPlaceDetails]);

  // Update Streetlight Illumination Polylines
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || typeof google === 'undefined' || !google.maps) return;

    streetlightPolylinesRef.current.forEach((p) => p.setMap(null));
    streetlightPolylinesRef.current = [];

    if (!showStreetlights) return;

    streetlights.forEach((seg) => {
      let strokeColor = '#10B981'; // Green for WELL_LIT
      if (seg.lighting_status === 'MODERATELY_LIT') {
        strokeColor = '#F59E0B'; // Amber
      } else if (seg.lighting_status === 'POORLY_LIT' || seg.lighting_status === 'UNVERIFIED') {
        strokeColor = '#EF4444'; // Red
      }

      const path = [
        { lat: seg.start_latitude, lng: seg.start_longitude },
        { lat: seg.end_latitude, lng: seg.end_longitude }
      ];

      const polyline = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor,
        strokeOpacity: 0.85,
        strokeWeight: 6,
        map
      });

      polyline.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (!infoWindowRef.current || !e.latLng) return;
        infoWindowRef.current.setPosition(e.latLng);
        infoWindowRef.current.setContent(`
          <div style="font-family: inherit; padding: 6px; font-size: 12px; color: #0f172a;">
            <div style="font-weight: 800; color: ${strokeColor}; margin-bottom: 2px;">💡 ${seg.street_name}</div>
            <div>Status: <strong>${seg.lighting_status.replace('_', ' ')}</strong></div>
            <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
              Functional: ${seg.functional_lights} / ${seg.total_lights} lights
            </div>
          </div>
        `);
        infoWindowRef.current.open(map);
      });

      streetlightPolylinesRef.current.push(polyline);
    });
  }, [streetlights, showStreetlights]);

  // Update Safe Walk Route
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || typeof google === 'undefined' || !google.maps) return;

    routePolylinesRef.current.forEach((p) => p.setMap(null));
    routePolylinesRef.current = [];
    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.setMap(null);
      destinationMarkerRef.current = null;
    }

    if (activeRoute && activeRoute.length > 1) {
      const path = activeRoute.map(([lat, lng]) => ({ lat, lng }));

      // Soft glow outer polyline
      const glowPoly = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: '#FDA4AF',
        strokeOpacity: 0.6,
        strokeWeight: 10,
        map
      });

      // Core route polyline
      const corePoly = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: '#E11D48',
        strokeOpacity: 1,
        strokeWeight: 4,
        map
      });

      routePolylinesRef.current.push(glowPoly, corePoly);

      // Destination marker
      const destPos = path[path.length - 1];
      destinationMarkerRef.current = new google.maps.Marker({
        position: destPos,
        map,
        title: 'Safe Route Destination',
        label: {
          text: '🏁',
          fontSize: '14px'
        }
      });

      // Fit map bounds to encompass route
      const bounds = new google.maps.LatLngBounds();
      path.forEach((pt) => bounds.extend(pt));
      map.fitBounds(bounds, 60);
    }
  }, [activeRoute]);

  // Active GPS Recenter to User's Current Location
  const handleRecenter = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    setIsLocating(true);

    const onResolve = (lat: number, lng: number, acc: number) => {
      const posObj = { lat, lng };
      map.panTo(posObj);
      map.setZoom(16);

      if (userMarkerRef.current) {
        userMarkerRef.current.setPosition(posObj);
      }
      if (userAccuracyCircleRef.current) {
        userAccuracyCircleRef.current.setCenter(posObj);
        userAccuracyCircleRef.current.setRadius(acc);
      }

      if (infoWindowRef.current && userMarkerRef.current) {
        infoWindowRef.current.setContent(`
          <div style="font-family: inherit; padding: 6px; font-size: 12px; color: #0f172a;">
            <div style="font-weight: 800; color: #ec4899; margin-bottom: 2px;">📍 Verified Live Location</div>
            <div>Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}</div>
            <div style="font-size: 10px; color: #64748b; margin-top: 4px;">Accuracy: ±${Math.round(acc)}m (Live GPS)</div>
          </div>
        `);
        infoWindowRef.current.open(map, userMarkerRef.current);
      }

      if (onLocationFound) {
        onLocationFound(lat, lng, acc);
      }
      setIsLocating(false);
    };

    if (!navigator.geolocation) {
      onResolve(liveUserLat, liveUserLng, accuracy || 25);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onResolve(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy || 15);
      },
      (err) => {
        console.warn('GPS recenter error:', err.message, 'Trying fast network lookup...');
        // Try fast IP geocoding fallback
        fetch('https://get.geojs.io/v1/ip/geo.json')
          .then((res) => res.json())
          .then((data) => {
            const lat = parseFloat(data.latitude);
            const lng = parseFloat(data.longitude);
            if (!isNaN(lat) && !isNaN(lng)) {
              onResolve(lat, lng, 500);
            } else {
              onResolve(liveUserLat, liveUserLng, accuracy || 25);
            }
          })
          .catch(() => {
            onResolve(liveUserLat, liveUserLng, accuracy || 25);
          });
      },
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 30000 }
    );
  }, [liveUserLat, liveUserLng, accuracy, onLocationFound]);

  return (
    <div className={`relative ${className} overflow-hidden rounded-3xl border border-pink-100 shadow-xl bg-white`}>
      {/* Map DOM Container */}
      <div
        ref={mapContainerRef}
        className="w-full h-full min-h-[520px]"
        style={{ width: '100%', height: '100%', minHeight: '520px' }}
      />

      {/* Floating Recenter Pill Button */}
      <div className="absolute bottom-6 left-6 z-10">
        <button
          id="google-map-live-location-btn"
          onClick={handleRecenter}
          disabled={isLocating}
          className="px-3.5 py-2.5 bg-white/95 hover:bg-white text-slate-800 hover:text-pink-600 rounded-2xl shadow-lg border border-pink-200/90 flex items-center space-x-2 text-xs font-black transition-all cursor-pointer backdrop-blur active:scale-95 disabled:opacity-75"
          title="Detect & Recenter to Live GPS Location"
        >
          <Compass className={`w-4 h-4 text-pink-600 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{isLocating ? 'Locating GPS...' : 'My Live Location'}</span>
        </button>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/30 animate-pulse mb-3">
            <MapPin className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-900">Connecting to Google Maps Platform...</p>
          <p className="text-xs text-pink-600 font-medium mt-1">Live Women Safety GIS Network</p>
        </div>
      )}

      {/* Fallback Notice Overlay (if API key needs billing or has domain restriction) */}
      {loadError && (
        <div className="absolute bottom-4 right-4 z-20 max-w-sm bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-rose-200 shadow-xl flex items-start space-x-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-slate-900 block">Google Maps Platform Notice</span>
            <span className="text-slate-600 block mt-0.5">{loadError}</span>
          </div>
        </div>
      )}
    </div>
  );
};
