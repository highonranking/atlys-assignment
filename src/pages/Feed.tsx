import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PostEditor from '../components/PostEditor';
import Post from '../components/Post';
import AuthModal from '../components/AuthModal';
import type { Post as PostType } from '../types';

const INITIAL_POSTS: PostType[] = [
  {
    id: '1',
    userId: '1',
    username: 'Theresa Webb',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    emoji: '🥴',
    timestamp: Date.now() - 5 * 60 * 1000,
    likes: 0,
    comments: 0,
    shares: 0
  },
  {
    id: '2',
    userId: '2',
    username: 'John Doe',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    emoji: '🤞',
    timestamp: Date.now() - 5 * 60 * 1000,
    likes: 0,
    comments: 0,
    shares: 0
  },
  {
    id: '3',
    userId: '3',
    username: 'Jane Doe',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    emoji: '💀',
    timestamp: Date.now() - 5 * 60 * 1000,
    likes: 0,
    comments: 0,
    shares: 0
  }
];

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem('posts', JSON.stringify(INITIAL_POSTS));
    }
  }, []);

  const handlePostCreated = (content: string, emoji?: string) => {
    if (!user) return;

    const newPost: PostType = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      content,
      emoji,
      timestamp: Date.now(),
      likes: 0,
      comments: 0,
      shares: 0
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleAuthRequired = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-40 shadow-sm">
        <div className="max-w-[800px] mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center rotate-90 shadow-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M8 3l3 3m6 0l-3 3M8 21l3-3m6 0l-3 3M3 8l3 3m0 6l-3 3m18-12l-3 3m0 6l3 3" />
              </svg>
            </div>
            <h1 className="text-[18px] font-bold text-[rgba(0,0,0,0.85)]">foo-rum</h1>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-5">
              <span className="text-[14px] text-gray-600">Hello, <span className="font-semibold text-black">{user?.username}</span></span>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-[#5057EA] transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <span className="text-[14px] font-medium">Logout</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="text-gray-600 hover:text-[#5057EA] transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <span className="text-[14px] font-semibold">Login</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </button>
          )}
        </div>
      </header>

      <main className="max-w-[700px] mx-auto px-6 py-10">
        <div className="space-y-5">
          <PostEditor 
            onPostCreated={handlePostCreated}
            onAuthRequired={handleAuthRequired}
          />

          <div className="space-y-4">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode="signin"
      />
    </div>
  );
};

export default Feed;
