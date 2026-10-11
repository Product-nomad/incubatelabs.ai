# incubatelabs.ai — STATE

**Goal**: A lead-generation site for practical AI and automation for UK small businesses (5–50 staff) without an in-house IT team. AI services lead; web design is an add-on.
**Phase**: v1.1 live at https://incubatelabs.ai (merged to `main` and deployed 2026-10-11, commit `c0a36fc`). Signed off by Simon from the preview screenshots.
**Last touched**: 2026-10-11.

## v1.1 (live; built on `v1.1-brand-hero`, spec: `design/v1.1/spec.md`)
- Brand tokens (`admin`, `admin-deep`, `night`, `night-raised`, `accent-bright`); text logo kept until logo files land.
- "Lost day" hero: build-time week planner, 679-byte script island, autoplay/IO/visibility/reduced-motion behaviour, sourced stats strip. H1 in `HERO_H1` (`src/data/hero.ts`); totals derived from the week data and checked at build time.
- "Sound familiar?", illustrated use-case cards (six SVG components in `src/components/illustrations/`), asked-for vs fix list, cost-check section with payback chart (`CostCheck.astro`), hexagon engagement cards with "Where most clients start" badge.
- Projects (was "Things I've built"): attestloop, removepii, publicguard, retail PoC, plus Readiness Check on /work/. Image slots read `public/projects/<name>.webp` when present.
- De-personalised: no location except the legal line; Iraq entry removed from About; JSON-LD address removed.
- Readiness Check cost estimate (hours × rate × 46 + monthly × 12, nearest £100), sent only with "Send my result to Simon".
- SEO addendum applied: hero copy, renamed use-case pages with 301s (`public/_redirects`), "Where it fits", "What it costs" (no prices) and FAQ blocks, Service/BreadcrumbList/FAQPage JSON-LD, OG image (`public/og-image.png`, source in `design/v1.1/og-image-source.html`), technical-audit fixes. Research summaries committed under `research/seo-2026-10/`; `raw/` is gitignored.
- Acceptance checks passed 2026-10-11 locally and on the preview; screenshots in `.screens/v1.1/` (gitignored). After deploy: redirects 301 on the live domain, OG image passes opengraph.xyz (0 errors; warnings: no call-to-action text in the image, og:description 142 characters where some social previews show ~125). IndexNow re-pinged with all 14 URLs.

## Brand (2026-10-11)
- Logo `public/brand/incubatelabs-logo.svg` (from Simon's Drive, paths unedited). Lockup `public/brand/incubatelabs-lockup.svg` built by `design/brand/build-lockup.cjs` (Source Serif 4 SemiBold outlined with opentype.js; gap 0.2× and cap height 0.45× logo height). Nav 36px, footer 32px via `src/components/Logo.astro` (`<use>` so it takes `currentColor` #16181a).
- Favicons: `favicon.svg` (ink, #f1efe9 in dark mode), `favicon-32.png`, `apple-touch-icon.png` (180px, ink on paper). Logo URL in the ProfessionalService JSON-LD.
- Home page has a separate 119-character og:/twitter: description; the 142-character meta description stays for search.

## Open decisions (v1.1 §12; not built)
- **Final H1**: "Practical AI and automation for small businesses." (changed by Simon 2026-10-11; title tag and meta description unchanged).
- **Legal line**: still names the town ("…a sole trader based in Huntingdon, Cambridgeshire."). Keep the town or use a business address. It is the only location left on the site.
- **About page voice**: Simon doesn't want the site to read as a one-person operation. About is unchanged apart from the Iraq and location removals.
- **Founder photo**: on hold.
- **"Works with the tools you already use" strip**: not confirmed, not built.
- **Project screenshots**: Simon to supply as `public/projects/{attestloop,removepii,publicguard,retail-poc,readiness-check}.webp` (16:10).

## Next steps (v1.1 §14.7; not built)
- **Google Business Profile**: service-area business with the address hidden. Simon sets this up manually; it carries the local signal now the site shows no location.
- **Content**: guide on Microsoft Copilot pricing and value for small businesses (the competitor gap in `research/seo-2026-10/`).
- **GitHub bio**: Simon to replace "Open to PM and Delivery roles" (manual).
- The SEO README's "keep 'based near Huntingdon' on the site" suggestion was **not applied**: Simon chose to show no location.
- Technical-audit items not done (see the v1.1 report): `priceRange` (no prices), founder photo (on hold), Cloudflare email obfuscation (dashboard decision), analytics (needs a Plausible account or Cloudflare Web Analytics switched on in the dashboard), CSP (needs testing against Turnstile).

## Stale docs
- `ENGAGEMENT_PROTOCOL.md` and `CONTEXT.md` still describe the April packages (with prices), `/services/` pages and Cal.com. Rewrite before linking to either.
- `THREAT_MODEL.md` was reissued for v1 on 2026-10-11.

## Key files
- `src/data/site.ts`, `src/data/useCases.ts`, `src/data/work.ts`, `src/data/hero.ts`, `src/data/engagements.ts` — content data
- `src/layouts/Layout.astro` — head meta, JSON-LD, fonts, Plausible (conditional)
- `functions/api/contact.ts` — form endpoint
- `workers/mailer/` — internal mail-sending Worker (deployed separately)
- `wrangler.toml` — Pages project config (service binding)
