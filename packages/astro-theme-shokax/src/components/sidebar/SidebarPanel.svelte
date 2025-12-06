<script lang='ts'>
  export let id: string = ''
  export let title: string = ''
  export let isActive: boolean = false
  let className: string = ''

  export { className as class }
</script>

<div
  class={`panel ${id} ${isActive ? 'active' : ''} ${className}`}
  data-title={title}
>
  <slot />
</div>

<style>
  .panel {
    display: none;
    padding: 0.875rem 0.9375rem 2rem;
    animation: slideIn 0.3s ease-in-out;
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
