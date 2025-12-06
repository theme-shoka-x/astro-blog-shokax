import type { NavItemType } from '../navbar/NavTypes'

export interface SidebarConfig {
  author?: string
  description?: string
  avatar?: string
  social?: Record<string, string | SocialLink>
  menu?: NavItemType[] | MenuConfig
  state?: StateConfig
}

export interface StateConfig {
  posts?: number
  categories?: number
  tags?: number
  archiveUrl?: string
  categoryUrl?: string
  tagUrl?: string
}

export interface SocialLink {
  url: string
  icon: string
  color?: string
}

export type MenuConfig = Record<string, string | MenuItemConfig>

export interface MenuItemConfig {
  url?: string
  icon?: string
  children?: NavItemType[]
}
