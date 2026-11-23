import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeGuide from "./src/lib/rehype-guide.mjs";
import rehypeExample from "./src/lib/rehype-example.mjs";
import siteChecks from "./src/integrations/site-checks.mjs";
import cspHeader from "./src/integrations/csp-header.mjs";
import { lastmodFor, reviewedDatesIn } from "./src/lib/sitemap-lastmod.mjs";

const reviewed = reviewedDatesIn(["src/content/guides", "src/content/examples"]);

// https://astro.build/config
export default defineConfig({
  site: "https://incubatelabs.ai",
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes("/contact/thanks/"),
      serialize(item) {
        const lastmod = lastmodFor(item.url, reviewed);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
    siteChecks(),
    cspHeader(),
  ],
  markdown: {
    // Straight quotes, as in the rest of the site, so FAQ JSON-LD matches the visible text exactly.
    smartypants: false,
    // Each plugin only touches its own content folder.
    rehypePlugins: [rehypeGuide, rehypeExample],
  },
  build: {
    format: "directory",
    // One small stylesheet: inline it to remove the render-blocking request.
    inlineStylesheets: "always",
  },
});
