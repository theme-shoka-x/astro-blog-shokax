<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    id?: string;
    title?: string;
    isActive?: boolean;
    class?: string;
    children?: Snippet;
  }

  const {
    id = "",
    title = "",
    isActive = false,
    class: className = "",
    children,
  }: Props = $props();
</script>

<div
  class={`panel ${id} ${isActive ? "active" : ""} ${className}`}
  data-title={title}
>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .panel {
    display: none;
    padding: 0.875rem 0.9375rem 2rem;
    animation: slideIn 0.3s ease-in-out;
    content-visibility: auto;
  }

  .panel.active {
    display: block;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
