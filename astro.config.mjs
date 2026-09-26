// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static output — flat HTML/CSS/JS, zero server surface. Served by Cloudflare
// Workers Static Assets (wrangler.jsonc; GitHub Actions deploy, `dist/` output).
// No React integration: this site's interactivity is a few inline scripts.
export default defineConfig({
  site: 'https://insulation-demo-2.simsdigitalpartners.com',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
