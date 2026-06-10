import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com', // TODO: replace with {{SITE_URL}} before deploy
  integrations: [sitemap()],
});
