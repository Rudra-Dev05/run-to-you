import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';

function UserProfile({ userId, detailed = false }) {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    posts: 0,
    followers: 0,
    following: 0,
    totalDistance: 0,
    completedChallenges: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        // This would be a real API call in production
        // const response = await fetch(`/api/users/${userId}`);
        // const data = await response.json();
        
        // Simulate API response
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const userData = {
          id: userId,
          name: 'Alex Runner',
          username: 'alex_runs',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
          bio: 'Running enthusiast | Marathon finisher | Love exploring new trails and pushing my limits',
          isFollowing: Math.random() > 0.5,
          isCurrentUser: userId === 'current-user',
          stats: {
            posts: 42,
            followers: 230,
            following: 184,
            totalDistance: 1243,
            completedChallenges: 8
          }
        };
        
        setUser(userData);
        setStats(userData.stats);
        setError(null);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-300 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (!user) return null;

  // Simple profile view (header style)
  if (!detailed) {
    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <Link to={`/profile/${user.id}`}>
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
          </Link>
          <div>
            <Link to={`/profile/${user.id}`}>
              <h3 className="font-medium text-gray-900 hover:underline">{user.name}</h3>
            </Link>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>
        
        {!user.isCurrentUser && (
          <FollowButton 
            userId={user.id} 
            initialIsFollowing={user.isFollowing}
          />
        )}
      </div>
    );
  }

  // Detailed profile view
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Cover photo */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      
      {/* Profile header */}
      <div className="px-4 pt-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end">
          {/* Avatar - positioned to overlay the cover photo */}
          <div className="flex-shrink-0 -mt-16 sm:mr-6">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
            />
          </div>
          
          {/* Profile info */}
          <div className="mt-4 sm:mt-0 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
              
              {!user.isCurrentUser ? (
                <FollowButton 
                  userId={user.id} 
                  initialIsFollowing={user.isFollowing}
                  size="medium"
                />
              ) : (
                <Link 
                  to="/settings/profile" 
                  className="px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Edit Profile
                </Link>
              )}
            </div>
            
            {user.bio && (
              <p className="mt-2 text-sm text-gray-600">{user.bio}</p>
            )}
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center border-b border-gray-200 pb-6">
          <div>
            <p className="text-xl font-bold text-gray-900">{stats.posts}</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{stats.followers}</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{stats.following}</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>
        
        {/* Running stats */}
        <div className="py-4 grid grid-cols-2 gap-4 text-center">
          <div className="bg-blue-50 px-4 py-3 rounded-lg">
            <div className="flex flex-col items-center">
              <svg className="h-6 w-6 text-blue-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <p className="text-sm font-medium text-gray-900">{stats.totalDistance} km</p>
              <p className="text-xs text-gray-500">Total Distance</p>
            </div>
          </div>
          <div className="bg-indigo-50 px-4 py-3 rounded-lg">
            <div className="flex flex-col items-center">
              <svg className="h-6 w-6 text-indigo-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium text-gray-900">{stats.completedChallenges}</p>
              <p className="text-xs text-gray-500">Challenges Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile; 