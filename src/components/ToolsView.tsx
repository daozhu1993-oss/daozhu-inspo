import React, { useState } from 'react';
import { ToolCategory, ToolItem } from '../types';
import toolsData from '../data/tools.json';
import { ExternalLink, Wrench, Search, X } from 'lucide-react';

export const ToolsView: React.FC = () => {
  const categories: ToolCategory[] = toolsData as ToolCategory[];
  const [searchQuery, setSearchQuery] = useState('');

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  };

  const getFavicon = (url: string) => {
    const domain = getDomain(url);
    if (domain.endsWith('github.io')) return 'https://github.com/favicon.ico';
    return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(`http://${domain}`)}&size=64`;
  };

  const filteredCategories = categories.map((cat) => {
    if (!searchQuery.trim()) return cat;
    const q = searchQuery.toLowerCase().trim();
    return {
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.blurb.toLowerCase().includes(q) ||
          item.url.toLowerCase().includes(q)
      ),
    };
  }).filter((cat) => cat.items.length > 0);

  const totalTools = categories.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <div className="feed-panel flex-1 overflow-y-auto overscroll-contain bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 border-b border-black/[0.06] bg-white/95 backdrop-blur-md px-5 py-4 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[20px] font-semibold tracking-tight text-[#1d1d1f] flex items-center gap-2">
            <Wrench className="size-5 text-[#b19670]" />
            实用工具 · Best Tools
          </h1>
          <p className="text-[12px] text-[#8e8e93] mt-0.5">
            收录 {totalTools} 款经岛主亲测的高效设计、动效与构建利器
          </p>
        </div>

        {/* Search */}
        <div className="relative flex items-center w-full sm:w-64">
          <Search className="absolute left-2.5 size-3.5 text-[#999] pointer-events-none" />
          <input
            type="text"
            placeholder="搜索工具名称或介绍..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full bg-[#f4f4f4] py-1.5 pl-8 pr-7 text-[12px] text-[#1d1d1f] placeholder:text-[#999] focus:bg-white focus:outline-none focus:ring-1.5 focus:ring-[#b19670]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 text-[#999] hover:text-[#333]"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Categories Content */}
      <div className="w-full py-6 px-5 sm:px-8 space-y-8">
        {filteredCategories.map((cat) => (
          <section key={cat.name} className="space-y-3">
            <h2 className="flex items-baseline gap-2 text-[15px] font-semibold text-[#1d1d1f]">
              <span>{cat.name}</span>
              <span className="text-[12px] font-normal text-[#8e8e93]">
                {cat.items.length} {cat.items.length === 1 ? 'tool' : 'tools'}
              </span>
            </h2>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.items.map((tool) => (
                <ToolCard key={tool.url} tool={tool} getFavicon={getFavicon} />
              ))}
            </ul>
          </section>
        ))}

        {filteredCategories.length === 0 && (
          <div className="py-16 text-center text-[#8e8e93]">
            <p className="text-[14px]">未找到匹配的工具</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ToolCard: React.FC<{ tool: ToolItem; getFavicon: (url: string) => string }> = ({
  tool,
  getFavicon,
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <li className="relative group rounded-xl border border-black/[0.06] bg-[#fafafa]/60 p-3.5 transition-all hover:bg-white hover:shadow-sm hover:border-[#b19670]/40">
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3 outline-none"
      >
        {/* Favicon */}
        {!imgFailed ? (
          <img
            src={getFavicon(tool.url)}
            alt=""
            width={34}
            height={34}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="size-8 rounded-lg bg-white object-contain p-1 border border-black/[0.08] shrink-0"
          />
        ) : (
          <div className="size-8 rounded-lg bg-[#efe6d6] text-[#6a5b45] font-semibold text-xs flex items-center justify-center border border-black/[0.06] shrink-0">
            {tool.name.slice(0, 1).toUpperCase()}
          </div>
        )}

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <h3 className="text-[14px] font-medium text-[#1d1d1f] group-hover:text-[#b19670] transition-colors truncate">
              {tool.name}
            </h3>
            <ExternalLink className="size-3 text-[#aaa] group-hover:text-[#b19670] shrink-0 transition-colors" />
          </div>
          <p className="text-[12px] text-[#71717a] leading-relaxed mt-0.5 line-clamp-2">
            {tool.blurb}
          </p>
        </div>
      </a>
    </li>
  );
};
