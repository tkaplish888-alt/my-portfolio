import { useState } from "react";

/* Timeline you can click through: companies on a rail, details in a panel. */
export default function Experience({ items }) {
  const [active, setActive] = useState(0);
  const item = items[active];
  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-6 md:gap-10">
      <div role="tablist" aria-label="Roles" aria-orientation="vertical"
        className="relative flex md:flex-col gap-2 md:gap-0 overflow-x-auto md:overflow-visible -mx-5 px-5 md:mx-0 md:px-0 pb-2 md:pb-0">
        <span className="hidden md:block absolute left-[7px] top-4 bottom-4 w-[1.5px] bg-rule" aria-hidden />
        {items.map((t, i) => {
          const on = i === active;
          return (
            <button key={t.company} role="tab" aria-selected={on} onClick={() => setActive(i)}
              className={`relative shrink-0 text-left md:pl-7 md:py-3 px-3 py-2 rounded-md md:rounded-none border-[1.5px] md:border-0 cursor-pointer
                ${on ? "border-ink bg-ink text-paper md:bg-transparent md:text-ink" : "border-rule md:text-ink-2 hover:text-ink"}`}>
              <span className={`hidden md:block absolute left-0 top-[1.15rem] w-[15px] h-[15px] rounded-full border-[1.5px] border-ink
                ${on ? "bg-marigold" : "bg-paper"}`} aria-hidden />
              <span className={`block text-[15px] ${on ? "font-semibold" : "font-medium"}`}>{t.company}</span>
              <span className={`block text-[12.5px] ${on ? "opacity-75 md:opacity-100 md:text-muted" : "text-muted"}`}>{t.period.split(" · ")[0]}</span>
            </button>
          );
        })}
      </div>

      <div key={item.company} role="tabpanel" className="rise rounded-lg border-[1.5px] border-ink bg-card shadow-hard p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-2">
          {item.current && (
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2 py-0.5 rounded-full bg-paper border border-rule">
              <span className="w-2 h-2 rounded-full bg-tomato" aria-hidden /> Most recent
            </span>
          )}
          {item.note && <span className="text-[12px] font-semibold px-2 py-0.5 rounded-full bg-marigold-soft">{item.note}</span>}
        </div>
        <h3 className="display text-2xl md:text-[1.75rem] font-bold mt-3">{item.role}</h3>
        <p className="text-[14px] text-muted mt-1">{item.company}, {item.period}</p>
        <ul className="mt-5 space-y-3">
          {(item.highlights || [item.desc]).map(h => (
            <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
              <span className="mt-[0.6rem] w-1.5 h-1.5 shrink-0 rounded-full bg-ink" aria-hidden />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
