<script lang='ts'>
  import { onMount } from 'svelte'

  let {
    title = '',
    subtitle = '',
    logo = '',
  } = $props()

  let isAffix = $state(false)

  onMount(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined')
      return

    const handleScroll = () => {
      // 当页面向下滚动时，添加 affix 类
      isAffix = window.scrollY > 0
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  })
</script>

<div
  id='brand'
  class={`fixed w-full px-20 pt-12 text-center h-[50vh] min-h-40 flex flex-col items-center justify-center ${isAffix ? 'affix' : ''}`.trim()}
>
  <div class='pjax flex flex-col w-full items-center justify-center'>
    {#if logo}
      <div class='artboard text-6xl leading-1.2 font-bold mb-2.5'>
        {logo}
      </div>
    {/if}

    {#if title}
      <h1 class='letter-space-2 text-5xl leading-tight tracking-wider font-600'>
        {title}
      </h1>
    {/if}

    {#if subtitle}
      <p class='text-2xl m-0 mt-2.5 flex gap-2.5'>
        <span class='flex items-center'>=</span>
        <span>{subtitle}</span>
        <span class='flex items-center'>=</span>
      </p>
    {/if}
  </div>
</div>

<style>
  #brand {
    z-index: 0;
    transition: all 0.3s ease;
  }

  #brand.affix {
    z-index: 1;
  }

  .pjax {
    animation: slideDownIn 0.6s ease-out;
  }

  @keyframes slideDownIn {
    from {
      opacity: 0;
      transform: translateY(-2rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    #brand {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-top: 3rem;
    }

    :global(h1) {
      font-size: 1.875rem;
    }
  }

  @media (max-width: 480px) {
    #brand .artboard {
      font-size: 2rem;
    }
  }
</style>
