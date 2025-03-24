import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [pastChallenges, setPastChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // This would normally fetch challenges from the API
    // For now we'll use placeholder data
    const fetchChallenges = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockChallenges = [
            {
              id: '1',
              name: 'Spring Marathon Training',
              description: 'Progressive training plan for spring marathon',
              startDate: '2025-02-01',
              endDate: '2025-05-01',
              goalType: 'distance',
              goalValue: 500,
              currentProgress: 325,
              participants: 87,
              status: 'active',
              daysLeft: 12,
            },
            {
              id: '2',
              name: '10K Personal Best',
              description: 'Challenge yourself to beat your 10K personal best',
              startDate: '2025-03-10',
              endDate: '2025-03-31',
              goalType: 'performance',
              goalValue: null,
              currentProgress: null,
              participants: 125,
              status: 'active',
              daysLeft: 8,
            },
            {
              id: '3',
              name: '30-Day Consistency',
              description: 'Run at least 3km every day for 30 days',
              startDate: '2025-01-15',
              endDate: '2025-02-15',
              goalType: 'streak',
              goalValue: 30,
              currentProgress: 30,
              participants: 215,
              status: 'completed',
              daysLeft: 0,
            },
          ];
          
          const active = mockChallenges.filter(c => c.status === 'active');
          const past = mockChallenges.filter(c => c.status === 'completed');
          
          setChallenges(mockChallenges);
          setActiveChallenges(active);
          setPastChallenges(past);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        setIsLoading(false);
      }
    };

    fetchChallenges();
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
        <h1 className="text-3xl font-bold text-gray-900">Challenges</h1>
        <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out">
          Create New Challenge
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Find Challenges</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Browse and join running challenges from the community.</p>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Challenge Type
              </label>
              <select
                id="type"
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option>All types</option>
                <option>Distance</option>
                <option>Streak</option>
                <option>Performance</option>
                <option>Group</option>
              </select>
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                id="difficulty"
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option>Any difficulty</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <select
                id="duration"
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option>Any duration</option>
                <option>Short (1-7 days)</option>
                <option>Medium (1-4 weeks)</option>
                <option>Long (1-3 months)</option>
                <option>Extended (3+ months)</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
              Find Challenges
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Active Challenges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {activeChallenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-400 relative">
              <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-xs font-medium text-gray-800">
                {challenge.daysLeft} days left
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white font-bold text-xl">{challenge.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-700 text-sm mb-4">{challenge.description}</p>
              
              {challenge.goalType === 'distance' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">Progress</span>
                    <span className="font-medium text-gray-700">{challenge.currentProgress} / {challenge.goalValue} km</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary-600 h-2.5 rounded-full" 
                      style={{ width: `${(challenge.currentProgress / challenge.goalValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>{challenge.participants} participants</span>
              </div>
              
              <div className="mt-2 flex space-x-2">
                <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-3 rounded-md transition duration-150 ease-in-out">
                  View Details
                </button>
                <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2 px-3 rounded-md transition duration-150 ease-in-out">
                  Invite Friends
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Completed Challenges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastChallenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow opacity-80">
            <div className="h-32 bg-gradient-to-r from-gray-600 to-gray-400 relative">
              <div className="absolute top-4 right-4 bg-green-500/90 rounded-full px-3 py-1 text-xs font-medium text-white">
                Completed
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white font-bold text-xl">{challenge.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-700 text-sm mb-4">{challenge.description}</p>
              
              {challenge.goalType === 'streak' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">Achieved</span>
                    <span className="font-medium text-gray-700">{challenge.currentProgress} / {challenge.goalValue} days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ width: `${(challenge.currentProgress / challenge.goalValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>{challenge.participants} participants</span>
              </div>
              
              <div className="mt-2">
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-3 rounded-md transition duration-150 ease-in-out">
                  View Results
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenges; 