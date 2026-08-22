import { describe, expect, it } from "bun:test";
import { resolveLocale } from "./resolveLocale";

describe("resolveLocale", () => {
  it("returns configured locale when valid", () => {
    expect(resolveLocale("zh-CN")).toBe("zh-CN");
    expect(resolveLocale("zh-TW")).toBe("zh-TW");
    expect(resolveLocale("ja")).toBe("ja");
    expect(resolveLocale("en")).toBe("en");
    expect(resolveLocale("ko")).toBe("ko");
  });

  it("falls back to zh-CN for missing or invalid locale", () => {
    expect(resolveLocale()).toBe("zh-CN");
    expect(resolveLocale(null)).toBe("zh-CN");
    expect(resolveLocale("fr")).toBe("zh-CN");
  });

  it("supports custom fallback locale", () => {
    expect(resolveLocale("fr", "en")).toBe("en");
  });
});
