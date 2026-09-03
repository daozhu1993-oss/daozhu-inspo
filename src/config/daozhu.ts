export interface AuthorProfile {
  name: string;
  role: string;
  bioZh: string;
  bioEn: string;
  avatar: string;
  aboutHref: string;
  links: Array<{
    label: string;
    href: string;
    badge?: string;
  }>;
  community: {
    title: string;
    desc: string;
    buttonText: string;
    buttonHref: string;
  };
}

export const daozhuConfig: AuthorProfile = {
  name: "岛主",
  role: "产品人 · 前编剧",
  bioZh: "干过十年编剧，后来转去做产品经理。擅长用故事思维驱动各种「杂七杂八」的产品与数字美学探索。",
  bioEn: "Ten years a screenwriter, now a product manager. Driven by storytelling to craft product value and curate digital aesthetics.",
  avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=daozhu&backgroundColor=ded2ba",
  aboutHref: "https://daozhu1993-oss.github.io/v2/",
  links: [
    {
      label: "Twitter · @daozhu_1",
      href: "https://x.com/daozhu_1"
    },
    {
      label: "GitHub · daozhu1993-oss",
      href: "https://github.com/daozhu1993-oss"
    },
    {
      label: "微信公众号 · 岛主",
      href: "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzIxOTE5OTczNA==&action=getalbum&album_id=4578372974411530241&scene=21#wechat_redirect"
    },
    {
      label: "岛主 AI 日报 · AI Daily",
      href: "https://daozhu-ai-daily.daozhu1993.workers.dev"
    }
  ],
  community: {
    title: "一人公司与独立创造者",
    desc: "除了这个灵感库，还有一群正在用故事思维与 AI 打造产品的一人公司创造者 — 300+。",
    buttonText: "访问 岛主 AI 日报",
    buttonHref: "https://daozhu-ai-daily.daozhu1993.workers.dev"
  }
};
