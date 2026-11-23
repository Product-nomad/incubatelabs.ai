// Which HTTP results mean an external link is broken. Sites such as doi.org, iso.org and Euronews
// refuse automated requests (401/403/406/429) while working in a browser, so those don't count.
// 0 means the request itself failed (DNS, TLS, timeout).
const BOT_BLOCKS = new Set([401, 403, 406, 429]);

export function isBroken(status) {
  return status === 0 || (status >= 400 && !BOT_BLOCKS.has(status));
}
