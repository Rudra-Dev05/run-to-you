import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function RoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // This would normally fetch routes from the API
    // For now we'll use placeholder data
    const fetchRoutes = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockRoutes = [
            {
              id: '1',
              name: 'City Park Loop',
              distance: 5.8,
              elevationGain: 85,
              startLocation: 'Central Park',
              isPublic: true,
              popularity: 4.8,
              terrain: 'Mixed (Paved/Trail)',
            },
            {
              id: '2',
              name: 'Riverside Trail',
              distance: 7.2,
              elevationGain: 120,
              startLocation: 'River Park',
              isPublic: true,
              popularity: 4.6,
              terrain: 'Trail',
            },
            {
              id: '3',
              name: 'Mountain View Circuit',
              distance: 10.5,
              elevationGain: 450,
              startLocation: 'Mountain Base',
              isPublic: true,
              popularity: 4.9,
              terrain: 'Trail',
            },
          ];
          setRoutes(mockRoutes);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching routes:', error);
        setIsLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Routes</h1>
        <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out">
          Create New Route
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Find Routes</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Discover new places to run.</p>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter city or area"
              />
            </div>
            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">
                Distance
              </label>
              <select
                id="distance"
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option>Any distance</option>
                <option>Under 5 km</option>
                <option>5-10 km</option>
                <option>10-15 km</option>
                <option>Over 15 km</option>
              </select>
            </div>
            <div>
              <label htmlFor="terrain" className="block text-sm font-medium text-gray-700 mb-1">
                Terrain
              </label>
              <select
                id="terrain"
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option>Any terrain</option>
                <option>Road</option>
                <option>Trail</option>
                <option>Track</option>
                <option>Mixed</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
              Search Routes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((route) => (
          <div key={route.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-40 bg-gray-200 relative">
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white font-bold text-xl">{route.name}</h3>
                <p className="text-white/80 text-sm">{route.startLocation}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="block text-xs font-medium text-gray-500">DISTANCE</span>
                  <span className="block text-sm font-semibold text-gray-900">{route.distance} km</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">ELEVATION GAIN</span>
                  <span className="block text-sm font-semibold text-gray-900">{route.elevationGain} m</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-medium text-gray-500">TERRAIN</span>
                  <span className="block text-sm font-semibold text-gray-900">{route.terrain}</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">RATING</span>
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-gray-900 mr-1">{route.popularity}</span>
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                  View Details
                </button>
                <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                  Start Run
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoutesPage; 