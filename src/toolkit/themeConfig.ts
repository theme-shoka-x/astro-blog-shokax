import type { NavItemType } from "@/components/navbar/NavTypes";
import type { SidebarConfig } from "@/components/sidebar/SidebarTypes";
import type { Locale } from "@/i18n";
import { sanitizeThemeColor, type ThemeColorValue } from "./themeColor";
import { DEFAULT_THEME_CONFIG } from "./themeConfig.defaults";

interface BrandConfig {
  /**
   * 网站标题。
   * - 显示在页面 Brand 区域
   * - 会与 logo 和 subtitle 组合显示
   */
  title?: string;

  /**
   * 网站副标题。
   * - 仅在首页时显示在标题下方
   * - 用于补充说明网站主题或特色
   */
  subtitle?: string;

  /**
   * Logo 符号。
   * - 显示在标题左侧
   * - 推荐使用 emoji（如 "✨"）或短文本
   * - 也可填写图片路径
   */
  logo?: string;
}

interface CoverConfig {
  /**
   * 是否显示封面图。
   * - true：显示页面顶部封面区域
   * - false：隐藏封面，页面从导航栏下方直接开始
   */
  enable?: boolean;

  /**
   * 是否预加载封面图。
   * - true：使用 <link rel="preload"> 提前加载封面图片，提升首屏性能
   * - false：按默认方式加载
   * - 建议大型图片或网络较慢时启用
   */
  preload?: boolean;

  /**
   * 固定封面配置。
   */
  fixedCover?: {
    /**
     * 是否启用固定封面。
     * - true：优先使用 url 字段
     * - false：忽略固定封面
     */
    enable?: boolean;

    /**
     * 固定封面 URL。
     * - 推荐填 Images.astro 的预设 key："cover-1" ~ "cover-6"（会走 Astro 静态导入与 <Image />）
     * - 也可填 public 路径或远程 URL（会使用 <img> 兜底渲染）
     */
    url?: string;
  };

  /**
   * 远端/字符串轮播图列表。
   * - 仅在 fixedCover 未启用且 gradient 为 false 时参与轮播
   * - 适用于直接在配置中填写一组 URL
   */
  carouselUrls?: string[];

  /**
   * 轮播图 JSON 数据源。
   * - 支持 public 下的本地 JSON 路径（如 "/carousel-covers.json"）
   * - 也支持远程 JSON URL（构建时拉取）
   * - 当 carouselUrls 非空时，优先使用 carouselUrls
   * - JSON 允许两种格式：字符串数组，或 { images: string[] } / { urls: string[] }
   */
  carouselSource?: string;

  /**
   * 是否使用渐变背景封面。
   * - true：使用必应 API 获取每日图片作为封面
   * - false：使用预设封面图片或轮播
   * - 启用后会覆盖固定封面设置
   */
  gradient?: boolean;

  /**
   * 文章导航是否使用渐变背景。
   * - true：文章页底部的上一篇/下一篇导航使用随机渐变色背景
   * - false：使用文章封面图
   */
  nextGradientCover?: boolean;
}

interface FooterConfig {
  /**
   * 网站成立年份。
   * - 用于显示版权信息："© 2025-2026"
   * - 不填则默认为当前年份
   */
  since?: number;

  /**
   * 页脚图标配置。
   */
  icon?: {
    /**
     * 图标名称（CSS 动画类名）。
     * - 建议值："sakura rotate"（旋转的樱花效果）
     */
    name?: string;

    /**
     * 图标颜色。
     * - 推荐优先使用 design token 引用：`var(--color-*)`
     * - 兼容十六进制与函数色值：`#fff`、`rgb(...)`、`hsl(...)`、`oklch(...)`
     */
    color?: ThemeColorValue;
  };

  /**
   * 是否显示统计信息。
   * - true：显示文章总数、总字数、估计阅读时间等统计
   * - false：不显示统计
   */
  count?: boolean;

  /**
   * 是否显示 "Powered by" 信息。
   * - true：显示主题和框架的致谢信息
   * - false：不显示
   */
  powered?: boolean;

  /**
   * ICP 备案配置（中国大陆网站必需）。
   */
  icp?: {
    /**
     * 是否启用备案信息显示。
     */
    enable?: boolean;

    /**
     * 备案图标路径。
     * - 填写 public 目录下的路径（如 "/beian-icon.png"）
     */
    icon?: string;

    /**
     * ICP 备案号。
     * - 示例："津ICP备2022001375号"
     */
    icpnumber?: string;

    /**
     * ICP备案查询链接。
     * - 填写完整 URL（如 "https://beian.miit.gov.cn/"）
     */
    icpurl?: string;

    /**
     * 公安备案号。
     * - 示例："京公网安备 11010502001234号"
     */
    beian?: string;

    /**
     * 公安备案代码。
     * - 用于生成公安备案查询链接
     */
    recordcode?: string;
  };
}

interface WidgetsConfig {
  /**
   * 是否显示随机文章小部件。
   * - true：在页脚区域显示随机推荐的 10 篇文章
   * - false：不显示
   */
  randomPosts?: boolean;

  /**
   * 是否显示最新评论小部件。
   * - true：显示最新评论列表（需要配置 Waline 或 Twikoo 评论系统）
   * - false：不显示
   */
  recentComments?: boolean;

  /**
   * 最新评论显示数量。
   * - 默认建议 5~10 条，避免页脚过长
   */
  recentCommentsLimit?: number;
}

interface WalineClientConfig {
  /**
   * Waline 服务端地址。
   * - 例如: https://comments.example.com
   */
  serverURL?: string;

  /**
   * 评论语言。
   * - 留空时由 Waline 根据浏览器语言决定
   */
  lang?: string;

  /**
   * 评论路径。
   * - 默认为当前 pathname
   * - 可用于多语言/去尾斜杠等场景统一路径
   */
  path?: string;

  /**
   * 暗黑模式配置。
   * - false: 关闭
   * - true: 强制开启
   * - "auto": 跟随系统
   * - CSS 选择器: 当选择器命中时启用暗黑模式
   */
  dark?: boolean | string;
}

interface CommentsConfig {
  /**
   * 是否启用评论模块。
   * - false 时文章页不挂载评论组件
   */
  enable?: boolean;

  /**
   * Waline 客户端配置。
   */
  waline?: WalineClientConfig;
}

interface NyxPlayerPlaylist {
  /** 歌单名称 */
  name: string;
  /** 歌单链接（网易云 / QQ 音乐） */
  url: string;
}

interface NyxPlayerConfig {
  /** 是否启用播放器 */
  enable?: boolean;

  /** 歌单配置 */
  urls?: NyxPlayerPlaylist[];

  /** 预设主题 */
  preset?: "nyx" | "shokax";

  /** 暗色模式选择器 */
  darkModeTarget?: string;
}

interface HomeConfig {
  /**
   * 首页精选分类。
   * - 用于首页展示特定分类的文章卡片
   */
  selectedCategories?: {
    /**
     * 分类名称。
     * - 必须与文章 frontmatter 中的 category 字段完全匹配
     * - 大小写敏感
     */
    name: string;

    /**
     * 分类封面图（可选）。
     * - 为该分类指定自定义封面图
     * - 可填写 public 路径或远程 URL
     */
    cover?: string;
  }[];

  /**
   * 首页分页：每页文章数量（不含置顶文章）。
   * - 默认为 10
   * - 置顶文章始终显示在首页第一页顶部，不占用分页配额
   */
  pageSize?: number;

  /**
   * 控制首页标题显示行为
   * default: 按照 ShokaX 经典行为，拼接brand、title和subtitle
   */
  title?: {
    behavior?: "default" | "custom";
    customTitle?: string;
  };
}

interface LayoutConfig {
  /**
   * 页面布局模式。
   * - "two-column"：默认双栏布局（左侧边栏 + 主内容）
   * - "three-column"：在超宽屏下启用三栏布局，右侧增加一个附加内容栏
   */
  mode?: "two-column" | "three-column";

  /**
   * 右侧附加栏配置。
   * - 当前可配置是否显示日历占位
   * - 若全部关闭，则显示空状态占位文本
   */
  rightSidebar?: {
    /**
     * 右栏卡片显示顺序。
     * - 支持的值："announcement" | "search" | "calendar" | "recentMoments" | "randomPosts" | "tagCloud"
     * - 未填写的卡片会按默认顺序自动追加到末尾
     */
    order?: Array<
      "announcement" | "search" | "calendar" | "recentMoments" | "randomPosts" | "tagCloud"
    >;

    /**
     * 是否显示全站搜索卡片。
     * - true：显示搜索入口卡片，并复用现有搜索浮层
     * - false/未设置：隐藏
     */
    search?: boolean;

    /**
     * 是否显示日历卡片。
     * - true/未设置：显示
     * - false：隐藏
     */
    calendar?: boolean;

    /**
     * 是否显示最近动态（说说）。
     * - true：显示最新 1 条动态
     * - false/未设置：隐藏
     */
    recentMoments?: boolean;

    /**
     * 是否显示随机文章卡片。
     * - true：显示随机文章列表
     * - false/未设置：隐藏
     */
    randomPosts?: boolean;

    /**
     * 是否显示标签云卡片。
     * - true：显示热门标签云
     * - false/未设置：隐藏
     */
    tagCloud?: boolean;

    /**
     * 是否显示公告卡片。
     * - true：显示站点公告内容
     * - false/未设置：隐藏
     */
    announcement?: boolean;
  };
}

export interface FriendLinkConfig {
  /** 站点地址 */
  url: string;
  /** 站点标题 */
  title: string;
  /** 站点描述 */
  desc: string;
  /** 作者或站点主理人 */
  author: string;
  /** 头像地址 */
  avatar: string;
  /** 主题色（可选，支持 CSS 颜色值或变量） */
  color?: ThemeColorValue;
  /** 站点预览图（可选） */
  siteImage?: string;
}

interface FriendsConfig {
  /** 友链页面标题 */
  title?: string;
  /** 友链页面描述 */
  description?: string;
  /** 友链配置示例使用的头像（可选） */
  avatar?: string;
  /** 友链配置示例使用的主题色（可选） */
  color?: ThemeColorValue;
  /** 友链配置示例使用的站点预览图（可选） */
  siteImage?: string;
  /** 友链列表 */
  links: FriendLinkConfig[];
}

interface TagCloudConfig {
  /**
   * 标签云颜色梯度起始色。
   * - 用于按词频计算颜色渐变
   * - 推荐优先使用 design token 引用：`var(--*)`
   * - 兼容十六进制与函数色值
   */
  startColor?: ThemeColorValue;

  /**
   * 标签云颜色梯度结束色。
   * - 用于按词频计算颜色渐变
   * - 推荐优先使用 design token 引用：`var(--*)`
   * - 兼容十六进制与函数色值
   */
  endColor?: ThemeColorValue;
}

interface VisibilityTitleConfig {
  /**
   * 是否启用页面可视度标题切换。
   */
  enable?: boolean;

  /**
   * 切换到其他标签页时显示的标题。
   */
  leaveTitle?: string;

  /**
   * 返回当前标签页时显示的标题。
   */
  returnTitle?: string;

  /**
   * 返回后恢复原始标题的延迟（毫秒）。
   * - 默认 3000
   */
  restoreDelay?: number;
}

interface HycAiRecommendConfig {
  /**
   * 是否启用 AI 相近文章推荐。
   * - false：关闭该功能
   * - true/未设置：允许在文章页尝试展示
   */
  enable?: boolean;

  /**
   * 最多展示推荐条数。
   * - 默认 3
   */
  limit?: number;

  /**
   * 最低相似度阈值。
   * - 取值范围建议 0~1
   * - 默认 0.4（40%）
   */
  minSimilarity?: number;
}

interface HycAiSummaryConfig {
  /**
   * 是否启用 AI 摘要卡片展示。
   * - false：关闭该功能
   * - true/未设置：允许在文章页展示（需有可用摘要）
   */
  enable?: boolean;

  /**
   * 摘要卡片标题。
   * - 默认值："AI 摘要"
   */
  title?: string;

  /**
   * 是否显示摘要模型信息。
   * - 默认 false
   */
  showModel?: boolean;
}

interface HycConfig {
  /**
   * 是否启用 HYC 扩展功能总开关。
   * - false：禁用全部 HYC 扩展能力
   * - true：允许各子功能按自身开关生效
   */
  enable?: boolean;

  /**
   * AI 相近文章推荐配置。
   */
  aiRecommend?: HycAiRecommendConfig;

  /**
   * AI 摘要配置。
   */
  aiSummary?: HycAiSummaryConfig;
}

interface DiagnosticsConfig {
  /**
   * 是否屏蔽开发/构建/检查期间由 FSWatcher 触发的
   * `MaxListenersExceededWarning` 输出。
   * - true：隐藏该已知工具链警告
   * - false：保留原始 warning 输出
   */
  suppressFsWatcherMaxListenersWarning?: boolean;
}

/**
 * 协议类型
 * CC 4.0 系列：BY, BY-SA, BY-ND, BY-NC, BY-NC-SA, BY-NC-ND
 * 禁止转载：NOREPRINT
 */
export type LicenseType =
  | "CC-BY-4.0"
  | "CC-BY-SA-4.0"
  | "CC-BY-ND-4.0"
  | "CC-BY-NC-4.0"
  | "CC-BY-NC-SA-4.0"
  | "CC-BY-NC-ND-4.0"
  | "NOREPRINT";

interface CopyrightConfig {
  /** 全站默认协议类型 */
  license?: LicenseType;
  /** 是否显示版权声明 */
  show?: boolean;
}

export interface ShokaXThemeConfig {
  /**
   * 网站名称。
   * - 用于 SEO、文章页标题等位置
   * - 与 brand.title 可以不同（brand.title 用于页面显示）
   */
  siteName: string;

  /**
   * 网站语言设置。
   * - "zh-CN"：简体中文
   * - "zh-TW"：繁体中文
   * - "ja"：日语
   * - "en"：英文
   * - 默认为 "zh-CN"
   */
  locale?: Locale;

  /**
   * 导航栏配置。
   * - 定义顶部导航栏的菜单项
   * - 支持链接、下拉菜单等类型
   */
  nav: NavItemType[];

  /**
   * 侧边栏配置。
   * - 包含作者信息、简介、社交链接、菜单等
   */
  sidebar?: SidebarConfig;

  /**
   * 品牌区配置。
   * - 包含网站标题、副标题、Logo 等
   */
  brand?: BrandConfig;

  /**
   * 封面配置。
   * - 控制页面顶部封面图的显示方式和样式
   */
  cover?: CoverConfig;

  /**
   * 页脚配置。
   * - 包含版权信息、统计数据、备案信息等
   */
  footer?: FooterConfig;

  /**
   * 小部件配置。
   * - 控制随机文章、最新评论等功能模块的显示
   */
  widgets?: WidgetsConfig;

  /**
   * 首页配置。
   * - 包含精选分类、分页设置等首页特定配置
   */
  home?: HomeConfig;

  /**
   * 布局配置。
   * - 控制当前主题使用双栏或三栏布局
   */
  layout?: LayoutConfig;

  /**
   * 评论配置。
   * - 当前用于 Waline 评论系统
   */
  comments?: CommentsConfig;

  /**
   * nyx-player 音乐播放器配置。
   */
  nyxPlayer?: NyxPlayerConfig;

  /**
   * 版权配置。
   * - 设置文章默认许可协议和版权声明显示
   */
  copyright?: CopyrightConfig;

  /**
   * 友链配置。
   * - 定义友链页面展示的卡片数据
   */
  friends?: FriendsConfig;

  /**
   * 标签云配色配置。
   * - 用于控制标签云字号梯度对应的颜色渐变
   */
  tagCloud?: TagCloudConfig;

  /**
   * 页面可视度标题切换配置。
   * - 失焦：显示 leaveTitle
   * - 聚焦：显示 returnTitle，延迟 restoreDelay 后恢复原始标题
   */
  visibilityTitle?: VisibilityTitleConfig;

  /**
   * HYC 扩展功能配置。
   * - enable 为总开关，关闭后所有 HYC 子功能不可用
   */
  hyc?: HycConfig;

  /**
   * 诊断与命令行输出配置。
   */
  diagnostics?: DiagnosticsConfig;
}

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

export type ThemeUserConfig<T> = T extends Primitive
  ? T
  : T extends readonly unknown[]
    ? T
    : T extends object
      ? { [K in keyof T]?: ThemeUserConfig<T[K]> }
      : T;

export type ShokaXThemeUserConfig = ThemeUserConfig<ShokaXThemeConfig>;

const DEFAULT_THEME_COLORS = {
  footerIcon: "var(--color-pink)",
  tagCloudStart: "var(--grey-6)",
  tagCloudEnd: "var(--color-blue)",
  social: "var(--color-pink)",
  friend: "var(--color-blue)",
} as const satisfies Record<string, ThemeColorValue>;

function normalizeThemeConfigColors(config: ShokaXThemeConfig): ShokaXThemeConfig {
  if (config.footer?.icon) {
    config.footer.icon.color = sanitizeThemeColor(
      config.footer.icon.color,
      DEFAULT_THEME_COLORS.footerIcon,
      "footer.icon.color",
    );
  }

  if (config.tagCloud) {
    config.tagCloud.startColor = sanitizeThemeColor(
      config.tagCloud.startColor,
      DEFAULT_THEME_COLORS.tagCloudStart,
      "tagCloud.startColor",
    );
    config.tagCloud.endColor = sanitizeThemeColor(
      config.tagCloud.endColor,
      DEFAULT_THEME_COLORS.tagCloudEnd,
      "tagCloud.endColor",
    );
  }

  if (config.sidebar?.social) {
    Object.entries(config.sidebar.social).forEach(([name, link]) => {
      if (!link?.color) return;
      link.color = sanitizeThemeColor(
        link.color,
        DEFAULT_THEME_COLORS.social,
        `sidebar.social.${name}.color`,
      );
    });
  }

  if (config.friends?.color) {
    config.friends.color = sanitizeThemeColor(
      config.friends.color,
      DEFAULT_THEME_COLORS.friend,
      "friends.color",
    );
  }

  if (config.friends?.links) {
    config.friends.links.forEach((link, index) => {
      if (!link.color) return;
      link.color = sanitizeThemeColor(
        link.color,
        DEFAULT_THEME_COLORS.friend,
        `friends.links[${index}].color`,
      );
    });
  }

  return config;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cloneConfigValue<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cloneConfigValue(item)) as T;
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, entryValue]) => [key, cloneConfigValue(entryValue)]),
    ) as T;
  }

  return value;
}

/**
 * 递归合并主题配置对象。
 * - 对于对象类型，进行深度合并，覆盖默认值的同时保留未覆盖的默认配置项
 * - 对于数组类型，直接使用覆盖值，不进行合并
 * - 对于原始值，直接使用覆盖值
 */
function mergeThemeConfig<T>(defaults: T, overrides?: ThemeUserConfig<T>): T {
  if (overrides === undefined) {
    return cloneConfigValue(defaults);
  }

  if (Array.isArray(defaults) || Array.isArray(overrides)) {
    return cloneConfigValue(overrides as T);
  }

  if (isPlainObject(defaults) && isPlainObject(overrides)) {
    const mergedEntries = new Map<string, unknown>();

    Object.keys(defaults).forEach((key) => {
      mergedEntries.set(
        key,
        mergeThemeConfig(defaults[key as keyof typeof defaults], overrides[key]),
      );
    });

    Object.keys(overrides).forEach((key) => {
      if (mergedEntries.has(key)) {
        return;
      }

      const overrideValue = overrides[key];
      if (overrideValue !== undefined) {
        mergedEntries.set(key, cloneConfigValue(overrideValue));
      }
    });

    return Object.fromEntries(mergedEntries) as T;
  }

  return cloneConfigValue(overrides as T);
}

export function defineConfig(config: ShokaXThemeUserConfig = {}): ShokaXThemeConfig {
  return normalizeThemeConfigColors(
    mergeThemeConfig<ShokaXThemeConfig>(DEFAULT_THEME_CONFIG, config),
  );
}
