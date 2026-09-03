import { useState, useEffect } from 'react';
import { Post, SectionType } from './types';
import postsData from './data/posts.json';
import { CrtFrame } from './components/CrtFrame';
import { SidebarDeck } from './components/SidebarDeck';
import { MobileNav } from './components/MobileNav';
import { FeedGrid } from './components/FeedGrid';
import { PostModal } from './components/PostModal';
import { ToolsView } from './components/ToolsView';
import { SkillsView } from './components/SkillsView';
import { registerKeySounds } from './utils/audio';

export function App() {
  const [currentSection, setCurrentSection] = useState<SectionType>('design');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Initialize tactile mechanical key sound listener
  useEffect(() => {
    const unbind = registerKeySounds();
    return () => unbind();
  }, []);

  const allPosts = postsData as Post[];

  return (
    <CrtFrame
      deck={
        <SidebarDeck
          currentSection={currentSection}
          onSelectSection={setCurrentSection}
          onHomeClick={() => setSelectedPost(null)}
        />
      }
    >
      <div className="flex h-full min-h-0 flex-1 flex-col relative overflow-hidden">
        {/* Mobile Header Nav */}
        <MobileNav
          currentSection={currentSection}
          onSelectSection={setCurrentSection}
          onHomeClick={() => setSelectedPost(null)}
        />

        {/* Screen View Area */}
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden pt-14 lg:pt-0">
          {currentSection === 'design' && (
            <FeedGrid posts={allPosts} onSelectPost={setSelectedPost} />
          )}

          {currentSection === 'tools' && <ToolsView />}

          {currentSection === 'skills' && <SkillsView />}
        </main>

        {/* Post Modal Dialog */}
        {selectedPost && (
          <PostModal
            post={selectedPost}
            posts={allPosts}
            onClose={() => setSelectedPost(null)}
            onSelectPost={setSelectedPost}
          />
        )}
      </div>
    </CrtFrame>
  );
}

export default App;
