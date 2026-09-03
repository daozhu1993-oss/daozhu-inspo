import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { X, ChevronLeft, ChevronRight, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';

interface PostModalProps {
  post: Post;
  posts: Post[];
  onClose: () => void;
  onSelectPost: (post: Post) => void;
}

export const PostModal: React.FC<PostModalProps> = ({
  post,
  posts,
  onClose,
  onSelectPost,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  // Find index in list
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

  // Reset slide index on post change
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

  const cleanHandle = post.creatorName.replace(/^@/, '');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
      className="absolute inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close post modal"
        onClick={onClose}
        className="absolute inset-0 bg-white/70 backdrop-blur-[24px] backdrop-saturate-150 cursor-default"
      />

      {/* Dialog Container */}
      <div className="relative z-10 flex w-full max-w-[720px] flex-col items-center gap-6">
        {/* Main Card */}
        <article className="flex max-h-[min(880px,84dvh)] w-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-black/[0.08]">
          {/* Card Header */}
          <header className="flex items-center justify-between px-5 py-4 sm:px-6 border-b border-black/[0.05]">
            <div className="flex items-center gap-3 min-w-0">
              {post.creatorAvatar ? (
                <img
                  src={post.creatorAvatar}
                  alt={post.creatorName}
                  width={42}
                  height={42}
                  className="size-10 rounded-full border border-black/10 object-cover shrink-0"
                />
              ) : (
                <div className="size-10 rounded-full bg-zinc-800 text-white font-medium flex items-center justify-center text-sm shrink-0">
                  {cleanHandle.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-[15px] font-semibold text-[#1d1d1f]">
                  {post.title}
                </h2>
                <p className="truncate text-[12px] text-[#8a8a8a]">
                  @{cleanHandle} · {post.category}
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="inline-flex size-9 items-center justify-center rounded-full bg-[#f3f3f3] text-[#1d1d1f] transition-colors hover:bg-[#e4e4e4] shrink-0"
            >
              <X className="size-4" />
            </button>
          </header>

          {/* Media Display Area */}
          <div className="relative min-h-0 flex-1 bg-[#0f0f10] flex items-center justify-center overflow-hidden">
            {currentMedia.type === 'video' ? (
              <video
                src={currentMedia.src}
                poster={currentMedia.poster || undefined}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="max-h-[54dvh] w-full object-contain"
              />
            ) : (
              <img
                src={currentMedia.src}
                alt={post.title}
                className="max-h-[54dvh] w-full object-contain"
              />
            )}

            {/* Slides Carousel Controls */}
            {mediaList.length > 1 && (
              <>
                <span className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                  {slideIndex + 1} / {mediaList.length}
                </span>
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-white/80 text-[#1d1d1f] shadow-md backdrop-blur-sm hover:bg-white transition-transform active:scale-95"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-white/80 text-[#1d1d1f] shadow-md backdrop-blur-sm hover:bg-white transition-transform active:scale-95"
                >
                  <ChevronRight className="size-4" />
                </button>
              </>
            )}
          </div>

          {/* Card Footer: Details & External Link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 sm:px-6 bg-white border-t border-black/[0.05]">
            <div className="min-w-0 flex-1">
              {post.description && (
                <p className="text-[13px] text-[#4a4a4a] leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                <span className="px-2 py-0.5 rounded bg-[#f4f4f4] text-[10px] font-medium text-[#666]">
                  {post.category}
                </span>
                {(post.styles || []).map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-[#f4f4f4] text-[10px] font-medium text-[#666]"
                  >
                    #{s}
                  </span>
                ))}
                {(post.industries || []).map((i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[#f4f4f4] text-[10px] font-medium text-[#666]"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>

            {post.sourceUrl && (
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="crt-key shrink-0 sm:w-auto px-5 h-[38px] text-[12px] flex items-center justify-center gap-1.5"
              >
                <span>
                  {post.sourceUrl.includes('x.com') || post.sourceUrl.includes('twitter.com')
                    ? '在 X / Twitter 查看原推'
                    : '查看作品原址'}
                </span>
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>
        </article>

        {/* Bottom Post Navigation Bar */}
        <nav aria-label="Post navigation" className="flex items-center gap-6">
          <button
            type="button"
            aria-label="Previous post"
            onClick={() => onSelectPost(prevPost)}
            className="flex size-11 items-center justify-center rounded-full bg-white text-[#1d1d1f] shadow-lg ring-1 ring-black/[0.08] transition-all hover:bg-[#fafafa] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="size-5" />
          </button>
          <span className="text-[12px] font-mono text-[#6a5b45] font-medium bg-[#efe6d6]/90 px-3 py-1 rounded-full shadow-xs">
            {currentIndex + 1} / {posts.length}
          </span>
          <button
            type="button"
            aria-label="Next post"
            onClick={() => onSelectPost(nextPost)}
            className="flex size-11 items-center justify-center rounded-full bg-white text-[#1d1d1f] shadow-lg ring-1 ring-black/[0.08] transition-all hover:bg-[#fafafa] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowRight className="size-5" />
          </button>
        </nav>
      </div>
    </div>
  );
};
