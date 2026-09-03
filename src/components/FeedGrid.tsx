import React, { useState, useMemo } from 'react';
import { Post, CategoryFilter } from '../types';
import { FeedCard } from './FeedCard';
import { Search, X, Sparkles, Filter } from 'lucide-react';

interface FeedGridProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

const CATEGORIES: { label: string; value: CategoryFilter }[] = [
  { label: '全部 All', value: 'All' },
  { label: '动效交互 Motion', value: 'Motion' },
  { label: '产品设计 Product', value: 'Product' },
  { label: '网页视觉 Web', value: 'Web' },
  { label: '3D空间 3D', value: '3D' },
  { label: '品牌设计 Branding', value: 'Branding' },
];

export const FeedGrid: React.FC<FeedGridProps> = ({ posts, onSelectPost }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    let list = posts;

    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        return (
          p.title.toLowerCase().includes(q) ||
          p.creatorName.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.styles && p.styles.some((s) => s.toLowerCase().includes(q))) ||
          (p.industries && p.industries.some((i) => i.toLowerCase().includes(q)))
        );
      });
    }

    return list;
  }, [posts, activeCategory, searchQuery]);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Top Filter and Search Bar inside screen */}
      <div className="sticky top-0 z-30 shrink-0 border-b border-black/[0.06] bg-white/95 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-3 py-1 text-[12px] font-medium rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#1d1d1f] text-white shadow-xs'
                      : 'bg-[#f4f4f4] text-[#555] hover:bg-[#eaeaea] hover:text-[#1d1d1f]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative flex items-center w-full md:w-64 shrink-0">
            <Search className="absolute left-2.5 size-3.5 text-[#999] pointer-events-none" />
            <input
              type="text"
              placeholder="搜索灵感、作者或风格..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-[#f4f4f4] py-1.5 pl-8 pr-7 text-[12px] text-[#1d1d1f] placeholder:text-[#999] focus:bg-white focus:outline-none focus:ring-1.5 focus:ring-[#b19670]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 text-[#999] hover:text-[#333]"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Count Bar */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-[#8e8e93]">
          <span className="flex items-center gap-1">
            <Sparkles className="size-3 text-[#b19670]" />
            共收录 <strong>{filteredPosts.length}</strong> 条精选灵感
            {activeCategory !== 'All' && ` (${activeCategory})`}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#b19670] hover:underline"
            >
              清除搜索
            </button>
          )}
        </div>
      </div>

      {/* Masonry Feed Content */}
      <div className="feed-panel flex-1 overflow-y-auto overscroll-contain bg-white px-4 py-4 sm:px-6">
        {filteredPosts.length > 0 ? (
          <div className="feed-grid">
            {filteredPosts.map((post, idx) => (
              <FeedCard
                key={post.id}
                post={post}
                onSelect={onSelectPost}
                priority={idx < 8}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center text-[#8e8e93]">
            <Filter className="size-10 stroke-1 mb-2 opacity-60" />
            <p className="text-[14px] font-medium text-[#1d1d1f]">未找到相关灵感</p>
            <p className="text-[12px] mt-1 text-[#8e8e93]">
              尝试调整筛选类别或更换搜索关键词
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-1.5 rounded-full bg-[#1d1d1f] text-white text-[12px]"
            >
              查看全部灵感
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
