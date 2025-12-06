import { defineConfig, presetAttributify, presetIcons, presetWind4 } from 'unocss'
import themeConfig from './src/theme.config'

const iconSafeList = themeConfig.nav.flatMap((item) => {
  const icons: string[] = []
  if (item.icon) {
    icons.push(item.icon)
  }
  if (item.dropboxItems) {
    item.dropboxItems.forEach((subItem) => {
      if (subItem.icon) {
        icons.push(subItem.icon)
      }
    })
  }
  return icons
})

// Add sidebar social and menu icons to safelist
if (themeConfig.sidebar?.social) {
  Object.values(themeConfig.sidebar.social).forEach((value) => {
    const iconStr = typeof value === 'string' ? value.split('||')[1]?.trim() : value.icon
    if (iconStr) {
      const iconClass = iconStr.startsWith('i-') ? iconStr : `i-ri-${iconStr}`
      iconSafeList.push(iconClass)
    }
  })
}

if (themeConfig.sidebar?.menu) {
  Object.values(themeConfig.sidebar.menu).forEach((value) => {
    const iconStr = typeof value === 'string' ? value.split('||')[1]?.trim() : ''
    if (iconStr) {
      const iconClass = iconStr.startsWith('i-') ? iconStr : `i-ri-${iconStr}`
      iconSafeList.push(iconClass)
    }
  })
}

// Add common sidebar icons
const commonSidebarIcons = [
  'i-ri-home-2-fill',
  'i-ri-archive-2-line',
  'i-ri-price-tag-3-line',
  'i-ri-folder-2-line',
  'i-ri-information-line',
  'i-ri-mail-line',
  'i-ri-github-fill',
  'i-ri-twitter-x-line',
  'i-ri-facebook-circle-fill',
  'i-ri-menu-line',
  'i-ri-arrow-drop-down-fill',
]

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons(),
    presetAttributify(),
  ],
  safelist: [...new Set([...iconSafeList, ...commonSidebarIcons])],
})
