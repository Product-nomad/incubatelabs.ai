# incubatelabs.ai

Site source for [incubatelabs.ai](https://incubatelabs.ai) — a services brand offering structured AI delivery engagements under the **Incubate** methodology.

> **Phase:** Frame → Build (v0 scaffold). Site lives; Cal.com, Plausible, and DNS still need wiring. See [`STATE.md`](./STATE.md).

## Stack

- **Astro** (static site)
- **Tailwind CSS** + **Inter** (self-hosted via `@fontsource`)
- **Cloudflare Pages** for hosting
- **Cal.com** for booking (placeholder until account is set up)
- **Plausible Analytics** (cookieless, EU-hosted, opt-in via env var)

## Local dev

```bash
npm install
cp .env.example .env   # optional — Plausible only fires if PUBLIC_PLAUSIBLE_DOMAIN is set
npm run dev
```

Then open the URL Astro prints.

## Build

```bash
npm run build
npm run preview   # preview the built site locally
```

Output lands in `dist/`. Cloudflare Pages picks it up via `npm run build`.

## Sitemap

| Path | Page |
|---|---|
| `/` | Home — hero, three paid packages, three free triage offerings, proof points |
| `/methodology/` | The Incubate methodology overview (8 patterns, 6 phases, 6 agents, 5 trust principles) |
| `/services/` | Services index + flagship engagement |
| `/services/oss-tool-hardening-pass/` | £2k, 2-day package detail |
| `/services/ai-governance-pack/` | £4k, 5-day package detail |
| `/services/local-llm-pilot/` | £8k, 10-day package detail |
| `/free/` | Three free triage offerings, in detail |
| `/contact/` | Cal.com embed + email + working hours |
| `/privacy/` | Privacy notice — sub-processors named, no dark patterns |

## Governance

Like every other Product-nomad repo, this one ships a governance scaffold:

- [`THREAT_MODEL.md`](./THREAT_MODEL.md) — trust boundary, sub-processors, in-scope risks.
- [`DECISIONS.md`](./DECISIONS.md) — material architectural decisions, dated.
- [`CHANGELOG.md`](./CHANGELOG.md) — Keep-a-Changelog format.
- [`STATE.md`](./STATE.md) — current state across `/clear` boundaries.
- [`CONTEXT.md`](./CONTEXT.md) — single source of truth for the brand's domain language.

Per `~/WAYS_OF_WORKING.md` §13, the site copy uses the terms in `CONTEXT.md` exactly. Aliases drift; this is the source of truth.

## Licence

The **site code** is MIT (see [`LICENSE`](./LICENSE)). Site **content** (copy, methodology) is © Incubate Labs; ask before reproducing wholesale.

The **Incubate methodology spec** itself lives at [Product-nomad/incubate](https://github.com/Product-nomad/incubate) (separate repo, separate licence).
