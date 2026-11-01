/**
 * Google Maps JavaScript API Dynamic Loader
 * Loads the official Google Maps script with the provided API Key.
 */

export const GOOGLE_MAPS_API_KEY =
  (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY ||
  'AIzaSyD7WEecs8VlqbKtGnBi4RfIsUvOO8NYmQM';

let loadPromise: Promise<typeof google.maps> | null = null;

export const loadGoogleMaps = (apiKey: string = GOOGLE_MAPS_API_KEY): Promise<typeof google.maps> => {
  if (typeof window !== 'undefined' && (window as any).google?.maps?.Map) {
    return Promise.resolve((window as any).google.maps);
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    // 1. First check if script already placed in index.html is initializing
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if ((window as any).google?.maps?.Map) {
        clearInterval(interval);
        resolve((window as any).google.maps);
      } else if (attempts > 60) {
        clearInterval(interval);
        
        // 2. Fallback: Dynamically inject if not loaded yet
        if (!document.getElementById('google-maps-api-script')) {
          const script = document.createElement('script');
          script.id = 'google-maps-api-script';
          script.type = 'text/javascript';
          script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
            apiKey
          )}&libraries=places,geometry&callback=Function.prototype`;
          script.async = true;
          script.defer = true;

          script.onload = () => {
            if ((window as any).google?.maps) {
              resolve((window as any).google.maps);
            } else {
              reject(new Error('Google Maps script loaded but window.google.maps is undefined.'));
            }
          };

          script.onerror = (error) => {
            loadPromise = null;
            reject(new Error(`Failed to load Google Maps script: ${error}`));
          };

          document.head.appendChild(script);
        } else if ((window as any).google?.maps) {
          resolve((window as any).google.maps);
        } else {
          loadPromise = null;
          reject(new Error('Google Maps initialization timeout.'));
        }
      }
    }, 50);
  });

  return loadPromise;
};
