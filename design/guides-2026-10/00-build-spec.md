# Build spec: AI rules content cluster (sprint 2026-10-12)

Repo: /home/vpc/projects/incubatelabs.ai. UK English. Copy is final: don't rewrite it. Fix obvious typos only and list them in your report.

Source files (this Drive folder):
- 01-eu-ai-act-uk.md → /guides/eu-ai-act-uk/ (main guide)
- 02-ai-policy-template.md → /resources/ai-policy-template/
- 03-article-50-chatbots.md → /guides/eu-ai-act-article-50-chatbots/
- 04-uk-ai-act.md → /guides/uk-ai-act/
- 05-ai-literacy-training-staff.md → /guides/ai-literacy-training-staff/

Each file has YAML front matter (slug, target keyword, title, meta description, H1, last_reviewed, schema) and the page body in Markdown. The body's first `# ` heading is the H1. Don't render it twice.

## 1. Content setup

- Add an Astro content collection (e.g. `src/content/guides/`), with the policy template either in the same collection with a `type: resource` flag or in its own collection. Use whichever fits the codebase.
- Front matter drives `<title>`, meta description, canonical, OG/Twitter tags and `dateModified`.
- Keep the `target_keyword`, `secondary_keywords` and `note_for_build` fields out of the rendered HTML.

## 2. Guide layout

One layout for all five pages, in the existing site style (paper background, Source Serif headings, Inter body, max reading width about 68ch):

- **Breadcrumbs:** Home › Guides › [page] (the template uses Home › Resources › AI policy template). Include BreadcrumbList JSON-LD.
- **Under the H1:** a muted line with "Last reviewed: [date]" (from front matter, formatted "12 October 2026") and "Practical guidance, not legal advice." The body already contains this line as bold text, so render it from front matter and strip the duplicate from the body, or style the body line. Don't show it twice.
- **Prose styles:** tables (1px `line` borders, `band` header row, horizontal scroll on mobile), blockquote (accent left border, `accent-soft` background; used for the chatbot example message), numbered and bulleted lists, inline links in `accent`.
- **"How we can help" section:** render it as a callout card (`accent-soft` background, 1px border, `radius-lg`). The "Talk it through →" link becomes the primary button style and goes to /contact/.
- **"Frequently asked questions":** keep it visible on the page and emit FAQPage JSON-LD from the bold-question/answer pairs. Questions and answers must match the visible text exactly.
- **"Sources":** smaller muted text. Links open in the same tab and use `rel="noopener"` (no nofollow).
- **JSON-LD Article:** headline = H1, `dateModified` and `datePublished` = last_reviewed, author and publisher = Organization "Incubate Labs" with the existing logo URL. No Person author.
- **End of page:** a "More guides" strip listing the other four pages as cards (title plus meta description).

## 3. AI policy template page

- The template is the block between the two `---` horizontal rules in the body. Render it in a bordered "document" panel (paper background, line border, slightly inset).
- Above the panel, replace the placeholder line "[Download Word (.docx)] [Download Markdown (.md)] [Copy to clipboard]" with three real buttons:
  - **Download Word (.docx):** generate at build time from the template block (pandoc or the docx npm package), with title "[Business name] AI use policy", Inter or Arial, and tables kept as tables. Serve at /resources/ai-policy-template/incubatelabs-ai-policy-template.docx.
  - **Download Markdown (.md):** the template block as a .md file at the same path with a .md extension.
  - **Copy to clipboard:** a small vanilla JS island that copies the Markdown. Show "Copied" for 2 seconds and keep the button accessible.
- No email gate and no tracking on the downloads.
- **Placeholders:** the square-bracket fields ([Business name], [Name], [Date], and so on) in the template are intentional. Whitelist them from the banned-strings or placeholder check for this page's template block only. Placeholders anywhere else must still fail the build.

## 4. /guides/ index page

- H1 "Guides". Intro: "Plain-English guides to the rules on AI for UK small businesses. Each one has a last-reviewed date, because the rules keep changing."
- Cards: the main guide first and visually larger, then Article 50, UK AI Act, AI literacy, then the policy template as a "Free resource" card.
- Title: "AI Rules Guides for UK Small Businesses | Incubate Labs". Meta description: "Plain-English guides to the EU AI Act, UK AI rules, chatbot disclosure and AI literacy for UK small businesses, plus a free AI policy template."
- /resources/ has no index page. Link the template from /guides/ only.

## 5. Internal links

- **Footer:** add a "Guides" column (or extend an existing one) linking to /guides/, the main guide, the Article 50 guide and the AI policy template. Keep the footer balanced at 390px.
- **Nav:** no change.
- **Home "Sound familiar?":** on the item about staff using ChatGPT on personal accounts with no rules, link the phrase "no rules" (or the whole item if that reads better) to /resources/ai-policy-template/.
- **/use-cases/ai-email-replies/:** add one sentence at the end of the body: "If an AI drafts or sends replies to customers, see [what the EU AI Act says about disclosure](/guides/eu-ai-act-article-50-chatbots/)."
- The guides' own links to /use-cases/#websites and /contact/ must resolve.

## 6. SEO and checks

- Add all six new URLs to the sitemap and submit them via IndexNow.
- **OG images:** generate one per page with the existing OG generator, using the H1 as the headline.
- **External links:** check every external link in the five files returns 2xx or 3xx. Report any failures with the URL. Don't swap in replacements yourself.
- **Banned strings:** run the full check. There must be no pricing, no CPMAI, no client names, no Iraq and no location (except the legal footer line).
- **Before production:** build, run the browser checks plus new ones for each page (H1 present, FAQ JSON-LD valid, downloads return 200 with the correct content type, copy button works), Lighthouse mobile and desktop on the main guide and the template page, and schema validation on the main guide and the template page.
- Deploy to preview, then production.
- Update STATE.md: the sprint scope, what shipped, and open items (AI literacy SERP check, Readiness Check EU questions later, Copilot guide, /websites page).

## 7. Report back

Screenshots of the main guide, the template page and /guides/ at 1280px and 390px; the external link check results; typos fixed; Lighthouse table; schema validation results.
