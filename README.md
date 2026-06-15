# Adicare

The marketing site for **Adicare** — the AI-native healthcare platform — built from the original design as a SEO-friendly, server-rendered **Next.js** (App Router) app.

## Stack

- **Next.js 15** (App Router, React 19) — server-rendered HTML for SEO + fast Core Web Vitals
- **TypeScript**
- Design-token CSS system (`app/globals.css`) + React inline styles, ported 1:1 from the original design
- **next/font** (Plus Jakarta Sans, Instrument Serif, JetBrains Mono, Caveat) — self-hosted, no layout shift
- **No external/API dependencies.** The "Live Demo" parses prescriptions entirely in the browser (`components/parsePrescription.ts`) — no API key, no network calls.

## Getting started

```bash
npm install
npm run dev                  # http://localhost:3000
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint |

## SEO

- Per-page `<title>` / meta description, Open Graph + Twitter cards (`app/layout.tsx`)
- Schema.org JSON-LD (Organization, WebSite, SoftwareApplication)
- `sitemap.xml` (`app/sitemap.ts`) and `robots.txt` (`app/robots.ts`)
- Set `NEXT_PUBLIC_SITE_URL` to your production domain so canonical / OG / sitemap URLs are correct.

## Project structure

```
app/
  layout.tsx        fonts, metadata, JSON-LD
  page.tsx          composes the section components
  globals.css       design tokens, base styles, keyframes, responsive helpers
  sitemap.ts / robots.ts / not-found.tsx
components/         one file per section (Header, ProductSuite, Features, AIDemo, Sections, Footer)
                    + shared primitives + parsePrescription.ts (local demo parser)
public/favicon.svg
```

> `_extracted/` and `Adicare (standalone).html` are the original design-tool export, kept for reference and excluded from the build.

## Deploy (Vercel)

1. `npm i -g vercel` (once)
2. From this folder: `vercel` (follow prompts) then `vercel --prod`
3. In the Vercel dashboard → Project → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_SITE_URL` (your production domain)
4. Add your custom domain under Settings → Domains. SSL is automatic.
