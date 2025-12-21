import type { NavItemType } from "@/components/navbar/NavTypes";
import type { SidebarConfig } from "@/components/sidebar/SidebarTypes";

interface BrandConfig {
  title?: string;
  subtitle?: string;
  logo?: string;
}

interface CoverConfig {
  enableCover?: boolean;
  enablePreload?: boolean;
  fixedCover?: string;
  gradient?: boolean;
  covers?: string[];
  enableNextGradientCover?: boolean;
}

interface FooterConfig {
  since?: number;
  icon?: {
    name?: string;
    color?: string;
  };
  count?: boolean;
  powered?: boolean;
  icp?: {
    enable?: boolean;
    icon?: string;
    icpnumber?: string;
    beian?: string;
    recordcode?: string;
  };
}

interface WidgetsConfig {
  randomPosts?: boolean;
  recentComments?: boolean;
}

interface HomeConfig {
  selectedCategories?: {
    name: string;
    cover?: string;
  }[];
}

export interface ShokaXThemeConfig {
  siteName: string;
  nav: NavItemType[];
  sidebar?: SidebarConfig;
  brand?: BrandConfig;
  cover?: CoverConfig;
  footer?: FooterConfig;
  widgets?: WidgetsConfig;
  home?: HomeConfig;
}

export function defineConfig(config: ShokaXThemeConfig) {
  return config;
}
