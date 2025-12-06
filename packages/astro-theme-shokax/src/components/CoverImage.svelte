<script lang='ts'>
  import { onMount } from 'svelte'

  interface Props {
    src: string
    alt: string
    index: number
    isListItem?: boolean
  }

  const { src, alt, index, isListItem = false }: Props = $props()

  let stopAnimation = $state(false)
  let mounted = $state(false)

  onMount(() => {
    mounted = true
  })

  // 计算动画延迟（仅在多图轮播模式下）
  const animationDelay = $derived(isListItem ? `${index * 6}s` : '0s')
</script>

{#if mounted}
  {#if isListItem}
    <!-- 多图轮播模式 -->
    <li
      class='cover-item opacity-0 h-full w-full left-0 top-0 absolute z-0 bg-cover bg-center bg-no-repeat'
      class:stop-animation={stopAnimation}
      style="background-image: url('{src}'); animation-delay: {animationDelay};"
      onmouseenter={() => (stopAnimation = true)}
      onmouseleave={() => (stopAnimation = false)}
      ontouchstart={() => (stopAnimation = true)}
      ontouchend={() => (stopAnimation = false)}
    ></li>
  {:else}
    <!-- 单图模式 -->
    <img
      {src}
      {alt}
      loading='eager'
      decoding='async'
      fetchpriority='high'
      class='h-full w-full left-0 top-0 absolute object-cover'
    />
  {/if}
{/if}

<style>
  .cover-item {
    animation: imageAnimation 36s linear infinite 0s;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  .cover-item.stop-animation {
    animation-play-state: paused;
  }

  @keyframes imageAnimation {
    0% {
      opacity: 0;
      animation-timing-function: ease-in;
    }
    2% {
      opacity: 1;
    }
    8% {
      opacity: 1;
      transform: scale(1.05);
      animation-timing-function: ease-out;
    }
    17% {
      opacity: 1;
      transform: scale(1.1);
    }
    25% {
      opacity: 0;
      transform: scale(1.1);
    }
    100% {
      opacity: 0;
    }
  }
</style>
