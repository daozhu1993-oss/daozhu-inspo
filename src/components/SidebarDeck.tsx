import React from 'react';
import { daozhuConfig } from '../config/daozhu';
import { SectionType } from '../types';
import { ExternalLink, Sparkles, Wrench, Terminal } from 'lucide-react';

interface SidebarDeckProps {
  currentSection: SectionType;
  onSelectSection: (section: SectionType) => void;
  onHomeClick?: () => void;
}

export const SidebarDeck: React.FC<SidebarDeckProps> = ({
  currentSection,
  onSelectSection,
  onHomeClick,
}) => {
  return (
    <div className="crt-scroll flex h-full min-h-0 w-full flex-col gap-5 overflow-y-auto overscroll-contain pb-2 pr-1">
      {/* Brand Title (Engraved) */}
      <div className="shrink-0 pt-1">
        <button
          type="button"
          onClick={() => {
            onSelectSection('design');
            onHomeClick?.();
          }}
          className="crt-etch group block max-w-full text-left outline-none transition-transform active:scale-[0.99]"
        >
          <span className="block font-script font-bold tracking-tight text-[26px] xl:text-[28px] leading-tight group-hover:opacity-90">
            岛主灵感
          </span>
          <span className="block text-[11px] font-medium tracking-wider uppercase opacity-75 mt-0.5">
            Daozhu's Inspiration
          </span>
        </button>
      </div>

      {/* Author Bio */}
      <div className="shrink-0">
        <p className="crt-etch text-[13px] leading-[20px]">
          {daozhuConfig.bioZh}{' '}
          <a
            href={daozhuConfig.aboutHref}
            target="_blank"
            rel="noopener noreferrer"
            className="crt-etch-link font-medium inline-flex items-center gap-0.5"
          >
            关于岛主
            <ExternalLink className="size-2.5 opacity-70" />
          </a>
        </p>

        {/* Profiles Navigation */}
        <nav aria-label="Profiles" className="mt-3 flex flex-col gap-2">
          {daozhuConfig.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="crt-etch-link w-fit text-[13px] leading-[1.4]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Primary Section Switcher */}
      <nav aria-label="Primary navigation" className="flex flex-col gap-2.5 my-auto py-2 shrink-0">
        <button
          type="button"
          aria-current={currentSection === 'design' ? 'page' : undefined}
          onClick={() => onSelectSection('design')}
          className={`crt-key ${currentSection === 'design' ? 'is-on' : ''}`}
        >
          <Sparkles className="size-4 opacity-75" />
          <span>精选设计 · Best Design</span>
        </button>

        <button
          type="button"
          aria-current={currentSection === 'tools' ? 'page' : undefined}
          onClick={() => onSelectSection('tools')}
          className={`crt-key ${currentSection === 'tools' ? 'is-on' : ''}`}
        >
          <Wrench className="size-4 opacity-75" />
          <span>实用工具 · Best Tools</span>
        </button>

        <button
          type="button"
          aria-current={currentSection === 'skills' ? 'page' : undefined}
          onClick={() => onSelectSection('skills')}
          className={`crt-key ${currentSection === 'skills' ? 'is-on' : ''}`}
        >
          <Terminal className="size-4 opacity-75" />
          <span>Agent 技能 · Best Skills</span>
        </button>
      </nav>

      {/* Community / Newsletter CTA at bottom */}
      <div className="mt-auto flex shrink-0 flex-col gap-2.5 pt-2 border-t border-black/[0.06]">
        <p className="crt-etch-mute text-[11px] leading-relaxed">
          {daozhuConfig.community.desc}
        </p>
        <a
          href={daozhuConfig.community.buttonHref}
          target="_blank"
          rel="noopener noreferrer"
          className="crt-brass text-[12px] h-[38px]"
        >
          <span>{daozhuConfig.community.buttonText}</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </div>
  );
};
