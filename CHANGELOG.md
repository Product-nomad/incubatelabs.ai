# Changelog

All notable user-visible changes. Format: [Keep a Changelog](https://keepachangelog.com/).

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
