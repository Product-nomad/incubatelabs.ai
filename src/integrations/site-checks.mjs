// Build-time content checks on dist/ (v1.1 spec §11, guides spec §3 and §6). Any failure fails the build.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fromHtml } from "hast-util-from-html";
import { toText } from "hast-util-to-text";
import { visit, SKIP } from "unist-util-visit";

const BANNED = ["CPMAI", "TODO", "[TBC]", "[Screenshot", "Iraq", "earns its place", "Things I've built"];
// Square-bracket placeholders such as [Business name] or [Date]. Allowed only inside elements marked
// data-placeholders-ok (the policy template block and the two example blocks in the guides).
const PLACEHOLDER = /\[[A-Z][^\]\n]{0,80}\]/g;
const TITLE_MAX = 60;
// The one place a location may appear (src/data/site.ts `legal`).
const LEGAL_LINE = "a sole trader based in Huntingdon";
const DESCRIPTION_MAX = 155;

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? htmlFiles(p) : d.name.endsWith(".html") ? [p] : [];
  });
}

// Visible text plus JSON-LD, without CSS, other scripts or explicitly allowed placeholder blocks.
function checkedText(tree, { dropAllowed }) {
  const parts = [];
  visit(tree, "element", (n) => {
    if (n.tagName === "script" && n.properties.type === "application/ld+json") parts.push(toText(n));
  });
  const clone = structuredClone(tree);
  visit(clone, "element", (n, i, parent) => {
    const drop =
      n.tagName === "style" ||
      n.tagName === "script" ||
      (dropAllowed && n.properties.dataPlaceholdersOk !== undefined);
    if (drop && parent) {
      parent.children.splice(i, 1);
      return [SKIP, i];
    }
  });
  parts.push(toText(clone));
  return parts.join("\n");
}

export default function siteChecks() {
  return {
    name: "site-checks",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const errors = [];
        for (const file of htmlFiles(root)) {
          const page = "/" + path.relative(root, file).replace(/index\.html$/, "").split(path.sep).join("/");
          const html = fs.readFileSync(file, "utf8");
          const tree = fromHtml(html);
          const all = checkedText(tree, { dropAllowed: false });
          const outsideAllowed = checkedText(tree, { dropAllowed: true });

          for (const s of BANNED) if (all.includes(s)) errors.push(`${page}: banned string "${s}"`);
          if (all.includes("£") && page !== "/readiness-check/") errors.push(`${page}: "£" outside the Readiness Check`);
          const towns = all.split("Huntingdon").length - 1;
          const legal = all.split(LEGAL_LINE).length - 1;
          if (towns !== legal) errors.push(`${page}: "Huntingdon" outside the legal line`);
          for (const m of outsideAllowed.matchAll(PLACEHOLDER)) errors.push(`${page}: placeholder ${m[0]}`);

          if (page.startsWith("/404") || html.includes('name="robots" content="noindex"')) continue;
          const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
          const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
          const decode = (s) => s.replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
          if (decode(title).length > TITLE_MAX) errors.push(`${page}: title is ${decode(title).length} characters`);
          if (decode(desc).length > DESCRIPTION_MAX) errors.push(`${page}: meta description is ${decode(desc).length} characters`);
        }
        // /llms.txt: no prices, no location, and the same one-line description as the JSON-LD.
        const llms = fs.readFileSync(path.join(root, "llms.txt"), "utf8");
        if (llms.includes("£")) errors.push(`/llms.txt: "£"`);
        if (llms.includes("Huntingdon")) errors.push(`/llms.txt: location`);
        const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
        const summary = llms.match(/^> (.*)$/m)?.[1];
        const decode = (s) => s?.replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
        const homeMeta = [
          /<meta name="description" content="([^"]*)"/,
          /<meta property="og:description" content="([^"]*)"/,
          /<meta name="twitter:description" content="([^"]*)"/,
        ].map((re) => decode(home.match(re)?.[1]));
        if (!summary || !home.includes(`"description":${JSON.stringify(summary)}`) || homeMeta.some((d) => d !== summary))
          errors.push("/llms.txt summary, home meta/og/twitter descriptions and Organization JSON-LD description differ");
        if (errors.length) {
          errors.forEach((e) => logger.error(e));
          throw new Error(`site-checks: ${errors.length} problem(s) in dist/`);
        }
        logger.info("banned strings, placeholders, titles and descriptions: OK");
      },
    },
  };
}
