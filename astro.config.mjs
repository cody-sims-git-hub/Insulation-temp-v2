// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static output — flat HTML/CSS/JS, zero server surface. Deployed per the SDP
// static-sites playbook (GitHub Actions → SFTP to Hostinger, `dist/` output).
// No React integration: this site's interactivity is a few inline scripts.
export default defineConfig({
  site: 'https://aplus2.simsdigitalpartners.com',
  vite: {
    plugins: [
      // @ts-expect-error — vite type-version skew (astro-bundled vite vs @tailwindcss/vite peer)
      tailwindcss(),
    ],
  },
});
