import { useState, useEffect } from 'react';

const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '500px',
  backgroundColor: '#f0f0f0',
  border: '2px solid #ddd',
  borderRadius: '8px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
};

const PIN_STYLE = {
  position: 'absolute',
  width: '32px',
  height: '32px',
  backgroundColor: '#3b82f6',
  borderRadius: '50%',
  border: '3px solid white',
  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '12px',
  fontWeight: 'bold'
};

export default function MapContainerTest({ setUserLocation, setError, userLocation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [simulatedLocation, setSimulatedLocation] = useState(null);

  // Simulate getting user location
  useEffect(() => {
    setIsLoading(true);
    
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setIsLoading(false);
      return;
    }

    // Simulate location detection with actual geolocation
    navigator.geolocation.getCurrentPosition(
      position => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          speed: position.coords.speed,
          timestamp: Date.now()
        };
        setSimulatedLocation(loc);
        setUserLocation(loc);
        setError(null);
        setIsLoading(false);
      },
      err => {
        let message = 'Location detection failed';
        if (err.code === err.PERMISSION_DENIED) message = 'Location permission denied';
        if (err.code === err.TIMEOUT) message = 'Location request timed out';
        setError(message);
        setIsLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, [setUserLocation, setError]);

  // Simulate location updates every 5 seconds
  useEffect(() => {
    if (!simulatedLocation) return;

    const interval = setInterval(() => {
      // Simulate small location changes (like GPS drift)
      const newLoc = {
        ...simulatedLocation,
        lat: simulatedLocation.lat + (Math.random() - 0.5) * 0.0001,
        lng: simulatedLocation.lng + (Math.random() - 0.5) * 0.0001,
        timestamp: Date.now()
      };
      setSimulatedLocation(newLoc);
      setUserLocation(newLoc);
    }, 5000);

    return () => clearInterval(interval);
  }, [simulatedLocation, setUserLocation]);

  return (
    <div style={MAP_CONTAINER_STYLE}>
      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Detecting your location...</p>
        </div>
      ) : (
        <>
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Simulated Map View</h3>
            <p className="text-sm text-gray-600">
              This is a test version showing location detection and pin rendering
            </p>
            {userLocation && (
              <div className="mt-2 text-xs text-gray-500">
                <p>Lat: {userLocation.lat.toFixed(6)}</p>
                <p>Lng: {userLocation.lng.toFixed(6)}</p>
                <p>Last updated: {new Date(userLocation.timestamp).toLocaleTimeString()}</p>
              </div>
            )}
          </div>
          
          {/* Simulated map area */}
          <div style={{
            width: '80%',
            height: '300px',
            backgroundColor: '#e8f4f8',
            border: '1px solid #b0d4e3',
            borderRadius: '4px',
            position: 'relative',
            backgroundImage: 'linear-gradient(45deg, #f0f8ff 25%, transparent 25%), linear-gradient(-45deg, #f0f8ff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f8ff 75%), linear-gradient(-45deg, transparent 75%, #f0f8ff 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}>
            {/* Location pin */}
            {userLocation && (
              <div 
                style={{
                  ...PIN_STYLE,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'pulse 2s infinite'
                }}
                title={`Your Location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`}
              >
                📍
              </div>
            )}
            
            {/* Accuracy circle */}
            {userLocation && userLocation.accuracy && (
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: Math.min(userLocation.accuracy / 10, 100) + 'px',
                height: Math.min(userLocation.accuracy / 10, 100) + 'px',
                borderRadius: '50%',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
              }} />
            )}
          </div>
          
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Location tracking active</span>
            </div>
          </div>
        </>
      )}
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
}