# A Plus Insulation — Next.js → Astro (static) Migration

**Date:** 2026-07-12
**Status:** Approved design, ready for implementation plan
**Repo:** `Insulation-temp-v2` (branch off current)

## Goal

Convert the existing Next.js 16 static-export marketing site to a static **Astro**
build, conforming to the SDP Astro standard now used in `sdp-starter-kit`,
`sdp-docs`, and the reference build `osaka-hibachi-site`. This is the last SDP
project to migrate off Next.

The site is **no longer a live client site** — the owner declined purchase, so it
is now a **portfolio/demo piece** we point people to. Priorities, in order:

1. **Pixel-perfect** reproduction of the current design — framework changes, not
   a single pixel.
2. **Simplest possible protocol** — no feature we don't need for a demo.
3. Astro's islands payoff: ship JS only for the two pieces that need it.

Explicitly **out of scope / placeholder** (do not build out): SEO, structured
data, sitemap, and a functional contact form. These stay as faithful-but-inert
placeholders.

## Non-goals

- No design, layout, copy, or content changes. Verbatim port.
- No working form backend. No analytics. No indexing.
- No new pages, routes, or features.

## Reference pattern (authoritative)

Mirror `cody-sims-git-hub/osaka-hibachi-site` — "static Astro/Tailwind/shadcn"
SDP portfolio build. Same stack this site already uses (Tailwind v4 + shadcn),
so the port is mechanical.

- Astro 5, `"type": "module"`
- `@astrojs/react` for React islands; `@tailwindcss/vite` for Tailwind v4
  (CSS-first, **no** `postcss.config` / `tailwind.config` / `autoprefixer`)
- `.astro` components for static markup; `.tsx` **only** for interactive islands
- `src/data/site.ts` = content source of truth
- `src/layouts/Layout.astro` = `<head>` + global scripts
- `tsconfig.json` extends `astro/tsconfigs/strict`, `@/*` → `src/*`
- Deploy: GitHub Actions → validate (`astro check` + `npm audit`) on PR; on main
  push, `rsync ./dist/` over SFTP to Hostinger.

## Target structure

```
astro.config.mjs          site: https://aplus2.simsdigitalpartners.com
                          integrations: [react()], vite: { plugins: [tailwindcss()] }
tsconfig.json             extends astro/tsconfigs/strict; @/* → src/*
package.json              "type":"module"; scripts: dev/build/preview/typecheck(astro check)
src/
  layouts/Layout.astro    minimal <head>; per-page {title, description} props
  data/
    site.ts               ← lib/site-config.ts business/NAP block (verbatim values)
    faqs.ts               ← lib/faqs.ts (verbatim)
  lib/utils.ts            cn()  (← lib/utils.ts)
  styles/global.css       ← app/globals.css VERBATIM (Tailwind v4 @theme tokens,
                          fonts, .btn/utility layers)
  components/
    Header.astro          ← components/header.tsx (static shell)
    MobileNav.tsx         island — shadcn Sheet (the header's mobile menu)
    Footer.astro          ← components/footer.tsx
    Hero.astro            ← components/hero.tsx
    PageHero.astro        ← components/page-hero.tsx
    LogoCloud.astro       ← components/logo-cloud.tsx
    Features.astro        ← components/features.tsx
    HowItWorks.astro      ← components/how-it-works.tsx
    Pricing.astro         ← components/pricing.tsx
    Testimonials.astro    ← components/testimonials.tsx (render static; see below)
    CTA.astro             ← components/cta.tsx (render static; see below)
    FAQ.astro             ← components/faq.tsx, converted to native <details>
    ContactForm.tsx       island — submit/success state (behavior unchanged)
    ui/sheet.tsx          only shadcn primitives the islands need
    ui/dialog.tsx         (Sheet dependency)
  pages/
    index.astro           ← app/page.tsx
    about.astro           ← app/about/page.tsx
    services.astro        ← app/services/page.tsx
    service-area.astro    ← app/service-area/page.tsx
    contact.astro         ← app/contact/page.tsx
public/                   all current assets (images, favicons, og.jpg) unchanged
  robots.txt              User-agent: *  /  Disallow: /
.github/workflows/deploy.yml   updated: astro check + rsync ./dist/
```

## Interactivity (minimal JS)

Today the whole app hydrates React to power a menu and a form. After migration,
only two small islands ship JS:

| Piece | Current | Astro |
|-------|---------|-------|
| Mobile menu | `header.tsx` `useState` | `MobileNav.tsx` shadcn **Sheet** island, `client:load` |
| Contact form | `contact-form.tsx` `useState` | `ContactForm.tsx` island, `client:visible` — unchanged fake-success behavior |
| FAQ accordion | `faq.tsx` `useState` | **native `<details>`/`<summary>`** in `FAQ.astro` — zero JS |
| Testimonials | `testimonials.tsx` (client) | static `Testimonials.astro` — interactivity is decorative; render static |
| CTA | `cta.tsx` (client) | static `CTA.astro` — render static |

FAQ open/closed styling is reproduced with `<details open>` on the first item and
CSS (`details[open]` + marker rotation) to match the current chevron/expand look
pixel-for-pixel. If any Testimonials/CTA interactivity turns out to be
load-bearing (not just decorative) during the port, it becomes a small
`client:visible` island rather than a redesign.

## SEO / head (placeholder, simplest)

- `Layout.astro` `<head>`: `charset`, `viewport`, `<title>`, `<meta description>`,
  favicons, Google Fonts `<link>` (Inter + Oswald), basic OG (`og:title`,
  `og:description`, `og:type`, `og:image` → `/og.jpg`), and
  **`<meta name="robots" content="noindex, nofollow">`** site-wide.
- Title/description supplied per page via `Layout` props (default from `site.ts`).
- **Drop** JSON-LD / structured data (`json-ld.tsx`, schema helpers) — moot under
  noindex, not needed for a demo.
- **Drop** `sitemap.ts` and `@astrojs/sitemap` — contradicts noindex.
- **Replace** `robots.ts` with static `public/robots.txt` → `Disallow: /`.

`site.ts` keeps the business NAP values (name, phone, address, service list,
areas served, hours) as verbatim content for header/footer/pages — the schema
generator functions are dropped, the data is not.

## Fonts

Google Fonts `<link>` for Inter + Oswald in `Layout.astro` (simplest; matches
osaka). Wire to the same CSS variables `global.css` already declares
(`--font-inter`, `--font-oswald`) so nothing downstream changes.

## Dependencies

**Add:** `astro`, `@astrojs/react`, `@astrojs/check`, `@tailwindcss/vite`,
`tailwindcss` v4, `react`, `react-dom`, `@radix-ui/react-dialog`, `clsx`,
`tailwind-merge`, `class-variance-authority`, `lucide-react`.

**Remove:** `next`, `next-themes`, `@vercel/analytics`, `autoprefixer`, `postcss`,
`@tailwindcss/postcss`, and all unused `@radix-ui/*` / shadcn packages (~45).
Keep only what the two islands import.

## Deploy (unchanged target, new output dir)

`.github/workflows/deploy.yml` keeps the same Hostinger SFTP flow and the same
target folder `preview-sites/aplus2/`. Two changes only:

- validate step: `npm run typecheck` → runs `astro check`
- deploy step: source `./out/` → `./dist/`

Node 22, `npm ci`, `npm audit --omit=dev --audit-level=critical` stay as-is.

## Verification (before "done")

1. `npm run build` emits `dist/` with all 5 routes; `astro check` passes clean.
2. Visual diff each of the 5 pages against the current build at mobile + desktop
   widths — must be pixel-identical (hero, header/menu, cards, FAQ, footer,
   contact form states).
3. View-source confirms only `MobileNav` + `ContactForm` ship JS; FAQ is native
   `<details>`.
4. Confirm `<meta robots noindex,nofollow>` on every page and `public/robots.txt`
   present in `dist/`.
5. Confirm favicons, `og.jpg`, and all images resolve.

## Risks / notes

- **Tailwind v4 token parity** is the pixel-perfect linchpin: `global.css` must be
  copied verbatim, including `@theme` tokens, custom utilities, and font-variable
  wiring. Diff the compiled CSS if anything looks off.
- Radix Sheet markup/animation should match the current mobile menu closely; if
  the exact current slide/overlay differs, match the current design (priority 1),
  not osaka's.
- `next/font` self-hosts and avoids layout shift; the Google Fonts `<link>` adds
  one external request. Acceptable for a demo; noted as the one intentional
  fidelity trade for simplicity.
