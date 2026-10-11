// Home page hero: "the lost day" (v1.1 spec §2, copy from the §14 SEO addendum).

// The H1 lives in one constant so it can change without touching the layout.
export const HERO_H1 = "Practical AI and automation for small businesses without an IT team.";

// [start (half-hour index from 9:00), length (half-hours), kind, label]
// Kind: w = customer work, a = admin that comes back, c = admin that becomes "a person checks".
export type BlockKind = "w" | "a" | "c";
export type Block = [number, number, BlockKind, string];

export const week: Block[][] = [
  [[0, 2, "a", "Inbox triage"], [2, 5, "w", "Site visit"], [7, 1, "a", "Chasing payments"], [8, 4, "w", "Customer work"], [12, 2, "a", "Re-typing job details"], [14, 3, "w", "Team catch-up"]],
  [[0, 1, "a", "Inbox"], [1, 6, "w", "Customer work"], [7, 2, "c", "Writing quotes"], [9, 7, "w", "On site"], [16, 1, "a", "Timesheets"]],
  [[0, 2, "c", "Supplier invoices"], [2, 4, "w", "Customer calls"], [6, 1, "a", "Chasing"], [7, 6, "w", "Customer work"], [13, 2, "a", "Re-typing into accounts"], [15, 2, "w", "Planning"]],
  [[0, 1, "a", "Inbox"], [1, 5, "w", "On site"], [6, 2, "c", "Supplier questionnaire"], [8, 8, "w", "Customer work"], [16, 1, "a", "Quote follow-ups"]],
  [[0, 2, "a", "Weekly report"], [2, 6, "w", "Customer work"], [8, 1, "a", "Invoices"], [9, 7, "w", "Team and sales"], [16, 1, "a", "Inbox"]],
];

// Labels for "c" blocks once a person is only checking the work.
export const checkLabels: Record<string, string> = {
  "Writing quotes": "You check: quotes",
  "Supplier invoices": "You approve: invoices",
  "Supplier questionnaire": "You check: answers",
};

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const ROWS = 17;

const halfHours = (kind: BlockKind) =>
  week.flat().filter((b) => b[2] === kind).reduce((sum, b) => sum + b[1], 0);

// Hours shown in the big number, derived from the data so the two can't drift apart.
export const totals = {
  lost: (halfHours("a") + halfHours("c")) / 2,
  back: halfHours("a") / 2,
  checking: halfHours("c") / 2,
};

if (totals.lost !== 11 || totals.back !== 8 || totals.checking !== 3) {
  throw new Error(`Hero week data no longer adds up to 11h / 8h / 3h: ${JSON.stringify(totals)}`);
}

export const stats = [
  {
    figure: "11 hrs",
    text: "a week the average UK small business owner spends on admin and finance.",
    source: "Amex SME Barometer, 2026",
    href: "https://retailtimes.co.uk/amex-sme-barometer-small-business-owners-spend-nearly-twice-the-time-on-admin-than-growing-their-business/",
  },
  {
    figure: "71%",
    text: "of UK workers have used AI tools their employer never approved.",
    source: "Microsoft and Censuswide, 2025",
    href: "https://www.euronews.com/next/2025/10/14/most-uk-employees-use-ai-at-work-without-permission-microsoft-survey-finds",
  },
  {
    figure: "14%",
    figureMuted: "vs 36%",
    text: "of micro businesses use AI, against more than a third of large firms.",
    source: "UK Government AI Adoption Research, 2026",
    href: "https://www.gov.uk/government/publications/ai-adoption-research/ai-adoption-research",
  },
  {
    figure: "No.1",
    text: "reason firms give for not using AI: they haven't found where it fits. That's the part we do.",
    source: "UK Government AI Adoption Research, 2026",
    href: "https://www.gov.uk/government/publications/ai-adoption-research/ai-adoption-research",
  },
];
