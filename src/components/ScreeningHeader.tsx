import React from 'react';
import { ViewTab } from '../types';
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
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-obsidian-950/95 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 gap-2 sm:gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 xl:gap-5 shrink-0 min-w-0">
          <button
            type="button"
            onClick={() => onTabChange('storyboards')}
            className="group flex items-center gap-2.5 text-left outline-none shrink-0 cursor-pointer"
          >
            <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-amber-400 shadow-inner group-hover:border-amber-400/60 transition-all shrink-0">
              <Clapperboard className="size-4 sm:size-5 transition-transform group-hover:scale-105" />
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-[15px] sm:text-[17px] tracking-tight text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
                  岛主设计分镜
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/15 text-amber-400 border border-amber-500/20 whitespace-nowrap shrink-0">
                  Design Cut
                </span>
              </div>
              <p className="hidden 2xl:block text-[10.5px] text-zinc-400 font-normal">
                设计是交互的分镜，微动效是产品的潜台词
              </p>
            </div>
          </button>

          {/* Navigation Tabs - Modern Segmented Control */}
          <nav className="hidden md:flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] shrink-0">
            <button
              type="button"
              onClick={() => onTabChange('storyboards')}
              className={`px-3 py-1.5 text-[12px] sm:text-[13px] font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'storyboards'
                  ? 'bg-amber-500 text-obsidian-950 font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Film className="size-3.5 shrink-0" />
              <span>精选设计</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange('tools')}
              className={`px-3 py-1.5 text-[12px] sm:text-[13px] font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'tools'
                  ? 'bg-amber-500 text-obsidian-950 font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Wrench className="size-3.5 shrink-0" />
              <span>设计利器</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange('skills')}
              className={`px-3 py-1.5 text-[12px] sm:text-[13px] font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'skills'
                  ? 'bg-amber-500 text-obsidian-950 font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Terminal className="size-3.5 shrink-0" />
              <span>UI 技能</span>
            </button>
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Director Commentary Mode Toggle */}
          <button
            type="button"
            onClick={onToggleCommentary}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              showCommentary
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-cinema-glow'
                : 'bg-white/[0.04] text-zinc-400 hover:text-zinc-200 border border-white/[0.06]'
            }`}
            title="开关导演分镜批注与产品潜台词"
          >
            <Lightbulb className={`size-3.5 shrink-0 ${showCommentary ? 'text-amber-400 fill-amber-400/30' : 'text-zinc-500'}`} />
            <span className="whitespace-nowrap">导演批注</span>
            <span className={`text-[9px] sm:text-[10px] font-mono px-1 py-0.2 rounded font-bold shrink-0 ${showCommentary ? 'bg-amber-400/25 text-amber-300' : 'bg-white/10 text-zinc-500'}`}>
              {showCommentary ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Quick Search */}
          <div className="relative flex items-center w-28 sm:w-36 md:w-44 lg:w-52 shrink-0">
            <Search className="absolute left-2.5 size-3.5 text-zinc-500 pointer-events-none shrink-0" />
            <input
              type="text"
              placeholder="搜索设计、作者..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-lg bg-white/[0.05] py-1.5 pl-8 pr-7 text-[12px] text-white placeholder:text-zinc-500 border border-white/[0.08] focus:border-amber-500/50 focus:bg-white/[0.08] focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2 text-zinc-500 hover:text-zinc-300 shrink-0"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Inspo Reel Tray Trigger */}
          <button
            type="button"
            onClick={onOpenTray}
            className={`relative size-9 rounded-lg flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
              savedCount > 0
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                : 'bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white'
            }`}
            title="查看灵感胶片盒"
          >
            <Bookmark className="size-4 shrink-0" />
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
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-all text-[12px] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <div className="size-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-[10px] font-bold shrink-0">
              岛
            </div>
            <span className="hidden sm:inline font-medium whitespace-nowrap">关于岛主</span>
          </button>
        </div>
      </div>
    </header>
  );
};
