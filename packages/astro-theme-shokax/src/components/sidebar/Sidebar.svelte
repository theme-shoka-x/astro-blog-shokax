<script lang='ts'>
  import type { NavItemType } from '../navbar/NavTypes'
  import type { SidebarConfig } from './SidebarTypes'
  import { onMount } from 'svelte'
  import { sidebarOpen } from '../../stores/sidebarStore'
  import { initMenuActive, initSidebarTabs, initSidebarTOC } from './sidebarHelpers'
  import SidebarOverlay from './SidebarOverlay.svelte'
  import SidebarOverview from './SidebarOverview.svelte'
  import SidebarPanel from './SidebarPanel.svelte'
  import SidebarTabs from './SidebarTabs.svelte'

  export let config: SidebarConfig = {
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
  }

  // Optional: Accept nav links to use as menu
  export let navLinks: NavItemType[] = []

  let panels: Array<{ id: string, title: string, hasContent: boolean }> = []
  let activePanel: string = 'overview'
  let sidebarElement: HTMLElement | null = null

  // Determine menu source: use config.menu if provided, otherwise use navLinks
  $: menuSource = config.menu !== undefined ? config.menu : navLinks

  onMount(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined')
      return

    // Initialize panels based on content availability
    const contentsPanel = document.querySelector('.sidebar-contents')
    const relatedPanel = document.querySelector('.sidebar-related')
    const overviewPanel = document.querySelector('.sidebar-overview')

    panels = [
      {
        id: 'overview',
        title: 'Overview',
        hasContent: overviewPanel ? overviewPanel.innerHTML.trim().length > 0 : true,
      },
      {
        id: 'related',
        title: 'Related',
        hasContent: relatedPanel ? relatedPanel.innerHTML.trim().length > 0 : false,
      },
      {
        id: 'contents',
        title: 'Contents',
        hasContent: contentsPanel ? contentsPanel.innerHTML.trim().length > 0 : false,
      },
    ].filter(p => p.hasContent)

    if (panels.length > 0) {
      activePanel = panels[0].id
    }

    // Initialize sidebar features
    if (sidebarElement) {
      initSidebarTabs(sidebarElement)
      initSidebarTOC(sidebarElement)
      initMenuActive()
    }
  })

  const selectPanel = (panelId: string) => {
    activePanel = panelId
  }

</script>

<!-- Mobile overlay backdrop -->
{#if $sidebarOpen}
  <SidebarOverlay />
{/if}

<aside
  bind:this={sidebarElement}
  id='sidebar'
  class={`sidebar ${
    $sidebarOpen ? 'sidebar-open' : 'sidebar-closed'
  }`}
>
  <div class='inner'>
    <div class='panels-wrapper'>
      <SidebarTabs {panels} {activePanel} onSelect={selectPanel} />

      <!-- Panels Container -->
      <div class='panels'>
        <div class='panels-inner'>
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
                <div class='sidebar-related'></div>
              {:else if panel.id === 'contents'}
                <div class='sidebar-contents contents'></div>
              {/if}
            </SidebarPanel>
          {/each}
        </div>
      </div>
    </div>
  </div>
</aside>

<style>
  /* Sidebar container */
  #sidebar {
    position: fixed;
    right: 0;
    top: 3.125rem;
    bottom: 0;
    z-index: 8;
    width: 300px;
    max-width: 85vw;
    height: calc(100vh - 3.125rem);
    overflow-y: auto;
    background: var(--grey-0);
    box-shadow: -0.25rem 0 1rem rgba(0, 0, 0, 0.3);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Mobile closed state */
  .sidebar-closed {
    transform: translateX(100%);
  }

  /* Mobile open state */
  .sidebar-open {
    transform: translateX(0);
  }

  @media (min-width: 1024px) {
    #sidebar {
      position: static;
      width: 280px;
      max-width: none;
      height: auto;
      overflow: scroll;
      box-shadow: none;
      transform: none !important;
    }

    .sidebar-closed,
    .sidebar-open {
      transform: none !important;
    }
  }

  .sidebar {
    position: static;
    overflow: scroll;
    width: 280px;
    scrollbar-width: none;
  }

  .sidebar::-webkit-scrollbar {
    display: none;
  }

  .sidebar .inner {
    position: relative;
    width: 280px;
    color: var(--grey-6);
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    z-index: 1;
  }

  .panels-wrapper {
    width: 100%;
  }

  .panels {
    padding: 4.6875rem 0 2rem;
    width: 100%;
    overflow: hidden;
    min-height: 100vh;
  }

  .panels-inner {
    margin-top: 2.5rem;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    width: auto;
    height: 100%;
  }

  .panels-inner::-webkit-scrollbar {
    display: none;
  }

  :global([data-theme='dark']) .sidebar {
    background-color: var(--grey-1);
  }
</style>
