# tonishqakaplish.com

Personal portfolio: React 19 + Vite 7 + Tailwind CSS v4, deployed on Vercel.

## Commands

```
npm run dev        # local dev server (plain client-side rendering, no prerender)
npm run build      # production build: client bundle + prerendered static HTML (see below)
npm run preview    # serve the production build locally
npm run lint
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/data.js` | All content: projects, AI projects, timeline, education, references, content items, and the `site` block (title, description, links). Edit this to change what the site says. |
| `src/Portfolio.jsx` | The page itself: theme, components, sections, routing. |
| `src/routes.js` | URL helpers shared by the app and the prerender script. |
| `src/entry-server.jsx` | Server-side render entry, used only at build time. |
| `scripts/prerender.mjs` | Turns the build into static HTML pages plus `sitemap.xml`, `llms.txt` and `llms-full.txt`. |
| `public/robots.txt` | Allows all crawlers, including AI crawlers, and points at the sitemap. |
| `vercel.json` | Build command, output directory, clean URLs. |

## Why the build prerenders

Most AI crawlers (GPTBot, ClaudeBot, PerplexityBot and others) download a page's HTML but never execute its JavaScript. A plain Vite build ships an empty `<div id="root">` and lets React draw the page in the browser, so to those crawlers the site was blank.

`npm run build` therefore runs three steps:

1. `vite build` builds the normal client bundle into `dist/`.
2. `vite build --ssr src/entry-server.jsx --outDir dist-ssr` builds a Node-side renderer.
3. `node scripts/prerender.mjs` renders every page to finished HTML and writes it into `dist/`:
   - `/` → `dist/index.html`
   - `/projects/<id>` → `dist/projects/<id>.html` (one per case study; `cleanUrls` in `vercel.json` serves it at the extensionless URL)
   - `sitemap.xml`, `llms.txt`, `llms-full.txt`, all generated from `src/data.js`

In the browser, `src/main.jsx` hydrates the existing markup instead of re-creating it, so the site looks and behaves exactly as before. Old `#/deep-dive/<id>` links still work and are upgraded to `/projects/<id>` on load.

To check that a page is readable without JavaScript, open `view-source:` on the deployed URL, or run:

```
curl -s https://tonishqakaplish.com/ | grep -c "Tonishqa Kaplish"
```

## Notes

- Anything that reads `window` or `document` must run inside an event handler or `useEffect`, never during render, or the build-time render will fail.
- The build fails loudly if a page renders nearly empty or without its project title, so a broken prerender can't ship silently.
