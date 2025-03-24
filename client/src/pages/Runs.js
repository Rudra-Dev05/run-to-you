import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Runs() {
  const [runs, setRuns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // This would normally fetch runs from the API
    // For now we'll use placeholder data
    const fetchRuns = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockRuns = [
            {
              id: '1',
              title: 'Morning Run',
              date: '2025-03-15',
              distance: 5.2,
              duration: '25:40',
              pace: '4:56',
              elevationGain: 120,
            },
            {
              id: '2',
              title: 'Hill Training',
              date: '2025-03-13',
              distance: 7.8,
              duration: '42:15',
              pace: '5:25',
              elevationGain: 350,
            },
            {
              id: '3',
              title: 'Easy Recovery',
              date: '2025-03-11',
              distance: 3.4,
              duration: '19:30',
              pace: '5:44',
              elevationGain: 45,
            },
          ];
          setRuns(mockRuns);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching runs:', error);
        setIsLoading(false);
      }
    };

    fetchRuns();
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
        <h1 className="text-3xl font-bold text-gray-900">My Runs</h1>
        <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out">
          Add New Run
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Run History</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Your complete running history and stats.</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {runs.map((run) => (
            <div key={run.id} className="px-4 py-5 sm:p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{run.title}</h4>
                  <p className="text-sm text-gray-500">{run.date}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-primary-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button className="text-gray-600 hover:text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div>
                  <span className="block text-sm font-medium text-gray-500">Distance</span>
                  <span className="block mt-1 text-sm font-semibold text-gray-900">{run.distance} km</span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-500">Duration</span>
                  <span className="block mt-1 text-sm font-semibold text-gray-900">{run.duration}</span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-500">Pace</span>
                  <span className="block mt-1 text-sm font-semibold text-gray-900">{run.pace}/km</span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-500">Elevation Gain</span>
                  <span className="block mt-1 text-sm font-semibold text-gray-900">{run.elevationGain} m</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Runs; 