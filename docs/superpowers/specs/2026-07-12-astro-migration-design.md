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

## Reference pattern

`cody-sims-git-hub/osaka-hibachi-site` is the reference for the **SDP Astro
conventions only** — project layout, config style, tsconfig, and the Hostinger
deploy flow. It is a **separate project**; its design choices (shadcn Sheet mobile
menu, React island for nav, its color tokens) are **not** imposed here. This
project keeps its own design and requirements.

Adopted conventions:

- Astro 5, `"type": "module"`
- `@tailwindcss/vite` for Tailwind v4 (CSS-first, **no** `postcss.config` /
  `tailwind.config` / `autoprefixer`)
- `src/data/*` = content source of truth
- `src/layouts/Layout.astro` = `<head>` + global scripts
- `tsconfig.json` extends `astro/tsconfigs/strict`, `@/*` → `src/*`
- Deploy: GitHub Actions → validate (`astro check` + `npm audit`) on PR; on main
  push, `rsync ./dist/` over SFTP to Hostinger.

**Deliberate divergence from osaka: no React.** This site's only interactivity is
three trivial show/hide DOM toggles (mobile menu, contact-form success, FAQ). None
needs a framework, so we omit `@astrojs/react`, React, Radix, and `lucide-react`
entirely. Every component becomes `.astro`; toggles use small inline `<script>`s;
Lucide icons are reproduced as inline SVG. Simplest protocol, near-zero JS, and
still pixel-perfect because the rendered markup and class strings are identical.

## Target structure

```
astro.config.mjs          site: https://aplus2.simsdigitalpartners.com
                          integrations: [], vite: { plugins: [tailwindcss()] }
tsconfig.json             extends astro/tsconfigs/strict; @/* → src/*
package.json              "type":"module"; scripts: dev/build/preview/typecheck(astro check)
src/
  layouts/Layout.astro    minimal <head>; per-page {title, description} props
  data/
    site.ts               ← lib/site-config.ts business/NAP block (verbatim values)
    faqs.ts               ← lib/faqs.ts (verbatim)
  lib/utils.ts            ← lib/utils.ts (cn(), used by Button.astro)
  styles/global.css       ← app/globals.css VERBATIM + :root font-var wiring (below)
  components/
    ui/Button.astro       ← components/ui/button.tsx (same buttonVariants cva)
    Icon.astro            inline-SVG icon (reproduces the used Lucide glyphs by name)
    Header.astro          ← components/header.tsx — static markup + inline <script>
                            reproducing the current inline mobile-menu dropdown toggle
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
    ContactForm.astro     ← components/contact-form.tsx — form + inline <script>
                            for the fake submit/success swap (behavior unchanged)
    JsonLd — dropped (see SEO)
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

Note on `Button` and `cn()`: `class-variance-authority`, `clsx`, and
`tailwind-merge` are plain TypeScript (not React), so they are **kept**.
`lib/utils.ts` (`cn()`) → `src/lib/utils.ts`, and the one heavily-used shadcn
component, `Button` (15 call sites), is ported to `src/components/ui/Button.astro`
reusing the **identical `buttonVariants` cva** from the current `button.tsx`. This
guarantees byte-identical button classes across every call site with zero
framework runtime — safer than hand-merging 15 `cva`+`tailwind-merge` results into
literal strings. `Button.astro` renders `<a>` when given `href`, else `<button>`.
No other shadcn/ui files carry over.

## Interactivity (no framework, near-zero JS)

The whole app currently hydrates React to power a menu, a form, and an accordion.
After migration there is **no React runtime** — three tiny vanilla scripts, and
one native element:

| Piece | Current | Astro |
|-------|---------|-------|
| Mobile menu | `header.tsx` `useState` | `Header.astro` — reproduce the **current inline dropdown** markup; toggle open/closed via a small inline `<script>` (show/hide + swap Menu/X icon) |
| Contact form | `contact-form.tsx` `useState` | `ContactForm.astro` — inline `<script>` on submit: `preventDefault`, hide form, show the existing "Message sent" panel. Submits nowhere (unchanged). |
| FAQ accordion | `faq.tsx` `useState` | **native `<details>`/`<summary>`** in `FAQ.astro` — zero JS |
| Testimonials | `testimonials.tsx` `useState` carousel | `Testimonials.astro` — carousel is load-bearing (prev/next/dots cycle 4 reviews); reproduce with a small inline `<script>` (show/hide slides, wire buttons) |
| CTA | `cta.tsx` `useState` form | `CTA.astro` — has the same fake-submit lead form; inline `<script>` submit→success swap, same as ContactForm |

- **Icons:** current components import `lucide-react` (28 unique glyphs: Menu, X,
  Phone, Check, ChevronDown, Star, ArrowLeft, ArrowRight, Quote, Home, Layers,
  Wind, Building2, PaintRoller, DoorClosed, Hammer, Trash2, ShieldCheck, Users,
  ThumbsUp, Clock, Award, Leaf, MapPin, Mail, CheckCircle2, BadgeCheck, PiggyBank).
  With no React, they are reproduced as **inline SVG** via `Icon.astro`, sourced
  from the `lucide-static` package (dev-only) so path data / viewBox / stroke match
  the current output exactly.
- **FAQ** open/closed styling is reproduced with `<details open>` on the first
  item plus CSS (`details[open]` marker rotation) to match the current
  chevron/expand look pixel-for-pixel.
- If any Testimonials/CTA interactivity turns out to be load-bearing (not just
  decorative) during the port, it gets the same tiny-inline-script treatment — not
  a React island, and not a redesign.

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

Google Fonts `<link>` for Inter + Oswald in `Layout.astro` (simplest). Critical
detail: `global.css`'s `@theme inline` block reads `var(--font-inter)` and
`var(--font-oswald)` — variables that `next/font` injected on `:root` today. With
no next/font, `global.css` must **define those variables on `:root`** pointing at
the Google-loaded families, e.g.:

```css
:root {
  --font-inter: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-oswald: "Oswald", "Inter", ui-sans-serif, sans-serif;
  /* ...existing tokens unchanged... */
}
```

Without this the `font-sans` / `font-heading` tokens collapse to fallback fonts —
the single most likely pixel-perfect regression. The `@theme inline` block itself
is copied verbatim.

## Dependencies

**Keep:** `class-variance-authority`, `clsx`, `tailwind-merge` (plain TS, power
`Button.astro`), `tailwindcss` v4, `tw-animate-css` (`global.css` imports it),
`typescript`, `@types/node`.

**Add:** `astro`, `@astrojs/check`, `@tailwindcss/vite`, `lucide-static` (dev-only
icon SVG source).

**Remove:** `next`, `next-themes`, `@vercel/analytics`, `react`, `react-dom`,
`lucide-react`, `autoprefixer`, `postcss`, `@tailwindcss/postcss`,
`@hookform/resolvers`, `react-hook-form`, `zod`, and **all** `@radix-ui/*` /
remaining shadcn runtime packages (~48 total). No React runtime remains.

This is a near-total dependency wipe: from ~60 packages to ~9.

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
3. View-source confirms **no framework runtime** ships — only the small inline
   toggle scripts; FAQ is native `<details>`.
4. Confirm `<meta robots noindex,nofollow>` on every page and `public/robots.txt`
   present in `dist/`.
5. Confirm favicons, `og.jpg`, and all images resolve; all inline SVG icons match
   the current Lucide glyphs.

## Risks / notes

- **Tailwind v4 token parity** is the pixel-perfect linchpin: `global.css` must be
  copied verbatim, including `@theme` tokens, custom utilities, and font-variable
  wiring. Diff the compiled CSS if anything looks off.
- **Icon fidelity:** inline SVGs must use Lucide's exact path data / viewBox /
  stroke settings so glyphs are identical to the current `lucide-react` output.
- **Mobile menu:** reproduce **this site's current inline dropdown** exactly (not
  osaka's Sheet). The vanilla toggle must reproduce the existing open/close markup
  and the Menu↔X icon swap.
- `next/font` self-hosts and avoids layout shift; the Google Fonts `<link>` adds
  one external request. Acceptable for a demo; the one intentional fidelity trade
  for simplicity.
