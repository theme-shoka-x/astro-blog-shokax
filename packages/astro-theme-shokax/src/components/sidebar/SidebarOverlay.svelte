<script lang='ts'>
  import { toggleSidebar } from '../../stores/sidebarStore'
</script>

<div
  class='sidebar-overlay'
  on:click={toggleSidebar}
  role='button'
  tabindex='0'
  on:keydown={(e) => {
    if (e.key === 'Enter' || e.key === ' ')
      toggleSidebar()
  }}
  aria-label='Close sidebar'
></div>

<style>
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 7;
    animation: fadeIn 0.3s ease;
    cursor: pointer;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (min-width: 1024px) {
    .sidebar-overlay {
      display: none;
    }
  }
</style>
