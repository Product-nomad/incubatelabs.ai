// "What we commit to" (home and /how-we-work/) and "Bringing your team with you" (/how-we-work/).
// Also listed in /llms.txt. Trust, fit and change sprint, 2026-10.
export interface LeadItem {
  lead: string;
  text: string;
}

export const commitmentsIntro = "Five promises that apply to every project, whatever its size.";

export const commitments: LeadItem[] = [
  {
    lead: "We measure before and after.",
    text: "Before we build anything, we record how long the work takes today and agree where the time saved should go. A quarter (12 weeks) after go-live, we measure the same work the same way and check both: the hours back, and whether they went where you planned.",
  },
  {
    lead: "You own what we build.",
    text: "The workflows, prompts, code and documentation are yours. If we stop working together, everything keeps running and you can take it elsewhere.",
  },
  {
    lead: "Your data stays in the UK or EU, and is never used to train AI.",
    text: "We only use AI services that commit to both in their terms.",
  },
  {
    lead: "A person signs off what matters.",
    text: "Anything that goes to a customer, moves money or decides something about a person is checked by someone on your team.",
  },
  {
    lead: "We tell you when AI isn't the answer.",
    text: "If a simpler fix would do, we'll say so, even if it means a smaller project.",
  },
];

// Delivered with every build: shown with the handover step on /how-we-work/ and listed under
// "Our commitments" in /llms.txt.
export const evidencePack: LeadItem = {
  lead: "An evidence pack with every build.",
  text: "A short document covering what the AI does, which tools and data it uses, where a person checks, how it's monitored and what to do if it goes wrong. When a customer's supplier questionnaire asks about your use of AI, you have the answers.",
};

// The commitment shown with the person-and-tick icon.
export const PERSON_COMMITMENT = 3;

export const UCL_STUDY_URL = "https://doi.org/10.1002/ejsp.674";

export const teamChange: LeadItem[] = [
  {
    lead: "The person who does the job helps design it.",
    text: "We start with whoever does the work today. They know the shortcuts, the exceptions and what goes wrong.",
  },
  {
    lead: "The old way keeps running at first.",
    text: "For the first two weeks, the new way runs alongside the current one, so nobody relies on something they haven't seen work.",
  },
  {
    lead: "One go-to person on your team.",
    text: "Someone nearby who knows how it works and can answer questions, backed by us.",
  },
  {
    lead: "A short check-in every fortnight.",
    text: "Fifteen minutes to hear what's awkward and fix it while it's still small.",
  },
  {
    lead: "Measured at 12 weeks.",
    text: "By then the new way is usually just how things are done, and the hours back show in your numbers.",
  },
];

export const teamChangeClosing = "It takes the parts of the job people dislike, not the job.";
