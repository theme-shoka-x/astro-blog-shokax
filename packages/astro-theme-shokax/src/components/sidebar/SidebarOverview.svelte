<script lang='ts'>
  import type { NavItemType } from '../navbar/NavTypes'
  import type { SidebarConfig } from './SidebarTypes'
  import SidebarAuthor from './SidebarAuthor.svelte'
  import SidebarMenu from './SidebarMenu.svelte'
  import SidebarSocial from './SidebarSocial.svelte'
  import SidebarState from './SidebarState.svelte'

  export let config: SidebarConfig
  export let menuSource: NavItemType[] | any
</script>

<div class='overview'>
  <SidebarAuthor
    author={config.author || ''}
    avatar={config.avatar || ''}
    description={config.description || ''}
  />

  <SidebarState state={config.state} />

  <SidebarSocial social={config.social || {}} />

  <SidebarMenu menu={menuSource} />
</div>

<style>
  .overview {
    width: 100%;
  }
</style>
