import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import EmojiPicker from './EmojiPicker';

interface PostEditorProps {
  onPostCreated: (content: string, emoji?: string) => void;
  onAuthRequired: () => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ onPostCreated, onAuthRequired }) => {
  const [content, setContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { isAuthenticated } = useAuth();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = () => {
    if (!isAuthenticated) {
      onAuthRequired();
    }
  };

  const handleSubmit = () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    if (!content.trim()) return;

    onPostCreated(content);
    setContent('');
  };

  const insertTextAtCursor = (before: string, after: string = '', placeholder: string = '') => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const newContent = 
      content.substring(0, start) + 
      before + textToInsert + after + 
      content.substring(end);
    
    setContent(newContent);
    
    setTimeout(() => {
      const newPosition = start + before.length + textToInsert.length;
      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleFormatting = (type: string) => {
    switch(type) {
      case 'bold':
        insertTextAtCursor('**', '**', 'bold text');
        break;
      case 'italic':
        insertTextAtCursor('*', '*', 'italic text');
        break;
      case 'underline':
        insertTextAtCursor('<u>', '</u>', 'underlined text');
        break;
      case 'code':
        insertTextAtCursor('`', '`', 'code');
        break;
      case 'quote':
        insertTextAtCursor('> ', '', 'quoted text');
        break;
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }
    
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newContent = 
      content.substring(0, start) + 
      emoji + 
      content.substring(start);
    
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + emoji.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  return (
    <div className="bg-[rgba(0,0,0,0.03)] rounded-[20px] p-2">
      <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[16px] p-6">
        <div className="bg-[rgba(0,0,0,0.03)] rounded-[10px] p-2.5 flex items-center gap-2 mb-5">
          <div className="flex items-center gap-1 bg-white shadow-[0px_1px_7px_0px_rgba(0,0,0,0.09)] rounded-[7px] px-2 py-1">
            <span className="text-[12px] font-medium text-[rgba(0,0,0,0.81)]">Paragraph</span>
            <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          <button className="bg-white shadow-[0px_1px_7px_0px_rgba(0,0,0,0.09)] rounded-[7px] w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors" onClick={() => handleFormatting('bold')} title="Bold">
            <svg className="w-3.5 h-3.5" fill="black" viewBox="0 0 20 20">
              <path d="M11 3H6v14h5a4 4 0 000-8 3 3 0 000-6zm0 2a1 1 0 110 2H8V5h3zm0 6a2 2 0 110 4H8v-4h3z" />
            </svg>
          </button>

          <button className="bg-white shadow-[0px_1px_7px_0px_rgba(0,0,0,0.09)] rounded-[7px] w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors" onClick={() => handleFormatting('italic')} title="Italic">
            <svg className="w-3.5 h-3.5" fill="black" viewBox="0 0 20 20">
              <path d="M10 3l-1 14h2l1-14h-2z" transform="skewX(-15)" />
            </svg>
          </button>

          <button className="bg-white shadow-[0px_1px_7px_0px_rgba(0,0,0,0.09)] rounded-[7px] w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors" onClick={() => handleFormatting('underline')} title="Underline">
            <svg className="w-3.5 h-3.5" fill="black" viewBox="0 0 20 20">
              <path d="M10 15a5 5 0 01-5-5V4h2v6a3 3 0 106 0V4h2v6a5 5 0 01-5 5zm-5 2h10v1H5v-1z" />
            </svg>
          </button>

          <div className="w-px h-5 bg-gray-300" />

          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors" onClick={() => insertTextAtCursor('• ', '', 'list item')} title="Bulleted List">
            <svg className="w-3.5 h-3.5" fill="black" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>

          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors" onClick={() => insertTextAtCursor('1. ', '', 'list item')} title="Numbered List">
            <svg className="w-3.5 h-3.5" fill="black" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>

          <div className="w-px h-5 bg-gray-300" />

          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors" onClick={() => handleFormatting('quote')} title="Quote">
            <svg className="w-3.5 h-3.5" fill="black" viewBox="0 0 20 20">
              <path d="M6 10c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm6 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
            </svg>
          </button>

          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors" onClick={() => handleFormatting('code')} title="Code">
            <svg className="w-3.5 h-3.5" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 20 20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7l-3 3 3 3m6-6l3 3-3 3" />
            </svg>
          </button>

          <div className="flex-1" />

          <button className="w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded-lg transition-colors" onClick={() => setContent('')} title="Clear">
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <div className="flex items-start gap-3 mb-5">
          <button 
            className="flex-shrink-0 w-[18px] h-[18px] flex items-center justify-center hover:opacity-70 transition-opacity" 
            onClick={() => {
              if (!isAuthenticated) {
                onAuthRequired();
              } else {
                setShowEmojiPicker(true);
              }
            }}
            title="Add Emoji"
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
            </svg>
          </button>
          <textarea
            ref={textareaRef}
            className="flex-1 bg-transparent text-[14px] font-medium text-black resize-none focus:outline-none placeholder-[rgba(0,0,0,0.4)] leading-relaxed"
            placeholder="How are you feeling today?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={handleFocus}
            rows={3}
          />
        </div>

        <div className="h-px bg-gray-200 mb-5" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="w-[18px] h-[18px] flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity" title="Add Image">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => {
                  if (!isAuthenticated) {
                    onAuthRequired();
                    e.target.value = '';
                    return;
                  }
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      const imageUrl = ev.target?.result as string;
                      setContent(prev => prev + `\n![Image](${imageUrl})`);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <svg className="w-[18px] h-[18px]" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </label>

            <button className="w-[18px] h-[18px] flex items-center justify-center opacity-40 cursor-not-allowed" title="Audio (Coming Soon)">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>

            <button className="w-[18px] h-[18px] flex items-center justify-center opacity-40 cursor-not-allowed" title="Video (Coming Soon)">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!content.trim() || !isAuthenticated}
            className="bg-[#5057EA] text-white font-semibold text-[14px] px-8 py-2.5 rounded-full transition-all hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          >
            <span>Post</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>

      {showEmojiPicker && (
        <EmojiPicker
          onEmojiSelect={handleEmojiSelect}
          onClose={() => setShowEmojiPicker(false)}
        />
      )}
    </div>
  );
};

export default PostEditor;
