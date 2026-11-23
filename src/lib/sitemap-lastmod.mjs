// Sitemap lastmod from each guide's and example's last_reviewed date. Pages without one get no
// lastmod: a build timestamp on every URL tells search engines everything changed on every deploy,
// so they learn to ignore it.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const field = (frontMatter, name) => frontMatter.match(new RegExp(`^${name}:\\s*(\\S+)\\s*$`, "m"))?.[1];

export function reviewedDates(markdownFiles) {
  const dates = new Map();
  for (const md of markdownFiles) {
    const frontMatter = md.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
    const slug = field(frontMatter, "slug");
    const reviewed = field(frontMatter, "last_reviewed");
    if (slug && reviewed) dates.set(slug, reviewed);
  }
  return dates;
}

export function lastmodFor(url, dates) {
  return dates.get(new URL(url).pathname);
}

export function reviewedDatesIn(dirs) {
  return reviewedDates(
    dirs.flatMap((dir) =>
      readdirSync(dir)
        .filter((f) => f.endsWith(".md"))
        .map((f) => readFileSync(join(dir, f), "utf8")),
    ),
  );
}
