import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/social/PostCard';
import UserProfile from '../components/social/UserProfile';
import FollowButton from '../components/social/FollowButton';

function Social() {
  const [posts, setPosts] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  // Simulate fetching feed data
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockPosts = [
          {
            id: 'post1',
            author: {
              id: 'user1',
              name: 'Sarah Johnson',
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
              isFollowing: true,
              isCurrentUser: false
            },
            content: "Just completed my first half marathon! So proud of myself for pushing through. The weather was perfect and the crowd's energy was amazing!",
            imageUrl: 'https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
            likes: 42,
            liked: false,
            comments: [
              {
                id: 'comment1',
                author: {
                  id: 'user3',
                  name: 'Mike Chen',
                  avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
                },
                content: 'Congratulations! What was your finishing time?',
                createdAt: new Date(Date.now() - 3600000).toISOString()
              }
            ],
            runDetails: {
              id: 'run1',
              distance: 21.1,
              duration: '1h 52m',
              pace: '5:18',
              routeName: 'Riverside Half Marathon'
            }
          },
          {
            id: 'post2',
            author: {
              id: 'user2',
              name: 'David Wilson',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              isFollowing: false,
              isCurrentUser: false
            },
            content: 'Morning run through the park - spotted some deer! Nature is the best running partner.',
            imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
            likes: 18,
            liked: true,
            comments: [],
            runDetails: {
              id: 'run2',
              distance: 8.2,
              duration: '45m 12s',
              pace: '5:30'
            }
          },
          {
            id: 'post3',
            author: {
              id: 'current-user',
              name: 'You',
              avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
              isCurrentUser: true
            },
            content: 'New personal best on my 5K today! All that interval training is finally paying off.',
            createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
            likes: 31,
            liked: false,
            comments: [
              {
                id: 'comment2',
                author: {
                  id: 'user1',
                  name: 'Sarah Johnson',
                  avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
                },
                content: "That's awesome! What's your secret?",
                createdAt: new Date(Date.now() - 3600000 * 23).toISOString()
              },
              {
                id: 'comment3',
                author: {
                  id: 'user4',
                  name: 'Emily Zhang',
                  avatar: 'https://randomuser.me/api/portraits/women/17.jpg'
                },
                content: 'Wow, congrats! What was your time?',
                createdAt: new Date(Date.now() - 3600000 * 22).toISOString()
              }
            ],
            runDetails: {
              id: 'run3',
              distance: 5,
              duration: '22m 15s',
              pace: '4:27'
            }
          }
        ];
        
        const mockSuggestedUsers = [
          {
            id: 'user5',
            name: 'Jessica Taylor',
            username: 'jess_runs',
            avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
            bio: 'Trail runner | Nature lover',
            isFollowing: false
          },
          {
            id: 'user6',
            name: 'Marcus Brown',
            username: 'marcus_miles',
            avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
            bio: 'Marathon enthusiast | Running coach',
            isFollowing: false
          },
          {
            id: 'user7',
            name: 'Sophia Garcia',
            username: 'sophiaruns',
            avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
            bio: 'Ultra runner | Mountain lover',
            isFollowing: false
          }
        ];
        
        setPosts(mockPosts);
        setSuggestedUsers(mockSuggestedUsers);
      } catch (error) {
        console.error('Error fetching feed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeed();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    
    if (!newPostContent.trim()) return;
    
    setSubmitting(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new post object
      const newPost = {
        id: `post${Date.now()}`,
        author: {
          id: 'current-user',
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
          isCurrentUser: true
        },
        content: newPostContent,
        createdAt: new Date().toISOString(),
        likes: 0,
        liked: false,
        comments: []
      };
      
      // Update posts state with new post at the beginning
      setPosts(prevPosts => [newPost, ...prevPosts]);
      
      // Clear the input
      setNewPostContent('');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Social Feed</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* New Post Form */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <form onSubmit={handlePostSubmit}>
              <div className="flex items-start space-x-3">
                <img 
                  src="https://randomuser.me/api/portraits/women/68.jpg" 
                  alt="Your Avatar"
                  className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                />
                <div className="flex-1">
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Share your running journey..."
                    rows="3"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    disabled={submitting}
                  ></textarea>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button 
                        type="button" 
                        className="text-gray-500 hover:text-gray-700"
                        title="Add Photo"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button 
                        type="button" 
                        className="text-gray-500 hover:text-gray-700"
                        title="Link Run Activity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </button>
                    </div>
                    <button 
                      type="submit" 
                      className={`px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${submitting || !newPostContent.trim() ? 'opacity-70 cursor-not-allowed' : ''}`}
                      disabled={submitting || !newPostContent.trim()}
                    >
                      {submitting ? 'Posting...' : 'Post'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          {/* Feed Posts */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/4 mt-2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                  <div className="mt-4 h-40 bg-gray-300 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <UserProfile userId="current-user" />
          
          {/* Suggested Users */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Suggested Runners</h3>
            <div className="space-y-4">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                        <div>
                          <div className="h-4 bg-gray-300 rounded w-24"></div>
                          <div className="h-3 bg-gray-300 rounded w-16 mt-2"></div>
                        </div>
                      </div>
                      <div className="h-8 w-20 bg-gray-300 rounded-full"></div>
                    </div>
                  ))}
                </div>
              ) : (
                suggestedUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Link to={`/profile/${user.id}`}>
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                        />
                      </Link>
                      <div>
                        <Link to={`/profile/${user.id}`}>
                          <h4 className="font-medium text-gray-900 hover:underline">{user.name}</h4>
                        </Link>
                        <p className="text-xs text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                    <FollowButton userId={user.id} initialIsFollowing={user.isFollowing} size="small" />
                  </div>
                ))
              )}
            </div>
            <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
              View More
            </button>
          </div>
          
          {/* Footer Links */}
          <div className="text-xs text-gray-500 space-x-2">
            <a href="#" className="hover:underline">About</a>
            <span>•</span>
            <a href="#" className="hover:underline">Help</a>
            <span>•</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Social;