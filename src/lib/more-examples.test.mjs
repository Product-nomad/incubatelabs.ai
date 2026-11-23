import { test } from "node:test";
import assert from "node:assert/strict";
import { moreExamples } from "./more-examples.mjs";

const ex = (id, order, industry) => ({ id, data: { order, industry } });
const all = [
  ex("a", 1, "Trades"),
  ex("b", 2, "Construction"),
  ex("c", 3, "Property"),
  ex("d", 4, "Trades"),
  ex("e", 5, "Maintenance"),
  ex("f", 6, "Accountancy"),
  ex("g", 7, "Wholesale"),
  ex("h", 8, "Trades"),
];
const ids = (list) => list.map((e) => e.id);

test("same industry comes first", () => {
  assert.deepEqual(ids(moreExamples(all, all[0])).slice(0, 2), ["d", "h"]);
});

test("then the examples after the current one, wrapping round", () => {
  assert.deepEqual(ids(moreExamples(all, all[5])), ["g", "h", "a"]);
});

test("every example appears in at least one other example's strip", () => {
  const shown = new Set(all.flatMap((e) => ids(moreExamples(all, e))));
  assert.deepEqual([...shown].sort(), ids(all));
});

test("never includes the current example", () => {
  for (const e of all) assert.ok(!ids(moreExamples(all, e)).includes(e.id));
});
