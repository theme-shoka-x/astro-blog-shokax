<script lang='ts'>
  import type { PanelConfig } from './SidebarTypes'

  interface Props {
    panels?: PanelConfig[]
    activePanel?: string
    onSelect?: (panelId: string) => void
  }

  const { panels = [], activePanel = '', onSelect = () => {} }: Props = $props()
</script>

{#if panels.length > 1}
  <ul class='tab'>
    {#each panels as panel (panel.id)}
      {@const iconClass = panel.id === 'contents'
        ? 'i-ri-list-ordered'
        : panel.id === 'related'
        ? 'i-ri-git-branch-line'
        : panel.id === 'overview' ? 'i-ri-home-2-line' : ''}
      <button
        class={`item ${panel.id} ${
          activePanel === panel.id ? 'active' : ''
        }`}
        onclick={() => onSelect(panel.id)}
        type='button'
      >
        {#if iconClass}
          <div class={`${iconClass}`}></div>
        {/if}
        {#if activePanel === panel.id}
          <span>{panel.title}</span>
        {/if}
      </button>
    {/each}
  </ul>
{/if}

<style>
  .tab {
    position: absolute;
    display: inline-flex;
    padding: 1.875rem 0 0.625rem;
    margin: 0;
    min-height: 1.875rem;
    list-style: none;
  }

  :global(#sidebar.affix) .tab {
    padding-top: 0.625rem;
  }

  .tab .item {
    cursor: pointer;
    display: inline-flex;
    font-size: 0.8125rem;
    padding: 0.3125rem 0.9375rem;
    color: var(--grey-5);
    border-radius: 0.625rem;
    text-align: center;
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.08);
    transition: all 0.2s ease-out;
    border: none;
    flex-wrap: wrap;
    align-items: center;
  }

  .tab .item:nth-child(2) {
    margin: auto 0.625rem;
  }

  .tab .item i {
    font-size: 1rem;
  }

  .tab .item span {
    margin-left: 0.3125rem;
    word-break: keep-all;
  }

  .tab .item:hover,
  .tab .item.active {
    background: linear-gradient(to right, var(--color-pink), var(--color-orange));
    color: var(--grey-0);
    box-shadow: 0 0.25rem 0.625rem var(--color-pink-a3);
  }

  .tab .item.active:hover {
    box-shadow: 0 0 0.75rem var(--color-pink);
  }
</style>
