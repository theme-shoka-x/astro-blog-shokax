import { writable } from "svelte/store";

/**
 * Store for managing sidebar visibility state
 * Shared between NavBar (LeftNavBtn) and Sidebar components
 */
export const sidebarOpen = writable(false);

/**
 * Toggle sidebar visibility
 */
export function toggleSidebar() {
  sidebarOpen.update((n) => !n);
}
