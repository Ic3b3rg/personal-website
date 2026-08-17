// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const indexablePaths = new Set(["/", "/it/"]);

export default defineConfig({
  site: "https://silvioceccarini.dev/",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => indexablePaths.has(new URL(page).pathname),
    }),
  ],
});
