import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",
  site: "https://inn-pilot.com",
  trailingSlash: "always",
  integrations: [sitemap()],
  build: {
    assets: "_astro",
  },
});
