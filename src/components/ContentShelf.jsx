import { useState } from "react";
import { ArrowUpRight, PenTool, Play, Newspaper, Megaphone } from "lucide-react";

const TYPES = { written: ["Writing", PenTool], video: ["Video", Play], newsletter: ["Newsletters", Newspaper], social: ["Social", Megaphone] };

export default function ContentShelf({ items }) {
  const [type, setType] = useState("all");
  const shown = type === "all" ? items : items.filter(c => c.type === type);
  const present = Object.keys(TYPES).filter(t => items.some(c => c.type === t));
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Filter content">
        {["all", ...present].map(t => {
          const on = t === type;
          return (
            <button key={t} onClick={() => setType(t)} aria-pressed={on}
              className={`text-[13.5px] font-medium px-3 py-1.5 rounded-full border-[1.5px] cursor-pointer
                ${on ? "bg-ink text-paper border-edge" : "bg-card border-rule hover:border-edge"}`}>
              {t === "all" ? "Everything" : TYPES[t][0]}
            </button>
          );
        })}
      </div>
      <ul className="grid md:grid-cols-2 gap-x-8">
        {shown.map(c => {
          const Icon = TYPES[c.type]?.[1] || PenTool;
          return (
            <li key={c.href} className="border-t-[1.5px] border-rule">
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="group flex gap-3 py-3.5">
                <Icon size={16} className="mt-1 shrink-0 text-muted" aria-hidden />
                <span className="flex-1">
                  <span className="block font-semibold text-[15px] group-hover:text-cobalt">{c.title}</span>
                  <span className="block text-[13.5px] text-muted mt-0.5">{c.desc}</span>
                </span>
                <ArrowUpRight size={15} className="mt-1 shrink-0 text-muted group-hover:text-cobalt" aria-hidden />
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
