// Stale-content checks for guides and examples: future wording about a date that has already passed
// ("have until 2 December 2026" after that day), and reviews that are overdue.

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DATE = new RegExp(`\\b(\\d{1,2}) (${MONTHS.join("|")}) (\\d{4})\\b`, "g");
// Each cue must end right before the date. The text searched is at most LOOKBACK characters.
const FUTURE_CUES = [
  /\b(?:have|has) until $/,
  /\b(?:starts?|begins?|applies|comes? into force|takes? effect)(?: on| from)? $/,
  /\bwill\b[^.]{0,80}$/,
];
const LOOKBACK = 100;

export function pastDatesInFutureTense(text, today) {
  const found = [];
  for (const sentence of text.split(/(?<=[.!?])\s+|\n/)) {
    for (const m of sentence.matchAll(DATE)) {
      const date = new Date(Date.UTC(Number(m[3]), MONTHS.indexOf(m[2]), Number(m[1])));
      if (date >= today) continue;
      const before = sentence.slice(Math.max(0, m.index - LOOKBACK), m.index);
      for (const cue of FUTURE_CUES) {
        const c = before.match(cue);
        if (c) {
          found.push(`${c[0]}${m[0]}`);
          break;
        }
      }
    }
  }
  return found;
}

export function isOverdue(lastReviewed, today, maxDays) {
  return (today - new Date(lastReviewed)) / 86_400_000 > maxDays;
}
