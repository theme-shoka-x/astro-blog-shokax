<script lang="ts">
  import { shuffle } from "es-toolkit";
  import { onMount } from "svelte";

  interface Post {
    id: string;
    slug?: string;
    data: {
      title: string;
      description?: string;
    };
    body?: string;
  }

  interface Props {
    posts?: Post[];
    enableRandomPosts?: boolean;
    enableRecentComments?: boolean;
    recentCommentsLimit?: number;
  }

  const {
    posts = [],
    enableRandomPosts = true,
    enableRecentComments = true,
  }: Props = $props();

  let randomPosts = $state<Post[]>([]);
  let recentComments = $state<any[]>([]);
  let hasWaline = $state(false);
  let hasTwikoo = $state(false);

  onMount(() => {
    // Check if Waline or Twikoo is available
    // @ts-ignore
    hasWaline = typeof window !== "undefined" && window.__WALINE__;
    // @ts-ignore
    hasTwikoo = typeof window !== "undefined" && window.__TWIKOO__;

    // Get random posts
    if (enableRandomPosts && posts.length > 0) {
      randomPosts = shuffle([...posts]).slice(0, 10);
    }

    // Mock: Initialize recent comments
    if (enableRecentComments && (hasWaline || hasTwikoo)) {
      // TODO: Fetch recent comments from Waline/Twikoo API
      // For now, this is mocked out with empty array
      recentComments = [];
      // Example of what the fetched data would look like:
      // recentComments = [
      //   {
      //     nick: 'User Name',
      //     time: '2 hours ago',
      //     text: 'Great article!',
      //     href: '/post/slug#comment-id'
      //   }
      // ]
    }
  });

  function getPostSlug(post: Post): string {
    // Generate slug from id or title
    if (post.slug) return post.slug;
    return post.id.toLowerCase().replace(/\s+/g, "-");
  }

  function truncateText(text: string, maxLength: number = 50): string {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  }
</script>

<aside
  class="widgets bg-body-bg-shadow border-grey-3 my-8 px-4 py-4 border-b border-t flex gap-4 justify-around z-1"
>
  <!-- Random Posts Widget -->
  {#if enableRandomPosts && randomPosts.length > 0}
    <div class="rpost px-4 py-4 w-1/2">
      <h2 class="text-base font-semibold m-0 mb-4">Random Posts</h2>
      <ul class="post-list m-0 p-0 list-none">
        {#each randomPosts as post}
          <li
            class="item border-grey-4 pb-2 pl-8 border-b border-dashed relative"
          >
            <a
              href={`/posts/${getPostSlug(post)}/`}
              class="hover:text-color-link text-inherit no-underline flex flex-col transition-colors"
            >
              <span class="breadcrumb text-sm font-semibold m-0 max-h-6"
                >{post.data.title}</span
              >
              <span class="text-grey-5 text-xs mt-1 max-h-8"
                >{truncateText(post.data.description || post.body || "")}</span
              >
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <!-- Recent Comments Widget -->
  {#if enableRecentComments && (hasWaline || hasTwikoo)}
    <div class="rpost px-4 py-4 w-1/2">
      <h2 class="text-base font-semibold m-0 mb-4">Recent Comments</h2>
      <ul
        id="new-comment"
        class="leancloud-recent-comment post-list m-0 p-0 list-none"
      >
        {#if recentComments.length > 0}
          {#each recentComments as comment}
            <li
              class="item border-grey-4 pb-2 pl-8 border-b border-dashed relative"
            >
              <a
                href={comment.href}
                class="hover:text-color-link text-inherit no-underline flex flex-col transition-colors"
              >
                <span class="breadcrumb text-sm font-semibold m-0 max-h-6"
                  >{comment.nick} @ {comment.time}</span
                >
                <span class="text-grey-5 text-xs mt-1 max-h-8"
                  >{truncateText(comment.text)}</span
                >
              </a>
            </li>
          {/each}
        {:else}
          <li class="item text-grey-5 py-4 text-center">
            <!-- TODO: Load recent comments from Waline/Twikoo -->
            No comments yet. Start a conversation!
          </li>
        {/if}
      </ul>
    </div>
  {/if}
</aside>

<style>
  .widgets {
    --un-bg-opacity: 1;
  }

  .widgets > div {
    min-width: 0;
  }

  .widgets h2 {
    margin-top: 0;
  }

  .post-list {
    counter-reset: post-counter;
  }

  .item {
    margin: 0;
  }

  .item::before {
    counter-increment: post-counter;
    content: counter(post-counter);
    position: absolute;
    left: 0;
    font-size: 1.5em;
    color: var(--grey-4);
    line-height: 1.2;
    text-align: right;
    width: 1em;
    font-weight: bold;
  }

  .item a {
    display: flex;
    flex-direction: column;
    color: inherit;
    text-decoration: none;
  }

  .item span {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .breadcrumb {
    max-height: 1.5rem;
  }

  .item span:not(.breadcrumb) {
    max-height: 2rem;
  }

  @media (max-width: 820px) {
    :global(.widgets) {
      flex-direction: column-reverse;
      gap: 0;
    }

    :global(.widgets > div) {
      width: 100%;
      padding: 0.5rem;
      border-bottom: 1px dashed var(--grey-3);
    }

    :global(.widgets > div:last-child) {
      border-bottom: none;
    }
  }
</style>
