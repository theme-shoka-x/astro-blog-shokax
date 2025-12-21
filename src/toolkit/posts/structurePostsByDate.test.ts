import type { Post } from "./types";
import { describe, expect, it } from "bun:test";
import { structurePostsByDate } from "./structurePostsByDate";

describe("structurePostsByDate", () => {
  const posts: Post[] = [
    {
      id: "p1",
      collection: "posts",
      data: {
        title: "文章一",
        date: new Date("2023-05-12T10:00:00Z"),
        categories: [],
      },
      body: "内容一",
    },
    {
      id: "p2",
      collection: "posts",
      data: {
        title: "文章二",
        date: new Date("2023-05-12T15:30:00Z"),
        categories: [],
      },
      body: "内容二",
    },
    {
      id: "p3",
      collection: "posts",
      data: {
        title: "文章三",
        date: new Date("2023-06-01T08:00:00Z"),
        categories: [],
      },
      body: "内容三",
    },
    {
      id: "p4",
      collection: "posts",
      data: {
        title: "文章四",
        date: new Date("2024-01-01T00:00:00Z"),
        categories: [],
      },
      body: "内容四",
    },
  ];

  it("should group posts by year and month", () => {
    const result = structurePostsByDate(posts);

    expect(Object.keys(result)).toContain("2023");
    expect(Object.keys(result)).toContain("2024");

    expect(result[2023][0].length).toBe(3);
    expect(result[2023][5].length).toBe(2);
    expect(result[2023][6].length).toBe(1);
    expect(result[2024][1].length).toBe(1);
  });

  it("should group posts by day if daily is enabled", () => {
    const result = structurePostsByDate(posts, { daily: true });
    expect(result[2023][5].day).toBeDefined();
    expect(result[2023][5].day![12].length).toBe(2);
    expect(result[2023][6].day![1].length).toBe(1);
    expect(result[2024][1].day![1].length).toBe(1);
  });

  it("should return empty structure if posts is empty", () => {
    const result = structurePostsByDate([]);
    expect(Object.keys(result).length).toBe(0);
  });
});
