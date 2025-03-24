import { useState } from 'react';
import { Link } from 'react-router-dom';

function ActivityCard({ activity }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(activity.details?.likes || 0);
  const [showComments, setShowComments] = useState(false);
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <Link to={`/profile/${activity.user?.id}`} className="flex-shrink-0">
            <div className="relative">
              <img 
                src={activity.user?.avatar || 'https://via.placeholder.com/150'} 
                alt={activity.user?.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white ring-1 ring-gray-100"
              />
              {activity.user?.isOnline && (
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-1 ring-white"></span>
              )}
            </div>
          </Link>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <Link to={`/profile/${activity.user?.id}`} className="font-medium text-gray-900 hover:text-primary-600 transition-colors">
                  {activity.user?.name}
                </Link>
                <span className="text-gray-600 text-sm ml-1">{activity.action}</span>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
            
            {activity.details?.caption && (
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">{activity.details.caption}</p>
            )}
            
            {activity.details?.distance && (
              <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase">Distance</span>
                    <p className="text-base font-semibold text-gray-900">{activity.details.distance} km</p>
                  </div>
                  {activity.details?.duration && (
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase">Time</span>
                      <p className="text-base font-semibold text-gray-900">{activity.details.duration}</p>
                    </div>
                  )}
                  {activity.details?.pace && (
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase">Pace</span>
                      <p className="text-base font-semibold text-gray-900">{activity.details.pace}/km</p>
                    </div>
                  )}
                  {activity.details?.elevation && (
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase">Elevation</span>
                      <p className="text-base font-semibold text-gray-900">{activity.details.elevation}m</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activity.details?.image && (
              <div className="mt-3 rounded-lg overflow-hidden">
                <img 
                  src={activity.details.image} 
                  alt="Activity" 
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            
            {activity.details?.challengeName && (
              <div className="mt-3 bg-primary-50 p-3 rounded-lg flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-700">{activity.details.challengeName}</p>
                  <p className="text-xs text-primary-600">{activity.details.challengeParticipants} participants</p>
                </div>
              </div>
            )}
            
            {activity.details?.achievement && (
              <div className="mt-3 bg-amber-50 p-3 rounded-lg flex items-center">
                <div className="flex-shrink-0 mr-3 text-2xl">{activity.details.achievement.icon}</div>
                <div>
                  <p className="text-sm font-medium text-amber-700">{activity.details.achievement.name}</p>
                  <p className="text-xs text-amber-600">{activity.details.achievement.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex space-x-3">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-1 text-sm ${liked ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'} transition-colors`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={liked ? 'currentColor' : 'none'}
                stroke={liked ? 'none' : 'currentColor'}
                className={`w-4 h-4 ${liked ? 'scale-110' : ''} transition-transform`}
                strokeWidth={liked ? 0 : 1.5}
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <span>{likeCount > 0 ? likeCount : 'Like'}</span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
              </svg>
              <span>Comment</span>
            </button>
            
            <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935-2.186m0 4.372V7.903" />
              </svg>
              <span>Share</span>
            </button>
          </div>
          
          <button className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
        </div>
        
        {showComments && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            {activity.comments && activity.comments.length > 0 ? (
              <div className="space-y-3">
                {activity.comments.map((comment, index) => (
                  <div key={index} className="flex space-x-2">
                    <img 
                      src={comment.user.avatar} 
                      alt={comment.user.name} 
                      className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 bg-gray-50 rounded-lg p-2">
                      <div className="flex justify-between items-baseline">
                        <span className="font-medium text-xs text-gray-900">{comment.user.name}</span>
                        <span className="text-xs text-gray-400">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No comments yet. Be the first to comment!</p>
            )}
            
            <div className="mt-3 flex space-x-2">
              <img 
                src="https://via.placeholder.com/150" 
                alt="Your avatar" 
                className="w-7 h-7 rounded-full object-cover flex-shrink-0"
              />
              <input 
                type="text" 
                placeholder="Write a comment..." 
                className="flex-1 bg-gray-50 text-sm border border-gray-200 rounded-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityCard; 