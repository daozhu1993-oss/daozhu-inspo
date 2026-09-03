import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  ArrowLeft, 
  ArrowRight,
  Clapperboard,
  Sparkles,
  Target,
  AlertCircle,
  TrendingUp,
  Bookmark,
  Check
} from 'lucide-react';

interface CinemaModalProps {
  post: Post;
  posts: Post[];
  onClose: () => void;
  onSelectPost: (post: Post) => void;
  isSaved: boolean;
  onToggleSave: (post: Post) => void;
}

export const CinemaModal: React.FC<CinemaModalProps> = ({
  post,
  posts,
  onClose,
  onSelectPost,
  isSaved,
  onToggleSave,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const currentIndex = posts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : posts[posts.length - 1];
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : posts[0];

  const mediaList = post.media && post.media.length > 0 ? post.media : [
    {
      type: post.isVideo ? 'video' as const : 'image' as const,
      src: post.videoSrc || post.poster || '',
      poster: post.poster || null,
      alt: post.title,
    }
  ];

  const currentMedia = mediaList[Math.min(slideIndex, mediaList.length - 1)] || mediaList[0];

  useEffect(() => {
    setSlideIndex(0);
  }, [post.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        if (prevPost) onSelectPost(prevPost);
      } else if (e.key === 'ArrowRight') {
        if (nextPost) onSelectPost(nextPost);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onSelectPost, prevPost, nextPost]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev + 1) % mediaList.length);
  };

  const formattedTake = String(post.takeNumber).padStart(3, '0');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8"
    >
      {/* Darkroom Cinematic Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-obsidian-950/90 backdrop-blur-2xl transition-opacity"
      />

      {/* Theater Frame */}
      <div className="relative z-10 flex h-full max-h-[92dvh] w-full max-w-6xl flex-col lg:flex-row overflow-hidden rounded-2xl border border-white/10 bg-obsidian-900 shadow-modal-glow">
        {/* Left Screen: Cinema Projection Area */}
        <div className="relative flex min-h-[300px] sm:min-h-[420px] lg:min-h-0 flex-1 items-center justify-center bg-black overflow-hidden">
          {currentMedia.type === 'video' ? (
            <video
              src={currentMedia.src}
              poster={currentMedia.poster || undefined}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="max-h-[85dvh] w-full object-contain"
            />
          ) : (
            <img
              src={currentMedia.src}
              alt={post.title}
              className="max-h-[85dvh] w-full object-contain"
            />
          )}

          {/* Slides Carousel Control */}
          {mediaList.length > 1 && (
            <>
              <span className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-mono font-medium text-amber-400 border border-white/10 backdrop-blur-md">
                FRAME {slideIndex + 1} / {mediaList.length}
              </span>
              <button
                type="button"
                onClick={handlePrevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all active:scale-95"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all active:scale-95"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}

          {/* Close Button on Mobile Screen */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-white/20 lg:hidden"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Right Stage: Director's Notebook (场记解析) */}
        <div className="flex w-full lg:w-[420px] flex-col border-t lg:border-t-0 lg:border-l border-white/10 bg-obsidian-900/95 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 font-mono text-[12px]">
              <Clapperboard className="size-4 text-amber-400" />
              <span className="text-amber-400 font-bold">TAKE #{formattedTake}</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400 uppercase">{post.act}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleSave(post)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                  isSaved
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                }`}
              >
                {isSaved ? <Check className="size-3" /> : <Bookmark className="size-3" />}
                <span>{isSaved ? '已收藏' : '收录'}</span>
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="hidden lg:flex size-8 items-center justify-center rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Title & Creator */}
          <div className="p-5 border-b border-white/[0.08] space-y-2">
            <h2 className="text-[17px] font-semibold text-white tracking-tight leading-snug">
              {post.title}
            </h2>
            <div className="flex items-center justify-between text-[12px] text-zinc-400">
              <span className="text-zinc-300 font-medium">{post.creatorName}</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.06] text-zinc-400 text-[10px] font-mono">
                {post.category}
              </span>
            </div>
          </div>

          {/* Director's Deconstruction (编剧与产品人视角) */}
          <div className="flex-1 p-5 space-y-4 text-[13px]">
            {/* Subtext Highlight */}
            <div className="rounded-xl bg-amber-500/[0.08] border border-amber-500/25 p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                <Sparkles className="size-3.5" />
                <span>导演潜台词 · Director's Subtext</span>
              </div>
              <p className="text-[13px] text-amber-100 font-medium leading-relaxed">
                “{post.subtext}”
              </p>
            </div>

            {/* Breakdown Cards */}
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium">
                  <Target className="size-3.5 text-zinc-500" />
                  <span>场景目的 (Objective)</span>
                </div>
                <p className="text-zinc-300 text-[12px] leading-relaxed pl-5">
                  {post.breakdown.objective}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium">
                  <AlertCircle className="size-3.5 text-zinc-500" />
                  <span>交互阻力与张力 (Tension)</span>
                </div>
                <p className="text-zinc-300 text-[12px] leading-relaxed pl-5">
                  {post.breakdown.friction}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium">
                  <TrendingUp className="size-3.5 text-zinc-500" />
                  <span>商业价值转化 (So What)</span>
                </div>
                <p className="text-zinc-300 text-[12px] leading-relaxed pl-5">
                  {post.breakdown.soWhat}
                </p>
              </div>
            </div>
          </div>

          {/* Action Bar & Stepper */}
          <div className="p-5 border-t border-white/[0.08] space-y-3 bg-obsidian-950/40">
            {post.sourceUrl && (
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-medium text-[13px] flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-cinema-glow"
              >
                <span>在作品原址查看完整演示</span>
                <ExternalLink className="size-3.5" />
              </a>
            )}

            {/* Navigation Stepper */}
            <div className="flex items-center justify-between text-zinc-400 pt-1">
              <button
                type="button"
                onClick={() => onSelectPost(prevPost)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[12px] transition-colors"
              >
                <ArrowLeft className="size-3.5" />
                <span>上一镜头</span>
              </button>

              <span className="font-mono text-[11px] text-zinc-500">
                {currentIndex + 1} / {posts.length}
              </span>

              <button
                type="button"
                onClick={() => onSelectPost(nextPost)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[12px] transition-colors"
              >
                <span>下一镜头</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
