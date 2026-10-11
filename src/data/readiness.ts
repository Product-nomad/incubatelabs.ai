// Readiness Check: question set and result logic.
//
// Adapted from Product-nomad/ai-adoption-compass: only its data-readiness
// ideas carry over (where information lives, its quality, who owns it, the
// cost of a mistake). Instead of a score, the result names which of the six
// use cases look worth automating first. Runs entirely in the browser.

import { useCases } from "@/data/useCases";

export interface Option {
  value: string;
  label: string;
  score?: number;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  // Use case this question scores, if any.
  useCase?: string;
}

export interface Step {
  title: string;
  questions: Question[];
}

const jobOptions: Option[] = [
  ...useCases.map((uc) => ({ value: uc.slug, label: uc.title })),
  { value: "unsure", label: "Not sure yet" },
];

export const steps: Step[] = [
  {
    title: "Your business",
    questions: [
      {
        id: "size",
        text: "How many people work in the business?",
        options: [
          { value: "1", label: "Just me" },
          { value: "2-5", label: "2 to 5" },
          { value: "6-20", label: "6 to 20" },
          { value: "21+", label: "More than 20" },
        ],
      },
      {
        id: "it",
        text: "Who looks after your technology today?",
        options: [
          { value: "nobody", label: "Nobody in particular" },
          { value: "me", label: "Me, when I have to" },
          { value: "provider", label: "An outside IT provider" },
          { value: "team", label: "Someone on the team" },
        ],
      },
    ],
  },
  {
    title: "Where the time goes",
    questions: [
      {
        id: "documents",
        useCase: "document-handling",
        text: "How do invoices, delivery notes and forms usually arrive, and what happens next?",
        options: [
          { value: "email-typed", label: "By email, and someone reads and types them in", score: 3 },
          { value: "mixed", label: "A mix of paper and email, and someone sorts and files them", score: 2 },
          { value: "automatic", label: "Most of it is handled automatically already", score: 0 },
          { value: "few", label: "We don't get many", score: 0 },
        ],
      },
      {
        id: "reentry",
        useCase: "admin-and-data-re-entry",
        text: "How many systems does a new customer or job get typed into?",
        options: [
          { value: "one", label: "Just one", score: 0 },
          { value: "two", label: "Two", score: 2 },
          { value: "three", label: "Three or more", score: 3 },
          { value: "unsure", label: "Not sure", score: 1 },
        ],
      },
      {
        id: "reporting",
        useCase: "reporting",
        text: "How long does your regular weekly or monthly report take to put together?",
        options: [
          { value: "none", label: "We don't have a regular report", score: 0 },
          { value: "hour", label: "Under an hour", score: 1 },
          { value: "hours", label: "A few hours", score: 2 },
          { value: "day", label: "A day or more", score: 3 },
        ],
      },
      {
        id: "replies",
        useCase: "customer-replies",
        text: "How many customer emails or enquiries a week ask questions you've answered before?",
        options: [
          { value: "few", label: "Hardly any", score: 0 },
          { value: "handful", label: "A handful", score: 1 },
          { value: "10-30", label: "Ten to thirty", score: 2 },
          { value: "30+", label: "More than thirty", score: 3 },
        ],
      },
      {
        id: "quotes",
        useCase: "quotes-and-proposals",
        text: "How long does it usually take from an enquiry to a quote going out?",
        options: [
          { value: "none", label: "We don't really send quotes", score: 0 },
          { value: "same-day", label: "The same day", score: 1 },
          { value: "1-3", label: "One to three days", score: 2 },
          { value: "3+", label: "More than three days", score: 3 },
        ],
      },
      {
        id: "questionnaires",
        useCase: "compliance-questionnaires",
        text: "How often do customers send you supplier or security questionnaires?",
        options: [
          { value: "never", label: "Never", score: 0 },
          { value: "yearly", label: "Once or twice a year", score: 1 },
          { value: "monthly", label: "Every month or two", score: 2 },
          { value: "weekly", label: "Most weeks", score: 3 },
        ],
      },
      {
        id: "pick",
        text: "Which of these would you most like off your plate?",
        options: jobOptions,
      },
    ],
  },
  {
    title: "Before you start",
    questions: [
      {
        id: "where",
        text: "Where does the information for that job live?",
        options: [
          { value: "one", label: "Mostly in one system" },
          { value: "several", label: "Spread across a few systems" },
          { value: "spreadsheets", label: "In spreadsheets" },
          { value: "scattered", label: "In emails, on paper or in people's heads" },
        ],
      },
      {
        id: "tidy",
        text: "How tidy is that information?",
        options: [
          { value: "good", label: "Consistent and up to date" },
          { value: "ok", label: "Mostly fine, with a few gaps" },
          { value: "messy", label: "Messy, duplicated or out of date" },
          { value: "unknown", label: "I honestly don't know" },
        ],
      },
      {
        id: "owner",
        text: "Is there one person who owns that information and how the job is done?",
        options: [
          { value: "yes", label: "Yes, clearly" },
          { value: "partly", label: "Sort of" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "stakes",
        text: "How much would it matter if an automated step got something wrong?",
        options: [
          { value: "low", label: "Not much, it's easy to spot and fix" },
          { value: "medium", label: "We'd want someone to check it" },
          { value: "high", label: "It could cost money, break a rule or upset a customer" },
        ],
      },
    ],
  },
];

export type Answers = Record<string, string>;

export interface Recommendation {
  slug: string;
  title: string;
  reason: string;
}

export interface Result {
  recommendations: Recommendation[];
  beforeYouStart: { lead: string; body: string }[];
}

// One-line reasons, keyed by question id then answer value.
const reasons: Record<string, Record<string, string>> = {
  documents: {
    "email-typed": "Documents arrive by email and someone types them in by hand.",
    mixed: "Paperwork arrives in a mix of formats and someone sorts and files it.",
  },
  reentry: {
    three: "New customers or jobs get typed into three or more systems.",
    two: "New customers or jobs get typed into two systems.",
  },
  reporting: {
    day: "Your regular report takes a day or more to put together.",
    hours: "Your regular report takes a few hours to put together.",
  },
  replies: {
    "30+": "More than thirty enquiries a week ask questions you've answered before.",
    "10-30": "Ten to thirty enquiries a week ask questions you've answered before.",
  },
  quotes: {
    "3+": "Quotes take more than three days to go out.",
    "1-3": "Quotes take one to three days to go out.",
  },
  questionnaires: {
    weekly: "Questionnaires arrive most weeks.",
    monthly: "Questionnaires arrive every month or two.",
  },
};

const PICKED_REASON = "You picked it as the job you'd most like off your plate.";
const PICK_BONUS = 2;
const THRESHOLD = 2;
const MAX_RECOMMENDATIONS = 3;
const MAX_POINTS = 2;

const points = {
  scattered: {
    lead: "Get the information into one place.",
    body: "Right now it lives in emails, on paper or in people's heads, and automation can only work with what it can reach.",
  },
  several: {
    lead: "Map where the information lives.",
    body: "It's spread across several systems, so the first step is agreeing which one is the source of truth.",
  },
  spreadsheets: {
    lead: "Tidy up the spreadsheets.",
    body: "Agree one version, with consistent columns, before anything reads from it.",
  },
  messy: {
    lead: "Clean up before you automate.",
    body: "Automating messy information just produces mess faster.",
  },
  unknown: {
    lead: "Take a look at the data.",
    body: "Pull a sample of last month's records and see how complete and consistent they are.",
  },
  owner: {
    lead: "Name an owner.",
    body: "One person should decide how this job is done and keep the information right.",
  },
  high: {
    lead: "Keep a person in the loop.",
    body: "Where a mistake would be costly, plan for someone to check before anything goes out.",
  },
  integration: {
    lead: "Check for a simple fix first.",
    body: "Re-entry is often solved by connecting your systems directly, with no AI needed.",
  },
  good: {
    lead: "Your information looks in good shape.",
    body: "That's often the hardest part, and it makes a first project much quicker.",
  },
};

export function computeResult(answers: Answers): Result {
  const scored = steps
    .flatMap((s) => s.questions)
    .filter((q) => q.useCase)
    .map((q, order) => {
      const answer = answers[q.id];
      const base = q.options.find((o) => o.value === answer)?.score ?? 0;
      const picked = answers.pick === q.useCase;
      const score = base + (picked ? PICK_BONUS : 0);
      const reason = (base >= THRESHOLD && reasons[q.id]?.[answer]) || PICKED_REASON;
      return { slug: q.useCase!, score, picked, order, reason };
    })
    .filter((s) => s.score >= THRESHOLD)
    .sort((a, b) => b.score - a.score || Number(b.picked) - Number(a.picked) || a.order - b.order)
    .slice(0, MAX_RECOMMENDATIONS);

  const recommendations = scored.map((s) => ({
    slug: s.slug,
    title: useCases.find((uc) => uc.slug === s.slug)!.title,
    reason: s.reason,
  }));

  // Data readiness first, then ownership, then risk.
  const candidates = [];
  if (answers.where === "scattered") candidates.push(points.scattered);
  else if (answers.where === "several") candidates.push(points.several);
  else if (answers.where === "spreadsheets") candidates.push(points.spreadsheets);
  if (answers.tidy === "messy") candidates.push(points.messy);
  else if (answers.tidy === "unknown") candidates.push(points.unknown);
  if (answers.owner === "no" || answers.owner === "partly") candidates.push(points.owner);
  if (answers.stakes === "high") candidates.push(points.high);
  if (recommendations.some((r) => r.slug === "admin-and-data-re-entry")) candidates.push(points.integration);
  if (candidates.length === 0) candidates.push(points.good);

  return { recommendations, beforeYouStart: candidates.slice(0, MAX_POINTS) };
}

// Plain-text summary for the "Email me my result" request.
export function summarise(answers: Answers, result: Result): string {
  const lines: string[] = ["Recommended first:"];
  if (result.recommendations.length === 0) lines.push("- Nothing stood out");
  for (const r of result.recommendations) lines.push(`- ${r.title}: ${r.reason}`);
  lines.push("", "Before you start:");
  for (const p of result.beforeYouStart) lines.push(`- ${p.lead} ${p.body}`);
  lines.push("", "Answers:");
  for (const q of steps.flatMap((s) => s.questions)) {
    const label = q.options.find((o) => o.value === answers[q.id])?.label ?? "-";
    lines.push(`- ${q.text} ${label}`);
  }
  return lines.join("\n");
}
