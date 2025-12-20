<script lang="ts">
  import { onMount } from 'svelte';
  import {css} from '../assets/fonts/JetBrainsMono-VF.ttf?subsets'
  import unoCss from 'uno.css?inline'

  let container = $state<HTMLElement | null>(null);
  let copied = $state(false);
  let codeLanguage = $state('');
  let isDark = $state(false);

  // 复制逻辑
  async function copyCode() {
    // 获取 slot 元素，然后查询其分配的内容
    const slot = container?.querySelector('slot') as HTMLSlotElement;
    const assignedElements = slot?.assignedElements({ flatten: true }) ?? [];
    const preElement = assignedElements.find((el) => el.tagName === 'PRE') as HTMLPreElement | undefined;
    
    if (!preElement) return;

    // 获取纯文本内容
    const code = preElement.textContent ?? '';

    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  // 获取语言逻辑
  function getCodeLanguage() {
    // 获取 slot 分配的元素
    const slot = container?.querySelector('slot') as HTMLSlotElement;
    const assignedElements = slot?.assignedElements({ flatten: true }) ?? [];
    const preElement = assignedElements.find((el) => el.tagName === 'PRE') as HTMLPreElement | undefined;
    const codeElement = preElement?.querySelector('code');
    if (!codeElement) return '';

    const classList = Array.from(codeElement.classList);
    const langClass = classList.find(cls => cls.startsWith('language-'));
    return langClass ? langClass.replace('language-', '') : '';
  }

  onMount(() => {
    // 检查系统/文档主题
    isDark = document.documentElement.getAttribute('data-theme') === 'dark' 
             || document.documentElement.classList.contains('dark');
    
    // 从插入的 DOM 中分析语言
    codeLanguage = getCodeLanguage();

    const shadowHost = container?.getRootNode() as ShadowRoot;
    if (shadowHost instanceof ShadowRoot) {
      const style = document.createElement('style');
      style.textContent = unoCss;
      shadowHost.appendChild(style);
    }
  });
</script>

<div class="codeblock {isDark ? 'dark' : ''}">
  <div class="header">
    <div class="controls">
      <div class="dot red"></div>
      <div class="dot yellow"></div>
      <div class="dot green"></div>
      {#if codeLanguage}
        <span class="lang-text">{codeLanguage}</span>
      {/if}
    </div>
    <div class="actions">
      <button
        class="copy-btn {copied ? 'i-ri-check-fill' : 'i-ri-file-copy-fill'}"
        onclick={copyCode}
        aria-label="Copy code"
      ></button>
    </div>
  </div>

  <div bind:this={container} class="content-wrapper" style="font-family: { css.family };">
    <slot />
  </div>
</div>

<svelte:options customElement="code-block" />

<style>
  /* 基础布局 */
  .codeblock {
    margin: 1.5rem 0;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0.5rem 0.5rem 1rem var(--grey-3);
    font-family: 'JetBrains Mono', 'Courier New', monospace;
  }

  .dark.codeblock {
    box-shadow: none;
  }

  /* Header 样式 */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: var(--grey-2);
    min-height: 1.5rem;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-left: 0.8125rem;
  }

  .dot {
    width: 0.9375rem;
    height: 0.9375rem;
    border-radius: 50%;
  }
  .red { background: rgb(252, 98, 93); }
  .yellow { background: rgb(253, 188, 64); }
  .green { background: rgb(53, 205, 75); }

  .lang-text {
    margin-left: 0.75rem;
    font-size: 1rem;
    color: var(--grey-4);
    text-transform: uppercase;
  }

  .actions {
    display: flex;
    flex-direction: row;
    padding-right: 1.5rem;
    padding-top: 0.5rem;
    color: var(--grey-5);
  }

  .copy-btn {
    border: none;
    cursor: pointer;
    color: var(--grey-5);
    font-size: 1.1rem;
    transition: color 0.2s;
  }

  .copy-btn:hover {
    color: var(--grey-4);
  }

  /* 核心：处理插槽内的样式 */
  .content-wrapper ::slotted(*) {
    font-family: 'JetBrains Mono', 'Courier New', Courier, monospace;
    font-size: 0.925rem;
    line-height: 1.25rem;
    line-break: anywhere;
    white-space: break-spaces;
  }

  .content-wrapper ::slotted(pre) {
    padding: 0.925rem;
    margin: 0;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    background-color: var(--grey-3) !important;
    overflow-x: auto;
  }

  /* 行号样式 */
  :global(.line) {
    text-indent: -2.5rem;
    padding-left: 2.5rem;
    display: block;
    min-height: 1.25rem;
  }

  :global(.line):hover {
    background-color: var(--grey-2);
  }

  :global(code) {
    counter-reset: step;
    counter-increment: step 0;
    display: flex;
    flex-direction: column;
  }

  :global(code .line::before) {
    content: counter(step);
    counter-increment: step;
    width: 1rem;
    margin-right: 1.5rem;
    display: inline-block;
    text-align: right;
    color: var(--grey-5);
  }

  /* Diff 高亮 */
  :global(.diff .remove) {
    background-color: var(--color-red);
    opacity: 0.7;
  }

  :global(.diff .remove)::before {
    content: '-';
    color: var(--color-red);
    font-weight: bold;
  }

  :global(.diff .add) {
    background-color: var(--color-green);
  }

  :global(.diff .add)::before {
    content: '+';
    color: var(--color-green);
    font-weight: bold;
  }

  :global(.diff .highlighted) {
    background-color: var(--grey-4);
  }

  /* 暗色模式适配 */
  :global(html[data-theme='dark']) .codeblock {
    box-shadow: none;
  }

  :global(html[data-theme='dark']) .content-wrapper ::slotted(pre) {
    background-color: #1a1a1a !important;
  }

  :global(html[data-theme='dark']) :global(.shiki),
  :global(html[data-theme='dark']) :global(.shiki span) {
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }

  .dark :global(.shiki),
  .dark :global(.shiki span) {
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
</style>