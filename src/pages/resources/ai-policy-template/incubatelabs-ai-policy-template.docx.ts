import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { TEMPLATE_ID, templateMarkdown } from "@/lib/guides";
import { policyDocx } from "@/lib/policy-docx";

// The policy block from the template page as a Word file, generated at build time (build spec §3).
export const GET: APIRoute = async () => {
  const guide = await getEntry("guides", TEMPLATE_ID);
  if (!guide) throw new Error("AI policy template entry missing");
  const docx = await policyDocx(templateMarkdown(guide.body ?? ""));
  return new Response(docx, {
    headers: { "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
  });
};
