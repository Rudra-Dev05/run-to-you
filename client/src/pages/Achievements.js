import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // This would normally fetch achievements from the API
    // For now we'll use placeholder data
    const fetchAchievements = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockAchievements = [
            {
              id: '1',
              name: 'Early Bird',
              description: 'Complete 10 runs before 8:00 AM',
              category: 'lifestyle',
              progress: 10,
              target: 10,
              completed: true,
              dateEarned: '2025-03-10',
              icon: '🌅',
            },
            {
              id: '2',
              name: 'Distance Demon',
              description: 'Run a total of 100 kilometers',
              category: 'distance',
              progress: 125,
              target: 100,
              completed: true,
              dateEarned: '2025-02-28',
              icon: '🏃',
            },
            {
              id: '3',
              name: 'Weekend Warrior',
              description: 'Complete runs on 10 consecutive weekends',
              category: 'consistency',
              progress: 8,
              target: 10,
              completed: false,
              dateEarned: null,
              icon: '📅',
            },
            {
              id: '4',
              name: 'Speed Demon',
              description: 'Run 5km in under 25 minutes',
              category: 'performance',
              progress: 0,
              target: 1,
              completed: false,
              dateEarned: null,
              icon: '⚡',
            },
            {
              id: '5',
              name: 'Hill Climber',
              description: 'Accumulate 1000m of elevation gain',
              category: 'elevation',
              progress: 750,
              target: 1000,
              completed: false,
              dateEarned: null,
              icon: '⛰️',
            },
            {
              id: '6',
              name: 'Social Runner',
              description: 'Complete 5 group runs',
              category: 'social',
              progress: 3,
              target: 5,
              completed: false,
              dateEarned: null,
              icon: '👥',
            },
          ];
          
          setAchievements(mockAchievements);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching achievements:', error);
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const earnedAchievements = achievements.filter(a => a.completed);
  const inProgressAchievements = achievements.filter(a => !a.completed);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
        <p className="text-gray-600">Track your progress and earn badges for your running accomplishments</p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-4 py-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Achievement Progress</h2>
            <p className="mt-1 text-sm text-gray-500">You've earned {earnedAchievements.length} out of {achievements.length} achievements</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center">
              <div className="w-44 bg-gray-200 rounded-full h-2.5 mr-2">
                <div 
                  className="bg-primary-600 h-2.5 rounded-full" 
                  style={{ width: `${(earnedAchievements.length / achievements.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {Math.round((earnedAchievements.length / achievements.length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Earned Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {earnedAchievements.map((achievement) => (
          <div key={achievement.id} className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-green-500">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-full p-3 text-2xl">
                  {achievement.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{achievement.name}</h3>
                  <div className="mt-1 text-sm text-gray-500">
                    <p>{achievement.description}</p>
                    <p className="mt-1 font-medium text-green-600">Earned on {achievement.dateEarned}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">In Progress</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {inProgressAchievements.map((achievement) => (
          <div key={achievement.id} className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-gray-300">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gray-100 rounded-full p-3 text-2xl">
                  {achievement.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{achievement.name}</h3>
                  <div className="mt-1 text-sm text-gray-500">
                    <p>{achievement.description}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Progress</span>
                  <span className="font-medium text-gray-700">{achievement.progress} / {achievement.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full" 
                    style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements; 