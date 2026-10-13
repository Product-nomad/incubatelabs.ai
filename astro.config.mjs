import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeGuide from "./src/lib/rehype-guide.mjs";
import rehypeExample from "./src/lib/rehype-example.mjs";
import siteChecks from "./src/integrations/site-checks.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://incubatelabs.ai",
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes("/contact/thanks/"),
      // Build date as lastmod, so search engines can see when pages changed.
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
    siteChecks(),
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
