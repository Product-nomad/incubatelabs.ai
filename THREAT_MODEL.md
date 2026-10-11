# incubatelabs.ai — Threat Model

Reissued 2026-10-11 for v1. The April v0 version assumed a fully static site with Cal.com booking; v1 adds a contact form endpoint, so that assumption no longer holds.

## Scope

The marketing site at `incubatelabs.ai` and its public GitHub repo: page content, the build, Cloudflare Pages hosting, the `/api/contact` Pages Function, the internal `incubatelabs-mailer` Worker, Cloudflare Turnstile, Cloudflare Email Routing (as used by the form and the `hello@` alias), the Google Calendar booking link, and the optional Plausible integration.

Out of scope: paid engagement deliverables (own threat models), and the underlying infrastructure of Cloudflare, Google and Plausible.

## Trust boundaries and data flow

```
Visitor browser
   │  GET (static HTML/CSS/JS from Cloudflare Pages)
   │  Turnstile widget  ──► challenges.cloudflare.com
   │  Plausible script  ──► plausible.io        (only if PUBLIC_PLAUSIBLE_DOMAIN set)
   │  "Book a call"     ──► Google Calendar appointment page (new tab, rel=noopener)
   │
   │  POST /api/contact  (name, email, business, message, turnstile token, honeypot)
   ▼
Pages Function  functions/api/contact.ts
   ├─ honeypot filled  → 200, nothing sent
   ├─ field validation → 400 on failure (length caps, email shape, no CR/LF in header fields)
   ├─ Turnstile siteverify (TURNSTILE_SECRET_KEY, Cloudflare secret) → 403 on failure
   └─ service binding MAILER
          ▼
      incubatelabs-mailer Worker (no routes, workers.dev off — reachable only via the binding)
          └─ send_email binding → Cloudflare Email Routing → FORM_DESTINATION (verified inbox, Worker secret)
```

Inbound mail to `hello@incubatelabs.ai` is forwarded by Email Routing to the same verified inbox.

**Trusted:** Cloudflare (hosting, Functions, Workers, Turnstile, Email Routing), Google (booking), Plausible (if enabled).
**Untrusted:** everything in the POST body; the visitor's browser and network.

Nothing is stored. There is no database, no log of enquiries on our side, and no first-party authentication.

## Sub-processors

| Sub-processor | What they process | Why |
|---|---|---|
| Cloudflare Pages / Workers | Request metadata (IP, user agent, time); form contents in transit | Hosting, form endpoint |
| Cloudflare Turnstile | Browser signals for the bot check | Form spam protection |
| Cloudflare Email Routing | Form enquiries and `hello@` mail, in transit | Delivery to Simon's inbox |
| Google Calendar | Details the visitor enters when booking | Booking record |
| Plausible Analytics (optional) | Aggregated, cookieless page-view events | Traffic insight |

All disclosed on `/privacy/`.

## Assumptions

- Secrets (`TURNSTILE_SECRET_KEY`, `FORM_DESTINATION`) live only in Cloudflare. `.dev.vars` is gitignored and holds Cloudflare's public test keys only.
- The mailer Worker is not publicly routable. If a route or workers.dev URL is ever added, it must check a shared secret first.
- The repository is public; nothing in source is sensitive. Simon's forwarding address is deliberately not in source.

## In-scope risks

| ID | Risk | Mitigation |
|---|---|---|
| R1 | Secret committed to the public repo | Secrets set via `wrangler secret`; `.env*` and `.dev.vars` gitignored. |
| R2 | Supply chain attack via npm | Lockfile committed; `npm ci` for builds. |
| R3 | Form spam / abuse | Turnstile verified server-side; honeypot; field length caps. |
| R4 | Email header injection via form fields | CR/LF rejected in name and email; visitor input never used in From/To; Subject is RFC 2047 encoded. |
| R5 | Mail relay abuse (sending to arbitrary addresses) | Destination fixed by secret; Email Routing only delivers to verified destination addresses. |
| R6 | Mailer Worker invoked directly | No routes, `workers_dev = false`, `preview_urls = false`; only callable via service binding. |
| R7 | Lost enquiries if mail fails | Visitor sees the failure message with the direct email address; no silent loss. |
| R8 | Misleading claims in copy | Copy is fixed by the v1 spec; no prices, client names or unverifiable claims. |
| R9 | DNS / domain compromise | Registrar 2FA; operational concern outside the repo. |

## Known gaps

- No CSP header yet. Allowed origins are now known (self, challenges.cloudflare.com, plausible.io if enabled); add via `public/_headers`.
- No rate limit beyond Turnstile. Add a Cloudflare rate-limiting rule on `/api/contact` if spam gets through.
- No automated tests for the Function beyond the local scenario checks recorded in `STATE.md`.
