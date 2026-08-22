import type { ShokaXThemeConfig } from "./themeConfig";

export const DEFAULT_THEME_CONFIG: ShokaXThemeConfig = {
  siteName: "ShokaX",
  locale: "zh-CN",
  analytics: {
    googleAnalytics: {
      // GA4 衡量 ID，例如 "G-XXXXXXXXXX"；留空则不注入 GA 脚本
      measurementId: "",
    },
    umami: {
      // Umami 网站 ID；留空则不注入 Umami 脚本
      websiteId: "",
      // Umami 追踪脚本地址；留空时使用官方云端脚本
      scriptUrl: "",
    },
  },
  nav: [
    {
      href: "/",
      text: "首页",
      icon: "i-ri-home-line",
    },
    {
      text: "关于",
      href: "/about/",
      icon: "i-ri-user-3-line",
    },
    {
      text: "文章",
      href: "/random/",
      icon: "i-ri-quill-pen-fill",
      dropbox: {
        enable: true,
        items: [
          {
            href: "/categories/",
            text: "分类",
            icon: "i-ri-book-shelf-fill",
          },
          {
            href: "/tags/",
            text: "标签",
            icon: "i-ri-price-tag-3-fill",
          },
          {
            href: "/archives/",
            text: "归档",
            icon: "i-ri-archive-line",
          },
        ],
      },
    },
    {
      text: "友链",
      href: "/friends/",
      icon: "i-ri-link",
    },
    {
      text: "动态",
      href: "/moments/",
      icon: "i-ri-chat-quote-line",
    },
    {
      text: "统计",
      href: "/statistics/",
      icon: "i-ri-bar-chart-box-line",
    },
  ],
  brand: {
    title: "ShokaX",
    subtitle: "A modern blog theme",
    logo: "✨",
  },
  cover: {
    enable: true,
    preload: true,
    advancedCarousel: false,
    fixedCover: {
      enable: true,
      url: "cover-4",
    },
    coverUrls: [],
    nextGradientCover: false,
  },
  sidebar: {
    author: "Your Name",
    description: "A brief introduction",
    social: {},
  },
  footer: {
    since: 2025,
    icon: {
      name: "sakura rotate",
      color: "var(--color-pink)",
    },
    count: true,
    powered: true,
    icp: {
      enable: true,
      icpnumber: "津ICP备2022001375号",
      icpurl: "https://beian.miit.gov.cn/",
    },
  },
  tagCloud: {
    startColor: "var(--grey-6)",
    endColor: "var(--color-blue)",
  },
  widgets: {
    randomPosts: true,
    recentComments: true,
    recentCommentsLimit: 10,
  },
  comments: {
    enable: false,
    waline: {
      serverURL: "",
      lang: "zh-CN",
    },
  },
  hyc: {
    enable: false,
    aiSummary: {
      enable: true,
      title: "AI 摘要",
      showModel: true,
      cardExcerptSource: "default",
    },
    aiRecommend: {
      enable: true,
      limit: 3,
      minSimilarity: 0.4,
    },
  },
  diagnostics: {
    suppressFsWatcherMaxListenersWarning: true,
  },
  nyxPlayer: {
    enable: false,
    preset: "shokax",
    darkModeTarget: ':root[data-theme="dark"]',
    urls: [
      {
        name: "默认歌单",
        url: "https://music.163.com/#/playlist?id=2943811283",
      },
    ],
  },
  visibilityTitle: {
    enable: true,
    leaveTitle: "👀 你先忙，我等你回来~",
    returnTitle: "🎉 欢迎回来！",
    restoreDelay: 3000,
  },
  home: {
    selectedCategories: [{ name: "Tutorial" }, { name: "Frontend" }],
    pageSize: 5,
    title: {
      behavior: "default",
      customTitle: "",
    },
  },
  layout: {
    mode: "three-column",
    rightSidebar: {
      order: ["announcement", "search", "calendar", "recentMoments", "randomPosts", "tagCloud"],
      announcement: true,
      search: true,
      calendar: true,
      recentMoments: true,
      randomPosts: true,
      tagCloud: true,
    },
  },
  friends: {
    title: "友链",
    description: "卡片式展示，支持站点预览与主题色点缀。",
    comments: false,
    links: [
      {
        url: "https://astro.build/",
        title: "Astro",
        desc: "全站体验轻快的静态站点框架，适合内容型站点与博客。",
        author: "Astro Team",
        avatar: "https://avatars.githubusercontent.com/u/44914786?s=200&v=4",
        color: "var(--color-orange)",
        siteImage: "https://astro.build/assets/press/astro-logo-dark.svg",
      },
      {
        url: "https://svelte.dev/",
        title: "Svelte",
        desc: "编译时框架，现代与简洁，组件写起来很顺手。",
        author: "Svelte Team",
        avatar: "https://avatars.githubusercontent.com/u/23617963?s=200&v=4",
        color: "var(--color-red)",
      },
      {
        url: "https://vite.dev/",
        title: "Vite",
        desc: "快速的前端开发构建工具，HMR 体验很棒。",
        author: "Vite Team",
        avatar: "https://avatars.githubusercontent.com/u/65625612?s=200&v=4",
        color: "var(--color-blue)",
      },
      {
        url: "https://bun.sh/",
        title: "Bun",
        desc: "一体化 JavaScript 运行时，速度与工具链兼备。",
        author: "Bun Team",
        avatar: "https://avatars.githubusercontent.com/u/108928776?s=200&v=4",
        color: "var(--color-green)",
        siteImage: "https://bun.sh/logo.svg",
      },
    ],
  },
  copyright: {
    license: "CC-BY-NC-SA-4.0",
    show: true,
  },
};
