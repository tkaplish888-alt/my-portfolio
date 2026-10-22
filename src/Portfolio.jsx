import { useState, useEffect, useRef } from "react";
import { FileText, Linkedin, Github, Coffee, Mail, MapPin, ChevronDown } from "lucide-react";
import { site, projects, aiProjects, timeline, education, certifications, references, contentItems } from "./data.js";
import { projectPath, getProjectIdFromPath } from "./routes.js";
import { Section, SectionHead } from "./components/ui.jsx";
import Nav from "./components/Nav.jsx";
import SignalMachine from "./components/SignalMachine.jsx";
import SystemsGrid from "./components/SystemsGrid.jsx";
import Experience from "./components/Experience.jsx";
import CaseStudies from "./components/CaseStudies.jsx";
import References from "./components/References.jsx";
import ContentShelf from "./components/ContentShelf.jsx";
import DeepDive from "./components/DeepDive.jsx";

const RESUME_URL = "https://drive.google.com/file/d/1WGH6Mm0dUJT7LssIlzCY2OgLCZWIByyU/view?usp=sharing";

const TOOLKIT = ["Go-to-market", "Product marketing", "AI and LLM workflows", "Conversational AI", "Marketing analytics", "User research", "Content strategy", "Technical SEO", "HubSpot", "PostHog", "Clay", "Python", "Claude API"];

// Old links used #/deep-dive/<id>; they still work and get upgraded to /projects/<id>.
const getLegacyHashId = () => {
  const match = window.location.hash.match(/^#\/deep-dive\/(.+)$/);
  return match ? match[1] : null;
};

export default function Portfolio({ initialPath = "/" }) {
  // Derived from the URL path only, so the first client render matches the
  // prerendered HTML exactly and hydration stays clean.
  const [deepDiveId, setDeepDiveId] = useState(() => getProjectIdFromPath(initialPath));
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
    </div>
  );

  if (activeProject) return shell(<DeepDive project={activeProject} onBack={goHome} />);

  return shell(
    <main id="main">
      {/* HERO */}
      <header className="px-5 md:px-8 pt-28 md:pt-36 pb-8">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex items-center gap-3">
            <img src="/profile.jpg" alt={site.imageAlt} className="w-12 h-12 rounded-full object-cover border-[1.5px] border-ink" />
            <div className="text-[14px] leading-tight">
              <div className="font-semibold">{site.name}</div>
              <div className="text-muted">Marketing systems, Seattle</div>
            </div>
          </div>
          <h1 className="display text-[2.6rem] sm:text-[3.6rem] md:text-[4.6rem] font-extrabold mt-7 max-w-[15ch]">
            Marketing systems anchored in real customer behavior.
          </h1>
          <p className="text-[17px] md:text-[18px] leading-relaxed text-ink-2 mt-6 max-w-[58ch]">
            I build AI-powered marketing infrastructure. Sales calls become positioning, competitor sites become alerts, and CRM notes become next steps, automatically.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn bg-marigold text-[#1f2421]"><FileText size={15} aria-hidden /> Resume</a>
            <a href={site.links.calendly} target="_blank" rel="noopener noreferrer" className="btn bg-card text-ink"><Coffee size={15} aria-hidden /> Book a coffee chat</a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn bg-card text-ink !px-3" aria-label="LinkedIn"><Linkedin size={16} /></a>
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="btn bg-card text-ink !px-3" aria-label="GitHub"><Github size={16} /></a>
          </div>
        </div>
      </header>

      <div className="px-5 md:px-8 pb-6">
        <div className="max-w-[1040px] mx-auto">
          <SignalMachine onOpen={openDeepDive} />
        </div>
      </div>

      {/* ABOUT */}
      <Section id="about">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16">
          <div>
            <SectionHead title="I entered marketing through frameworks, not tactics." />
            <div className="space-y-4 text-[16px] leading-[1.7] text-ink-2 max-w-[60ch]">
              <p>I was trained in how people construct meaning and make decisions. So I treat every campaign as a hypothesis about how people decide, and every conversion problem as a friction problem.</p>
              <p>AI handles the pattern recognition. I handle the meaning-making. Donald Miller says the customer is the hero and the brand is the guide. I build the systems that make sure the guide is actually listening.</p>
            </div>
          </div>
          <div className="md:pt-3">
            <h3 className="text-[14px] font-semibold text-muted mb-3">What I work with</h3>
            <ul className="flex flex-wrap gap-2">
              {TOOLKIT.map(t => <li key={t} className="text-[13.5px] font-medium px-3 py-1.5 rounded-full border-[1.5px] border-ink bg-card">{t}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      {/* AI SYSTEMS */}
      <Section id="systems" className="bg-sunk border-y-[1.5px] border-ink">
        <SectionHead title="Systems I've built">
          Infrastructure where AI does the heavy lifting and people make the calls. Open any card for the numbers.
        </SectionHead>
        <SystemsGrid items={aiProjects} onOpen={openDeepDive} />
      </Section>

      {/* EXPERIENCE */}
      <Section id="work">
        <SectionHead title="Where I've done it" />
        <Experience items={timeline} />
      </Section>

      {/* CASE STUDIES */}
      <Section id="case-studies" className="pt-0 md:pt-4">
        <SectionHead title="Marketing and GTM case studies">
          Campaigns, research and positioning work from startups, nonprofits and school projects.
        </SectionHead>
        <CaseStudies items={projects} onOpen={openDeepDive} />
      </Section>

      {/* REFERENCES */}
      <Section id="references" className="bg-sunk border-y-[1.5px] border-ink">
        <SectionHead title="What colleagues say" />
        <References items={references} />
      </Section>

      {/* CONTENT */}
      <Section id="content">
        <SectionHead title="Writing and media" />
        <ContentShelf items={contentItems} />
      </Section>

      {/* EDUCATION */}
      <Section id="education" className="pt-0 md:pt-0">
        <SectionHead title="Education" />
        <ul className="grid md:grid-cols-3 gap-5">
          {education.map(ed => (
            <li key={ed.degree} className="rounded-lg border-[1.5px] border-ink bg-card p-5">
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
        <div className="rounded-[10px] border-[1.5px] border-ink bg-marigold shadow-hard-lg p-7 md:p-12 text-[#1f2421]">
          <h2 className="display text-[2.2rem] md:text-[3.2rem] font-extrabold max-w-[16ch]">If something here resonated, let's talk.</h2>
          <p className="text-[16px] leading-relaxed mt-4 max-w-[52ch]">I'm always interested in opportunities at the intersection of marketing, AI and user-centered growth.</p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a href={`mailto:${site.email}`} className="btn bg-[#1f2421] text-[#f7f7f2] border-[#1f2421]"><Mail size={15} aria-hidden /> {site.email}</a>
            <a href={site.links.calendly} target="_blank" rel="noopener noreferrer" className="btn bg-[#f7f7f2] text-[#1f2421] border-[#1f2421]"><Coffee size={15} aria-hidden /> Book a coffee chat</a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn bg-[#f7f7f2] text-[#1f2421] border-[#1f2421]"><Linkedin size={15} aria-hidden /> LinkedIn</a>
          </div>
          <p className="flex items-center gap-1.5 text-[13.5px] mt-6"><MapPin size={14} aria-hidden /> {site.location.city}, Washington</p>
        </div>
      </Section>

      {/* BUILD LOG */}
      <Section id="build-log" className="pt-0 md:pt-0">
        <details className="group rounded-lg border-[1.5px] border-ink bg-card">
          <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
            <span>
              <span className="block display text-xl font-bold">How this site was built</span>
              <span className="block text-[14px] text-muted mt-0.5">Directed by me, written by Claude.</span>
            </span>
            <ChevronDown size={18} className="group-open:rotate-180 transition-transform" aria-hidden />
          </summary>
          <div className="px-5 pb-6 text-[15px] leading-relaxed text-ink-2 max-w-[68ch] space-y-3">
            <p>I built the first version in February 2026 with Claude Opus 4.6, working through Claude Code and Cursor. In October 2026 I redesigned it with Claude Opus 5.5 in Claude Code. No templates and no hand-written code: I set the architecture, the design system and the copy, and Claude handled the implementation.</p>
            <p>Every page is prerendered to static HTML so AI crawlers can read it, and all content lives in one data file that feeds the site, the sitemap and llms.txt.</p>
            <p className="text-[14px] text-muted">React 19, Vite, Tailwind CSS v4, Lucide icons, Bricolage Grotesque and IBM Plex Sans. Hosted on Vercel.</p>
          </div>
        </details>
      </Section>

      <footer className="px-5 md:px-8 py-8 border-t-[1.5px] border-ink">
        <div className="max-w-[1040px] mx-auto flex flex-col sm:flex-row justify-between gap-2 text-[13.5px] text-muted">
          <span>© 2026 {site.name}</span>
          <span>Built with Claude Code</span>
        </div>
      </footer>
    </main>
  );
}
