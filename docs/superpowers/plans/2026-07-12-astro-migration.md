# A Plus Insulation — Next.js → Astro Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Next.js 16 static-export build of the A Plus Insulation demo site with a static Astro build that is pixel-identical, ships no framework runtime, and deploys through the existing Hostinger/`aplus2` pipeline.

**Architecture:** Pure Astro static site. Every component becomes `.astro`; three tiny inline `<script>`s cover the only interactivity (mobile-menu toggle, fake form submit, testimonials carousel); FAQ uses native `<details>`. No React/Radix. `Button` is ported to `Button.astro` reusing the current `buttonVariants` cva (kept `class-variance-authority`/`clsx`/`tailwind-merge` — plain TS). Lucide icons become inline SVG via `Icon.astro` sourced from `lucide-static`.

**Tech Stack:** Astro 5, Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first), `tw-animate-css`, `class-variance-authority` + `clsx` + `tailwind-merge`, `lucide-static` (dev-only icon source). Node 22.

**Spec:** `docs/superpowers/specs/2026-07-12-astro-migration-design.md`

## Global Constraints

- **Pixel-perfect** — no design, layout, copy, spacing, or color change. Class strings and `global.css` are ported verbatim. Framework changes; output HTML/CSS does not.
- **No React / no framework runtime** — no `react`, `react-dom`, `@astrojs/react`, `@radix-ui/*`, `lucide-react`, `next-themes`, `react-hook-form`.
- **noindex** — every page carries `<meta name="robots" content="noindex, nofollow">`; `public/robots.txt` disallows all. This is a portfolio/demo build.
- **Simplest protocol** — Google Fonts `<link>`; no JSON-LD, no sitemap, no analytics. SEO + contact form are inert placeholders.
- **Deploy unchanged** — Hostinger SFTP to `domains/simsdigitalpartners.com/public_html/preview-sites/aplus2/`; only the build-output dir changes `out/` → `dist/`.
- **`site` URL** — `https://aplus2.simsdigitalpartners.com`.
- **Node 22**, package manager npm, `"type": "module"`.
- **Verification, not unit tests** — this is a static content port with no test framework. Each task's gate is: `npm run build` succeeds, `npx astro check` is clean, and (where noted) a `astro dev` visual/`view-source` spot-check. Commit after each green task.

## JSX → Astro conversion rules (apply to every component task)

For each `components/<name>.tsx` → `src/components/<Name>.astro`:

1. Delete `"use client"` and every React import (`useState`, `type React`, etc.).
2. Move any module-level `const` data arrays (e.g. `navLinks`, `services`, `testimonials`) **unchanged** into the `.astro` frontmatter (`---` fence).
3. In the frontmatter, import child components / data / `Icon` / `Button` used by the markup.
4. In markup: `className=` → `class=`; `htmlFor=` → `for=`; remove `key={...}`; keep `{expr}` interpolations and `{arr.map((x) => (...))}` (Astro supports both).
5. `import Link from "next/link"` → use plain `<a href="...">`. `<Link href={x}>` → `<a href={x}>`.
6. Lucide `<Menu className="w-6 h-6" />` → `<Icon name="menu" class="w-6 h-6" />` (kebab-case name).
7. `<Button ...>` / `<Button asChild><Link href>…</Link></Button>` → `<Button href="…" class="…">…</Button>` (see Task 4 for `Button.astro` API).
8. Escape sequences already in JSX text (`&apos;`, `&ldquo;`, `&rdquo;`) stay as-is (valid HTML entities).
9. Keep all `class` strings **character-for-character identical** to the source.

Component-specific interactivity (menu, form, carousel, FAQ) is called out in its task.

---

## Task 1: Scaffold Astro, strip Next

**Files:**
- Create: `package.json` (replace), `astro.config.mjs`, `tsconfig.json` (replace), `.gitignore` (update)
- Delete: `next.config.mjs`, `next-env.d.ts`, `postcss.config.mjs` (if present), `app/` layout/route files are removed in Task 12 (not yet — pages still reference them until ported). For now leave `app/`, `components/`, `lib/` in place as the port source.

**Interfaces:**
- Produces: a buildable Astro project skeleton; `npm run build` → `dist/`, `npm run typecheck` → `astro check`.

- [ ] **Step 1: Replace `package.json`**

```json
{
  "name": "aplus-insulation",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "description": "A Plus Insulation — static Astro portfolio build (SDP).",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "typecheck": "astro check",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^5.2.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "@tailwindcss/vite": "^4.0.0",
    "@types/node": "^22",
    "lucide-static": "^0.454.0",
    "tailwindcss": "^4.0.0",
    "tw-animate-css": "^1.3.3",
    "typescript": "^5.7.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static output — flat HTML/CSS/JS, zero server surface. Deployed per the SDP
// static-sites playbook (GitHub Actions → SFTP to Hostinger, `dist/` output).
// No React integration: this site's interactivity is a few inline scripts.
export default defineConfig({
  site: 'https://aplus2.simsdigitalpartners.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Replace `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Update `.gitignore`** — ensure it ignores `dist/` and `.astro/`. Add these lines if missing (leave existing entries):

```
dist/
.astro/
```

- [ ] **Step 5: Delete Next config files**

```bash
rm -f next.config.mjs next-env.d.ts postcss.config.mjs
```

- [ ] **Step 6: Install and verify skeleton builds**

Create a throwaway `src/pages/index.astro` with `<h1>ok</h1>` so the build has an entry, then:

Run:
```bash
npm install
npx astro check
npm run build
```
Expected: `astro check` reports 0 errors; `npm run build` writes `dist/index.html`. (The throwaway page is replaced in Task 10.)

- [ ] **Step 7: Commit**

```bash
git add package.json astro.config.mjs tsconfig.json .gitignore src/pages/index.astro
git rm --cached next.config.mjs next-env.d.ts 2>/dev/null || true
git commit -m "chore: scaffold Astro project, remove Next config"
```

---

## Task 2: Global styles + font-variable wiring

**Files:**
- Create: `src/styles/global.css` (from `app/globals.css`)

**Interfaces:**
- Produces: `@/styles/global.css` importable by `Layout.astro`; defines the `--font-inter` / `--font-oswald` vars the `@theme` block consumes.

- [ ] **Step 1: Copy `app/globals.css` verbatim to `src/styles/global.css`.**

Keep every line including `@import "tailwindcss";`, `@import "tw-animate-css";`, `@custom-variant dark`, the full `:root` and `.dark` token blocks, the entire `@theme inline` block, and the `@layer base` / `@layer utilities` blocks — unchanged.

- [ ] **Step 2: Add the font-family variables to `:root`.**

In `src/styles/global.css`, inside the existing `:root { … }` block, add these two lines (next/font used to inject them; without it the `@theme` `--font-sans`/`--font-heading` collapse to fallback). Add right after the opening `:root {`:

```css
  --font-inter: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-oswald: "Oswald", "Inter", ui-sans-serif, sans-serif;
```

Do not modify the `@theme inline` block — it already reads `var(--font-inter)` / `var(--font-oswald)`.

- [ ] **Step 3: Verify it compiles** (deferred visual check until Layout exists in Task 3).

Run: `npx astro check`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: port global.css with :root font-variable wiring"
```

---

## Task 3: Layout.astro (head, fonts, noindex)

**Files:**
- Create: `src/layouts/Layout.astro`

**Interfaces:**
- Produces: `Layout` component with `Props { title?: string; description?: string }`. Pages wrap content in `<Layout title="…" description="…">…</Layout>`. Default title/description come from constants below.

- [ ] **Step 1: Create `src/layouts/Layout.astro`**

```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const DEFAULT_TITLE = 'A Plus Insulation | Spray Foam & Insulation, Panama City FL';
const DEFAULT_DESC =
  'A Plus Insulation installs spray foam, blown-in fiberglass, cellulose & batt insulation across Panama City and the Florida Gulf Coast. Free estimates — call 850-209-2636.';

const { title, description = DEFAULT_DESC } = Astro.props;
const fullTitle = title ? `${title} | A Plus Insulation` : DEFAULT_TITLE;
---

<!doctype html>
<html lang="en" class="bg-background">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <!-- Portfolio/demo build — keep it out of search indexes. -->
    <meta name="robots" content="noindex, nofollow" />

    <link rel="icon" type="image/svg+xml" href="/icon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
    <link rel="apple-touch-icon" href="/apple-icon.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="/og.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="/og.jpg" />
  </head>
  <body class="font-sans antialiased">
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Point the throwaway index at Layout to smoke-test CSS + fonts.**

Temporarily set `src/pages/index.astro` to:

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout>
  <h1 class="font-heading uppercase text-5xl text-primary p-10">Heading font check</h1>
  <p class="font-sans text-foreground p-10">Body font check</p>
</Layout>
```

- [ ] **Step 3: Visual smoke-test**

Run: `npm run dev` and open the page. Confirm: dark background (`--background` token), lime/green `--primary` heading in **Oswald**, body in **Inter**. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro src/pages/index.astro
git commit -m "feat: Layout.astro with head, Google fonts, noindex"
```

---

## Task 4: Button.astro + cn() util

**Files:**
- Create: `src/lib/utils.ts` (from `lib/utils.ts`), `src/components/ui/Button.astro` (from `components/ui/button.tsx`)

**Interfaces:**
- Produces:
  - `cn(...inputs)` in `@/lib/utils`.
  - `Button.astro` — props: `{ href?: string; type?: string; size?: 'default'|'sm'|'lg'|'icon'|'icon-sm'|'icon-lg'; variant?: 'default'|'destructive'|'outline'|'secondary'|'ghost'|'link'; class?: string }` plus passthrough attrs. Renders `<a>` when `href` set, else `<button>`. Uses the **same `buttonVariants` cva** as the current `button.tsx`.

- [ ] **Step 1: Copy `lib/utils.ts` → `src/lib/utils.ts` verbatim.** (It is the standard `cn` = `twMerge(clsx(inputs))`.)

- [ ] **Step 2: Create `src/components/ui/Button.astro`** — copy the exact `buttonVariants` cva from `components/ui/button.tsx`:

```astro
---
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

const { href, type, size, variant, class: className, ...rest } = Astro.props;
const cls = cn(buttonVariants({ variant, size }), className);
---

{href ? (
  <a href={href} class={cls} {...rest}><slot /></a>
) : (
  <button type={type ?? 'button'} class={cls} {...rest}><slot /></button>
)}
```

- [ ] **Step 3: Verify**

Run: `npx astro check`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/utils.ts src/components/ui/Button.astro
git commit -m "feat: Button.astro reusing buttonVariants cva + cn util"
```

---

## Task 5: Icon.astro (inline lucide SVGs)

**Files:**
- Create: `src/components/Icon.astro`

**Interfaces:**
- Produces: `<Icon name="menu" class="w-6 h-6" />`. Props: `{ name: string; class?: string }`. Renders a `<svg>` with `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"` and the named glyph's inner markup. `class` merges onto the svg.

**Icon set (28, kebab-case names):** `menu`, `x`, `phone`, `check`, `chevron-down`, `star`, `arrow-left`, `arrow-right`, `quote`, `home`, `layers`, `wind`, `building-2`, `paint-roller`, `door-closed`, `hammer`, `trash-2`, `shield-check`, `users`, `thumbs-up`, `clock`, `award`, `leaf`, `map-pin`, `mail`, `check-circle-2`, `badge-check`, `piggy-bank`.

- [ ] **Step 1: Source exact glyph markup.** `lucide-static` (installed in Task 1) ships raw SVGs at `node_modules/lucide-static/icons/<name>.svg`. For each of the 28 names, read that file and copy the **inner** elements (everything between `<svg …>` and `</svg>` — the `<path>`/`<line>`/`<circle>` etc.). Note: `check-circle-2` is `circle-check` in newer lucide — if `check-circle-2.svg` is absent, use `circle-check.svg`; likewise `badge-check` → `badge-check.svg`. Verify each file exists:

Run: `ls node_modules/lucide-static/icons/{menu,x,phone,check,chevron-down,star,arrow-left,arrow-right,quote,home,layers,wind,building-2,paint-roller,door-closed,hammer,trash-2,shield-check,users,thumbs-up,clock,award,leaf,map-pin,mail,badge-check,piggy-bank}.svg node_modules/lucide-static/icons/circle-check.svg`
Expected: all listed (note any that map to an alternate filename).

- [ ] **Step 2: Create `src/components/Icon.astro`** with a name→inner-markup map. Pattern (fill the map from Step 1; two entries shown as the template — `menu` and `check` are stable and shown filled):

```astro
---
interface Props { name: string; class?: string }
const { name, class: className } = Astro.props;

// Inner markup copied verbatim from node_modules/lucide-static/icons/<name>.svg
const ICONS: Record<string, string> = {
  'menu': '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  'check': '<path d="M20 6 9 17l-5-5"/>',
  // …add the remaining 26 icons here, copying inner markup from lucide-static…
};

const inner = ICONS[name] ?? '';
---
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24" height="24" viewBox="0 0 24 24"
  fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round"
  class={className}
  aria-hidden="true"
  set:html={inner}
/>
```

Fidelity note: `lucide-react` renders identical `<svg>` attributes and the exact inner paths — copying inner markup verbatim yields pixel-identical glyphs. Keep the outer `<svg>` attributes exactly as above.

- [ ] **Step 3: Verify all 28 names resolve.** Temporarily render every icon on the throwaway index and confirm none are blank, then revert index.

Run: `npm run dev`, eyeball the icon grid.
Expected: all 28 glyphs visible, none empty.

- [ ] **Step 4: Commit**

```bash
git add src/components/Icon.astro
git commit -m "feat: Icon.astro with inline lucide-static glyphs"
```

---

## Task 6: Header.astro (+ mobile menu toggle) & Footer.astro

**Files:**
- Create: `src/components/Header.astro` (from `components/header.tsx`), `src/components/Footer.astro` (from `components/footer.tsx`)

**Interfaces:**
- Produces: `Header`, `Footer` — no props; used by every page.

- [ ] **Step 1: Port `Footer.astro`** applying the conversion rules. Replace `next/link` `<Link>` with `<a>`, lucide icons with `<Icon>`. Keep all classes verbatim.

- [ ] **Step 2: Port `Header.astro` markup** applying the conversion rules. The current `header.tsx` keeps `navLinks` (move to frontmatter), renders logo `<img>`, desktop nav, the `tel:` link, a `Button asChild` "Free Estimate" (→ `<Button href="/contact" class="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-5 text-sm font-semibold uppercase tracking-wide">Free Estimate</Button>`), a mobile menu button, and the mobile nav panel. Reproduce **all** of it with identical classes. For the toggle, give stable ids/attributes:
  - mobile toggle button: add `id="menu-toggle"`, keep its classes; put **both** icons inside it: `<Icon name="menu" class="w-6 h-6" data-menu-icon="open" />` and `<Icon name="x" class="w-6 h-6 hidden" data-menu-icon="close" />`.
  - mobile nav panel wrapper: render it always in the DOM but add `id="mobile-menu"` and `class="… hidden"` (append `hidden` to whatever wrapper class the source used for the panel).

- [ ] **Step 3: Add the toggle script** at the end of `Header.astro` (vanilla, reproduces the `useState` open/close incl. closing on link click, matching source behavior):

```astro
<script>
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const openIcon = document.querySelector('[data-menu-icon="open"]');
  const closeIcon = document.querySelector('[data-menu-icon="close"]');
  function setOpen(open) {
    menu?.classList.toggle('hidden', !open);
    openIcon?.classList.toggle('hidden', open);
    closeIcon?.classList.toggle('hidden', !open);
  }
  toggle?.addEventListener('click', () => setOpen(menu?.classList.contains('hidden') ?? false));
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
</script>
```

- [ ] **Step 4: Verify** — render Header + Footer on the throwaway index.

Run: `npm run dev`; at a narrow width click the menu button: panel shows/hides, icon swaps Menu↔X, clicking a link closes it. At wide width the desktop nav + Free Estimate button match the current site. `npx astro check` clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.astro src/components/Footer.astro
git commit -m "feat: Header (vanilla menu toggle) + Footer"
```

---

## Task 7: Static section components

**Files:**
- Create: `src/components/Hero.astro`, `PageHero.astro`, `LogoCloud.astro`, `Features.astro`, `HowItWorks.astro`, `Pricing.astro` (from the matching `components/*.tsx`)

**Interfaces:**
- Produces: the six presentational sections. `PageHero` takes props matching `components/page-hero.tsx` (inspect its prop signature — typically `{ title, subtitle, breadcrumbs?, ... }`) — reproduce its Props interface exactly in frontmatter. The others are prop-driven or self-contained as in source.

- [ ] **Step 1: Port each of the six** applying the conversion rules (`className`→`class`, `<Link>`→`<a>`, lucide→`<Icon>`, `<Button>`→`Button.astro`, data arrays into frontmatter, classes verbatim). `PageHero` uses `next/link` — convert its `<Link>` and preserve its prop interface so pages can pass the same props.

- [ ] **Step 2: Verify** — mount all six on the throwaway index with representative props.

Run: `npm run dev`; compare each section against the current site. `npx astro check` clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro src/components/PageHero.astro src/components/LogoCloud.astro src/components/Features.astro src/components/HowItWorks.astro src/components/Pricing.astro
git commit -m "feat: port static section components"
```

---

## Task 8: FAQ.astro (native details) + Testimonials.astro (inline carousel)

**Files:**
- Create: `src/components/FAQ.astro` (from `components/faq.tsx`), `src/components/Testimonials.astro` (from `components/testimonials.tsx`)

**Interfaces:**
- Produces:
  - `FAQ` — props `{ faqs?: FaqItem[]; heading?: string; intro?: string }` (default `faqs` = `homeFaqs` from `@/data/faqs`, default heading `"Frequently asked questions"`).
  - `Testimonials` — no props (self-contained `testimonials` array in frontmatter).

- [ ] **Step 1: Port `FAQ.astro`** reproducing the section header/intro markup verbatim. Replace the `useState` accordion (the `faqs.map` block) with native disclosure — one `<details>` per item, first item `open`:

```astro
<div class="space-y-4">
  {faqs.map((faq, index) => (
    <details class="border border-border rounded-xl overflow-hidden bg-card group" open={index === 0}>
      <summary class="w-full flex items-center justify-between p-6 text-left cursor-pointer list-none">
        <span class="text-lg font-semibold text-foreground pr-4">{faq.question}</span>
        <Icon name="chevron-down" class="w-5 h-5 text-primary shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div class="overflow-hidden">
        <p class="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.answer}</p>
      </div>
    </details>
  ))}
</div>
```

Add to `src/styles/global.css` (once) to hide the native marker so it matches the current chevron-only look:

```css
summary::-webkit-details-marker { display: none; }
```

Fidelity note: the current build animates `max-height`; native `<details>` snaps open. This is the one interaction that differs (expand is instant vs. 200ms slide) — acceptable per the "simplest protocol" decision. The chevron still rotates via `group-open:rotate-180`.

- [ ] **Step 2: Port `Testimonials.astro`** reproducing the section header, and render **all** slides in the DOM (only the first visible), plus prev/next buttons and dot buttons with stable hooks. Keep every class verbatim; add: on each slide wrapper `data-slide` and `class="… hidden"` for all but index 0; on prev `id="rev-prev"`, next `id="rev-next"`; on each dot `data-dot` and reproduce the active/inactive class toggling (`bg-primary` active vs `bg-border hover:bg-muted-foreground/50`).

- [ ] **Step 3: Add the carousel script** at the end of `Testimonials.astro` (reproduces the `current` state + `next`/`prev`/dot handlers):

```astro
<script>
  const slides = Array.from(document.querySelectorAll('[data-slide]'));
  const dots = Array.from(document.querySelectorAll('[data-dot]'));
  let current = 0;
  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('hidden', n !== current));
    dots.forEach((d, n) => {
      d.classList.toggle('bg-primary', n === current);
      d.classList.toggle('bg-border', n !== current);
      d.classList.toggle('hover:bg-muted-foreground/50', n !== current);
    });
  }
  document.getElementById('rev-prev')?.addEventListener('click', () => show(current - 1));
  document.getElementById('rev-next')?.addEventListener('click', () => show(current + 1));
  dots.forEach((d, n) => d.addEventListener('click', () => show(n)));
</script>
```

- [ ] **Step 4: Verify**

Run: `npm run dev`; FAQ items expand/collapse and first is open; chevron rotates. Testimonials: arrows and dots cycle all 4 reviews with the active dot highlighted. `npx astro check` clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/FAQ.astro src/components/Testimonials.astro src/styles/global.css
git commit -m "feat: FAQ (native details) + Testimonials (inline carousel)"
```

---

## Task 9: ContactForm.astro + CTA.astro (fake-submit forms)

**Files:**
- Create: `src/components/ContactForm.astro` (from `components/contact-form.tsx`), `src/components/CTA.astro` (from `components/cta.tsx`)

**Interfaces:**
- Produces: `ContactForm` (no props), `CTA` (no props). Both submit nowhere; on submit they swap the form for the existing "Message sent" / "Request received" success panel.

- [ ] **Step 1: Port `ContactForm.astro`.** Render **both** states in the DOM: the success panel (the current `submitted` markup) wrapped with `id="cf-success" class="hidden"`, and the `<form>` with `id="cf-form"`. Keep all field markup, `services` array (frontmatter), labels, and classes verbatim. Convert the submit `<Button>` to `Button.astro` (`type="submit"`, same classes).

- [ ] **Step 2: Add the submit script** to `ContactForm.astro`:

```astro
<script>
  const form = document.getElementById('cf-form');
  const success = document.getElementById('cf-success');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    form.classList.add('hidden');
    success?.classList.remove('hidden');
  });
</script>
```

- [ ] **Step 3: Port `CTA.astro`** the same way — reproduce the two-column layout (copy + call block on the left, form card on the right). Render both the success panel (`id="cta-success" class="hidden"`, the "Request received" markup) and the `<form id="cta-form">`. Keep the `services` array, all fields, and classes verbatim. Add the mirror script:

```astro
<script>
  const ctaForm = document.getElementById('cta-form');
  const ctaSuccess = document.getElementById('cta-success');
  ctaForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    ctaForm.classList.add('hidden');
    ctaSuccess?.classList.remove('hidden');
  });
</script>
```

- [ ] **Step 4: Verify**

Run: `npm run dev`; submit each form → it swaps to the success panel; the second form (CTA) works independently of ContactForm. `npx astro check` clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/ContactForm.astro src/components/CTA.astro
git commit -m "feat: ContactForm + CTA with inline fake-submit swap"
```

---

## Task 10: Data files + pages

**Files:**
- Create: `src/data/site.ts` (from `lib/site-config.ts`), `src/data/faqs.ts` (from `lib/faqs.ts`), and `src/pages/{index,about,services,service-area,contact}.astro` (from `app/**/page.tsx`)
- Replace: throwaway `src/pages/index.astro`

**Interfaces:**
- Consumes: all components from Tasks 4–9.
- Produces: the five routes. FAQ/pages import `homeFaqs`/`servicesFaqs`/`aboutFaqs`/`serviceAreaFaqs`/`contactFaqs` and `business` from `@/data/*`.

- [ ] **Step 1: Port data.** Copy `lib/faqs.ts` → `src/data/faqs.ts` verbatim (it exports the five `FaqItem[]` consts + imports `FaqItem` type). Copy the **content** of `lib/site-config.ts` → `src/data/site.ts`, keeping the `business` object, `SITE_URL`, and the `FaqItem`/`Crumb` interfaces. **Drop** `localBusinessSchema()`, `faqPageSchema()`, `breadcrumbSchema()` (no JSON-LD). Replace the `process.env` line with a literal: `export const SITE_URL = "https://aplus2.simsdigitalpartners.com";`. Fix the `FaqItem` import in `faqs.ts` to point at `./site` if needed.

- [ ] **Step 2: Port each page** `app/<route>/page.tsx` → `src/pages/<route>.astro` (home = `index.astro`). For each:
  - Frontmatter: import `Layout`, `Header`, `Footer`, and the sections the page composes (per the import lists in the source page), plus the page's `faqs` from `@/data/faqs`.
  - Wrap the body in `<Layout title="…" description="…">` using the page's current `metadata.title`/`metadata.description` values (strip the `| A Plus Insulation` suffix from `title` — `Layout` re-adds it).
  - Body: `<Header />`, then the sections in the same order as the source JSX, then `<Footer />`. Drop `<JsonLd …>` and `<Analytics />` entirely.
  - Pass the same props the source passed (e.g. `<FAQ faqs={servicesFaqs} … />`, `PageHero` title/subtitle/breadcrumbs).

- [ ] **Step 3: Full build + route check**

Run:
```bash
npm run build
```
Expected: `dist/index.html`, `dist/about/index.html`, `dist/services/index.html`, `dist/service-area/index.html`, `dist/contact/index.html` all emitted. `npx astro check` clean.

- [ ] **Step 4: Commit**

```bash
git add src/data src/pages
git commit -m "feat: port data + all five pages to Astro"
```

---

## Task 11: public/ assets, robots.txt, remove Next source

**Files:**
- Keep: `public/*` (already at repo `public/` — images, favicons, `og.jpg`). Astro serves `public/` as-is, same as Next.
- Create: `public/robots.txt`
- Delete: `app/`, `components/*.tsx`, `components/ui/`, `components/theme-provider.tsx`, `lib/site-config.ts`, `lib/faqs.ts`, `lib/utils.ts` (now under `src/`)

**Interfaces:**
- Produces: clean tree with no Next/React source remaining.

- [ ] **Step 1: Confirm `public/` is intact** (Astro uses the same `public/` convention — no move needed).

Run: `ls public`
Expected: all current images + favicons + `og.jpg` present.

- [ ] **Step 2: Create `public/robots.txt`**

```
User-agent: *
Disallow: /
```

- [ ] **Step 3: Delete the ported Next/React source.**

```bash
git rm -r app components lib
```
(All three now live under `src/`. Double-check nothing under `src/` imports from these paths before deleting — `npx astro check` in the next step catches stragglers.)

- [ ] **Step 4: Build clean**

Run:
```bash
npm run build && npx astro check
```
Expected: build succeeds, `dist/robots.txt` present, 0 check errors.

- [ ] **Step 5: Commit**

```bash
git add public/robots.txt
git commit -m "chore: add robots.txt disallow, remove Next/React source"
```

---

## Task 12: CI deploy + final verification

**Files:**
- Modify: `.github/workflows/deploy.yml:77` (`./out/` → `./dist/`)

**Interfaces:**
- Produces: green CI that builds Astro and rsyncs `dist/` to the unchanged `aplus2` target.

- [ ] **Step 1: Update the rsync source in `.github/workflows/deploy.yml`.**

Change the source path line (currently `./out/`) to `./dist/`:

```yaml
          rsync -az --delete --exclude='.well-known/' \
            -e "ssh -i ~/.ssh/deploy_key -p $SSH_PORT -o StrictHostKeyChecking=yes" \
            ./dist/ \
            "$SSH_USER@$SSH_HOST:domains/simsdigitalpartners.com/public_html/preview-sites/aplus2/"
```

No other workflow change is needed: `npm run typecheck` now runs `astro check` and `npm run build` now runs `astro build` via `package.json`.

- [ ] **Step 2: Pixel-parity verification.** Run the Astro build locally and, if practical, the current Next `out/` (from `main`) side by side. Compare all five routes at a mobile (~390px) and desktop (~1280px) width:

Run: `npm run build && npm run preview`
Check per page: header + Free Estimate button, mobile menu open/close + icon swap, Hero, LogoCloud, Features, HowItWorks, Pricing, Testimonials carousel (arrows + dots), FAQ (first open, chevron rotate), CTA + ContactForm submit→success, Footer, all icons, fonts (Oswald headings / Inter body), colors.

- [ ] **Step 3: JS + meta audit.** `view-source` (or grep `dist/`): confirm only the small inline toggle scripts ship — no `react`/framework bundle — and every page has `<meta name="robots" content="noindex, nofollow">`.

Run: `grep -rl "noindex, nofollow" dist` (expect all 5 html files); `ls dist/_astro` (expect only tiny/no JS chunks, no react vendor bundle).

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: deploy Astro dist/ to Hostinger aplus2"
```

- [ ] **Step 5: Push and open PR** (per SDP flow — never push to main directly).

```bash
git push -u origin feat/astro-migration
gh pr create --base main --title "Migrate A Plus Insulation to Astro (static)" --body-file docs/superpowers/specs/2026-07-12-astro-migration-design.md
```
CI `validate` (astro check + audit) must pass on the PR before merge; merge to `main` triggers the deploy job.

---

## Self-review notes

- **Spec coverage:** structure (T1,T11), global.css + fonts (T2), Layout/head/noindex (T3), Button (T4), icons (T5), Header/mobile menu + Footer (T6), static sections (T7), FAQ native details + Testimonials carousel (T8), Contact/CTA forms (T9), data + pages (T10), robots + dep removal (T11), CI + verification (T12). Dependency changes land in T1's `package.json`. All spec sections mapped.
- **No functional form backend, no JSON-LD, no sitemap, no analytics** — intentionally omitted per spec (T10 Step 1 drops schema helpers; T3 omits JSON-LD/analytics; no sitemap task).
- **Type/name consistency:** `Button.astro` prop `class` (aliased from `class`), `cn` from `@/lib/utils`, `Icon` name kebab-case, data imports from `@/data/site` + `@/data/faqs`, ids used by scripts (`menu-toggle`/`mobile-menu`, `cf-form`/`cf-success`, `cta-form`/`cta-success`, `rev-prev`/`rev-next`, `data-slide`/`data-dot`) are each defined in the same task as their script.
