# Changelog

All notable user-visible changes. Format: [Keep a Changelog](https://keepachangelog.com/).

## [1.3.0] — 2026-10-12

### Changed
- "Where we can help" cards, the websites card and use-case page headers use new animated illustrations that play once when scrolled into view and replay on hover or focus. Reduced motion and no-JS show the final state.

## [1.2.1] — 2026-10-12

### Added
- Site-wide, dismissible announcement bar linking to the EU AI Act guide (not shown on the guide itself). Dismissal is remembered per campaign and applied before first paint.

## [1.2.0] — 2026-10-12

### Added
- AI rules guides: /guides/ index, "Does the EU AI Act apply to your UK business?", "EU AI Act Article 50", "Is there a UK AI Act?" and "AI literacy training for staff", each with a last-reviewed date, Article, BreadcrumbList and FAQPage structured data, and its own social image.
- Free AI policy template at /resources/ai-policy-template/, with Word (.docx) and Markdown downloads generated at build time and a copy-to-clipboard button. No email gate.
- Footer "Guides" column; home "Sound familiar?" links "no rules" to the template; the AI email replies page links to the Article 50 guide.
- Build-time checks on dist/: banned strings, stray [placeholders], title and description lengths. A failure fails the build.

## [1.1.0] — 2026-10-11

### Added
- "Lost day" interactive hero with a sourced stats strip.
- "Sound familiar?" checklist, use-case illustrations, "What gets asked for / what often fixes it" list.
- Cost-check section with an illustrative payback chart, on the home page and (cards only) How we work.
- Readiness Check rough annual cost estimate.
- Use-case pages: "Where it fits", "What it costs" and "Questions we get asked" sections; Service, BreadcrumbList and FAQPage structured data.
- Open Graph image; `_headers` (HSTS, frame and content-type options, immutable asset caching); sitemap `lastmod`.

### Changed
- Use-case pages renamed to search wording, with 301 redirects: Invoice & document processing, Data entry automation, Automated reporting, AI email replies, Security questionnaires (Quotes & proposals unchanged).
- "Things I've built" is now "Projects" (still at /work/), with new project cards.
- Titles and meta descriptions rewritten from the SEO research; all titles 60 characters or fewer, descriptions 155 or fewer.
- Engagement cards show size with hexagons; Automation Sprint marked "Where most clients start".
- CSS inlined; heading and body fonts preloaded (removes the layout shift on /privacy/).

### Removed
- Location from the footer, contact page, metadata and JSON-LD (legal line kept for now).
- The Iraq entry on About.

## [1.0.0-draft] — 2026-10-11

### Changed
- Repositioned for UK small businesses without an IT team. New copy throughout.
- New visual design: ink on warm paper, forest-green accent, Source Serif 4 headings, Inter body.
- Contact page rewritten: form, Google Calendar booking (hidden until the URL is set) and email.
- Privacy notice rewritten for the form, Turnstile and Google Calendar.

### Added
- Readiness Check: 13-question, three-step, in-browser check that recommends which use cases to automate first, with data-readiness prep points. Adapted from `ai-adoption-compass`.
- Six use-case pages generated from `src/data/useCases.ts`, plus an index.
- How we work, Things I've built, About, 404 and contact thank-you pages.
- Contact form backend: Pages Function with Turnstile, honeypot and validation, sending via an internal Email Routing Worker.
- Sitemap (`@astrojs/sitemap`), favicon, JSON-LD `ProfessionalService`, Open Graph `en_GB`.
- Committed `package-lock.json`.

### Removed
- Methodology, services, package detail and free triage pages, and all published prices.

### Pending
- Readiness Check wording sign-off, booking URL, Cloudflare setup and deploy. See `STATE.md`.

## [Unreleased] — 2026-04-28

### Added
- Initial scaffold: Astro + Tailwind + Inter, deployable to Cloudflare Pages.
- Eight pages: home, methodology, services index, three service detail pages
  (`oss-tool-hardening-pass`, `ai-governance-pack`, `local-llm-pilot`), free
  triage, contact, privacy.
- Three paid packages with **published prices** (£2,000 / £4,000 / £8,000) and
  explicit out-of-scope sections. Flagship Incubate Engagement listed at
  "from £25,000".
- Three free triage offerings: Local-AI Sovereignty Check (30 min), AI Session
  Audit (15 min), AI Pilot Scope Workshop (60 min) — each names what to bring,
  what you leave with, and "right when".
- Methodology page surfaces the Incubate v0.1 spec structure: 8 patterns,
  6 phases (Frame → Operate), 6 named agents (Scout / Surveyor / Forge /
  Architect / Auditor / Operator) plus cross-cutting Sponsor, 5 trust principles
  aligned to NIST AI RMF / UK AI Safety Institute.
- Privacy page with full sub-processor disclosure (Cloudflare, Plausible,
  Cal.com, Cloudflare Email Routing). No cookie banner because no first-party
  tracking cookies.
- Open Graph + Twitter Card meta tags on every page. Canonical URLs set per page.
- Governance scaffold: `THREAT_MODEL.md`, `DECISIONS.md`, `STATE.md`,
  `CONTEXT.md`, `README.md`. `CONTEXT.md` is the single source of truth for
  brand vocabulary per `~/WAYS_OF_WORKING.md` §13.
- Plausible Analytics integration is conditional on the `PUBLIC_PLAUSIBLE_DOMAIN`
  env var being set, so local dev doesn't hit the analytics endpoint.

### Pending (not yet wired — see STATE.md)
- `npm install` to lock the lockfile.
- Cal.com account, embed swap on the contact page.
- Plausible account, env var set in Cloudflare Pages.
- Cloudflare Pages connection to the GitHub repo + custom domain.
- DNS pointing `incubatelabs.ai` at Cloudflare nameservers.
- `hello@incubatelabs.ai` alias via Cloudflare Email Routing.
- OG / social-card image (`/public/og-image.png`).
