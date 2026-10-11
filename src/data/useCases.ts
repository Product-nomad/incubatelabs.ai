export interface UseCase {
  slug: string;
  title: string;
  card: string;
  headline: string;
  intro: string;
  signs: string[];
  build: string[];
  example: string;
  notAi: string;
  seoTitle: string;
  seoDescription: string;
}

export const useCases: UseCase[] = [
  {
    slug: "document-handling",
    title: "Document handling",
    card: "Invoices, delivery notes, forms and PDFs read, sorted and filed without someone keying them in.",
    headline: "Stop reading the same documents by hand.",
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
    seoTitle: "AI document processing for small businesses",
    seoDescription:
      "Automate reading, sorting and filing invoices, delivery notes and forms. Practical AI document handling for UK small businesses, with a person checking the edge cases.",
  },
  {
    slug: "admin-and-data-re-entry",
    title: "Admin & data re-entry",
    card: "The same information typed into three systems. We connect them so it's entered once.",
    headline: "Type it once. Not three times.",
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
    seoTitle: "Automate admin and data re-entry for small businesses",
    seoDescription:
      "Stop typing the same information into multiple systems. We connect your existing tools and use AI where input is messy. Practical automation for UK SMEs.",
  },
  {
    slug: "reporting",
    title: "Reporting",
    card: "Weekly and monthly reports that pull themselves together, with a plain-English summary on top.",
    headline: "The numbers, ready on Monday morning.",
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
    seoTitle: "Automated reporting for small businesses",
    seoDescription:
      "Weekly and monthly reports that build themselves, with a plain-English AI summary on top. Reliable figures, less manual work, for UK small businesses.",
  },
  {
    slug: "customer-replies",
    title: "Customer replies",
    card: "Draft replies to common enquiries, ready for your team to check and send.",
    headline: "Answer customers faster, in your own voice.",
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
    seoTitle: "AI-drafted customer replies for small businesses",
    seoDescription:
      "Reply to customer enquiries faster with AI-drafted responses based on your own policies, checked by your team before sending. Built for UK SMEs.",
  },
  {
    slug: "quotes-and-proposals",
    title: "Quotes & proposals",
    card: "First drafts of quotes and proposals from your notes, pricing and past work.",
    headline: "From site notes to a sent quote, faster.",
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
    seoTitle: "AI quote and proposal drafting for small businesses",
    seoDescription:
      "Turn site notes, photos and measurements into clear, consistent quotes and proposals faster. Practical AI drafting for UK trades and small businesses.",
  },
  {
    slug: "compliance-questionnaires",
    title: "Compliance questionnaires",
    card: "Supplier and customer questionnaires pre-filled from your existing policies and past answers.",
    headline: "Answer the same questionnaire once.",
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
    seoTitle: "Supplier and compliance questionnaire automation for SMEs",
    seoDescription:
      "Pre-fill security, data protection and supplier questionnaires from your existing policies and past answers, with gaps clearly flagged. For UK small businesses.",
  },
];
