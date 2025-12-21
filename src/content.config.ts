import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/posts",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().refine((date) => !Number.isNaN(date), {
      message: "Invalid date format",
    }),
    updated: z.date().optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    cover: z.string().optional(),
    sticky: z.boolean().optional(),
    link: z.string().optional(),
  }),
});

export const collections = {
  posts,
};
