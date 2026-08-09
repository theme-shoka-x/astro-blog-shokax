import i18next from "i18next";
import themeConfig from "@/theme.config";
import { DEFAULT_LOCALE, resolveLocale, type ResolvedLocale } from "@/toolkit/i18n/resolveLocale";

// Import translation files
import zhCN from "./locales/zh-CN.json";
import zhTW from "./locales/zh-TW.json";
import ja from "./locales/ja.json";
import en from "./locales/en.json";
import ko from "./locales/ko.json";

// Type for supported locales
export type Locale = ResolvedLocale;

// Resources type
const resources = {
  "zh-CN": { translation: zhCN },
  "zh-TW": { translation: zhTW },
  ja: { translation: ja },
  en: { translation: en },
  ko: { translation: ko },
} as const;

// Get current locale from theme config
export const currentLocale = resolveLocale(themeConfig.locale);

/**
 * Initialize i18n with the locale from theme config
 */
export async function initI18n(locale: Locale = DEFAULT_LOCALE) {
  if (!i18next.isInitialized) {
    await i18next.init({
      lng: locale,
      fallbackLng: DEFAULT_LOCALE,
      resources,
      interpolation: {
        escapeValue: false, // React/Astro already handles escaping
      },
    });
  } else if (i18next.language !== locale) {
    await i18next.changeLanguage(locale);
  }
  return i18next;
}

/**
 * Get translation function for the configured locale
 */
export function getT(locale: Locale = DEFAULT_LOCALE) {
  if (!i18next.isInitialized || i18next.language !== locale) {
    // Synchronous init for SSR predictability
    void i18next.init({
      lng: locale,
      fallbackLng: DEFAULT_LOCALE,
      resources,
      interpolation: {
        escapeValue: false,
      },
    });
  }
  return i18next.t.bind(i18next);
}

/**
 * Helper to get locale from theme config
 */
export function getLocaleFromConfig(config: typeof themeConfig): Locale {
  return resolveLocale(config.locale);
}

/**
 * Pre-configured translation function using theme config locale
 * Import this directly in your components for convenience:
 *
 * import { t } from "@/i18n";
 *
 * <h1>{t("nav.home")}</h1>
 */
export const t = getT(currentLocale);

export { i18next };
