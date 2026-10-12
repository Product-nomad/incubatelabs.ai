import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { TEMPLATE_ID, templateMarkdown } from "@/lib/guides";

// The policy block from the template page, as a Markdown file (build spec §3).
export const GET: APIRoute = async () => {
  const guide = await getEntry("guides", TEMPLATE_ID);
  if (!guide) throw new Error("AI policy template entry missing");
  return new Response(templateMarkdown(guide.body ?? ""), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
