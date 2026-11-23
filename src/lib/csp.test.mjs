import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { inlineScriptHashes, contentSecurityPolicy } from "./csp.mjs";

const sha = (s) => `'sha256-${createHash("sha256").update(s).digest("base64")}'`;

test("hashes inline scripts exactly as written, whitespace included", () => {
  const html = `<script>\n  run();\n</script><script is:inline>a()</script>`;
  assert.deepEqual(inlineScriptHashes(html), [sha("\n  run();\n"), sha("a()")]);
});

test("skips external scripts and JSON-LD, which CSP doesn't hash", () => {
  const html = `<script src="/x.js"></script><script type="application/ld+json">{"a":1}</script>`;
  assert.deepEqual(inlineScriptHashes(html), []);
});

test("policy allows only the given hashes and Turnstile for scripts, and blocks framing", () => {
  const csp = contentSecurityPolicy(["'sha256-abc'"]);
  assert.match(csp, /script-src 'self' https:\/\/challenges\.cloudflare\.com 'sha256-abc'(;|$)/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /object-src 'none'/);
  assert.doesNotMatch(csp.match(/script-src[^;]*/)[0], /unsafe-inline/);
});
