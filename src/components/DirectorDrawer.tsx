import React from 'react';
import { daozhuConfig } from '../config/daozhu';
import { X, ExternalLink, Sparkles, Film, ArrowUpRight } from 'lucide-react';

interface DirectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectorDrawer: React.FC<DirectorDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-all">
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative z-10 w-full sm:max-w-md h-full bg-obsidian-900 border-l border-white/10 shadow-2xl flex flex-col overflow-y-auto">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.08] bg-obsidian-950/60 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs font-bold">
              岛
            </div>
            <div>
              <h3 className="font-semibold text-white text-[15px]">
                主理人 · 岛主
              </h3>
              <p className="text-[11px] text-zinc-400 font-mono">
                {daozhuConfig.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 space-y-6 flex-1 text-[13px]">
          {/* Bio Box */}
          <div className="rounded-xl border border-white/[0.08] bg-obsidian-950/50 p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-bold uppercase">
              <Film className="size-3.5" />
              <span>主理人档案 · Profile</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              {daozhuConfig.bioZh}
            </p>
            <div className="pt-2">
              <a
                href={daozhuConfig.aboutHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 text-[12px] font-medium inline-flex items-center gap-1 group"
              >
                <span>浏览岛主个人完整履历与故事</span>
                <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Manifesto / Why this Storyboard */}
          <div className="space-y-2.5">
            <h4 className="text-zinc-200 font-semibold text-[14px] flex items-center gap-1.5">
              <Sparkles className="size-4 text-amber-400" />
              <span>为什么建立「分镜台」？</span>
            </h4>
            <div className="text-zinc-400 leading-relaxed space-y-2 text-[12px]">
              <p>
                全网的设计分享，大多停留在“好看的像素与动效”。但在实际产品研发中，孤立的美感无法促成转化。
              </p>
              <p>
                设计是交互的分镜，动效是产品的潜台词。作为干过十年编剧的产品人，我习惯拆解每个微交互背后的<strong>场景冲突、心理预期与商业支点</strong>。
              </p>
              <p>
                希望这个分镜台，能帮助每一位设计师、独立开发者和产品人，做出既动人、又能打硬仗的数字产品。
              </p>
            </div>
          </div>

          {/* Social Links List */}
          <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
            <h4 className="text-zinc-400 text-[11px] font-mono uppercase tracking-wider">
              社交与产品生态网络
            </h4>
            <div className="space-y-1.5">
              {daozhuConfig.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-amber-500/30 transition-all group"
                >
                  <div>
                    <div className="text-zinc-200 group-hover:text-white font-medium text-[13px]">
                      {link.label}
                    </div>
                    <div className="text-zinc-500 text-[11px] font-mono">
                      {link.handle}
                    </div>
                  </div>
                  <ExternalLink className="size-3.5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Community Callout */}
          <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent p-4 space-y-2">
            <h5 className="font-semibold text-amber-300 text-[13px]">
              {daozhuConfig.community.title}
            </h5>
            <p className="text-zinc-300 text-[12px] leading-relaxed">
              {daozhuConfig.community.desc}
            </p>
            <a
              href={daozhuConfig.community.buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-semibold text-[12px] transition-all shadow-cinema-glow mt-1"
            >
              <span>{daozhuConfig.community.buttonText}</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
