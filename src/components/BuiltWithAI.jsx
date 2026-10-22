import { useEffect, useRef, useState } from "react";
import { X, CheckCircle2, Wand2 } from "lucide-react";
import Pip from "./Pip.jsx";

const STACK = [
  "React 19 + Vite + Tailwind CSS v4",
  "Lucide Icons · Bricolage Grotesque + IBM Plex Sans fonts",
  "Component architecture, prerendered to static HTML",
  "Interactive hero, visitor switch, dark/light themes",
  "Content extracted and restructured via AI prompts",
  "Warm, accessible design system with full dark mode",
];

/* The "Built with zero code" button and its popup. */
export default function BuiltWithAI() {
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);

  useEffect(() => {
    if (!open) return;
    dialog.current?.focus();
    const onKey = e => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full border-[1.5px] border-edge bg-card px-3.5 py-2 text-[13px] font-semibold shadow-hard hover:bg-marigold-soft cursor-pointer">
        <Wand2 size={14} aria-hidden /> Built with zero code
      </button>
      {open && (
        <div className="fixed inset-0 z-[70] grid place-items-center p-4 bg-black/40 backdrop-blur-[2px]" onClick={() => setOpen(false)}>
          <div ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="bwai-title" onClick={e => e.stopPropagation()}
            className="rise relative w-full max-w-lg rounded-[10px] border-[1.5px] border-edge bg-card shadow-hard-lg p-6 md:p-8 outline-none">
            <button onClick={() => setOpen(false)} aria-label="Close" className="absolute top-4 right-4 p-1 rounded-md text-muted hover:text-ink cursor-pointer"><X size={18} /></button>
            <div className="flex items-center gap-3 mb-4">
              <Pip mood="happy" size={44} />
              <h3 id="bwai-title" className="display text-2xl font-bold">This portfolio wrote itself</h3>
            </div>
            <p className="text-[15px] leading-relaxed text-ink-2 mb-4">
              Well, almost. I built this entire site using <strong className="text-ink">Claude Opus 4.6</strong> and <strong className="text-ink">Claude Opus 5.5</strong> via <strong className="text-ink">Claude Code</strong> and <strong className="text-ink">Cursor IDE</strong>. No manual coding, no templates, no drag-and-drop builders.
            </p>
            <p className="text-[15px] leading-relaxed text-ink-2 mb-5">
              Every component, interaction, and design decision was generated through structured prompts. I directed the architecture, the copy, the design system, and the interaction patterns. Claude Code handled the code execution and file operations. It's how I think about tools: learn the logic, direct the output, ship the thing.
            </p>
            <div className="rounded-md border-[1.5px] border-rule bg-paper p-4 mb-4">
              <p className="text-[13px] font-semibold mb-2">The stack:</p>
              <ul className="space-y-1.5 text-[13px] text-ink-2">
                {STACK.map(s => (
                  <li key={s} className="flex items-start gap-2"><CheckCircle2 size={13} className="mt-0.5 shrink-0 text-moss" aria-hidden />{s}</li>
                ))}
              </ul>
            </div>
            <p className="text-[12.5px] text-muted">October 2026 · Claude Opus 5.5 via Claude Code · IDE: Cursor</p>
          </div>
        </div>
      )}
    </>
  );
}
