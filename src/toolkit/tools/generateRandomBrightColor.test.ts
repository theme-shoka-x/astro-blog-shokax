import { describe, expect, it } from "bun:test";
import { generateRandomBrightColor } from "./generateRandomBrightColor";

function hexToRgb(hex: string): [number, number, number] {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

describe("generateRandomBrightColor", () => {
  it("should return a string starting with # and 6 hex characters", () => {
    const color = generateRandomBrightColor();
    expect(color).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it("should return RGB values all in range [128, 255]", () => {
    const color = generateRandomBrightColor();
    const [r, g, b] = hexToRgb(color);
    expect(r).toBeGreaterThanOrEqual(128);
    expect(r).toBeLessThanOrEqual(255);
    expect(g).toBeGreaterThanOrEqual(128);
    expect(g).toBeLessThanOrEqual(255);
    expect(b).toBeGreaterThanOrEqual(128);
    expect(b).toBeLessThanOrEqual(255);
  });

  it("should return different values most of the time", () => {
    const results = new Set();
    for (let i = 0; i < 10; i++) {
      results.add(generateRandomBrightColor());
    }
    expect(results.size).toBeGreaterThan(1);
  });
});
