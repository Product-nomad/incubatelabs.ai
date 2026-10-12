export interface Faq {
  q: string;
  a: string;
}

export interface UseCase {
  slug: string;
  // Previous slug, 301-redirected in public/_redirects.
  oldSlug?: string;
  // Short display name for cards, nav, footer and breadcrumbs.
  title: string;
  // Lower-case form for use mid-sentence.
  short: string;
  card: string;
  headline: string;
  intro: string;
  signs: string[];
  build: string[];
  example: string;
  notAi: string;
  // "Where it fits" paragraphs covering the secondary search terms in research/seo-2026-10/page-map.md.
  // HTML allowed.
  fits: string[];
  faq: Faq[];
  // Without the " | Incubate Labs" suffix, so 44 characters at most.
  seoTitle: string;
  seoDescription: string;
}

export const useCases: UseCase[] = [
  {
    slug: "invoice-and-document-processing",
    oldSlug: "document-handling",
    title: "Invoice & document processing",
    short: "invoice and document processing",
    card: "Invoices, delivery notes, forms and PDFs read, sorted and filed without someone keying them in.",
    headline: "Invoice and document processing, without the manual reading",
    intro:
      "Most small businesses have someone who spends part of every day opening attachments, reading them and deciding where they go. AI is now good at exactly this kind of reading, as long as a person still checks the cases it isn't sure about.",
    signs: [
      "Invoices, delivery notes or forms arrive by email and someone opens every one",
      "Information gets copied from PDFs into your accounts package, CRM or a spreadsheet",
      "Paperwork sits in a shared inbox until someone has time to deal with it",
      "Things get filed in the wrong folder, or not filed at all",
    ],
    build: [
      "A process that picks up incoming documents from your inbox or a shared folder",
      "Extraction of the fields you actually use: supplier, amounts, dates, references",
      "Automatic filing and hand-off to the system the data needs to land in",
      "A review queue for anything the system isn't confident about, so nothing slips through",
    ],
    example:
      "A trade business receiving supplier invoices by email. Each invoice is read, matched to the right supplier and job, and queued for approval in the accounts package. The office manager reviews the exceptions instead of typing every line.",
    notAi:
      "If your documents always come from the same handful of senders in the same layout, a simple template rule may do the job more cheaply than AI. We'll tell you if that's the case.",
    fits: [
      "This is what the software industry calls intelligent document processing: AI reads a document the way a person would, picks out the fields that matter and passes them on. For most small businesses the first job is invoice automation. Supplier invoices arrive by email, get read and matched to the right supplier and job, then wait in your accounts package for approval.",
      "The same approach works for delivery notes, purchase orders, timesheets, application forms and scanned paperwork. If you still receive paper, automated document scanning turns a scan or a phone photo into the same structured data. Either way, documents end up filed where they belong and the figures land in the system that needs them, without anyone keying them in.",
    ],
    faq: [
      {
        q: "Can AI read our invoices accurately?",
        a: "Usually, yes, for the fields that matter: supplier, dates, amounts, VAT and references. It isn't perfect, so we set a confidence level. Anything the system isn't sure about goes to a person to check rather than straight into your accounts.",
      },
      {
        q: "Does it work with our accounts software?",
        a: "We build around the tools you already use. Most small-business accounts packages accept data through a direct connection or an import. Where yours doesn't, we'll tell you before you commit to anything.",
      },
      {
        q: "What about paper documents?",
        a: "Paper can be scanned or photographed and processed in the same way. The cleaner the scan, the less checking it needs.",
      },
      {
        q: "Is automated invoice processing worth it for a small business?",
        a: "It depends on how many invoices you handle and how long they take to type in today. The cost check we do before any build answers that with your own numbers. If it doesn't pay back, we'll say so.",
      },
    ],
    seoTitle: "AI Invoice & Document Processing for SMEs",
    seoDescription:
      "Automate reading, sorting and filing invoices, delivery notes and forms. AI document processing for UK small businesses, with a person on the edge cases.",
  },
  {
    slug: "data-entry-automation",
    oldSlug: "admin-and-data-re-entry",
    title: "Data entry automation",
    short: "data entry",
    card: "The same information typed into three systems. We connect them so it's entered once.",
    headline: "Data entry automation: type it once, not three times",
    intro:
      "Re-keying is one of the biggest hidden costs in a small business. A new customer goes into the CRM, then the job system, then the accounts package. Each copy is a chance for a typo, and each one takes time nobody budgeted for.",
    signs: [
      "The same customer or job details live in several systems that don't talk to each other",
      "Someone exports a spreadsheet from one tool and pastes it into another",
      "Errors creep in between systems and take time to find",
      "You're thinking about hiring an administrator mainly to keep up with data entry",
    ],
    build: [
      "Connections between the tools you already use, rather than replacing them",
      "AI to tidy up messy input such as free-text emails, notes and web forms before it's passed on",
      "Checks that flag duplicates and mismatches before they spread",
      "A simple log so you can see what moved where, and when",
    ],
    example:
      "A service business taking enquiries by web form and email. Each enquiry is cleaned up, checked against existing customers and created once in the CRM and job system, with the details a person would otherwise have retyped.",
    notAi:
      "A lot of re-entry problems are solved by a straightforward integration with no AI involved. That's often the first thing we'll recommend, because it's cheaper and more predictable.",
    fits: [
      "Data entry automation means details are captured once, then copied, checked and passed on by software instead of a person. For most small businesses that starts with connecting the systems you already have, so a new customer or job flows from one to the next on its own.",
      "AI helps where the input is messy: an enquiry written as a free-text email, notes from a site visit, or a spreadsheet laid out differently every month. It's often a better answer than outsourcing data entry, because the work stays inside your business and the errors that creep in with every retype go away.",
    ],
    faq: [
      {
        q: "Is this the same as outsourcing data entry?",
        a: "No. Outsourcing moves the typing to someone else. Automating it means the typing doesn't need doing at all, and your data stays in your own systems.",
      },
      {
        q: "Can you automate data entry from Excel spreadsheets?",
        a: "Yes. Spreadsheets are one of the most common sources we work with. If the layout changes from month to month, AI can map the columns before the data moves on. If it never changes, a simple rule is cheaper, and that's what we'll use.",
      },
      {
        q: "Do we need to replace our existing software?",
        a: "Almost never. We connect the tools you already pay for. Replacing systems is expensive and disruptive, and it's rarely the fix.",
      },
      {
        q: "What happens when the data doesn't match?",
        a: "The system flags duplicates and mismatches for a person to sort out instead of guessing. You also get a simple log of what moved where.",
      },
    ],
    seoTitle: "Data Entry Automation for Small Businesses",
    seoDescription:
      "Stop typing the same information into three systems. We connect the tools you already use and add AI where the input is messy. For UK small businesses.",
  },
  {
    slug: "automated-reporting",
    oldSlug: "reporting",
    title: "Automated reporting",
    short: "reporting",
    card: "Weekly and monthly reports that pull themselves together, with a plain-English summary on top.",
    headline: "Automated reporting: the numbers, ready on Monday morning",
    intro:
      "Small businesses often run on a report someone builds by hand every week: exporting from three places, pasting into a spreadsheet and writing a few lines on what changed. It's important work, but it doesn't need to take a morning.",
    signs: [
      "Someone spends hours each week or month pulling numbers together",
      "Reports arrive late, so decisions get made on old figures",
      "Only one person knows how the spreadsheet works",
      "You'd like a short written summary, not just a table of numbers",
    ],
    build: [
      "Automatic collection of figures from your accounts, sales and job systems",
      "A consistent report or dashboard, produced on a schedule",
      "An AI-written summary of what changed and what looks unusual, checked against the underlying numbers",
      "Delivery where you'll actually read it: email, Teams, Slack or a shared folder",
    ],
    example:
      "A small operations team that built a weekly performance pack by hand. The figures are now gathered overnight, the pack is generated automatically and a short summary highlights anything outside the normal range.",
    notAi:
      "The numbers themselves should never be calculated by an AI model. We use ordinary, testable code for the figures and use AI only for the written summary.",
    fits: [
      "Automated reporting takes the weekly or monthly routine of exporting, pasting and tidying, and runs it on a schedule. Typical examples are automated financial reporting from your accounts package, sales and job figures, KPI reporting for whoever runs the business, and client reports that go out every month.",
      "It doesn't have to mean a new dashboard tool. If your team lives in Excel, automatic reports can land in the spreadsheet they already use, refreshed overnight. The AI part is the short written summary on top, pointing out what changed and what looks unusual.",
    ],
    faq: [
      {
        q: "Will AI calculate our figures?",
        a: "No. The numbers come from ordinary, testable code that reads your systems directly. AI only writes the plain-English summary, and that summary is checked against the figures.",
      },
      {
        q: "Can the reports stay in Excel?",
        a: "Yes. We can refresh the spreadsheet your team already uses, or send a PDF or an email instead. We'll match how you read reports today.",
      },
      {
        q: "Can you automate client reporting?",
        a: "Yes, as long as the figures come from systems we can connect to. Each client gets the same consistent report, and someone on your team reviews it before it goes out.",
      },
    ],
    seoTitle: "Automated Reporting for Small Businesses",
    seoDescription:
      "Weekly and monthly reports that build themselves from your existing systems, with a plain-English AI summary on top. Built for UK small businesses.",
  },
  {
    slug: "ai-email-replies",
    oldSlug: "customer-replies",
    title: "AI email replies",
    short: "customer email replies",
    card: "Draft replies to common enquiries, ready for your team to check and send.",
    headline: "AI-drafted email replies to customers, in your own voice",
    intro:
      "Most customer emails ask one of the same twenty questions. Answering them well still takes time, especially when the person who knows the answer is busy. AI can draft the reply. Your team stays in charge of what gets sent.",
    signs: [
      "A shared inbox that fills up faster than it empties",
      "The same questions answered again and again, often slightly differently",
      "Replies wait until a particular person has time",
      "New staff take weeks to learn the right answers",
    ],
    build: [
      "Draft replies based on your own policies, prices and past answers",
      "Sorting of incoming messages by type and urgency",
      "A human approval step before anything is sent, by default",
      "A growing library of approved answers your whole team can use",
    ],
    example:
      "A small business with a busy enquiries inbox. Common questions get a drafted reply in the team's own tone, linked to the relevant policy, ready to check and send. Unusual messages are flagged for a person to handle.",
    notAi:
      "We don't put unsupervised chatbots in front of your customers. If your volume is low, a set of good saved replies may be all you need.",
    fits: [
      "Most AI email assistants are built for one person writing their own emails. This is different. AI drafts responses to customer enquiries in your shared inbox, using your own policies, products and past answers, so each reply sounds like your business rather than a generic AI email response generator.",
      "Your team reviews each draft, edits it if needed and sends it. Over time the approved answers build into a library everyone can use, which also helps new staff get up to speed.",
      'If an AI drafts or sends replies to customers, see <a href="/guides/eu-ai-act-article-50-chatbots/">what the EU AI Act says about disclosure</a>.',
    ],
    faq: [
      {
        q: "Will AI send emails to customers on its own?",
        a: "Not by default. Every draft waits for a person to approve it. If you later want certain simple replies to go automatically, that's your decision, made case by case.",
      },
      {
        q: "Does it work with Outlook or Gmail?",
        a: "Yes. We work with the inbox you already use rather than moving you to a new helpdesk tool.",
      },
      {
        q: "Is it safe to put customer emails through AI?",
        a: "It can be, with the right set-up. We use business AI services that don't train on your data, keep processing as close to your own systems as we can, and tell you exactly where the information goes.",
      },
      {
        q: "How is this different from a chatbot?",
        a: "A chatbot talks to your customers directly. This helps your team answer them. We don't put unsupervised chatbots in front of customers.",
      },
    ],
    seoTitle: "AI Email Replies for Customer Enquiries",
    seoDescription:
      "Answer customer emails faster with AI-drafted replies written from your own policies and checked by your team before they go. For UK SMEs.",
  },
  {
    slug: "quotes-and-proposals",
    title: "Quotes & proposals",
    short: "quotes and proposals",
    card: "First drafts of quotes and proposals from your notes, pricing and past work.",
    headline: "From site notes to a sent quote, faster",
    intro:
      "Quotes win work, but they're often written in the evening after a full day. Turning notes, photos and measurements into a clear, consistent quote is a good job for AI, with you checking the numbers and the judgement calls.",
    signs: [
      "Quotes take days to go out because they're written after hours",
      "Each quote is put together from scratch or from an old one",
      "Quality varies depending on who wrote it and how tired they were",
      "You lose work because a competitor replied first",
    ],
    build: [
      "A first draft built from your notes, voice memos or a short form",
      "Your own price list and standard wording applied consistently",
      "Clear scope and exclusions, so there are fewer arguments later",
      "Output in the format you already send, whether that's a document, PDF or your quoting tool",
    ],
    example:
      "A builder dictating notes on site. A draft quote with scope, exclusions and line items from their own price list is waiting by the time they get back to the van, ready to review and send.",
    notAi:
      "Pricing calculations stay in plain, checkable rules. AI helps with the writing and structure. It doesn't decide what to charge.",
    fits: [
      "This isn't another piece of quoting software. If you already use quoting software, including construction quoting software built for builders and trades, we work inside it. AI prepares the first draft from your notes, and the tool you trust produces the quote.",
      "If you quote from a Word template or a spreadsheet, the draft lands there instead. Either way, your price list and your rules do the pricing, and AI handles the writing: the scope, the exclusions and the proposal wording that usually gets done late at night.",
    ],
    faq: [
      {
        q: "Does AI decide what we charge?",
        a: "No. Pricing stays in clear rules and price lists you can check. AI turns your notes into a well-written draft, and you make the judgement calls.",
      },
      {
        q: "Will it work with our quoting software?",
        a: "Usually. Many quoting tools accept imported line items or a draft document. If yours doesn't, we can produce the draft in a form you can paste in quickly. We check this before we scope the work.",
      },
      {
        q: "Can it start from site notes and voice memos?",
        a: "Yes. Notes typed on a phone, voice memos and photos with a few words of description are all workable starting points.",
      },
      {
        q: "What about proposals for bigger jobs?",
        a: "The same approach works for longer proposals. AI assembles a first draft from your standard sections, past proposals and the notes for this job, and you edit from there.",
      },
    ],
    seoTitle: "AI Quoting & Proposal Drafting for SMEs",
    seoDescription:
      "Turn site notes, photos and measurements into consistent quotes and proposals in minutes, inside the quoting software you already use. For UK trades.",
  },
  {
    slug: "security-questionnaires",
    oldSlug: "compliance-questionnaires",
    title: "Security questionnaires",
    short: "security questionnaires",
    card: "Supplier and customer questionnaires pre-filled from your existing policies and past answers.",
    headline: "Answer the same security questionnaire once",
    intro:
      "Larger customers increasingly send supplier questionnaires covering security, data protection, sustainability and insurance. They ask the same questions in slightly different words, and each one can eat a day.",
    signs: [
      "Supplier onboarding forms and security questionnaires keep arriving",
      "Answers are scattered across old emails, policies and spreadsheets",
      "Each questionnaire is answered from scratch",
      "Deals stall while you wait for someone to find the right answer",
    ],
    build: [
      "A single library of your approved answers and supporting documents",
      "Draft answers to new questionnaires, each linked to its source",
      "Clear flags where you don't have an answer yet, rather than a guess",
      "A record of what you told which customer, and when",
    ],
    example:
      "A small supplier asked to complete security and data-protection questionnaires for new customers. Draft answers are produced from their existing policies, gaps are flagged, and a person signs off before anything is returned.",
    notAi:
      "If you only receive a couple of questionnaires a year, a well-organised answer document may be enough. We'll say so.",
    fits: [
      "Security questionnaire automation starts with a single library of your approved answers: policies, insurance details, past questionnaire responses and certificates. When a new supplier questionnaire or due diligence questionnaire arrives, AI matches each question to the closest approved answer and drafts a response with its source attached.",
      "Information security questionnaires for vendors often ask about recognised schemes such as <a href=\"https://www.ncsc.gov.uk/cyberessentials/overview\" rel=\"noopener\">Cyber Essentials</a>. We don't certify anyone, but we make sure the answers you've already given are found and reused consistently, and that real gaps are flagged clearly rather than papered over.",
    ],
    faq: [
      {
        q: "What is a security questionnaire?",
        a: "It's a set of questions a customer sends a supplier to check how they protect data and systems: access control, backups, staff training, incident handling and so on. Larger customers often send one before they'll sign a contract.",
      },
      {
        q: "Will AI make up answers we don't have?",
        a: "No. If there isn't an approved answer, the question is flagged as a gap for a person to answer. Nothing is guessed.",
      },
      {
        q: "Who signs off the answers?",
        a: "You do. A person reviews every questionnaire before it goes back to the customer, and the system keeps a record of what was said to whom.",
      },
      {
        q: "Is it worth it if we only get a few a year?",
        a: "Possibly not. If questionnaires are rare, a well-organised answer document may be enough, and we'll tell you so.",
      },
    ],
    seoTitle: "Security & Supplier Questionnaire Help",
    seoDescription:
      "Pre-fill security, data protection and supplier questionnaires from your existing policies and past answers, with gaps flagged. For UK small suppliers.",
  },
];
