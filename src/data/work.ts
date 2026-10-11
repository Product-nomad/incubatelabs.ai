// Projects (v1.1 spec §8). The page stays at /work/.
export interface WorkItem {
  label: string;
  name: string;
  // Code names are set in monospace; descriptive names in the serif.
  nameStyle: "mono" | "serif";
  description: string;
  // No href means the card isn't clickable (private work).
  href?: string;
  linkLabel?: string;
  external?: boolean;
  // Image slot: public/projects/<image>.webp is shown when it exists; until then, a solid panel.
  image: string;
  panel: "ink" | "accent-soft" | "band";
  // Shown on /work/ only, not on the home page.
  workPageOnly?: boolean;
}

export const work: WorkItem[] = [
  {
    label: "Agentic pipeline",
    name: "attestloop",
    nameStyle: "mono",
    description: "Reads regulatory documents, pulls out the obligations and maps them to control frameworks.",
    href: "https://github.com/Product-nomad/attestloop",
    linkLabel: "GitHub →",
    external: true,
    image: "attestloop",
    panel: "ink",
  },
  {
    label: "Live tool",
    name: "removepii",
    nameStyle: "mono",
    description:
      "Strips personal data from UK documents before they go near an AI. Runs on a local model, in memory only, with nothing uploaded.",
    href: "https://removepii.co.uk",
    linkLabel: "removepii.co.uk →",
    external: true,
    image: "removepii",
    panel: "accent-soft",
  },
  {
    label: "Autonomous agent",
    name: "publicguard",
    nameStyle: "mono",
    description:
      "Scans public GitHub repositories for exposed passwords and keys, then opens a polite issue for the owner, with a person checking each one first.",
    href: "https://github.com/Product-nomad/publicguard",
    linkLabel: "GitHub →",
    external: true,
    image: "publicguard",
    panel: "band",
  },
  {
    label: "Proof of concept",
    name: "Retail AI proof of concept",
    nameStyle: "serif",
    description:
      "A fictional retailer made ready for AI agents: orders placed through a standard interface, every call metered, a checkout app on top. It showed the data, not the AI, is most of the work. We measured the running cost per order: under a tenth of a penny.",
    image: "retail-poc",
    panel: "ink",
  },
  {
    label: "Free tool",
    name: "Readiness Check",
    nameStyle: "serif",
    description: "A free check on this site that points you to the jobs worth automating first.",
    href: "/readiness-check/",
    linkLabel: "Try it →",
    image: "readiness-check",
    panel: "accent-soft",
    workPageOnly: true,
  },
];
