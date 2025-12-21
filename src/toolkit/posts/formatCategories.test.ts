import type { Post } from "./types";
import { describe, expect, it } from "bun:test";
import { formatCategories } from "./formatCategories";

describe("formatCategories", () => {
  const post1: Post = {
    id: "p1",
    collection: "posts",
    data: { title: "文章一", date: new Date(), categories: [] },
    body: "内容一",
  };
  const post2: Post = {
    id: "p2",
    collection: "posts",
    data: { title: "文章二", date: new Date(), categories: [] },
    body: "内容二",
  };
  const post3: Post = {
    id: "p3",
    collection: "posts",
    data: { title: "文章三", date: new Date(), categories: [] },
    body: "内容三",
  };
  const post4: Post = {
    id: "p4",
    collection: "posts",
    data: { title: "文章四", date: new Date(), categories: [] },
    body: "内容四",
  };
  const post5: Post = {
    id: "p5",
    collection: "posts",
    data: { title: "文章五", date: new Date(), categories: [] },
    body: "内容五",
  };
  const post6: Post = {
    id: "p6",
    collection: "posts",
    data: { title: "文章六", date: new Date(), categories: [] },
    body: "内容六",
  };

  const sampleCategories = [
    { _id: "1", name: "前端", length: 5, posts: [post1, post2, post3, post4, post5] },
    { _id: "2", name: "React", parent: "1", length: 3, posts: [post1, post2, post3] },
    { _id: "3", name: "Vue", parent: "1", length: 2, posts: [post4, post5] },
    { _id: "4", name: "后端", length: 6, posts: [post1, post2, post3, post4, post5, post6] },
    { _id: "5", name: "Node.js", parent: "4", length: 4, posts: [post1, post2, post3, post4] },
  ];

  it("should format categories into tree structure", () => {
    const result = formatCategories(sampleCategories);

    expect(result).toHaveLength(2); // 顶级分类：前端 + 后端
    expect(result[0].name).toBe("后端"); // 因为 length 最大，排在最前
    expect(result[1].name).toBe("前端");

    expect(result[0].children[0].name).toBe("Node.js");
    expect(result[1].children.map((c) => c.name)).toEqual(["React", "Vue"]);
  });

  it("should respect depth limit", () => {
    const result = formatCategories(sampleCategories, { depth: 1 });

    expect(result).toHaveLength(2);
    expect(result[0].children).toEqual([]);
    expect(result[1].children).toEqual([]);
  });

  it("should include posts in each category", () => {
    const result = formatCategories(sampleCategories);
    expect(result[0].posts).toEqual([post1, post2, post3, post4, post5, post6]);
    expect(result[0].children[0].posts).toEqual([post1, post2, post3, post4]);
  });

  it("should handle empty input", () => {
    const result = formatCategories([]);
    expect(result).toEqual([]);
  });
});
