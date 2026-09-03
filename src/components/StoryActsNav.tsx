import React from 'react';
import { ActId } from '../types';
import { ACTS } from '../config/daozhu';
import { Compass } from 'lucide-react';

interface StoryActsNavProps {
  currentAct: ActId;
  onSelectAct: (act: ActId) => void;
  filteredCount: number;
}

export const StoryActsNav: React.FC<StoryActsNavProps> = ({
  currentAct,
  onSelectAct,
  filteredCount,
}) => {
  const activeMeta = ACTS.find((a) => a.id === currentAct) || ACTS[0];

  return (
    <div className="w-full border-b border-white/[0.06] bg-obsidian-900/60 backdrop-blur-sm py-3 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Act Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {ACTS.map((act) => {
            const isActive = currentAct === act.id;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => onSelectAct(act.id)}
                className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-obsidian-950 font-semibold shadow-cinema-glow'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                <span className={`text-[10px] font-mono tracking-wider opacity-80 ${isActive ? 'text-obsidian-900 font-bold' : 'text-amber-400'}`}>
                  {act.actNumber}
                </span>
                <span>{act.nameZh}</span>
              </button>
            );
          })}
        </div>

        {/* Narrative Context & Scene Count */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-[12px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Compass className="size-3.5 text-amber-500 opacity-80" />
            <span className="hidden sm:inline text-zinc-300 font-medium">{activeMeta.desc}</span>
          </div>
          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-zinc-300">
            {filteredCount} SCENES
          </span>
        </div>
      </div>
    </div>
  );
};
