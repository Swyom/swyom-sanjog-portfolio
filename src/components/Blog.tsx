import React, { useState, useEffect } from 'react';
import { BLOG_POSTS_DATA } from '../data/portfolioData';
import { BlogPost } from '../types';
import { Calendar, Clock, ArrowUpRight, ExternalLink, Loader2, Sparkles } from 'lucide-react';

const DEVTO_USERNAME = 'swyom_sanjog_4908464907cc';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch live articles from DEV.to API for user swyom_sanjog_4908464907cc
    fetch(`https://dev.to/api/articles?username=${DEVTO_USERNAME}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const devtoPosts: BlogPost[] = data.map((item: any) => ({
            id: String(item.id),
            title: item.title,
            excerpt: item.description || item.title,
            coverImage: item.cover_image || item.social_image || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=80',
            date: item.published_at ? new Date(item.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : item.readable_publish_date,
            readTime: `${item.reading_time_minutes || 4} min read`,
            category: item.tag_list && item.tag_list[0] ? item.tag_list[0].toUpperCase() : 'TECH',
            tags: item.tag_list || ['development', 'mobile'],
            url: item.url
          }));
          setPosts(devtoPosts);
        } else {
          setPosts(BLOG_POSTS_DATA);
        }
      })
      .catch(() => {
        setPosts(BLOG_POSTS_DATA);
      })
      .finally(() => setLoading(false));
  }, []);

  const openArticleUrl = (url?: string) => {
    const targetUrl = url || `https://dev.to/${DEVTO_USERNAME}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="blog" className="py-20 bg-[#08080c] relative overflow-hidden">
      {/* Ambient lighting backdrop */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-[#ff5e18]/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#12121a] border border-[#262636] font-mono text-xs font-semibold text-[#ff5e18] mb-3">
              <span className="text-gray-400">&lt;</span>
              DEV.TO BLOG & INSIGHTS
              <span className="text-gray-400">/&gt;</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
              Latest <span className="text-[#ff5e18] text-orange-glow">Articles & Posts</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              Technical articles published live on DEV.to by <strong className="text-white">Swyom Sanjog</strong>. Click any article to read the full post on DEV.to.
            </p>
          </div>

          {/* Direct DEV.to Profile Link */}
          <a
            href={`https://dev.to/${DEVTO_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#12121a] hover:bg-[#ff5e18] border border-[#262638] hover:border-[#ff5e18] text-xs font-mono font-bold text-gray-200 hover:text-white transition-all duration-300 shadow-md cursor-pointer shrink-0"
          >
            <span>DEV.TO PROFILE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 font-mono text-xs gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-[#ff5e18]" />
            <span>Fetching live articles from DEV.to (@{DEVTO_USERNAME})...</span>
          </div>
        ) : (
          /* Articles Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => openArticleUrl(post.url)}
                className="group relative bg-[#12121a]/90 backdrop-blur-md border border-[#222232] hover:border-[#ff5e18]/60 rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1.5 hover:box-orange-glow-sm flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff5e18] to-[#ff9800] rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Cover Image Banner */}
                  <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-5 border border-[#262638] bg-[#0c0c14]">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-[#12121a]/20 to-transparent" />
                    
                    {/* Category Pill Tag */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#08080c]/90 border border-[#ff5e18]/40 backdrop-blur-md text-xs font-mono font-bold text-[#ff5e18]">
                      {post.category}
                    </div>

                    {/* Read Time Tag */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#08080c]/90 border border-[#262638] backdrop-blur-md flex items-center gap-1 text-[11px] font-mono text-gray-300">
                      <Clock className="w-3 h-3 text-[#ff5e18]" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Metadata Row: Date */}
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#ff5e18]" />
                    <span>{post.date}</span>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight group-hover:text-[#ff5e18] transition-colors font-heading mb-2.5 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  {/* Article Excerpt */}
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  {/* Tag Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181826] text-gray-300 border border-[#262638]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Read Article Directly on DEV.to Button */}
                  <a
                    href={post.url || `https://dev.to/${DEVTO_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#161622] group-hover:bg-[#ff5e18] border border-[#262638] group-hover:border-[#ff5e18] text-xs font-mono font-bold text-gray-200 group-hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <span>READ ON DEV.TO</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* View More Blogs Option Button */}
        <div className="flex justify-center pt-2">
          <a
            href={`https://dev.to/${DEVTO_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-mono text-xs font-bold tracking-wider text-white bg-[#12121a] hover:bg-[#ff5e18] border border-[#2a2a3c] hover:border-[#ff5e18] transition-all duration-300 box-orange-glow hover:scale-105 cursor-pointer shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-[#ff5e18] group-hover:text-white transition-colors" />
            <span>VIEW MORE BLOGS ON DEV.TO</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
