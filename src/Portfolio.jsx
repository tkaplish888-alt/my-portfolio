import { useState, useEffect, useRef } from "react";
import { FileText, Linkedin, Github, Coffee, Mail } from "lucide-react";
import { site, projects, aiProjects, timeline, education, certifications, references, contentItems, changelog } from "./data.js";
import { projectPath, getProjectIdFromPath } from "./routes.js";
import { Section, SectionHead } from "./components/ui.jsx";
import Nav from "./components/Nav.jsx";
import SignalMachine from "./components/SignalMachine.jsx";
import SystemsGrid from "./components/SystemsGrid.jsx";
import Experience from "./components/Experience.jsx";
import CaseStudies from "./components/CaseStudies.jsx";
import References from "./components/References.jsx";
import ContentShelf from "./components/ContentShelf.jsx";
import Changelog from "./components/Changelog.jsx";
import BuiltWithAI from "./components/BuiltWithAI.jsx";
import DeepDive from "./components/DeepDive.jsx";
import Pip from "./components/Pip.jsx";
import AskPip from "./components/AskPip.jsx";

const RESUME_URL = "https://drive.google.com/file/d/1WGH6Mm0dUJT7LssIlzCY2OgLCZWIByyU/view?usp=sharing";
const buildsWithCode = aiProjects.filter(p => p.caseStudyUrl?.includes("github.com")).length;

/* "Who's visiting?" Each view rewrites the intro line, swaps the main
   call to action, and reorders the sections to lead with what that
   visitor came for. null is the default view (and what gets prerendered). */
const VIEWS = {
  null: {
    line: "I design and ship AI tools for go-to-market teams, and the marketing that runs on them.",
    cta: "resume",
    order: ["builds", "work", "cases", "references", "content"],
  },
  hiring: {
    label: "I'm hiring",
    line: "Marketing technology lead. First marketing hire at Valur, then AI builds at Flatiron School. Experience and references come first.",
    cta: "resume",
    order: ["work", "references", "builds", "cases", "content"],
  },
  founder: {
    label: "I'm a founder",
    line: "I've been the first marketing hire. Building the function and the tools at the same time is the job I know best.",
    cta: "coffee",
    order: ["builds", "cases", "work", "references", "content"],
  },
  builder: {
    label: "I build things",
    line: `Python, MCP, the Claude API and GitHub Actions. ${buildsWithCode} of the builds below link straight to their code.`,
    cta: "github",
    order: ["builds", "work", "cases", "references", "content"],
  },
};

// Old links used #/deep-dive/<id>; they still work and get upgraded to /projects/<id>.
const getLegacyHashId = () => {
  const match = window.location.hash.match(/^#\/deep-dive\/(.+)$/);
  return match ? match[1] : null;
};

export default function Portfolio({ initialPath = "/" }) {
  // Derived from the URL path only, so the first client render matches the
  // prerendered HTML exactly and hydration stays clean.
  const [deepDiveId, setDeepDiveId] = useState(() => getProjectIdFromPath(initialPath));
  const [visitor, setVisitor] = useState(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const onPopState = () => {
      const id = getProjectIdFromPath(window.location.pathname);
      setDeepDiveId(id);
      if (id) window.scrollTo(0, 0);
      else requestAnimationFrame(() => window.scrollTo(0, scrollPositionRef.current));
    };
    window.addEventListener("popstate", onPopState);
    const legacyId = getLegacyHashId();
    if (legacyId) {
      history.replaceState(null, "", projectPath(legacyId));
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme !== "dark";
    if (next) document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch { /* storage blocked */ }
  };

  const allProjects = [...projects, ...aiProjects];
  const activeProject = allProjects.find(p => p.id === deepDiveId);

  const goHome = () => {
    history.pushState(null, "", "/");
    setDeepDiveId(null);
    requestAnimationFrame(() => window.scrollTo(0, deepDiveId ? scrollPositionRef.current : 0));
  };

  const openDeepDive = id => {
    scrollPositionRef.current = window.scrollY;
    history.pushState(null, "", projectPath(id));
    setDeepDiveId(id);
    window.scrollTo(0, 0);
  };

  const navigateTo = id => {
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (deepDiveId) {
      history.pushState(null, "", "/");
      setDeepDiveId(null);
      requestAnimationFrame(() => requestAnimationFrame(scroll));
    } else scroll();
  };

  const shell = children => (
    <div className="min-h-screen bg-paper text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] btn bg-marigold">Skip to content</a>
      <Nav onHome={goHome} onSection={navigateTo} onToggleTheme={toggleTheme} />
      {children}
      <BuiltWithAI />
      <AskPip projectId={activeProject?.id} visitor={visitor} onOpenProject={openDeepDive} onGo={navigateTo} />
    </div>
  );

  if (activeProject) return shell(<DeepDive project={activeProject} onBack={goHome} />);

  const view = VIEWS[visitor];
  const CTAS = {
    resume: <a key="resume" href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn bg-marigold text-on-accent"><FileText size={15} aria-hidden /> Resume</a>,
    coffee: <a key="coffee" href={site.links.calendly} target="_blank" rel="noopener noreferrer" className="btn bg-marigold text-on-accent"><Coffee size={15} aria-hidden /> Book a coffee chat</a>,
    github: <a key="github" href={site.links.github} target="_blank" rel="noopener noreferrer" className="btn bg-marigold text-on-accent"><Github size={15} aria-hidden /> GitHub</a>,
  };
  const secondary = ["resume", "coffee", "github"].filter(k => k !== view.cta);

  const SECTIONS = {
    builds: (
      <Section key="builds" id="systems" className="bg-sunk border-y-[1.5px] border-edge">
        <SectionHead title="Things I've built with AI">Open a card for the numbers.</SectionHead>
        <SystemsGrid items={aiProjects} onOpen={openDeepDive} />
      </Section>
    ),
    work: (
      <Section key="work" id="work">
        <SectionHead title="Where I've shipped" />
        <Experience items={timeline} />
      </Section>
    ),
    cases: (
      <Section key="cases" id="case-studies">
        <SectionHead title="Marketing case studies" />
        <CaseStudies items={projects} onOpen={openDeepDive} />
      </Section>
    ),
    references: (
      <Section key="references" id="references" className="bg-sunk border-y-[1.5px] border-edge">
        <SectionHead title="What teammates say" />
        <References items={references} />
      </Section>
    ),
    content: (
      <Section key="content" id="content">
        <SectionHead title="Writing and media" />
        <ContentShelf items={contentItems} />
      </Section>
    ),
  };

  return shell(
    <main id="main">
      {/* HERO */}
      <header className="px-5 md:px-8 pt-28 md:pt-36 pb-8">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex items-center gap-3">
            <img src="/profile.jpg" alt={site.imageAlt} className="w-12 h-12 rounded-full object-cover border-[1.5px] border-edge" />
            <div className="text-[14px] leading-tight">
              <div className="font-semibold">{site.name}</div>
              <div className="text-muted">{site.location.city}, {site.location.region}</div>
            </div>
          </div>
          <h1 className="display text-[2.7rem] sm:text-[3.8rem] md:text-[4.8rem] font-extrabold mt-7 max-w-[14ch]">
            Marketing, built like a product.
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-2" role="group" aria-label="Who's visiting?">
            <span className="text-[14px] font-medium text-muted mr-1">Who's visiting?</span>
            {Object.entries(VIEWS).filter(([k]) => k !== "null").map(([k, v]) => {
              const on = visitor === k;
              return (
                <button key={k} onClick={() => setVisitor(on ? null : k)} aria-pressed={on}
                  className={`text-[13.5px] font-medium px-3 py-1.5 rounded-full border-[1.5px] cursor-pointer transition-colors
                    ${on ? "bg-ink text-paper border-edge" : "bg-card border-rule hover:border-edge"}`}>
                  {v.label}
                </button>
              );
            })}
          </div>
          <p key={visitor ?? "default"} className="rise text-[17px] md:text-[18px] leading-relaxed text-ink-2 mt-4 max-w-[56ch] min-h-[3.4em]">
            {view.line}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {CTAS[view.cta]}
            {secondary.map(k => (
              <a key={k} href={k === "resume" ? RESUME_URL : k === "coffee" ? site.links.calendly : site.links.github}
                target="_blank" rel="noopener noreferrer" className="btn bg-card text-ink">
                {k === "resume" ? <><FileText size={15} aria-hidden /> Resume</> : k === "coffee" ? <><Coffee size={15} aria-hidden /> Book a coffee chat</> : <><Github size={15} aria-hidden /> GitHub</>}
              </a>
            ))}
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn bg-card text-ink !px-3" aria-label="LinkedIn"><Linkedin size={16} /></a>
          </div>
        </div>
      </header>

      <div className="px-5 md:px-8 pb-6">
        <div className="max-w-[1040px] mx-auto">
          <SignalMachine onOpen={openDeepDive} />
        </div>
      </div>

      {/* AT A GLANCE (kept as <p> tags so llms-full.txt picks them up) */}
      <section id="about" className="px-5 md:px-8 py-10">
        <dl className="max-w-[1040px] mx-auto grid sm:grid-cols-3 gap-6 sm:gap-10">
          {[
            ["Studied", "English literature, then a master's in communication at UW"],
            ["Builds with", "Python, Claude API, MCP, HubSpot, Clay, PostHog"],
            ["Shipped", `${aiProjects.length} AI builds and ${projects.length} marketing case studies`],
          ].map(([k, v]) => (
            <div key={k} className="border-t-[1.5px] border-edge pt-3">
              <dt className="text-[13px] font-semibold text-muted">{k}</dt>
              <dd><p className="text-[15.5px] leading-snug mt-1">{v}</p></dd>
            </div>
          ))}
        </dl>
      </section>

      {view.order.map(k => SECTIONS[k])}

      {/* EDUCATION */}
      <Section id="education">
        <SectionHead title="Education" />
        <ul className="grid md:grid-cols-3 gap-5">
          {education.map(ed => (
            <li key={ed.degree} className="rounded-lg border-[1.5px] border-edge bg-card p-5">
              <div className="text-[13px] text-muted">{ed.period}</div>
              <h3 className="font-semibold text-[15.5px] leading-snug mt-1">{ed.degree}</h3>
              <p className="text-[14px] text-ink-2 mt-1">{ed.school}</p>
            </li>
          ))}
        </ul>
        {certifications.length > 0 && (
          <p className="text-[14px] text-muted mt-5">
            Also: {certifications.map(c => `${c.title} (${c.issuer}, ${c.date.split(" ").pop()})`).join("; ")}.
          </p>
        )}
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="pt-0 md:pt-0">
        <div className="relative rounded-[10px] border-[1.5px] border-edge bg-marigold shadow-hard-lg p-7 md:p-12 text-on-accent overflow-hidden">
          <h2 className="display text-[2.4rem] md:text-[3.4rem] font-extrabold max-w-[14ch]">Let's build something.</h2>
          <p className="text-[16px] leading-relaxed mt-3 max-w-[48ch]">Email is fastest. A coffee chat works too.</p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a href={`mailto:${site.email}`} className="btn bg-ink text-paper border-ink"><Mail size={15} aria-hidden /> {site.email}</a>
            <a href={site.links.calendly} target="_blank" rel="noopener noreferrer" className="btn bg-card text-ink"><Coffee size={15} aria-hidden /> Book a coffee chat</a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn bg-card text-ink"><Linkedin size={15} aria-hidden /> LinkedIn</a>
          </div>
          <WavingPip />
        </div>
      </Section>

      {/* CHANGELOG */}
      <Section id="changelog" className="pt-0 md:pt-0">
        <SectionHead title="Changelog" />
        <Changelog items={changelog} />
      </Section>

      <footer className="px-5 md:px-8 py-8 pb-20 border-t-[1.5px] border-edge">
        <div className="max-w-[1040px] mx-auto flex flex-col sm:flex-row justify-between gap-2 text-[13.5px] text-muted">
          <span>© 2026 {site.name}</span>
          <span>Built with Claude Code</span>
        </div>
      </footer>
    </main>
  );
}

/* Pip in the contact card: perks up on hover, beams when clicked. */
function WavingPip() {
  const [mood, setMood] = useState("idle");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const beam = () => {
    setMood("happy");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMood("idle"), 1400);
  };
  return (
    <button onClick={beam} onMouseEnter={() => mood === "idle" && setMood("listening")} onMouseLeave={() => mood === "listening" && setMood("idle")}
      onFocus={() => setMood("listening")} onBlur={() => setMood("idle")}
      aria-label="Say hi to Pip" className="hidden md:block absolute right-8 bottom-6 cursor-pointer rounded-full">
      <Pip mood={mood} size={150} />
    </button>
  );
}
