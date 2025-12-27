<script lang="ts">
  interface PostInfo {
    title: string;
    url: string;
  }

  interface Props {
    name: string;
    url: string;
    cover?: string;
    topCategory?: {
      name: string;
      url: string;
    };
    postCount: number;
    childCount?: number;
    posts: PostInfo[];
    isActive?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }

  const {
    name,
    url,
    cover,
    topCategory,
    postCount,
    childCount = 0,
    posts,
    isActive = false,
    onMouseEnter,
    onMouseLeave,
  }: Props = $props();

  function handleMouseEnter() {
    if (onMouseEnter) {
      onMouseEnter();
    }
  }

  function handleMouseLeave() {
    if (onMouseLeave) {
      onMouseLeave();
    }
  }

  function handleTouchStart() {
    if (onMouseEnter) {
      onMouseEnter();
    }
  }

  const countText = $derived(() => {
    let text = "";
    if (childCount > 0) {
      text += `${childCount} 个子分类 `;
    }
    text += `${postCount} 篇文章`;
    return text;
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
  class="item"
  class:active={isActive}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  ontouchstart={handleTouchStart}
>
  <div class="cover" style={cover ? `background-image: url(${cover})` : ""}>
    <h2 class="title">{name}</h2>
    {#if topCategory}
      <span>{topCategory.name}</span>
    {/if}
  </div>

  <div class="info">
    <div class="ribbon">
      <a href={url} title={name} itemprop="url">
        {name}
      </a>
    </div>

    <div class="inner">
      <ul class="posts">
        {#each posts.slice(0, 6) as post}
          <li>
            <a href={post.url} title={post.title}>
              {post.title}
            </a>
          </li>
        {/each}
      </ul>

      <div class="meta footer">
        {#if topCategory}
          <span>
            <a href={topCategory.url} title={topCategory.name} itemprop="url">
              <i class="i-ri-flag-line"></i>
              {topCategory.name}
            </a>
          </span>
        {/if}
        <span>
          <i class="i-ri-file-line"></i>
          {countText()}
        </span>
      </div>
    </div>

    <a href={url} class="btn" title={name} itemprop="url">more...</a>
  </div>
</section>

<style>
  .item {
    position: relative;
    color: inherit;
    width: calc(50% - 2rem);
    min-width: calc(50% - 2rem);
    height: 14rem;
    margin: 1rem;
    opacity: 0;
    perspective: 62.5rem;
    /* 防止动画导致CLS - 预留空间 */
    will-change: opacity, transform;
    contain-intrinsic-height: 14rem;
  }

  :global(.item.show) {
    animation: slideUpBigIn 0.5s;
    opacity: 1;
    will-change: auto;
  }

  @keyframes slideUpBigIn {
    0% {
      opacity: 0;
      transform: translateY(80px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .cover,
  .info {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    height: 100%;
    width: 100%;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transition: ease-in-out 600ms;
    top: 0;
  }

  .cover {
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(
      to bottom right,
      var(--color-pink),
      var(--color-orange)
    );
    padding: 0.5rem 1rem;
    font-size: 1.125rem;
    color: var(--header-text-color, #fff);
    overflow: hidden;
    transform: rotateY(0deg);
    position: relative;
  }

  .cover::before {
    position: absolute;
    display: block;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(135deg, #434343 0%, black 100%);
    opacity: 0.25;
    z-index: 0;
  }

  .cover .title {
    margin: 0;
    white-space: normal;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .cover span {
    font-size: 0.75rem;
    position: absolute;
    right: 0.9375rem;
    top: 0.625rem;
    padding: 0 0.3125rem;
    border-radius: 0.3125rem;
    box-shadow: 0 0 0.3125rem 0.0625rem rgba(0, 0, 0, 0.6);
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .info {
    background-color: var(--grey-0);
    transform: rotateY(-180deg);
    padding: 1rem 1.5rem 4rem;
    justify-content: space-between;
  }

  .item:nth-child(even) .info {
    transform: rotateY(180deg);
  }

  .item.active .cover {
    transform: rotateY(180deg);
  }

  .item.active .info {
    transform: rotateY(0deg);
    box-shadow: 0 0 2rem var(--box-bg-shadow, rgba(0, 0, 0, 0.15));
  }

  .item:nth-child(even).active .cover {
    transform: rotateY(-180deg);
  }

  .ribbon {
    display: inline-block;
    align-self: flex-start;
    position: relative;
    left: -2.5rem;
    margin-bottom: 0.8rem;
    max-width: calc(100% + 2rem);
    padding: 0 1rem 0 2rem;
    border-radius: 0 0.3rem 0.3rem 0;
    background-image: linear-gradient(
      to right,
      var(--color-orange) 0,
      var(--color-pink) 100%
    );
    color: var(--grey-0);
  }

  .ribbon::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 0;
    height: 0;
    background-color: transparent;
    border-style: solid;
    border-width: 0 1rem 1rem 0;
    border-color: transparent;
    border-right-color: var(--color-orange);
    filter: brightness(0.9);
  }

  .ribbon a {
    display: block;
    margin: 0;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: inherit;
    text-decoration: none;
  }

  .ribbon a:hover {
    color: currentColor;
    animation: shake 1s;
  }

  @keyframes shake {
    from,
    to {
      transform: translate3d(0, 0, 0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translate3d(-10px, 0, 0);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translate3d(10px, 0, 0);
    }
  }

  .inner {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  ul.posts {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: baseline;
    min-height: 5rem;
    overflow: hidden;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  ul.posts li {
    width: 45%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  ul.posts a {
    color: inherit;
    text-decoration: none;
  }

  ul.posts a:hover {
    text-decoration: underline;
  }

  .meta.footer {
    font-size: 0.875rem;
    color: var(--grey-5);
    display: flex;
    gap: 0.5rem;
    position: absolute;
    bottom: 0.5rem;
    max-width: calc(100% - 7rem);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta.footer i {
    margin-right: 0.0625rem;
  }

  .meta.footer a {
    color: inherit;
    text-decoration: none;
  }

  .meta.footer a:hover {
    color: var(--primary-color);
  }

  .btn {
    position: absolute;
    bottom: 0;
    right: 0;
    transform-style: preserve-3d;
    transform: translateZ(2rem);
    backface-visibility: hidden;
    padding: 0.3rem 1rem;
    border-radius: 1rem 0;
    color: var(--grey-0);
    background-image: linear-gradient(
      to right,
      var(--color-pink) 0,
      var(--color-orange) 100%
    );
    text-decoration: none;
    transition: transform 0.3s ease;
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
    .item {
      width: calc(100% - 1rem) !important;
      min-width: calc(100% - 1rem) !important;
      margin: 1rem 0.5rem !important;
    }

    .ribbon {
      left: -2rem;
    }

    .info {
      padding: 1rem 1rem 4rem;
    }
  }
</style>
