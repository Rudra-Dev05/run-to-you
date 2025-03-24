import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import LikeButton from './LikeButton';
import ShareMenu from './ShareMenu';
import CommentSection from './CommentSection';
import FollowButton from './FollowButton';

function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  
  if (!post) return null;
  
  const {
    id,
    author,
    content,
    imageUrl,
    createdAt,
    likes,
    liked,
    comments,
    runDetails,
  } = post;
  
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const postUrl = `/posts/${id}`;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      {/* Post Header with author info */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Link to={`/profile/${author.id}`}>
            <img 
              src={author.avatar || 'https://via.placeholder.com/40'} 
              alt={author.name} 
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
          </Link>
          <div>
            <Link to={`/profile/${author.id}`}>
              <h3 className="font-medium text-gray-900 hover:underline">{author.name}</h3>
            </Link>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div>
        
        {!author.isCurrentUser && (
          <FollowButton 
            userId={author.id} 
            initialIsFollowing={author.isFollowing} 
            size="small"
          />
        )}
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 mb-3">{content}</p>
        
        {/* Run Details if available */}
        {runDetails && (
          <Link 
            to={`/runs/${runDetails.id}`}
            className="block bg-blue-50 rounded-lg p-3 mb-3 hover:bg-blue-100 transition duration-150"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">
                {runDetails.distance} km • {runDetails.duration}
              </span>
              <span className="text-xs font-medium text-blue-700">
                {runDetails.pace}/km
              </span>
            </div>
            {runDetails.routeName && (
              <span className="text-xs text-blue-700 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {runDetails.routeName}
              </span>
            )}
          </Link>
        )}
        
        {/* Post Image if available */}
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="Post visual" 
            className="rounded-lg w-full max-h-96 object-cover mb-3"
          />
        )}
      </div>
      
      {/* Action Bar */}
      <div className="border-t border-gray-100 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <LikeButton 
            postId={id}
            initialLikes={likes}
            initialLiked={liked}
          />
          
          <button 
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
            onClick={() => setShowComments(!showComments)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{comments.length > 0 ? comments.length : ''}</span>
          </button>
        </div>
        
        <ShareMenu postId={id} postUrl={postUrl} />
      </div>
      
      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100">
          <CommentSection 
            postId={id}
            comments={comments}
          />
        </div>
      )}
    </div>
  );
}

export default PostCard; 