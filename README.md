# A Plus Insulation — Website

Marketing site for **A Plus Insulation**, an insulation contractor serving Panama City
and the Florida Gulf Coast. Built with the Next.js App Router, React 19, Tailwind CSS v4,
and shadcn/ui, with local SEO (LocalBusiness / FAQ / Breadcrumb structured data, sitemap,
and robots) and FAQs on every page.

## Getting started

**Prerequisite:** [Node.js](https://nodejs.org) 18 or newer (Node 24 recommended).

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open **http://localhost:3000** in your browser.

> On Windows PowerShell, run the two commands on separate lines — PowerShell doesn't
> support `&&`.

## Other commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload (localhost:3000) |
| `npm run build` | Create an optimized production build |
| `npm start` | Serve the production build (run `npm run build` first) |
| `npm run lint` | Run ESLint |

## Configuration

Set the site's production URL — it's used for canonical tags, `sitemap.xml`, `robots.txt`,
and structured data. Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SITE_URL=https://www.aplusinsulation.com
```

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS v4, shadcn/ui, lucide-react
- **SEO:** per-page metadata + canonicals, JSON-LD structured data, generated sitemap & robots
