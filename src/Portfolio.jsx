import { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  Sparkles, Brain, Target, PenTool, BarChart3, MessageSquare,
  Mail, Linkedin, MapPin, ArrowUpRight, ArrowLeft,
  Layers, Lightbulb, Megaphone, Users, BookOpen,
  CheckCircle2, FileText, ChevronDown, Coffee, Search,
  Puzzle, Award, X, Wand2, Sun, Moon, Play, Newspaper,
  GraduationCap, Menu, Github
} from "lucide-react";
import { projects, aiProjects, timeline, education, certifications, references, contentItems } from "./data.js";
import { projectPath, getProjectIdFromPath } from "./routes.js";


/* ═══════════════════════════════════════════════
   THEME SYSTEM
   ═══════════════════════════════════════════════ */
const lightColors = {
  bg: "#FDFCFA", surface: "#F7F5F2", surface2: "#F0EDE8",
  border: "#E8E4DE", accent: "#C47A4A", accentLight: "#F5EDE6",
  accentGlow: "rgba(196,122,74,0.08)",
  text: "#2C2521", textSec: "#6B6058", muted: "#9C9389",
  navBg: "rgba(253,252,250,0.92)", overlay: "rgba(44,37,33,0.4)",
  metricBg: "#FDF8F4", metricBorder: "#F0DFD0",
  annotationLine: "rgba(196,122,74,0.55)", annotationBg: "rgba(196,122,74,0.10)",
};
const darkColors = {
  bg: "#17140F", surface: "#211D17", surface2: "#2B261F",
  border: "#3A342B", accent: "#D4935F", accentLight: "#2A2015",
  accentGlow: "rgba(212,147,95,0.1)",
  text: "#F0EDE8", textSec: "#B5AFA6", muted: "#7A746C",
  navBg: "rgba(23,20,15,0.92)", overlay: "rgba(0,0,0,0.55)",
  metricBg: "#2A2218", metricBorder: "#3D3225",
  annotationLine: "rgba(212,147,95,0.55)", annotationBg: "rgba(212,147,95,0.10)",
};


const ThemeCtx = createContext();
const useTheme = () => useContext(ThemeCtx);


/* ═══════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════ */
const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="transition-all duration-700 ease-out"
      style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};


const tagPalette = {
  "Go-to-Market": { l: { bg:"#FEF3C7",text:"#92400E",border:"#FDE68A" }, d: { bg:"#3D2E10",text:"#FDE68A",border:"#5C4520" } },
  Marketing: { l: { bg:"#FFF7ED",text:"#9A3412",border:"#FED7AA" }, d: { bg:"#3A2210",text:"#FED7AA",border:"#5C3518" } },
  "Content Strategy": { l: { bg:"#ECFDF5",text:"#065F46",border:"#A7F3D0" }, d: { bg:"#0D2E22",text:"#A7F3D0",border:"#1A4D3A" } },
  "User Research": { l: { bg:"#F0F9FF",text:"#075985",border:"#BAE6FD" }, d: { bg:"#0C2236",text:"#BAE6FD",border:"#143D5E" } },
  AI: { l: { bg:"#F5F3FF",text:"#5B21B6",border:"#DDD6FE" }, d: { bg:"#1E1536",text:"#DDD6FE",border:"#33245E" } },
  "Healthcare AI": { l: { bg:"#FFF1F2",text:"#9F1239",border:"#FECDD3" }, d: { bg:"#36101A",text:"#FECDD3",border:"#5E1A2E" } },
  Analytics: { l: { bg:"#EEF2FF",text:"#3730A3",border:"#C7D2FE" }, d: { bg:"#161936",text:"#C7D2FE",border:"#272D5E" } },
  Chatbot: { l: { bg:"#FDF4FF",text:"#86198F",border:"#F5D0FE" }, d: { bg:"#2E1032",text:"#F5D0FE",border:"#4D1A54" } },
  UX: { l: { bg:"#F0FDFA",text:"#115E59",border:"#99F6E4" }, d: { bg:"#0D2926",text:"#99F6E4",border:"#1A4D47" } },
  Branding: { l: { bg:"#F5EDE6",text:"#92552A",border:"#E0CEBF" }, d: { bg:"#2A2015",text:"#E0CEBF",border:"#3D3020" } },
  Fintech: { l: { bg:"#FEF9C3",text:"#854D0E",border:"#FEF08A" }, d: { bg:"#332E0D",text:"#FEF08A",border:"#4D4515" } },
  Healthtech: { l: { bg:"#FFE4E6",text:"#881337",border:"#FECDD3" }, d: { bg:"#36101A",text:"#FECDD3",border:"#5E1A2E" } },
  Growth: { l: { bg:"#FFF7ED",text:"#C2410C",border:"#FDBA74" }, d: { bg:"#3A2210",text:"#FDBA74",border:"#5C3518" } },
  "Prompt Engineering": { l: { bg:"#F5F3FF",text:"#6D28D9",border:"#DDD6FE" }, d: { bg:"#1E1536",text:"#DDD6FE",border:"#33245E" } },
  "Social Media": { l: { bg:"#FDF2F8",text:"#9D174D",border:"#FBCFE8" }, d: { bg:"#36101F",text:"#FBCFE8",border:"#5E1A38" } },
  SEO: { l: { bg:"#F0FDF4",text:"#166534",border:"#BBF7D0" }, d: { bg:"#0D2E18",text:"#BBF7D0",border:"#1A4D2A" } },
  "Technical SEO": { l: { bg:"#F0FDF4",text:"#166534",border:"#BBF7D0" }, d: { bg:"#0D2E18",text:"#BBF7D0",border:"#1A4D2A" } },
  "Sales Enablement": { l: { bg:"#FEF3C7",text:"#78350F",border:"#FDE68A" }, d: { bg:"#3D2E10",text:"#FDE68A",border:"#5C4520" } },
  Accessibility: { l: { bg:"#DBEAFE",text:"#1E40AF",border:"#93C5FD" }, d: { bg:"#101D36",text:"#93C5FD",border:"#1A335E" } },
  "Data Viz": { l: { bg:"#FEE2E2",text:"#991B1B",border:"#FECACA" }, d: { bg:"#361010",text:"#FECACA",border:"#5E1A1A" } },
  "Product Marketing": { l: { bg:"#FFF7ED",text:"#C2410C",border:"#FDBA74" }, d: { bg:"#3A2210",text:"#FDBA74",border:"#5C3518" } },
  GPT: { l: { bg:"#F5F3FF",text:"#6D28D9",border:"#DDD6FE" }, d: { bg:"#1E1536",text:"#DDD6FE",border:"#33245E" } },
  "Voice of Customer": { l: { bg:"#FEF3C7",text:"#78350F",border:"#FDE68A" }, d: { bg:"#3D2E10",text:"#FDE68A",border:"#5C4520" } },
  Automation: { l: { bg:"#EEF2FF",text:"#3730A3",border:"#C7D2FE" }, d: { bg:"#161936",text:"#C7D2FE",border:"#272D5E" } },
  "Lead Generation": { l: { bg:"#FEF3C7",text:"#92400E",border:"#FDE68A" }, d: { bg:"#3D2E10",text:"#FDE68A",border:"#5C4520" } },
  "Competitive Intelligence": { l: { bg:"#F1F5F9",text:"#334155",border:"#CBD5E1" }, d: { bg:"#1E293B",text:"#CBD5E1",border:"#334155" } },
  "Web Scraping": { l: { bg:"#F0FDFA",text:"#134E4A",border:"#99F6E4" }, d: { bg:"#0D2926",text:"#99F6E4",border:"#1A4D47" } },
  "Lead Nurture": { l: { bg:"#FFFBEB",text:"#92400E",border:"#FDE68A" }, d: { bg:"#3D2E10",text:"#FDE68A",border:"#5C4520" } },
  "Email Marketing": { l: { bg:"#FFF1F2",text:"#BE123C",border:"#FECDD3" }, d: { bg:"#36101A",text:"#FECDD3",border:"#5E1A2E" } },
  "Content Repurposing": { l: { bg:"#EEF2FF",text:"#4338CA",border:"#C7D2FE" }, d: { bg:"#161936",text:"#C7D2FE",border:"#272D5E" } },
  "Sales Intelligence": { l: { bg:"#ECFDF5",text:"#065F46",border:"#A7F3D0" }, d: { bg:"#0D2E22",text:"#A7F3D0",border:"#1A4D3A" } },
  Slack: { l: { bg:"#F0F4F8",text:"#1A1D21",border:"#D1D5DB" }, d: { bg:"#1A1D21",text:"#D1D5DB",border:"#36393F" } },
  Embeddings: { l: { bg:"#F5F3FF",text:"#5B21B6",border:"#DDD6FE" }, d: { bg:"#1E1536",text:"#DDD6FE",border:"#33245E" } },
  NLP: { l: { bg:"#EEF2FF",text:"#3730A3",border:"#C7D2FE" }, d: { bg:"#161936",text:"#C7D2FE",border:"#272D5E" } },
  "GTM Strategy": { l: { bg:"#FEF3C7",text:"#92400E",border:"#FDE68A" }, d: { bg:"#3D2E10",text:"#FDE68A",border:"#5C4520" } },
  "Predictive Analytics": { l: { bg:"#DBEAFE",text:"#1E40AF",border:"#93C5FD" }, d: { bg:"#101D36",text:"#93C5FD",border:"#1A335E" } },
  "Machine Learning": { l: { bg:"#F5F3FF",text:"#6D28D9",border:"#DDD6FE" }, d: { bg:"#1E1536",text:"#DDD6FE",border:"#33245E" } },
  Optimization: { l: { bg:"#FFF7ED",text:"#C2410C",border:"#FDBA74" }, d: { bg:"#3A2210",text:"#FDBA74",border:"#5C3518" } },
  "Lead Scoring": { l: { bg:"#ECFDF5",text:"#065F46",border:"#A7F3D0" }, d: { bg:"#0D2E22",text:"#A7F3D0",border:"#1A4D3A" } },
};


const Tag = ({ label }) => {
  const { dark } = useTheme();
  const entry = tagPalette[label];
  const c = entry ? (dark ? entry.d : entry.l) : (dark ? { bg:"#2B261F",text:"#B5AFA6",border:"#3A342B" } : { bg:"#F7F5F2",text:"#6B6058",border:"#E8E4DE" });
  return <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded border" style={{ backgroundColor:c.bg, color:c.text, borderColor:c.border }}>{label}</span>;
};


const SectionHeader = ({ title, subtitle }) => {
  const { C } = useTheme();
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold" style={{ fontFamily:"'IBM Plex Serif',Georgia,serif", color:C.text }}>{title}</h2>
      {subtitle && <p className="text-sm mt-1.5 leading-relaxed" style={{ color:C.muted }}>{subtitle}</p>}
      <div className="w-12 h-0.5 mt-3 rounded-full" style={{ backgroundColor:C.accent }} />
    </div>
  );
};


const Callout = ({ icon:Icon, title, children }) => {
  const { C } = useTheme();
  return (
    <div className="rounded-lg border px-5 py-4 transition-all duration-300 hover:shadow-md"
      style={{ backgroundColor:C.surface, borderColor:C.border }}>
      <div className="flex gap-3 items-start">
        {Icon && <div className="mt-0.5 shrink-0"><Icon size={18} style={{ color:C.accent }} /></div>}
        <div>
          {title && <span className="font-semibold text-sm block mb-1" style={{ color:C.text }}>{title}</span>}
          <div className="text-sm leading-relaxed" style={{ color:C.textSec }}>{children}</div>
        </div>
      </div>
    </div>
  );
};


const MetricCard = ({ value, label }) => {
  const { C } = useTheme();
  return (
    <div className="rounded-lg border px-4 py-3 text-center" style={{ backgroundColor:C.metricBg, borderColor:C.metricBorder }}>
      <div className="text-xl font-bold" style={{ fontFamily:"'IBM Plex Serif',Georgia,serif", color:C.accent }}>{value}</div>
      <div className="text-[11px] mt-0.5 leading-tight" style={{ color:C.muted }}>{label}</div>
    </div>
  );
};


const typeIcons = { written: PenTool, video: Play, newsletter: Newspaper, social: Megaphone };
const typeLabels = { written: "Written", video: "Video", newsletter: "Newsletter", social: "Social Media" };


/* ═══════════════════════════════════════════════
   PROJECT DEEP DIVE (opens in-page with back-to-position)
   ═══════════════════════════════════════════════ */
const ProjectDeepDive = ({ project, onBack }) => {
  const { C } = useTheme();
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-[800px] mx-auto">
        <Reveal>
          <button onClick={onBack} className="flex items-center gap-2 text-sm mb-8 cursor-pointer transition-colors"
            style={{ color:C.muted }} onMouseEnter={e=>e.currentTarget.style.color=C.accent}
            onMouseLeave={e=>e.currentTarget.style.color=C.muted}>
            <ArrowLeft size={14} /> Back to portfolio
          </button>
        </Reveal>
        <Reveal delay={50}>
          <h1 className="text-3xl font-semibold mb-3" style={{ fontFamily:"'IBM Plex Serif',Georgia,serif", color:C.text }}>{project.title}</h1>
          <div className="flex flex-wrap gap-1.5 mb-6">{project.tags.map(t=><Tag key={t} label={t}/>)}</div>
        </Reveal>
        {project.deepDiveImages && (
          <Reveal delay={60}>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Play size={15} style={{ color:C.accent }} />
                <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color:C.accent }}>See It In Action</h3>
              </div>
              <p className="text-xs mb-4" style={{ color:C.muted }}>{project.deepDiveDescription || "Click either image to open the live file directly — the real input and output from the pipeline."}</p>
              <div className={`grid gap-4 ${project.deepDiveImages.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {project.deepDiveImages.map((img, i) => {
                  const inner = (
                    <>
                      <div className="overflow-hidden" style={{ backgroundColor:C.surface }}>
                        <img src={img.src} alt={img.alt} className="w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
                      </div>
                      {(img.caption || img.label) && (
                        <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor:C.surface }}>
                          {img.caption && <span className="text-xs font-medium" style={{ color:C.textSec }}>{img.caption}</span>}
                          {img.label && <span className="flex items-center gap-1 text-xs font-medium shrink-0 ml-3" style={{ color:C.accent }}>{img.label} <ArrowUpRight size={11}/></span>}
                        </div>
                      )}
                    </>
                  );
                  return img.url ? (
                    <a key={i} href={img.url} target="_blank" rel="noopener noreferrer"
                      className="group block rounded-xl border overflow-hidden transition-all duration-200"
                      style={{ borderColor:C.border }}
                      onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent}
                      onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                      {inner}
                    </a>
                  ) : (
                    <a key={i} href={img.src} target="_blank" rel="noopener noreferrer"
                      className="group block rounded-xl border overflow-hidden transition-all duration-200 cursor-zoom-in"
                      style={{ borderColor:C.border }}
                      onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent}
                      onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                      {inner}
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        )}
        {project.image && (
          <Reveal delay={65}>
            <div className="mb-8 rounded-xl overflow-hidden border" style={{ borderColor:C.border }}>
              <img src={project.image} alt={project.imageAlt || project.title}
                className="w-full h-48 md:h-64 object-cover object-center"
                style={{ backgroundColor:C.surface }}
                onError={e=>{e.target.parentElement.style.display='none'}} />
            </div>
          </Reveal>
        )}
        {(project.caseStudyUrl || project.secondaryUrl) && (
          <Reveal delay={72}>
            <div className="flex flex-wrap gap-3 mb-8">
              {project.caseStudyUrl && (
                <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border transition-all"
                  style={{ borderColor:C.accent, color:C.accent, backgroundColor:"transparent" }}
                  onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.accent;e.currentTarget.style.color=C.bg;}}
                  onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent";e.currentTarget.style.color=C.accent;}}>
                  <ArrowUpRight size={14}/> {project.caseStudyLabel || "View case study"}
                </a>
              )}
              {project.secondaryUrl && (
                <a href={project.secondaryUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border transition-all"
                  style={{ borderColor:C.border, color:C.textSec }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.color=C.accent;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.textSec;}}>
                  <ArrowUpRight size={14}/> {project.secondaryLabel || "View more"}
                </a>
              )}
            </div>
          </Reveal>
        )}
        {project.metrics && (
          <Reveal delay={80}>
            <div className={`grid gap-3 mb-10 ${project.metrics.length <= 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`}>
              {project.metrics.map((m,i)=><MetricCard key={i} value={m.v} label={m.l} />)}
            </div>
          </Reveal>
        )}
        {project.hook && (
          <Reveal delay={90}>
            <div className="mb-10 pl-4 border-l-2" style={{ borderColor:C.accent }}>
              <p className="text-base leading-relaxed" style={{ color:C.text, fontFamily:"'IBM Plex Serif',Georgia,serif", fontStyle:"italic" }}>{project.hook}</p>
            </div>
          </Reveal>
        )}
        {[
          { icon:Puzzle, label:"The Problem", content:project.problem },
          { icon:Search, label:"The Research", content:project.research },
          { icon:Lightbulb, label:"The Solution", content:project.solution },
          { icon:Award, label:"The Results", content:project.results },
        ].filter(s=>s.content).map((s,i)=>{
          const renderText = (text) => {
            const parts = text.split(/\*\*(.*?)\*\*/g);
            return parts.map((part, idx) =>
              idx % 2 === 1
                ? <strong key={idx} style={{ color:C.text, fontWeight:600 }}>{part}</strong>
                : <span key={idx}>{part}</span>
            );
          };
          return (
          <Reveal key={i} delay={120+i*100}>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={15} style={{ color:C.accent }} />
                <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color:C.accent }}>{s.label}</h3>
              </div>
              <div className="rounded-lg border px-5 py-4" style={{ backgroundColor:C.surface, borderColor:C.border }}>
                <p className="text-sm leading-relaxed" style={{ color:C.textSec }}>{renderText(s.content)}</p>
              </div>
            </div>
          </Reveal>
        );})}
        <Reveal delay={550}>
          <button onClick={onBack} className="flex items-center gap-2 text-sm mt-6 cursor-pointer transition-colors"
            style={{ color:C.muted }} onMouseEnter={e=>e.currentTarget.style.color=C.accent}
            onMouseLeave={e=>e.currentTarget.style.color=C.muted}>
            <ArrowLeft size={14} /> Back to portfolio
          </button>
        </Reveal>
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════
   BUILT-WITH-AI POPUP
   ═══════════════════════════════════════════════ */
const BuiltWithAI = () => {
  const { C } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={()=>setOpen(true)} className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium shadow-lg transition-all cursor-pointer hover:scale-105"
        style={{ backgroundColor:C.bg, borderColor:C.border, color:C.textSec }}>
        <Wand2 size={13} style={{ color:C.accent }} /> Built with zero code
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor:C.overlay, backdropFilter:"blur(4px)" }}
          onClick={()=>setOpen(false)}>
          <div className="rounded-2xl border p-6 md:p-8 max-w-lg w-full relative" onClick={e=>e.stopPropagation()}
            style={{ backgroundColor:C.bg, borderColor:C.border, boxShadow:"0 25px 60px rgba(0,0,0,0.2)" }}>
            <button onClick={()=>setOpen(false)} className="absolute top-4 right-4 cursor-pointer" style={{ color:C.muted }}><X size={18}/></button>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} style={{ color:C.accent }} />
              <h3 className="text-lg font-semibold" style={{ fontFamily:"'IBM Plex Serif',Georgia,serif", color:C.text }}>This portfolio wrote itself</h3>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color:C.textSec }}>
              Well, almost. I built this entire site using <strong style={{ color:C.text }}>Claude Opus 4.6</strong> via <strong style={{ color:C.text }}>Claude Code</strong> and <strong style={{ color:C.text }}>Cursor IDE</strong>. No manual coding, no templates, no drag-and-drop builders.
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ color:C.textSec }}>
              Every component, interaction, and design decision was generated through structured prompts. I directed the architecture, the copy, the design system, and the interaction patterns. Claude Code handled the code execution and file operations. It's how I think about tools: learn the logic, direct the output, ship the thing.
            </p>
            <div className="rounded-lg border p-4 mb-4" style={{ backgroundColor:C.surface, borderColor:C.border }}>
              <p className="text-xs font-semibold mb-2" style={{ color:C.text }}>The stack:</p>
              <div className="text-xs space-y-2" style={{ fontFamily:"'IBM Plex Mono',monospace", color:C.textSec }}>
                {["React 18 + Vite + Tailwind CSS v4","Lucide Icons · IBM Plex Serif + Inter fonts","Single-file architecture, zero build complexity","Scroll animations, expandable cards, dark/light themes","Content extracted and restructured via AI prompts","Warm design system with full dark mode"].map((s,i)=>(
                  <div key={i} className="flex items-start gap-2"><CheckCircle2 size={11} style={{ color:C.accent }} className="mt-0.5 shrink-0"/>{s}</div>
                ))}
              </div>
            </div>
            <p className="text-xs" style={{ color:C.muted, fontFamily:"'IBM Plex Mono',monospace" }}>February 2026 · Claude Opus 4.6 via Claude Code · IDE: Cursor</p>
          </div>
        </div>
      )}
    </>
  );
};


/* ═══════════════════════════════════════════════
   ANNOTATION (Notion-style underline + highlight)
   ═══════════════════════════════════════════════ */
const Scribble = ({ children }) => {
  const { C } = useTheme();
  return (
    <span style={{
      borderBottom: `1.5px solid ${C.annotationLine}`,
      backgroundColor: C.annotationBg,
      borderRadius: '2px',
      paddingBottom: '1px',
      paddingLeft: '1px',
      paddingRight: '1px',
    }}>
      {children}
    </span>
  );
};


/* ═══════════════════════════════════════════════
   NAV (with prominent theme toggle and mobile menu)
   ═══════════════════════════════════════════════ */
const Nav = ({ onHome, onSection }) => {
  const { C, dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(()=>{ const h=()=>setScrolled(window.scrollY>40); window.addEventListener("scroll",h); return()=>window.removeEventListener("scroll",h); },[]);
  const scrollTo = id => { if(onSection) { onSection(id); } else { const el=document.getElementById(id); if(el) el.scrollIntoView({ behavior:"smooth" }); } setMobileMenuOpen(false); };
  const links = [["about","About"],["work","Work"],["ai-lab","AI Infrastructure"],["projects","Projects"],["content","Content"],["references","References"],["contact","Contact"]];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ backgroundColor:scrolled?C.navBg:"transparent", backdropFilter:scrolled?"blur(12px)":"none", borderBottom:scrolled?`1px solid ${C.border}`:"1px solid transparent" }}>
      <div className="max-w-[800px] mx-auto px-6 h-14 flex items-center justify-between">
        <button onClick={onHome} className="text-lg font-semibold tracking-tight cursor-pointer" style={{ fontFamily:"'IBM Plex Serif',Georgia,serif", color:C.text }}>TK</button>
        <div className="flex items-center gap-3">
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5 text-sm mr-3">
            {links.map(([id,label])=>(
              id === "ai-lab" ? (
                <button key={id} onClick={()=>scrollTo(id)}
                  className="flex items-center gap-1 transition-colors cursor-pointer"
                  style={{ color:C.accent }}
                  onMouseEnter={e=>e.currentTarget.style.opacity="0.7"}
                  onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                  <Sparkles size={10}/> {label}
                </button>
              ) : (
                <button key={id} onClick={()=>scrollTo(id)} className="transition-colors cursor-pointer"
                  style={{ color:C.muted }} onMouseEnter={e=>e.target.style.color=C.accent} onMouseLeave={e=>e.target.style.color=C.muted}>{label}</button>
              )
            ))}
          </div>
          {/* Mobile hamburger button */}
          <button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 cursor-pointer" style={{ color:C.text }}>
            {mobileMenuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
          {/* Dark mode toggle - always visible */}
          <button onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition-all"
            style={{
              borderColor: C.accent,
              color: C.accent,
              backgroundColor: dark ? C.accentLight : "transparent",
            }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.accent;e.currentTarget.style.color=C.bg;}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor=dark?C.accentLight:"transparent";e.currentTarget.style.color=C.accent;}}>
            {dark ? <Sun size={13}/> : <Moon size={13}/>}
            <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t" style={{ backgroundColor:C.bg, borderColor:C.border }}>
          <div className="max-w-[800px] mx-auto px-6 py-4">
            {links.map(([id,label])=>(
              id === "ai-lab" ? (
                <button key={id} onClick={()=>scrollTo(id)}
                  className="flex items-center gap-1.5 w-full text-left py-3 text-sm font-medium transition-colors cursor-pointer"
                  style={{ color:C.accent }}>
                  <Sparkles size={13}/> {label}
                </button>
              ) : (
                <button key={id} onClick={()=>scrollTo(id)}
                  className="block w-full text-left py-3 text-sm font-medium transition-colors cursor-pointer"
                  style={{ color:C.textSec }}
                  onMouseEnter={e=>e.target.style.color=C.accent}
                  onMouseLeave={e=>e.target.style.color=C.textSec}>
                  {label}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};


/* ═══════════════════════════════════════════════
   EXPANDABLE PROJECT CARD
   ═══════════════════════════════════════════════ */
const ProjectCard = ({ project, onDeepDive }) => {
  const { C } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const githubUrl = project.caseStudyUrl && project.caseStudyUrl.includes("github.com") ? project.caseStudyUrl : null;

  const renderText = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, idx) =>
      idx % 2 === 1
        ? <strong key={idx} style={{ color:C.text, fontWeight:600 }}>{part}</strong>
        : <span key={idx}>{part}</span>
    );
  };

  return (
    <div className="rounded-xl border transition-all duration-300"
      style={{ backgroundColor:C.bg, borderColor:expanded?C.accent:C.border, boxShadow:expanded?`0 4px 16px ${C.accentGlow}`:"none" }}>
      <button onClick={()=>setExpanded(!expanded)} className="w-full text-left p-5 cursor-pointer">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-sm font-semibold leading-snug" style={{ fontFamily:"'IBM Plex Serif',Georgia,serif", color:C.text }}>{project.title}</h3>
          <div className="flex items-center gap-2 shrink-0">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                title="View on GitHub" aria-label="View on GitHub"
                className="p-1 rounded-md transition-colors" style={{ color:C.muted }}
                onMouseEnter={e=>e.currentTarget.style.color=C.accent} onMouseLeave={e=>e.currentTarget.style.color=C.muted}>
                <Github size={14}/>
              </a>
            )}
            <ChevronDown size={14} className="transition-transform duration-300" style={{ color:C.muted, transform:expanded?"rotate(180deg)":"rotate(0)" }}/>
          </div>
        </div>
        <p className="text-xs leading-relaxed mb-3" style={{ color:C.muted }}>{project.oneLiner}</p>
        <div className="flex flex-wrap gap-1.5">{project.tags.map(t=><Tag key={t} label={t}/>)}</div>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight:expanded?"300px":"0" }}>
        <div className="px-5 pb-5 pt-0">
          <div className="border-t pt-4 mb-3" style={{ borderColor:C.border }}>
            <p className="text-xs leading-relaxed mb-2" style={{ color:C.textSec }}><strong style={{ color:C.text }}>Problem:</strong> {renderText(project.problem.substring(0,150)+"...")}</p>
            {project.results ? (
              <p className="text-xs leading-relaxed" style={{ color:C.textSec }}><strong style={{ color:C.text }}>Result:</strong> {renderText(project.results.substring(0,150)+"...")}</p>
            ) : (
              <p className="text-xs leading-relaxed" style={{ color:C.textSec }}><strong style={{ color:C.text }}>Solution:</strong> {renderText(project.solution.substring(0,150)+"...")}</p>
            )}
          </div>
          <button onClick={e=>{e.stopPropagation();onDeepDive(project.id);}}
            className="flex items-center gap-1.5 text-xs font-medium cursor-pointer transition-opacity"
            style={{ color:C.accent }} onMouseEnter={e=>e.currentTarget.style.opacity=0.7} onMouseLeave={e=>e.currentTarget.style.opacity=1}>
            Full deep dive <ArrowUpRight size={12}/>
          </button>
        </div>
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════ */
// Old links used #/deep-dive/<id>; they still work and get upgraded to /projects/<id>.
const getLegacyHashId = () => {
  const match = window.location.hash.match(/^#\/deep-dive\/(.+)$/);
  return match ? match[1] : null;
};

export default function Portfolio({ initialPath = "/" }) {
  const [dark, setDark] = useState(false);
  // Derived from the URL path only (never from window or the hash) so the first
  // client render matches the prerendered HTML exactly, which keeps hydration clean.
  const [deepDiveId, setDeepDiveId] = useState(() => getProjectIdFromPath(initialPath));
  const scrollPositionRef = useRef(0);
  const C = dark ? darkColors : lightColors;
  const toggle = () => setDark(d=>!d);

  useEffect(() => {
    // Browser back/forward buttons
    const onPopState = () => {
      const id = getProjectIdFromPath(window.location.pathname);
      setDeepDiveId(id);
      if (id) window.scrollTo(0, 0);
      else requestAnimationFrame(() => window.scrollTo(0, scrollPositionRef.current));
    };
    window.addEventListener("popstate", onPopState);
    // Someone arriving on an old #/deep-dive/<id> link lands on the right project
    const legacyId = getLegacyHashId();
    if (legacyId) {
      history.replaceState(null, "", projectPath(legacyId));
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const allProjects = [...projects, ...aiProjects];
  const activeProject = allProjects.find(p=>p.id===deepDiveId);

  const goHome = () => {
    history.pushState(null, "", "/");
    setDeepDiveId(null);
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPositionRef.current);
    });
  };

  const openDeepDive = id => {
    scrollPositionRef.current = window.scrollY;
    history.pushState(null, "", projectPath(id));
    setDeepDiveId(id);
    window.scrollTo(0, 0);
  };

  const navigateTo = id => {
    if (deepDiveId) {
      history.pushState(null, "", "/");
      setDeepDiveId(null);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        });
      });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const shell = children => (
    <ThemeCtx.Provider value={{ C, dark, toggle }}>
      <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor:C.bg, color:C.text, fontFamily:"'Inter',sans-serif" }}>
        <Nav onHome={goHome} onSection={navigateTo} />
        {children}
      </div>
    </ThemeCtx.Provider>
  );

  if (activeProject) return shell(<ProjectDeepDive project={activeProject} onBack={goHome} />);

  return shell(
    <>
      <BuiltWithAI />

      {/* HERO — matched to max-w-[800px] like the about section */}
      <header className="pt-28 pb-16 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-5 mb-8">
              <img src="/profile.jpg" alt="Tonishqa Kaplish" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 shadow-md"
                style={{ borderColor:C.accent }} onError={e=>{e.target.style.display='none'}} />
              <div>
                <div className="flex items-center gap-2 text-sm mb-2" style={{ fontFamily:"'IBM Plex Mono',monospace", color:C.muted }}>
                  <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor:C.accent }} />
                  Seattle, WA
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight" style={{ fontFamily:"'IBM Plex Serif',Georgia,serif" }}>
                  Tonishqa Kaplish
                </h1>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-lg leading-relaxed mb-3" style={{ fontFamily:"'IBM Plex Serif',Georgia,serif", fontStyle:"italic", color:C.textSec }}>
              Building marketing systems anchored in real customer behavior.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <p className="text-base leading-relaxed mb-4" style={{ color:C.textSec }}>
              I specialize in building <Scribble>AI-powered marketing infrastructure</Scribble>. From <Scribble>autonomous pipelines</Scribble> that turn unstructured customer data into strategy, to predictive systems that adapt without manual intervention — I work at the intersection of marketing, AI, and operations.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color:C.textSec }}>
              I've been trained in how people construct meaning, make decisions, and form identity around the things they choose. Today, I put that understanding to work.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color:C.textSec }}>
              Sales calls become positioning. Support tickets become content frameworks. Objection patterns become messaging that converts because it reflects what buyers actually said. I build the systems that make this happen <Scribble>automatically, not manually</Scribble>.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color:C.textSec }}>
              I've built this for industries where trust isn't a brand value on a slide deck. It's structural. You don't manufacture it. You earn it by proving you listened.
            </p>
          </Reveal>
          <Reveal delay={350}>
            <div className="flex flex-wrap items-center gap-3">
              <a href="https://drive.google.com/file/d/1WGH6Mm0dUJT7LssIlzCY2OgLCZWIByyU/view?usp=sharing" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors" style={{ backgroundColor:C.text, color:C.bg }}>
                <FileText size={15}/> Resume
              </a>
              <a href="http://www.linkedin.com/in/tonishqa" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border transition-all" style={{ borderColor:C.border, color:C.textSec }}>
                <Linkedin size={15}/> LinkedIn
              </a>
              <a href="https://github.com/tkaplish888-alt" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border transition-all" style={{ borderColor:C.border, color:C.textSec }}>
                <Github size={15}/> GitHub
              </a>
              <a href="https://calendly.com/tkaplish888/30min" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border transition-all" style={{ borderColor:C.border, color:C.textSec }}>
                <Coffee size={15}/> Grab a virtual coffee with me
              </a>
            </div>
          </Reveal>
        </div>
      </header>


      {/* ABOUT */}
      <section id="about" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="About" /></Reveal>
          <Reveal delay={100}>
            <div className="space-y-4 mb-8">
              <p className="text-sm leading-relaxed" style={{ color:C.textSec }}>Most marketers enter through tactics. I entered through frameworks. I treat marketing as a practice of <Scribble>understanding human behavior</Scribble>. Every campaign is a hypothesis about how people decide. Every positioning statement is an interpretation of identity. Every conversion problem is, underneath it all, a friction problem.</p>
              <p className="text-sm leading-relaxed" style={{ color:C.textSec }}>My work focuses on closing the gap between what customers experience and what marketing communicates. In practice, that has looked like building marketing functions <Scribble>from zero</Scribble>. Designing AI systems that analyze sales calls to surface <Scribble>objection patterns</Scribble>. Translating those patterns into messaging used across demand gen, product marketing, and sales enablement. Automating competitive intelligence workflows that cut research time.</p>
              <p className="text-sm leading-relaxed" style={{ color:C.textSec }}>AI handles the pattern recognition. I handle the meaning-making. That division of labor is what makes clarity repeatable.</p>
              <p className="text-sm leading-relaxed" style={{ color:C.textSec }}>Donald Miller puts it well: the customer is the hero, the brand is the guide. I build systems that make sure the guide is actually listening.</p>
              <p className="text-sm leading-relaxed" style={{ color:C.textSec }}>I'm not here to shout. I'm here to clarify. And I build the infrastructure that lets that clarity scale.</p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Callout icon={Target} title="Marketing">Campaigns, segmentation, growth experiments. 54.84% email open rates. I start with research and let the data do the talking.</Callout>
              <Callout icon={BookOpen} title="Storytelling">65% LinkedIn engagement lift. Messaging that founders trusted on their homepage. I care about getting the words right.</Callout>
              <Callout icon={Users} title="User Research">Built a voice-of-customer pipeline using the Claude API and Python. 70% survey response rates that informed product roadmaps. I show up with what users actually said.</Callout>
            </div>
          </Reveal>
        </div>
      </section>


      {/* TOOLKIT */}
      <section id="toolkit" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="Toolkit" /></Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {[
                {icon:Megaphone,label:"Go-to-Market"},
                {icon:BarChart3,label:"Marketing Analytics"},
                {icon:Brain,label:"AI / LLM Workflows"},
                {icon:PenTool,label:"Content Strategy"},
                {icon:Users,label:"User Research"},
                {icon:MessageSquare,label:"Conversational AI"},
                {icon:Layers,label:"Product Marketing"},
                {icon:Lightbulb,label:"Brand Storytelling"},
                {icon:Search,label:"SEO / Technical SEO"},
                {icon:Target,label:"HubSpot"},
                {icon:BarChart3,label:"PostHog"},
                {icon:Puzzle,label:"Clay"},
              ].map(({icon:Icon,label},i)=>(
                <div key={i} className="flex items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium"
                  style={{ backgroundColor:C.bg, borderColor:C.border, color:C.textSec }}>
                  <Icon size={13} style={{ color:C.accent }} className="shrink-0"/>{label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>


      {/* EXPERIENCE */}
      <section id="work" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="Experience" subtitle="From strategic communications to AI-native marketing operations." /></Reveal>
          <div className="relative ml-4 md:ml-8">
            <div className="absolute left-0 top-2 bottom-2 w-px" style={{ backgroundColor:C.border }} />
            {timeline.map((item,i)=>(
              <Reveal key={i} delay={i*100}>
                <div className="relative pl-8 pb-10 last:pb-0">
                  <div className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full border-2 -translate-x-1"
                    style={{ backgroundColor:item.current?C.accent:C.bg, borderColor:item.current?C.accent:C.muted, boxShadow:item.current?`0 0 0 3px ${C.accentGlow}`:"none" }} />
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 mb-1">
                    <h3 className="text-base font-semibold" style={{ fontFamily:"'IBM Plex Serif',Georgia,serif", color:C.text }}>{item.role}</h3>
                    <span className="text-sm font-medium" style={{ color:C.accent }}>{item.company}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs" style={{ fontFamily:"'IBM Plex Mono',monospace", color:C.muted }}>{item.period}</span>
                    {item.note && <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor:C.accentLight, color:C.accent }}>{item.note}</span>}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color:C.textSec }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* AI INFRASTRUCTURE */}
      <section id="ai-lab" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="AI Infrastructure" subtitle="Systems I've designed where AI is the infrastructure, not the afterthought. Click a project to preview it, then open the full deep dive." /></Reveal>
          <div className="flex flex-col gap-3">
            {aiProjects.map((p,i)=>(<Reveal key={p.id} delay={i*60}><ProjectCard project={p} onDeepDive={openDeepDive}/></Reveal>))}
          </div>
        </div>
      </section>


      {/* PROJECTS */}
      <section id="projects" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="Projects" subtitle="Click to preview. Expand for the snapshot. Deep dive for the full story." /></Reveal>
          <div className="flex flex-col gap-3">
            {projects.map((p,i)=>(<Reveal key={p.id} delay={i*60}><ProjectCard project={p} onDeepDive={openDeepDive}/></Reveal>))}
          </div>
        </div>
      </section>


      {/* CONTENT PORTFOLIO */}
      <section id="content" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="Content Portfolio" subtitle="Written pieces, video content, and newsletters." /></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contentItems.map((w,i)=>{
              const TypeIcon = typeIcons[w.type] || PenTool;
              return (
                <Reveal key={i} delay={i*60}>
                  <a href={w.href} target="_blank" rel="noopener noreferrer"
                    className="group block rounded-xl border p-5 transition-all duration-300"
                    style={{ backgroundColor:C.bg, borderColor:C.border }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.boxShadow=`0 4px 16px ${C.accentGlow}`;}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none";}}>
                    <div className="flex items-center gap-2 mb-2">
                      <TypeIcon size={12} style={{ color:C.accent }}/>
                      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color:C.accent }}>{typeLabels[w.type]}</span>
                    </div>
                    <div className="flex items-start justify-between mb-1.5">
                      <h3 className="text-sm font-semibold leading-snug pr-2" style={{ fontFamily:"'IBM Plex Serif',Georgia,serif", color:C.text }}>{w.title}</h3>
                      <ArrowUpRight size={13} style={{ color:C.muted }} className="shrink-0 mt-0.5"/>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color:C.muted }}>{w.desc}</p>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* EDUCATION */}
      <section id="education" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="Education" /></Reveal>
          <div className="space-y-4">
            {education.map((ed,i)=>(
              <Reveal key={i} delay={i*100}>
                <div className="rounded-lg border px-5 py-4" style={{ backgroundColor:C.surface, borderColor:C.border }}>
                  <div className="flex items-start gap-3">
                    <GraduationCap size={18} style={{ color:C.accent }} className="mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold mb-0.5" style={{ fontFamily:"'IBM Plex Serif',Georgia,serif", color:C.text }}>{ed.degree}</h3>
                      <p className="text-sm mb-1" style={{ color:C.textSec }}>{ed.school}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs mb-2" style={{ color:C.muted }}>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace" }}>{ed.period}</span>
                        {ed.location && <><span>·</span><span>{ed.location}</span></>}
                        {ed.gpa && <><span>·</span><span className="font-medium" style={{ color:C.accent }}>GPA: {ed.gpa}</span></>}
                      </div>
                      {ed.courses && (
                        <p className="text-xs leading-relaxed mb-2" style={{ color:C.muted }}>
                          <strong style={{ color:C.textSec }}>Courses:</strong> {ed.courses}
                        </p>
                      )}
                      {ed.highlights && (
                        <p className="text-xs leading-relaxed" style={{ color:C.muted }}>
                          <strong style={{ color:C.textSec }}>Highlights:</strong> {ed.highlights}
                        </p>
                      )}
                      {ed.activities && (
                        <p className="text-xs leading-relaxed" style={{ color:C.muted }}>
                          <strong style={{ color:C.textSec }}>Activities:</strong> {ed.activities}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DIPLOMAS */}
      <section id="diplomas" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="Diplomas" /></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert,i)=>(
              <Reveal key={i} delay={i*100}>
                <div className="rounded-lg border px-5 py-3.5 flex items-start gap-3" style={{ backgroundColor:C.surface, borderColor:C.border }}>
                  <Award size={16} style={{ color:C.accent }} className="mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold mb-0.5" style={{ color:C.text }}>{cert.title}</h3>
                    <p className="text-xs" style={{ color:C.textSec }}>{cert.issuer}</p>
                    <p className="text-xs mt-1" style={{ fontFamily:"'IBM Plex Mono',monospace", color:C.muted }}>{cert.date}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section id="references" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="References" subtitle="What colleagues say about working with me." /></Reveal>
          <div className="space-y-4">
            {references.map((ref,i)=>(
              <Reveal key={i} delay={i*100}>
                <div className="rounded-lg border px-6 py-5" style={{ backgroundColor:C.surface, borderColor:C.border }}>
                  <div className="flex items-start gap-3 mb-3">
                    <Users size={18} style={{ color:C.accent }} className="mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color:C.text }}>{ref.name}</h3>
                      <p className="text-xs" style={{ color:C.textSec }}>{ref.title}</p>
                      <p className="text-xs mt-0.5" style={{ color:C.muted }}>{ref.relationship} · {ref.date}</p>
                      {ref.linkedin && (
                        <a href={ref.linkedin} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium mt-1.5 transition-colors"
                          style={{ color:C.accent }}
                          onMouseEnter={e=>e.currentTarget.style.opacity="0.7"}
                          onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                          <Linkedin size={12} /> LinkedIn profile <ArrowUpRight size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed pl-8" style={{ color:C.textSec, fontStyle:"italic" }}>
                    "{ref.quote}"
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* CONTACT — matched to max-w-[800px] */}
      <section id="contact" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="Let's Connect" /></Reveal>
          <Reveal delay={100}>
            <div className="rounded-xl border p-6 md:p-8" style={{ backgroundColor:C.surface, borderColor:C.border }}>
              <p className="text-sm leading-relaxed mb-6" style={{ color:C.textSec }}>
                I'm always interested in opportunities at the intersection of marketing, AI, and user-centered growth. If something here resonated, or if you just want to talk about what makes great marketing, let's have a conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <a href="mailto:tkaplish888@gmail.com" className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors" style={{ backgroundColor:C.text, color:C.bg }}>
                  <Mail size={15}/> tkaplish888@gmail.com
                </a>
                <a href="http://www.linkedin.com/in/tonishqa" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border text-sm font-medium px-5 py-2.5 rounded-lg transition-all" style={{ borderColor:C.border, color:C.textSec, backgroundColor:C.bg }}>
                  <Linkedin size={15}/> LinkedIn
                </a>
                <a href="https://calendly.com/tkaplish888/30min" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border text-sm font-medium px-5 py-2.5 rounded-lg transition-all" style={{ borderColor:C.border, color:C.textSec, backgroundColor:C.bg }}>
                  <Coffee size={15}/> Grab a virtual coffee with me
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color:C.muted }}><MapPin size={12}/> Seattle, Washington</div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* BUILD LOG */}
      <section className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="Build Log" subtitle="How this site was made, and why that matters." /></Reveal>
          <Reveal delay={100}>
            <div className="rounded-xl border p-6" style={{ backgroundColor:C.surface, borderColor:C.border }}>
              <p className="text-sm leading-relaxed mb-4" style={{ color:C.textSec }}>
                This portfolio was designed and built entirely through AI-assisted development using <strong style={{ color:C.text }}>Claude Opus 4.6</strong> via <strong style={{ color:C.text }}>Claude Code</strong> and <strong style={{ color:C.text }}>Cursor IDE</strong>. No templates. No drag-and-drop builders. No manual coding.
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color:C.textSec }}>
                I directed the architecture, content structure, design system, and interaction patterns through structured prompts. Claude Code executed the file operations, edits, and git commits autonomously. Every section, component, and animation was orchestrated through an iterative prompt-and-refine workflow that mirrors how I think about AI in marketing: define the system, direct the output, iterate until it's right.
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color:C.textSec }}>
                This isn't just a portfolio. It's a demonstration of AI workflow fluency. The same approach I used to build this site is the approach I use to build marketing systems: understand the tools deeply enough to direct them with precision.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {label:"Stack", value:"React 18 + Vite + Tailwind CSS v4"},
                  {label:"AI Model", value:"Claude Opus 4.6 (Anthropic)"},
                  {label:"AI Agent", value:"Claude Code CLI"},
                  {label:"IDE", value:"Cursor"},
                  {label:"Architecture", value:"Single-file, zero build complexity"},
                  {label:"Design System", value:"Custom warm palette + dark mode"},
                  {label:"Typography", value:"IBM Plex Serif + Inter + IBM Plex Mono"},
                ].map((item,i)=>(
                  <div key={i} className="flex items-start gap-2 text-xs" style={{ color:C.textSec }}>
                    <CheckCircle2 size={11} style={{ color:C.accent }} className="mt-0.5 shrink-0"/>
                    <span><strong style={{ color:C.text }}>{item.label}:</strong> {item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ borderTop:`1px solid ${C.border}` }}>
        <div className="max-w-[800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color:C.muted }}>
          <span>&copy; 2026 Tonishqa Kaplish</span>
          <span className="flex items-center gap-1.5"><Sparkles size={10} style={{ color:C.accent }}/> Built with Claude Code + Cursor</span>
        </div>
      </footer>
    </>
  );
}
