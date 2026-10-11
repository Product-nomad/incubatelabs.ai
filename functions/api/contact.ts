// POST /api/contact
//
// 1. Drops honeypot submissions silently.
// 2. Validates fields.
// 3. Verifies the Turnstile token server-side.
// 4. Hands the enquiry to the incubatelabs-mailer Worker (service binding),
//    which sends it through Cloudflare Email Routing. Pages Functions can't
//    hold a send_email binding themselves.
//
// Nothing is stored. Works with fetch (Accept: application/json) and with a
// plain no-JS form POST, which is redirected to /contact/thanks/.

interface Env {
  TURNSTILE_SECRET_KEY: string;
  MAILER: Fetcher;
}

type Source = "contact" | "readiness-check";

export interface Enquiry {
  source: Source;
  name: string;
  email: string;
  business: string;
  message: string;
}

const LIMITS = { name: 200, email: 320, business: 200, message: 5000 };
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

const FAILURE_HTML = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Contact | Incubate Labs</title></head><body style="font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem;color:#16181a;background:#fbfaf7"><p>Sorry, that didn't send. Please email <a href="mailto:hello@incubatelabs.ai?subject=Enquiry%20from%20incubatelabs.ai">hello@incubatelabs.ai</a> instead.</p><p><a href="/contact/">Back to the contact page</a></p></body></html>`;

function field(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validate(form: FormData): Enquiry | null {
  const source: Source = field(form, "source") === "readiness-check" ? "readiness-check" : "contact";
  const enquiry: Enquiry = {
    source,
    name: field(form, "name"),
    email: field(form, "email"),
    business: field(form, "business"),
    message: field(form, "message"),
  };
  // The Readiness Check only asks for an email address.
  if (source === "contact" && !enquiry.name) return null;
  if (!enquiry.message || !EMAIL_RE.test(enquiry.email)) return null;
  for (const key of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
    if (enquiry[key].length > LIMITS[key]) return null;
  }
  // Name and email end up in mail headers.
  if (/[\r\n]/.test(enquiry.name + enquiry.email)) return null;
  return enquiry;
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  if (!token || !secret) return false;
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  if (!res.ok) return false;
  const outcome = (await res.json()) as { success?: boolean };
  return outcome.success === true;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const wantsJson = (request.headers.get("Accept") || "").includes("application/json");
  const succeed = () =>
    wantsJson
      ? Response.json({ ok: true })
      : Response.redirect(new URL("/contact/thanks/", request.url).toString(), 303);
  const fail = (status: number, error: string) =>
    wantsJson
      ? Response.json({ ok: false, error }, { status })
      : new Response(FAILURE_HTML, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail(400, "bad_request");
  }

  // Honeypot: pretend it worked, send nothing.
  if (field(form, "website")) return succeed();

  const enquiry = validate(form);
  if (!enquiry) return fail(400, "invalid");

  const human = await verifyTurnstile(
    field(form, "cf-turnstile-response"),
    env.TURNSTILE_SECRET_KEY,
    request.headers.get("CF-Connecting-IP"),
  );
  if (!human) return fail(403, "turnstile");

  const sent = await env.MAILER.fetch("https://mailer.internal/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(enquiry),
  });
  if (!sent.ok) return fail(502, "send_failed");

  return succeed();
};

