import React from 'react';
import { ViewTab } from '../types';
import { daozhuConfig } from '../config/daozhu';
import { 
  Clapperboard, 
  Lightbulb, 
  Film, 
  Wrench, 
  Terminal, 
  Search, 
  Bookmark, 
  X 
} from 'lucide-react';

interface ScreeningHeaderProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  showCommentary: boolean;
  onToggleCommentary: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  savedCount: number;
  onOpenTray: () => void;
  onOpenDirectorDrawer: () => void;
}

export const ScreeningHeader: React.FC<ScreeningHeaderProps> = ({
  currentTab,
  onTabChange,
  showCommentary,
  onToggleCommentary,
  searchQuery,
  onSearchChange,
  savedCount,
  onOpenTray,
  onOpenDirectorDrawer,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-obsidian-950/90 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => onTabChange('storyboards')}
            className="group flex items-center gap-3 text-left outline-none"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-amber-400 shadow-inner group-hover:border-amber-400/60 transition-all">
              <Clapperboard className="size-5 transition-transform group-hover:scale-105" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-[16px] sm:text-[18px] tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  {daozhuConfig.title}
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/15 text-amber-400 border border-amber-500/20">
                  Director's Cut
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-zinc-400 font-normal">
                {daozhuConfig.slogan}
              </p>
            </div>
          </button>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 ml-4 pl-4 border-l border-white/[0.08]">
            <button
              type="button"
              onClick={() => onTabChange('storyboards')}
              className={`px-3 py-1.5 text-[13px] font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                currentTab === 'storyboards'
                  ? 'bg-white/10 text-white shadow-xs border border-white/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Film className="size-3.5 opacity-75" />
              <span>交互分镜</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange('tools')}
              className={`px-3 py-1.5 text-[13px] font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                currentTab === 'tools'
                  ? 'bg-white/10 text-white shadow-xs border border-white/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Wrench className="size-3.5 opacity-75" />
              <span>精选器材 · Tools</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange('skills')}
              className={`px-3 py-1.5 text-[13px] font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                currentTab === 'skills'
                  ? 'bg-white/10 text-white shadow-xs border border-white/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Terminal className="size-3.5 opacity-75" />
              <span>剧本指令 · Skills</span>
            </button>
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Director Commentary Mode Toggle */}
          <button
            type="button"
            onClick={onToggleCommentary}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              showCommentary
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-cinema-glow'
                : 'bg-white/[0.04] text-zinc-400 hover:text-zinc-200 border border-white/[0.06]'
            }`}
            title="开关导演分镜批注与产品潜台词"
          >
            <Lightbulb className={`size-3.5 ${showCommentary ? 'text-amber-400 fill-amber-400/30' : 'text-zinc-500'}`} />
            <span className="hidden sm:inline">导演批注</span>
            <span className={`text-[10px] font-mono px-1 py-0.2 rounded ${showCommentary ? 'bg-amber-400/20 text-amber-300' : 'bg-white/5 text-zinc-500'}`}>
              {showCommentary ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Quick Search */}
          <div className="relative flex items-center w-28 sm:w-44 md:w-56">
            <Search className="absolute left-2.5 size-3.5 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              placeholder="搜索镜头、作者..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-lg bg-white/[0.05] py-1.5 pl-8 pr-7 text-[12px] text-white placeholder:text-zinc-500 border border-white/[0.08] focus:border-amber-500/50 focus:bg-white/[0.08] focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2 text-zinc-500 hover:text-zinc-300"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Inspo Reel Tray Trigger */}
          <button
            type="button"
            onClick={onOpenTray}
            className={`relative size-9 rounded-lg flex items-center justify-center border transition-all ${
              savedCount > 0
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                : 'bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white'
            }`}
            title="查看灵感胶片盒"
          >
            <Bookmark className="size-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-obsidian-950 shadow-sm">
                {savedCount}
              </span>
            )}
          </button>

          {/* About Director Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenDirectorDrawer}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-all text-[12px]"
          >
            <div className="size-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-[10px] font-bold">
              岛
            </div>
            <span className="hidden md:inline font-medium">关于岛主</span>
          </button>
        </div>
      </div>
    </header>
  );
};
