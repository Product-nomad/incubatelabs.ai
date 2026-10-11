# Technical audit: incubatelabs.ai (`v1-sme-site` @ `53fd64d`)

**Method:**
- I built the branch locally (`npm run build`, 16 pages) and ran Lighthouse 13.5 on every page, mobile and desktop: 32 runs against a local static server.
- I parsed every built HTML file for titles, descriptions, headings, canonicals, JSON-LD, links, images and page weight.
- I checked the live site's HTTP headers at https://incubatelabs.ai.
- I didn't change any site files. Raw Lighthouse reports are in `raw/lighthouse/`.

**Overall:** the build is technically very clean. The real gaps are content and markup depth, not speed or crawlability.

## Lighthouse scores

| Page | Perf (mobile / desktop) | Accessibility | Best practices | SEO | Mobile LCP | Page weight |
|------|------------------------|---------------|----------------|-----|-----------|-------------|
| `/` | 99 / 100 | 100 | 100 | 100 | 1.7 s | 115 KiB |
| `/about/` | 99 / 100 | 100 | 100 | 100 | 1.7 s | 131 KiB |
| `/contact/` | 100 / 100 | 100 | 100 | 100 | 1.5 s | 108 KiB |
| `/how-we-work/` | 99 / 100 | 100 | 100 | 100 | 1.7 s | 132 KiB |
| `/privacy/` | 100 / **93** | 100 | 100 | 100 | 1.5 s | 105 KiB |
| `/readiness-check/` | 99 / 100 | 100 | 100 | 100 | 1.7 s | 146 KiB |
| `/use-cases/` | 99 / 100 | **97 / 98** | 100 | 100 | 1.5 s | 107 KiB |
| 6 × `/use-cases/*/` | 99 / 100 | 100 | 100 | 100 | 1.7 s | 131 KiB each |
| `/work/` | 100 / 100 | **97 / 98** | 100 | 100 | 1.5 s | 107 KiB |
| `/contact/thanks/`, `/404` | 100 / 100 | 100 | 100 | 63 (intended: noindex) | 1.5 s | 102 KiB |

- Total blocking time is 0 ms everywhere, and CLS is at most 0.044 on every page except one (privacy, desktop, 0.161).
- Page weight is 102–146 KiB per page. The whole build is 1.5 MB, and most of that is font files the browser only downloads when needed.

## What's already right

- Every page has a unique title and a unique meta description.
- Every page has exactly one H1, and every indexable page has a self-referencing canonical.
- `lang="en-GB"` is set everywhere.
- `robots.txt` allows all crawlers and points to `sitemap-index.xml`. The sitemap lists all 14 indexable pages and leaves out the thanks page.
- Thanks and 404 are correctly marked `noindex` and have no canonical.
- `www` and `http` 301-redirect to `https://incubatelabs.ai/`. The live site serves Brotli compression, and hashed assets are cached.
- `ProfessionalService` JSON-LD is valid on every page.
- Every use-case page links to the other five ("Other jobs we automate"), and the shared nav and footer link every key page. No page is orphaned.
- No `<img>` tags are missing alt text. In fact there are no `<img>` tags at all; see issue 9.
- IndexNow is set up and has been submitted. Search Console and Bing were set up today.

## Issues, in priority order

Severity: **High** = costs rankings or click-through now; **Medium** = a missed opportunity; **Low** = polish.

### 1. Titles too long on four use-case pages, and the home title leads with the brand (High)
- **Problem:** Google truncates titles at about 580 px, roughly 60 characters. These four are over that:
  - Compliance questionnaires: 73 characters
  - Admin & data re-entry: 69
  - Quotes & proposals: 67
  - Customer replies: 64
- The home title is "Incubate Labs | Practical AI for small businesses", which puts the brand, a term nobody searches for yet, in the most valuable position.
- **Fix:**
  - Change the `seoTitle` values in `src/data/useCases.ts` (lines 39, 66, 93, 120, 147 and 174) to the titles in `page-map.md`. The `| Incubate Labs` suffix is added in `src/pages/use-cases/[slug].astro:18`, so the `seoTitle` itself must be 44 characters or fewer.
  - Change the home `title` prop in `src/pages/index.astro:42` to `AI Consultant for UK Small Businesses | Incubate Labs`.

### 2. Meta descriptions over 155 characters (High)
- **Problem:** five pages are over the limit, so Google will cut them off mid-sentence:
  - `/about/`: 189 characters
  - `/contact/`: 168
  - `/`: 167
  - `/use-cases/document-handling/`: 167
  - `/use-cases/compliance-questionnaires/`: 160
- **Fix:** replace them with the versions in `page-map.md`, which are all measured at 155 or fewer. They live in the `description` props of each page's `<Layout>` and in `seoDescription` in `src/data/useCases.ts`.

### 3. No social sharing image (High for a service sold through LinkedIn and referrals)
- **Problem:** no `og:image` and no `twitter:image` on any page, and `twitter:card` is `summary`. Links shared in LinkedIn, Slack, WhatsApp or iMessage show no image.
- **Fix:**
  - Add a 1200×630 PNG at `public/og/default.png`.
  - In `src/layouts/Layout.astro`, next to line 53, add:
    - `<meta property="og:image" content="https://incubatelabs.ai/og/default.png" />`
    - `<meta property="og:image:width" content="1200" />`
    - `<meta property="og:image:height" content="630" />`
    - `<meta name="twitter:image" content="https://incubatelabs.ai/og/default.png" />`
  - Change `twitter:card` on line 60 to `summary_large_image`.
  - Optional: a per-page `ogImage` prop for the use-case pages.

### 4. Use-case pages are thin compared with what ranks (High, content)
- **Problem:** each use-case page has about 360–420 words. The pages ranking for these terms are 1,200–2,500-word guides, or service pages with FAQs and pricing.
- **Fix:** take each use-case page to roughly 800–1,200 words by adding three sections, using the existing `src/pages/use-cases/[slug].astro` template and new fields in `useCases.ts`:
  1. A **"What it costs"** section with a price range, which answers the PAA question "How much does it cost to hire an AI consultant?".
  2. A **worked example** with real numbers (hours before and after).
  3. Four to six **FAQs** written from the PAA questions in `serp-analysis.csv`.

### 5. No `Service` schema on service pages (Medium)
- **Problem:** the six use-case pages and How we work only carry the site-wide `ProfessionalService` block. Nothing tells search engines and AI engines what each page offers.
- **Fix:** in `src/pages/use-cases/[slug].astro`, add a second JSON-LD block:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "<useCase.title>",
    "serviceType": "<useCase.seoTitle>",
    "description": "<useCase.seoDescription>",
    "provider": { "@id": "https://incubatelabs.ai/#org" },
    "areaServed": { "@type": "Country", "name": "United Kingdom" },
    "url": "https://incubatelabs.ai/use-cases/<slug>/"
  }
  ```
  Then add `"@id": "https://incubatelabs.ai/#org"` to the existing `jsonLd` object in `Layout.astro:22`, so the two blocks connect.

### 6. `ProfessionalService` schema is missing fields (Medium)
- **Problem:** `Layout.astro:22-37` has name, url, email, founder, areaServed and address, but no logo, image, sameAs (LinkedIn, GitHub, the future Google Business Profile), founder URL or contact point.
- **Fix:** add:
  - `"@id": "https://incubatelabs.ai/#org"`
  - `"logo": "https://incubatelabs.ai/og/logo.png"`
  - `"image"` (the same OG image)
  - `"sameAs": ["https://www.linkedin.com/in/<simon>", "https://github.com/Product-nomad", "<Google Business Profile URL once live>"]`
  - `"founder": {"@type":"Person","name":"Simon Newton","url":"https://incubatelabs.ai/about/","sameAs":["https://www.linkedin.com/in/<simon>"]}`
  - `"priceRange": "££"`
- Keep `address` to locality and region only. That suits a service-area business and matches a profile with the address hidden.

### 7. Heading order skips a level on `/use-cases/` and `/work/` (Medium, accessibility)
- **Problem:** Lighthouse `heading-order` fails on these two pages (accessibility 97). The card titles are `<h3>` directly under the `<h1>`, with no `<h2>` in between. That's a weaker outline for screen readers and for search engines.
- **Fix:** either change the card headings to `<h2>`, or add a visible `<h2>` above each grid:
  - `src/pages/use-cases/index.astro`: change the card `h3.mt-3` to `h2`, or add "Six jobs we automate" as an `<h2>`.
  - `src/pages/work.astro`: change `h3.font-mono` to `h2`, or add "Projects" as an `<h2>`.

### 8. No FAQ content, and FAQ schema has limited value (Medium, content first)
- **Problem:** there's no visible FAQ anywhere. The SERPs show People Also Ask boxes on 33 of the 40 terms, and AI Overviews on 37 of 40. AI Overviews pull heavily from clear question-and-answer text.
- **Fix:**
  - Add visible FAQ sections to the home page, How we work and each use-case page (see issue 4).
  - Adding `FAQPage` JSON-LD is fine, but Google has shown FAQ rich results only for government and health sites since 2023. Expect no visual SERP change: the value is in AI-engine extraction and in the visible content itself.
  - Add `BreadcrumbList` JSON-LD to the use-case pages (Home › What we automate › page), which does still produce a rich result.

### 9. No photo of Simon, and no images at all (Medium, trust and E-E-A-T)
- **Problem:** the site has no `<img>` elements. For a one-person consultancy, a real photo on Home and About is a strong trust signal for buyers and for Google's experience and expertise assessment.
- **Fix:**
  - Add a compressed WebP or AVIF headshot (under 60 KB) with `width`, `height` and descriptive alt text ("Simon Newton, founder of Incubate Labs").
  - Use Astro's `<Image>` from `astro:assets` so it's resized automatically.

### 10. Layout shift on `/privacy/` (desktop, CLS 0.161) (Low)
- **Problem:** Lighthouse attributes a 0.161 shift to the "Services this site uses" block. The most likely cause is the Source Serif 4 heading font swapping in after a fallback with different metrics. Other pages only stay under 0.05 because there's less text below the fold.
- **Fix:**
  - Preload the two heading font files (`<link rel="preload" as="font" type="font/woff2" crossorigin>` for Source Serif 4 500 and 600 latin) in `Layout.astro`.
  - Or add a metric-matched fallback: `@font-face { font-family: "Source Serif Fallback"; src: local("Georgia"); size-adjust: 104%; ascent-override: 92%; }`, then put it before Georgia in the `font-family` stack at `Layout.astro:99`.
  - Then re-run Lighthouse on `/privacy/` (desktop).

### 11. 76% of the CSS file is unused on every page (Low)
- **Problem:** the single 27 KB stylesheet (`about.*.css`) blocks rendering, with about 20 KB unused per page. The cost is about 150 ms on mobile.
- **Fix:** none required at this size. If you want the last few points, set `build: { inlineStylesheets: "always" }` in `astro.config.mjs`. That inlines the CSS and removes the render-blocking request.

### 12. HTML isn't cached at the CDN edge, and no security headers are set (Low)
- **Problem:** the live HTML has `cache-control: public, max-age=0, must-revalidate`. Assets get `max-age=14400`. There's no HSTS, CSP, `X-Frame-Options` or `Permissions-Policy`. This doesn't affect rankings directly, but security-minded buyers notice, and so does your compliance-questionnaire use case.
- **Fix:** add `public/_headers`:
  ```
  /*
    Strict-Transport-Security: max-age=31536000; includeSubDomains
    X-Frame-Options: DENY
    X-Content-Type-Options: nosniff
    Permissions-Policy: camera=(), microphone=(), geolocation=()
  /_astro/*
    Cache-Control: public, max-age=31536000, immutable
  ```
  Add a CSP separately after testing Turnstile and Plausible against it.

### 13. Cloudflare Email Obfuscation rewrites the `mailto:` links (Low)
- **Problem:** on the live site, `hello@incubatelabs.ai` is replaced by a `/cdn-cgi/l/email-protection` link plus an extra script (`email-decode.min.js`). Crawlers and AI engines don't see the email address, and visitors without JavaScript get a broken link.
- **Fix:** either accept it as spam protection, or turn off **Scrape Shield → Email Address Obfuscation** for the zone in the Cloudflare dashboard and rely on the form's Turnstile check.

### 14. Sitemap has no `lastmod` (Low)
- **Fix:** in `astro.config.mjs`, pass `serialize(item) { item.lastmod = new Date().toISOString(); return item; }` to `sitemap()`. Better still, use a real per-page date once guides are published, so Google and IndexNow can see what changed.

### 15. No analytics on the live site (Low, but blocks measurement)
- **Problem:** the privacy page and Layout support Plausible through `PUBLIC_PLAUSIBLE_DOMAIN`, but it isn't set in the deploy, so no analytics script loads.
- **Fix:** set `PUBLIC_PLAUSIBLE_DOMAIN=incubatelabs.ai` as a GitHub Actions secret, pass it to `npm run build` in `.github/workflows/deploy.yml`, and redeploy. Alternatively, use Cloudflare Web Analytics (free, no cookies, no code change: enable it for the Pages project).

## Not issues

- **Lighthouse "document latency" and "cache" warnings:** they appear on every page because the audit ran against a local Python server with no compression. The live site serves Brotli and caches assets.
- **SEO score 63 on `/404` and `/contact/thanks/`:** expected, because they're deliberately `noindex`.
- **`hreflang`:** not needed for a UK-only English site.
