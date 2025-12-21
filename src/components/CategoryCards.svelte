<script lang='ts'>
  import { onMount } from 'svelte'
  import CategoryCard from './CategoryCard.svelte'

  interface PostInfo {
    title: string
    url: string
  }

  interface CategoryItem {
    name: string
    url: string
    cover?: string
    topCategory?: {
      name: string
      url: string
    }
    postCount: number
    childCount?: number
    posts: PostInfo[]
  }

  interface Props {
    categories?: CategoryItem[]
  }

  const { categories = [] }: Props = $props()

  let container: HTMLDivElement | null = null
  let items: HTMLElement[] = []
  let activeIndex = $state<number | null>(null)

  function handleMouseEnter(index: number) {
    // Remove active from current active item
    if (activeIndex !== null && activeIndex !== index) {
      activeIndex = null
    }
    // Set new active
    activeIndex = index
  }

  function handleMouseLeave(index: number) {
    // Only remove if this is the active item
    if (activeIndex === index) {
      activeIndex = null
    }
  }

  onMount(() => {
    if (!container)
      return

    // Get all category items
    items = Array.from(container.querySelectorAll('.item'))

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

    // Show first 2 items immediately
    items.slice(0, 2).forEach((item) => {
      item.classList.add('show')
    })

    // Cleanup
    return () => {
      items.forEach(item => io.unobserve(item))
    }
  })
</script>

<div bind:this={container} class='cards w-full'>
  {#each categories as category, index (category.url)}
    <CategoryCard
      name={category.name}
      url={category.url}
      cover={category.cover}
      topCategory={category.topCategory}
      postCount={category.postCount}
      childCount={category.childCount}
      posts={category.posts}
      isActive={activeIndex === index}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={() => handleMouseLeave(index)}
    />
  {/each}
</div>

<style>
  .cards {
    display: flex;
    margin: 0 auto;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  :global(.cards .item.show) {
    display: block !important;
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
</style>
