export type ActId = 'all' | 'today' | 'act1' | 'act2' | 'act3' | 'act4' | 'act5';

export interface ActMeta {
  id: ActId;
  actNumber: string;
  nameZh: string;
  nameEn: string;
  desc: string;
}

export interface SceneBreakdown {
  objective: string;
  friction: string;
  solution: string;
  soWhat: string;
}

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  poster?: string | null;
  width?: number | null;
  height?: number | null;
  alt?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  category: 'Product' | 'Motion' | '3D' | 'Web' | 'Branding' | string;
  creatorName: string;
  creatorAvatar?: string;
  description?: string;
  industries?: string[];
  colors?: string[];
  styles?: string[];
  sourceUrl?: string;
  isVideo: boolean;
  videoSrc?: string | null;
  poster?: string | null;
  aspectW: number;
  aspectH: number;
  slides?: number | null;
  media: MediaItem[];
  // Narrative Storyboard extensions
  takeNumber: number;
  act: 'act1' | 'act2' | 'act3' | 'act4' | 'act5';
  subtext: string;
  breakdown: SceneBreakdown;
  isToday?: boolean;
  dropDate?: string;
}

export interface ToolItem {
  name: string;
  url: string;
  blurb: string;
}

export interface ToolCategory {
  name: string;
  items: ToolItem[];
}

export interface SkillItem {
  name: string;
  slug: string;
  url: string;
  blurb: string;
  owner: string;
}

export interface SkillCategory {
  name: string;
  items: SkillItem[];
}

export type ViewTab = 'storyboards' | 'tools' | 'skills';
