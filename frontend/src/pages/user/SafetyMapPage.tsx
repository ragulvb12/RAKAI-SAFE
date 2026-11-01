import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { infrastructureService } from '../../services/api';
import { InfrastructurePlace, StreetlightSegment, WalkingRoute } from '../../types';
import { useEmergency } from '../../features/emergency/EmergencyContext';
import { useAuth } from '../../features/authentication/AuthContext';
import { GoogleSafetyMap } from '../../components/map/GoogleSafetyMap';
import { calculateDistanceMeters, formatDistance, estimateTravelTimes } from '../../utils/geo';
import { 
  Shield, 
  Hospital, 
  Home, 
  Sun, 
  MapPin, 
  Navigation, 
  Filter, 
  Maximize2, 
  Minimize2, 
  Search, 
  Layers, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  Compass,
  ExternalLink,
  Car,
  X,
  Crosshair,
  Building2,
  Navigation2
} from 'lucide-react';

export interface PlaceWithDistance extends InfrastructurePlace {
  distanceMeters: number;
}

// Custom Leaflet DivIcons with SVG
const createCustomIcon = (bgColor: string, text: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="
      background-color: ${bgColor};
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 2px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(225,29,72,0.3);
      color: white;
      font-size: 14px;
      font-weight: bold;
    ">${text}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -17],
  });
};

const policeIcon = createCustomIcon('#2563EB', '👮');
const hospitalIcon = createCustomIcon('#DC2626', '🏥');
const safeHavenIcon = createCustomIcon('#059669', '🛡️');
const userIcon = createCustomIcon('#EC4899', '📍');

// Recenter Map Helper Component
const RecenterMap: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 15, { duration: 1.2 });
  }, [lat, lng, map]);
  return null;
};

export const SafetyMapPage: React.FC = () => {
  const { currentLocation, requestCurrentLocation, locationStatus } = useEmergency();
  const { language, t } = useAuth();

  const [places, setPlaces] = useState<InfrastructurePlace[]>([]);
  const [streetlights, setStreetlights] = useState<StreetlightSegment[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<InfrastructurePlace[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [showPolice, setShowPolice] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);
  const [showSafeHavens, setShowSafeHavens] = useState(true);
  const [showStreetlights, setShowStreetlights] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLocatingHeader, setIsLocatingHeader] = useState(false);

  // Walking Route Analyzer
  const [routeData, setRouteData] = useState<WalkingRoute | null>(null);
  const [analyzingRoute, setAnalyzingRoute] = useState(false);
  const [mapEngine, setMapEngine] = useState<'google' | 'leaflet'>('google');

  // Real-time map position state: controls the viewport camera center
  const [mapPos, setMapPos] = useState<{ lat: number; lng: number }>(() => {
    if (currentLocation?.latitude && currentLocation?.longitude) {
      return { lat: currentLocation.latitude, lng: currentLocation.longitude };
    }
    try {
      const cached = localStorage.getItem('rakai_last_location');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.latitude && parsed?.longitude) {
          return { lat: parsed.latitude, lng: parsed.longitude };
        }
      }
    } catch {}
    return { lat: 11.0102, lng: 76.9701 };
  });

  const centerLat = mapPos.lat;
  const centerLng = mapPos.lng;

  // Real user coordinates (live GPS or validated network fix) - independent from map pan/zoom
  const userLat = currentLocation?.latitude ?? 11.0102;
  const userLng = currentLocation?.longitude ?? 76.9701;
  const userAccuracy = currentLocation?.accuracy ?? 25;

  // Selected place for spotlight card and map focusing
  const [searchParams] = useSearchParams();
  const [selectedPlace, setSelectedPlace] = useState<PlaceWithDistance | null>(null);

  // Auto-detect fresh GPS on page load and center camera if no place is currently selected
  useEffect(() => {
    requestCurrentLocation().then((loc) => {
      if (loc?.latitude && loc?.longitude && !selectedPlace) {
        setMapPos({ lat: loc.latitude, lng: loc.longitude });
      }
    });
  }, []);

  // When live GPS updates, synchronize map position ONLY if user has not actively selected a different destination
  useEffect(() => {
    if (currentLocation?.latitude && currentLocation?.longitude && !selectedPlace) {
      setMapPos({ lat: currentLocation.latitude, lng: currentLocation.longitude });
    }
  }, [currentLocation?.latitude, currentLocation?.longitude]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [placesData, streetlightsData] = await Promise.all([
          infrastructureService.getPlaces({ latitude: userLat, longitude: userLng, radius_meters: 50000 }),
          infrastructureService.getStreetlights(),
        ]);
        setPlaces(placesData);
        setFilteredPlaces(placesData);
        setStreetlights(streetlightsData);
      } catch (e) {
        console.warn('Failed to load map data:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userLat, userLng]);

  // Live distance calculation to all places ALWAYS measured from user's true location
  const placesWithDistance: PlaceWithDistance[] = useMemo(() => {
    return places.map((p) => ({
      ...p,
      distanceMeters: calculateDistanceMeters(userLat, userLng, p.latitude, p.longitude),
    }));
  }, [places, userLat, userLng]);

  // Nearest Police Station
  const nearestPolice = useMemo(() => {
    const list = placesWithDistance
      .filter((p) => p.category === 'POLICE_STATION')
      .sort((a, b) => a.distanceMeters - b.distanceMeters);
    return list[0] || null;
  }, [placesWithDistance]);

  // Nearest Hospital
  const nearestHospital = useMemo(() => {
    const list = placesWithDistance
      .filter((p) => p.category === 'HOSPITAL')
      .sort((a, b) => a.distanceMeters - b.distanceMeters);
    return list[0] || null;
  }, [placesWithDistance]);

  // Safest Place (Safe Haven)
  const nearestSafeHaven = useMemo(() => {
    const list = placesWithDistance
      .filter((p) => p.category === 'SAFE_HAVEN')
      .sort((a, b) => a.distanceMeters - b.distanceMeters);
    return list[0] || null;
  }, [placesWithDistance]);

  // Handler to quickly select nearest spot
  const handleSelectNearest = (category: 'POLICE_STATION' | 'HOSPITAL' | 'SAFE_HAVEN') => {
    let target: PlaceWithDistance | null = null;
    if (category === 'POLICE_STATION') {
      setShowPolice(true);
      target = nearestPolice;
    } else if (category === 'HOSPITAL') {
      setShowHospitals(true);
      target = nearestHospital;
    } else if (category === 'SAFE_HAVEN') {
      setShowSafeHavens(true);
      target = nearestSafeHaven;
    }

    if (target) {
      setSelectedPlace(target);
      setMapPos({ lat: target.latitude, lng: target.longitude });
    }
  };

  // URL Query param auto-trigger
  useEffect(() => {
    const focus = searchParams.get('focus');
    if (focus === 'police' && nearestPolice) {
      handleSelectNearest('POLICE_STATION');
    } else if (focus === 'hospital' && nearestHospital) {
      handleSelectNearest('HOSPITAL');
    } else if (focus === 'safe_haven' && nearestSafeHaven) {
      handleSelectNearest('SAFE_HAVEN');
    }
  }, [searchParams, nearestPolice, nearestHospital, nearestSafeHaven]);

  // Analyze route directly to target place from USER'S TRUE LOCATION
  const handleAnalyzeRouteToPlace = async (target: InfrastructurePlace) => {
    setAnalyzingRoute(true);
    try {
      const res = await infrastructureService.analyzeRoute({
        start_latitude: userLat,
        start_longitude: userLng,
        destination_latitude: target.latitude,
        destination_longitude: target.longitude,
      });
      setRouteData(res);
      setIsDrawerOpen(true);
    } catch (e) {
      console.warn('Route analysis error:', e);
    } finally {
      setAnalyzingRoute(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let result = places.filter((p) => {
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
    setFilteredPlaces(result);
  }, [places, showPolice, showHospitals, showSafeHavens, searchQuery]);

  // Trigger Walking Route Analysis from user's live position
  const handleAnalyzeRoute = async () => {
    setAnalyzingRoute(true);
    try {
      const res = await infrastructureService.analyzeRoute({
        start_latitude: userLat,
        start_longitude: userLng,
        destination_latitude: userLat - 0.006,
        destination_longitude: userLng + 0.007,
      });
      setRouteData(res);
      setIsDrawerOpen(true);
    } catch (e) {
      console.warn('Route analysis error:', e);
    } finally {
      setAnalyzingRoute(false);
    }
  };

  const getPolylineColor = (status: string) => {
    switch (status) {
      case 'WELL_LIT':
        return '#059669'; // Emerald
      case 'MODERATELY_LIT':
        return '#D97706'; // Amber
      case 'POORLY_LIT':
        return '#DC2626'; // Red
      default:
        return '#94A3B8'; // Slate
    }
  };

  return (
    <div className={`space-y-4 animate-fadeIn ${isFullscreen ? 'fixed inset-0 z-50 p-4 bg-[#FAF8FB] h-screen' : ''}`}>
      
      {/* Top Map Header Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-pink-100 shadow-sm">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.map.searchPlaceholder}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-pink-500 transition-all"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          
          {/* Map Engine Toggle */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-2xl border border-pink-200/90 shadow-sm text-xs font-bold">
            <button
              onClick={() => setMapEngine('google')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer ${
                mapEngine === 'google'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🗺️ Google Maps</span>
            </button>
            <button
              onClick={() => setMapEngine('leaflet')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer ${
                mapEngine === 'leaflet'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>OSM View</span>
            </button>
          </div>

          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-1.5 border transition-all ${
              isDrawerOpen
                ? 'bg-pink-100 text-pink-700 border-pink-300'
                : 'bg-white hover:bg-pink-50/70 text-slate-700 border-slate-200'
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-pink-600" />
            <span>Filters & Routes</span>
          </button>

          <button
            onClick={handleAnalyzeRoute}
            disabled={analyzingRoute}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-bold shadow-md shadow-pink-500/20 flex items-center space-x-1.5 transition-all"
          >
            <Sun className="w-3.5 h-3.5" />
            <span>{analyzingRoute ? 'Analyzing...' : 'Safe Walk Route'}</span>
          </button>

          <button
            id="top-locate-btn"
            onClick={async () => {
              setIsLocatingHeader(true);
              const loc = await requestCurrentLocation();
              if (loc?.latitude && loc?.longitude) {
                setMapPos({ lat: loc.latitude, lng: loc.longitude });
              }
              setIsLocatingHeader(false);
            }}
            disabled={isLocatingHeader}
            className="p-2.5 rounded-2xl bg-white hover:bg-pink-50 text-slate-700 border border-slate-200 shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-60"
            title="Locate Current Position"
          >
            <Navigation className={`w-4 h-4 text-emerald-600 ${isLocatingHeader ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-2xl bg-white hover:bg-pink-50 text-slate-700 border border-slate-200 shadow-sm"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Quick Emergency & Nearest Safe Spot Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* 1. Nearest Police Station */}
        <button
          id="quick-nearby-police-btn"
          onClick={() => handleSelectNearest('POLICE_STATION')}
          className={`p-3.5 rounded-3xl border transition-all text-left flex items-center justify-between group cursor-pointer shadow-sm active:scale-[0.99] ${
            selectedPlace?.category === 'POLICE_STATION'
              ? 'bg-blue-50/90 border-blue-400 ring-2 ring-blue-500/30 shadow-md shadow-blue-500/10'
              : 'bg-white hover:bg-blue-50/50 border-pink-100 hover:border-blue-200'
          }`}
          title="Locate & focus nearest 24/7 Police Station"
        >
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              👮
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black text-slate-900 group-hover:text-blue-700 transition-colors truncate flex items-center space-x-1.5">
                <span>{t.map.nearbyPolice || 'Nearby Police Station'}</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                {nearestPolice ? nearestPolice.name : (t.map.calculating || 'Locating nearest station...')}
              </div>
            </div>
          </div>
          {nearestPolice && (
            <span className="shrink-0 ml-2 px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-100/90 text-blue-800 border border-blue-200 shadow-sm">
              {formatDistance(nearestPolice.distanceMeters)}
            </span>
          )}
        </button>

        {/* 2. Nearest Hospital */}
        <button
          id="quick-nearby-hospital-btn"
          onClick={() => handleSelectNearest('HOSPITAL')}
          className={`p-3.5 rounded-3xl border transition-all text-left flex items-center justify-between group cursor-pointer shadow-sm active:scale-[0.99] ${
            selectedPlace?.category === 'HOSPITAL'
              ? 'bg-red-50/90 border-red-400 ring-2 ring-red-500/30 shadow-md shadow-red-500/10'
              : 'bg-white hover:bg-red-50/50 border-pink-100 hover:border-red-200'
          }`}
          title="Locate & focus nearest 24/7 Hospital & Emergency Unit"
        >
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
              🏥
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black text-slate-900 group-hover:text-red-700 transition-colors truncate flex items-center space-x-1.5">
                <span>{t.map.nearbyHospital || 'Nearby Hospital'}</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                {nearestHospital ? nearestHospital.name : (t.map.calculating || 'Locating nearest hospital...')}
              </div>
            </div>
          </div>
          {nearestHospital && (
            <span className="shrink-0 ml-2 px-2.5 py-1 rounded-full text-[10px] font-black bg-red-100/90 text-red-800 border border-red-200 shadow-sm">
              {formatDistance(nearestHospital.distanceMeters)}
            </span>
          )}
        </button>

        {/* 3. Safest Place (Safe Haven) */}
        <button
          id="quick-safest-place-btn"
          onClick={() => handleSelectNearest('SAFE_HAVEN')}
          className={`p-3.5 rounded-3xl border transition-all text-left flex items-center justify-between group cursor-pointer shadow-sm active:scale-[0.99] ${
            selectedPlace?.category === 'SAFE_HAVEN'
              ? 'bg-emerald-50/90 border-emerald-400 ring-2 ring-emerald-500/30 shadow-md shadow-emerald-500/10'
              : 'bg-white hover:bg-emerald-50/50 border-pink-100 hover:border-emerald-200'
          }`}
          title="Locate & focus nearest CCTV Monitored Safe Haven / Transit Shelter"
        >
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              🛡️
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black text-slate-900 group-hover:text-emerald-700 transition-colors truncate flex items-center space-x-1.5">
                <span>{t.map.safestPlace || 'Safest Place'}</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                {nearestSafeHaven ? nearestSafeHaven.name : (t.map.calculating || 'Locating safest place...')}
              </div>
            </div>
          </div>
          {nearestSafeHaven && (
            <span className="shrink-0 ml-2 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100/90 text-emerald-800 border border-emerald-200 shadow-sm">
              {formatDistance(nearestSafeHaven.distanceMeters)}
            </span>
          )}
        </button>
      </div>

      {/* Main Map Content + Collapsible Drawer Container */}
      <div className="relative rounded-3xl overflow-hidden border border-pink-100 shadow-xl shadow-pink-500/5 h-[560px] sm:h-[620px] lg:h-[700px] bg-white">
        
        {/* Active Selected Safe Spot Floating Action Card */}
        {selectedPlace && (
          <div className="absolute top-4 left-4 z-20 max-w-sm sm:max-w-md w-[calc(100%-2rem)] sm:w-auto bg-white/95 backdrop-blur-xl border border-pink-200 shadow-2xl rounded-3xl p-4 sm:p-5 animate-fadeIn">
            <div className="flex items-start justify-between gap-2 border-b border-pink-100 pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black tracking-wider uppercase border ${
                  selectedPlace.category === 'POLICE_STATION'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : selectedPlace.category === 'HOSPITAL'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {selectedPlace.category === 'POLICE_STATION'
                    ? '👮 POLICE STATION'
                    : selectedPlace.category === 'HOSPITAL'
                    ? '🏥 24/7 HOSPITAL'
                    : '🛡️ SAFEST PLACE / HAVEN'}
                </span>
                {selectedPlace.is_verified && (
                  <span className="px-2 py-0.5 rounded-lg text-[9px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                    VERIFIED
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedPlace(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Dismiss spotlight"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                {selectedPlace.name}
              </h3>
              {selectedPlace.name_tamil && (
                <div className="text-xs font-bold text-pink-600">
                  {selectedPlace.name_tamil}
                </div>
              )}
              <div className="text-xs text-slate-600 leading-relaxed">
                {selectedPlace.address}
              </div>

              {/* Distance and ETA */}
              {selectedPlace.distanceMeters && (
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-semibold text-slate-600">
                  <span className="px-2 py-0.5 rounded-lg bg-pink-50 text-pink-700 border border-pink-200 font-bold">
                    📍 {formatDistance(selectedPlace.distanceMeters)} {t.map.distanceAway || 'away'}
                  </span>
                  <span>🚗 ~{estimateTravelTimes(selectedPlace.distanceMeters).driveMinutes} min {t.map.driveTime || 'drive'}</span>
                  <span>•</span>
                  <span>🚶 ~{estimateTravelTimes(selectedPlace.distanceMeters).walkMinutes} min {t.map.walkTime || 'walk'}</span>
                </div>
              )}

              <div className="text-[11px] text-slate-500 font-medium pt-1">
                ⏱️ Hours: {selectedPlace.operating_hours || '24/7 Assistance Desk'}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-3 border-t border-pink-100 flex flex-wrap items-center gap-2">
              {selectedPlace.phone && (
                <a
                  href={`tel:${selectedPlace.phone}`}
                  className="px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm shadow-pink-600/30 transition-all active:scale-95"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{t.map.callNow || 'Call Now'}</span>
                </a>
              )}

              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${selectedPlace.latitude},${selectedPlace.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all active:scale-95"
              >
                <Car className="w-3.5 h-3.5 text-blue-300" />
                <span>{t.map.directions || 'Directions'}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <button
                onClick={() => handleAnalyzeRouteToPlace(selectedPlace)}
                disabled={analyzingRoute}
                className="px-3.5 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-bold flex items-center space-x-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Sun className="w-3.5 h-3.5 text-pink-600" />
                <span>{analyzingRoute ? 'Analyzing...' : (t.map.walkRoute || 'Safe Walk Route')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Interactive Map View */}
        {mapEngine === 'google' ? (
          <GoogleSafetyMap
            centerLat={centerLat}
            centerLng={centerLng}
            userLat={userLat}
            userLng={userLng}
            accuracy={userAccuracy}
            places={filteredPlaces}
            streetlights={streetlights}
            activeRoute={routeData ? routeData.waypoints.map((w) => [w.latitude, w.longitude]) : null}
            showPolice={showPolice}
            showHospitals={showHospitals}
            showSafeHavens={showSafeHavens}
            showStreetlights={showStreetlights}
            searchQuery={searchQuery}
            selectedPlaceId={selectedPlace?.id || null}
            onSelectPlace={(p) => {
              if (p) {
                const dist = calculateDistanceMeters(userLat, userLng, p.latitude, p.longitude);
                setSelectedPlace({ ...p, distanceMeters: dist });
              }
            }}
            onLocationFound={(lat, lng) => setMapPos({ lat, lng })}
            className="w-full h-full z-0"
          />
        ) : (
          /* Leaflet OSM Map Fallback */
          <MapContainer
            center={[centerLat, centerLng]}
            zoom={14}
            scrollWheelZoom={true}
            className="w-full h-full z-0"
          >
            {/* Recenter helper */}
            <RecenterMap lat={centerLat} lng={centerLng} />

            {/* Clean Daylight-friendly OpenStreetMap tiles */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Current User Marker with accuracy circle */}
            <Marker position={[userLat, userLng]} icon={userIcon}>
              <Popup>
                <div className="text-xs">
                  <div className="font-bold text-pink-600 mb-1">Your Live Location</div>
                  <div className="text-slate-700">Lat: {userLat.toFixed(5)}, Lng: {userLng.toFixed(5)}</div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Accuracy: ±{Math.round(userAccuracy)}m
                  </div>
                </div>
              </Popup>
            </Marker>

            <Circle
              center={[userLat, userLng]}
              radius={userAccuracy}
              pathOptions={{ color: '#EC4899', fillColor: '#F472B6', fillOpacity: 0.2, weight: 2 }}
            />

            {/* Infrastructure Markers */}
            {filteredPlaces.map((place) => {
              let icon = safeHavenIcon;
              if (place.category === 'POLICE_STATION') icon = policeIcon;
              if (place.category === 'HOSPITAL') icon = hospitalIcon;

              return (
                <Marker
                  key={place.id}
                  position={[place.latitude, place.longitude]}
                  icon={icon}
                  eventHandlers={{
                    click: () => {
                      const dist = calculateDistanceMeters(userLat, userLng, place.latitude, place.longitude);
                      setSelectedPlace({ ...place, distanceMeters: dist });
                    }
                  }}
                >
                  <Popup>
                    <div className="text-xs text-slate-900 min-w-[200px]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-slate-900">{place.name}</span>
                        {place.is_verified && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                            VERIFIED
                          </span>
                        )}
                      </div>
                      {place.name_tamil && (
                        <div className="text-[11px] text-pink-600 font-semibold mb-1">
                          {place.name_tamil}
                        </div>
                      )}
                      <div className="text-slate-600 text-[11px] mb-2">{place.address}</div>
                      
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-medium">{place.operating_hours}</span>
                        {place.phone && (
                          <a
                            href={`tel:${place.phone}`}
                            className="px-2.5 py-1 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-[10px] font-bold flex items-center space-x-1"
                          >
                            <PhoneCall className="w-3 h-3" />
                            <span>Call</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {/* Streetlight Safety Corridors */}
            {showStreetlights &&
              streetlights.map((seg) => {
                const color = getPolylineColor(seg.lighting_status);
                return (
                  <Polyline
                    key={seg.id}
                    positions={[
                      [seg.start_latitude, seg.start_longitude],
                      [seg.end_latitude, seg.end_longitude],
                    ]}
                    pathOptions={{ color, weight: 6, opacity: 0.85 }}
                  >
                    <Popup>
                      <div className="text-xs text-slate-900">
                        <div className="font-bold text-slate-900 mb-1">{seg.street_name}</div>
                        <div className="flex items-center space-x-2 text-[11px] mb-1 font-bold" style={{ color }}>
                          <span>STATUS: {seg.lighting_status.replace('_', ' ')}</span>
                        </div>
                        <div className="text-[10px] text-slate-600 font-medium">
                          Functional: {seg.functional_lights} / {seg.total_lights} lights
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1">
                          Source: {seg.source} • {seg.is_verified ? 'Verified' : 'Pending'}
                        </div>
                      </div>
                    </Popup>
                  </Polyline>
                );
              })}

            {/* Walking Route Corridors if analyzed */}
            {routeData && (
              <>
                <Polyline
                  positions={routeData.waypoints.map((w) => [w.latitude, w.longitude])}
                  pathOptions={{ color: '#E11D48', weight: 6, dashArray: '8, 8' }}
                />
                <Marker
                  position={[
                    routeData.waypoints[routeData.waypoints.length - 1].latitude,
                    routeData.waypoints[routeData.waypoints.length - 1].longitude,
                  ]}
                  icon={createCustomIcon('#059669', '🏁')}
                >
                  <Popup>
                    <div className="text-xs font-bold text-slate-900">Safe Route Destination</div>
                  </Popup>
                </Marker>
              </>
            )}

          </MapContainer>
        )}

        {/* Collapsible Side Panel Drawer */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-80 sm:w-96 bg-white/95 backdrop-blur-xl border-l border-pink-100 z-10 transition-transform duration-300 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="space-y-6">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-pink-100 pb-3.5">
              <h3 className="text-sm font-black text-slate-900 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-pink-600" />
                <span>Map Layers & Safety Filters</span>
              </h3>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-xl hover:bg-pink-50 text-slate-400 hover:text-slate-700"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Checkboxes */}
            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-200 cursor-pointer hover:bg-pink-50/40 transition-colors">
                <div className="flex items-center space-x-2.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span className="text-xs font-bold text-slate-800">Police Stations</span>
                </div>
                <input
                  type="checkbox"
                  checked={showPolice}
                  onChange={(e) => setShowPolice(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-200 cursor-pointer hover:bg-pink-50/40 transition-colors">
                <div className="flex items-center space-x-2.5">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-xs font-bold text-slate-800">24/7 Hospitals</span>
                </div>
                <input
                  type="checkbox"
                  checked={showHospitals}
                  onChange={(e) => setShowHospitals(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-200 cursor-pointer hover:bg-pink-50/40 transition-colors">
                <div className="flex items-center space-x-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-bold text-slate-800">Safe Havens</span>
                </div>
                <input
                  type="checkbox"
                  checked={showSafeHavens}
                  onChange={(e) => setShowSafeHavens(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-200 cursor-pointer hover:bg-pink-50/40 transition-colors">
                <div className="flex items-center space-x-2.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="text-xs font-bold text-slate-800">Streetlight Corridors</span>
                </div>
                <input
                  type="checkbox"
                  checked={showStreetlights}
                  onChange={(e) => setShowStreetlights(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-0 cursor-pointer"
                />
              </label>
            </div>

            {/* Walking Route Details Card if calculated */}
            {routeData && (
              <div className="p-4 rounded-3xl bg-pink-50/80 border border-pink-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-pink-800 uppercase tracking-wider">
                    Walk Route Analysis
                  </span>
                  <span className="text-sm font-black text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                    {routeData.lighting_safety_score}% SAFE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-2xl bg-white border border-pink-100 shadow-sm">
                    <div className="text-[10px] text-slate-500 font-medium">Distance</div>
                    <div className="font-black text-slate-900">{(routeData.distance_meters / 1000).toFixed(1)} km</div>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white border border-pink-100 shadow-sm">
                    <div className="text-[10px] text-slate-500 font-medium">Walk Time</div>
                    <div className="font-black text-slate-900">{routeData.estimated_minutes} mins</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-700 font-medium">
                  <strong>Lighting Summary:</strong> {routeData.lighting_summary}
                </div>

                <div className="p-3 rounded-2xl bg-white border border-pink-200 text-[11px] text-slate-700 leading-relaxed">
                  <Info className="w-3.5 h-3.5 inline mr-1 text-pink-600" />
                  {routeData.safety_advisory}
                </div>

                {routeData.nearby_safe_havens.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-slate-800 block mb-1">
                      {t.map.safeHavensNearby}:
                    </span>
                    <div className="space-y-1">
                      {routeData.nearby_safe_havens.map((h) => (
                        <div key={h.id} className="text-[10px] text-slate-700 p-2 rounded-xl bg-white border border-pink-100 flex items-center justify-between">
                          <span className="font-semibold">{h.name}</span>
                          <span className="text-emerald-700 font-bold">{h.operating_hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Legend */}
            <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 text-[11px] space-y-2">
              <span className="font-bold text-slate-800 uppercase tracking-wider block">
                Streetlight Safety Legend
              </span>
              <div className="flex items-center space-x-2 text-emerald-700 font-medium">
                <span className="w-3.5 h-1.5 bg-emerald-600 rounded"></span>
                <span>Well Lit (&gt;80% functional illumination)</span>
              </div>
              <div className="flex items-center space-x-2 text-amber-700 font-medium">
                <span className="w-3.5 h-1.5 bg-amber-500 rounded"></span>
                <span>Moderately Lit (Caution recommended)</span>
              </div>
              <div className="flex items-center space-x-2 text-red-700 font-medium">
                <span className="w-3.5 h-1.5 bg-red-600 rounded"></span>
                <span>Poorly Lit (Avoid after dark)</span>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-pink-100 text-[11px] text-slate-400 text-center font-medium">
            Verified Infrastructure Data • Powered by Google Maps Platform & OpenStreetMap
          </div>

        </div>

      </div>

    </div>
  );
};
