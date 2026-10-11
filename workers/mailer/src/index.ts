// incubatelabs-mailer
//
// Internal-only Worker (no routes, workers.dev disabled). Reached solely via
// the MAILER service binding from the Pages Function at /api/contact, which
// has already checked Turnstile and validated the fields.
//
// Sends the enquiry to Simon's forwarding inbox through Cloudflare Email
// Routing. The destination address is a secret (FORM_DESTINATION) so it never
// lands in this public repo; it must be a verified Email Routing destination.

import { EmailMessage } from "cloudflare:email";

interface Env {
  SEND_EMAIL: SendEmail;
  FORM_DESTINATION: string;
}

interface Enquiry {
  source: "contact" | "readiness-check";
  name: string;
  email: string;
  business: string;
  message: string;
}

const FROM = "form@incubatelabs.ai";

// RFC 2047 encoded-word, so non-ASCII names survive the Subject line.
function encodeHeader(text: string): string {
  return /^[\x20-\x7e]*$/.test(text) ? text : `=?UTF-8?B?${base64(text)}?=`;
}

function base64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function buildMessage(e: Enquiry, to: string): string {
  const subject =
    e.source === "readiness-check"
      ? "Readiness Check result request"
      : `Website enquiry from ${e.name}${e.business ? ` (${e.business})` : ""}`;
  const lines =
    e.source === "readiness-check"
      ? [`Email: ${e.email}`, "", "Readiness Check result:", "", e.message]
      : [`Name: ${e.name}`, `Email: ${e.email}`, `Business: ${e.business || "-"}`, "", "What's taking up too much time?", "", e.message];
  const body = (base64(lines.join("\r\n")).match(/.{1,76}/g) || []).join("\r\n");
  return [
    `From: "Incubate Labs website" <${FROM}>`,
    `To: <${to}>`,
    `Reply-To: <${e.email}>`,
    `Subject: ${encodeHeader(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@incubatelabs.ai>`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="utf-8"',
    "Content-Transfer-Encoding: base64",
    "",
    body,
  ].join("\r\n");
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
    if (!env.FORM_DESTINATION) return new Response("Not configured", { status: 500 });
    const enquiry = (await request.json()) as Enquiry;
    try {
      const raw = buildMessage(enquiry, env.FORM_DESTINATION);
      await env.SEND_EMAIL.send(new EmailMessage(FROM, env.FORM_DESTINATION, raw));
      return new Response("sent");
    } catch (err) {
      console.error("send failed", err instanceof Error ? err.message : err);
      return new Response("send failed", { status: 502 });
    }
  },
};
