// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import UnoCSS from "@unocss/astro";

import solidJs from '@astrojs/solid-js';
import robotsTxt from 'astro-robots-txt'; 
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: "https://silvioceccarini.dev/",
  integrations: [icon(), solidJs(),
    sitemap(),
    robotsTxt({
      sitemap: [
        "https://silvioceccarini.dev/sitemap-index.xml",
        "https://silvioceccarini.dev/sitemap-0.xml",
      ],
    }),
    UnoCSS({ injectReset: true })
  ]
});

