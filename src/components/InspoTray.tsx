import React, { useState } from 'react';
import { Post } from '../types';
import { Bookmark, X, Trash2, Copy, Check } from 'lucide-react';

interface InspoTrayProps {
  isOpen: boolean;
  onClose: () => void;
  savedPosts: Post[];
  onRemovePost: (postId: string) => void;
  onClearAll: () => void;
  onSelectPost: (post: Post) => void;
}

export const InspoTray: React.FC<InspoTrayProps> = ({
  isOpen,
  onClose,
  savedPosts,
  onRemovePost,
  onClearAll,
  onSelectPost,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyList = () => {
    const markdown = savedPosts.map((p, idx) => {
      return `${idx + 1}. **${p.title}** (${p.creatorName}) - 潜台词: "${p.subtext}"\n   链接: ${p.sourceUrl || 'https://daozhu1993-oss.github.io/daozhu-inspo/'}`;
    }).join('\n\n');

    const header = `# 岛主分镜台 · 灵感胶片清单 (${savedPosts.length} 条)\n\n` + markdown;
    navigator.clipboard.writeText(header).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md transition-all">
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative z-10 w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl border border-white/10 bg-obsidian-900 shadow-modal-glow overflow-hidden max-h-[80dvh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/[0.08] bg-obsidian-950/60">
          <div className="flex items-center gap-2">
            <Bookmark className="size-4 text-amber-400" />
            <h3 className="font-medium text-white text-[15px]">
              灵感胶片盒 (Inspo Reel)
            </h3>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
              {savedPosts.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content Reel */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3">
          {savedPosts.length > 0 ? (
            <div className="space-y-2.5">
              {savedPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-white/[0.06] bg-obsidian-950/40 hover:border-amber-500/30 transition-all group"
                >
                  <div
                    onClick={() => {
                      onSelectPost(post);
                      onClose();
                    }}
                    className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                  >
                    <div className="size-11 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                      <img
                        src={post.poster || post.media[0]?.src || ''}
                        alt=""
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[13px] font-medium text-zinc-200 group-hover:text-amber-300 truncate">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {post.subtext}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemovePost(post.id)}
                    className="size-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-white/5 transition-colors shrink-0"
                    title="从胶片盒移除"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-zinc-500">
              <Bookmark className="size-8 stroke-1 mx-auto mb-2 opacity-50 text-amber-400" />
              <p className="text-[14px] text-zinc-300">胶片盒还是空的</p>
              <p className="text-[12px] text-zinc-500 mt-1">
                在分镜流中点击书签按钮，即可收藏您钟爱的交互镜头
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {savedPosts.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-white/[0.08] bg-obsidian-950/80">
            <button
              type="button"
              onClick={onClearAll}
              className="text-[12px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="size-3.5" />
              <span>清空全部</span>
            </button>

            <button
              type="button"
              onClick={handleCopyList}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 text-[12px] font-semibold flex items-center gap-1.5 shadow-cinema-glow transition-all"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span>{copied ? '已复制灵感清单！' : '一键复制灵感分镜 Markdown'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
