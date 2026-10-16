import { getCollection, type CollectionEntry } from "astro:content";

export type Example = CollectionEntry<"examples">;

// Front matter `order` sets the display order; the demo examples already come first.
export async function getExamples(): Promise<Example[]> {
  const all = await getCollection("examples");
  return all.sort((a, b) => a.data.order - b.data.order);
}

// "More worked examples": three others, same industry first, then by order.
export function moreExamples(all: Example[], current: Example, count = 3): Example[] {
  const others = all.filter((e) => e.id !== current.id);
  const same = others.filter((e) => e.data.industry === current.data.industry);
  const rest = others.filter((e) => e.data.industry !== current.data.industry);
  return [...same, ...rest].slice(0, count);
}

// "See a worked example" block on each use-case page (examples spec §4). No entry, no block.
export const USE_CASE_EXAMPLES: Record<string, string[]> = {
  "invoice-and-document-processing": ["supplier-invoices-into-xero", "job-sheets-to-timesheets"],
  "data-entry-automation": ["job-sheets-to-timesheets", "supplier-invoices-into-xero"],
  "automated-reporting": ["monday-morning-report"],
  "ai-email-replies": ["tenant-repair-requests", "credit-control-emails", "missed-call-text-back"],
  "quotes-and-proposals": ["voice-note-to-quote"],
};

export async function examplesFor(useCaseSlug: string): Promise<Example[]> {
  const ids = USE_CASE_EXAMPLES[useCaseSlug] ?? [];
  const all = await getCollection("examples");
  return ids.map((id) => {
    const e = all.find((x) => x.id === id);
    if (!e) throw new Error(`USE_CASE_EXAMPLES: no example "${id}"`);
    return e;
  });
}

// "The short answer" box: the card summary plus the time back, worded as in the page's bold line
// ("About 6 hours a month back"); the missed-call example is counted in enquiries "kept".
export const shortAnswer = (e: Example) => {
  const t = e.data.time_back;
  return `${e.data.card_summary} ${/\b(back|kept)$/.test(t) ? t : `${t} back`}.`;
};

export const ogImagePath = (e: Example) => `/og/${e.id}.png`;

// Plays a recorded demo: a video file is shown with the native player, anything else (a hosted
// video page) in an iframe.
export const isVideoFile = (src: string) => /\.(mp4|webm|mov)(\?.*)?$/i.test(src);
