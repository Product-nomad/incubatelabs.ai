// One 1200×630 social card per worked example and the /examples/ index, from the v1.1 OG source
// (design/v1.1/og-image-source.html) with the page H1 as the headline. Run as vpc from the repo root:
//   PLAYWRIGHT=/path/to/node_modules/playwright node design/examples-2026-10/og/build-og.mjs
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");

const root = process.cwd();
const source = fs.readFileSync(path.join(root, "design/v1.1/og-image-source.html"), "utf8");
const dir = path.join(root, "src/content/examples");
const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const pages = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const h1 = fs.readFileSync(path.join(dir, f), "utf8").match(/^h1: "(.*)"$/m)?.[1];
    if (!h1) throw new Error(`${f}: no h1 in front matter`);
    return { out: `${path.basename(f, ".md")}.png`, h1 };
  });
pages.push({ out: "examples.png", h1: "Worked examples" });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const { out, h1 } of pages) {
  const html = source.replace(/<h1>.*<\/h1>/, `<h1>${escape(h1)}</h1>`);
  // Load from a file so the file:// @font-face URLs in the source resolve.
  const tmp = path.join(os.tmpdir(), `og-${out}.html`);
  fs.writeFileSync(tmp, html);
  await page.goto(`file://${tmp}`, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  // Long headlines step the size down until they clear the URL line (top 470px).
  await page.evaluate(() => {
    const h = document.querySelector("h1");
    let size = 66;
    while (h.getBoundingClientRect().bottom > 440 && size > 40) {
      size -= 2;
      h.style.fontSize = `${size}px`;
    }
  });
  const loaded = await page.evaluate(() => document.fonts.check('600 66px "Source Serif 4"') && document.fonts.check("600 30px Inter"));
  if (!loaded) throw new Error(`${out}: fonts did not load`);
  await page.screenshot({ path: path.join(root, "public/og", out) });
  fs.rmSync(tmp);
  console.log(out, h1);
}
await browser.close();
