<script lang='ts'>
  import { onMount } from 'svelte'
  import CoverImage from './CoverImage.svelte'

  interface Props {
    enableCover?: boolean
    enablePreload?: boolean
    fixedCover?: string
    gradient?: boolean
    covers?: string[]
    title?: string
  }

  const {
    enableCover = false,
    fixedCover,
    gradient = false,
    covers = [],
    title = '',
  }: Props = $props()

  let mounted = $state(false)

  onMount(() => {
    mounted = true
  })

  // 判断是否显示多图轮播
  const isMultipleImages = $derived(!fixedCover && !gradient && covers.length === 6)
  // 单图模式（固定封面或渐变背景的图片）
  const singleImage = $derived(fixedCover || (gradient ? 'https://7ed.net/bing/api' : covers[0]))
</script>

{#if enableCover && mounted}
  <div
    id='imgs'
    class='imgs-container bg-[#363636] h-70vh min-h-400px w-full left-0 top-0 fixed -z-9'
  >
    {#if isMultipleImages}
      <!-- 多图轮播模式 -->
      <ul class='h-full w-full relative'>
        {#each covers as cover, index}
          <CoverImage
            src={cover}
            alt={title}
            index={index}
            isListItem={true}
          />
        {/each}
      </ul>
    {:else}
      <!-- 单图模式 -->
      <CoverImage
        src={singleImage}
        alt={title}
        index={0}
        isListItem={false}
      />
    {/if}

    <!-- 遮罩层 -->
    <div class='imgs-overlay bg-black/20 h-full w-full transition-opacity duration-300 left-0 top-0 absolute z-1'></div>
  </div>
{/if}

<style>
  .imgs-container {
    content-visibility: auto;
    contain-intrinsic-size: 100vw 70vh;
  }
</style>
