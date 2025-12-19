<script lang='ts'>
  import type { NavItemType } from '../navbar/NavTypes'
  import type { MenuConfig } from './SidebarTypes'

  interface Props {
    menu?: NavItemType[] | MenuConfig
  }

  const { menu }: Props = $props()

  // Map old iconfont icons to remixicon equivalents
  const iconMap: Record<string, string> = {

  }

  const getMenuUrl = (item: any): string => {
    if (typeof item === 'string') {
      return item.split('||')[0]?.trim() || '/'
    }
    return (item?.href || item?.url || '/')
  }

  const getMenuIcon = (item: any): string => {
    if (typeof item === 'string') {
      const iconName = item.split('||')[1]?.trim() || ''
      return iconMap[iconName] || iconName || ''
    }
    if (item?.icon) {
      return item.icon
    }
    return ''
  }

  const getMenuText = (item: any, fallback: string = ''): string => {
    if (typeof item === 'string') {
      const name = item.split('||')[0]?.trim() || ''
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
    return item?.text || fallback.charAt(0).toUpperCase() + fallback.slice(1)
  }

  const renderNavItems = (items: NavItemType[]) => {
    return items.map(item => ({
      type: 'nav' as const,
      data: item,
      isDropdown: item.dropbox && item.dropboxItems && item.dropboxItems.length > 0,
    }))
  }

  const renderConfigItems = (config: MenuConfig) => {
    return Object.entries(config).map(([key, value]) => {
      const isDropdown = value && typeof value === 'object' && !('href' in value) && !('url' in value)
      return {
        type: 'config' as const,
        key,
        data: value,
        isDropdown,
      }
    })
  }

  const getDropboxItems = (item: any): NavItemType[] => {
    if (item?.dropboxItems) {
      return item.dropboxItems
    }
    if (typeof item === 'object' && item !== null) {
      return Object.entries(item)
        .filter(([key]) => key !== 'default' && key !== 'url' && key !== 'icon')
        .map(([key, value]: [string, any]) => ({
          href: getMenuUrl(value),
          text: key.charAt(0).toUpperCase() + key.slice(1),
          icon: getMenuIcon(value),
        }))
    }
    return []
  }

  const menuItems = $derived(Array.isArray(menu) ? renderNavItems(menu) : (menu ? renderConfigItems(menu) : []))
</script>

<nav class='menu'>
  <ul class='menu-list list-none'>
    {#each menuItems as item (item.type === 'nav' ? item.data.href : item.key)}
      {#if item.type === 'nav'}
        {@const navItem = item.data}
        {@const icon = getMenuIcon(navItem)}
        {@const text = navItem.text}
        {@const url = navItem.href}
        {@const dropboxItems = navItem.dropboxItems || []}

        {#if item.isDropdown && dropboxItems.length > 0}
          <li class='item dropdown'>
            <a href={url} rel='section'>
              {#if icon}
                <div class={`ic ${icon}`}></div>
              {/if}
              {text}
            </a>
            <ul class='submenu'>
              {#each dropboxItems as subItem (subItem.href)}
                <li class='item'>
                  <a href={subItem.href} rel='section'>
                    {#if subItem.icon}
                      <div class={`ic ${getMenuIcon(subItem)}`}></div>
                    {/if}
                    {subItem.text}
                  </a>
                </li>
              {/each}
            </ul>
          </li>
        {:else}
          <li class='item'>
            <a href={url} rel='section'>
              {#if icon}
                <div class={`ic ${icon}`}></div>
              {/if}
              {text}
            </a>
          </li>
        {/if}
      {:else}
        {@const configData = item.data}
        {@const icon = getMenuIcon(configData)}
        {@const text = getMenuText(configData, item.key)}
        {@const url = getMenuUrl(configData)}
        {@const dropboxItems = getDropboxItems(configData)}

        {#if item.isDropdown && dropboxItems.length > 0}
          <li class='item dropdown'>
            <a href={url === '/' ? '#' : url} rel='section' onclick={(e) => {
              if (url === '/')
                e.preventDefault()
            }}>
              {#if icon}
                <div class={`ic ${icon}`}></div>
              {/if}
              {text}
            </a>
            <ul class='submenu'>
              {#each dropboxItems as subItem (subItem.href)}
                <li class='item'>
                  <a href={subItem.href} rel='section'>
                    {#if subItem.icon}
                      <div class={`ic ${getMenuIcon(subItem)}`}></div>
                    {/if}
                    {subItem.text}
                  </a>
                </li>
              {/each}
            </ul>
          </li>
        {:else}
          <li class='item'>
            <a href={url} rel='section'>
              {#if icon}
                <div class={`ic ${icon}`}></div>
              {/if}
              {text}
            </a>
          </li>
        {/if}
      {/if}
    {/each}
  </ul>
</nav>

<style>
  .ic {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    flex-wrap: wrap;
    vertical-align: text-bottom;
  }

  .menu {
    padding: 1.25rem;
    margin: 0;
    background-color: transparent;
  }

  .menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .menu .item {
    border-radius: 0.9375rem;
    margin-bottom: 0.625rem;
    display: block;
    color: var(--grey-5);
    transition: all 0.2s ease-in-out;
    list-style: none;
  }

  .menu .item a {
    color: inherit;
    display: block;
    line-height: 3;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
  }

  .menu .item .submenu {
    display: none;
    padding: 0;
    list-style: none;
    animation: slideDown 0.3s ease-in-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .menu .item:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: inherit;
  }

  .menu .item:hover .submenu {
    display: block;
  }

  .menu .item div {
    margin-right: 0.625rem;
  }

  .menu .item.active {
    background: linear-gradient(to right, var(--color-pink), var(--color-orange));
    color: var(--grey-0);
    box-shadow: 0 0.25rem 0.625rem var(--color-pink-a3);
  }

  .menu .item.active:hover {
    box-shadow: 0 0 0.75rem var(--color-pink);
    color: var(--grey-0);
  }
</style>
