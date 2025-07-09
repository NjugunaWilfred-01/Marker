export default function LocationStatus({ userLocation, error }) {

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-red-600">
          <h3 className="text-lg font-semibold">Location Error</h3>
          <p className="mt-2">{error}</p>
          <p className="text-sm mt-2">Please enable location services and refresh the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {userLocation ? '📍 Current Location' : '🔍 Finding Location...'}
      </h3>

      {userLocation ? (
        <div className="space-y-3">
          <div className="text-sm">
            <span className="font-medium text-gray-700">Latitude:</span>
            <span className="ml-2 font-mono text-gray-900">{userLocation[0].toFixed(6)}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Longitude:</span>
            <span className="ml-2 font-mono text-gray-900">{userLocation[1].toFixed(6)}</span>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Location Found!</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-600">Getting your location...</span>
        </div>
      )}
    </div>
  );
}