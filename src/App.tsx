import { useState, useEffect, useMemo } from 'react';
import { Post, ActId, ViewTab } from './types';
import postsData from './data/posts.json';
import { ScreeningHeader } from './components/ScreeningHeader';
import { StoryActsNav } from './components/StoryActsNav';
import { StoryboardCard } from './components/StoryboardCard';
import { CinemaModal } from './components/CinemaModal';
import { InspoTray } from './components/InspoTray';
import { DirectorDrawer } from './components/DirectorDrawer';
import { ToolsView } from './components/ToolsView';
import { SkillsView } from './components/SkillsView';
import { registerCinemaSounds } from './utils/audio';
import { Filter, Bookmark } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('storyboards');
  const [currentAct, setCurrentAct] = useState<ActId>('all');
  const [showCommentary, setShowCommentary] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [savedPostIds, setSavedPostIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('daozhu_inspo_saved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isDirectorDrawerOpen, setIsDirectorDrawerOpen] = useState(false);

  // Initialize cinema haptic sound listener
  useEffect(() => {
    const unbind = registerCinemaSounds();
    return () => unbind();
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('daozhu_inspo_saved', JSON.stringify(savedPostIds));
    } catch {}
  }, [savedPostIds]);

  const allPosts = postsData as Post[];

  // Filtered posts based on act & search
  const filteredPosts = useMemo(() => {
    let list = allPosts;

    if (currentAct !== 'all') {
      list = list.filter((p) => p.act === currentAct);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        return (
          p.title.toLowerCase().includes(q) ||
          p.creatorName.toLowerCase().includes(q) ||
          p.subtext.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.styles && p.styles.some((s) => s.toLowerCase().includes(q))) ||
          (p.industries && p.industries.some((i) => i.toLowerCase().includes(q)))
        );
      });
    }

    return list;
  }, [allPosts, currentAct, searchQuery]);

  const savedPosts = useMemo(() => {
    const set = new Set(savedPostIds);
    return allPosts.filter((p) => set.has(p.id));
  }, [allPosts, savedPostIds]);

  const toggleSavePost = (post: Post) => {
    setSavedPostIds((prev) => {
      if (prev.includes(post.id)) {
        return prev.filter((id) => id !== post.id);
      } else {
        return [...prev, post.id];
      }
    });
  };

  const removeSavedPost = (id: string) => {
    setSavedPostIds((prev) => prev.filter((pId) => pId !== id));
  };

  const clearAllSaved = () => {
    setSavedPostIds([]);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. Master Control Header Bar */}
      <ScreeningHeader
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        showCommentary={showCommentary}
        onToggleCommentary={() => setShowCommentary(!showCommentary)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={savedPostIds.length}
        onOpenTray={() => setIsTrayOpen(true)}
        onOpenDirectorDrawer={() => setIsDirectorDrawerOpen(true)}
      />

      {/* Main Content Areas */}
      {currentTab === 'storyboards' && (
        <main className="flex-1 flex flex-col pb-24">
          {/* Cinematic Hero Manifesto Banner */}
          <section className="relative w-full border-b border-white/[0.06] bg-gradient-to-b from-obsidian-900/70 via-obsidian-950/40 to-transparent py-7 sm:py-9 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-80 rounded-full bg-amber-500/[0.05] blur-3xl" />

            <div className="mx-auto max-w-3xl space-y-2.5 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[11px] font-mono">
                <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>策展手记 · Curated by 岛主</span>
              </div>

              <h1 className="text-[18px] sm:text-[22px] md:text-[26px] font-bold tracking-tight text-white font-display">
                “设计是交互的分镜，微动效是产品的潜台词”
              </h1>

              <p className="text-[12px] sm:text-[13px] text-zinc-400 max-w-xl mx-auto leading-relaxed">
                十年编剧转产品经理。以故事思维与心理预期，解构全球顶尖数字界面的交互分镜与商业转化支点。
              </p>
            </div>
          </section>

          {/* Story Acts Timeline Navigator */}
          <StoryActsNav
            currentAct={currentAct}
            onSelectAct={setCurrentAct}
            filteredCount={filteredPosts.length}
          />

          {/* Storyboard Reel Stage */}
          <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-6">
            {filteredPosts.length > 0 ? (
              <div className="storyboard-grid">
                {filteredPosts.map((post, idx) => (
                  <StoryboardCard
                    key={post.id}
                    post={post}
                    showCommentary={showCommentary}
                    isSaved={savedPostIds.includes(post.id)}
                    onToggleSave={toggleSavePost}
                    onSelect={setSelectedPost}
                    priority={idx < 8}
                  />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center text-zinc-500 space-y-3">
                <Filter className="size-10 stroke-1 mx-auto text-amber-500/40" />
                <h4 className="text-[16px] font-medium text-zinc-200">
                  未检索到匹配的分镜镜头
                </h4>
                <p className="text-[12px] text-zinc-500 max-w-sm mx-auto">
                  尝试清除关键词搜索，或切换至「全部镜头」继续探索
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentAct('all');
                    setSearchQuery('');
                  }}
                  className="mt-2 px-4 py-1.5 rounded-full bg-amber-500 text-obsidian-950 font-semibold text-[12px] hover:bg-amber-400 transition-colors shadow-cinema-glow"
                >
                  重置筛选条件
                </button>
              </div>
            )}
          </div>
        </main>
      )}

      {currentTab === 'tools' && <ToolsView />}

      {currentTab === 'skills' && <SkillsView />}

      {/* Floating Bottom Reel Trigger Pill */}
      {savedPostIds.length > 0 && !isTrayOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={() => setIsTrayOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-semibold text-[13px] shadow-2xl transition-all hover:scale-105 active:scale-95 border border-amber-300/40"
          >
            <Bookmark className="size-4 fill-obsidian-950" />
            <span>已收录 {savedPostIds.length} 个镜头</span>
          </button>
        </div>
      )}

      {/* Theatrical Cinema Room Modal */}
      {selectedPost && (
        <CinemaModal
          post={selectedPost}
          posts={filteredPosts}
          onClose={() => setSelectedPost(null)}
          onSelectPost={setSelectedPost}
          isSaved={savedPostIds.includes(selectedPost.id)}
          onToggleSave={toggleSavePost}
        />
      )}

      {/* Inspo Reel Tray Drawer */}
      <InspoTray
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        savedPosts={savedPosts}
        onRemovePost={removeSavedPost}
        onClearAll={clearAllSaved}
        onSelectPost={(post) => {
          setSelectedPost(post);
        }}
      />

      {/* Director Drawer */}
      <DirectorDrawer
        isOpen={isDirectorDrawerOpen}
        onClose={() => setIsDirectorDrawerOpen(false)}
      />
    </div>
  );
}

export default App;
