import React, { useState } from 'react';
import { SkillCategory, SkillItem } from '../types';
import skillsData from '../data/skills.json';
import { ExternalLink, Terminal, Search, X } from 'lucide-react';

export const SkillsView: React.FC = () => {
  const categories: SkillCategory[] = skillsData as SkillCategory[];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.map((cat) => {
    if (!searchQuery.trim()) return cat;
    const q = searchQuery.toLowerCase().trim();
    return {
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.blurb.toLowerCase().includes(q) ||
          item.owner.toLowerCase().includes(q)
      ),
    };
  }).filter((cat) => cat.items.length > 0);

  const totalSkills = categories.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <div className="flex-1 overflow-y-auto bg-obsidian-950 pb-16">
      {/* Sticky Bar */}
      <div className="sticky top-16 z-30 border-b border-white/[0.08] bg-obsidian-950/90 backdrop-blur-md px-5 py-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-[18px] sm:text-[20px] font-semibold tracking-tight text-white flex items-center gap-2">
              <Terminal className="size-5 text-amber-400" />
              <span>剧本指令 · Agent Skills</span>
            </h1>
            <p className="text-[12px] text-zinc-400 mt-0.5">
              收录 {totalSkills} 项面向 AI Agent 与独立全栈开发者的专业级界面工程指令规范
            </p>
          </div>

          <div className="relative flex items-center w-full sm:w-64">
            <Search className="absolute left-2.5 size-3.5 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              placeholder="搜索技能名称或描述..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-white/[0.05] py-1.5 pl-8 pr-7 text-[12px] text-white placeholder:text-zinc-500 border border-white/[0.08] focus:border-amber-500/50 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 text-zinc-500 hover:text-zinc-300"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Content */}
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 space-y-8">
        {filteredCategories.map((cat) => (
          <section key={cat.name} className="space-y-3">
            <h2 className="flex items-baseline gap-2 text-[14px] sm:text-[15px] font-semibold text-white">
              <span>{cat.name}</span>
              <span className="text-[12px] font-mono text-zinc-500">
                {cat.items.length} {cat.items.length === 1 ? 'skill' : 'skills'}
              </span>
            </h2>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.items.map((skill) => (
                <SkillCard key={skill.slug || skill.name} skill={skill} />
              ))}
            </ul>
          </section>
        ))}

        {filteredCategories.length === 0 && (
          <div className="py-16 text-center text-zinc-500">
            <p className="text-[14px]">未找到匹配的技能</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SkillCard: React.FC<{ skill: SkillItem }> = ({ skill }) => {
  const [avatarErr, setAvatarErr] = useState(false);

  return (
    <li className="relative group rounded-xl border border-white/[0.06] bg-obsidian-900/60 p-3.5 transition-all hover:bg-obsidian-850 hover:border-amber-500/30 hover:shadow-cinema-glow">
      <a
        href={skill.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3 outline-none"
      >
        {/* Author Avatar */}
        {!avatarErr ? (
          <img
            src={`https://github.com/${skill.owner}.png?size=48`}
            alt={skill.owner}
            width={34}
            height={34}
            loading="lazy"
            onError={() => setAvatarErr(true)}
            className="size-8 rounded-full border border-white/10 object-cover shrink-0"
          />
        ) : (
          <div className="size-8 rounded-full bg-amber-500/20 text-amber-300 font-medium text-xs flex items-center justify-center shrink-0 border border-amber-500/30">
            {skill.owner.slice(0, 1).toUpperCase()}
          </div>
        )}

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <h3 className="text-[13px] sm:text-[14px] font-medium text-zinc-200 group-hover:text-amber-300 transition-colors truncate">
              {skill.name}
              <span className="ml-2 text-[11px] font-mono text-zinc-500 font-normal">
                @{skill.owner}
              </span>
            </h3>
            <ExternalLink className="size-3 text-zinc-500 group-hover:text-amber-400 shrink-0 transition-colors" />
          </div>
          <p className="text-[12px] text-zinc-400 leading-relaxed mt-0.5 line-clamp-2">
            {skill.blurb}
          </p>
        </div>
      </a>
    </li>
  );
};
