Build the incubatelabs.ai v1.1 update described below (this replaces any separate v1.1 or v1.2 instructions). First save this whole message to design/v1.1/spec.md in the repo, then follow it exactly. If work on an earlier v1.1 prompt is already in progress on branch v1.1-brand-hero, continue on that branch and add what's missing; otherwise create it from the current v1 branch (or main if v1 is merged). Check pwd is /home/vpc/projects/incubatelabs.ai first.

## Rules (v1 rules still apply unless changed here)
- No Incubate Labs prices anywhere. A £ sign is allowed in one place only: the Readiness Check cost estimate (§10), because it shows the visitor's own costs.
- Never mention CPMAI. No client names. No placeholder text live. UK English.
- No location shown anywhere except the legal line (§9).
- No mention of Iraq anywhere.

## Summary
1. Brand tokens now; logo files arrive later (§1)
2. New "lost day" interactive hero (§2)
3. "Sound familiar?" replaces "Who we work with" (§3)
4. Use-case cards get illustrations (§4)
5. "Not everything needs AI" becomes an asked-for vs fix list (§5)
6. New cost-check section (§6)
7. Engagement cards and How we work changes (§7)
8. "Things I've built" becomes "Projects" (§8)
9. De-personalise the site and remove location (§9)
10. Readiness Check cost estimate (§10)

## 1. Brand
- Logo files arrive separately as a later commit to public/brand/. Until then, keep the current text logo and favicon. When they land, the lockup goes in the nav (36px tall) and footer (32px tall), single-colour currentColor with color #16181a, and the home link keeps aria-label="Incubate Labs, home".
- Add these Tailwind tokens:
  - admin #c96f4a and admin-deep #8c4a30: hero admin blocks only (a deliberate, contained exception to the green-only rule)
  - night #16181a: hero card ground
  - night-raised #2b3035: customer-work blocks
  - accent-bright #6cbf9a: green on dark grounds

## 2. New hero: "the lost day"
Replaces the current homepage hero entirely.

Layout: two columns on desktop, stacked on mobile. Copy on the left. On the right, a dark card (night, border-radius 20px, soft large shadow) holding an interactive week planner. Below both, a full-width strip of four sourced stats. The page background stays paper.

Copy (word for word):
- Eyebrow: AI and automation for UK small businesses
- H1: Small businesses lose more than a day a week to admin.
- Lead: Owners average 11 hours. Their staff are already reaching for AI to claw it back, mostly unofficially. We find where it genuinely helps, build it into the tools you already use, and keep a person checking what matters.
- Buttons: "Talk it through" (primary, links to /contact/) and "Find your hours: free check" (secondary, links to /readiness-check/)
- Keep the H1 in one constant; it may change after the SEO research.

The week card:
- Top-left caption (12px, #8b9196): "An illustrative week · owner of a 12-person trades firm"
- Big number, crossfading between two states:
  - Before: "11h lost to admin". The number is 52px serif; the label is 15px #b9bdc1.
  - After: "8h back" (the 8h in accent-bright), plus "3h checking" (3h at 30px).
- Top right: a segmented toggle, "This week" | "With Incubate Labs". Use real <button>s with aria-pressed. Active is #f1efe9 on dark; inactive is transparent with #b9bdc1 text.
- Grid: a 40px time column, then 5 day columns. A day-label row (Mon to Fri), then 17 half-hour rows of 21px from 9:00, with an hour label every 2 rows. Column gap 6px, row gap 2px.
- Blocks: use exactly this data. Each entry is [start (half-hour index from 9:00), length, kind, label]. Kind: w = customer work, a = admin, c = admin that becomes "a person checks".

```js
[
 [[0,2,'a','Inbox triage'],[2,5,'w','Site visit'],[7,1,'a','Chasing payments'],[8,4,'w','Customer work'],[12,2,'a','Re-typing job details'],[14,3,'w','Team catch-up']],
 [[0,1,'a','Inbox'],[1,6,'w','Customer work'],[7,2,'c','Writing quotes'],[9,7,'w','On site'],[16,1,'a','Timesheets']],
 [[0,2,'c','Supplier invoices'],[2,4,'w','Customer calls'],[6,1,'a','Chasing'],[7,6,'w','Customer work'],[13,2,'a','Re-typing into accounts'],[15,2,'w','Planning']],
 [[0,1,'a','Inbox'],[1,5,'w','On site'],[6,2,'c','Supplier questionnaire'],[8,8,'w','Customer work'],[16,1,'a','Quote follow-ups']],
 [[0,2,'a','Weekly report'],[2,6,'w','Customer work'],[8,1,'a','Invoices'],[9,7,'w','Team and sales'],[16,1,'a','Inbox']]
]
```

  Admin totals 22 half-hours (11h): 6 (c) become 3h of checking, and 16 (a) become 8h back. Keep these consistent with the big number.
- Block styles:
  - w, both states: night-raised fill, label #b9bdc1.
  - a and c, before: a 135° hatch of admin/admin-deep in 4px stripes, a 1px admin border, label #fff6f0.
  - a, after: rgba(108,191,154,.08) fill, 1.5px dashed accent-bright border, label "Time back" in accent-bright.
  - c, after: solid accent-bright fill, a soft green glow, dark label. Labels: "You check: quotes" (Writing quotes), "You approve: invoices" (Supplier invoices), "You check: answers" (Supplier questionnaire).
  - Labels are 10.5px, weight 500, ellipsised, and hidden below 640px.
  - Each block has a title tooltip: its label, or after the switch, "Time back (was: <label>)".
- Transition: colours, borders and labels crossfade over 0.7s, staggered 35ms per block in reading order, via a --d custom property used as transition-delay.
- Legend (11.5px): Customer work · Admin (hatched swatch) · A person checks (solid green) · Time back (dashed green).
- Footnote under the card (11.5px, #6f757b): "Illustrative. Admin time is the UK average reported by owners in the Amex SME Business Barometer 2026. Time back reflects the roughly 8 hours a week workers report saving with AI tools (Microsoft, 2025)."

Behaviour: one small vanilla-JS island, no framework runtime. Render all blocks at build time in Astro; the script only toggles data-state="before|after" on the card, and CSS does the rest.
- Autoplay: switch to after at 2.4s, then alternate every 6.5s.
- Clicking either toggle sets that state and stops autoplay for good.
- Pause autoplay when the card is off-screen (IntersectionObserver) or the tab is hidden.
- prefers-reduced-motion: no autoplay and no transitions. Show the before state; the toggle still works.
- Accessibility: the grid is aria-hidden="true". Beside it, add a visually hidden paragraph: "In a typical week, about 11 hours go on admin such as invoices, chasing payments and re-typing. With Incubate Labs, about 8 of those hours come back and 3 are spent checking the work." The toggles have visible focus rings.

Stats strip, below both columns: a 1px ink top rule, then four columns that wrap on mobile. Each has a 40px serif figure, a 14px line of text and a 12px external source link (rel="noopener"). The columns fade and rise in, staggered 0.15s, with no animation under reduced motion.
- 11 hrs | a week the average UK small business owner spends on admin and finance. | Amex SME Barometer, 2026 → https://retailtimes.co.uk/amex-sme-barometer-small-business-owners-spend-nearly-twice-the-time-on-admin-than-growing-their-business/
- 71% | of UK workers have used AI tools their employer never approved. | Microsoft and Censuswide, 2025 → https://www.euronews.com/next/2025/10/14/most-uk-employees-use-ai-at-work-without-permission-microsoft-survey-finds
- 14% vs 36% (the "vs 36%" smaller and muted) | of micro businesses use AI, against more than a third of large firms. | UK Government AI Adoption Research, 2026 → https://www.gov.uk/government/publications/ai-adoption-research/ai-adoption-research
- No.1 | reason firms give for not using AI: they haven't found where it fits. That's the part we do. | same link as above

Performance:
- No images and no new fonts.
- The island script stays under 3 KB.
- The H1 and lead are in the static HTML.
- Mobile Lighthouse performance stays at 95+.

## 3. "Sound familiar?" replaces "Who we work with"
Layout: heading and intro on the left (about 1/3 of the width). On the right, a grid of six cards: repeat(auto-fit, minmax(280px, 1fr)), 12px gap, paper background, 1px line border, radius-lg, 18px/20px padding, 17px text. Each card leads with a 22px hexagon icon:
<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,2 20.7,7 20.7,17 12,22 3.3,17 3.3,7" fill="#e8efe9" stroke="#1f5c45" stroke-width="2"/></svg>
- H2: Sound familiar?
- Intro: For owner-run UK businesses of 5 to 50 people, without an IT department.
- Link: If three or more ring true, let's talk → (to /contact/)
- Cards:
  - Evenings and weekends go on admin you'd love to hand off
  - You're about to hire someone mainly to keep up with paperwork
  - The same details get typed into three different systems
  - Your team already uses ChatGPT, on personal accounts, with no rules
  - You know AI could help, but not where, or what it would pay back
  - Quotes and replies wait until the one person who knows has time

## 4. Use-case cards with illustrations
On the home page and /use-cases/, each UseCaseCard gets an illustration panel at the top: surface-band background, a bottom border, and an SVG 120px tall. Use these six SVGs exactly, as one component each in src/components/illustrations/, in this order: document handling, admin & data re-entry, reporting, customer replies, quotes & proposals, compliance questionnaires. Also show each one at 200px tall at the top of its use-case detail page, under the breadcrumb.

```html
<svg viewBox="0 0 240 120" aria-hidden="true"><g fill="#fbfaf7" stroke="#16181a" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"><rect x="70" y="14" width="76" height="96" rx="6"/><rect x="82" y="8" width="76" height="96" rx="6"/></g><g fill="#e8efe9" stroke="#1f5c45" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"><rect x="94" y="20" width="76" height="96" rx="6"/><line x1="108" y1="42" x2="156" y2="42"/><line x1="108" y1="58" x2="148" y2="58"/><line x1="108" y1="74" x2="152" y2="74"/></g><g fill="none" stroke="#16181a" stroke-width="2.5" stroke-linecap="round"><path d="M170 68 H204"/><circle cx="210" cy="68" r="6" fill="#f4f2ed"/><path d="M36 68 H70"/><circle cx="30" cy="68" r="6" fill="#f4f2ed"/></g></svg>

<svg viewBox="0 0 240 120" aria-hidden="true"><g fill="#fbfaf7" stroke="#16181a" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"><rect x="14" y="36" width="56" height="48" rx="6"/><rect x="170" y="36" width="56" height="48" rx="6"/><line x1="26" y1="54" x2="58" y2="54"/><line x1="26" y1="66" x2="50" y2="66"/><line x1="182" y1="54" x2="214" y2="54"/><line x1="182" y1="66" x2="206" y2="66"/><path d="M70 60 H90" fill="none"/><path d="M150 60 H170" fill="none"/></g><g fill="#e8efe9" stroke="#1f5c45" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"><rect x="92" y="30" width="56" height="60" rx="6"/><line x1="104" y1="48" x2="136" y2="48"/><line x1="104" y1="60" x2="128" y2="60"/><polyline points="108,74 116,80 132,68" fill="none"/></g><g fill="#f4f2ed" stroke="#16181a" stroke-width="2.5"><circle cx="90" cy="60" r="5"/><circle cx="150" cy="60" r="5"/></g></svg>

<svg viewBox="0 0 240 120" aria-hidden="true"><polyline points="50,10 50,108 196,108" fill="none" stroke="#16181a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><g fill="#fbfaf7" stroke="#16181a" stroke-width="2.5" stroke-linejoin="round"><rect x="64" y="68" width="18" height="40" rx="3"/><rect x="92" y="52" width="18" height="56" rx="3"/><rect x="120" y="60" width="18" height="48" rx="3"/><rect x="176" y="40" width="18" height="68" rx="3"/></g><rect x="148" y="22" width="18" height="86" rx="3" fill="#e8efe9" stroke="#1f5c45" stroke-width="2.5"/><g fill="none" stroke="#1f5c45" stroke-width="2.5" stroke-linecap="round"><path d="M157 14 V6 H206"/><circle cx="212" cy="6" r="5" fill="#f4f2ed"/></g></svg>

<svg viewBox="0 0 240 120" aria-hidden="true"><path d="M40 12 H140 V60 H74 L56 76 V60 H40 Z" fill="#fbfaf7" stroke="#16181a" stroke-width="2.5" stroke-linejoin="round"/><g stroke="#16181a" stroke-width="2.5" stroke-linecap="round"><line x1="56" y1="30" x2="122" y2="30"/><line x1="56" y1="44" x2="104" y2="44"/></g><path d="M100 54 H200 V102 H184 V118 L166 102 H100 Z" fill="#e8efe9" stroke="#1f5c45" stroke-width="2.5" stroke-linejoin="round"/><g stroke="#1f5c45" stroke-width="2.5" stroke-linecap="round"><line x1="116" y1="72" x2="184" y2="72"/><line x1="116" y1="86" x2="164" y2="86"/></g></svg>

<svg viewBox="0 0 240 120" aria-hidden="true"><rect x="80" y="12" width="80" height="104" rx="6" fill="#fbfaf7" stroke="#16181a" stroke-width="2.5"/><rect x="100" y="6" width="40" height="14" rx="4" fill="#f4f2ed" stroke="#16181a" stroke-width="2.5"/><g stroke="#16181a" stroke-width="2.5" stroke-linecap="round"><line x1="94" y1="38" x2="146" y2="38"/><line x1="94" y1="52" x2="138" y2="52"/><line x1="94" y1="66" x2="142" y2="66"/></g><rect x="94" y="80" width="52" height="24" rx="4" fill="#e8efe9" stroke="#1f5c45" stroke-width="2.5"/><polyline points="110,92 117,98 130,86" fill="none" stroke="#1f5c45" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><g fill="none" stroke="#16181a" stroke-width="2.5" stroke-linecap="round"><path d="M40 60 H80"/><circle cx="34" cy="60" r="6" fill="#f4f2ed"/><path d="M160 92 H200"/><circle cx="206" cy="92" r="6" fill="#f4f2ed"/></g></svg>

<svg viewBox="0 0 240 120" aria-hidden="true"><rect x="56" y="8" width="128" height="104" rx="6" fill="#fbfaf7" stroke="#16181a" stroke-width="2.5"/><g fill="#e8efe9" stroke="#1f5c45" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"><rect x="72" y="24" width="18" height="18" rx="3"/><polyline points="76,33 80,37 87,29" fill="none"/><rect x="72" y="52" width="18" height="18" rx="3"/><polyline points="76,61 80,65 87,57" fill="none"/></g><rect x="72" y="80" width="18" height="18" rx="3" fill="#fbfaf7" stroke="#16181a" stroke-width="2.5" stroke-dasharray="4 4"/><g stroke="#16181a" stroke-width="2.5" stroke-linecap="round"><line x1="102" y1="33" x2="166" y2="33"/><line x1="102" y1="61" x2="158" y2="61"/><line x1="102" y1="89" x2="150" y2="89"/></g></svg>
```

## 5. "Not everything needs AI"
Keep the H2 and the intro paragraph. Replace the second paragraph with a list:
- A header row: "What gets asked for" | "What often fixes it".
- Four row cards. In each, the left text is muted with strikethrough, then a green arrow, then the right text in medium weight:
  - An AI chatbot for customers → A set of good saved replies
  - AI to move data between systems → A direct link between the two
  - AI to work out what to charge → Clear pricing rules you can check
  - AI to read documents that always look the same → A simple template rule
- Use real list markup.

## 6. New homepage section: the cost check
Placement: between "Not everything needs AI" and the engagement cards.

Copy (word for word):
- Eyebrow: The cost check
- H2: Three numbers before we build anything.
- Intro: Every discovery ends with a one-page cost check. You see what the job costs you now, what you'd save, and what it will really cost to run, including if AI prices rise. If it doesn't pay back, we'll tell you not to build it.

Three cards in a row (stacked on mobile), numbered 1–3 in large serif accent numerals:
1. Title: What it costs you now
   Body: The hours your team spends on the job, valued properly, plus the direct costs: software, freelancers, rework and late payments.
2. Title: What you'd save
   Body: Hours back and direct costs removed, minus the time your team still spends checking the work. No inflated numbers.
3. Title: What it costs to own
   Body: The build, plus everything it takes to run for the next 12 to 24 months: AI usage, software, hosting and upkeep. Stress-tested against AI prices doubling and tripling.

Below the cards: a wide panel (surface-band, radius-xl), with the chart on the left and the text on the right, stacking on mobile.

Panel text:
- H3: Built to survive AI price rises
- Body: AI providers are moving from winning market share to protecting margins, and prices are already rising. So we design for it:
- Bullets:
  - AI only where judgement is needed. Everything else is plain, predictable software.
  - The smallest model that does the job, tested against cheaper options before go-live.
  - Not tied to one provider. Switching doesn't mean rebuilding.
  - Spending caps and monthly alerts, so there are no surprise bills.
  - Local models where it makes sense, with no per-use charges at all.
- Source line (12px, muted): "Why prices are rising:" then link "Tomasz Tunguz, AI model inflation" → https://www.tomtunguz.com/ai-model-inflation/index.md (external, rel="noopener").

Panel chart: a static inline SVG of about 520×280, with role="img" and aria-label "Illustrative payback: the project pays back at today's AI prices, at double and at triple, just later each time."
- Draw cumulative net savings against months 0–24, with no y-axis figures.
- A dashed zero line labelled "Break-even".
- Three lines, all starting below zero at month 0 (the build cost) and rising:
  - "Today's AI prices": accent, 2.5px, crosses zero around month 4
  - "AI prices ×2": ink, 2px, crosses zero around month 6
  - "AI prices ×3": muted, 2px dashed, crosses zero around month 9
- Label each line at its right end.
- X-axis ticks at 0, 6, 12, 18 and 24 months.
- Caption under the chart (12px muted): "Illustrative. Your cost check uses your own numbers."
- Lines draw in once when scrolled into view (stroke-dashoffset, 1.2s, staggered 0.2s), with no animation under reduced motion.

## 7. Engagement cards and How we work
On the home page and /how-we-work/:
- Each engagement card gets a row of green hexagons showing its size: Quick Win 1, Automation Sprint 2, Operations Uplift 3.
- The Automation Sprint card gets an ink border and a pill badge, "Where most clients start", overlapping its top edge.
- Quick Win body becomes: "One task, one fix. A small, fast piece of work that shows whether AI is worth it for your business." Remove "earns its place" everywhere.

On /how-we-work/ only:
- Step 2 title becomes "A written scope and cost check". New body: "We send back a short, plain-English scope with a one-page cost check: what the job costs you now, what you'd save, and what it will cost to own, stress-tested against rising AI prices. Then a fixed price."
- Add the §6 section, without the chart panel, above "What you can hold us to".
- Add one line to "What you can hold us to": "A cost check before any build, including what happens if AI prices rise".

## 8. Projects (was "Things I've built")
- Rename the nav item, footer link, section heading and page title to "Projects". The URL stays /work/.
- Intro: Real, working builds: tools in use today and proofs of concept that tested an idea properly.
- Four cards (label | name | description | link):
  - Agentic pipeline | attestloop | Reads regulatory documents, pulls out the obligations and maps them to control frameworks. | its GitHub repo
  - Live tool | removepii | Strips personal data from UK documents before they go near an AI. Runs on a local model, in memory only, with nothing uploaded. | https://removepii.co.uk
  - Autonomous agent | publicguard | Scans public GitHub repositories for exposed passwords and keys, then opens a polite issue for the owner, with a person checking each one first. | its GitHub repo
  - Proof of concept | Retail AI proof of concept | A fictional retailer made ready for AI agents: orders placed through a standard interface, every call metered, a checkout app on top. It showed the data, not the AI, is most of the work. We measured the running cost per order: under a tenth of a penny. | no link: it's private, so the card isn't clickable
- attestloop, removepii and publicguard are set in monospace; the retail card name in the serif. Never name the platform or the people involved in the retail work.
- Check every link resolves before using it.
- Each card has a 16:10 image slot. Until screenshots arrive, fill it with a solid panel (ink, accent-soft or surface-band) showing the project name. Never show "[Screenshot]" text. Leave a slot at /public/projects/<name>.webp for later.
- Update /work/ to match. The v1 Readiness Check card stays there as a fifth item.

## 9. De-personalise the site and remove location
- Footer: remove "Huntingdon, Cambridgeshire" from the contact column.
- Contact page: remove the "Where we are" section.
- JSON-LD: remove the address object. Keep areaServed United Kingdom.
- Home founder section:
  - Heading: "Hands-on from the first call to the handover."
  - Text: "Incubate Labs is run by Simon Newton. Before this, Simon spent years delivering operations and technology programmes, most recently as a Lead Product Delivery Manager at Ocado, after an earlier career in the British Army."
  - Remove the timeline row. Keep the "More about Simon →" link.
  - No photo slot and no placeholder.
- About page: remove the Iraq timeline entry and all location references. Don't change anything else on About.
- Legal line: leave unchanged for now ("Incubate Labs is the trading name of Simon Newton, a sole trader based in Huntingdon, Cambridgeshire."), and flag it in STATE.md.
- Afterwards, search src/ for "Huntingdon", "Cambridgeshire", "Iraq" and "I've built". The legal line should be the only hit.

## 10. Readiness Check: rough cost estimate
- After the existing questions, add three short inputs:
  - Roughly how many hours a week go on the jobs you picked? (number)
  - Roughly what does an hour of that person's time cost you? (number in £, with helper text "Salary plus about 30% for NI, pension and overheads. A rough figure is fine.")
  - Any software or outside help you pay for to do these jobs, per month? (number in £, optional)
- On the result screen, add a "What this is costing you" box:
  - Annual cost = hours × rate × 46 working weeks + monthly spend × 12.
  - Show it rounded to the nearest £100, as "Roughly £X a year".
  - Line under it: "A cost check on a call would show how much of that could come back, and what it would cost to run."
- All the maths runs in the browser. These numbers are only sent if the visitor chooses "Send my result to Simon", and then they go with the result.
- Add one sentence to the privacy page noting that the Readiness Check can include these figures when sent.

## 11. Acceptance checks (stop and report if any fail)
1. npm run build succeeds. The page count is unchanged. The sitemap is regenerated.
2. No banned strings in dist/ (excluding CSS): CPMAI, TODO, [TBC], [Screenshot, Iraq, earns its place, Things I've built. £ appears only in the Readiness Check script and template. "Huntingdon" appears only in the legal line.
3. Hero, tested in a real browser:
   - It autoplays to after at about 2.4s.
   - A click stops autoplay.
   - Tab reaches both toggles, and Enter switches state.
   - Under reduced motion: no autoplay or transitions, showing the before state.
   - Totals stay 11h, 8h and 3h.
4. All five external links (four stats plus the Tunguz article) return 200.
5. Cost-check chart: it has its aria-label, and the lines don't animate under reduced motion.
6. Readiness Check: test inputs of 10 hours, £25 an hour and £50 a month give "Roughly £12,100 a year". The figures are sent only on "Send my result to Simon".
7. Home page Lighthouse, mobile and desktop: performance 95+, accessibility 100, SEO 100. No horizontal scroll at 390px.
8. Take screenshots at 1280px and 390px of: the home page in both hero states, the cost-check section, /how-we-work/, /work/, one use-case page and the Readiness Check result. Save them to .screens/v1.1/, then STOP and show me before merging or deploying.

## 12. Open decisions (don't build; list them in STATE.md)
- Final H1: pending the SEO report in research/seo-2026-10/
- Legal line: keep the town, or use a business address
- About page voice: Simon doesn't want the site to read as a one-person operation
- Founder photo: on hold
- "Works with the tools you already use" strip: not confirmed, so don't build it
- Project screenshots: Simon to supply
- Logo files: arriving separately

## 13. Deploy
Same as v1 §11. Deploy a preview, wait for my sign-off on the screenshots, then merge and deploy to production.

## 14. SEO addendum (overrides earlier sections where they conflict)
Source: research/seo-2026-10/ (README.md, page-map.md, technical-audit.md). Read all three before building.

1. Hero copy (replaces §2 copy; the week card, stats strip and behaviour stay as specified):
   - Eyebrow: AI consultant for UK small businesses
   - H1: Practical AI and automation for small businesses without an IT team.
   - Lead: Owners lose more than a day a week to admin. We take the repetitive work off your team's plate, at a fixed price agreed up front, with a person checking what matters.
   - Buttons: unchanged.
   - Home <title> and meta description: use the ones in page-map.md for the home page, within its character limits.
2. Use-case pages: apply the rename table in README.md (page names, H1s, title tags, meta descriptions and the secondary terms to cover). Use the recommended slugs, adding a 301 redirect from each old slug in public/_redirects. Keep the card copy, illustrations and order from §4, updating only the names. Where the table's name is clumsy as a card title, keep a short display name on the card and use the search wording in the page H1 and title tag. List each name you changed in your report.
3. Thin pages: expand each use-case page with the content the audit says is missing, using only the secondary terms and questions in page-map.md. Add an "Questions we get asked" block of 3–4 questions per page, answered in the site's plain voice, with FAQPage structured data. No invented statistics, prices or client claims.
4. Technical audit: apply every fix in technical-audit.md, in its priority order, except anything that conflicts with this spec, which wins: no location (except the legal line), no prices, no Iraq. List any fix you skipped and why.
5. Structured data: add Service schema to each use-case page, as the audit recommends. Keep the ProfessionalService schema without an address.
6. Social image: create a 1200×630 OG image (public/og-image.png). Use a paper background, the H1 in Source Serif 4 Semibold in ink, "incubatelabs.ai" in accent, and a hatched-to-green strip echoing the hero blocks. Text logo only, since the logo files haven't arrived. Reference it in Layout for og:image and twitter:image, and switch the Twitter card to summary_large_image.
7. Don't build these. List them in STATE.md as next steps:
   - Google Business Profile, set up as a service-area business with the address hidden (Simon does this manually)
   - Content: a guide on Microsoft Copilot pricing and value for small businesses (the competitor gap the research found)
   - GitHub bio update (Simon, manual)
   - The README's "based near Huntingdon" suggestion: NOT applied. Simon chose to show no location, so GBP will carry the local signal instead.
8. Don't commit research/seo-2026-10/raw/ (35 MB). Add it to .gitignore. Commit the rest of the research folder.
9. Add to §11 acceptance checks:
   - every title is 60 characters or fewer and every meta description 155 or fewer
   - the OG image renders in a card validator
   - FAQPage and Service markup pass the Rich Results Test
   - each redirect returns 301 to the right page
