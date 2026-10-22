import { useState } from "react";
import { Plus, Github } from "lucide-react";
import { Tag, Metric } from "./ui.jsx";
import { plain } from "./text.js";

const FILTERS = [
  ["All", () => true],
  ["Automation", p => p.tags.includes("Automation")],
  ["Competitive intel", p => p.tags.includes("Competitive Intelligence")],
  ["Analytics", p => p.tags.some(t => ["Analytics", "Predictive Analytics"].includes(t))],
  ["Conversational AI", p => p.tags.some(t => ["Chatbot", "GPT", "MCP"].includes(t))],
];

const SystemCard = ({ p, onOpen }) => {
  const [open, setOpen] = useState(false);
  const github = p.caseStudyUrl?.includes("github.com") ? p.caseStudyUrl : null;
  const panelId = `sys-${p.id}`;
  return (
    <article className={`rounded-lg border-[1.5px] border-ink bg-card transition-shadow ${open ? "shadow-hard-lg" : "shadow-hard"}`}>
      <button onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls={panelId}
        className="w-full text-left p-5 cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <h3 className="display text-[1.3rem] font-bold leading-tight">{p.title}</h3>
          <span className={`shrink-0 mt-0.5 grid place-items-center w-7 h-7 rounded-full border-[1.5px] border-ink transition-transform ${open ? "rotate-45 bg-marigold" : "bg-paper"}`}>
            <Plus size={15} aria-hidden />
          </span>
        </div>
        <p className="text-[14.5px] leading-relaxed text-ink-2 mt-2">{p.teaser || plain(p.oneLiner)}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">{p.tags.slice(0, 3).map(t => <Tag key={t} label={t} />)}</div>
      </button>
      {open && (
        <div id={panelId} className="rise px-5 pb-5">
          <div className="border-t-[1.5px] border-dashed border-rule pt-4 grid grid-cols-2 gap-4">
            {p.metrics.slice(0, 4).map(m => <Metric key={m.l} v={m.v} l={m.l} />)}
          </div>
          <div className="flex flex-wrap gap-3 mt-5">
            <button onClick={() => onOpen(p.id)} className="btn bg-marigold text-[#1f2421]">Read the case study</button>
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="btn bg-card text-ink">
                <Github size={15} aria-hidden /> Code
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default function SystemsGrid({ items, onOpen }) {
  const [filter, setFilter] = useState(0);
  const shown = items.filter(FILTERS[filter][1]);
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter systems">
        {FILTERS.map(([label, fn], i) => {
          const count = items.filter(fn).length;
          const on = i === filter;
          return (
            <button key={label} onClick={() => setFilter(i)} aria-pressed={on}
              className={`text-[13.5px] font-medium px-3 py-1.5 rounded-full border-[1.5px] cursor-pointer transition-colors
                ${on ? "bg-ink text-paper border-ink" : "bg-card border-rule hover:border-ink"}`}>
              {label} <span className={on ? "opacity-70" : "text-muted"}>{count}</span>
            </button>
          );
        })}
      </div>
      <div className="grid md:grid-cols-2 gap-5 items-start">
        {shown.map(p => <SystemCard key={p.id} p={p} onOpen={onOpen} />)}
      </div>
    </>
  );
}
