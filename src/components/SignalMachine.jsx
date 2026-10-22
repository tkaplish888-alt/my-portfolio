import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown, FileAudio, Globe, MessagesSquare, Database } from "lucide-react";
import { Metric } from "./ui.jsx";

/* The hero's interactive moment: pick a messy input, watch which system
   handles it, and see what comes out. All figures come from the case studies. */
const RUNS = [
  {
    input: "Sales call transcripts", icon: FileAudio, system: "Voice-of-customer pipeline", id: "voc",
    out: "Every objection, tagged and scored, plus a fresh positioning brief in a shared sheet.",
    metrics: [["7", "objections in one call"], ["4", "new to the library"], ["~90s", "per transcript"]],
  },
  {
    input: "Competitor websites", icon: Globe, system: "Competitive intel monitor", id: "comp-intel",
    out: "A weekly read of five competitors. Slack only hears about changes that matter.",
    metrics: [["5", "competitors watched"], ["Weekly", "runs on its own"], ["<60s", "per analysis"]],
  },
  {
    input: "AI answer engines", icon: MessagesSquare, system: "AEO visibility dashboard", id: "aeo-dashboard",
    out: "How often ChatGPT and friends name Flatiron, and whether they actually recommend it.",
    metrics: [["61%", "mention rate"], ["35%", "share of voice"], ["~2x", "nearest competitor"]],
  },
  {
    input: "CRM notes and deals", icon: Database, system: "Agentic CRM layer", id: "agentic-crm",
    out: "The deals that went quiet, who owns them, and a drafted next step for a person to approve.",
    metrics: [["112", "stale deals found"], ["$3.68M", "in quiet pipeline"], ["2", "tool calls, vs 7"]],
  },
];

export default function SignalMachine({ onOpen }) {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const pick = i => {
    if (i === active) return;
    setActive(i);
    setRunning(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setRunning(false), 700);
  };

  const run = RUNS[active];

  return (
    <div className="rounded-[10px] border-[1.5px] border-edge bg-card shadow-hard-lg overflow-hidden">
      {/* window bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b-[1.5px] border-edge bg-marigold">
        <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-edge bg-card" />
        <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-edge bg-card" />
        <span className="ml-1 text-[13px] font-semibold text-on-accent">Feed it something messy. See what comes out.</span>
      </div>

      <div className="grid md:grid-cols-[1fr_auto_1.25fr]">
        {/* inputs */}
        <div className="p-4 flex flex-col gap-2" role="tablist" aria-label="Inputs">
          {RUNS.map((r, i) => {
            const on = i === active;
            return (
              <button key={r.id} role="tab" aria-selected={on} onClick={() => pick(i)}
                className={`flex items-center gap-2.5 text-left text-[14px] font-medium px-3 py-2.5 rounded-md border-[1.5px] transition-colors cursor-pointer
                  ${on ? "border-edge bg-ink text-paper" : "border-rule bg-paper text-ink hover:border-edge"}`}>
                <r.icon size={16} className="shrink-0" aria-hidden />
                {r.input}
              </button>
            );
          })}
        </div>

        {/* conveyor */}
        <div className="flex md:flex-col items-center justify-center gap-2 px-4 pb-2 md:p-0 text-muted">
          <ArrowRight size={18} className="hidden md:block" aria-hidden />
          <ArrowDown size={18} className="md:hidden" aria-hidden />
        </div>

        {/* output */}
        <div className="p-4 md:pl-2" role="tabpanel" aria-live="polite">
          <div className={`relative overflow-hidden rounded-md border-[1.5px] border-dashed border-rule bg-paper p-4 h-full ${running ? "scanning" : ""}`}>
            <div className="text-[12.5px] text-muted">Handled by</div>
            <div className="display text-xl font-bold mt-0.5">{run.system}</div>
            <div key={`${run.id}-${running}`} className={running ? "opacity-0" : "rise"}>
                <p className="text-[14px] leading-relaxed text-ink-2 mt-3">{run.out}</p>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {run.metrics.map(([v, l]) => <Metric key={l} v={v} l={l} />)}
                </div>
                <button onClick={() => onOpen(run.id)} className="mt-4 text-[13.5px] font-semibold text-cobalt underline underline-offset-4 decoration-2 hover:decoration-marigold cursor-pointer">
                  See how it works
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
