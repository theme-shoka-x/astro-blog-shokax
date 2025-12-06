<script lang='ts'>
  import type { SocialLink } from './SidebarTypes'

  export let social: Record<string, string | SocialLink> = {}

  // Helper function to parse old social string format
  const parseSocialString = (str: string) => {
    const parts = str.split('||').map(s => s.trim())
    if (parts.length >= 2) {
      return { url: parts[0], icon: parts[1], color: parts[2] || '' }
    }
    return null
  }
</script>

{#if social && Object.keys(social).length > 0}
  <div class='social'>
    {#each Object.entries(social) as [name, data]}
      {@const link = typeof data === 'string' ? parseSocialString(data) : data}
      {#if link}
        <a
          href={link.url}
          title={link.url}
          class={`item ${name}`}
          target='_blank'
          rel='noopener noreferrer'
          style={link.color ? `--social-color: ${link.color}` : ''}
        >
          <i class={`ic i-${link.icon}`}></i>
        </a>
      {/if}
    {/each}
  </div>
{/if}

<style>
  .social {
    margin-top: 0.9375rem;
    text-align: center;
  }

  .social .item {
    display: inline-block;
    width: 1.875rem;
    height: 1.875rem;
    line-height: 1.875rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    border-radius: 38%;
    text-decoration: none;
  }

  .social .item i {
    font-size: 1.4em;
    vertical-align: middle;
    transform: scale(0.8);
    transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);
  }

  .social .item::before {
    top: 90%;
    left: -110%;
    content: '';
    width: 120%;
    height: 120%;
    position: absolute;
    transform: rotate(45deg);
    background-color: var(--social-color, var(--color-pink));
    transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);
  }

  .social .item:focus::before,
  .social .item:hover::before {
    top: -10%;
    left: -10%;
  }

  .social .item i {
    color: var(--social-color, var(--color-pink));
  }

  .social .item:focus i,
  .social .item:hover i {
    color: var(--grey-0);
    transform: scale(1);
  }
</style>
