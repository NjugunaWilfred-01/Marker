export default function LocationStatus({ userLocation, error }) {
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-red-600">
          <h3 className="text-lg font-semibold">Location Error</h3>
          <p className="mt-2">{error}</p>
          <p className="text-sm mt-2">Please enable location services to track your position</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {userLocation ? 'Current Location' : 'Detecting Location...'}
      </h3>
      {userLocation ? (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Latitude:</span> {userLocation.lat.toFixed(6)}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Longitude:</span> {userLocation.lng.toFixed(6)}
          </p>
          <div className="mt-4 flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600 font-medium">Location Found</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-600">Searching for GPS signal...</span>
        </div>
      )}
    </div>
  );
}