import { useState } from 'react';
import { Link } from 'react-router-dom';

function ProfileHeader({ user, isOwnProfile = false }) {
  const [activeTab, setActiveTab] = useState('stats');
  
  // Calculate follower stats with thousand/million formatter
  const formatCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };
  
  // Default user data if not provided
  const profileData = {
    name: user?.name || 'Runner Name',
    username: user?.username || 'runner',
    bio: user?.bio || 'Running enthusiast and fitness lover',
    avatar: user?.avatar || 'https://via.placeholder.com/150',
    coverImage: user?.coverImage || 'https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400&q=80',
    location: user?.location,
    website: user?.website,
    following: user?.following || 128,
    followers: user?.followers || 254,
    isFollowing: user?.isFollowing || false,
    joinDate: user?.joinDate || new Date().toISOString(),
    stats: user?.stats || {
      totalRuns: 152,
      totalDistance: 1243.5,
      avgPace: '5:24',
      longestRun: 21.1,
      elevationGain: 12430,
      achievements: 14,
      challenges: 8,
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Cover Image */}
      <div className="h-48 relative bg-gray-200">
        <img 
          src={profileData.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        
        {/* Profile Actions */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {isOwnProfile ? (
            <Link 
              to="/settings/profile" 
              className="bg-white text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Edit Profile
            </Link>
          ) : (
            <>
              <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 p-2 rounded-full shadow-sm transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935-2.186m0 4.372V7.903" />
                </svg>
              </button>
              <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 p-2 rounded-full shadow-sm transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </button>
              <button 
                className={`${profileData.isFollowing 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-primary-600 text-white hover:bg-primary-700'
                } px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-colors`}
              >
                {profileData.isFollowing ? 'Following' : 'Follow'}
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="relative px-6 pt-4 pb-3">
        {/* Avatar */}
        <div className="absolute -top-16 left-6 ring-4 ring-white rounded-full">
          <img 
            src={profileData.avatar} 
            alt={profileData.name} 
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
          
          {/* Online Status Indicator */}
          {user?.isOnline && (
            <div className="absolute bottom-3 right-3 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
          )}
        </div>
        
        <div className="ml-36">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
              <p className="text-gray-500">@{profileData.username}</p>
            </div>
          </div>
          
          <div className="mt-3 text-gray-700">{profileData.bio}</div>
          
          {/* User Details */}
          <div className="mt-3 flex flex-wrap gap-y-2">
            {profileData.location && (
              <div className="flex items-center text-gray-600 text-sm mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {profileData.location}
              </div>
            )}
            
            {profileData.website && (
              <div className="flex items-center text-sm mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                  {profileData.website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
            
            <div className="flex items-center text-gray-600 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              Joined {new Date(profileData.joinDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
            </div>
          </div>
          
          {/* Follow Stats */}
          <div className="mt-4 flex space-x-4 text-sm">
            <Link to={`/profile/${profileData.username}/following`} className="flex items-center space-x-1 hover:underline">
              <span className="font-semibold text-gray-900">{formatCount(profileData.following)}</span>
              <span className="text-gray-600">Following</span>
            </Link>
            <Link to={`/profile/${profileData.username}/followers`} className="flex items-center space-x-1 hover:underline">
              <span className="font-semibold text-gray-900">{formatCount(profileData.followers)}</span>
              <span className="text-gray-600">Followers</span>
            </Link>
          </div>
        </div>
        
        {/* Profile Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              className={`pb-4 px-1 ${activeTab === 'stats' ? 'text-primary-600 border-b-2 border-primary-500 font-medium' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
              onClick={() => setActiveTab('stats')}
            >
              Stats
            </button>
            <button
              className={`pb-4 px-1 ${activeTab === 'activities' ? 'text-primary-600 border-b-2 border-primary-500 font-medium' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
              onClick={() => setActiveTab('activities')}
            >
              Activities
            </button>
            <button
              className={`pb-4 px-1 ${activeTab === 'achievements' ? 'text-primary-600 border-b-2 border-primary-500 font-medium' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
              onClick={() => setActiveTab('achievements')}
            >
              Achievements
            </button>
            <button
              className={`pb-4 px-1 ${activeTab === 'challenges' ? 'text-primary-600 border-b-2 border-primary-500 font-medium' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
              onClick={() => setActiveTab('challenges')}
            >
              Challenges
            </button>
          </div>
        </div>
        
        {/* Stats Tab Content - Always visible in header component */}
        {activeTab === 'stats' && (
          <div className="py-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Total Runs</div>
              <div className="mt-1 flex items-end">
                <span className="text-xl font-bold text-gray-900">{profileData.stats.totalRuns}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Distance</div>
              <div className="mt-1 flex items-end">
                <span className="text-xl font-bold text-gray-900">{profileData.stats.totalDistance.toLocaleString()}</span>
                <span className="ml-1 text-xs text-gray-500">km</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Avg Pace</div>
              <div className="mt-1 flex items-end">
                <span className="text-xl font-bold text-gray-900">{profileData.stats.avgPace}</span>
                <span className="ml-1 text-xs text-gray-500">/km</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Longest Run</div>
              <div className="mt-1 flex items-end">
                <span className="text-xl font-bold text-gray-900">{profileData.stats.longestRun}</span>
                <span className="ml-1 text-xs text-gray-500">km</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Elevation Gain</div>
              <div className="mt-1 flex items-end">
                <span className="text-xl font-bold text-gray-900">{profileData.stats.elevationGain.toLocaleString()}</span>
                <span className="ml-1 text-xs text-gray-500">m</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Achievements</div>
              <div className="mt-1 flex items-end">
                <span className="text-xl font-bold text-gray-900">{profileData.stats.achievements}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader; 