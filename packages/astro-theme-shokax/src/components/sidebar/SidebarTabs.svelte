<script lang='ts'>
  export let panels: Array<{ id: string, title: string, hasContent: boolean }> = []
  export let activePanel: string = ''
  export let onSelect: (panelId: string) => void = () => {}
</script>

{#if panels.length > 1}
  <ul class='tab'>
    {#each panels as panel (panel.id)}
      <button
        class={`item ${panel.id} ${
          activePanel === panel.id ? 'active' : ''
        }`}
        on:click={() => onSelect(panel.id)}
        type='button'
      >
        <span>{panel.title}</span>
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

  .tab .item {
    cursor: pointer;
    display: inline-flex;
    font-size: 0.875rem;
    padding: 0.3125rem 0.9375rem;
    color: var(--grey-5);
    border-radius: 0.625rem;
    text-align: center;
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.08);
    transition: all 0.2s ease-out;
    border: none;
    cursor: pointer;
  }

  .tab .item:nth-child(2) {
    margin: auto 0.625rem;
  }

  .tab .item span {
    display: none;
    word-break: keep-all;
  }

  .tab .item.active span {
    display: inherit;
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
