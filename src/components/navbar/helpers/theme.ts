export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "shokax-color-scheme";

function getStoredTheme(win: Window): ThemeMode | null {
  try {
    const stored = win.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch (err) {
    // Ignore storage errors (private mode, etc.)
    console.warn("[ShokaX] Unable to read theme from storage", err);
  }
  return null;
}

function getPreferredTheme(win: Window): ThemeMode {
  return win.matchMedia && win.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(doc: Document, theme: ThemeMode) {
  doc.documentElement.setAttribute("data-theme", theme);
}

export function initTheme(doc: Document, win: Window): ThemeMode {
  const theme = getStoredTheme(win) ?? getPreferredTheme(win);
  applyTheme(doc, theme);
  return theme;
}

export function toggleTheme(doc: Document, win: Window, current: ThemeMode): ThemeMode {
  const next: ThemeMode = current === "dark" ? "light" : "dark";
  applyTheme(doc, next);
  try {
    win.localStorage.setItem(STORAGE_KEY, next);
  } catch (err) {
    console.warn("[ShokaX] Unable to persist theme", err);
  }
  return next;
}
