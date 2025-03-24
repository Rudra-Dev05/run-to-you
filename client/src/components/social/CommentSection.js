import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function CommentSection({ comments = [], postId, onAddComment }) {
  const [newComment, setNewComment] = useState('');
  const [displayedComments, setDisplayedComments] = useState(comments.slice(0, 2));
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call to add comment
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a mock comment
      const mockComment = {
        id: `comment-${Date.now()}`,
        author: {
          id: 'current-user',
          name: 'Current User',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
        },
        content: newComment.trim(),
        createdAt: new Date().toISOString()
      };
      
      // Update UI
      setDisplayedComments(prev => [mockComment, ...prev]);
      if (onAddComment) onAddComment(mockComment);
      
      // Clear input
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleComments = () => {
    if (isExpanded) {
      setDisplayedComments(comments.slice(0, 2));
    } else {
      setDisplayedComments(comments);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-4">
      {displayedComments.length > 0 && (
        <div className="mb-4 space-y-3">
          {displayedComments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <Link to={`/profile/${comment.author.id}`} className="flex-shrink-0">
                <img 
                  src={comment.author.avatar} 
                  alt={comment.author.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              </Link>
              <div className="flex-1 bg-gray-50 rounded-lg p-3">
                <div className="flex items-baseline">
                  <Link to={`/profile/${comment.author.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                    {comment.author.name}
                  </Link>
                  <span className="ml-auto text-xs text-gray-400">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {comments.length > 2 && (
        <button
          onClick={toggleComments}
          className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {isExpanded ? 'Show less comments' : `View all ${comments.length} comments`}
        </button>
      )}
      
      <form onSubmit={handleSubmit} className="mt-3 flex">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full px-3 py-2 bg-white rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={!newComment.trim() || isSubmitting}
          className={`ml-2 px-4 py-2 rounded-full font-medium text-sm ${
            !newComment.trim() || isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors`}
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}

export default CommentSection; 