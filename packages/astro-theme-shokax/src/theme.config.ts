import type { NavItemType } from './components/navbar/NavTypes'
import type { SidebarConfig } from './components/sidebar/SidebarTypes'

interface ShokaXThemeConfig {
  siteName: string
  nav: NavItemType[]
  sidebar?: SidebarConfig
}

function defineConfig(config: ShokaXThemeConfig) {
  return config
}

export default defineConfig({
  siteName: 'ShokaX',
  nav: [
    {
      href: '/',
      text: 'Home',
      icon: 'i-ri-home-line',
    },
    {
      href: '/about',
      text: 'About',
      icon: 'i-ri-user-6-line',
    },
    {
      href: '/contact',
      text: 'Contact',
      icon: 'i-ri-mail-line',
    },
    {
      dropbox: true,
      text: 'Account',
      href: '/account',
      icon: 'i-ri-account-circle-line',
      dropboxItems: [
        {
          href: '/login',
          text: 'Login',
          icon: 'i-ri-login-circle-line',
        },
        {
          href: '/register',
          text: 'Register',
          icon: 'i-ri-survey-line',
        },
      ],
    },
  ],
  sidebar: {
    author: 'Your Name',
    description: 'A brief introduction',
    avatar: '/avatar.jpg',
    // Modern object-style social configuration
    social: {
      github: {
        url: 'https://github.com/yourname',
        icon: 'i-ri-github-fill',
      },
      twitter: {
        url: 'https://twitter.com/yourname',
        icon: 'i-ri-twitter-x-line',
      },
      email: {
        url: 'mailto:your@email.com',
        icon: 'i-ri-mail-line',
      },
    },
    // Optional: Provide custom menu, otherwise it will use nav links
    // menu: [
    //   {
    //     href: '/',
    //     text: 'Home',
    //     icon: 'i-ri-home-2-fill',
    //   },
    // ]
  },
})
