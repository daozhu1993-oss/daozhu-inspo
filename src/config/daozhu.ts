import { ActMeta } from '../types';

export const ACTS: ActMeta[] = [
  {
    id: 'all',
    actNumber: 'ALL',
    nameZh: '全部设计',
    nameEn: 'All Design',
    desc: '全库 478 个精选交互与微动效案例全览'
  },
  {
    id: 'act1',
    actNumber: 'ACT I',
    nameZh: '引导仪式 · Onboarding',
    nameEn: 'Onboarding & Rituals',
    desc: '入场引导、身份确立、签名与契约式交互'
  },
  {
    id: 'act2',
    actNumber: 'ACT II',
    nameZh: '微动爽点 · Micro-Motion',
    nameEn: 'Micro-Motion & Feedback',
    desc: '物理碰撞、弹性缓动、微状态机与触觉反馈'
  },
  {
    id: 'act3',
    actNumber: 'ACT III',
    nameZh: '空间意图 · 3D & Spatial',
    nameEn: '3D & Spatial Canvas',
    desc: '3D 纵深、着色器流体、无界画布与沉浸视差'
  },
  {
    id: 'act4',
    actNumber: 'ACT IV',
    nameZh: '人机共创 · AI Native',
    nameEn: 'AI Native & Agents',
    desc: 'Agent 状态球、呼吸态光晕、多模态对话新范式'
  },
  {
    id: 'act5',
    actNumber: 'ACT V',
    nameZh: '品牌烙印 · Branding',
    nameEn: 'Branding & Typography',
    desc: '字体叙事、海报级排印、图形美学与视觉骨相'
  }
];

export const daozhuConfig = {
  name: "岛主",
  title: "岛主设计分镜 · Daozhu's Design Cut",
  slogan: "设计是交互的分镜，微动效是产品的潜台词",
  subtitle: "十年编剧转产品经理 · 用故事思维解构顶尖数字美学",
  bioZh: "干过十年编剧，后来转做产品经理。擅长用故事思维驱动各种「杂七杂八」的产品与数字美学探索。在看似分散的代码与动效中，寻找打动人心的戏剧张力与商业支点。",
  aboutHref: "https://daozhu1993-oss.github.io/v2/",
  links: [
    {
      label: "Twitter / X",
      handle: "@daozhu_1",
      href: "https://x.com/daozhu_1"
    },
    {
      label: "GitHub",
      handle: "daozhu1993-oss",
      href: "https://github.com/daozhu1993-oss"
    },
    {
      label: "微信公众号专栏",
      handle: "岛主的思考合集",
      href: "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzIxOTE5OTczNA==&action=getalbum&album_id=4578372974411530241&scene=21#wechat_redirect"
    },
    {
      label: "岛主 AI 日报",
      handle: "AI Daily Digest",
      href: "https://daozhu-ai-daily.daozhu1993.workers.dev"
    }
  ],
  community: {
    title: "一人公司与独立创造者",
    desc: "除了灵感分镜台，我们还有一个用故事思维与 AI 打造产品的一人公司创造者社群 — 300+。",
    buttonText: "访问 岛主 AI 日报",
    buttonHref: "https://daozhu-ai-daily.daozhu1993.workers.dev"
  }
};
