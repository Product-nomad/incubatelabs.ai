// One animated illustration per use case, in card order, plus the websites card
// (design/use-case-anim/use-case-cards-animated.html). Render through AnimatedIllustration.astro.
import DocumentHandling from "./DocumentHandling.astro";
import DataEntry from "./DataEntry.astro";
import Reporting from "./Reporting.astro";
import CustomerReplies from "./CustomerReplies.astro";
import QuotesProposals from "./QuotesProposals.astro";
import ComplianceQuestionnaires from "./ComplianceQuestionnaires.astro";
import Websites from "./Websites.astro";

export const illustrations: Record<string, typeof DocumentHandling> = {
  "invoice-and-document-processing": DocumentHandling,
  "data-entry-automation": DataEntry,
  "automated-reporting": Reporting,
  "ai-email-replies": CustomerReplies,
  "quotes-and-proposals": QuotesProposals,
  "security-questionnaires": ComplianceQuestionnaires,
  websites: Websites,
};
