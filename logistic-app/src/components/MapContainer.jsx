import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create a custom red icon for current location
const currentLocationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const DEFAULT_CENTER = [-1.2921, 36.8219]; // Nairobi, Kenya

export default function MapComponent({ setUserLocation, setError, userLocation }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setIsLoading(false);
      return;
    }

    console.log('Getting location...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location found:', position.coords);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const newLocation = [lat, lng];

        setUserLocation(newLocation);
        setError(null);
        setIsLoading(false);
      },
      (error) => {
        console.error('Location error:', error);
        let message = 'Could not get your location';
        if (error.code === error.PERMISSION_DENIED) {
          message = 'Location access denied. Please allow location access and refresh.';
        }
        setError(message);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, [setUserLocation, setError]);

  if (isLoading) {
    return (
      <div style={{ height: '500px', width: '100%' }} className="flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Getting your location...</p>
          <p className="text-sm text-gray-500 mt-2">Please allow location access</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={userLocation || DEFAULT_CENTER}
      zoom={userLocation ? 15 : 10}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userLocation && (
        <Marker position={userLocation} icon={currentLocationIcon}>
          <Popup>
            <div>
              <strong>📍 Your Current Location</strong><br/>
              <strong>Lat:</strong> {userLocation[0].toFixed(6)}<br/>
              <strong>Lng:</strong> {userLocation[1].toFixed(6)}
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}