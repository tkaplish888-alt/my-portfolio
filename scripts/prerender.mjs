/*
  Prerender: turn the built single-page app into static HTML pages.

  Why: most AI crawlers (GPTBot, ClaudeBot, PerplexityBot and others) download
  a page's HTML but never run its JavaScript. A plain Vite build ships an empty
  <div id="root"> and lets React draw the page in the browser, so those crawlers
  saw nothing. This script renders every page on the build machine instead and
  writes the finished HTML to dist/, where Vercel serves it as static files.
  React then "hydrates" in the browser (attaches to the existing markup), so the
  site looks and behaves exactly as before.

  Runs as the last step of `npm run build`, after:
    vite build                                   -> dist/        (client bundle)
    vite build --ssr src/entry-server.jsx        -> dist-ssr/    (server renderer)

  Pages generated:
    /                      -> dist/index.html
    /projects/<id>         -> dist/projects/<id>.html   (one per case study; served
                              at the extensionless URL via "cleanUrls" in vercel.json)
  Plus sitemap.xml, llms.txt and llms-full.txt, all derived from src/data.js.
*/
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const load = rel => import(pathToFileURL(path.join(root, rel)).href)
const { render } = await load('dist-ssr/entry-server.js')
const { site, projects, aiProjects, timeline, education, references, contentItems } = await load('src/data.js')
const { SITE_URL, projectPath } = await load('src/routes.js')

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')
for (const marker of ['<!--app-head-->', '<!--app-html-->']) {
  if (!template.includes(marker)) throw new Error(`dist/index.html is missing the ${marker} placeholder`)
}

/* ── helpers ─────────────────────────────────────────────────── */
const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;')

const clip = (text, max = 160) => {
  const clean = String(text).replace(/\*\*/g, '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…'
}

const absolute = p => (p.startsWith('http') ? p : `${SITE_URL}${p}`)

// Plain text from rendered HTML: used to put the hero and About copy, which
// live in Portfolio.jsx rather than data.js, into llms-full.txt.
const paragraphsOf = html =>
  [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)]
    .map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
    .map(t => t.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' '))
    .filter(Boolean)

const sectionOf = (html, open, close) => {
  const start = html.indexOf(open)
  if (start === -1) return ''
  const end = html.indexOf(close, start)
  return end === -1 ? '' : html.slice(start, end)
}

const jsonLd = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/<\//g, '<\\/')}</script>`

// Undo React's text escaping so rendered HTML can be checked against raw strings.
const unescape = s => s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

/* ── page definitions ────────────────────────────────────────── */
const allProjects = [...aiProjects, ...projects]
const today = new Date().toISOString().slice(0, 10)
const current = timeline.find(t => t.current) || timeline[0]
const personId = `${SITE_URL}/#person`

const person = {
  '@type': 'Person',
  '@id': personId,
  name: site.name,
  url: `${SITE_URL}/`,
  image: absolute(site.image),
  description: site.description,
  jobTitle: current?.role,
  worksFor: current ? { '@type': 'Organization', name: current.company } : undefined,
  address: { '@type': 'PostalAddress', addressLocality: site.location.city, addressRegion: site.location.region, addressCountry: site.location.country },
  email: site.email,
  alumniOf: [...new Set(education.map(e => e.school))].map(name => ({ '@type': 'CollegeOrUniversity', name })),
  knowsAbout: [...new Set(allProjects.flatMap(p => p.tags))],
  sameAs: [site.links.linkedin, site.links.github],
}

const homePage = {
  route: '/',
  file: 'index.html',
  title: site.title,
  description: site.description,
  ogType: 'profile',
  structuredData: {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: site.name, description: site.description, author: { '@id': personId } },
    ],
  },
}

const projectPages = allProjects.map(p => ({
  route: projectPath(p.id),
  // Flat files + "cleanUrls" in vercel.json: /projects/<id> serves projects/<id>.html
  file: path.join('projects', `${p.id}.html`),
  title: `${p.title} | ${site.name}`,
  description: clip(p.oneLiner),
  ogType: 'article',
  expect: p.title,
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}${projectPath(p.id)}#article`,
    headline: p.title,
    description: clip(p.oneLiner, 300),
    url: `${SITE_URL}${projectPath(p.id)}`,
    mainEntityOfPage: `${SITE_URL}${projectPath(p.id)}`,
    keywords: p.tags.join(', '),
    author: { '@id': personId },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    ...(p.caseStudyUrl ? { sameAs: p.caseStudyUrl } : {}),
  },
}))

const pages = [homePage, ...projectPages]

/* ── render ──────────────────────────────────────────────────── */
const headFor = page => {
  const url = `${SITE_URL}${page.route}`
  const image = absolute(site.image)
  return [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${page.ogType}" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${esc(site.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${esc(site.imageAlt)}" />`,
    jsonLd(page.structuredData),
  ].join('\n    ')
}

let homeHtml = ''
for (const page of pages) {
  const appHtml = render(page.route)
  if (!appHtml || appHtml.length < 2000) throw new Error(`Render of ${page.route} came back nearly empty (${appHtml.length} chars)`)
  if (page.expect && !unescape(appHtml).includes(page.expect)) {
    throw new Error(`Render of ${page.route} does not contain "${page.expect}"`)
  }
  if (page.route === '/') homeHtml = appHtml

  // Function replacers so "$" in the content (e.g. "$3.68M") is never treated as a pattern.
  const html = template
    .replace(/<title>[^<]*<\/title>/, () => `<title>${esc(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, () => `<meta name="description" content="${esc(page.description)}" />`)
    .replace('<!--app-head-->', () => headFor(page))
    .replace('<!--app-html-->', () => appHtml)

  const out = path.join(dist, page.file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
  console.log(`prerendered ${page.route.padEnd(32)} -> ${path.relative(root, out)}`)
}

/* ── sitemap.xml ─────────────────────────────────────────────── */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schema/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${SITE_URL}${p.route}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)

/* ── llms.txt and llms-full.txt ──────────────────────────────── */
// llms.txt is a short, link-first index for language models (llmstxt.org).
// llms-full.txt carries the full text of every case study.
const heroText = paragraphsOf(sectionOf(homeHtml, '<header', '</header>'))
const aboutText = paragraphsOf(sectionOf(homeHtml, '<section id="about"', '</section>'))
const projectLine = p => `- [${p.title}](${SITE_URL}${projectPath(p.id)}): ${clip(p.oneLiner, 220)}`

const llms = `# ${site.name}

> ${site.description}

${site.tagline} Based in ${site.location.city}, ${site.location.region}. ${heroText[1] || ''}

## AI infrastructure projects

${aiProjects.map(projectLine).join('\n')}

## Marketing and GTM case studies

${projects.map(projectLine).join('\n')}

## Experience

${timeline.map(t => `- ${t.role}${t.note ? ` (${t.note})` : ''}, ${t.company} (${t.period})`).join('\n')}

## Education

${education.map(e => `- ${e.degree}, ${e.school} (${e.period})`).join('\n')}

## Elsewhere

- [LinkedIn](${site.links.linkedin})
- [GitHub](${site.links.github})
- Email: ${site.email}

## Full text

- [llms-full.txt](${SITE_URL}/llms-full.txt): every case study in full (problem, research, solution, results), plus references.
`
fs.writeFileSync(path.join(dist, 'llms.txt'), llms)

const projectFull = p => {
  const url = `${SITE_URL}${projectPath(p.id)}`
  const parts = [
    `### ${p.title}`,
    `URL: ${url}`,
    `Tags: ${p.tags.join(', ')}`,
    `Summary: ${p.oneLiner.replace(/\s+/g, ' ').trim()}`,
  ]
  if (p.metrics?.length) parts.push(`Key numbers: ${p.metrics.map(m => `${m.v} ${m.l}`).join('; ')}`)
  if (p.hook) parts.push(`\n${p.hook}`)
  for (const [label, key] of [['The problem', 'problem'], ['The research', 'research'], ['The solution', 'solution'], ['The results', 'results']]) {
    if (p[key]) parts.push(`\n**${label}.** ${p[key]}`)
  }
  const links = []
  if (p.caseStudyUrl) links.push(`[${p.caseStudyLabel || 'Case study'}](${p.caseStudyUrl})`)
  if (p.secondaryUrl) links.push(`[${p.secondaryLabel || 'More'}](${p.secondaryUrl})`)
  if (links.length) parts.push(`\nLinks: ${links.join(' · ')}`)
  return parts.join('\n')
}

const llmsFull = `# ${site.name}

> ${site.description}

## About

${[...heroText, ...aboutText].join('\n\n')}

## Experience

${timeline.map(t => `### ${t.role}${t.note ? ` (${t.note})` : ''}, ${t.company}\n${t.period}\n\n${t.desc}`).join('\n\n')}

## AI infrastructure projects

${aiProjects.map(projectFull).join('\n\n')}

## Marketing and GTM case studies

${projects.map(projectFull).join('\n\n')}

## Education

${education.map(e => `- ${e.degree}, ${e.school}, ${e.location} (${e.period})${e.gpa ? `, GPA ${e.gpa}` : ''}${e.courses ? `. Courses: ${e.courses}` : ''}`).join('\n')}

## References

${references.map(r => `### ${r.name}, ${r.title}\n${r.relationship} (${r.date})\n\n> ${r.quote}`).join('\n\n')}

## Content portfolio

${contentItems.map(c => `- [${c.title}](${c.href}): ${c.desc}`).join('\n')}

## Contact

- Email: ${site.email}
- LinkedIn: ${site.links.linkedin}
- GitHub: ${site.links.github}
- Book a call: ${site.links.calendly}
- Location: ${site.location.city}, ${site.location.region}
`
fs.writeFileSync(path.join(dist, 'llms-full.txt'), llmsFull)

console.log(`wrote sitemap.xml (${pages.length} URLs), llms.txt, llms-full.txt`)
