import React from 'react';

function Avatar({ src, alt, size = 'md', badge = null }) {
  // Size classes
  const sizeClasses = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
    '2xl': 'h-20 w-20'
  };

  // Default avatar if no src provided
  const defaultAvatar = "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" + (alt || "User");

  return (
    <div className="relative inline-block">
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-100 flex-shrink-0 ring-2 ring-white`}>
        <img 
          src={src || defaultAvatar} 
          alt={alt || "User avatar"} 
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src = defaultAvatar;
          }}
        />
      </div>
      
      {badge && (
        <div className="absolute bottom-0 right-0 transform translate-y-1/4">
          {badge === 'online' && (
            <span className="block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
          )}
          {badge === 'offline' && (
            <span className="block h-3 w-3 rounded-full bg-gray-400 ring-2 ring-white"></span>
          )}
          {badge === 'busy' && (
            <span className="block h-3 w-3 rounded-full bg-red-400 ring-2 ring-white"></span>
          )}
          {badge === 'away' && (
            <span className="block h-3 w-3 rounded-full bg-yellow-400 ring-2 ring-white"></span>
          )}
        </div>
      )}
    </div>
  );
}

export default Avatar; 