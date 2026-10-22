import { useState } from "react";

/* A startup-style changelog. Newest first; older entries fold away. */
export default function Changelog({ items, visible = 4 }) {
  const [all, setAll] = useState(false);
  const shown = all ? items : items.slice(0, visible);
  return (
    <div className="max-w-[720px]">
      <ol className="relative border-l-[1.5px] border-rule ml-[7px]">
        {shown.map((c, i) => (
          <li key={c.date + c.title} className="relative pl-7 pb-7 last:pb-0">
            <span className={`absolute -left-[8.5px] top-1.5 w-[15px] h-[15px] rounded-full border-[1.5px] border-edge ${i === 0 ? "bg-marigold" : "bg-paper"}`} aria-hidden />
            <div className="text-[13px] text-muted">{c.date}</div>
            <div className="font-semibold text-[16px] mt-0.5">{c.title}</div>
            <p className="text-[14.5px] text-ink-2 mt-0.5 leading-relaxed">{c.note}</p>
          </li>
        ))}
      </ol>
      {items.length > visible && (
        <button onClick={() => setAll(a => !a)} className="mt-6 btn bg-card text-ink">
          {all ? "Show fewer" : `Show ${items.length - visible} older`}
        </button>
      )}
    </div>
  );
}
