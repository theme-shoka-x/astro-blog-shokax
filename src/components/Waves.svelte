<script lang="ts">
  import { onMount } from "svelte";

  let wavesElement: SVGSVGElement | null = null;
  let isVisible = true;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      {
        threshold: 0.1,
      },
    );

    if (wavesElement) {
      observer.observe(wavesElement);
    }

    return () => {
      if (wavesElement) {
        observer.unobserve(wavesElement);
      }
    };
  });
</script>

<svg
  bind:this={wavesElement}
  class="waves mb-[-0.6875rem] h-15vh max-h-[9.375rem] min-h-[3.125rem] w-full relative md:h-10vh"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 24 150 28"
  preserveAspectRatio="none"
  shape-rendering="auto"
>
  <defs>
    <path
      id="gentle-wave"
      d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
    />
  </defs>
  <g class="parallax" class:paused={!isVisible}>
    <use xlink:href="#gentle-wave" x="48" y="0" />
    <use xlink:href="#gentle-wave" x="48" y="3" />
    <use xlink:href="#gentle-wave" x="48" y="5" />
    <use xlink:href="#gentle-wave" x="48" y="7" />
  </g>
</svg>

<style>
  .waves {
    content-visibility: auto;
    contain-intrinsic-size: 100vw 15vh;
  }

  @media (max-width: 768px) {
    .waves {
      contain-intrinsic-size: 100vw 10vh;
    }
  }

  /* Animation */
  .parallax > :global(use) {
    animation: wave 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  }

  /* 当不在视口内时暂停动画 */
  .parallax.paused > :global(use) {
    animation-play-state: paused;
  }

  .parallax > :global(use):nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
    fill: var(--grey-1-a7);
  }

  .parallax > :global(use):nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
    fill: var(--grey-1-a5);
  }

  .parallax > :global(use):nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
    fill: var(--grey-1-a3);
  }

  .parallax > :global(use):nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
    fill: var(--grey-1);
  }

  @keyframes wave {
    0% {
      transform: translate3d(-90px, 0, 0);
    }
    100% {
      transform: translate3d(85px, 0, 0);
    }
  }
</style>
