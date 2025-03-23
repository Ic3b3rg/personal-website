import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/blog" }),
  // schema: z.object({
  //     title: z.string(),
  //     description: z.string(),
  //     pubDate: z.coerce.date(),
  //     updatedDate: z.coerce.date().optional(),
  // }),
});

export const collections = { blog };
