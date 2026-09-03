# 岛主灵感 · Daozhu's Inspiration

> 一个由个人主理、高审美、复古硬件工控美学（Skeuomorphic CRT & Audio Deck）的全球顶尖设计与微交互策展工坊。

---

## 🌟 项目特色

1. **工业复古硬件终端美学 (Skeuomorphic Hardware Bezel)**
   - 经典暖灰米黄机身（`--bezel: #ded2ba`）与斜切倒角（Chamfer）。
   - 四角内嵌拟真金属十字螺丝（径向光泽与 25° 凹槽阴影）。
   - 底部中央微光呼吸绿 LED 电源指示灯（`crt-led` 脉冲动效）。
   - 屏幕多层深陷立体内阴影（`crt-well`）与防眩光拟真反光滤镜（`crt-glare` & `crt-scan` 微噪点）。
   - 铭牌阴阳雕刻立体文字（`crt-etch`）。

2. **物理级 Web Audio 机械微动按键音效**
   - 原生 Web Audio API 双频段实时合成微动开关音效（带通滤波 + 快速三角波下潜频移）。
   - 点击右侧控制台按键或画廊按钮时，提供逼真的机械物理下压触感与声学反馈。

3. **主理人「岛主」声音与品牌叙事**
   - 铭牌定制：**岛主灵感 · Daozhu's Inspiration**。
   - 主理人档案：*“干过十年编剧，后来转去做产品经理。擅长用故事思维驱动各种「杂七杂八」的产品与数字美学探索。”*
   - 社交与矩阵联动：直达 X (Twitter)、GitHub、即刻、微信公众号以及「岛主 AI 日报」。

4. **全量 478+ 篇真实精选设计瀑布流**
   - 涵盖 **动效交互 (Motion)**、**产品设计 (Product)**、**网页视觉 (Web)**、**3D空间 (3D)**、**品牌设计 (Branding)**。
   - 自动懒加载、视口可见时自动播放循环静音高画质视频、Hover 悬浮微缩放。
   - 支持多级快速类别筛选与实时搜索。

5. **沉浸式卡片画廊弹窗 (Post Modal)**
   - 完整显示作者头像、推特 Handle、高清大图或循环视频、作品描述与标签。
   - 支持作品原址/推特直达。
   - 支持键盘快捷键：`←` 上一个作品、`→` 下一个作品、`Esc` 退出弹窗。
   - 多图/多视频时支持轮播指示器与切换。

6. **实用工具 (Best Tools) & Agent 技能 (Best Skills) 分区**
   - **Best Tools**：精选 11 大类别（Interface, Components, Motion, Type, Craft, Visual, 3D, Build, Capture, Workspace, Sound）的高效设计利器，带有真实 Google Favicon。
   - **Best Skills**：收录面向 AI Agent、设计工程师的专业级界面质量审计与动效指令规范库。

---

## 🛠️ 快速启动

```bash
# 1. 安装依赖
npm install

# 2. 启动本地开发服务
npm run dev

# 3. 生产环境打包
npm run build

# 4. 本地静态预览
npm run preview
```

---

## 📂 项目目录结构

```text
daozhu-inspo/
├── index.html                   # HTML 入口与字体预加载
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg              # 复古硬件终端 SVG 图标
└── src/
    ├── types/                   # 强类型定义 (Post, Tool, Skill, Section)
    ├── data/
    │   ├── posts.json           # 478+ 篇真实精选设计数据
    │   ├── tools.json           # 优质设计工具库 (11大类)
    │   └── skills.json          # Agent 界面技能库 (7大类)
    ├── config/
    │   └── daozhu.ts            # 岛主个人档案、社交外链与品牌文案
    ├── utils/
    │   └── audio.ts             # Web Audio 机械按键物理微动合成器
    ├── components/
    │   ├── CrtFrame.tsx         # 硬件外壳、四角螺丝、呼吸灯与 CRT 屏幕
    │   ├── SidebarDeck.tsx      # 右侧硬件控制台 (简介、分区切换、社群外联)
    │   ├── MobileNav.tsx        # 移动端响应式顶部导航与抽屉
    │   ├── FeedGrid.tsx         # 瀑布流自适应卡片网格与筛选搜索
    │   ├── FeedCard.tsx         # 视频/图片卡片 (自动播放、作者头像)
    │   ├── PostModal.tsx        # 画廊弹窗 (键盘导航、原址跳转)
    │   ├── ToolsView.tsx        # 实用工具分类展示
    │   └── SkillsView.tsx       # Agent 设计技能分类展示
    ├── App.tsx                  # 核心路由与状态管理
    ├── main.tsx                 # React 入口
    └── index.css                # CRT Skeuomorphic 纯 CSS 硬件样式
```

---

## 🚀 部署上线建议

由于本项目打包后为纯静态单页应用（SPA），无需任何服务器开销：
- **Cloudflare Pages**：直接关联 GitHub 仓库，Build command 为 `npm run build`，Output directory 为 `dist`。
- **Vercel / Netlify / GitHub Pages**：零配置自动识别 Vite 项目并发布。
