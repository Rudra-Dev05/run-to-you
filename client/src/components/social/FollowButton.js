import { useState } from 'react';
import { motion } from 'framer-motion';

function FollowButton({ userId, initialIsFollowing = false, size = 'medium' }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowToggle = async () => {
    setIsLoading(true);
    
    try {
      // Optimistic UI update
      setIsFollowing(!isFollowing);
      
      // Simulate API call to follow/unfollow a user
      // Replace with actual API call
      // const response = await fetch(`/api/users/${userId}/follow`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ follow: !isFollowing })
      // });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Success case - nothing to do as we've already updated the UI
    } catch (error) {
      // Revert optimistic update on error
      console.error('Failed to update follow status:', error);
      setIsFollowing(isFollowing);
    } finally {
      setIsLoading(false);
    }
  };

  // Define button styles based on size
  const getButtonStyles = () => {
    const baseStyles = isFollowing
      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      : 'bg-blue-600 text-white hover:bg-blue-700';
    
    switch (size) {
      case 'small':
        return `${baseStyles} text-xs px-2 py-1`;
      case 'large':
        return `${baseStyles} text-base px-5 py-2`;
      case 'medium':
      default:
        return `${baseStyles} text-sm px-4 py-1.5`;
    }
  };

  return (
    <motion.button
      className={`rounded-full font-medium transition-colors duration-200 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
        ${getButtonStyles()} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      whileTap={{ scale: 0.95 }}
      onClick={handleFollowToggle}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{isFollowing ? 'Unfollowing...' : 'Following...'}</span>
        </span>
      ) : (
        <span>{isFollowing ? 'Following' : 'Follow'}</span>
      )}
    </motion.button>
  );
}

export default FollowButton; 