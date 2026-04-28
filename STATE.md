# incubatelabs.ai — STATE

**Goal**: A services brand site that takes prospects from "we should use AI" to a booked engagement under the Incubate methodology. Differentiates from eSynergy / typical UK AI consultancies via published prices, public proof points, solo + agent-augmented delivery, and data-sovereignty positioning.
**Phase**: Frame → Build (v0 scaffolded today, not yet deployed).
**Status**: site source pushed; Cal.com, Plausible, Cloudflare Pages, and DNS still need wiring.
**Last touched**: 2026-04-28.

## What's done
- Astro + Tailwind + Inter scaffolded locally and pushed as `Product-nomad/incubatelabs.ai` (public).
- Eight pages live in source: home, methodology, services index, three service detail pages, free triage, contact, privacy.
- Three paid packages with **published prices** (£2k / £4k / £8k) and explicit out-of-scope sections.
- Three free triage offerings drafted (Local-AI Sovereignty Check, AI Session Audit, AI Pilot Scope Workshop).
- Methodology page surfaces the v0.1 spec structure (8 patterns, 6 phases, 6 named agents, 5 trust principles) without overclaiming on per-phase detail that hasn't been written yet.
- Governance scaffold: THREAT_MODEL, DECISIONS, CHANGELOG, STATE, CONTEXT, README.
- Privacy page lists every sub-processor honestly. No dark-pattern cookie banner because there are no first-party tracking cookies.

## What's next (run-blockers, in order)
1. **`npm install`** locally to lock the lockfile, then commit it.
2. **Cal.com account** at `cal.com/incubatelabs` — once created, swap the placeholder block in `src/pages/contact.astro` for the inline embed.
3. **Plausible Analytics** account at `plausible.io/incubatelabs.ai` — set `PUBLIC_PLAUSIBLE_DOMAIN` in Cloudflare Pages env vars and the `<script>` tag in `Layout.astro` activates automatically.
4. **Cloudflare Pages** — connect the GitHub repo, build command `npm run build`, output dir `dist`, framework preset Astro. Initial deploy goes to `incubatelabs-ai.pages.dev`.
5. **DNS** — point `incubatelabs.ai` at Cloudflare nameservers if not already; add the custom domain in Pages.
6. **`hello@incubatelabs.ai` mailbox** — set up email forwarding (Cloudflare Email Routing is free) before the contact page goes live.
7. **Smoke test** every page from a fresh browser session before announcing the URL anywhere.
8. **Custom social-preview image** — currently no `og:image`. Generate via Canva (1200×630, brand black-on-white, "Incubate Labs" + the headline) and drop into `/public/og-image.png`, then add `<meta property="og:image">` to Layout.

## Open questions / blockers
- **Site code licence vs content licence.** README declares MIT for code, "© Incubate Labs ask before reproducing" for content. Tighten or loosen later as the brand matures.
- **The methodology spec repo (`Product-nomad/incubate`) doesn't exist yet.** The methodology page links to it. Either create the repo with the v0.1 skeleton imported from your other Claude project, or temporarily redirect that link to a `/methodology` anchor until the repo lands.
- **Sub-processor list on `/privacy/`** assumes Cal.com + Plausible. If you swap analytics or booking tools, update the privacy page in lockstep.
- **`hello@incubatelabs.ai`** alias to set up. Forward to your existing inbox via Cloudflare Email Routing.
- **No case studies yet.** v0.2 deliverable.

## Known gaps deliberately accepted
- No blog. Add via Astro content collections in v0.3 if/when there's something to say.
- No dark mode. Black-on-white only.
- No image assets. Black-on-white text-only design choice for v0; logo and OG image can come later.
- No tests. The site is content + components; the test that matters is "the build succeeds and the pages render." Vitest / a11y audit is v0.2.

## Key files
- `src/pages/index.astro` — home / hero / packages / free triage / proof
- `src/pages/methodology.astro` — Incubate v0.1 overview
- `src/pages/services.astro` + `src/pages/services/*.astro` — engagement detail pages
- `src/layouts/Layout.astro` — head meta, fonts, Plausible (conditional), nav, footer
- `src/components/Nav.astro`, `Footer.astro`, `PackageCard.astro` — shared UI
