import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRoute, 
  faGasPump, 
  faClock, 
  faRoad,
  faOptimize,
  faRefresh
} from '@fortawesome/free-solid-svg-icons';

export default function RouteOptimization({ userLocation }) {
  const [routeData] = useState({
    totalDistance: '12.4 km',
    estimatedTime: '45 mins',
    fuelCost: '$8.50',
    stops: 4,
    optimizationSavings: {
      distance: '2.1 km',
      time: '12 mins',
      fuel: '$1.80'
    }
  });

  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimizeRoute = () => {
    setIsOptimizing(true);
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-logistics p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FontAwesomeIcon icon={faRoute} className="text-logistics-500 mr-2" />
          Route Optimization
        </h3>
        <button
          onClick={handleOptimizeRoute}
          disabled={isOptimizing}
          className="bg-logistics-500 text-white px-4 py-2 rounded-lg hover:bg-logistics-600 transition-colors disabled:opacity-50 flex items-center text-sm"
        >
          <FontAwesomeIcon 
            icon={isOptimizing ? faRefresh : faOptimize} 
            className={`mr-2 ${isOptimizing ? 'animate-spin' : ''}`} 
          />
          {isOptimizing ? 'Optimizing...' : 'Optimize Route'}
        </button>
      </div>

      <div className="space-y-4">
        {/* Current Route Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-logistics-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Distance</p>
                <p className="text-xl font-semibold text-logistics-700">{routeData.totalDistance}</p>
              </div>
              <FontAwesomeIcon icon={faRoad} className="text-logistics-500 text-xl" />
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Est. Time</p>
                <p className="text-xl font-semibold text-orange-700">{routeData.estimatedTime}</p>
              </div>
              <FontAwesomeIcon icon={faClock} className="text-orange-500 text-xl" />
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Fuel Cost</p>
                <p className="text-xl font-semibold text-green-700">{routeData.fuelCost}</p>
              </div>
              <FontAwesomeIcon icon={faGasPump} className="text-green-500 text-xl" />
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Stops</p>
                <p className="text-xl font-semibold text-purple-700">{routeData.stops}</p>
              </div>
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{routeData.stops}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Savings */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center">
            <FontAwesomeIcon icon={faOptimize} className="mr-2" />
            Potential Savings with Optimization
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">-{routeData.optimizationSavings.distance}</p>
              <p className="text-sm text-green-700">Distance</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">-{routeData.optimizationSavings.time}</p>
              <p className="text-sm text-green-700">Time</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">-{routeData.optimizationSavings.fuel}</p>
              <p className="text-sm text-green-700">Fuel Cost</p>
            </div>
          </div>
        </div>

        {/* Route Preferences */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Route Preferences</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-logistics-600 mr-2" defaultChecked />
              <span className="text-sm text-gray-700">Avoid toll roads</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-logistics-600 mr-2" />
              <span className="text-sm text-gray-700">Prioritize highways</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-logistics-600 mr-2" defaultChecked />
              <span className="text-sm text-gray-700">Minimize fuel consumption</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
