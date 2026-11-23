import { test } from "node:test";
import assert from "node:assert/strict";
import { pastDatesInFutureTense, isOverdue } from "./freshness.mjs";

const today = new Date("2026-12-03");

test("flags future wording about a date that has passed", () => {
  const body = "Older tools have until 2 December 2026 to add marking. The full rules start on 2 December 2027.";
  assert.deepEqual(pastDatesInFutureTense(body, today), ["have until 2 December 2026"]);
});

test("flags will, starts and comes into force before a past date", () => {
  const body = [
    "It will apply from 1 December 2026.",
    "The ban starts on 2 December 2026.",
    "The code comes into force on 30 November 2026.",
  ].join(" ");
  assert.equal(pastDatesInFutureTense(body, today).length, 3);
});

test("leaves wording that stays true after the date alone", () => {
  const body = [
    "For older tools, the deadline is 2 December 2026.",
    "From 2 December 2026, these tools are banned.",
    "It has applied since 2 August 2026.",
    "| 2 December 2026 | New bans |",
  ].join("\n");
  assert.deepEqual(pastDatesInFutureTense(body, today), []);
});

test("doesn't read across sentences", () => {
  assert.deepEqual(pastDatesInFutureTense("We will help. On 1 December 2026 the ICO wrote to us.", today), []);
});

test("a 10k-character adversarial line finishes quickly", () => {
  const start = performance.now();
  pastDatesInFutureTense("will ".repeat(2000) + "1 January 2026", today);
  assert.ok(performance.now() - start < 200);
});

test("a review is overdue after the given number of days", () => {
  assert.equal(isOverdue("2026-10-02", today, 60), true);
  assert.equal(isOverdue("2026-10-12", today, 60), false);
});
