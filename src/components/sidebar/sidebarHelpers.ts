/**
 * Sidebar behavior utilities
 */

import type { TocItem } from "./SidebarTypes";

/**
 * Activate menu items based on current page URL
 */
export function initMenuActive() {
  if (typeof document === "undefined") return;

  document.querySelectorAll(".menu .item:not(.title)").forEach((element) => {
    const target = element.querySelector("a[href]") as HTMLAnchorElement | null;
    const parentItem = element.parentNode?.parentNode as HTMLElement | null;

    if (!target) return;

    const isSamePath =
      target.pathname === location.pathname ||
      target.pathname === location.pathname.replace("index.html", "");

    const isSubPath = location.pathname.startsWith(target.pathname) && target.pathname !== "/";

    const isActive = target.hostname === location.hostname && (isSamePath || isSubPath);

    element.classList.toggle("active", isActive);

    if (element.parentNode && parentItem?.classList.contains("dropdown")) {
      if (element.parentNode.querySelector(".active")) {
        parentItem.classList.remove("active");
        parentItem.classList.add("expand");
      } else {
        parentItem.classList.remove("expand");
      }
    }
  });
}

/**
 * Toggle sidebar visibility (mobile)
 */
export function toggleSidebarVisibility(sidebarElement: HTMLElement | null, force?: boolean) {
  if (!sidebarElement) return;

  const isOpen = sidebarElement.classList.contains("on");

  if (isOpen || force === false) {
    sidebarElement.classList.remove("on");
  } else {
    sidebarElement.classList.add("on");
  }
}

/**
 * Extract TOC items from markdown content headings
 * This is typically done at build time in Astro
 */
export function extractTocFromContent(content: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s(.+)$/gm;
  const toc: TocItem[] = [];

  for (const match of content.matchAll(headingRegex)) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4E00-\u9FA5]+/g, "-")
      .replace(/^-+|-+$/g, "");

    toc.push({
      id,
      text,
      level,
    });
  }

  return toc;
}

/**
 * Build hierarchical TOC structure from flat list
 */
export function buildTocTree(items: TocItem[]): TocItem[] {
  if (items.length === 0) return [];

  const result: TocItem[] = [];
  const stack: TocItem[] = [];

  items.forEach((item) => {
    const newItem: TocItem = { ...item, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      result.push(newItem);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.children) parent.children = [];
      parent.children.push(newItem);
    }

    stack.push(newItem);
  });

  return result;
}
