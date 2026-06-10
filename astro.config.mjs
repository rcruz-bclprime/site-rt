import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rcruz-bclprime.github.io',
  base: '/site-rt',
  integrations: [sitemap()],
});
