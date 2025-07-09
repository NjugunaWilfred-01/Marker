import { useState } from 'react';
import MapContainer from './components/MapContainer';
import RealTimeInfo from './components/RealTimeInfo';

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <svg className="w-8 h-8 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Logistics Tracker
              </h1>
              <p className="text-gray-600">Real-time location tracking with Google Maps integration</p>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${userLocation ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {userLocation ? 'Live' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                  </svg>
                  Live Map View
                </h2>
                <p className="text-gray-600">Your current location with real-time tracking and movement history</p>
                
                {/* Quick Stats */}
                {userLocation && (
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <span className="text-gray-600">
                      <span className="font-medium">Speed:</span> {userLocation.speed ? (userLocation.speed * 3.6).toFixed(1) : '0.0'} km/h
                    </span>
                    <span className="text-gray-600">
                      <span className="font-medium">Accuracy:</span> ±{userLocation.accuracy ? Math.round(userLocation.accuracy) : 'N/A'}m
                    </span>
                  </div>
                )}
              </div>
              <MapContainer
                setUserLocation={setUserLocation}
                setError={setError}
                userLocation={userLocation}
              />
            </div>
          </div>

          {/* Right Sidebar - Real-time Info */}
          <div className="lg:col-span-1">
            <RealTimeInfo userLocation={userLocation} />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600">
              🌍 Real-time GPS tracking • 📍 Address resolution • 🗺️ Movement history • ⚡ Live updates
            </p>
            {userLocation && (
              <p className="text-xs text-gray-500 mt-2">
                Last updated: {new Date(userLocation.timestamp).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;