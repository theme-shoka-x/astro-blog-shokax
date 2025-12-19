<script lang='ts'>
  import type { NavItemType } from './NavTypes'
  import NavLinkItem from './NavLinkItem.svelte'

  interface Props {
    navLinks?: NavItemType[]
    class?: string
    [key: string]: any
  }

  const {
    navLinks = [],
    class: className = '',
    ...restProps
  }: Props = $props()

  const mergedClass = $derived([className].filter(Boolean).join(' '))
</script>

<ul
  class={`box-shadow mt-2 p-0 rounded-br-2.5 rounded-tl-2.5 bg-[var(--grey-1)] w-max absolute first:rounded-tl-2.5 ${mergedClass}`.trim()}
  {...restProps}
>
  {#each navLinks as { href, text, icon }}
    <div class='color-btn first:rounded-tl-2.5 last:rounded-br-2.5'>
      <NavLinkItem
        href={href}
        text={text}
        icon={icon}
        class='ml-1 mr-1 block transition-300 transition-all transition-ease-in-out hover:translate-x-1.5'
      />
    </div>
  {/each}
</ul>

<style>
  .box-shadow {
    box-shadow: 0 0.3125rem 1.25rem -0.25rem var(--grey-9-a1);
  }

  .color-btn:hover {
    z-index: 0;
    color: var(--grey-0);
    background-image: linear-gradient(to right, var(--color-pink) 0, var(--color-orange) 100%);
    box-shadow: 0 0 0.75rem var(--color-pink-a3);
  }
</style>
