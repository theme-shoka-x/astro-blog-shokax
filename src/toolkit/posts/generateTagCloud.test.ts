import { describe, expect, it } from "bun:test";
import { generateTagCloud } from "./generateTagCloud";

describe("generateTagCloud", () => {
  const tags = [
    { name: "typescript", count: 50 },
    { name: "hexo", count: 20 },
    { name: "node", count: 10 },
    { name: "frontend", count: 5 },
  ];

  const options = {
    minFontSize: 12,
    maxFontSize: 36,
    startColor: "#aaaaff",
    endColor: "#ff5555",
    limit: 100,
  };

  it("should generate font size within the correct range", () => {
    const cloud = generateTagCloud(tags, options);

    cloud.forEach((tag) => {
      expect(tag.fontSize).toBeGreaterThanOrEqual(options.minFontSize);
      expect(tag.fontSize).toBeLessThanOrEqual(options.maxFontSize);
    });
  });

  it("should limit the number of tags when limit is set", () => {
    const cloud = generateTagCloud(tags, { ...options, limit: 2 });
    expect(cloud.length).toBe(2);
    expect(cloud[0].count).toBeGreaterThanOrEqual(cloud[1].count);
  });

  it("should assign correct colors based on weight order", () => {
    const cloud = generateTagCloud(tags, options);

    const colors = cloud.map((t) => t.color);
    // 颜色应该是渐变的（这里只验证顺序）
    for (let i = 1; i < colors.length; i++) {
      expect(colors[i]).not.toBe(colors[i - 1]);
    }
  });

  it("should return empty list if no tags", () => {
    const cloud = generateTagCloud([], options);
    expect(cloud).toEqual([]);
  });

  it("should assign same font size and color if all counts are equal", () => {
    const equalTags = [
      { name: "a", count: 1 },
      { name: "b", count: 1 },
      { name: "c", count: 1 },
    ];
    const cloud = generateTagCloud(equalTags, options);

    const fontSizes = new Set(cloud.map((t) => t.fontSize));
    const colors = new Set(cloud.map((t) => t.color));

    expect(fontSizes.size).toBe(1);
    expect(colors.size).toBe(1);
  });
});
