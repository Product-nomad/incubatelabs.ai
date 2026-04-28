# Architectural decisions

One paragraph per decision, dated. Records the *why* so the same call doesn't get re-litigated.

## 2026-04-28 — Brand-first positioning, not methodology-first

Two paths into market: lead with the services brand and use Incubate as the underpinning methodology (brand-first), or lead with Incubate as a public methodology and have Incubate Labs be one team that practices it (methodology-first). Picked **brand-first** for v0 because it's the faster path to revenue — every page is a sales surface, the methodology page exists but supports rather than leads. Methodology-first remains a v0.2+ option once the per-phase spec is filled in. *Trade:* slightly less defensibility long-term vs. a published-book position; revisit if/when the spec matures.

## 2026-04-28 — Astro + Cloudflare Pages + Cal.com + Plausible

Stack chosen for a static content site with low maintenance burden and aligned values. **Astro** for zero-JS-by-default rendering, MDX support if we add a blog later, and instant rebuilds. **Cloudflare Pages** for free hosting, since the operator already runs Cloudflare for tunnels (`removepii.co.uk`); custom domain works on the free plan. **Cal.com** over Calendly because it's open source and EU-hosted, matching the privacy-first brand. **Plausible** over Google Analytics because it's cookieless (no consent banner needed), EU-hosted, and the pricing is honest. *Alternatives considered:* Next.js (heavier), Vercel (also fine but no existing relationship), Calendly (not aligned), Google Analytics (banner pollution + cross-jurisdiction). *Why rejected:* incumbents bring values mismatch we'd have to apologise for in `/privacy`.

## 2026-04-28 — Published prices on three packages, hidden price on flagship

eSynergy and most UK AI consultancies hide pricing entirely. Publishing fixed prices on the three packaged engagements (£2k / £4k / £8k) is the wedge against that posture. The flagship Incubate Engagement stays "from £25k, talk about scope" because bespoke scope justifies the conversation; the three packages exist precisely so we can publish them. *Why this matters:* founders and CFOs are sick of opaque day rates. Published prices signal confidence and remove an entire round of pre-sales friction. *Trade:* leaves money on the table for any package work that should have been larger; the qualifier on the contact form is "this looks like our package X — confirm scope" so we re-quote when wider scope appears.

## 2026-04-28 — Black-on-white text-only design for v0

No logo, no images, no illustrations, no hero gradient. Inter typography on near-white background, accent only on links and primary CTAs. Resists the most-procrastinated-thing-in-solo-founder-land (logo design) and ships v0 today. *Why:* every hour spent on visual identity at v0 is an hour not spent on copy, and copy is what closes deals. *Future:* Canva-grade OG image is the first visual asset to add; logo is deferred until there's a reason for one.

## 2026-04-28 — No first-party tracking cookies; cookieless analytics only

Plausible's cookieless model removes the entire consent-banner question. No banner, no dark-pattern surface, no compliance liability. Plausible is itself a sub-processor (disclosed on `/privacy/`), but the visitor experience never has a "We value your privacy" lie-modal. *Why:* matches the brand's data-sovereignty posture and aligns with the lesson learned on `999callsimulator` (where retrofitting consent gating onto Google Analytics was painful). Doing it right at v0 costs nothing.

## 2026-04-28 — Site source public from day one

`Product-nomad/incubatelabs.ai` repo is public from the first commit. *Why:* (a) every other Product-nomad repo is public so consistency matters, (b) building in public is the brand signal — buyers can see how the site is built before talking to us, (c) the source contains nothing sensitive (env vars are placeholder, no API keys). *Trade:* competitors can copy the structure. Acceptable; the structure isn't the moat — the methodology and the proof points are.

## 2026-04-28 — Methodology page ships at v0.1 honesty, not v1.0 polish

The Incubate spec is at v0.1 (skeleton with patterns + phases + agents named, but per-phase detail not written). The methodology page surfaces only what's actually defined and explicitly says "v0.1 skeleton — structural validation only" with a link to where the spec is going to live. Resisting the temptation to fake depth. *Why:* faking detail in v0 makes the v0.2 expansion look like a backfill; honest scope-naming makes the same expansion read as roadmap delivery. *Until full spec:* per-phase detail comes out of live engagements, written against real work, not in advance.

## 2026-04-28 — `hello@incubatelabs.ai` alias via Cloudflare Email Routing, not a hosted mailbox

Inbound mail to `hello@incubatelabs.ai` will be forwarded via Cloudflare Email Routing (free) to the operator's existing inbox. *Why:* zero new infrastructure, zero monthly cost, no IMAP/SMTP credentials to leak, alignment with the existing Cloudflare-everything posture. *Trade:* outbound mail uses the operator's personal address, which slightly weakens the brand surface. Acceptable for v0; if/when a sending alias is needed, set up via Cloudflare Email Routing's beta sending feature or a transactional provider like Resend.
