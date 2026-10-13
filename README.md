# incubatelabs.ai

Site source for [incubatelabs.ai](https://incubatelabs.ai): practical AI and automation for UK small businesses without an in-house IT team.

> **Status:** v1 in build. See [`STATE.md`](./STATE.md).

## Stack

- **Astro 5** (static) + **Tailwind 3**, **Inter** and **Source Serif 4** self-hosted via `@fontsource`
- **Cloudflare Pages** for hosting, with one Pages Function (`functions/api/contact.ts`)
- **`workers/mailer`**: internal Worker that sends form enquiries through Cloudflare Email Routing
- **Cloudflare Turnstile** on the contact form
- **Google Calendar** appointment schedule for bookings
- **Plausible Analytics** (cookieless, opt-in via `PUBLIC_PLAUSIBLE_DOMAIN`)

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
| `/` | Home |
| `/use-cases/` | What we automate |
| `/use-cases/<slug>/` | Six use-case pages, from `src/data/useCases.ts` |
| `/examples/` | Worked examples index |
| `/examples/<slug>/` | Eight worked examples, from `src/content/examples/` |
| `/how-we-work/` | Process and the three engagement sizes |
| `/work/` | Things I've built |
| `/readiness-check/` | Free AI readiness check (runs in the browser; logic in `src/data/readiness.ts`) |
| `/about/` | About Simon |
| `/contact/` | Form, booking and email |
| `/contact/thanks/` | No-JS form confirmation (noindex, not in sitemap) |
| `/privacy/` | Privacy notice |
| `/404` | Not found |
| `/api/contact` | Form endpoint (POST) |

## Deploy

Needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the environment.

```bash
# 1. Mailer Worker (once, and whenever workers/mailer changes)
cd workers/mailer
npx wrangler deploy
npx wrangler secret put FORM_DESTINATION      # verified Email Routing destination
cd ../..

# 2. Turnstile secret for the Pages project (once)
npx wrangler pages secret put TURNSTILE_SECRET_KEY --project-name incubatelabs

# 3. Build with the public Turnstile site key and deploy
PUBLIC_TURNSTILE_SITE_KEY=<site key> npm run build
npx wrangler pages deploy dist --project-name incubatelabs --branch <branch>   # main = production
```

Local testing: put Cloudflare's test keys in `.dev.vars` (`TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA`) and `workers/mailer/.dev.vars` (`FORM_DESTINATION=...`), then run `npx wrangler dev` in `workers/mailer` and `npx wrangler pages dev dist` at the root.

## Governance

Like every other Product-nomad repo, this one ships a governance scaffold:

- [`THREAT_MODEL.md`](./THREAT_MODEL.md) — trust boundary, sub-processors, in-scope risks.
- [`DECISIONS.md`](./DECISIONS.md) — material architectural decisions, dated.
- [`CHANGELOG.md`](./CHANGELOG.md) — Keep-a-Changelog format.
- [`STATE.md`](./STATE.md) — current state across `/clear` boundaries.
- [`CONTEXT.md`](./CONTEXT.md) — single source of truth for the brand's domain language.

Per `~/WAYS_OF_WORKING.md` §13, the site copy uses the terms in `CONTEXT.md` exactly. Aliases drift; this is the source of truth.

## Licence

The **site code** is MIT (see [`LICENSE`](./LICENSE)). Site **content** (copy) is © Incubate Labs; ask before reproducing wholesale.
