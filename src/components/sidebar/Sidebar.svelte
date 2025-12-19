<script lang='ts'>
  import type { NavItemType } from '../navbar/NavTypes'
  import type { PanelConfig, PanelType, QuickNavigation, RelatedPost, SidebarConfig, TocItem } from './SidebarTypes'
  import { onMount } from 'svelte'
  import { sidebarOpen } from '../../stores/sidebarStore'
  import SidebarContents from './SidebarContents.svelte'
  import { initMenuActive } from './sidebarHelpers'
  import SidebarOverlay from './SidebarOverlay.svelte'
  import SidebarOverview from './SidebarOverview.svelte'
  import SidebarPanel from './SidebarPanel.svelte'
  import SidebarQuick from './SidebarQuick.svelte'
  import SidebarRelated from './SidebarRelated.svelte'
  import SidebarTabs from './SidebarTabs.svelte'

  interface Props {
    config?: SidebarConfig
    navLinks?: NavItemType[]
    toc?: TocItem[]
    relatedPosts?: RelatedPost[]
    currentSlug?: string
    navigation?: QuickNavigation
  }

  const {
    config = {
      author: '',
      description: '',
      avatar: '',
      social: {},
      state: {
        posts: 0,
        categories: 0,
        tags: 0,
        archiveUrl: '/archives/',
        categoryUrl: '/categories/',
        tagUrl: '/tags/',
      },
    },
    navLinks = [],
    toc = [],
    relatedPosts = [],
    currentSlug = '',
    navigation = {},
  }: Props = $props()

  let activePanel: PanelType = $state('overview')
  let sidebarElement: HTMLElement | null = $state(null)
  let isAffix = $state(false)

  // Determine menu source: use config.menu if provided, otherwise use navLinks
  const menuSource = $derived(config.menu !== undefined ? config.menu : navLinks)

  // Determine which panels should be available
  const panels: PanelConfig[] = $derived.by(() => {
    const availablePanels: PanelConfig[] = []

    // Contents panel (TOC) - only show if there are TOC items
    if (toc && toc.length > 0) {
      availablePanels.push({
        id: 'contents',
        title: '目录',
        hasContent: true,
      })
    }

    // Related panel - only show if there are related posts
    if (relatedPosts && relatedPosts.length > 0) {
      availablePanels.push({
        id: 'related',
        title: '相关',
        hasContent: true,
      })
    }

    // Overview panel - always available
    availablePanels.push({
      id: 'overview',
      title: '站点',
      hasContent: true,
    })

    return availablePanels
  })

  // Set default active panel only once on initial render
  let initialized = false
  $effect(() => {
    if (!initialized && panels.length > 0) {
      initialized = true
      const hasContents = panels.find(p => p.id === 'contents')
      if (hasContents) {
        activePanel = 'contents'
      }
    }
  })

  onMount(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined')
      return

    // Initialize menu active state
    initMenuActive()

    // Handle scroll for affix behavior on desktop
    const handleScroll = () => {
      // Calculate header height: nav (3.125rem = 50px) + header cover (70vh) + waves
      const headerElement = document.querySelector('#imgs') as HTMLElement | null
      const navElement = document.querySelector('#nav') as HTMLElement | null
      const wavesElement = document.querySelector('#waves') as HTMLElement | null

      let headerHeight = 0
      if (headerElement) {
        headerHeight = headerElement.offsetHeight
      }
      if (navElement) {
        headerHeight += navElement.offsetHeight
      }
      if (wavesElement) {
        headerHeight += wavesElement.offsetHeight
      }

      // Apply affix when scrolled past header and on desktop (width >= 1024px)
      // 155px 能保证侧边栏过渡效果自然
      const shouldAffix = window.scrollY > headerHeight - 155 && window.innerWidth >= 1024
      isAffix = shouldAffix
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  })

  const selectPanel = (panelId: string) => {
    activePanel = panelId as PanelType
  }

</script>

<!-- Mobile overlay backdrop -->
{#if $sidebarOpen}
  <SidebarOverlay />
{/if}

<aside
  bind:this={sidebarElement}
  id='sidebar'
  class={`${$sidebarOpen ? 'on' : ''} ${isAffix ? 'affix' : ''}`.trim()}
>
  <div class='inner'>
    <SidebarTabs {panels} {activePanel} onSelect={selectPanel} />

    <!-- Panels Container -->
    <div class='panels'>
      <div class='inner'>
        {#each panels as panel (panel.id)}
          <SidebarPanel
            id={panel.id}
            title={panel.title}
            isActive={activePanel === panel.id}
            class={activePanel === panel.id ? 'active' : ''}
          >
            {#if panel.id === 'overview'}
              <SidebarOverview {config} {menuSource} />
            {:else if panel.id === 'related'}
              <SidebarRelated posts={relatedPosts} {currentSlug} />
            {:else if panel.id === 'contents'}
              <SidebarContents {toc} isActive={activePanel === 'contents'} />
            {/if}
          </SidebarPanel>
        {/each}
      </div>
    </div>

    <!-- Quick navigation bar -->
    <SidebarQuick {navigation} isVisible={isAffix || $sidebarOpen} />
  </div>
</aside>

<!-- Mobile dimmer -->
<div class='dimmer' class:active={$sidebarOpen}></div>

<style>
  /* Sidebar container */
  #sidebar {
    position: static;
    overflow: scroll;
    width: 100%;
    top: 0;
    bottom: 0;
    transition: all 0.3s ease;
  }

  #sidebar::-webkit-scrollbar {
    display: none;
  }

  #sidebar {
    scrollbar-width: none;
  }

  /* Tablet/Mobile styles */
  @media (max-width: 1023px) {
    #sidebar {
      display: none;
      position: fixed;
      right: 0;
      background: var(--grey-1);
      box-shadow: 0 0.375rem 0.9375rem 0.3125rem rgba(0, 0, 0, 0.2);
      z-index: 100;
      width: 280px;
      height: 100%;
    }

    #sidebar.on {
      display: block;
    }
  }

  /* Affix styles */
  #sidebar.affix > .inner {
    position: fixed;
    width: 240px;
    top: 0;
  }

  #sidebar.affix .panels {
    padding-top: 3.625rem;
    height: 100vh;
  }

  /* Sidebar inner */
  #sidebar > .inner {
    position: relative;
    width: 100%;
    color: var(--grey-6);
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    z-index: 1;
  }

  /* Panels */
  .panels {
    padding: 4.6875rem 0 2rem;
    width: 100%;
    overflow: hidden;
    min-height: 100vh;
  }

  .panels > .inner {
    margin-top: 2.5rem;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    width: auto;
    height: 100%;
  }

  @media (max-width: 1023px) {
    .panels > .inner {
      margin-top: 0;
    }
  }

  .panels > .inner::-webkit-scrollbar {
    display: none;
  }

  /* Dimmer overlay for mobile */
  .dimmer {
    display: none;
  }

  @media (max-width: 1023px) {
    .dimmer {
      background: black;
      height: 100%;
      left: 100%;
      opacity: 0;
      top: 0;
      width: 100%;
      z-index: 99;
      transition: opacity 1s;
    }

    .dimmer.active {
      position: fixed;
      display: block;
      opacity: 0.3;
      transform: translateX(-100%);
    }
  }

  /* Dark theme */
  :global([data-theme='dark']) #sidebar {
    background-color: var(--grey-1);
  }

  /* iPad landscape mode */
  @media screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape),
    screen and (min-width: 768px) and (max-width: 1366px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2),
    screen and (min-width: 768px) and (max-width: 1440px) and (-webkit-min-device-pixel-ratio: 1) {
    #sidebar {
      overflow: visible;
    }
  }
</style>
