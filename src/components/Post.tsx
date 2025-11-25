import React, { useState } from 'react';
import type { Post as PostType } from '../types';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 20));
  const [commentCount] = useState(Math.floor(Math.random() * 10));
  const [showComments, setShowComments] = useState(false);
  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.username}`,
        text: post.content,
      }).catch(() => {
        navigator.clipboard.writeText(post.content);
        alert('Post copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(post.content);
      alert('Post copied to clipboard!');
    }
  };

  return (
    <div className="bg-[rgba(0,0,0,0.03)] rounded-[20px] p-2">
      <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[16px] p-6 animate-slide-up">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {post.avatar ? (
              <img 
                src={post.avatar} 
                alt={post.username}
                className="w-[37px] h-[37px] rounded-[7px] object-cover"
              />
            ) : (
              <div className="w-[37px] h-[37px] rounded-[7px] bg-[#f6f6f6] flex items-center justify-center text-black text-sm font-medium">
                {getInitials(post.username)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-[14px] font-semibold text-black">{post.username}</h3>
            <span className="text-[13px] text-gray-500">{getTimeAgo(post.timestamp)}</span>

            <div className="bg-[#f2f2f2] rounded-full w-[32px] h-[32px] flex items-center justify-center my-4">
              <span className="text-[20px] leading-none">{post.emoji || '😊'}</span>
            </div>

            <p className="text-[14px] text-gray-800 leading-[22px] mb-5">{post.content}</p>

            <div className="flex items-center gap-6 mt-1">
              <button
                onClick={handleLike}
                className={`transition-all group flex items-center gap-2 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                aria-label="Like post"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {likeCount > 0 && <span className="text-[13px] font-medium">{likeCount}</span>}
              </button>

              <button
                onClick={handleComment}
                className={`transition-all group flex items-center gap-2 ${showComments ? 'text-[#5057EA]' : 'text-gray-500'} hover:text-[#5057EA]`}
                aria-label="Comment on post"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {commentCount > 0 && <span className="text-[13px] font-medium">{commentCount}</span>}
              </button>

              <button
                onClick={handleShare}
                className="transition-all group text-gray-500 hover:text-green-600"
                aria-label="Share post"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>

            {showComments && (
              <div className="mt-5 pt-5 border-t border-gray-200 animate-slideUp">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-[13px] text-gray-500 italic mb-3">Comments will appear here...</p>
                  <textarea
                    placeholder="Write a comment..."
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#5057EA] resize-none"
                    rows={2}
                  />
                  <button className="mt-3 px-5 py-2 bg-[#5057EA] text-white text-[13px] font-medium rounded-full hover:bg-[#4048d8] transition-all shadow-md">
                    Post Comment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
