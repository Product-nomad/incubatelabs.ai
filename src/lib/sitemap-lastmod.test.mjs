import { test } from "node:test";
import assert from "node:assert/strict";
import { reviewedDates, lastmodFor } from "./sitemap-lastmod.mjs";

const guide = `---
slug: /guides/uk-ai-act/
last_reviewed: 2026-11-23
---
Body mentioning last_reviewed: 1999-01-01`;

test("reads slug and last_reviewed from front matter only", () => {
  assert.deepEqual(reviewedDates([guide]), new Map([["/guides/uk-ai-act/", "2026-11-23"]]));
});

test("skips files without both fields", () => {
  assert.equal(reviewedDates(["---\nslug: /guides/x/\n---\n"]).size, 0);
});

test("a reviewed page's lastmod is its review date", () => {
  const dates = new Map([["/guides/uk-ai-act/", "2026-11-23"]]);
  assert.equal(lastmodFor("https://incubatelabs.ai/guides/uk-ai-act/", dates), "2026-11-23");
});

test("a page with no review date gets no lastmod rather than the build time", () => {
  assert.equal(lastmodFor("https://incubatelabs.ai/about/", new Map()), undefined);
});
