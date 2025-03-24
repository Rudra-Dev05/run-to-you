import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  // Mock data for now - would come from API
  const stats = {
    totalDistance: 125.3,
    totalRuns: 23,
    monthlyDistance: 42.1,
    monthlyRuns: 8,
    streakDays: 5,
    totalPoints: 1250,
  };

  const recentRuns = [
    {
      id: 1,
      date: '2025-03-15',
      title: 'Morning Run',
      distance: 5.2,
      duration: '25:40',
      pace: '4:56',
    },
    {
      id: 2,
      date: '2025-03-13',
      title: 'Hill Training',
      distance: 7.8,
      duration: '42:15',
      pace: '5:25',
    },
    {
      id: 3,
      date: '2025-03-11',
      title: 'Easy Recovery',
      distance: 3.4,
      duration: '19:30',
      pace: '5:44',
    },
  ];

  const activeChallenges = [
    {
      id: 1,
      title: '100km Monthly Challenge',
      progress: 42.1,
      goal: 100,
      daysLeft: 15,
      participants: 248,
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      title: 'Spring 5k Improvement',
      progress: 2,
      goal: 5,
      daysLeft: 10,
      participants: 124,
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
    },
  ];

  const recentAchievements = [
    {
      id: 1,
      title: 'Consistent Runner',
      description: 'Run at least 3 times per week for 4 weeks',
      date: '2025-03-12',
      icon: '🏃',
      color: 'bg-amber-500',
    },
    {
      id: 2,
      title: 'Half Marathon Ready',
      description: 'Complete a 21.1km run',
      date: '2025-03-05',
      icon: '🏆',
      color: 'bg-teal-500',
    },
  ];
  
  const friendActivities = [
    {
      id: 1,
      user: {
        name: 'Emma Thompson',
        avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
      },
      action: 'completed a 10K run',
      time: '2 hours ago',
      details: {
        distance: 10.2,
        duration: '52:14',
        likes: 24
      }
    },
    {
      id: 2,
      user: {
        name: 'James Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      action: 'joined the 100km Monthly Challenge',
      time: '5 hours ago',
      details: {
        likes: 12
      }
    },
    {
      id: 3,
      user: {
        name: 'Sarah Miller',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
      },
      action: 'earned the Early Bird achievement',
      time: '1 day ago',
      details: {
        likes: 18
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
        {/* Left Column - Profile Card & Stats */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0 space-y-6 md:sticky md:top-20">
          {/* Profile Card */}
          {user && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-400"></div>
              <div className="px-6 py-5">
                <div className="flex flex-col items-center">
                  <div className="-mt-16">
                    <img
                      className="h-24 w-24 rounded-full border-4 border-white object-cover"
                      src={user.profilePicture || 'https://via.placeholder.com/150'}
                      alt="User avatar"
                    />
                  </div>
                  <div className="mt-3">
                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.profile?.bio || 'Running enthusiast'}</p>
                  </div>
                  <div className="mt-4 flex border-t border-gray-100 pt-4">
                    <a href="#" className="mt-3 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-all duration-150">
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-1.5">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Monthly Distance</p>
                    <p className="text-lg font-bold text-gray-900">{stats.monthlyDistance} km</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">+15%</span>
              </div>
              
              <div className="flex items-center justify-between py-1.5">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Monthly Runs</p>
                    <p className="text-lg font-bold text-gray-900">{stats.monthlyRuns}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">+2</span>
              </div>
              
              <div className="flex items-center justify-between py-1.5">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Current Streak</p>
                    <p className="text-lg font-bold text-gray-900">{stats.streakDays} days</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">🔥</span>
              </div>
            </div>
          </div>
          
          {/* Active Challenges */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Active Challenges</h3>
              <button
                onClick={() => navigate('/challenges')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                See all
              </button>
            </div>
            <div className="space-y-4">
              {activeChallenges.map((challenge) => (
                <div key={challenge.id} className="rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-150">
                  <div className="relative h-24">
                    <img 
                      src={challenge.image} 
                      alt={challenge.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-3">
                      <h4 className="font-medium text-white text-sm truncate">{challenge.title}</h4>
                      <p className="text-xs text-white/80">{challenge.participants} participants</p>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(challenge.progress / challenge.goal) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-medium">
                        {challenge.progress} / {challenge.goal} km
                      </span>
                      <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {challenge.daysLeft}d left
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Achievements */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Achievements</h3>
              <button
                onClick={() => navigate('/achievements')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                See all
              </button>
            </div>
            <div className="space-y-4">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-150">
                  <div className={`${achievement.color} text-white w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">New</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">{achievement.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      
        {/* Right Column - Recent Runs and Activity Feed */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Recent Runs */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Runs</h3>
              <button
                onClick={() => navigate('/runs')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                See all
              </button>
            </div>
            <div className="space-y-4">
              {recentRuns.map((run) => (
                <div key={run.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all duration-150">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{run.title}</h4>
                      <p className="text-sm text-gray-500 mt-0.5">{run.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-150">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-150">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935-2.186 2.25 2.25 0 0 0-3.935-2.186m0 4.372V7.903" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1">
                    <div className="flex flex-col items-center justify-center px-2 py-3 rounded-lg bg-white">
                      <span className="text-xs font-medium text-gray-500">Distance</span>
                      <span className="text-base font-bold text-blue-600">{run.distance} km</span>
                    </div>
                    <div className="flex flex-col items-center justify-center px-2 py-3 rounded-lg bg-white">
                      <span className="text-xs font-medium text-gray-500">Duration</span>
                      <span className="text-base font-bold text-blue-600">{run.duration}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center px-2 py-3 rounded-lg bg-white">
                      <span className="text-xs font-medium text-gray-500">Pace</span>
                      <span className="text-base font-bold text-blue-600">{run.pace}/km</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Activity Feed */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Feed</h3>
            <div className="space-y-5">
              {friendActivities.map((activity) => (
                <div key={activity.id} className="flex space-x-3 pb-5 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <img 
                    src={activity.user.avatar} 
                    alt={activity.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline">
                      <span className="font-medium text-gray-900 mr-1">{activity.user.name}</span>
                      <span className="text-gray-600">{activity.action}</span>
                      <span className="ml-auto text-xs text-gray-400">{activity.time}</span>
                    </div>
                    
                    {activity.details.distance && (
                      <div className="mt-2 bg-gray-50 p-3 rounded-lg flex justify-between">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Distance</span>
                          <p className="text-base font-semibold text-gray-900">{activity.details.distance} km</p>
                        </div>
                        {activity.details.duration && (
                          <div>
                            <span className="text-sm font-medium text-gray-600">Time</span>
                            <p className="text-base font-semibold text-gray-900">{activity.details.duration}</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-2 flex space-x-2">
                      <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-all duration-150">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <span>Like • {activity.details.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-all duration-150">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                        </svg>
                        <span>Comment</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 