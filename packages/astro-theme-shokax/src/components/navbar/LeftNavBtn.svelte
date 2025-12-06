<script lang='ts'>
  import { sidebarOpen, toggleSidebar } from '../../stores/sidebarStore'

  export let clickCallback: (state: boolean) => void = () => {}

  const handleToggle = () => {
    toggleSidebar()
    clickCallback?.($sidebarOpen)
  }
</script>

<button class='border-none bg-transparent flex flex-col cursor-pointer items-center justify-center lg:hidden' on:click={handleToggle} aria-label='Toggle sidebar' type='button'>
  <div class='line-height-0 p-5 w-5.5 box-unset'>
    <div class={`line ${$sidebarOpen ? 'line-1' : ''}`}></div>
    <div class={`line mt-0.75 ${$sidebarOpen ? 'line-2' : ''}`}></div>
    <div class={`line mt-0.75 ${$sidebarOpen ? 'line-3' : ''}`}></div>
  </div>
</button>

<style>
  .line-1 {
    top: 0.3125rem;
    transform: rotate(-45deg);
  }

  .line-2 {
    opacity: 0;
  }

  .line-3 {
    top: -0.3125rem;
    transform: rotate(45deg);
    margin-top: 0.1875rem;
  }

  .line {
    background-color: var(--header-text-color);
    vertical-align: top;
    border-radius: 0.0625rem;
    width: 100%;
    height: 0.125rem;
    transition: all 0.4s;
    display: inline-block;
    position: relative;
    left: 0;
    box-shadow: 0 0 0.5rem #00000080;
  }
</style>
