import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMaps } from '../../utils/googleMapsLoader';
import { ExternalLink, Navigation, ShieldAlert, Compass } from 'lucide-react';

interface GoogleIncidentMapProps {
  lat: number;
  lng: number;
  accuracy?: number;
  title?: string;
  zoom?: number;
  height?: string;
  className?: string;
}

export const GoogleIncidentMap: React.FC<GoogleIncidentMapProps> = ({
  lat,
  lng,
  accuracy = 25,
  title = 'Distress Incident Location',
  zoom = 15,
  height = '240px',
  className = ''
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    loadGoogleMaps()
      .then((googleMaps) => {
        if (!isMounted || !mapContainerRef.current) return;

        const incidentPos = { lat, lng };

        if (!mapInstanceRef.current) {
          const map = new googleMaps.Map(mapContainerRef.current, {
            center: incidentPos,
            zoom,
            mapTypeControl: false,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true
          });
          mapInstanceRef.current = map;
        } else {
          mapInstanceRef.current.setCenter(incidentPos);
          mapInstanceRef.current.setZoom(zoom);
        }

        // Incident marker with red emergency pulse
        if (markerRef.current) {
          markerRef.current.setPosition(incidentPos);
        } else {
          markerRef.current = new googleMaps.Marker({
            position: incidentPos,
            map: mapInstanceRef.current,
            title,
            icon: {
              path: googleMaps.SymbolPath.CIRCLE,
              scale: 9,
              fillColor: '#EF4444',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 3
            }
          });
        }

        // Accuracy circle
        if (circleRef.current) {
          circleRef.current.setCenter(incidentPos);
          circleRef.current.setRadius(accuracy);
        } else {
          circleRef.current = new googleMaps.Circle({
            strokeColor: '#EF4444',
            strokeOpacity: 0.5,
            strokeWeight: 1.5,
            fillColor: '#FCA5A5',
            fillOpacity: 0.25,
            map: mapInstanceRef.current,
            center: incidentPos,
            radius: accuracy
          });
        }

        setIsLoaded(true);
      })
      .catch((err) => {
        console.warn('GoogleIncidentMap load failed:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [lat, lng, accuracy, zoom, title]);

  const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-red-200 bg-slate-50 ${className}`}>
      <div ref={mapContainerRef} style={{ width: '100%', height }} />

      {/* Floating Action Overlay */}
      <div className="absolute top-2 right-2 z-10 flex items-center space-x-1.5">
        <a
          href={navUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1 bg-white/95 hover:bg-white text-blue-700 text-[10px] font-black rounded-lg shadow-md border border-blue-200 flex items-center space-x-1 transition-all"
        >
          <Navigation className="w-3 h-3 text-blue-600" />
          <span>Google GPS Dispatch</span>
          <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
        </a>
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-xs text-slate-500 font-bold">
          <Compass className="w-4 h-4 text-blue-600 animate-spin mr-1.5" />
          Loading Google Satellite / Road View...
        </div>
      )}
    </div>
  );
};
