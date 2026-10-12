# EU AI Act content cluster: keyword research (October 2026)

Research only. No site files were changed.

**Data:**
- DataForSEO: Google UK (2826), English, pulled 12 October 2026. Volume is monthly UK searches; KD is difficulty on a 0–100 scale.
- **Spend: $0.30** ($48.91 → $48.61). The October SEO total is now $1.31 of the $10 cap.
- Raw responses are in `raw/eu-ai-act/` (gitignored). They are condensed copies of the MCP responses (see `NOTE.md` there), not full API dumps.

## 1. The 15 seed terms

Most of these terms are too specific to have measurable UK demand. 9 of the 15 return no volume at all. The phrase "small business" never shows up in what people search.

| Keyword | Vol | KD | CPC £ | Intent | Note |
|---|---:|---:|---:|---|---|
| ai policy template uk | 70 | 0 | 18.02 | info | Down 44% year on year |
| eu ai act deadlines | 40 | – | 23.36 | info | Peaked at 70 in May–Jul 2026 |
| eu ai act compliance checklist | 10 | – | 15.15 | info | |
| ai literacy requirement | 10 | – | – | info | |
| ai act article 4 | 10 | – | – | info | "eu ai act article 4" gets 30 |
| digital omnibus ai act | 10 | – | – | trans. | "eu ai act omnibus" gets 30 |
| eu ai act uk business · does the eu ai act apply to uk companies · eu ai act small business · ai literacy training for staff · ai acceptable use policy small business · uk ai regulation small business · chatbot disclosure requirement eu · automated decision making uk gdpr · shadow ai policy | – | – | – | – | No volume |

## 2. Suggestions and related keywords (volume ≥ 20, KD ≤ 40)

The literal top three seeds return almost no suggestions, so I broadened them to their head terms: **eu ai act**, **ai policy template** and **ai literacy**. "–" means DataForSEO has no KD for that term (low-volume terms usually don't get one). Those terms are kept but unverified.

| Keyword | Vol | KD | CPC £ | Intent | Cluster role |
|---|---:|---:|---:|---|---|
| eu ai act summary | 480 | 37 | 5.81 | info | Main guide (secondary) |
| uk ai act | 260 | 31 | 11.94 | info | Supporting article 2 |
| eu ai act article 50 | 140 | 20 | 8.33 | info | Supporting article 1 |
| ai policy template | 140 | 4 | 17.48 | info | Template page |
| what is ai literacy | 110 | 34 | – | info | Avoid: the SERP is education and academic |
| eu ai act uk | 110 | – | 5.02 | info | Main guide (secondary) |
| **does the eu ai act apply to the uk** | **90** | **17** | – | info | **Main guide** (up 425% year on year; 210 in Aug 2026) |
| article 50 eu ai act | 90 | 16 | 6.36 | trans. | Supporting article 1 |
| ai literacy course | 90 | 5 | 7.45 | info | Supporting article 3 (course intent) |
| uk ai strategy | 90 | 28 | – | comm. | Skip: government policy intent |
| eu ai act risk categories | 70 | 32 | 6.16 | info | Main guide section |
| eu ai act compliance | 70 | 31 | 21.73 | info | Main guide section |
| eu ai act high-risk | 70 | 39 | – | info | Main guide section |
| ai policy uk | 50 | 29 | 3.26 | info | Template page |
| eu ai act guidelines / code of practice | 40 / 40 | 38 / 32 | – | info | Main guide (optional) |
| eu ai act transparency requirements | 40 | – | 9.54 | info | Supporting article 1 |
| ai literacy training | 40 | – | 9.81 | info | Supporting article 3 |
| ai acceptable use policy | 40 | – | 18.70 | info | Template page |
| eu ai act article 4 | 30 | – | 5.29 | info | Supporting article 3 |
| eu ai act fines · eu ai act omnibus · who does the eu ai act apply to | 30 / 30 / 20 | – | – | info | Main guide FAQs |

Excluded for KD over 40: eu ai act (8,100, KD 70), eu ai act timeline (90, KD 45), eu ai act high risk (70, KD 42), plus PDF, legal-text and "what is" variants (KD 66–95).

## 3. Live SERP top 10 for the three best opportunities

Word counts are rough counts of each page's main text from local fetches.

| Query | Who ranks | Content type and length | Written for small businesses? |
|---|---|---|---|
| does the eu ai act apply to the uk (90, KD 17) | CBI, Workday (vendor), CMS (law firm), Evalian (consultancy), Sprintlaw, Advania (MSP), Baker McKenzie (2023), Practical Law (paywall), YouTube (10 views). The AI Overview cites Farrer, ISMS.online, Edwin Coe, RMOK Legal and PwC. | Explainers of about 1,000–3,750 words, mostly 2,000–2,500. Several are from 2023–24 and predate the omnibus changes. | **Partly.** Only Sprintlaw (an SME law firm, #5, about 2,000 words) leans SME. No page is built around a small business that *uses* ChatGPT or Copilot with EU customers. |
| eu ai act article 50 (140, KD 20) | Search Engine Journal (news), Better Regulation, nicfab.eu (blog), LinkedIn, Praxikon, CloseIT (vendor), YouTube, activeMind, Layer3Labs (vendor). The AI Overview cites artificialintelligenceact.eu, the EC service desk, William Fry and DLA Piper. | Mostly the legal text with commentary (800–6,500 words). The two vendor guides are 1,000–2,650 words. | **No.** These are written for publishers, lawyers and providers. Nobody covers the *deployer* view: "I put a chatbot on my website, what do I have to say?" |
| uk ai act (260, KD 31) | Clyde & Co, gov.uk (AI Playbook, 34k words), Legal Nodes, VinciWorks (vendor), two gov.uk PDFs, VerifyWise (vendor), Reed Smith, New Statesman. The AI Overview cites Commons Library, CMS, Bratby Law and GDPR Local. | Law-firm briefings of 700–2,750 words, plus government documents. | **No.** These are written for developers, regulators and lawyers. Bratby Law, a small firm, gets an AI Overview citation with a plain 2,800-word "Is there a UK AI Act?" FAQ. |

I also pulled **what is ai literacy** and rejected it. Universities, Wikipedia, IBM and Stanford hold the whole top 10, so the intent is educational, not business.

All four SERPs show an AI Overview. Its sources include small, plain-answer sites, the same pattern as the main plan.

## 4. Recommendations

**Main guide.** Target **does the eu ai act apply to the uk** (90 a month, KD 17, demand rising). Secondary terms: eu ai act uk (110), eu ai act summary (480), eu ai act compliance (70) and risk categories (70).
- **Slug:** `/guides/eu-ai-act-uk/`
- **H1:** "Does the EU AI Act apply to UK businesses? A plain guide for small firms"
- Open with a yes/no/it-depends decision tree based on EU customers, outputs used in the EU and chatbots. Add a dated deadlines table that covers the omnibus delay, and an FAQ for fines, the omnibus and "who does it apply to". A legally sensitive page needs a reviewed-by note and a "last updated" date.

**Supporting articles:**
1. **EU AI Act Article 50 for chatbots and AI content.** Target *eu ai act article 50* (140, KD 20) and *article 50 eu ai act* (90, KD 16). Slug: `/guides/eu-ai-act-article-50-chatbots/`. This is the clearest gap, because no result explains the deployer duty to a business owner.
2. **Is there a UK AI Act?** Target *uk ai act* (260, KD 31). Cover UK GDPR automated decision-making and the ICO here, because the seed for that ("automated decision making uk gdpr") has no volume of its own. Slug: `/guides/uk-ai-act/`.
3. **AI literacy training for staff (Article 4).** Target *ai literacy training* (40) and *eu ai act article 4* (30), with *ai literacy course* (90, KD 5) as a stretch term. Slug: `/guides/ai-literacy-training-staff/`. **Not SERP-checked.** Pull those two SERPs (about $0.01) before writing. *ai literacy course* may want an actual course rather than an article.

**AI policy template: yes, it should be its own page.** The pool is about 470 a month across close variants: ai policy template 140 (KD 4), ai usage policy 90 (KD 0), ai policy template uk 70 (KD 0), ai acceptable use policy 40 and others. Yesterday's SERP showed small sites ranking, including a zero-traffic NZ small-business template at #6. This confirms `/resources/ai-policy-template/` from `page-map.md`. Each of the four articles above should link to it as the next step, and its "shadow AI" section covers that seed, which also has no volume.

**Don't build** pages for the deadline, checklist, omnibus or Article 4 terms on their own. Each gets 10–40 searches and works better as a section of the main guide.

## Addendum: AI literacy SERPs (pulled later on 12 October)

I pulled the two SERPs for supporting article 3, Google UK live top 10 (`raw/eu-ai-act/14-…tsv`, about $0.004). These are notes only: the AI literacy page was built from the supplied copy and wasn't changed because of them.

- **ai literacy training (40):** gov.uk's free AI Skills Boost announcement ranks #1. The rest are education bodies (Jisc, the Digital Education Council, Cambridge), the EU Commission's Article 4 Q&A (#4), training sellers (QA) and two law firms selling Article 4 programmes (Lewis Silkin, Simmons & Simmons), plus the artificialintelligenceact.eu programme directory. There are no explainer articles for small businesses. Related searches lean towards *free* and *government-funded* courses.
- **ai literacy course (90):** this is course-shopping intent. The results are gov.uk, the Digital Education Council, Cambridge, QA, Jisc, Tech Educators (a funded bootcamp for businesses), LinkedIn Learning, a YouTube video pack and the artificialintelligenceact.eu directory. An article is unlikely to rank here unless it offers or compares courses.
- Both SERPs show an AI Overview. Its sources include law-firm training pages and gov.uk.
