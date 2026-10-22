import { useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { Tag, Metric } from "./ui.jsx";

/* Marketing and GTM case studies as a compact, expandable list. */
const Row = ({ p, onOpen }) => {
  const [open, setOpen] = useState(false);
  const lead = p.metrics?.[0];
  return (
    <li className="border-b-[1.5px] border-edge last:border-0">
      <button onClick={() => setOpen(o => !o)} aria-expanded={open}
        className={`w-full text-left grid grid-cols-[1fr_auto] md:grid-cols-[1fr_140px_auto] items-center gap-4 px-5 py-4 cursor-pointer transition-colors ${open ? "bg-marigold-soft" : "hover:bg-sunk"}`}>
        <span>
          <span className="block display text-[1.15rem] font-bold leading-snug">{p.title}</span>
          <span className="block text-[14px] text-ink-2 mt-1 leading-relaxed">{p.oneLiner}</span>
        </span>
        {lead && (
          <span className="hidden md:block text-right">
            <span className="block display text-xl font-extrabold">{lead.v}</span>
            <span className="block text-[12px] text-muted leading-tight">{lead.l}</span>
          </span>
        )}
        <ChevronDown size={18} aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="rise px-5 pb-5 pt-1 bg-marigold-soft">
          <div className="flex flex-wrap gap-1.5 mb-4">{p.tags.map(t => <Tag key={t} label={t} />)}</div>
          {p.metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
              {p.metrics.map(m => <Metric key={m.l} v={m.v} l={m.l} />)}
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onOpen(p.id)} className="btn bg-card text-ink">Read the full story</button>
            {p.caseStudyUrl && (
              <a href={p.caseStudyUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[14px] font-semibold text-cobalt underline underline-offset-4 decoration-2 self-center">
                {p.caseStudyLabel || "View work"} <ArrowUpRight size={14} aria-hidden />
              </a>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default function CaseStudies({ items, onOpen }) {
  return (
    <ul className="rounded-lg border-[1.5px] border-edge bg-card shadow-hard overflow-hidden">
      {items.map(p => <Row key={p.id} p={p} onOpen={onOpen} />)}
    </ul>
  );
}
