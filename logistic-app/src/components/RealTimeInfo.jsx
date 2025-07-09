import { useState, useEffect } from 'react';

export default function RealTimeInfo({ userLocation }) {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get nearby places using Google Places API
  const getNearbyPlaces = async (lat, lng) => {
    if (!window.google || !window.google.maps) return;

    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );

    const request = {
      location: new window.google.maps.LatLng(lat, lng),
      radius: 1000, // 1km radius
      type: ['restaurant', 'gas_station', 'hospital', 'bank', 'pharmacy']
    };

    return new Promise((resolve) => {
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(results.slice(0, 5)); // Get top 5 places
        } else {
          resolve([]);
        }
      });
    });
  };

  // Simulate weather data (you can integrate with a real weather API)
  const getWeatherData = async (lat, lng) => {
    // This is a simulation - in real app, you'd call a weather API like OpenWeatherMap
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          temperature: Math.round(20 + Math.random() * 15), // 20-35°C
          condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
          humidity: Math.round(40 + Math.random() * 40), // 40-80%
          windSpeed: Math.round(Math.random() * 20), // 0-20 km/h
          visibility: Math.round(8 + Math.random() * 7) // 8-15 km
        });
      }, 1000);
    });
  };

  // Fetch real-time data when location changes
  useEffect(() => {
    if (!userLocation?.lat || !userLocation?.lng) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [places, weather] = await Promise.all([
          getNearbyPlaces(userLocation.lat, userLocation.lng),
          getWeatherData(userLocation.lat, userLocation.lng)
        ]);
        
        setNearbyPlaces(places);
        setWeatherData(weather);
      } catch (error) {
        console.error('Error fetching real-time data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userLocation?.lat, userLocation?.lng]);

  if (!userLocation) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-3">Real-time Info</h4>
        <p className="text-sm text-gray-500">Location required for real-time information</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Weather Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
          Current Weather
        </h4>
        
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600">Loading weather...</span>
          </div>
        ) : weatherData ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{weatherData.temperature}°C</div>
              <div className="text-sm text-gray-600">{weatherData.condition}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-600">
                <span className="font-medium">Humidity:</span> {weatherData.humidity}%
              </div>
              <div className="text-xs text-gray-600">
                <span className="font-medium">Wind:</span> {weatherData.windSpeed} km/h
              </div>
              <div className="text-xs text-gray-600">
                <span className="font-medium">Visibility:</span> {weatherData.visibility} km
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Weather data unavailable</p>
        )}
      </div>

      {/* Nearby Places */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Nearby Places
        </h4>
        
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600">Finding nearby places...</span>
          </div>
        ) : nearbyPlaces.length > 0 ? (
          <div className="space-y-2">
            {nearbyPlaces.map((place, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {place.name}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {place.types[0].replace(/_/g, ' ')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-xs text-gray-600">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {Math.round(place.geometry.location.lat() * 1000) / 1000}
                  </div>
                  {place.rating && (
                    <div className="flex items-center text-xs text-yellow-600">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {place.rating.toFixed(1)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No nearby places found</p>
        )}
      </div>

      {/* Location Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          Location Stats
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {userLocation.accuracy ? Math.round(userLocation.accuracy) : 'N/A'}m
            </div>
            <div className="text-xs text-gray-600">GPS Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {userLocation.speed ? (userLocation.speed * 3.6).toFixed(1) : '0.0'}
            </div>
            <div className="text-xs text-gray-600">Speed (km/h)</div>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 text-center">
            Coordinates: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  );
}