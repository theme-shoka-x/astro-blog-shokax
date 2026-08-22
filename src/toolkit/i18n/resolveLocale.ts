export const DEFAULT_LOCALE = "zh-CN" as const;

export const SUPPORTED_LOCALES = [DEFAULT_LOCALE, "zh-TW", "ja", "en", "ko"] as const;

export type ResolvedLocale = (typeof SUPPORTED_LOCALES)[number];

const SUPPORTED_LOCALE_SET = new Set<string>(SUPPORTED_LOCALES);

function isResolvedLocale(locale: string): locale is ResolvedLocale {
  return SUPPORTED_LOCALE_SET.has(locale);
}

export function resolveLocale(
  locale?: unknown,
  fallback: ResolvedLocale = DEFAULT_LOCALE,
): ResolvedLocale {
  if (typeof locale === "string" && isResolvedLocale(locale)) {
    return locale;
  }

  return fallback;
}
