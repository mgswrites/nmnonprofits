// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nmnonprofits.com',
  output: 'static',
  adapter: vercel({
    // SSR pages (search, API routes) get edge-optimized Fluid Compute;
    // everything else is statically generated at build time.
    webAnalytics: { enabled: true },
  }),
  integrations: [
    sitemap({
      // Exclude admin, submit queue, and parameterized search result pages
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/submit/confirm') &&
        !page.includes('?'),
    }),
  ],
  vite: {
    optimizeDeps: {
      exclude: ['@neondatabase/serverless'],
    },
  },
});
