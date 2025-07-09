import { useState } from 'react';
import MapContainer from './components/MapContainer';
import LocationStatus from './components/LocationStatus';

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Logistics Tracker</h1>
          <p className="text-gray-600">Real-time location tracking</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <LocationStatus userLocation={userLocation} error={error} />
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Live Map</h2>
                <p className="text-gray-600">Your current location</p>
              </div>
              <MapContainer
                setUserLocation={setUserLocation}
                setError={setError}
                userLocation={userLocation}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;