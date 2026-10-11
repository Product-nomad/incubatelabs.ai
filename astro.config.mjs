import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

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
  ],
  build: {
    format: "directory",
    // One small stylesheet: inline it to remove the render-blocking request.
    inlineStylesheets: "always",
  },
});
