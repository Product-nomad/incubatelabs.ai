export interface WorkItem {
  name: string;
  problem: string;
  // HTML allowed (internal links only).
  built: string;
  shows: string;
  href: string;
  linkLabel: string;
  external: boolean;
}

export const work: WorkItem[] = [
  {
    name: "attestloop",
    problem: "Regulations are long, and working out which obligations apply to you is slow, expert work.",
    built:
      "An agentic pipeline that reads regulatory documents, pulls out the obligations and maps them to control frameworks.",
    shows:
      'Serious multi-step AI work. It\'s the same approach behind our <a href="/use-cases/compliance-questionnaires/">compliance questionnaire</a> service.',
    href: "https://github.com/Product-nomad/attestloop",
    linkLabel: "GitHub →",
    external: true,
  },
  {
    name: "mysankeycom",
    problem: "Flows of energy, money or stock are hard to explain in a table.",
    built:
      "An AI-assisted builder for interactive Sankey diagrams. Describe the flow and get a clear, shareable chart.",
    shows: "Useful, good-looking tools, shipped end to end.",
    href: "https://github.com/Product-nomad/mysankeycom",
    linkLabel: "GitHub →",
    external: true,
  },
  {
    name: "idea-incubator",
    problem: "Good ideas get lost in notes apps and never get tested.",
    built:
      "A Telegram bot that runs a six-question discovery conversation about a new idea, gives honest critique, and saves each idea as a tidy document.",
    shows:
      "Practical automation doing one job well, which is exactly the shape of an Automation Sprint.",
    href: "https://github.com/Product-nomad/idea-incubator",
    linkLabel: "GitHub →",
    external: true,
  },
  {
    name: "Readiness Check",
    problem: "Most small businesses don't know where AI would actually help.",
    built: "A free tool on this site that points you to the jobs worth automating first.",
    shows: "A working tool you can try right now.",
    href: "/readiness-check/",
    linkLabel: "Try it →",
    external: false,
  },
];
