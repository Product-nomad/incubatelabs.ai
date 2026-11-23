// Weekly check of the live site: every sitemap page loads, no external link is broken, no guide,
// example or the template describes a past date in the future tense, and no guide is overdue a
// review. Prints a report and exits 1 on any failure; the systemd unit's OnFailure sends it to Telegram.
// Usage: node scripts/weekly-check.mjs [base URL] [state file]
import fs from "node:fs";
import path from "node:path";
import { pastDatesInFutureTense, isOverdue } from "../src/lib/freshness.mjs";
import { isBroken } from "../src/lib/link-status.mjs";

const base = process.argv[2] ?? "https://incubatelabs.ai";
const stateFile = process.argv[3];
const REVIEW_DAYS = 60;
const CONCURRENCY = 4;
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36";
// CHECK_DATE (YYYY-MM-DD) runs the check as if on another day, to prove it fires.
const today = new Date(process.env.CHECK_DATE ?? Date.now());

async function status(url) {
  try {
    const res = await fetch(url, { redirect: "follow", headers: { "user-agent": UA }, signal: AbortSignal.timeout(20_000) });
    await res.body?.cancel();
    return res.status;
  } catch {
    return 0;
  }
}

const text = (html) =>
  html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, " ")
    .replace(/<\/(p|li|h[1-6]|tr|div)>/g, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+/g, " ");

async function pool(items, fn) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (i < items.length) {
        const item = items[i++];
        out.push(await fn(item));
      }
    }),
  );
  return out;
}

const failures = [];
const sitemap = await (await fetch(`${base}/sitemap-0.xml`)).text();
const pages = [...sitemap.matchAll(/<loc>https:\/\/incubatelabs\.ai([^<]*)<\/loc>/g)].map((m) => m[1]);
if (pages.length === 0) failures.push("sitemap has no pages");

const external = new Map();
for (const p of pages) {
  const res = await fetch(base + p, { headers: { "user-agent": UA } });
  if (res.status !== 200) {
    failures.push(`${p}: HTTP ${res.status}`);
    continue;
  }
  const html = await res.text();
  for (const [, href] of html.matchAll(/href="(https?:\/\/[^"#]+)"/g))
    if (!href.startsWith("https://incubatelabs.ai")) external.set(href, [...(external.get(href) ?? []), p]);
  if (/^\/(guides|examples|resources)\//.test(p))
    for (const s of pastDatesInFutureTense(text(html), today)) failures.push(`${p}: "${s}" is in the past`);
  if (/^\/(guides|resources)\//.test(p)) {
    const reviewed = html.match(/"dateModified":"(\d{4}-\d{2}-\d{2})"/)?.[1];
    if (reviewed && isOverdue(reviewed, today, REVIEW_DAYS)) failures.push(`${p}: last reviewed ${reviewed}, over ${REVIEW_DAYS} days ago`);
  }
}

const checked = await pool([...external.keys()], async (url) => [url, await status(url)]);
for (const [url, s] of checked) if (isBroken(s)) failures.push(`broken link (${s || "no response"}): ${url} on ${external.get(url).join(", ")}`);

const result = { checked_at: today.toISOString(), base, pages: pages.length, external_links: external.size, failures };
if (stateFile) {
  fs.mkdirSync(path.dirname(stateFile), { recursive: true });
  fs.writeFileSync(stateFile, JSON.stringify(result, null, 2));
}
console.log(`${pages.length} pages, ${external.size} external links, ${failures.length} failure(s)`);
for (const f of failures) console.log(`- ${f}`);
process.exit(failures.length ? 1 : 0);
