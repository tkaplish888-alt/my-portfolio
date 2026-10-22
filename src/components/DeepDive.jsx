import { useState } from "react";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { Tag, Metric, RichText } from "./ui.jsx";

const PARTS = [
  ["problem", "The problem"],
  ["research", "What I learned"],
  ["solution", "What I built"],
  ["results", "What happened"],
];

/* Full case study. All four parts stay in the HTML (inactive ones are just
   hidden), so prerendered pages still give crawlers the whole story. */
export default function DeepDive({ project: p, onBack }) {
  const parts = PARTS.filter(([k]) => p[k]);
  const [tab, setTab] = useState(0);

  return (
    <main id="main" className="pt-24 pb-20 px-5 md:px-8">
      <div className="max-w-[860px] mx-auto">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-2 hover:text-ink cursor-pointer">
          <ArrowLeft size={15} aria-hidden /> Back to portfolio
        </button>

        <h1 className="display text-[2.2rem] md:text-[3.2rem] font-extrabold mt-6">{p.title}</h1>
        <div className="flex flex-wrap gap-1.5 mt-4">{p.tags.map(t => <Tag key={t} label={t} />)}</div>

        {(p.caseStudyUrl || p.secondaryUrl) && (
          <div className="flex flex-wrap gap-3 mt-6">
            {p.caseStudyUrl && (
              <a href={p.caseStudyUrl} target="_blank" rel="noopener noreferrer" className="btn bg-marigold text-on-accent">
                {p.caseStudyLabel || "View case study"} <ArrowUpRight size={15} aria-hidden />
              </a>
            )}
            {p.secondaryUrl && (
              <a href={p.secondaryUrl} target="_blank" rel="noopener noreferrer" className="btn bg-card text-ink">
                {p.secondaryLabel || "View more"} <ArrowUpRight size={15} aria-hidden />
              </a>
            )}
          </div>
        )}

        {p.metrics && (
          <div className="mt-8 rounded-lg border-[1.5px] border-edge bg-card shadow-hard p-5 grid grid-cols-2 md:grid-cols-4 gap-5">
            {p.metrics.map(m => <Metric key={m.l} v={m.v} l={m.l} size="lg" />)}
          </div>
        )}

        {p.hook && <p className="display text-[1.35rem] md:text-[1.6rem] font-semibold leading-snug mt-10 max-w-[40ch]">{p.hook}</p>}

        {p.deepDiveImages && (
          <div className="mt-10">
            {p.deepDiveDescription && <p className="text-[14px] text-muted mb-3">{p.deepDiveDescription}</p>}
            <div className={`grid gap-5 ${p.deepDiveImages.length > 1 ? "md:grid-cols-2" : ""}`}>
              {p.deepDiveImages.map(img => (
                <a key={img.src} href={img.url || img.src} target="_blank" rel="noopener noreferrer"
                  className="block rounded-lg border-[1.5px] border-edge bg-card shadow-hard overflow-hidden hover:shadow-hard-lg transition-shadow">
                  <img src={img.src} alt={img.alt} className="w-full object-contain bg-paper" />
                  {(img.caption || img.label) && (
                    <span className="flex items-center justify-between gap-3 px-4 py-3 border-t-[1.5px] border-edge text-[13.5px]">
                      <span className="text-ink-2">{img.caption}</span>
                      {img.label && <span className="inline-flex items-center gap-1 font-semibold text-cobalt shrink-0">{img.label} <ArrowUpRight size={13} aria-hidden /></span>}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {parts.length > 0 && (
          <div className="mt-12">
            <div role="tablist" aria-label="Case study sections" className="flex gap-2 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 pb-1">
              {parts.map(([k, label], i) => (
                <button key={k} role="tab" id={`tab-${k}`} aria-controls={`panel-${k}`} aria-selected={i === tab} onClick={() => setTab(i)}
                  className={`shrink-0 text-[14px] font-semibold px-4 py-2 rounded-t-md border-[1.5px] border-b-0 cursor-pointer
                    ${i === tab ? "bg-card border-edge" : "bg-transparent border-transparent text-ink-2 hover:text-ink"}`}>
                  {label}
                </button>
              ))}
            </div>
            <div className="rounded-b-lg rounded-tr-lg border-[1.5px] border-edge bg-card shadow-hard p-6 md:p-8 -mt-[1.5px]">
              {parts.map(([k], i) => (
                <div key={k} id={`panel-${k}`} role="tabpanel" aria-labelledby={`tab-${k}`} hidden={i !== tab}>
                  <p className="text-[16px] leading-[1.75] text-ink-2 max-w-[68ch]"><RichText text={p[k]} /></p>
                  {i < parts.length - 1 && (
                    <button onClick={() => setTab(i + 1)} className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-cobalt cursor-pointer">
                      Next: {parts[i + 1][1]} <ArrowRight size={15} aria-hidden />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={onBack} className="mt-12 inline-flex items-center gap-2 text-[14px] font-medium text-ink-2 hover:text-ink cursor-pointer">
          <ArrowLeft size={15} aria-hidden /> Back to portfolio
        </button>
      </div>
    </main>
  );
}
