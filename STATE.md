# incubatelabs.ai — STATE

**Goal**: A lead-generation site for practical AI and automation for UK small businesses (5–50 staff). AI services lead; websites are offered alongside.
**Phase**: AI rules guides sprint (v1.2) shipped 2026-10-12. Live at https://incubatelabs.ai (`main`). Remaining work is the open items below.
**Last touched**: 2026-10-12.

## Animated use-case illustrations (2026-10-12; design `design/use-case-anim/use-case-cards-animated.html`)
- Seven SVGs copied unchanged from the approved prototype into `src/components/illustrations/` (six use cases plus `Websites.astro`), replacing the v1.1 static art. Rendered through `AnimatedIllustration.astro`, which carries the scoped primitives CSS (keyframes prefixed `il-`) and one script island per page: `.pending` on load unless reduced motion, play at IntersectionObserver 0.45 with a 180ms stagger across a row of three, replay on card mouseenter/focusin (`data-anim-card`).
- Used on home and /use-cases/ cards (art now full card width, 320×180 viewBox), the websites card (art left, text right from `md`, stacked below), and each use-case page header (plays on load).
- Reduced motion and no-JS both show the final state. Only transform, opacity and stroke-dashoffset animate. Lighthouse 100s and CLS 0 unchanged on home and /use-cases/, mobile and desktop.

## v1.2 AI rules guides (2026-10-12; branch `guides-2026-10`, spec `design/guides-2026-10/00-build-spec.md`)
- **Scope**: five pages from the supplied copy (final; no typos found) plus a /guides/ index, for the EU AI Act cluster in `research/seo-2026-10/eu-ai-act.md`.
- **Shipped**: `src/content/guides/` collection (`src/content.config.ts`); one layout (`src/layouts/GuideLayout.astro`) with breadcrumbs, last-reviewed line, callout, visible FAQ + FAQPage JSON-LD built from the rendered text, muted sources, "More guides"; markup shaped by `src/lib/rehype-guide.mjs`. Pages: /guides/, /guides/eu-ai-act-uk/, /guides/eu-ai-act-article-50-chatbots/, /guides/uk-ai-act/, /guides/ai-literacy-training-staff/, /resources/ai-policy-template/ (docx via `src/lib/policy-docx.ts`, .md, copy button). OG images in `public/og/` from `design/guides-2026-10/og/build-og.mjs`. Footer Guides column, home "no rules" link, email-replies disclosure sentence.
- **Checks**: `src/integrations/site-checks.mjs` runs on every build (banned strings, [placeholders] outside the three marked example blocks, title ≤60, description ≤155). Content-layer renders are cached in `node_modules/.astro/data-store.json`: delete it after changing the rehype plugin. Lighthouse 100/100/100/100 mobile and desktop on the main guide and template page (local).
- **Deployed** 2026-10-12: preview https://guides-2026-10.incubatelabs.pages.dev, then production (`8661cfd`). Browser checks 66/66 on local, preview and live; schema.org validator 0 errors/0 warnings on the main guide and template page; IndexNow accepted the six new URLs. The Cloudflare API returned intermittent 504s on the mailer Worker step; re-running the workflow cleared them.
- **External links**: all 12 return 2xx/3xx after the ICO source was replaced with the breach-reporting page (2026-10-12). /guides/ OG headline is "AI rules guides for UK small businesses".

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

## Copy changes (2026-10-11)
- Hero toggle relabelled "Before" / "After" (was "This week" / "With Incubate Labs"), with matching visually hidden text, so the hero doesn't read as a product.
- "IT department / IT team" framing removed site-wide, including the home meta description and the JSON-LD description (2026-10-11); grep for IT department / IT team / IT person / in-house IT returns nothing.
- About is firm-forward: H1 "Delivery first, technology second.", "What we believe about AI in small businesses", beliefs in we/us/our, third-person intro. The "Let's talk." box is now "Tell us… If we can't help, we'll say so…", so /about has no first person left.
- Home "Six jobs we take off your plate" section is now "Where we can help", with a full-width seventh card, "Websites that bring in work" (links to /contact/). The standalone "Need a website too?" line is gone. "What we automate" relabelled "Where we can help" in the nav, footer, use-case breadcrumbs (visible and BreadcrumbList) and the /use-cases/ eyebrow. Home page carries a Service JSON-LD entry for "Small business website design". /use-cases/ still shows only the six automation cards.
- Hero week card caption ("An illustrative week · owner of a 12-person trades firm") removed.

## Final tidy (2026-10-11, closes the sprint)
- "Websites that bring in work" is a shared component (`src/components/WebsiteCard.astro`, `id="websites"`), shown after the six cards on the home page and /use-cases/.
- /use-cases/: meta description now mentions websites (145 characters); intro replaced with the "Where we can help" text. Title tag and H1 kept for SEO ("AI automation examples…").
- Footer "Where we can help" column ends with "Websites" → `/use-cases/#websites`.
- "Illustrative" is still visible in the hero footnote that cites the Amex and Microsoft sources (`src/components/LostDayHero.astro`); left in place.

## Open items
- Announcement bar: EU AI Act guide (key il-bar-eu-ai-act-dismissed). Review or retire by end of January 2027. (`src/components/AnnouncementBar.astro`; hidden on /guides/eu-ai-act-uk/; text is 12px below 640px so the mobile line fits beside the 44px close button at 360px.)
- **AI literacy page H1/title**: SERPs checked 2026-10-12 (see `research/seo-2026-10/eu-ai-act.md` addendum): "ai literacy training" is gov.uk, education bodies and training sellers; "ai literacy course" is course-shopping intent. Revisit the H1 and title as the copy's build note says; not changed in this sprint.
- **Readiness Check EU questions**: add the EU AI Act questions later.
- **Legal footer line**: still names the town ("…a sole trader based in Huntingdon, Cambridgeshire."), the only location on the site. Keep the town or use a business address.
- **Dedicated /websites page**: the websites offer currently lives in a card on the home page and /use-cases/, plus a Service entry in the home JSON-LD.
- **Copilot guide**: Microsoft Copilot pricing and value for small businesses (the competitor gap in `research/seo-2026-10/`); fits the new /guides/ section.
- **Project screenshots**: Simon to supply as `public/projects/{attestloop,removepii,publicguard,retail-poc,readiness-check}.webp` (16:10).
- **Google Business Profile**: service-area business with the address hidden (Simon, manual).
- **GitHub bio**: replace "Open to PM and Delivery roles" (Simon, manual).

## Backlog (parked, not in the open list)
- Founder photo (on hold); "Works with the tools you already use" strip (not confirmed).
- Technical-audit leftovers: `priceRange` (no prices), Cloudflare email obfuscation (dashboard decision), analytics (Plausible account or Cloudflare Web Analytics), CSP (needs testing against Turnstile).
- The SEO README's "keep 'based near Huntingdon'" suggestion was not applied: Simon chose to show no location.

## Stale docs
- `ENGAGEMENT_PROTOCOL.md` and `CONTEXT.md` still describe the April packages (with prices), `/services/` pages and Cal.com. Rewrite before linking to either.
- `THREAT_MODEL.md` was reissued for v1 on 2026-10-11.

## Key files
- `src/data/site.ts`, `src/data/useCases.ts`, `src/data/work.ts`, `src/data/hero.ts`, `src/data/engagements.ts` — content data
- `src/layouts/Layout.astro` — head meta, JSON-LD, fonts, Plausible (conditional)
- `functions/api/contact.ts` — form endpoint
- `workers/mailer/` — internal mail-sending Worker (deployed separately)
- `wrangler.toml` — Pages project config (service binding)
