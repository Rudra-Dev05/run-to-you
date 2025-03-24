import { useState } from 'react';
import { Link } from 'react-router-dom';

function ChallengeCard({ challenge, compact = false }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const progressPercent = Math.min(100, Math.round((challenge.progress / challenge.goal) * 100));
  const daysLeft = challenge.daysLeft || 0;
  
  const getStatusColor = () => {
    if (progressPercent >= 100) return 'bg-green-500';
    if (daysLeft <= 3) return 'bg-red-500';
    if (progressPercent < 25 && daysLeft < 10) return 'bg-amber-500';
    return 'bg-primary-500';
  };
  
  const getStatusText = () => {
    if (progressPercent >= 100) return 'Completed!';
    if (daysLeft <= 0) return 'Ended';
    if (daysLeft === 1) return '1 day left';
    return `${daysLeft} days left`;
  };

  return (
    <div 
      className={`rounded-xl overflow-hidden bg-white border border-gray-100 ${compact ? '' : 'shadow-sm hover:shadow-md'} transition-all duration-200 h-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Challenge Header with Image */}
      <div className={`relative ${compact ? 'h-28' : 'h-40'}`}>
        <img 
          src={challenge.image || 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'} 
          alt={challenge.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        
        {/* Challenge Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${challenge.type === 'distance' ? 'bg-blue-100 text-blue-800' : challenge.type === 'elevation' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'}`}>
            {challenge.type === 'distance' ? 'Distance' : challenge.type === 'elevation' ? 'Elevation' : 'Time'}
          </span>
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800`}>
            {getStatusText()}
          </span>
        </div>
        
        {/* Challenge Info */}
        <div className="absolute bottom-0 left-0 w-full p-3">
          <h3 className={`font-bold text-white ${compact ? 'text-sm' : 'text-lg'} line-clamp-1`}>{challenge.title}</h3>
          {!compact && (
            <p className="text-white/80 text-sm mt-1 line-clamp-1">{challenge.description}</p>
          )}
        </div>
      </div>
      
      {/* Progress Section */}
      <div className={`p-3 ${compact ? 'pt-2' : ''}`}>
        <div className="flex justify-between items-center text-sm mb-1.5">
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
            </svg>
            <span className="font-medium text-gray-800">{challenge.participants} participants</span>
          </div>
          <div className="font-medium text-primary-600">
            {progressPercent}% complete
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${getStatusColor()}`}
            style={{ width: `${progressPercent}%`, transition: 'width 1s ease-in-out' }}
          ></div>
        </div>
        
        {/* Goal Information */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="font-semibold text-gray-900">
                {challenge.progress} {challenge.type === 'distance' ? 'km' : challenge.type === 'elevation' ? 'm' : 'hrs'}
              </span>
            </div>
            
            <div className="text-gray-300">/</div>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Goal</span>
              <span className="font-semibold text-gray-900">
                {challenge.goal} {challenge.type === 'distance' ? 'km' : challenge.type === 'elevation' ? 'm' : 'hrs'}
              </span>
            </div>
          </div>
          
          {!compact && (
            <Link 
              to={`/challenges/${challenge.id}`}
              className="inline-flex items-center text-xs font-medium text-primary-600 hover:text-primary-700"
            >
              View Details
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          )}
        </div>
      </div>
      
      {/* Friends Participating - Only show on non-compact version */}
      {!compact && challenge.friends && challenge.friends.length > 0 && (
        <div className="px-3 pb-3 pt-1">
          <div className="flex -space-x-2 overflow-hidden">
            {challenge.friends.slice(0, 5).map((friend, idx) => (
              <img 
                key={idx}
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white" 
                src={friend.avatar} 
                alt={friend.name}
              />
            ))}
            {challenge.friends.length > 5 && (
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500 ring-2 ring-white">
                +{challenge.friends.length - 5}
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Call to Action - Only for non-compact cards */}
      {!compact && progressPercent < 100 && (
        <div className="px-3 pb-3">
          <button 
            className="w-full py-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white text-sm font-medium rounded-lg transition-all duration-150"
          >
            Log Activity
          </button>
        </div>
      )}
    </div>
  );
}

export default ChallengeCard; 