// "More worked examples": others in the same industry first, then the examples that follow the
// current one in display order, wrapping round, so every example is linked from some other page.

/**
 * @template {{ id: string, data: { order: number, industry: string } }} T
 * @param {T[]} all
 * @param {T} current
 * @returns {T[]}
 */
export function moreExamples(all, current, count = 3) {
  const others = [...all].sort((a, b) => a.data.order - b.data.order).filter((e) => e.id !== current.id);
  const same = others.filter((e) => e.data.industry === current.data.industry);
  const after = others.filter((e) => e.data.order > current.data.order);
  const before = others.filter((e) => e.data.order < current.data.order);
  const rest = [...after, ...before].filter((e) => e.data.industry !== current.data.industry);
  return [...same, ...rest].slice(0, count);
}
