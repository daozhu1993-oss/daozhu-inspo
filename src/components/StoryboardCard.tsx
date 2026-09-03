import React, { useRef, useEffect, useState } from 'react';
import { Post } from '../types';
import { Play, Bookmark, Check, MessageSquareQuote } from 'lucide-react';

interface StoryboardCardProps {
  post: Post;
  showCommentary: boolean;
  isSaved: boolean;
  onToggleSave: (post: Post) => void;
  onSelect: (post: Post) => void;
  priority?: boolean;
}

export const StoryboardCard: React.FC<StoryboardCardProps> = ({
  post,
  showCommentary,
  isSaved,
  onToggleSave,
  onSelect,
  priority = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [avatarErr, setAvatarErr] = useState(false);

  const primaryMedia = post.media[0];
  const isVideo = post.isVideo || primaryMedia?.type === 'video';
  const videoSrc = post.videoSrc || (primaryMedia?.type === 'video' ? primaryMedia.src : null);
  const posterSrc = post.poster || primaryMedia?.poster || (primaryMedia?.type === 'image' ? primaryMedia.src : '');

  // Autoplay video on intersection
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '160px 0px', threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isVideo]);

  const aspectRatio = `${post.aspectW} / ${post.aspectH}`;
  const formattedTake = String(post.takeNumber).padStart(3, '0');

  return (
    <article className="storyboard-card-wrapper group">
      <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-obsidian-900/80 transition-all duration-300 hover:border-amber-500/40 hover:shadow-cinema-glow">
        {/* Card Header Strip */}
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/[0.06] bg-obsidian-950/60 text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">
              #{formattedTake}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-300 font-sans font-medium text-[11px]">
              {post.category}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(post);
              }}
              className={`p-1 rounded-md transition-colors ${
                isSaved
                  ? 'text-amber-400 bg-amber-400/15'
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
              title={isSaved ? '已收藏在灵感胶片盒' : '暂存至灵感胶片盒'}
            >
              {isSaved ? <Check className="size-3.5" /> : <Bookmark className="size-3.5" />}
            </button>
          </div>
        </div>

        {/* Media Window */}
        <button
          type="button"
          onClick={() => onSelect(post)}
          style={{ aspectRatio }}
          className="relative block w-full overflow-hidden bg-black text-left cursor-pointer focus:outline-none"
        >
          {isVideo && videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc || undefined}
              muted
              loop
              playsInline
              preload={priority ? 'metadata' : 'none'}
              className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <img
              src={primaryMedia?.src || posterSrc || ''}
              alt={post.title}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          )}

          {/* Film Grain & Hover Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-transparent to-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex items-center justify-center">
            <div className="flex size-11 items-center justify-center rounded-full bg-amber-500/90 text-obsidian-950 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-105">
              <Play className="size-5 fill-obsidian-950 ml-0.5" />
            </div>
          </div>
        </button>

        {/* Card Body: Title & Creator */}
        <div className="p-3.5 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={() => onSelect(post)}
              className="font-medium text-[13px] sm:text-[14px] text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer"
            >
              {post.title}
            </h3>
            <span className="shrink-0 text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-zinc-400 font-mono">
              {post.category}
            </span>
          </div>

          {/* Director Subtext / Commentary (Highlights Daozhu's Storyteller Lens) */}
          {showCommentary && post.subtext && (
            <div className="rounded-lg bg-amber-500/[0.07] border border-amber-500/20 p-2.5 transition-all">
              <div className="flex items-center gap-1 text-[10px] font-mono uppercase text-amber-400 font-semibold mb-1">
                <MessageSquareQuote className="size-3" />
                <span>导演潜台词 · Subtext</span>
              </div>
              <p className="text-[12px] text-amber-100/90 leading-relaxed">
                {post.subtext}
              </p>
            </div>
          )}

          {/* Card Footer: Creator */}
          <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-400 border-t border-white/[0.04]">
            <div className="flex items-center gap-2 truncate">
              {post.creatorAvatar && !avatarErr ? (
                <img
                  src={post.creatorAvatar}
                  alt=""
                  width={22}
                  height={22}
                  loading="lazy"
                  onError={() => setAvatarErr(true)}
                  className="size-5 rounded-full border border-white/10 object-cover shrink-0"
                />
              ) : (
                <span className="size-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[9px] font-bold shrink-0">
                  {post.creatorName.slice(1, 2).toUpperCase()}
                </span>
              )}
              <span className="truncate text-zinc-400 group-hover:text-zinc-300">
                {post.creatorName}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onSelect(post)}
              className="text-[11px] text-amber-400/90 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
            >
              <span>放映解析</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
