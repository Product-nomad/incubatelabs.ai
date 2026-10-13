// Shapes the worked-example Markdown (src/content/examples/) into ExampleLayout's markup
// (design/examples-2026-10/00-build-spec.md §1). The copy itself is never changed: this removes the
// H1 (the layout renders it from front matter), turns the opening "Worked example." line into a note
// box, wraps sections, and marks up the person-checks callout, the time-back table and the CTA.
import path from "node:path";
import GithubSlugger from "github-slugger";
import { fromHtml } from "hast-util-from-html";
import { toText } from "hast-util-to-text";
import { visit, SKIP } from "unist-util-visit";

const EXAMPLES_DIR = `${path.sep}src${path.sep}content${path.sep}examples${path.sep}`;

const el = (tagName, properties = {}, children = []) => ({ type: "element", tagName, properties, children });
const isEl = (n, tag) => n && n.type === "element" && (!tag || n.tagName === tag);
const textOf = (n) => toText(n).replace(/\s+/g, " ").trim();
const addClass = (n, c) => {
  const cur = n.properties.className || [];
  n.properties.className = [...(Array.isArray(cur) ? cur : [cur]), c];
};

const SECTION_CLASS = {
  "Where a person checks": "example-checks",
  "Time back": "example-time",
  // The missed-call example measures enquiries kept rather than hours.
  "What it's worth": "example-time",
  "How we'd start": "example-start",
};

// The person-and-tick glyph from the use-case illustrations (CustomerReplies.astro), cropped to the
// person and badge.
const PERSON_ICON = fromHtml(
  `<svg viewBox="273 107 38 40" width="38" height="40" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="290" cy="130" r="14" fill="#fbfaf7" stroke="#16181a" stroke-width="2.5"/>
    <circle cx="290" cy="125" r="4.5" stroke="#16181a" stroke-width="2"/>
    <path d="M282.5 138a8 7 0 0 1 15 0" stroke="#16181a" stroke-width="2"/>
    <circle cx="301" cy="117" r="7.5" fill="#1f5c45"/>
    <path d="M297.5 117l2.5 2.5 4.5-5" stroke="#fbfaf7" stroke-width="2"/>
  </svg>`,
  { fragment: true, space: "svg" },
).children.find((n) => n.type === "element");

export default function rehypeExample() {
  return (tree, file) => {
    const filePath = file.path || file.history?.[0] || "";
    if (!filePath.includes(EXAMPLES_DIR)) return;
    const id = path.basename(filePath, ".md");

    let nodes = tree.children.filter((n) => n.type !== "text" || n.value.trim() !== "");

    // 1. The H1 comes from front matter in the layout.
    const h1 = nodes.findIndex((n) => isEl(n, "h1"));
    if (h1 !== -1) nodes.splice(h1, 1);

    // 2. The opening "**Worked example.** …" line becomes a muted note box (shown once, here).
    const note = nodes.findIndex((n) => isEl(n, "p") && isEl(n.children[0], "strong") && textOf(n.children[0]) === "Worked example.");
    if (note === -1) throw new Error(`${id}: no opening "Worked example." line`);
    nodes[note] = el("div", { className: ["example-note"] }, [nodes[note]]);

    // 3. Group each H2 and what follows it into a section. Anything before the first H2 is the intro.
    const slugger = new GithubSlugger();
    const out = [];
    let current = el("div", { className: ["guide-intro"] }, []);
    for (const n of nodes) {
      if (isEl(n, "h2")) {
        if (current.children.length) out.push(current);
        const heading = textOf(n);
        n.properties.id = slugger.slug(heading);
        current = el("section", { className: ["guide-section", ...(SECTION_CLASS[heading] ? [SECTION_CLASS[heading]] : [])] }, [n]);
        continue;
      }
      current.children.push(n);
    }
    if (current.children.length) out.push(current);
    tree.children = out;

    const has = (s, c) => (s.properties.className || []).includes(c);
    for (const c of ["example-checks", "example-time", "example-start"]) {
      if (!out.some((s) => has(s, c))) throw new Error(`${id}: missing the section for .${c}`);
    }

    // 4. "Where a person checks": a callout with the person icon beside the heading.
    const checks = out.find((s) => has(s, "example-checks"));
    const [heading, ...body] = checks.children;
    checks.children = [el("div", { className: ["checks-head"] }, [el("span", { className: ["checks-icon"] }, [structuredClone(PERSON_ICON)]), heading]), ...body];

    // 5. "Time back": the bold hours line under the table.
    const time = out.find((s) => has(s, "example-time"));
    const line = time.children.find((n) => isEl(n, "p") && n.children.some((c) => isEl(c, "strong")));
    if (!line) throw new Error(`${id}: no bold hours line in the time-back section`);
    addClass(line, "time-line");

    // 6. Element-level touches, as in the guides.
    let cta = 0;
    const tables = [];
    visit(tree, "element", (n, index, parent) => {
      if (n.tagName === "a") {
        const href = String(n.properties.href || "");
        if (/^https?:\/\//.test(href)) n.properties.rel = ["noopener"];
        if (textOf(n) === "Talk it through →") {
          addClass(n, "btn-primary");
          cta += 1;
        }
      }
      if (n.tagName === "table" && parent && !(parent.properties?.className || []).includes("table-wrap")) {
        tables.push({ n, index, parent });
        return SKIP;
      }
    });
    if (cta !== 1) throw new Error(`${id}: expected one "Talk it through →" link, found ${cta}`);
    // Tables scroll sideways on narrow screens; the wrapper is focusable so keyboard users can scroll it.
    for (const { n, index, parent } of tables) {
      const above = parent.children.slice(0, index).reverse().find((c) => /^h[2-4]$/.test(c.tagName || ""));
      parent.children[index] = el("div", { className: ["table-wrap"], tabIndex: 0, role: "region", ariaLabel: above ? textOf(above) : "Table" }, [n]);
    }
  };
}
