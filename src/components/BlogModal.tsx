import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { X, Calendar, Clock, Tag, ExternalLink, Loader2 } from 'lucide-react';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  const [fullContent, setFullContent] = useState<string>('');
  const [loadingContent, setLoadingContent] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (post) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // If content is already present, use it; otherwise fetch from DEV.to API
      if (post.content) {
        setFullContent(post.content);
      } else if (post.id) {
        setLoadingContent(true);
        fetch(`https://dev.to/api/articles/${post.id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.body_markdown) {
              setFullContent(data.body_markdown);
            } else {
              setFullContent(post.excerpt);
            }
          })
          .catch(() => {
            setFullContent(post.excerpt);
          })
          .finally(() => setLoadingContent(false));
      }
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-3xl bg-[#12121a] border border-[#ff5e18]/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-left box-orange-glow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#222232]">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-[#ff5e18]/15 border border-[#ff5e18]/30 font-mono text-xs font-bold text-[#ff5e18]">
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-xs font-mono text-gray-400 pl-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#ff5e18]" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#ff5e18]" />
                {post.readTime}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-[#1a1a28] border border-[#2a2a3c] hover:border-[#ff5e18] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close Article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4 font-heading">
          {post.title}
        </h2>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden mb-6 border border-[#262638]">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover filter brightness-95"
            />
          </div>
        )}

        {/* Excerpt */}
        <p className="text-gray-300 text-base sm:text-lg font-medium leading-relaxed mb-6 italic border-l-2 border-[#ff5e18] pl-4 bg-[#161622] py-3 rounded-r-lg">
          "{post.excerpt}"
        </p>

        {/* Article Body */}
        {loadingContent ? (
          <div className="flex items-center justify-center py-12 text-gray-400 font-mono text-xs gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-[#ff5e18]" />
            <span>Fetching full article from DEV.to...</span>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-4 font-sans">
            {fullContent.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ') || paragraph.startsWith('## ')) {
                return (
                  <h3 key={index} className="text-xl font-bold text-white mt-6 mb-2 font-heading text-[#ff5e18]">
                    {paragraph.replace(/#+\s*/, '')}
                  </h3>
                );
              }
              return (
                <p key={index} className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {paragraph}
                </p>
              );
            })}
          </div>
        )}

        {/* Footer Actions & External Link */}
        <div className="pt-6 mt-8 border-t border-[#222232] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-[#ff5e18]" />
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded bg-[#181826] text-gray-300 border border-[#262638]">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {post.url && (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ff5e18] hover:bg-[#ff702a] text-xs font-mono font-bold text-white transition-all shadow-md cursor-pointer"
              >
                <span>READ ON DEV.TO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#1a1a28] hover:bg-[#222234] border border-[#2a2a3c] text-xs font-mono font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
