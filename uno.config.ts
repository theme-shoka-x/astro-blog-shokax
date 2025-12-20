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
    const iconStr = value.icon
    if (iconStr) {
      iconSafeList.push(iconStr.startsWith('i-') ? iconStr : `i-ri-${iconStr}`)
    }
  })
}

if (themeConfig.sidebar?.menu) {
  Object.values(themeConfig.sidebar.menu).forEach((value) => {
    const iconStr = value.icon
    if (iconStr) {
      iconSafeList.push(iconStr.startsWith('i-') ? iconStr : `i-ri-${iconStr}`)
    }
  })
}

// iconSafeList.push('i-ri-file-copy-fill')
// iconSafeList.push('i-ri-check-fill')

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons(),
    presetAttributify(),
  ],
  safelist: [...new Set([...iconSafeList])],
})
