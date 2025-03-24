import { useState } from 'react';
import { motion } from 'framer-motion';

function LikeButton({ initialLiked = false, count = 0, onLike }) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(count);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prevCount => newLikedState ? prevCount + 1 : prevCount - 1);
    
    if (onLike) {
      onLike(newLikedState);
    }
  };

  return (
    <button 
      onClick={handleLike}
      className="flex items-center space-x-1 focus:outline-none"
      aria-label={isLiked ? "Unlike" : "Like"}
    >
      <motion.div
        whileTap={{ scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        {isLiked ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 text-red-500"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-5.201-3.893 10.406 10.406 0 01-2.15-3.175 8.072 8.072 0 01-.95-3.825c0-2.51 1.003-4.88 2.75-6.629C7.81 1.583 10.178.58 12.685.58c2.507 0 4.875 1.002 6.627 2.753a9.57 9.57 0 012.75 6.628 8.074 8.074 0 01-.95 3.827 10.41 10.41 0 01-2.15 3.175 15.252 15.252 0 01-5.201 3.893l-.022.012-.007.003-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-5 h-5 text-gray-600"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
            />
          </svg>
        )}
      </motion.div>
      <span className={`text-sm font-medium ${isLiked ? 'text-red-500' : 'text-gray-600'}`}>
        {likeCount}
      </span>
    </button>
  );
}

export default LikeButton; 