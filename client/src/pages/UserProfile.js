import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from '../components/social/UserProfile';
import PostCard from '../components/social/PostCard';

function UserProfilePage() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  
  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data for user's posts
        const mockPosts = [
          {
            id: 'post1',
            author: {
              id: userId,
              name: 'Alex Runner',
              avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
              isFollowing: false,
              isCurrentUser: userId === 'current-user'
            },
            content: 'Just completed my first marathon in 3:45! Thanks to everyone who supported me through the training.',
            imageUrl: 'https://images.unsplash.com/photo-1530137073468-0a16e5b4dd83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
            likes: 67,
            liked: false,
            comments: [
              {
                id: 'comment1',
                author: {
                  id: 'user3',
                  name: 'Michael Brown',
                  avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
                },
                content: 'Amazing achievement! Congratulations!',
                createdAt: new Date(Date.now() - 3600000 * 70).toISOString()
              }
            ],
            runDetails: {
              id: 'run1',
              distance: 42.2,
              duration: '3h 45m',
              pace: '5:20',
              routeName: 'City Marathon'
            }
          },
          {
            id: 'post2',
            author: {
              id: userId,
              name: 'Alex Runner',
              avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
              isFollowing: false,
              isCurrentUser: userId === 'current-user'
            },
            content: 'Morning run by the lake. The sunrise was absolutely beautiful today!',
            imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            createdAt: new Date(Date.now() - 3600000 * 120).toISOString(),
            likes: 42,
            liked: true,
            comments: [],
            runDetails: {
              id: 'run2',
              distance: 8.5,
              duration: '45m 30s',
              pace: '5:22'
            }
          },
          {
            id: 'post3',
            author: {
              id: userId,
              name: 'Alex Runner',
              avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
              isFollowing: false,
              isCurrentUser: userId === 'current-user'
            },
            content: "New running shoes day! Can't wait to break these in on tomorrow's long run.",
            imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            createdAt: new Date(Date.now() - 3600000 * 168).toISOString(),
            likes: 29,
            liked: false,
            comments: [
              {
                id: 'comment2',
                author: {
                  id: 'user4',
                  name: 'Sarah Wilson',
                  avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
                },
                content: 'Those look awesome! What brand are they?',
                createdAt: new Date(Date.now() - 3600000 * 166).toISOString()
              },
              {
                id: 'comment3',
                author: {
                  id: userId,
                  name: 'Alex Runner',
                  avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
                },
                content: "Thanks! They're the new Nike Pegasus. Super comfortable so far!",
                createdAt: new Date(Date.now() - 3600000 * 165).toISOString()
              }
            ]
          }
        ];
        
        setPosts(mockPosts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);

  // Skeleton loader for posts
  const PostsSkeleton = () => (
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
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <UserProfile userId={userId} detailed={true} />
      
      {/* Content Tabs */}
      <div className="mt-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'posts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'activities'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Activities
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'challenges'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Challenges
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'achievements'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Achievements
            </button>
          </nav>
        </div>
        
        <div className="mt-6">
          {activeTab === 'posts' && (
            <>
              {loading ? (
                <PostsSkeleton />
              ) : (
                <div className="space-y-4">
                  {posts.length > 0 ? (
                    posts.map(post => (
                      <PostCard key={post.id} post={post} />
                    ))
                  ) : (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No posts yet</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        When this user shares posts, they will appear here.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          
          {activeTab === 'activities' && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Activities Section</h3>
              <p className="mt-1 text-sm text-gray-500">
                User's running activities will be displayed here. Coming soon!
              </p>
            </div>
          )}
          
          {activeTab === 'challenges' && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Challenges Section</h3>
              <p className="mt-1 text-sm text-gray-500">
                User's running challenges will be displayed here. Coming soon!
              </p>
            </div>
          )}
          
          {activeTab === 'achievements' && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Achievements Section</h3>
              <p className="mt-1 text-sm text-gray-500">
                User's running achievements will be displayed here. Coming soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage; 