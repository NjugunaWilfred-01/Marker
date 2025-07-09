import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBox, 
  faCheckCircle, 
  faClock, 
  faRoute, 
  faMapMarkerAlt,
  faPhone,
  faUser
} from '@fortawesome/free-solid-svg-icons';

export default function DeliveryPanel({ userLocation }) {
  const [deliveries] = useState([
    {
      id: 'DEL001',
      customer: 'John Smith',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, Downtown',
      items: ['Electronics Package', 'Documents'],
      status: 'in-progress',
      priority: 'high',
      estimatedTime: '15 mins',
      distance: '2.3 km'
    },
    {
      id: 'DEL002',
      customer: 'Sarah Johnson',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Avenue, Midtown',
      items: ['Clothing Package'],
      status: 'pending',
      priority: 'medium',
      estimatedTime: '25 mins',
      distance: '4.1 km'
    },
    {
      id: 'DEL003',
      customer: 'Mike Wilson',
      phone: '+1 (555) 456-7890',
      address: '789 Pine Road, Uptown',
      items: ['Food Delivery', 'Beverages'],
      status: 'completed',
      priority: 'low',
      estimatedTime: 'Completed',
      distance: '1.8 km'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-orange-600 bg-orange-100';
      case 'pending': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-orange-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const handleStatusUpdate = (deliveryId, newStatus) => {
    // In a real app, this would update the backend
    console.log(`Updating delivery ${deliveryId} to ${newStatus}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-logistics p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FontAwesomeIcon icon={faBox} className="text-logistics-500 mr-2" />
          Active Deliveries
        </h3>
        <span className="bg-logistics-100 text-logistics-700 px-3 py-1 rounded-full text-sm font-medium">
          {deliveries.filter(d => d.status !== 'completed').length} Active
        </span>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {deliveries.map((delivery) => (
          <div 
            key={delivery.id} 
            className={`border-l-4 ${getPriorityColor(delivery.priority)} bg-gray-50 p-4 rounded-r-lg`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-gray-900">{delivery.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                    {delivery.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium">{delivery.customer}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <FontAwesomeIcon icon={faPhone} className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{delivery.phone}</span>
                  </div>
                  
                  <div className="flex items-start text-gray-600">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
                    <span>{delivery.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faRoute} className="w-4 h-4 mr-1 text-gray-500" />
                      <span>{delivery.distance}</span>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-1 text-gray-500" />
                      <span>{delivery.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Items:</p>
                    <div className="flex flex-wrap gap-1">
                      {delivery.items.map((item, index) => (
                        <span 
                          key={index}
                          className="bg-white px-2 py-1 rounded text-xs text-gray-700 border"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {delivery.status !== 'completed' && (
                <div className="ml-4 flex flex-col space-y-2">
                  {delivery.status === 'pending' && (
                    <button
                      onClick={() => handleStatusUpdate(delivery.id, 'in-progress')}
                      className="bg-orange-500 text-white px-3 py-1 rounded text-xs hover:bg-orange-600 transition-colors"
                    >
                      Start
                    </button>
                  )}
                  {delivery.status === 'in-progress' && (
                    <button
                      onClick={() => handleStatusUpdate(delivery.id, 'completed')}
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-colors flex items-center"
                    >
                      <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                      Complete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
