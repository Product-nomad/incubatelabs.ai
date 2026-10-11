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
    }),
  ],
  build: {
    format: "directory",
  },
});
