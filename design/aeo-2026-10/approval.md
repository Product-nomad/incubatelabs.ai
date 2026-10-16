# AEO pass: drafts awaiting Simon's approval (2026-10-16)

Nothing in this file is on the site. On approval, each `shortAnswer` goes into `src/data/useCases.ts`
and each Q&A is appended to that use case's `faq` array, which renders the visible "Questions we get
asked" block and the FAQPage JSON-LD from the same text. Sources: the use-case page itself and the
worked examples linked from it. No prices; costs in hours only.

## 4. Short answers ("What is [use case] and how much time can it save?")

1. **Invoice & document processing**: Invoice and document processing means AI reads incoming invoices, delivery notes and forms, picks out the fields you use and files them in the right system, with a person checking anything it isn't sure about. In our worked examples, supplier invoices into Xero gives a building firm about 6 hours a month back, and paper job sheets into timesheets gives a maintenance contractor about 4 hours a week.
2. **Data entry automation**: Data entry automation means details are captured once, then copied, checked and passed on between the tools you already use, with AI tidying messy input such as free-text emails and notes. In our worked examples, turning job sheets into timesheets saves about 4 hours a week, and supplier invoices into Xero about 6 hours a month.
3. **Automated reporting**: Automated reporting gathers figures from your accounts, sales and job systems on a schedule and adds a plain-English summary on top, with the numbers worked out by ordinary, testable code rather than AI. In our worked example, a trades firm owner's Monday one-page report saves about 2 hours a week.
4. **AI email replies**: AI email replies means AI drafts answers to customer enquiries in your shared inbox from your own policies and past answers, and your team checks each draft before it's sent. In our worked examples, a letting agent gets about 8 hours a week back on repair requests, and a wholesaler about 6 hours a month on overdue invoice reminders.
5. **Quotes & proposals**: AI quoting turns your site notes, voice memos and photos into a first-draft quote from your own price list, and you check the numbers and judgement calls before it goes. In our worked example, an electrician working from a voice note on site saves about 5 hours a week.
6. **Security questionnaires**: AI drafts answers to new security and supplier questionnaires from a single library of your approved answers, flags gaps instead of guessing, and a person signs off before anything is returned. Each questionnaire answered from scratch can eat a day, though if you only get a couple a year, a well-organised answer document may be enough.

## 5. New FAQs (appended after the existing ones)

### Invoice & document processing
- **How much time does invoice automation save?** In our worked example, a 15-person building firm receives about 150 supplier invoices a month, and keying each one into Xero takes about 3 minutes: 7.5 hours in all. Once invoices are read and matched automatically, about 1.5 hours of exceptions and review remain, so about 6 hours a month come back. The figures are illustrative; we measure yours in the first conversation.
- **Will it approve or pay bills automatically?** No. Bills arrive in Xero as drafts with the PDF attached, for a person to approve in batches. Anything unusual, such as an unknown supplier, a missing job reference or a price that doesn't match the order, goes to a named person with the reason it was flagged.
- **Can it read paper job sheets?** Yes. In our job sheets example, engineers photograph the sheet and the job reference, times, materials and notes are read into timesheets and draft invoice lines. Anything hard to read is flagged with the photo alongside, not guessed.
- **Where do we start?** Often with your three biggest suppliers: prove the accuracy on a month of invoices, then extend to the rest.

### Data entry automation
- **How much time can data entry automation save?** In our job sheets example, a maintenance contractor's office retypes about 60 job sheets a week, once for payroll and once for invoicing: about 4 hours, plus an hour chasing missing sheets. Once the sheets are read automatically, about an hour of checking remains, so about 4 hours a week come back.
- **Do our engineers need a new app?** Not necessarily. Before buying a new timesheet app and retraining staff, it's worth asking whether the paper can stay and the retyping go. In the example, engineers photograph the sheet at the end of the job and send it.
- **Can it chase missing paperwork?** Yes. In the job sheets example, if a booked job has no sheet by the next morning, the engineer gets a reminder automatically.
- **Who approves what goes into our systems?** A person. In the example, timesheets are approved by the office before payroll, and invoice lines stay as drafts until someone approves them.

### Automated reporting
- **How much time does automated reporting save?** In our worked example, a 30-person trades firm owner spent about 2 hours 15 minutes every Monday exporting and pasting into a spreadsheet. The one-page report now arrives by 7am and takes about 15 minutes to read, so about 2 hours a week come back, and the report arrives every week.
- **What goes in a weekly one-page report?** In the example: work won and lost, quote win rate by lead source, hours against estimate by job and crew, money owed and money due out, with the three things that need a decision listed first.
- **Will the written summary make things up?** No. The summary only describes the figures and doesn't invent explanations. The calculations are fixed and visible, so the numbers are the same each week and can be traced to the source.

### AI email replies
- **How much time can AI email replies save?** In our letting agent example, about 25 repair emails a day took around 6 minutes each. With each email read, sorted and given a draft reply, checking and sending takes about 2 minutes, so about 8 hours a week come back. In our credit control example, 60 overdue invoice reminders a month drop from about 8 hours to about 2.
- **How are urgent emails handled?** They're sorted by urgency using your own rules. In the letting agent example, no heating or hot water, leaks, electrical danger and security problems go to the top, as does anything mentioning children, elderly or vulnerable occupants, and urgent cases alert the team straight away.
- **Can it chase overdue invoices?** Yes. In our credit control example, overdue invoices are pulled from Xero each morning and a reminder is drafted in the right tone for each customer. A person reviews the drafts and sends them, and disputed invoices are never chased automatically.

### Quotes & proposals
- **How much time does AI quoting save?** In our worked example, an electrical contractor sends about 15 quotes a week, each taking about 25 minutes to type up in the evening. Starting from a voice note on site, checking and sending the draft takes about 5 minutes, so about 5 hours a week come back and quotes go out the same day.
- **What if an item isn't on our price list?** It's flagged, not priced. Anything the voice note left unclear, such as the downlight type, is highlighted in the draft for you to decide.
- **Does it follow up quotes?** If the customer hasn't replied after five days, a polite follow-up is drafted for you to approve. Follow-ups are never sent automatically.

### Security questionnaires
- **How much time can it save?** Answered from scratch, each questionnaire can eat a day. With a library of approved answers, a new questionnaire starts as a set of drafts, each linked to its source, so the work becomes reviewing them and filling the real gaps.
- **What goes into the answer library?** Your policies, insurance details, past questionnaire responses and certificates, kept as a single set of approved answers and supporting documents.
- **Do you provide Cyber Essentials certification?** No. We don't certify anyone, but we make sure the answers you've already given are found and reused consistently, and that real gaps are flagged clearly rather than papered over.
