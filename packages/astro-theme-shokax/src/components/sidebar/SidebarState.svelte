<script lang='ts'>
  import type { StateConfig } from './SidebarTypes'

  export let state: StateConfig | undefined
</script>

{#if state && (state.posts || state.categories || state.tags)}
  <nav class='state'>
    {#if state.posts && state.posts > 0}
      <div class='item posts'>
        <a href={state.archiveUrl || '/archives/'}>
          <span class='count'>{state.posts}</span>
          <span class='name'>Posts</span>
        </a>
      </div>
    {/if}
    {#if state.categories && state.categories > 0}
      <div class='item categories'>
        <a href={state.categoryUrl || '/categories/'}>
          <span class='count'>{state.categories}</span>
          <span class='name'>Categories</span>
        </a>
      </div>
    {/if}
    {#if state.tags && state.tags > 0}
      <div class='item tags'>
        <a href={state.tagUrl || '/tags/'}>
          <span class='count'>{state.tags}</span>
          <span class='name'>Tags</span>
        </a>
      </div>
    {/if}
  </nav>
{/if}

<style>
  .state {
    display: flex;
    justify-content: center;
    line-height: 1.4;
    margin-top: 0.625rem;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
  }

  .state .item {
    padding: 0 0.9375rem;
  }

  .state .item:not(:first-child) {
    border-left: 0.0625rem solid var(--grey-4);
  }

  .state .item a {
    border-bottom: none;
    text-decoration: none;
    color: inherit;
  }

  .state .item .count {
    display: block;
    font-size: 1.125rem;
    font-weight: 600;
    text-align: center;
  }

  .state .item .name {
    color: inherit;
    font-size: 0.8125rem;
  }
</style>
