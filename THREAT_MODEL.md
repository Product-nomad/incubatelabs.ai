# incubatelabs.ai — Threat Model

Phase: **Frame** (this document is one of the gate artefacts).

## Scope

The static marketing site at `incubatelabs.ai` (and the GitHub repo source). Includes the page content, the build pipeline, the Cloudflare Pages hosting, the Cal.com booking embed, the Plausible analytics integration, and any forms / lead capture that live on the site.

Out of scope: actual paid engagement deliverables (those have their own threat models per project), Cal.com / Plausible / Cloudflare's underlying infrastructure, Cloudflare Email Routing.

## Trust boundaries and data flow

```
Visitor browser
   │  [HTTP GET]
   ▼
Cloudflare CDN ── serves prebuilt static HTML/CSS/JS
   │
   ├─► Plausible /script.js  (analytics, no cookies, optional)
   ├─► Cal.com embed         (booking, when visitor clicks Book)
   └─► No backend on our side; nothing is processed server-side.

Visitor books a call
   │
   ▼
Cal.com (data controller for the booking record)
   │
   ▼
Calendar invite + email to operator's inbox
```

**Trusted:** Cloudflare (host + CDN), Plausible (analytics), Cal.com (booking).
**Not under our control:** the visitor's browser, their network path.

There is no first-party server, no database, no first-party authentication. The site cannot be compromised in a way that exposes user data, because the site doesn't hold any.

## Sub-processors

| Sub-processor | What they process | Why |
|---|---|---|
| Cloudflare Pages | Standard request metadata (IP, user agent, timestamp) | Hosting + CDN |
| Plausible Analytics | Aggregated, cookieless page-view events | Traffic insight |
| Cal.com | Name, email, time selected, any free-text on the booking | Booking record |
| Cloudflare Email Routing | Inbound mail forwarding to operator's inbox | `hello@incubatelabs.ai` alias |

Disclosed in the public `/privacy/` page.

## Assumptions

- The site stays static. If it gains a backend (form submissions, gated content), this threat model is invalidated and must be reissued.
- Cal.com / Plausible's own privacy and security postures are accepted on behalf of visitors.
- The repository is intentionally public; nothing in the source is sensitive.

## In-scope risks

| ID | Risk | Mitigation |
|---|---|---|
| R1 | A secret committed to the public repo | `.env` in `.gitignore`; `.env.example` only ships placeholder values; `PUBLIC_*` env vars are public-by-design. |
| R2 | Supply chain attack via npm | Dependencies pinned by major version; `npm audit` to be wired into CI. |
| R3 | Build pipeline compromise | Cloudflare Pages builds from the public repo. Build commands are visible in `package.json`. No build-time secrets. |
| R4 | Analytics / advertising scripts firing without consent | None ship. Plausible is cookieless; no AdSense on this site (unlike `999callsimulator`). |
| R5 | Booking spam abuse | Cal.com's own anti-abuse posture; alternative direct email is exposed and may be scraped (acceptable). |
| R6 | Misleading claims in copy | Every methodology and engagement claim should map to either a public artefact or a documented Incubate phase. Reviewable by anyone via the public repo. |
| R7 | DNS hijack / domain compromise | Domain registrar account uses 2FA; nameservers locked at the registrar. Out of scope of repo defence; operational concern. |

## Known gaps

- No automated tests on the site itself (it's content; smoke-test on each deploy).
- No CSP header configured. Should be added once Cal.com / Plausible are live and we know exactly which origins to allow.
- No Subresource Integrity on third-party scripts. Plausible publishes hashes; can be added.
- `og:image` social-card asset not yet present. Until shipped, link previews on social are bare.

## Adversarial considerations

The site is a public marketing surface. Realistic adversaries:

- **Drive-by automated scanners** — handled by Cloudflare's default protections.
- **Reputation attacks via spammy bookings** — Cal.com handles abuse signals; if it becomes a problem, gate bookings behind a one-question pre-check.
- **Copy plagiarism** — methodology vocabulary is intended to be public and citeable; the brand name is what's defended (registered domain).
