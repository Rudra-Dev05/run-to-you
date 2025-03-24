import { useState } from 'react';

function AchievementBadge({ achievement, size = 'md', showDetails = false }) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const getBadgeSize = () => {
    switch (size) {
      case 'sm': return 'w-14 h-14';
      case 'md': return 'w-20 h-20';
      case 'lg': return 'w-28 h-28';
      default: return 'w-20 h-20';
    }
  };
  
  const getTextSize = () => {
    switch (size) {
      case 'sm': return 'text-xl';
      case 'md': return 'text-3xl';
      case 'lg': return 'text-4xl';
      default: return 'text-3xl';
    }
  };
  
  const getBackgroundColor = () => {
    if (!achievement.unlocked) return 'bg-gray-200';
    
    switch (achievement.tier) {
      case 'bronze': return 'bg-amber-100';
      case 'silver': return 'bg-slate-200';
      case 'gold': return 'bg-amber-300';
      case 'platinum': return 'bg-gradient-to-br from-emerald-300 via-teal-200 to-emerald-300';
      case 'diamond': return 'bg-gradient-to-br from-blue-300 via-indigo-200 to-purple-300';
      default: return achievement.color || 'bg-primary-100';
    }
  };
  
  const getBorderColor = () => {
    if (!achievement.unlocked) return 'border-gray-300';
    
    switch (achievement.tier) {
      case 'bronze': return 'border-amber-500';
      case 'silver': return 'border-slate-400';
      case 'gold': return 'border-amber-500';
      case 'platinum': return 'border-emerald-500';
      case 'diamond': return 'border-indigo-500';
      default: return achievement.borderColor || 'border-primary-500';
    }
  };
  
  const getTextColor = () => {
    if (!achievement.unlocked) return 'text-gray-400';
    
    switch (achievement.tier) {
      case 'bronze': return 'text-amber-700';
      case 'silver': return 'text-slate-700';
      case 'gold': return 'text-amber-700';
      case 'platinum': return 'text-emerald-700';
      case 'diamond': return 'text-indigo-700';
      default: return achievement.textColor || 'text-primary-700';
    }
  };
  
  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'text-lg';
      case 'md': return 'text-2xl';
      case 'lg': return 'text-3xl';
      default: return 'text-2xl';
    }
  };

  return (
    <div className="relative group">
      {/* The Badge */}
      <div
        className={`relative ${!showDetails && 'cursor-pointer'} ${getBadgeSize()} rounded-full flex items-center justify-center ${getBackgroundColor()} border-2 ${getBorderColor()} transition-all duration-300 transform perspective-1000 ${isFlipped ? 'rotate-y-180' : ''} ${!achievement.unlocked && 'opacity-70'}`}
        onClick={() => !showDetails && setIsFlipped(!isFlipped)}
        onMouseEnter={() => showDetails && setIsFlipped(true)}
        onMouseLeave={() => showDetails && setIsFlipped(false)}
      >
        {/* Front of badge */}
        <div className={`absolute inset-0 flex items-center justify-center rounded-full backface-hidden ${isFlipped ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          {achievement.icon ? (
            <span className={`${getTextSize()} ${getTextColor()}`}>{achievement.icon}</span>
          ) : (
            <div className={`${getIconSize()} ${getTextColor()} flex items-center justify-center`}>
              {achievement.unlocked ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          )}
          
          {/* Tier indicator */}
          {achievement.tier && achievement.unlocked && (
            <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
              <div className={`
                ${size === 'sm' ? 'w-4 h-4 text-[8px]' : size === 'md' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'} 
                rounded-full flex items-center justify-center font-bold text-white
                ${achievement.tier === 'bronze' ? 'bg-amber-600' : 
                  achievement.tier === 'silver' ? 'bg-slate-500' : 
                  achievement.tier === 'gold' ? 'bg-amber-500' : 
                  achievement.tier === 'platinum' ? 'bg-emerald-600' : 
                  achievement.tier === 'diamond' ? 'bg-indigo-600' : 
                  'bg-primary-600'}
                shadow-sm
              `}>
                {achievement.tier === 'bronze' ? 'B' :
                 achievement.tier === 'silver' ? 'S' :
                 achievement.tier === 'gold' ? 'G' :
                 achievement.tier === 'platinum' ? 'P' :
                 achievement.tier === 'diamond' ? 'D' : ''}
              </div>
            </div>
          )}
          
          {/* Date indicator for recently unlocked achievements */}
          {achievement.unlocked && achievement.unlockedDate && (
            <div className="absolute -top-1 -left-1">
              <div className={`
                ${size === 'sm' ? 'w-4 h-4 text-[8px]' : size === 'md' ? 'w-5 h-5 text-[10px]' : 'w-6 h-6 text-xs'} 
                rounded-full flex items-center justify-center font-medium bg-red-500 text-white shadow
              `}>
                {new Date(achievement.unlockedDate).toLocaleDateString('en-US', {day: '2-digit'})}
              </div>
            </div>
          )}
        </div>
        
        {/* Back of badge */}
        <div className={`absolute inset-0 flex items-center justify-center rounded-full backface-hidden rotate-y-180 ${isFlipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          <div className={`text-center px-2 ${size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-[10px]' : 'text-xs'} ${getTextColor()} font-medium`}>
            {achievement.shortDescription || achievement.title || 'Achievement'}
          </div>
        </div>
      </div>
      
      {/* Badge shine effect */}
      {achievement.unlocked && (
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-tr from-white via-transparent to-transparent rotate-12 transition-opacity duration-700"></div>
        </div>
      )}
      
      {/* Achievement details for showDetails mode */}
      {showDetails && (
        <div className="mt-2 text-center">
          <h4 className={`font-medium ${size === 'sm' ? 'text-xs' : 'text-sm'} text-gray-900 line-clamp-1`}>
            {achievement.title}
          </h4>
          {size !== 'sm' && (
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
              {achievement.description}
            </p>
          )}
          {achievement.unlocked && achievement.unlockedDate && (
            <p className={`${size === 'sm' ? 'text-[10px]' : 'text-xs'} text-gray-400 mt-1`}>
              {new Date(achievement.unlockedDate).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
      
      {/* Tooltip for non-details mode */}
      {!showDetails && (
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs z-10">
            <div className="bg-gray-900 text-white text-xs rounded-lg py-1.5 px-3 shadow-lg">
              <div className="font-medium">{achievement.title || 'Achievement'}</div>
              <div className="text-xs text-gray-300 mt-1">{achievement.description}</div>
              {achievement.unlocked ? (
                <div className="mt-1 text-green-400 text-[10px]">
                  Unlocked {achievement.unlockedDate ? `• ${new Date(achievement.unlockedDate).toLocaleDateString()}` : ''}
                </div>
              ) : (
                <div className="mt-1 text-gray-400 text-[10px]">Locked</div>
              )}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-[5px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AchievementBadge; 