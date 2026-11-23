// Content-Security-Policy built from the site's own inline scripts. Each inline <script> is allowed
// by its sha256 hash, so a script that wasn't in the build can't run. Styles stay 'unsafe-inline'
// (the stylesheet is inlined and many elements carry style attributes). Turnstile is the only
// third party: its script and its challenge frame load from challenges.cloudflare.com.
import { createHash } from "node:crypto";

const TURNSTILE = "https://challenges.cloudflare.com";

export function inlineScriptHashes(html) {
  return [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter(([, attrs]) => !/\bsrc=/.test(attrs) && !/application\/ld\+json/.test(attrs))
    .map(([, , body]) => `'sha256-${createHash("sha256").update(body).digest("base64")}'`);
}

export function contentSecurityPolicy(hashes) {
  return [
    "default-src 'self'",
    `script-src 'self' ${TURNSTILE} ${hashes.join(" ")}`.trimEnd(),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    `frame-src ${TURNSTILE}`,
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}
