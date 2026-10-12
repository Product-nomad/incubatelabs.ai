import { getCollection, type CollectionEntry } from "astro:content";

export type Guide = CollectionEntry<"guides">;

// Display order on /guides/ and in "More guides": main guide first, the template last.
const ORDER = [
  "eu-ai-act-uk",
  "eu-ai-act-article-50-chatbots",
  "uk-ai-act",
  "ai-literacy-training-staff",
  "ai-policy-template",
];

export const TEMPLATE_ID = "ai-policy-template";
export const TEMPLATE_DIR = "/resources/ai-policy-template/";
export const TEMPLATE_FILE = "incubatelabs-ai-policy-template";

export async function getGuides(): Promise<Guide[]> {
  const all = await getCollection("guides");
  return all.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
}

export const isResource = (g: Guide) => g.data.slug.startsWith("/resources/");

// "12 October 2026"
export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export const ogImagePath = (g: Guide) => `/og/${g.id}.png`;

// The policy itself: the block between the two `---` rules in the template page body, without the
// page's "## The template" heading, and with headings promoted so the policy title is the H1.
export function templateMarkdown(body: string): string {
  const lines = body.split("\n");
  const rules = lines.flatMap((l, i) => (l.trim() === "---" ? [i] : []));
  if (rules.length !== 2) throw new Error(`Expected two --- rules in the template body, found ${rules.length}`);
  const block = lines
    .slice(rules[0] + 1, rules[1])
    .filter((l) => l.trim() !== "## The template")
    .map((l) => l.replace(/^### /, "# ").replace(/^#### /, "## "));
  return block.join("\n").trim() + "\n";
}
