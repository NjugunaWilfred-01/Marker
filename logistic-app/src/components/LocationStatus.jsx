export default function LocationStatus({ userLocation, error }) {
  // Format speed from m/s to km/h
  const formatSpeed = (speedMs) => {
    if (!speedMs || speedMs < 0) return '0';
    return (speedMs * 3.6).toFixed(1);
  };

  // Format heading to compass direction
  const formatHeading = (heading) => {
    if (!heading && heading !== 0) return 'N/A';
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(heading / 45) % 8;
    return `${directions[index]} (${Math.round(heading)}°)`;
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString();
  };

  // Get accuracy status
  const getAccuracyStatus = (accuracy) => {
    if (!accuracy) return { text: 'Unknown', color: 'gray' };
    if (accuracy <= 5) return { text: 'Excellent', color: 'green' };
    if (accuracy <= 10) return { text: 'Good', color: 'blue' };
    if (accuracy <= 20) return { text: 'Fair', color: 'yellow' };
    return { text: 'Poor', color: 'red' };
  };

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-red-600">
          <h3 className="text-lg font-semibold flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Location Error
          </h3>
          <p className="mt-2">{error}</p>
          <p className="text-sm mt-2">Please enable location services to track your position</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Location Status */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {userLocation ? 'Live Location' : 'Detecting Location...'}
        </h3>
        
        {userLocation ? (
          <div className="space-y-3">
            {/* Coordinates */}
            <div className="grid grid-cols-1 gap-2">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Latitude:</span>
                <span className="ml-2 font-mono text-gray-900">{userLocation.lat.toFixed(6)}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700">Longitude:</span>
                <span className="ml-2 font-mono text-gray-900">{userLocation.lng.toFixed(6)}</span>
              </div>
            </div>

            {/* Address */}
            {userLocation.address && (
              <div className="text-sm">
                <span className="font-medium text-gray-700">Address:</span>
                <p className="mt-1 text-gray-900">{userLocation.address}</p>
              </div>
            )}

            {/* Status Indicator */}
            <div className="flex items-center space-x-2 pt-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">Live Tracking Active</span>
            </div>

            {/* Last Update */}
            {userLocation.timestamp && (
              <div className="text-xs text-gray-500">
                Last updated: {formatTime(userLocation.timestamp)}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600">Searching for GPS signal...</span>
          </div>
        )}
      </div>

      {/* Movement & Accuracy Info */}
      {userLocation && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Movement Data
          </h4>
          
          <div className="grid grid-cols-1 gap-3">
            {/* Speed */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Speed:</span>
              <span className="text-sm font-mono text-gray-900">
                {formatSpeed(userLocation.speed)} km/h
              </span>
            </div>

            {/* Heading */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Direction:</span>
              <span className="text-sm font-mono text-gray-900">
                {formatHeading(userLocation.heading)}
              </span>
            </div>

            {/* Accuracy */}
            {userLocation.accuracy && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Accuracy:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono text-gray-900">
                    ±{Math.round(userLocation.accuracy)}m
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    getAccuracyStatus(userLocation.accuracy).color === 'green' ? 'bg-green-100 text-green-700' :
                    getAccuracyStatus(userLocation.accuracy).color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    getAccuracyStatus(userLocation.accuracy).color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {getAccuracyStatus(userLocation.accuracy).text}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}