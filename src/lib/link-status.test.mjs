import { test } from "node:test";
import assert from "node:assert/strict";
import { isBroken } from "./link-status.mjs";

test("missing pages, server errors and unreachable hosts are broken", () => {
  for (const s of [404, 410, 500, 503, 0]) assert.equal(isBroken(s), true, String(s));
});

test("success and redirects are fine", () => {
  for (const s of [200, 202, 301, 308]) assert.equal(isBroken(s), false, String(s));
});

test("bot blocks aren't evidence the page is gone", () => {
  for (const s of [401, 403, 406, 429]) assert.equal(isBroken(s), false, String(s));
});
