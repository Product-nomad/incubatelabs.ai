// The three engagement sizes, shared by the home page and /how-we-work/ (v1.1 spec §7).
export interface Engagement {
  name: string;
  body: string;
  goodIf: string;
  // Number of hexagons shown.
  size: number;
  featured?: boolean;
}

export const engagements: Engagement[] = [
  {
    name: "Quick Win",
    body: "One task, one fix. A small, fast piece of work that shows whether AI is worth it for your business.",
    goodIf: "Good if you want to try AI on one specific job before committing further.",
    size: 1,
  },
  {
    name: "Automation Sprint",
    body: "A single workflow automated end to end: inputs, processing, checks and the hand-off into your systems, with a fixed scope and a clear result.",
    goodIf: "Good if one workflow is clearly costing you time every week.",
    size: 2,
    featured: true,
  },
  {
    name: "Operations Uplift",
    body: "Several related workflows planned and delivered together, so they work as one system rather than a collection of separate fixes.",
    goodIf: "Good if several connected jobs need sorting at once.",
    size: 3,
  },
];
