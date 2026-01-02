<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  // @ts-expect-error no types for PagefindUI
  import { PagefindUI } from "@pagefind/default-ui";
  import "@pagefind/default-ui/css/ui.css";

  interface Props {
    selector?: string | HTMLElement;
    showSearch?: boolean;
  }

  let { selector = undefined, showSearch = $bindable(false) }: Props = $props();

  let visible = $state(false);
  let isDark = $state(false);
  let observer: MutationObserver | null = null;
  let cleanupListener: (() => void) | null = null;

  function toggleVisibility() {
    visible = !visible;
  }

  function updateDarkMode() {
    isDark = document.documentElement.getAttribute("data-theme") === "dark";
  }

  onMount(() => {
    // Initialize PagefindUI
    new PagefindUI({ element: "#pagefind", showSubResults: true });

    // Setup dark mode observer
    updateDarkMode();
    observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Setup selector listener
    if (selector) {
      let element: HTMLElement | null = null;

      if (typeof selector === "string") {
        element = document.querySelector(selector);
      } else if (selector instanceof HTMLElement) {
        element = selector;
      }

      if (element) {
        element.addEventListener("click", toggleVisibility);
        cleanupListener = () => {
          element?.removeEventListener("click", toggleVisibility);
        };
      } else {
        console.warn("Invalid selector provided for PagefindSearch component.");
      }
    }
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (cleanupListener) {
      cleanupListener();
      cleanupListener = null;
    }
  });

  // Watch showSearch prop when no selector is provided
  $effect(() => {
    if (!selector && showSearch !== undefined) {
      visible = showSearch;
    }
  });
</script>

<div
  class="pagefind fixed top-12 z-999 m-12 max-h-80% max-w-100vw min-h-70% w-[calc(100vw_-_7rem)]
  overflow-x-hidden overflow-y-scroll rounded-lg p-2
  bg-gradient-to-b from-black/50 to-black/60
  backdrop-blur-2xl slide-down"
  class:dark={isDark}
  class:pagefind-hidden={!visible}
>
  <div id="pagefind"></div>
  <div
    class="i-ri-close-line absolute bottom-4 right-4 cursor-pointer text-8"
    onclick={() => (visible = false)}
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === "Enter" && (visible = false)}
  ></div>
</div>

<style>
  :global(.pagefind-ui__results-area),
  :global(.pagefind-ui__result-link),
  :global(.pagefind-ui__result-excerpt),
  :global(.pagefind-ui__message) {
    color: var(--grey-9) !important;
  }

  .pagefind {
    scrollbar-width: thin;
    scrollbar-color: var(--grey-5) transparent;
    border: 1px solid var(--grey-2);
  }

  .pagefind-hidden {
    opacity: 0 !important;
    pointer-events: none;
    transform: translateY(-100%);
  }

  .slide-down {
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }

  @keyframes slide-down-enter {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 0.9;
    }
  }
</style>
