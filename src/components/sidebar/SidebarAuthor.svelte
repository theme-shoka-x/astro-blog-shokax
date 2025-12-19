<script lang='ts'>
  interface Props {
    author?: string
    avatar?: string
    description?: string
  }

  const { author = '', avatar = '', description = '' }: Props = $props()
</script>

{#if author || avatar}
  <div class='author' itemscope itemtype='http://schema.org/Person'>
    {#if avatar}
      <img
        class='image'
        src={avatar}
        alt={author || 'Author'}
        itemprop='image'
        loading='lazy'
        decoding='async'
        fetchpriority='high'
      />
    {/if}
    {#if author}
      <p class='name' itemprop='name'>{author}</p>
    {/if}
    {#if description}
      <div class='description' itemprop='description'>{description}</div>
    {/if}
  </div>
{/if}

<style>
  .author .image {
    border: 0.0625rem solid var(--body-bg-shadow);
    display: block;
    margin: 0 auto;
    max-width: 10rem;
    padding: 0.125rem;
    box-shadow: 0 0 1rem 0.625rem var(--body-bg-shadow);
    border-radius: 50%;
    transition: transform 0.3s ease;
  }

  .author:hover .image {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  @keyframes shake {
    0% {
      transform: scale(1);
    }
    10%,
    20% {
      transform: scale(0.9) rotate(3deg);
    }
    30%,
    50%,
    70%,
    90% {
      transform: scale(1.1) rotate(-3deg);
    }
    40%,
    60%,
    80% {
      transform: scale(1.1) rotate(3deg);
    }
    100% {
      transform: scale(1);
    }
  }

  .author .name {
    color: var(--grey-7);
    font-weight: normal;
    margin: 0.3125rem 0 0;
    text-align: center;
  }

  .author .description {
    color: var(--grey-5);
    font-size: 0.875rem;
    margin-top: 0.3125rem;
    text-align: center;
  }
</style>
