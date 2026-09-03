import React, { useState } from 'react';
import { SectionType } from '../types';
import { SidebarDeck } from './SidebarDeck';
import { Menu, X } from 'lucide-react';

interface MobileNavProps {
  currentSection: SectionType;
  onSelectSection: (section: SectionType) => void;
  onHomeClick?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentSection,
  onSelectSection,
  onHomeClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (section: SectionType) => {
    onSelectSection(section);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <header className="absolute inset-x-0 top-0 z-[45] flex h-14 items-center justify-between border-b border-black/[0.06] bg-white px-4 lg:hidden">
        <button
          type="button"
          onClick={() => {
            handleSelect('design');
            onHomeClick?.();
          }}
          className="crt-etch block max-w-full truncate text-left outline-none"
        >
          <span className="font-script font-bold text-[22px] tracking-tight">
            岛主灵感
          </span>
          <span className="ml-2 text-[10px] font-mono text-[#8a7b66] uppercase">
            Daozhu's Inspo
          </span>
        </button>

        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-black/10 bg-white text-[#1d1d1f] transition-colors hover:bg-[#fafafa]"
        >
          {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm lg:hidden">
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 max-h-[85dvh] w-full rounded-t-2xl bg-[#ded2ba] p-5 shadow-2xl border-t-2 border-[#efe8dc]">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] mb-3">
              <span className="text-[13px] font-medium text-[#534636]">
                控制台与主理人介绍
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="size-7 flex items-center justify-center rounded-full bg-black/[0.06] text-[#534636]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="max-h-[68dvh] overflow-y-auto">
              <SidebarDeck
                currentSection={currentSection}
                onSelectSection={handleSelect}
                onHomeClick={onHomeClick}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
