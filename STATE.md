# incubatelabs.ai — STATE

**Goal**: A lead-generation site for practical AI and automation for UK small businesses (5–50 staff). AI services lead; websites are offered alongside.
**Phase**: Worked examples sprint (v1.4) shipped 2026-10-13. Live at https://incubatelabs.ai (`main`). Remaining work is the open items below.
**Last touched**: 2026-10-16.

## Tidy-ups (2026-10-16; branch `tidy-2026-10`)
- Readiness Check button is now "Send my result to us". Still naming Simon (not changed, listed for review): the Readiness Check note under the email field ("Your result goes to Simon…") and its sent message ("Simon will email your result…"); the contact form's success message and /contact/thanks/ H1 ("…on its way to Simon"); the home "More about Simon →" link; privacy ("Simon's inbox", data controller). About not checked by request.
- **Lighthouse home "97" was a local artefact**: `astro preview` serves the 145 KB HTML uncompressed. Production (Cloudflare, brotli to 30 KB) scores **100** mobile, three runs (FCP 1.1 s, LCP 1.7 s, TBT 0, CLS 0). Measure Lighthouse on the preview or live URL, not localhost. The only remaining flag is Cloudflare Email Obfuscation's render-blocking `email-decode.min.js` (est. 20 ms; dashboard setting, already in the backlog).

## "Then what?" sprint (2026-10-16; branch `then-what-2026-10`)
- **Delivery commitment extended**: before any build we also **agree where the hours saved should go, and how we'll know**; the 12-week re-measure checks both the hours back and whether they went where planned (commitment 1, /how-we-work/ steps 1 and 5, /llms.txt).
- **Shipped**: `ThenWhat.astro` on home straight after "See it working" (eyebrow, H2, body, four accent-soft tags). Examples: `time_to` and `watch` front matter, rendered by `rehype-example.mjs` as "Where the time could go" straight after "Time back" / "What it's worth" (build fails if missing). Readiness Check: new "Then what?" step before the cost step ("If you got five hours a week back…", five options; steps now flag `aboutPickedJob` instead of relying on position); the result shows "Your first priority for the time saved: … We'll plan around it." and the same line goes into the summary sent with "Send my result to us". The booking link passes nothing. Cost estimate unchanged.
- **Checks**: 75 new browser checks plus the 143 existing; Lighthouse mobile home 97/100/100/100, CLS 0.

## Evidence pack follow-up (2026-10-16; branch `evidence-2026-10`)
- **Delivery commitment added**: **an evidence pack with every build** (what the AI does, tools and data, where a person checks, monitoring, what to do if it goes wrong), reusable in clients' own supplier questionnaires. Shown with the Handover step on /how-we-work/ (`#evidence-pack`, text in `evidencePack` in `src/data/commitments.ts`), linked from the security questionnaires page ("Where it fits") and listed under "Our commitments" in /llms.txt.
- **"Agreed before we start"** (renamed from "What you can hold us to" and moved to sit just before "What we commit to", 2026-10-16) trimmed to the four points the five promises don't cover: fixed scope and price in writing; scope says what's not included; data in your systems wherever possible and where it goes; a cost check including AI price rises. Removed as covered: simpler fix than AI, person in the loop, you own what we build.
- **AI policy template**: section 2 is now "Approved tools (our AI register)" with six columns (Tool, Account type, What it's used for, What data goes in, Who's responsible, Not approved for) and the register line; .docx and .md regenerate from it at build. last_reviewed 2026-10-16.
- **/guides/eu-ai-act-uk/**: new FAQ "Do I need an AI certification, such as ISO/IEC 42001?" (FAQPage JSON-LD from the rendered text). last_reviewed 2026-10-16.
- **Research**: `research/seo-2026-10/ai-governance-questionnaires.md`.
- **Checks**: 35 new browser checks plus the 108 from the trust sprint; Lighthouse mobile /how-we-work/ and /resources/ai-policy-template/ 99/100/100/100, CLS 0. The six-column register table uses tighter cells (`prose.css`, `table:has(th:nth-child(6))`) so it fits the panel on desktop.
- **Parked**: a change-management guide. No measurable UK search demand (`research/seo-2026-10/ai-change-management.md`); revisit as trust content rather than for search.

## Trust, fit and change sprint (2026-10-16; branch `trust-fit-2026-10`)
- **Delivery commitments (now on the site, so hold to them)**: before-and-after measurement with a **12-week re-measure** after go-live; **an evidence pack with every build** (added in the follow-up above); **two weeks running in parallel** with the old way; **one go-to person on the client's team**; **15-minute check-ins every fortnight**; the person who does the job helps design it. Plus the five promises: measure before and after, client owns what we build, data stays in the UK or EU and is never used for training, a person signs off what matters, we say when AI isn't the answer.
- **Shipped**: `src/data/commitments.ts` (single source for the promises and the team-change list; also in /llms.txt as "Our commitments" and "Bringing your team with you"). `Commitments.astro` on home (after the cost check) and /how-we-work/; item 4 uses `PersonCheckIcon.astro` (same glyph as the example callout). `RightForYou.astro` on home after "Fixed scope. Agreed up front.", ending with "Talk it through →". /how-we-work/: step 5 "After a quarter: we measure again" (steps grid now 3 columns), `TeamChange.astro` (UCL link https://doi.org/10.1002/ejsp.674, Lally et al. 2009, resolves to Wiley), "Questions we get asked" with the two adoption FAQs and FAQPage JSON-LD (the site's only general FAQ; home has none). Examples: `team_change` front matter, rendered by `rehype-example.mjs` as "What changes for your team" right after "What we'd build" (build fails if missing). "Sound familiar?" items are now links with a → on hover/focus.
- **Re-measure point**: no existing copy named one (cost check, engagements and steps checked), so nothing needed aligning.
- **Contact page fix**: the 300px Turnstile widget overflowed by 6px at 360px (also on live before this sprint); `contact.astro` now asks for the compact widget below 400px.
- **Research**: `research/seo-2026-10/ai-change-management.md` (only "ai change management" has UK volume, about 30 a month; the rest have none).
- **Checks**: 108 browser checks (local and preview); Lighthouse mobile home 97/100/100/100 and /how-we-work/ 99/100/100/100, CLS 0 (main measured 97 on home on the same machine).

## AEO pass (2026-10-16; branch `aeo-2026-10`)
- **Shipped**: `public/robots.txt` allows OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, Perplexity-User, ClaudeBot, Claude-User, Claude-SearchBot, Google-Extended, Googlebot and Bingbot by name. `/llms.txt` built by `src/pages/llms.txt.ts` from `useCases` and the examples and guides collections. One shared description in `site.description` (the approved home wording, "Fixed-price projects that take the repetitive admin off your team."), used by the Organization JSON-LD, the home meta/og:/twitter: descriptions and llms.txt; site-checks fails the build if any differ, or if llms.txt has £ or a location. Organization JSON-LD gains founder jobTitle and `knowsAbout`. "The short answer" box (`src/components/ShortAnswer.astro`) on the eight example pages (`card_summary` + `time_back`); the use-case pages render it only when `shortAnswer` is set. Bing meta slot: `site.bingSiteVerification` (empty renders nothing).
- **Use-case short answers and FAQs**: approved as written and published 2026-10-16 from `design/aeo-2026-10/approval.md` (Drive copy: folder 1WV0BLiD6h95fMq8yCZiXkOr77ntGQxxT, file 16A2WS6G4EQKO4CqbwftxmfCnVVPcPlXP). `shortAnswer` set on all six; new Q&As appended after the existing ones, so the visible FAQ and FAQPage JSON-LD come from the same array.
- **AI answer tracking**: root crontab `0 7 1 * *` (07:00 UK time, machine is Europe/London) runs `research/aeo-tracking/run-monthly.sh`: ChatGPT and Gemini (LLM Scraper live), Perplexity (`sonar`) for the 10 questions in `track.py`, plus one LLM Mentions query (Google, UK) for incubatelabs.ai. Hard cap $0.50 a run. Writes and commits `research/aeo-tracking/YYYY-MM.{md,json}` from a dedicated clone at `/home/vpc/.local/share/incubatelabs-aeo-tracking` (as vpc, `[skip ci]`); raw responses are gitignored. Runs as root because the DataForSEO credentials live in `/root/.claude.json`.
- **With Simon**: (1) Cloudflare bot settings ("Block AI bots", AI Crawl Control, Bot Fight Mode) are unreadable with the deploy token; check them in the dashboard. Served robots.txt is ours and all 11 user agents got 200 on 2026-10-16. (2) Bing Webmaster Tools verification: import from Google Search Console, or paste the msvalidate.01 code into `site.bingSiteVerification`. (3) LinkedIn URL for the Organization `sameAs`; not rendered until supplied.

## v1.4 Worked examples and "See it working" (2026-10-13; branch `examples-2026-10`, spec `design/examples-2026-10/00-build-spec.md`)
- **Scope**: eight worked examples from the supplied copy (final), an /examples/ index, the "See it working" home section from `design/examples-2026-10/see-it-working.html`, and internal links. Research behind it: `research/examples-2026-10/` (committed first, separately).
- **Copy**: no typos found. Eight metadata strings were over the site-check limits and were trimmed with Simon's approval (visible copy unchanged): titles of tenant-repair-requests (61→53) and monday-morning-report (63→59, "&"); the index title drops " | Incubate Labs" (66→50); descriptions of supplier-invoices-into-xero, missed-call-text-back, job-sheets-to-timesheets ("invoice lines"), chasing-client-records and the index (176→155, drops ", with the time saved").
- **Shipped**: `examples` collection (`src/content.config.ts`, `src/content/examples/`; `target_keyword`, `secondary_keywords`, `order`, `demo` never rendered; optional `video` path/URL renders a native player for a file, an iframe otherwise, nothing when absent). `src/layouts/ExampleLayout.astro` (breadcrumbs, fact strip with tool chips, Article + BreadcrumbList JSON-LD, no FAQPage, "More worked examples": same industry first, then order), shaped by `src/lib/rehype-example.mjs` (note box, person-checks callout with the CustomerReplies person glyph, time-back table and bold hours line, CTA button). Guide prose CSS moved unchanged to `src/styles/prose.css`, shared by both layouts. `src/components/ExampleCard.astro` used on /examples/, the "More" strip and use-case pages (`USE_CASE_EXAMPLES` in `src/lib/examples.ts`; security-questionnaires has none). Footer "Worked examples" above "Websites". OG images in `public/og/` from `design/examples-2026-10/og/build-og.mjs`.
- **Home section**: `src/components/SeeItWorking.astro` is the prototype's markup and script unchanged, except queries are limited to the section; CSS scoped under `.siw`, tokens mapped via `theme()`, keyframes prefixed `siw-`. No-JS fallback (`SeeItWorkingNoScript.astro`, a `<noscript><style>` in the head): the first step of all three examples, stacked, tabs hidden. Inter 600 is preloaded on example pages (the bold note line is above the fold; without it CLS was 0.0005).
- **Checks**: browser checks 119/119 on local (every example page, index, home autoplay/click/arrow keys/reduced motion/no-JS/360px, use-case blocks, footer, the Article 50 guide link, internal links, console). Guides regression 65/66 locally (the .docx content-type comes from `_headers`, which `astro preview` doesn't apply). Lighthouse 100/100/100/100 and CLS 0 on home, /examples/ and two example pages, mobile and desktop (local).
- **Deployed** 2026-10-13: preview https://examples-2026-10.incubatelabs.pages.dev, then production (`55d8e23`, `main` fast-forwarded so the research commit `e16997c` stays separate). Browser checks 119/119 and guides regression 66/66 on preview and live; the nine URLs are in the sitemap and IndexNow accepted them (200).

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
- Readiness Check cost estimate (hours × rate × 46 + monthly × 12, nearest £100), sent only with "Send my result to us" (renamed from "…to Simon", 2026-10-16).
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
- **Worked example demos**: Simon to build and record the three demos (voice note to quote, supplier invoices into Xero, tenant repair requests). Add each as `video:` (path under `public/` or a URL) in the example's front matter; nothing renders until then.
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
- Ninth worked example: "Variations log from site voice notes and photos (construction)" (parked 2026-10-16).
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
