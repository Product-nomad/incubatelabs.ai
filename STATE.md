# incubatelabs.ai — STATE

**Goal**: Get v1 of incubatelabs.ai live and indexed: a lead-generation site for practical AI and automation for UK micro and small businesses without an in-house IT team. AI services lead; web design is an add-on.
**Phase**: Build (v1 on branch `v1-sme-site`, not yet deployed).
**Last touched**: 2026-10-11.

## What's done (v1-sme-site)
- April v0 pages removed (methodology, services, free triage, PackageCard).
- New theme (ink / paper / forest-green accent, Source Serif 4 + Inter), Nav with `<details>` mobile menu, Footer, CallToAction, UseCaseCard, WorkCard.
- Pages: home, use-cases index + 6 detail pages (from `src/data/useCases.ts`), how-we-work, work, about, contact, contact/thanks (noindex, not in sitemap), privacy, 404.
- Sitemap via `@astrojs/sitemap`; robots.txt points at `sitemap-index.xml`.
- Contact form: `functions/api/contact.ts` (honeypot, validation, Turnstile) → service binding → `workers/mailer` (send_email via Email Routing). See DECISIONS 2026-10-11.
- Local checks passed 2026-10-11: build, banned-string scan, internal links (except `/readiness-check/`), form scenarios against `wrangler dev` (valid, no token → 403, honeypot dropped, no-JS → 303 `/contact/thanks/`, bad email / header injection → 400), screenshots at 1280 and 390 with no horizontal scroll (`.screens/`, gitignored).

## Blocked on Simon
- **Readiness Check** (`/readiness-check/`): build gate. Proposal adapted from `ai-adoption-compass` awaiting sign-off. Until built, the links to it from home, footer, contact and `/work/` are broken.
- **`bookingUrl`** in `src/data/site.ts`: the Book a call panel is hidden until it's set.
- **Forwarding inbox** for the form and `hello@`.
- **Cloudflare credentials** (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`) not present on this machine.

## Before launch
1. `bookingUrl` set
2. Turnstile keys set (`PUBLIC_TURNSTILE_SITE_KEY` build var; `TURNSTILE_SECRET_KEY` Pages secret)
3. Email Routing for hello@ and the form destination verified (`FORM_DESTINATION` mailer secret)
4. Simon reviews the About page wording and the form reply-time wording, and adds a photo
5. Custom domain
6. Search Console sitemap

## Stale docs
- `ENGAGEMENT_PROTOCOL.md` and `CONTEXT.md` still describe the April packages (with prices), `/services/` pages and Cal.com. Rewrite before linking to either.
- `THREAT_MODEL.md` was reissued for v1 on 2026-10-11.

## Key files
- `src/data/site.ts`, `src/data/useCases.ts`, `src/data/work.ts` — content data
- `src/layouts/Layout.astro` — head meta, JSON-LD, fonts, Plausible (conditional)
- `functions/api/contact.ts` — form endpoint
- `workers/mailer/` — internal mail-sending Worker (deployed separately)
- `wrangler.toml` — Pages project config (service binding)
