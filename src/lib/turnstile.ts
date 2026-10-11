// Turnstile site key is public. In local dev fall back to Cloudflare's
// always-pass test key so forms can be exercised without real keys.
export const turnstileSiteKey: string =
  import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || (import.meta.env.DEV ? "1x00000000000000000000AA" : "");
