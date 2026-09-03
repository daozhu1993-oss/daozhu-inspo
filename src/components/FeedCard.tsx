import React, { useRef, useEffect, useState } from 'react';
import { Post } from '../types';

interface FeedCardProps {
  post: Post;
  onSelect: (post: Post) => void;
  priority?: boolean;
}

export const FeedCard: React.FC<FeedCardProps> = ({ post, onSelect, priority = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [avatarError, setAvatarError] = useState(false);

  const primaryMedia = post.media[0];
  const isVideo = post.isVideo || primaryMedia?.type === 'video';
  const videoSrc = post.videoSrc || (primaryMedia?.type === 'video' ? primaryMedia.src : null);
  const posterSrc = post.poster || primaryMedia?.poster || (primaryMedia?.type === 'image' ? primaryMedia.src : '');

  // Autoplay video on intersection when visible
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
      { rootMargin: '120px 0px', threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isVideo]);

  const aspectRatio = `${post.aspectW} / ${post.aspectH}`;

  return (
    <article data-feed-card="true" className="break-inside-avoid w-full mb-4">
      <button
        type="button"
        onClick={() => onSelect(post)}
        aria-label={`View post: ${post.title}`}
        style={{ aspectRatio }}
        className="group relative block w-full overflow-hidden bg-[#f3f3f3] text-left transition-shadow hover:shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b19670]"
      >
        {/* Media Container: Video or Image */}
        {isVideo && videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc || undefined}
            muted
            loop
            playsInline
            preload={priority ? 'metadata' : 'none'}
            className="absolute inset-0 size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.035]"
          />
        ) : (
          <img
            src={primaryMedia?.src || posterSrc || ''}
            alt={post.title}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.035]"
          />
        )}

        {/* Subtle Top Gradient for text contrast on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

        {/* Hover Title and Category on top-left */}
        <div className="absolute top-2.5 left-2.5 right-2.5 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <p className="text-[12px] font-medium text-white drop-shadow-sm truncate">
            {post.title}
          </p>
          <span className="text-[10px] uppercase font-mono tracking-wider text-white/80">
            {post.category}
          </span>
        </div>

        {/* Multi-slides badge if applicable */}
        {post.slides && post.slides > 1 && (
          <span className="absolute top-2.5 right-2.5 z-10 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
            {post.slides} slides
          </span>
        )}

        {/* Creator Avatar on bottom-left */}
        <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5">
          {post.creatorAvatar && !avatarError ? (
            <img
              src={post.creatorAvatar}
              alt=""
              width={30}
              height={30}
              loading="lazy"
              onError={() => setAvatarError(true)}
              className="size-7 rounded-full border border-white/80 bg-zinc-200 object-cover shadow-sm transition-transform group-hover:scale-105"
            />
          ) : (
            <span className="flex size-7 items-center justify-center rounded-full border border-white/80 bg-zinc-800 text-[11px] font-medium text-white shadow-sm">
              {post.creatorName.replace(/^@/, '').slice(0, 1).toUpperCase()}
            </span>
          )}
          <span className="text-[11px] font-medium text-white/90 drop-shadow-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100 truncate max-w-[120px]">
            {post.creatorName}
          </span>
        </div>

        {/* Inset Border */}
        <span className="pointer-events-none absolute inset-0 border border-black/[0.06]" />
      </button>
    </article>
  );
};
