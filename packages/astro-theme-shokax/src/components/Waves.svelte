<script lang='ts'>
  import { onMount } from 'svelte'

  let parallaxOffset = $state(0)

  onMount(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined')
      return

    const handleScroll = () => {
      parallaxOffset = window.scrollY * 0.5
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  })
</script>

<div class='waves-container bg-[var(--nav-bg)] h-15.625rem min-h-6.25rem w-full relative overflow-hidden -mt-1px md:h-6.25rem md:min-h-3.125rem'>
  <svg
    class='waves-svg bg-[var(--nav-bg)] h-full min-h-100px w-full block relative'
    xmlns='http://www.w3.org/2000/svg'
    xmlns:xlink='http://www.w3.org/1999/xlink'
    viewBox='0 24 150 28'
    preserveAspectRatio='none'
    shape-rendering='auto'
  >
    <defs>
      <path
        id='gentle-wave'
        d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
      />
    </defs>
    <g class='parallax' style='transform: translateY({parallaxOffset}px)'>
      <use xlink:href='#gentle-wave' x='48' y='0' class='wave-1' />
      <use xlink:href='#gentle-wave' x='48' y='3' class='wave-2' />
      <use xlink:href='#gentle-wave' x='48' y='5' class='wave-3' />
      <use xlink:href='#gentle-wave' x='48' y='7' class='wave-4' />
    </g>
  </svg>
</div>

<style>
  :global(.waves-svg use) {
    animation: wave 15s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  }

  :global(.waves-svg use.wave-1) {
    animation-delay: -2s;
    animation-direction: reverse;
    opacity: 1;
  }

  :global(.waves-svg use.wave-2) {
    animation-delay: -3s;
    animation-direction: reverse;
    opacity: 0.5;
  }

  :global(.waves-svg use.wave-3) {
    animation-delay: -4s;
    animation-direction: reverse;
    opacity: 0.33;
  }

  :global(.waves-svg use.wave-4) {
    animation-delay: -5s;
    animation-direction: reverse;
    opacity: 0.25;
  }

  @keyframes wave {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(50px);
    }
  }
</style>
