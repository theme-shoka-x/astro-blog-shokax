<script lang="ts">
  import PostMeta from "./PostMeta.svelte";

  interface Props {
    title: string;
    url: string;
    date: Date;
    excerpt: string;
    cover?: string;
    category?: string;
    categoryUrl?: string;
    isEven?: boolean;
    lazy?: boolean;
    wordCount?: number;
    readTime?: number;
  }

  const {
    title,
    url,
    date,
    excerpt,
    cover,
    category,
    categoryUrl,
    isEven = false,
    lazy = true,
    wordCount,
    readTime,
  }: Props = $props();
</script>

<article class="segment-item" class:even={isEven}>
  <div class="cover">
    {#if cover}
      <a href={url} {title}>
        <img
          src={cover}
          alt={title}
          loading={lazy ? "lazy" : "eager"}
          decoding="async"
        />
      </a>
    {:else}
      <a href={url} {title}>
        <div class="cover-placeholder"></div>
      </a>
    {/if}
  </div>

  <div class="info">
    <PostMeta {date} {wordCount} {readTime} />

    <h3>
      <a href={url} {title}>{title}</a>
    </h3>

    <div class="excerpt">
      {excerpt}
    </div>

    {#if category}
      <div class="meta-footer">
        <span class="category-tag">
          {#if categoryUrl}
            <a href={categoryUrl} title={category}>
              <i class="i-ri-flag-line"></i>
              {category}
            </a>
          {:else}
            <i class="i-ri-flag-line"></i>
            {category}
          {/if}
        </span>
      </div>
    {/if}

    <a href={url} class="btn" {title}>more...</a>
  </div>
</article>

<style>
  .segment-item {
    position: relative;
    display: flex;
    width: calc(100% - 2rem);
    min-width: calc(100% - 2rem);
    height: 14rem;
    margin: 1rem;
    border-radius: 0.625rem;
    background: var(--grey-0);
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
    transition:
      box-shadow 0.3s ease,
      transform 0.3s ease;
    overflow: visible;
  }

  .segment-item:hover {
    box-shadow: 0 0 2rem var(--box-bg-shadow, rgba(0, 0, 0, 0.15));
  }

  .segment-item:hover .cover img {
    transform: scale(1.05) rotate(1deg);
  }

  .segment-item.even {
    flex-direction: row-reverse;
  }

  .segment-item.even:hover .cover img {
    transform: scale(1.05) rotate(-1deg);
  }

  .segment-item.even .cover {
    margin-right: 0;
    margin-left: 1.5rem;
    clip-path: polygon(0 0%, 100% 0%, 100% 100%, 8% 100%);
    border-radius: 0 0.625rem 0.625rem 0;
  }

  .segment-item.even .info {
    padding: 1rem 0 3rem 1.5rem;
  }

  .segment-item.even .btn {
    left: 0;
    right: auto;
    border-radius: 0 1rem;
    background-image: linear-gradient(
      to right,
      var(--color-orange) 0,
      var(--color-pink) 100%
    );
  }

  .segment-item.even .meta-footer {
    right: 0.5rem;
    left: auto;
  }

  .cover {
    width: 50%;
    margin-right: 1.5rem;
    clip-path: polygon(0 0, 92% 0%, 100% 100%, 0% 100%);
    border-radius: 0.625rem 0 0 0.625rem;
    overflow: hidden;
    flex-shrink: 0;
    aspect-ratio: 16 / 9;
  }

  .cover a {
    display: block;
    width: 100%;
    height: 100%;
  }

  .cover img,
  .cover-placeholder {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .cover img {
    content-visibility: auto;
  }

  .cover-placeholder {
    background: linear-gradient(135deg, var(--grey-2) 0%, var(--grey-3) 100%);
  }

  .info {
    position: relative;
    width: 50%;
    padding: 1rem 1.5rem 3rem 0;
    display: flex;
    flex-direction: column;
    perspective: 62.5rem;
  }

  .info :global(.post-meta) {
    display: flex;
    justify-content: flex-end;
    margin: 0 0 0.5rem 0;
  }

  h3 {
    margin: 0.625rem 0;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
    color: var(--primary-color, var(--color-pink));
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  h3 a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  h3 a:hover {
    color: var(--color-orange);
  }

  .excerpt {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--grey-6);
    overflow: hidden;
    max-height: 5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    text-overflow: ellipsis;
    flex-grow: 1;
  }

  .meta-footer {
    position: absolute;
    bottom: 0.5rem;
    left: 0;
    max-width: calc(100% - 7rem);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.875rem;
    color: var(--grey-5);
  }

  .category-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .category-tag a {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .category-tag a:hover {
    color: var(--color-pink);
  }

  .category-tag i {
    font-size: 0.875rem;
  }

  .btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.3rem 1rem;
    border-radius: 1rem 0;
    color: var(--grey-0);
    background-image: linear-gradient(
      to right,
      var(--color-pink) 0,
      var(--color-orange) 100%
    );
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transform-style: preserve-3d;
    transform: translateZ(2rem);
    backface-visibility: hidden;
    transition: transform 0.3s ease;
    z-index: 2;
  }

  .btn::before {
    position: absolute;
    display: block;
    content: "";
    height: calc(100% - 1rem);
    width: calc(100% - 1rem);
    transform-style: preserve-3d;
    transform: translateZ(-2rem);
    backface-visibility: hidden;
    border-radius: 5rem;
    left: 0.5rem;
    top: 0.8rem;
    box-shadow: 0 0 0.6rem 0.6rem var(--color-pink-a3, rgba(255, 105, 180, 0.3));
    background-color: var(--color-pink-a3, rgba(255, 105, 180, 0.3));
    transition: transform 0.3s ease;
  }

  .btn:hover {
    transform: translateZ(2.5rem);
  }

  .btn:hover::before {
    transform: translateZ(-2.5rem);
  }

  @media (max-width: 820px) {
    .segment-item,
    .segment-item.even {
      flex-direction: column;
      height: fit-content;
      max-height: fit-content;
      width: calc(100% - 1rem);
      min-width: calc(100% - 1rem);
      margin: 1rem 0.5rem;
    }

    .cover,
    .segment-item.even .cover {
      width: 100%;
      height: 14rem;
      margin: 0;
      clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
      border-radius: 0.625rem 0.625rem 0 0;
    }

    .info,
    .segment-item.even .info {
      width: 100%;
      height: auto;
      padding: 0 1rem 3rem;
    }

    .meta-footer,
    .segment-item.even .meta-footer {
      left: 1rem;
      right: auto;
      max-width: calc(100% - 8rem);
    }

    .btn,
    .segment-item.even .btn {
      right: 0;
      left: auto;
      border-radius: 1rem 0;
      background-image: linear-gradient(
        to right,
        var(--color-pink) 0,
        var(--color-orange) 100%
      );
    }
  }
</style>
