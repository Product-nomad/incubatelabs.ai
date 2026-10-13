import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// AI rules guides and the policy template (design/guides-2026-10/). One collection: the template is
// told apart by its /resources/ slug. target_keyword, secondary_keywords and note_for_build are
// editorial notes and are never rendered.
const guides = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./src/content/guides",
    // The front matter `slug` is a full path, so key entries by file name instead.
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    slug: z.string().regex(/^\/(guides|resources)\/[a-z0-9-]+\/$/),
    target_keyword: z.string(),
    secondary_keywords: z.string().optional(),
    title: z.string(),
    meta_description: z.string(),
    h1: z.string(),
    last_reviewed: z.coerce.date(),
    schema: z.string(),
    downloads: z.string().optional(),
    note_for_build: z.string().optional(),
  }),
});

// Worked examples (design/examples-2026-10/). target_keyword, secondary_keywords, order and demo are
// editorial notes and are never rendered. `video` is an optional path or URL for a recorded demo.
const examples = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./src/content/examples",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    slug: z.string().regex(/^\/examples\/[a-z0-9-]+\/$/),
    order: z.number().int(),
    demo: z.boolean(),
    industry: z.string(),
    business: z.string(),
    target_keyword: z.string(),
    secondary_keywords: z.string().optional(),
    title: z.string(),
    meta_description: z.string(),
    h1: z.string(),
    card_summary: z.string(),
    tools: z.array(z.string()).min(1),
    time_back: z.string(),
    last_reviewed: z.coerce.date(),
    video: z.string().optional(),
  }),
});

export const collections = { guides, examples };
