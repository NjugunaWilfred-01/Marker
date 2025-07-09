import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Loader from './Loader';

const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '500px',
};

const DEFAULT_CENTER = { lat: -1.2921, lng: 36.8219 }; // Nairobi, Kenya

export default function MapContainer({ setUserLocation, setError, userLocation }) {
  const [map, setMap] = useState(null);

  // Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(loc);
        setError(null);
      },
      err => {
        let message = 'Location detection failed';
        if (err.code === err.PERMISSION_DENIED) message = 'Location permission denied';
        if (err.code === err.TIMEOUT) message = 'Location request timed out';
        setError(message);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, [setUserLocation, setError]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      loadingElement={<Loader />}
    >
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={userLocation || DEFAULT_CENTER}
        zoom={userLocation ? 15 : 10}
        onLoad={map => setMap(map)}
        options={{
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: true,
          zoomControl: true
        }}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            title="Your Current Location"
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" fill="#3b82f6" stroke="#ffffff" stroke-width="3"/>
                  <circle cx="16" cy="16" r="6" fill="#ffffff"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(32, 32),
              anchor: new window.google.maps.Point(16, 16)
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}