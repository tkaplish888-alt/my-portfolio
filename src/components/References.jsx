import { useState } from "react";
import { ArrowLeft, ArrowRight, Linkedin } from "lucide-react";

// First two sentences make the pull quote; the rest opens on request.
const split = q => {
  const parts = q.match(/[^.!?]+[.!?]+(\s|$)/g) || [q];
  return [parts.slice(0, 2).join("").trim(), parts.slice(2).join("").trim()];
};

export default function References({ items }) {
  const [i, setI] = useState(0);
  const [full, setFull] = useState(false);
  const r = items[i];
  const [lead, rest] = split(r.quote);
  const go = d => { setI((i + d + items.length) % items.length); setFull(false); };

  return (
    <div className="rounded-lg border-[1.5px] border-ink bg-card shadow-hard-lg p-6 md:p-10">
      <figure key={r.name} className="rise">
        <blockquote className="display text-[1.45rem] md:text-[1.9rem] font-semibold leading-[1.2] max-w-[34ch]">
          “{rest && !full ? `${lead.replace(/[.!?]$/, "")}…` : lead}”
        </blockquote>
        {rest && (
          full
            ? <p className="mt-5 text-[15px] leading-relaxed text-ink-2 max-w-[65ch]">{rest}</p>
            : <button onClick={() => setFull(true)} className="mt-4 text-[14px] font-semibold text-cobalt underline underline-offset-4 decoration-2 cursor-pointer">Read the full note</button>
        )}
        <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-semibold">{r.name}</span>
          <span className="text-[14px] text-muted">{r.relationship}</span>
          {r.linkedin && (
            <a href={r.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${r.name} on LinkedIn`} className="text-cobalt">
              <Linkedin size={15} />
            </a>
          )}
        </figcaption>
      </figure>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-1.5" aria-hidden>
          {items.map((_, k) => <span key={k} className={`h-2 rounded-full border border-ink transition-all ${k === i ? "w-6 bg-marigold" : "w-2 bg-paper"}`} />)}
        </div>
        <div className="flex gap-2">
          <button onClick={() => go(-1)} aria-label="Previous note" className="btn bg-card text-ink !px-2.5"><ArrowLeft size={16} /></button>
          <button onClick={() => go(1)} aria-label="Next note" className="btn bg-marigold text-[#1f2421] !px-2.5"><ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}
