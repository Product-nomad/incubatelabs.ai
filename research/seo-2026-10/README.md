# SEO plan for incubatelabs.ai (October 2026)

An evidence-based SEO plan for an AI and automation service aimed at owner-run UK businesses with 5–50 staff and no IT department. This is research only: no site files were changed.

**Data:**
- DataForSEO: Google UK, English, pulled 11 October 2026.
- Lighthouse 13.5 run against a local build of `v1-sme-site` @ `53fd64d`.
- **Spend: $1.01 of the $10 cap** (breakdown at the end).

## Files

| File | What it is |
|------|-----------|
| `keywords.csv` | 2,701 relevant terms with volume, difficulty, CPC, competition, intent, cluster, question flag, opportunity score and 12-month trend. `variant_of` marks close variants that share one Google demand pool; never add those volumes together. |
| `serp-analysis.csv` | The top 40 terms by opportunity. For each: the live top 10 (domain, page type, estimated UK traffic), SERP features, People Also Ask questions, AI Overview sources, and a **realistic page one: yes / maybe / no** verdict with the reason. |
| `competitor-gap.csv` | Positions 1–20 with difficulty under 30 for newlens.uk, openkit.co.uk, cloudswitched.com and createwith.com, plus each site's top pages by traffic and page type. |
| `page-map.md` | Every worthwhile term mapped to one page, with a title, meta description, H1 and secondary terms for each. Also seven proposed new pages, and the pages that could compete for the same term. |
| `technical-audit.md` | Lighthouse results for all 16 pages (mobile and desktop), plus 15 issues ranked by severity, each with the exact file and fix. |
| `authority-plan.md` | Directories, communities, partner listings, GitHub back-links, the Google Business Profile decision, and outreach targets. |
| `raw/` | Every API response, SERP, Lighthouse report and the on-page crawl, so you can check any number here. |

## The headline findings

1. **UK demand in this niche is small but uncontested.** The whole "AI consultant / consultancy" pool is about 2,400 searches a month, and Google merges "consultant", "consultants" and "consultancy" into that one pool. Most service terms get 50–300 a month. But 13 of the 40 terms analysed are realistic for page one within months, because the sites ranking for them are tiny: many get under 100 UK visits a month.
2. **Big brands own the generic terms.** *ai for small business*, *ai for business*, *business process automation* and *business automation* belong to Salesforce, IBM, Microsoft, Forbes and Wikipedia. Mention them; don't build pages around them.
3. **Some of the site's vocabulary doesn't match what buyers type.** Nobody searches for "data re-entry" or "compliance questionnaire". And **"AI quote generator" returns inspirational-quote makers, not price-quote tools.**
4. **The local pack appears on 5 of 40 SERPs, and all five are our core commercial terms.** That's the case for a Google Business Profile, even with near-zero Cambridge-specific demand.
5. **AI Overviews appear on 37 of 40 SERPs.** The sources cited include tiny sites that give plain, specific answers. openkit.co.uk gets about 14 UK visits a month, yet it's cited for *ai consultant*.
6. **The competitors are weak.** The four named sites rank for 1, 23, 363 and 68 keywords (positions 1–20). The one clear gap is **Microsoft Copilot pricing and value for small businesses**, which cloudswitched.com ranks for with a single blog post.
7. **The build is technically excellent:**
   - Lighthouse 93–100 on performance.
   - 97–100 on accessibility.
   - 100 on best practices.
   - 100 on SEO for every indexable page.
   - The gaps are content depth, schema, social images and over-long titles and descriptions.

## Top 15 opportunities

"Realistic page one" comes from the live top 10 pulled for each term (`serp-analysis.csv`). Volume is monthly UK searches; KD is difficulty on a 0–100 scale.

| # | Term | Volume | KD | Target page | Realistic page one | Why |
|---|------|--------|----|-------------|--------------------|-----|
| 1 | ai consultancy uk | 170 | 0 | Home | **Yes** | All 10 results are small UK firms or small-site listicles, and there's a local pack. |
| 2 | ai automation agency uk | 210 | 0 | Home (secondary) | **Yes** | Every domain in the top 10 gets under 5,000 visits; 6 are small agency service pages. |
| 3 | ai consulting services | 320 | 13 | How we work | **Yes** | 8 of 10 are small, enterprise-leaning service pages. A small-business angle is open. |
| 4 | ai consultant (informational side) | 2,400 | 0 | **New:** AI consultant cost guide | Maybe | Jobs boards and EY dominate, but openkit.co.uk ranks #4 with a plain guide. This is the only route into the largest pool. |
| 5 | automate processes | 720 | 18 | **New:** which-processes guide | **Yes** | Small guides with 0–15 visits rank. It leads naturally into the use-case pages. |
| 6 | ai implementation | 590 | 44 | **New:** AI implementation guide | **Yes** | 9 of 10 are small-site guides; KD overstates the competition. |
| 7 | ai policy template (+ usage / acceptable use) | ≈470 pool | 0–26 | **New:** AI policy template | **Yes** | Small sites dominate, and a zero-traffic small-business template ranks #6. It's also a lead magnet and a linkable asset. |
| 8 | ai readiness assessment | 110 | 7 | Readiness check | **Yes** | Our working tool is the page type Google rewards, and a zero-traffic PDF ranks #8. |
| 9 | ai business consultant | 140 | 0 | Home (secondary) | **Yes** | 6 of 10 are small (traffic 9–76), and there's a local pack. |
| 10 | ai consultant near me | 110 | 0 | Google Business Profile + About | **Yes** | Local pack plus small local listicles. Won through the profile and listicle outreach. |
| 11 | copilot for business / copilot business / copilot license cost uk | ≈1,400 pool | 1–30 | **New:** Copilot for small business guide | Maybe→Yes | A small MSP (cloudswitched.com) ranks 6–18 with one post, and our buyers already pay for Microsoft 365. |
| 12 | ai for construction | 590 | 16 | **New:** construction sector page | Maybe | The FMB ranks #1 with a practical article; the rest are tiny construction-AI vendors. |
| 13 | ai property management | 210 | 0 | **New:** property management guide | **Yes** | 6 of 10 are small-site guides with under 10 visits. |
| 14 | ai automation | 2,400 | 27 | Use cases index ("AI automation examples") | Maybe | The #1 result is an "8 AI automation examples" page, and the weakest ranker gets about 28 visits. High in the funnel, but huge. |
| 15 | automated invoice processing (pool) | ≈210 | 0–11 | Document handling page | Maybe | The long tail around "invoice processing automation" is open; the head term "invoice processing" belongs to accounts-payable SaaS. |

## Recommended hero headline

What buyers actually type is **"AI consultant"**, **"AI automation"** and **"for small business"**. The People Also Ask questions are about **cost** ("How much does it cost to hire an AI consultant?"). A Reddit post ranking #2 for *ai consultant* describes the work in the same words: *"AI automation consulting for UK SMEs."*

**Recommended hero:**

> **Eyebrow:** AI consultant for UK small businesses
> **H1:** Practical AI and automation for small businesses without an IT team
> **Subhead:** Do more with the team you already have. We take the repetitive admin off your plate, at a fixed price agreed up front.

**Why it beats the current H1** ("Do more with the team you already have."):
- The current line is a good benefit statement, but it contains no term anyone searches for, and the hero H1 is the strongest on-page relevance signal.
- The recommended version keeps that line as the subhead, so the voice survives.
- It puts the three buyer phrases in the H1 and eyebrow.
- It answers the cost worry with "fixed price" before the visitor asks.

**Alternative, if you prefer a shorter H1:** "AI automation for small businesses, done for you".

## Use-case page names to change

| Current name | Recommended name | Why (search evidence) |
|--------------|------------------|-----------------------|
| Document handling | **Invoice & document processing** | Searchers say "invoice processing automation", "automated document scanning" (140) and "ai invoice processing". Nobody searches "document handling". |
| Admin & data re-entry | **Data entry automation** | "data entry automation", "automate data entry" and "automated data entry" have search volume; "re-entry" has none. |
| Reporting | **Automated reporting** | "automated reporting" (90) and "automated financial reporting" (40). The bare "reporting" means nothing to a searcher. |
| Customer replies | **AI email replies** | "ai email response" and "ai email reply" (90 each), and "ai email assistant" (390). Customers type "email", not "replies". |
| Quotes & proposals | Keep, but **never call it an "AI quote generator"** | That phrase's SERP is inspirational quotes. Use "quoting" and "proposal drafting" instead, and mention "quoting software for builders" (90) in the copy. |
| Compliance questionnaires | **Security & supplier questionnaires** | "security questionnaire" (50) and "security questionnaire automation". "Compliance questionnaire" has no measurable volume. |

Keep the URLs as they are, or add 301 redirects if you change slugs. Rename the cards, nav labels, H1s and titles.

## Technical fixes, in priority order

Full detail, with file paths and line numbers, is in `technical-audit.md`.

1. **Shorten the four over-long use-case titles and rewrite the home title** to lead with "AI Consultant for UK Small Businesses" (`src/data/useCases.ts`, `src/pages/index.astro`). *High*
2. **Bring five meta descriptions under 155 characters:** About, Contact, Home, Document handling and Compliance. *High*
3. **Add an OG/Twitter share image** and switch to `summary_large_image` (`src/layouts/Layout.astro`). *High*
4. **Expand each use-case page to 800–1,200 words** with a "What it costs" section, a worked example and FAQs written from the People Also Ask questions. *High (content)*
5. **Add `Service` JSON-LD to the use-case pages** and connect it to the organisation with an `@id`. *Medium*
6. **Complete the `ProfessionalService` schema:** logo, image, sameAs, founder URL, priceRange. *Medium*
7. **Fix the heading order on `/use-cases/` and `/work/`**, where the card titles skip from H1 to H3. *Medium*
8. **Add visible FAQs and `BreadcrumbList` schema.** FAQ schema itself won't produce rich results for us. *Medium*
9. **Add a real photo of Simon on Home and About**, for trust and E-E-A-T. *Medium*
10. **Fix the 0.161 layout shift on `/privacy/` (desktop)** by preloading the heading font or adding a metric-matched fallback. *Low*
11. **Optionally inline the CSS** (`inlineStylesheets: "always"`). *Low*
12. **Add a `public/_headers` file** with HSTS, X-Frame-Options and immutable asset caching. *Low*
13. **Decide on Cloudflare email obfuscation**, which rewrites the `mailto:` links. *Low*
14. **Add `lastmod` to the sitemap.** *Low*
15. **Turn on analytics** (Plausible via `PUBLIC_PLAUSIBLE_DOMAIN`, or Cloudflare Web Analytics). Without it, none of this can be measured. *Low effort, do it first*

## 90-day plan

### Weeks 1–2: foundations (no new pages yet)
- **Site:**
  - Technical fixes 1, 2, 3, 5, 6, 7 and 15.
  - Rename the use-case pages.
  - New hero.
- **Search Console:**
  - Confirm `sitemap-index.xml` shows *Success* and 14 discovered URLs.
  - Use URL Inspection → Request indexing for the home page, How we work, the Readiness Check and the six use-case pages.
  - Turn on email alerts.
  - Note the starting numbers under Performance → Search results.
- **Bing Webmaster Tools:**
  - Confirm the import from Search Console worked and the sitemap was fetched.
  - Turn on IndexNow monitoring. The key is already live at `/57a8d7ebf6e3784d05ec6c649066dfb9.txt`.
- **Authority:**
  - Google Business Profile (service-area, address hidden), Bing Places (import from Google), Apple Business Connect.
  - Clutch, GoodFirms, Sortlist and Yell.
  - Change the GitHub bio and add README footers.

### Weeks 3–4: deepen what exists and publish the lead magnet
- **Expand the six use-case pages:** cost, worked example and FAQs (fix 4). Add the Simon photo (fix 9).
- **Publish the AI policy template** (`/resources/ai-policy-template/`), as a Word download plus a guide.
- **Join two communities** (Cambridgeshire Chamber or Cambridge Network, plus one sector body). Pitch the template to the Growth Hub and the local FSB branch.

### Weeks 5–6: the biggest pool
- **Publish "What does an AI consultant do, and what does one cost?"** (`/guides/ai-consultant-cost/`) with real UK price ranges. Put the answer in the first two sentences of each section so AI Overviews can lift it.
- **Listicle outreach:** aisuperior.com (the Cambridge list), nicchin.com, learn.bluecanvas.ai, softblues.io, elevateai.co.uk and espressio.ai.
- **Search Console check:** look for queries already getting impressions at positions 8–20, and strengthen the matching page.

### Weeks 7–8: competitor gap and the automation funnel
- **Publish "Microsoft Copilot for small business: worth it? (UK pricing)".**
- **Publish "Which business processes should you automate first?"**
- **Apply** to the Zapier and/or Make partner directories (check current criteria). Join the Microsoft AI Cloud Partner Program as the first step towards Copilot credibility.

### Weeks 9–10: implementation and the first sector
- **Publish "AI implementation for small businesses: a six-step plan".**
- **Publish the construction sector page.** Pitch a practical article to the FMB.
- **Publish the first case study with numbers**, once you have client permission.

### Weeks 11–12: second sector and review
- **Publish the property management guide.** Pitch it to LettingAgentToday or Property Industry Eye.
- **Give a meetup talk** (e.g. Mindstone Cambridge) and get it listed on createwith.com.
- **90-day review in Search Console:**
  - Indexed pages.
  - Queries with impressions.
  - Pages at positions 4–15 to push further.
  - Click-through on pages with impressions but no clicks, which means rewriting their titles.
  - Re-pull the top 40 SERPs (about $0.09) to measure movement.

**Each time you publish:** add the page to the sitemap (automatic), request indexing in Search Console, ping IndexNow, post it on the Google Business Profile and LinkedIn, and link to it from at least two existing pages.

## Total spend

| Phase | What | Cost |
|-------|------|------|
| 1 | Labs keyword ideas (21 seeds, 1,000 results). It drifted to broad terms and was mostly filtered out. | $0.13 |
| 1 | Google Ads keyword suggestions (2 calls, 2,860 suggestions) | $0.18 |
| 1 | Labs keyword overview (186 terms) | $0.03 |
| 1 | Labs keyword suggestions (14 seeds) | $0.37 |
| 2 | 40 live Google UK SERPs (top 10 + PAA) | $0.09 |
| 2 | Domain traffic estimates (292 ranking domains) | $0.05 |
| 3 | Competitor ranked keywords and top pages (4 domains) | $0.16 |
| 5 | Lighthouse and on-page crawl (local, free) | $0.00 |
| **Total** | Balance $49.92 → $48.91 | **$1.01** |

## Caveats

- **Volumes:** keyword volumes are Google Ads and clickstream estimates, rounded into bands (10, 20, 30, 40, 50, 70, 90, 110…). Treat anything under 100 as "some demand", not a precise number.
- **Difficulty:** KD scores in this niche are often 0 because the SERPs have almost no backlink data. Judge difficulty from the "realistic page one" verdicts, not KD alone.
- **Domain traffic:** "small vs big" is based on DataForSEO's estimate of each ranking domain's UK organic traffic. It's a useful proxy, not an audit of each site.
- **SERP timing:** the SERPs are a single snapshot from the evening of 11 October 2026 (desktop, UK-wide). Local-pack results vary with the searcher's location.
- **Lighthouse:** the scores come from a local static server. The live Cloudflare site serves Brotli compression and caches assets, so real-world performance should be the same or better.
