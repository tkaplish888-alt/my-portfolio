/* Shared building blocks for the warm, chunky design system. */

// Renders **bold** markers from data.js as <strong>.
export const RichText = ({ text }) =>
  String(text).split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold text-ink">{part}</strong> : <span key={i}>{part}</span>
  );

// Tags get one of three soft tints by theme, so color carries a little meaning:
// AI/technical work in cobalt, go-to-market in marigold, research/craft in moss.
const AI_TAGS = ["AI", "LLM", "MCP", "GPT", "Chatbot", "Embeddings", "NLP", "Machine Learning", "Automation", "Prompt Engineering", "Healthcare AI", "CRM Infrastructure", "Predictive Analytics", "Web Scraping", "Slack", "Data Viz", "Analytics", "Technical SEO"];
const GTM_TAGS = ["Go-to-Market", "GTM Strategy", "Lead Generation", "Lead Scoring", "Sales Enablement", "Sales Intelligence", "Growth", "Fintech", "Healthtech", "Marketing", "Product Marketing", "Competitive Intelligence", "SEO", "Social Media", "Optimization"];

export const Tag = ({ label }) => {
  const tone = AI_TAGS.includes(label)
    ? "bg-cobalt-soft text-ink"
    : GTM_TAGS.includes(label)
      ? "bg-marigold-soft text-ink"
      : "bg-moss-soft text-ink";
  return <span className={`inline-block text-[11.5px] font-medium px-2 py-0.5 rounded-full ${tone}`}>{label}</span>;
};

export const SectionHead = ({ title, children, id }) => (
  <div className="mb-8 max-w-[62ch]">
    <h2 id={id} className="display text-[2rem] md:text-[2.5rem] font-extrabold">{title}</h2>
    {children && <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{children}</p>}
  </div>
);

export const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`px-5 md:px-8 py-14 md:py-20 scroll-mt-16 ${className}`}>
    <div className="max-w-[1040px] mx-auto">{children}</div>
  </section>
);

// A metric: big display number with its label underneath.
export const Metric = ({ v, l, size = "md" }) => (
  <div>
    <div className={`display font-extrabold text-ink ${size === "lg" ? "text-3xl" : "text-2xl"}`}>{v}</div>
    <div className="text-[12.5px] leading-snug text-muted mt-1">{l}</div>
  </div>
);
