# Build spec: worked examples and "See it working" (sprint 2026-10-13)

Repo: /home/vpc/projects/incubatelabs.ai. UK English. Copy is final: fix obvious typos only and list them in your report.

Files in this Drive folder:
- 01–08 *.md → eight worked example pages under /examples/
- see-it-working.html → the approved home-page section (interactive prototype)

## 1. Worked example pages (/examples/[slug]/)

- Add an `examples` content collection. Front matter drives `<title>`, meta description, canonical, OG/Twitter tags and dateModified. Keep `target_keyword`, `secondary_keywords`, `order` and `demo` out of the rendered HTML.
- Add an optional `video` front-matter field (path or URL) for later. If it's absent, render nothing for it: no empty player and no "coming soon" text.
- **Layout**, in the guides' style (68ch reading width):
  - Breadcrumbs Home › Worked examples › [H1], with BreadcrumbList JSON-LD.
  - Under the H1, a muted **fact strip** from front matter: Business · Industry · Time back · Tools (tools as small chips).
  - The body's opening "**Worked example.** …" line becomes a muted note box (`band` background, `line` border). Don't show it twice.
  - "Where a person checks": render it as a callout with the accent-soft background and a small person icon matching the use-case illustrations (person in a circle with a green tick).
  - "Time back" table in the guides' table style. Bold the hours line under it.
  - "How we'd start" ends with the "Talk it through →" primary button to /contact/.
  - At the end, a "More worked examples" strip with three other examples (same industry first, then by order) as cards.
- **JSON-LD:** Article (headline = H1, author and publisher Organization "Incubate Labs", dateModified = last_reviewed) and BreadcrumbList. No FAQPage on these pages.

## 2. /examples/ index

- H1 "Worked examples". Intro: "Eight everyday jobs in real types of small business, showing how each one works today, what we'd build, where a person stays in charge and the time it gives back. Figures are illustrative; we measure yours in the first conversation."
- `<title>`: "Worked Examples: Automation in UK Small Businesses | Incubate Labs". Meta description: "Eight worked examples of practical AI and automation in UK small businesses: quotes, supplier invoices, repair requests, missed calls, timesheets and more, with the time saved."
- Don't reuse "AI Automation Examples" in the title: /use-cases/ already targets it.
- Grid of eight cards in `order`: industry chip, H1 as the card title, `card_summary`, then `time_back` in bold accent text, linking to the page. Cards with `demo: true` come first, which `order` already does.

## 3. Home page: "See it working" section

- Port see-it-working.html into a component and place it directly after the "Where we can help" section.
- Take its markup, styles and script exactly. Scope the CSS to the component, map the tokens to the site's existing ones (the values match), and make the script a small vanilla JS island.
- **Behaviour to keep:**
  - It autoplays only while the section is at least 35% in view, at 3.8s per step, through all three examples.
  - Any click on a tab or step stops autoplay for good on that page view.
  - Tabs are keyboard-operable with the arrow keys.
  - With reduced motion, there's no autoplay and no entry animation.
- Every view must be visible and readable without JS: show the first step of each example stacked, or keep the first example's four views visible. Pick one and tell me which.
- Links: "Read the full example →" goes to each example page; "See all eight worked examples →" goes to /examples/.
- The "Example data" label stays on every mock screen.

## 4. Internal links

- **Use-case pages:** add a "See a worked example" block near the end with cards linking to:
  - invoice-and-document-processing → supplier-invoices-into-xero, job-sheets-to-timesheets
  - data-entry-automation → job-sheets-to-timesheets, supplier-invoices-into-xero
  - automated-reporting → monday-morning-report
  - ai-email-replies → tenant-repair-requests, credit-control-emails, missed-call-text-back
  - quotes (the existing slug) → voice-note-to-quote
  - security-questionnaires → no block
- **Footer:** add "Worked examples" to the "Where we can help" column, above "Websites".
- **Nav:** no change.
- The missed-call example links to /guides/eu-ai-act-article-50-chatbots/. Check that it resolves.

## 5. SEO and checks

- Add the nine new URLs to the sitemap, submit them via IndexNow, and generate an OG image for each (headline = H1).
- **Banned strings:** run the full check. There must be no £, no pricing, no CPMAI, no client names and no Iraq. The UK gas emergency number in the letting-agent mock is intentional.
- **Browser checks:** new checks for each page (H1, fact strip, person-checks callout, CTA link, no empty video element), plus the home section:
  - autoplay advances while in view and stops on click
  - arrow keys move between tabs
  - with reduced motion there's no autoplay
  - no sideways scroll at 360px
  - all three "Read the full example" links resolve
- **Lighthouse,** mobile and desktop: home, /examples/ and one example page. CLS must stay at 0.
- Preview, then production.
- **STATE.md:** record the sprint, what shipped and the open items:
  - Simon to build and record the three demos (voice note to quote, supplier invoices into Xero, repair requests); the `video` field is ready for them.
  - Readiness Check EU questions.
  - The Copilot guide.
  - A /websites page.

## 6. Report back

Under 200 words, with:
- screenshots of the home section at 1280px and 390px, /examples/ and one example page
- the Lighthouse table
- which no-JS fallback you chose
- typos fixed.
