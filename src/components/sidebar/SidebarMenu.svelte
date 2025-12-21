<script lang='ts'>
  import type { NavItemType } from '../navbar/NavTypes'

  interface Props {
    menu?: NavItemType[]
  }

  const { menu }: Props = $props()

  const getMenuIcon = (item: any): string => {
    return item?.icon ?? ''
  }

  const renderNavItems = (items: NavItemType[]) => {
    return items.map(item => ({
      data: item,
      isDropdown: item.dropbox && item.dropboxItems && item.dropboxItems.length > 0,
    }))
  }

  const menuItems = $derived(renderNavItems(menu || []))
</script>

<nav class='menu'>
  <ul class='menu-list list-none'>
    {#each menuItems as item (item.data.href)}
      {@const icon = item.data.icon}
      {@const text = item.data.text}
      {@const url = item.data.href}
      {@const dropboxItems = item.data.dropboxItems || []}

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
