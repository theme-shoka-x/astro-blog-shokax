<script lang='ts'>
  import { onMount } from 'svelte'
  import PostSegmentItem from './PostSegmentItem.svelte'

  interface PostItem {
    title: string
    url: string
    date: Date
    excerpt: string
    cover?: string
    category?: string
    categoryUrl?: string
    wordCount?: number
    readTime?: number
  }

  interface Props {
    posts?: PostItem[]
  }

  const { posts = [] }: Props = $props()

  let container: HTMLDivElement | null = null
  let items: HTMLElement[] = []

  onMount(() => {
    if (!container)
      return

    // Get all article items
    items = Array.from(container.querySelectorAll('article.segment-item'))

    if (items.length === 0)
      return

    // Intersection Observer for scroll animations
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.classList.contains('show')) {
            io.unobserve(entry.target)
          }
          else {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              entry.target.classList.add('show')
              io.unobserve(entry.target)
            }
          }
        })
      },
      {
        root: null,
        threshold: [0.3],
      },
    )

    // Observe all items
    items.forEach((item) => {
      io.observe(item)
    })

    // Show first item immediately
    if (items[0]) {
      items[0].classList.add('show')
    }

    // Cleanup
    return () => {
      items.forEach(item => io.unobserve(item))
    }
  })
</script>

<div bind:this={container}>
  {#each posts as post, index (post.url)}
    <PostSegmentItem
      title={post.title}
      url={post.url}
      date={post.date}
      excerpt={post.excerpt}
      cover={post.cover}
      category={post.category}
      categoryUrl={post.categoryUrl}
      isEven={index % 2 === 1}
      lazy={index > 0}
      wordCount={post.wordCount}
      readTime={post.readTime}
    />
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  :global(article.segment-item) {
    opacity: 0;
    transform: translateY(2rem);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    /* 防止动画引起的CLS - 预留空间 */
    min-height: 14rem;
    will-change: opacity, transform;
  }

  :global(article.segment-item.show) {
    opacity: 1;
    transform: translateY(0);
    will-change: auto;
  }
</style>
