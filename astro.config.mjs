import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",
  site: "https://inn-pilot.com",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/privacy/") &&
        !page.includes("/terms/") &&
        !page.includes("/404"),
    }),
  ],
  build: {
    assets: "_astro",
  },
});
