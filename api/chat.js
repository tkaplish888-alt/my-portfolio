/* global process */
/*
  POST /api/chat  ->  streams Pip's answer as plain text.

  Runs as a Vercel serverless function (a small piece of backend code that
  runs on demand). The Anthropic API key lives in Vercel's environment
  variables as ANTHROPIC_API_KEY and never reaches the browser.

  Pip's knowledge is rebuilt from src/data.js on every deploy, so the bot
  always matches the site. Archived projects are never included.
*/
import Anthropic from "@anthropic-ai/sdk";
import { site, projects, aiProjects, timeline, education, certifications, references, contentItems, changelog } from "../src/data.js";
import { persona, availability, personalNotes, projectNotes } from "../src/bot/persona.js";

const MODEL = "claude-haiku-5-5";
const MAX_TURNS = 12;          // most recent messages sent to the model
const MAX_CHARS = 800;         // per visitor message
const RATE = { max: 20, windowMs: 10 * 60 * 1000 }; // per visitor IP, best effort

/* ── knowledge ───────────────────────────────────────────────── */
const clean = t => String(t || "").replace(/\*\*/g, "").replace(/\s+/g, " ").trim();

const projectBlock = p => [
  `### ${p.title} (id: ${p.id})`,
  `Tags: ${p.tags.join(", ")}`,
  `Summary: ${clean(p.oneLiner)}`,
  p.metrics && `Metrics: ${p.metrics.map(m => `${m.v} ${m.l}`).join("; ")}`,
  p.hook && `Hook: ${clean(p.hook)}`,
  p.problem && `Problem: ${clean(p.problem)}`,
  p.research && `Research: ${clean(p.research)}`,
  p.solution && `Solution: ${clean(p.solution)}`,
  p.results && `Results: ${clean(p.results)}`,
  p.caseStudyUrl && `Link: ${p.caseStudyUrl}`,
  projectNotes[p.id] && `Note: ${projectNotes[p.id]}`,
].filter(Boolean).join("\n");

const knowledge = `SITE CONTENT (the only source of facts)

## About
${site.name}, based in ${site.location.city}, ${site.location.region}. ${site.description}
Email: ${site.email}. LinkedIn: ${site.links.linkedin}. GitHub: ${site.links.github}. Coffee chat: ${site.links.calendly}.
${availability ? `Availability: ${availability}` : ""}
${personalNotes.length ? `Personal notes she's happy to share: ${personalNotes.join(" ")}` : ""}

## Experience
${timeline.map(t => `### ${t.role}${t.note ? ` (${t.note})` : ""}, ${t.company} (${t.period})\n${clean(t.desc)}`).join("\n\n")}

## AI builds
${aiProjects.map(projectBlock).join("\n\n")}

## Marketing case studies
${projects.map(projectBlock).join("\n\n")}

## Education
${education.map(e => `- ${e.degree}, ${e.school} (${e.period})`).join("\n")}
${certifications.map(c => `- ${c.title}, ${c.issuer} (${c.date})`).join("\n")}

## What colleagues say
${references.map(r => `- ${r.name} (${r.relationship}): ${clean(r.quote)}`).join("\n")}

## Writing and media
${contentItems.map(c => `- ${c.title}: ${c.desc}`).join("\n")}

## Site milestones
${changelog.map(c => `- ${c.date}: ${c.title}. ${c.note}`).join("\n")}`;

const SECTION_NAMES = { systems: "AI builds", work: "Experience", "case-studies": "Marketing case studies", references: "References", content: "Writing and media", contact: "Contact", changelog: "Changelog" };
const VISITORS = { hiring: "someone hiring", founder: "a founder", builder: "an engineer or builder" };
const allIds = new Set([...projects, ...aiProjects].map(p => p.id));

/* ── rate limit (per warm instance; Anthropic + Vercel spend caps are the real backstop) ── */
const hits = new Map();
const limited = ip => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < RATE.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE.max;
};

const text = (body, status = 200) => new Response(body, { status, headers: { "content-type": "text/plain; charset=utf-8" } });

export async function POST(request) {
  if (!process.env.ANTHROPIC_API_KEY) return text("Pip is napping right now. Email works: " + site.email, 503);

  const ip = (request.headers.get("x-forwarded-for") || "anon").split(",")[0].trim();
  if (limited(ip)) return text("Pip needs a short break. Try again in a few minutes, or email Tonishqa directly: " + site.email, 429);

  let body;
  try { body = await request.json(); } catch { return text("Bad request", 400); }

  const messages = (Array.isArray(body?.messages) ? body.messages : [])
    .filter(m => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_TURNS)
    .map(m => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages.at(-1).role !== "user") return text("Bad request", 400);

  // Where the visitor is, so Pip can answer "this" questions.
  const ctx = body.context || {};
  const where = [
    ctx.projectId && allIds.has(ctx.projectId) && `The visitor is reading the case study with id "${ctx.projectId}".`,
    !ctx.projectId && SECTION_NAMES[ctx.section] && `The visitor is looking at the "${SECTION_NAMES[ctx.section]}" section.`,
    VISITORS[ctx.visitor] && `They said they are ${VISITORS[ctx.visitor]}.`,
  ].filter(Boolean).join(" ");

  const client = new Anthropic();
  let stream;
  try {
    stream = client.messages.stream({
      model: MODEL,
      max_tokens: 500,
      thinking: { type: "disabled" },
      output_config: { effort: "low" },
      system: [
        { type: "text", text: persona },
        // Cached: the big, unchanging part of the prompt is billed at a fraction on repeat visits.
        { type: "text", text: knowledge, cache_control: { type: "ephemeral" } },
        ...(where ? [{ type: "text", text: `CONTEXT: ${where}` }] : []),
      ],
      messages,
    });
  } catch {
    return text("Pip couldn't answer just now. Email works: " + site.email, 502);
  }

  const encoder = new TextEncoder();
  const out = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch {
        controller.enqueue(encoder.encode("\n\nPip lost its train of thought. Try asking again."));
      }
      controller.close();
    },
    cancel() { stream.abort?.(); },
  });

  return new Response(out, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } });
}
