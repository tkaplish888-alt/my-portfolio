import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUp, Minus, Sparkles, ArrowUpRight } from "lucide-react";
import Pip from "./Pip.jsx";
import { site, projects, aiProjects } from "../data.js";
import { SECTION_PROMPTS, VISITOR_PROMPTS, PROJECT_PROMPTS } from "../bot/prompts.js";

const RESUME_URL = "https://drive.google.com/file/d/1WGH6Mm0dUJT7LssIlzCY2OgLCZWIByyU/view?usp=sharing";
const TITLES = Object.fromEntries([...projects, ...aiProjects].map(p => [p.id, p.title]));
const SECTIONS = ["about", "systems", "work", "case-studies", "references", "content", "education", "contact", "changelog"];
const SECTION_LABELS = { systems: "AI builds", work: "Experience", "case-studies": "Case studies", references: "References", content: "Writing", contact: "Contact", changelog: "Changelog" };
const LINKS = {
  resume: ["Resume", RESUME_URL], email: ["Email Tonishqa", `mailto:${site.email}`], calendly: ["Book a coffee chat", site.links.calendly],
  github: ["GitHub", site.links.github], linkedin: ["LinkedIn", site.links.linkedin],
};
const TAG = /\[\[(open|go|link):([a-z0-9-]+)\]\]/g;

// Split Pip's raw reply into readable text and action buttons.
const parse = raw => {
  const actions = [...raw.matchAll(TAG)].map(m => ({ kind: m[1], id: m[2] }))
    .filter(a => (a.kind === "open" && TITLES[a.id]) || (a.kind === "go" && SECTION_LABELS[a.id]) || (a.kind === "link" && LINKS[a.id]));
  const text = raw.replace(TAG, "").replace(/\[\[[^\]]*$/, "").trim();
  return { text, actions };
};

// Tiny renderer: paragraphs, "- " bullets and **bold**.
const Bold = ({ t }) => t.split(/\*\*(.*?)\*\*/g).map((p, i) => i % 2 ? <strong key={i} className="font-semibold">{p}</strong> : p);
const Rich = ({ text }) => {
  const blocks = text.split(/\n{2,}/);
  return blocks.map((b, i) => {
    const lines = b.split("\n");
    if (lines.every(l => /^\s*[-•]\s+/.test(l))) {
      return <ul key={i} className="list-disc pl-5 space-y-1 my-1.5">{lines.map((l, k) => <li key={k}><Bold t={l.replace(/^\s*[-•]\s+/, "")} /></li>)}</ul>;
    }
    return <p key={i} className="my-1.5 first:mt-0 last:mb-0">{lines.map((l, k) => <span key={k}>{k > 0 && <br />}<Bold t={l} /></span>)}</p>;
  });
};

export default function AskPip({ projectId, visitor, onOpenProject, onGo }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mood, setMood] = useState("idle");
  const [pillHover, setPillHover] = useState(false);
  const [section, setSection] = useState("top");
  const [selection, setSelection] = useState(null); // { text, x, y }
  const scroller = useRef(null);
  const inputRef = useRef(null);
  const happyTimer = useRef(null);

  /* Which section is on screen (drives the suggested questions). */
  useEffect(() => {
    if (projectId) return;
    const els = SECTIONS.map(id => document.getElementById(id)).filter(Boolean);
    const seen = new Map();
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => seen.set(e.target.id, e.intersectionRatio));
      const best = [...seen.entries()].sort((a, b) => b[1] - a[1])[0];
      setSection(best && best[1] > 0.15 ? best[0] : window.scrollY < 300 ? "top" : section => section);
    }, { threshold: [0, 0.15, 0.3, 0.5, 0.75] });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [projectId, visitor]);

  /* Highlight any text on the page and an "Ask Pip" button appears. */
  useEffect(() => {
    const onUp = () => setTimeout(() => {
      const sel = window.getSelection();
      const text = sel?.toString().trim().replace(/\s+/g, " ");
      const node = sel?.anchorNode?.parentElement;
      if (!text || text.length < 3 || text.length > 400 || !node?.closest("main") || node.closest("[data-pip]")) return setSelection(null);
      const r = sel.getRangeAt(0).getBoundingClientRect();
      setSelection({ text, x: Math.min(Math.max(r.left + r.width / 2, 80), window.innerWidth - 80), y: Math.max(r.top - 44, 64) });
    }, 0);
    const clear = () => setSelection(null);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("keyup", onUp);
    window.addEventListener("scroll", clear, { passive: true });
    return () => { document.removeEventListener("mouseup", onUp); document.removeEventListener("keyup", onUp); window.removeEventListener("scroll", clear); };
  }, []);

  /* Cmd/Ctrl+K toggles Pip; Escape tucks it away. */
  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(o => !o); }
      else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight }); }, [messages]);
  useEffect(() => () => clearTimeout(happyTimer.current), []);

  const send = useCallback(async content => {
    const q = content.trim();
    if (!q || busy) return;
    const history = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    setMood("thinking");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history, context: { section, projectId, visitor } }),
      });
      if (!res.body) throw new Error("no body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMood("talking");
        setMessages(m => [...m.slice(0, -1), { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) throw new Error("empty");
      setMood("happy");
      happyTimer.current = setTimeout(() => setMood("idle"), 1400);
    } catch {
      setMessages(m => [...m.slice(0, -1), { role: "assistant", content: `Pip can't connect right now. You can email Tonishqa at ${site.email}. [[link:email]]` }]);
      setMood("idle");
    } finally {
      setBusy(false);
    }
  }, [busy, messages, section, projectId, visitor]);

  const askAbout = text => {
    setSelection(null);
    window.getSelection()?.removeAllRanges();
    setOpen(true);
    send(`Can you explain this part of the site? "${text}"`);
  };

  const asked = new Set(messages.filter(m => m.role === "user").map(m => m.content));
  const prompts = (projectId
    ? PROJECT_PROMPTS
    : [...new Set([visitor && VISITOR_PROMPTS[visitor], ...(SECTION_PROMPTS[section] || SECTION_PROMPTS.top)].filter(Boolean))]
  ).filter(p => !asked.has(p)).slice(0, 3);
  const pillPrompt = projectId ? `Ask about ${TITLES[projectId] || "this project"}` : prompts[0];

  const act = a => {
    if (a.kind === "open") { onOpenProject(a.id); if (window.innerWidth < 768) setOpen(false); }
    if (a.kind === "go") { onGo(a.id); if (window.innerWidth < 768) setOpen(false); }
  };

  const typingMood = !busy && input.trim() ? "listening" : null;

  return (
    <div data-pip>
      {/* Ask-about-selection button */}
      {selection && !busy && (
        <button onMouseDown={e => e.preventDefault()} onClick={() => askAbout(selection.text)}
          style={{ left: selection.x, top: selection.y }}
          className="fixed z-[65] -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-edge bg-card pl-1 pr-3 py-1 text-[13px] font-semibold shadow-hard cursor-pointer rise">
          <Pip mood="listening" size={26} /> Ask Pip about this
        </button>
      )}

      {/* Docked pill */}
      {!open && (
        <button onClick={() => setOpen(true)} onMouseEnter={() => setPillHover(true)} onMouseLeave={() => setPillHover(false)}
          aria-label="Ask Pip, the site's AI assistant"
          className="fixed z-50 bottom-4 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 inline-flex items-center gap-2 rounded-full border-[1.5px] border-edge bg-card pl-1.5 pr-4 py-1 shadow-hard-lg hover:bg-marigold-soft cursor-pointer max-w-[min(520px,calc(100vw-2rem))]">
          <Pip mood={pillHover ? "listening" : "idle"} size={38} />
          <span className="md:hidden text-[14px] font-semibold">Ask Pip</span>
          <span key={pillPrompt} className="hidden md:inline text-[14px] font-medium truncate rise">
            <span className="font-semibold">Ask Pip:</span> {pillPrompt}
          </span>
          <kbd className="hidden md:inline ml-1 text-[11px] font-semibold text-muted border border-rule rounded px-1.5 py-0.5">⌘K</kbd>
        </button>
      )}

      {/* Panel */}
      {open && (
        <section role="dialog" aria-label="Chat with Pip"
          className="rise fixed z-50 inset-x-2 bottom-2 md:inset-x-auto md:right-5 md:bottom-5 md:w-[400px] h-[min(620px,calc(100dvh-5rem))] flex flex-col rounded-[12px] border-[1.5px] border-edge bg-card shadow-hard-lg overflow-hidden">
          <header className="flex items-center gap-3 pl-3 pr-2 py-2 border-b-[1.5px] border-edge bg-marigold text-on-accent">
            <Pip mood={typingMood || mood} size={52} title={`Pip is ${typingMood || mood}`} className="border-[1.5px] border-edge" />
            <div className="flex-1 leading-tight">
              <div className="display text-lg font-bold">Pip</div>
              <div className="text-[12.5px]">{busy ? (mood === "thinking" ? "Thinking…" : "Answering…") : "Knows everything on this site. Nothing else."}</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Minimize Pip" className="p-1.5 rounded-md hover:bg-black/10 cursor-pointer"><Minus size={18} /></button>
          </header>

          <div ref={scroller} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-[14.5px] leading-relaxed" aria-live="polite">
            {messages.length === 0 && (
              <div className="rise">
                <p className="text-ink-2">Hi, I'm Pip. I've read every page here so you don't have to. What do you want to know about Tonishqa's work?</p>
              </div>
            )}
            {messages.map((m, i) => {
              if (m.role === "user") return (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] rounded-[10px] rounded-br-sm bg-ink text-paper px-3.5 py-2">{m.content}</div>
                </div>
              );
              const { text, actions } = parse(m.content);
              const last = i === messages.length - 1;
              return (
                <div key={i} className="max-w-[92%]">
                  {text ? <div className="text-ink"><Rich text={text} /></div> : last && busy && (
                    <span className="inline-flex gap-1 py-2" aria-label="Pip is thinking">
                      {[0, 1, 2].map(k => <span key={k} className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: `${k * 120}ms` }} />)}
                    </span>
                  )}
                  {actions.length > 0 && !(last && busy) && (
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      {actions.map(a => a.kind === "link" ? (
                        <a key={a.kind + a.id} href={LINKS[a.id][1]} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[13px] font-semibold px-2.5 py-1 rounded-md border-[1.5px] border-edge bg-paper hover:bg-marigold-soft">
                          {LINKS[a.id][0]} <ArrowUpRight size={13} aria-hidden />
                        </a>
                      ) : (
                        <button key={a.kind + a.id} onClick={() => act(a)}
                          className="text-[13px] font-semibold px-2.5 py-1 rounded-md border-[1.5px] border-edge bg-paper hover:bg-marigold-soft cursor-pointer text-left">
                          {a.kind === "open" ? `Open: ${TITLES[a.id]}` : `Go to ${SECTION_LABELS[a.id]}`}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!busy && (messages.length === 0 || messages.at(-1)?.role === "assistant") && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {prompts.map(p => (
                <button key={p} onClick={() => send(p)}
                  className="inline-flex items-center gap-1 text-[12.5px] font-medium px-2.5 py-1 rounded-full border-[1.5px] border-rule bg-paper hover:border-edge cursor-pointer text-left">
                  <Sparkles size={12} className="text-muted shrink-0" aria-hidden /> {p}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={e => { e.preventDefault(); send(input); }} className="border-t-[1.5px] border-edge p-2.5">
            <div className="flex items-end gap-2 rounded-[10px] border-[1.5px] border-rule focus-within:border-edge bg-paper pl-3 pr-1.5 py-1.5">
              <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} rows={1} maxLength={800}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Ask about her work…" aria-label="Your question for Pip"
                className="flex-1 resize-none bg-transparent outline-none text-[14.5px] py-1 max-h-28 placeholder:text-muted" />
              <button type="submit" disabled={!input.trim() || busy} aria-label="Send"
                className="grid place-items-center w-8 h-8 rounded-md border-[1.5px] border-edge bg-marigold text-on-accent disabled:opacity-40 cursor-pointer disabled:cursor-default">
                <ArrowUp size={16} />
              </button>
            </div>
            <p className="text-[11.5px] text-muted mt-1.5 px-1">Pip runs on Claude Haiku and can get things wrong. For anything important, email Tonishqa.</p>
          </form>
        </section>
      )}
    </div>
  );
}
