// Shapes the guide Markdown (src/content/guides/) into the guide layout's markup. The copy itself is
// never changed: this only removes what the layout renders from front matter, wraps sections and
// marks up the FAQ, callout, sources, tables and the policy template block.
import path from "node:path";
import GithubSlugger from "github-slugger";
import { toText } from "hast-util-to-text";
import { visit, SKIP } from "unist-util-visit";

const GUIDES_DIR = `${path.sep}src${path.sep}content${path.sep}guides${path.sep}`;

// Example blocks that legitimately show [square-bracket] placeholders. The dist check
// (src/integrations/site-checks.mjs) fails the build on placeholders anywhere else.
const PLACEHOLDER_OK = {
  "ai-policy-template": "template",
  "eu-ai-act-article-50-chatbots": "blockquote",
  "ai-literacy-training-staff": "record-table",
};

const el = (tagName, properties = {}, children = []) => ({ type: "element", tagName, properties, children });
const text = (value) => ({ type: "text", value });
const isEl = (n, tag) => n && n.type === "element" && (!tag || n.tagName === tag);
const textOf = (n) => toText(n).replace(/\s+/g, " ").trim();
const addClass = (n, c) => {
  const cur = n.properties.className || [];
  n.properties.className = [...(Array.isArray(cur) ? cur : [cur]), c];
};

const SECTION_CLASS = {
  "How we can help": "guide-help",
  "Frequently asked questions": "guide-faq",
  Sources: "guide-sources",
};

const DOWNLOAD_PLACEHOLDER = "[Download Word (.docx)]";

function downloadButtons() {
  const base = "/resources/ai-policy-template/incubatelabs-ai-policy-template";
  return el("div", { className: ["template-actions"] }, [
    el("div", { className: ["template-buttons"] }, [
      el("a", { href: `${base}.docx`, download: "", className: ["btn-primary"] }, [text("Download Word (.docx)")]),
      el("a", { href: `${base}.md`, download: "", className: ["btn-secondary"] }, [text("Download Markdown (.md)")]),
      el("button", { type: "button", className: ["btn-secondary"], dataCopyPolicy: "" }, [text("Copy to clipboard")]),
      el("span", { className: ["copy-status"], role: "status", ariaLive: "polite" }, []),
    ]),
  ]);
}

export default function rehypeGuide() {
  return (tree, file) => {
    const filePath = file.path || file.history?.[0] || "";
    if (!filePath.includes(GUIDES_DIR)) return;
    const id = path.basename(filePath, ".md");
    const allow = PLACEHOLDER_OK[id];

    // Work on element children only; drop the "\n" text nodes between blocks.
    let nodes = tree.children.filter((n) => n.type !== "text" || n.value.trim() !== "");

    // 1. The H1 and the "Last reviewed" line come from front matter in the layout.
    const h1 = nodes.findIndex((n) => isEl(n, "h1"));
    if (h1 !== -1) nodes.splice(h1, 1);
    nodes = nodes.filter(
      (n) => !(isEl(n, "p") && isEl(n.children[0], "strong") && textOf(n.children[0]).startsWith("Last reviewed:")),
    );

    // 2. Policy template: the block between the two rules goes into a document panel. The download
    //    placeholder line becomes real buttons; "No email needed." stays as written.
    if (id === "ai-policy-template") {
      nodes = nodes.map((n) => {
        if (!(isEl(n, "p") && textOf(n).includes(DOWNLOAD_PLACEHOLDER))) return n;
        const strong = n.children.find((c) => isEl(c, "strong"));
        return el("div", { className: ["template-download"] }, [
          ...(strong ? [el("p", { className: ["template-note"] }, [strong])] : []),
          downloadButtons(),
        ]);
      });
      const rules = nodes.flatMap((n, i) => (isEl(n, "hr") ? [i] : []));
      if (rules.length !== 2) throw new Error(`${id}: expected two horizontal rules, found ${rules.length}`);
      const inner = nodes.slice(rules[0] + 1, rules[1]);
      const heading = isEl(inner[0], "h2") ? [inner.shift()] : [];
      const panel = el("div", { className: ["template-doc"], dataPlaceholdersOk: "" }, inner);
      nodes = [...nodes.slice(0, rules[0]), ...heading, panel, ...nodes.slice(rules[1] + 1)];
    }

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

    // 4. FAQ: each "**Question?**\nAnswer" paragraph becomes a question heading and an answer.
    //    The FAQPage JSON-LD is built from exactly this visible text.
    const faq = [];
    const faqSection = out.find((s) => (s.properties.className || []).includes("guide-faq"));
    if (faqSection) {
      faqSection.children = faqSection.children.map((n) => {
        if (!(isEl(n, "p") && isEl(n.children[0], "strong"))) return n;
        const [q, ...rest] = n.children;
        if (rest[0]?.type === "text") rest[0] = text(rest[0].value.replace(/^\s+/, ""));
        const answer = el("p", {}, rest);
        faq.push({ q: textOf(q), a: textOf(answer) });
        return el("div", { className: ["faq-item"] }, [el("h3", {}, q.children), answer]);
      });
    }
    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};
    file.data.astro.frontmatter.faq = faq;

    // 5. Element-level touches.
    let tableCount = 0;
    const tables = [];
    visit(tree, "element", (n, index, parent) => {
      // Soft line breaks the writers used ("**Owner:** …\n**Approved on:** …") render as breaks.
      if (n.tagName === "p") {
        n.children = n.children.flatMap((c) =>
          c.type === "text" && c.value.includes("\n")
            ? c.value.split("\n").flatMap((part, i) => (i ? [el("br"), text(part)] : [text(part)]))
            : [c],
        );
      }
      if (n.tagName === "a") {
        const href = String(n.properties.href || "");
        if (/^https?:\/\//.test(href)) n.properties.rel = ["noopener"];
        if (textOf(n) === "Talk it through →") addClass(n, "btn-primary");
      }
      if (n.tagName === "blockquote" && allow === "blockquote") n.properties.dataPlaceholdersOk = "";
      if (n.tagName === "table" && parent && !(parent.properties?.className || []).includes("table-wrap")) {
        tableCount += 1;
        tables.push({ n, index, parent });
        return SKIP;
      }
    });
    // Tables scroll sideways on narrow screens; the wrapper is focusable so keyboard users can scroll it.
    tables.forEach(({ n, index, parent }, i) => {
      // Label the scroll region with the nearest heading above the table.
      const above = parent.children.slice(0, index).reverse().find((c) => /^h[2-4]$/.test(c.tagName || ""));
      const heading = above ? textOf(above) : "Table";
      const wrap = el("div", { className: ["table-wrap"], tabIndex: 0, role: "region", ariaLabel: heading }, [n]);
      if (allow === "record-table" && i === tableCount - 1) wrap.properties.dataPlaceholdersOk = "";
      parent.children[index] = wrap;
    });
  };
}
