import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default("CBoom Team"),
    image: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    keywords: z.string().optional(),
    focusKeyword: z.string().optional(),
    secondaryKeywords: z.array(z.string()).default([]),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    canonical: z.string().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
