// /llms.txt (llmstxt.org format), built from the same data and collections as the pages, so it stays
// current. No prices and no location (the build checks in src/integrations/site-checks.mjs cover it).
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "@/data/site";
import { useCases } from "@/data/useCases";
import { getExamples } from "@/lib/examples";

const line = (title: string, path: string, description: string) => `- [${title}](${new URL(path, site.url).href}): ${description}`;

export const GET: APIRoute = async () => {
  const examples = await getExamples();
  const guides = (await getCollection("guides")).sort((a, b) => a.data.slug.localeCompare(b.data.slug));
  const section = (heading: string, lines: string[]) => [`## ${heading}`, "", ...lines, ""];

  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    ...section(
      "Where we can help",
      useCases.map((u) => line(u.seoTitle, `/use-cases/${u.slug}/`, u.seoDescription)),
    ),
    ...section(
      "Worked examples",
      examples.map((e) => line(e.data.title, e.data.slug, e.data.meta_description)),
    ),
    ...section(
      "Guides",
      guides.filter((g) => g.data.slug.startsWith("/guides/")).map((g) => line(g.data.title, g.data.slug, g.data.meta_description)),
    ),
    ...section(
      "Resources",
      guides.filter((g) => g.data.slug.startsWith("/resources/")).map((g) => line(g.data.title, g.data.slug, g.data.meta_description)),
    ),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
