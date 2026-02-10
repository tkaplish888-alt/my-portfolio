import { useState, useEffect, useRef } from "react";
import {
  Sparkles, Brain, Target, PenTool, BarChart3, MessageSquare,
  Mail, Linkedin, MapPin, ArrowUpRight, ArrowLeft,
  Layers, Lightbulb, Cpu, Megaphone, Users, BookOpen,
  Terminal, CheckCircle2, Bot, Zap, FileText,
  ChevronDown, Coffee, Search, Puzzle, Award, X,
  Wand2
} from "lucide-react";

/* ═══════════════════════════════════════════════
   COLOR SYSTEM
   ═══════════════════════════════════════════════ */
const C = {
  bg: "#FDFCFA", surface: "#F7F5F2", surface2: "#F0EDE8",
  border: "#E8E4DE", accent: "#C47A4A", accentLight: "#F5EDE6",
  text: "#2C2521", textSec: "#6B6058", muted: "#9C9389",
};

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
  "Go-to-Market": { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A" },
  Marketing: { bg: "#FFF7ED", text: "#9A3412", border: "#FED7AA" },
  "Content Strategy": { bg: "#ECFDF5", text: "#065F46", border: "#A7F3D0" },
  "User Research": { bg: "#F0F9FF", text: "#075985", border: "#BAE6FD" },
  AI: { bg: "#F5F3FF", text: "#5B21B6", border: "#DDD6FE" },
  "Healthcare AI": { bg: "#FFF1F2", text: "#9F1239", border: "#FECDD3" },
  Analytics: { bg: "#EEF2FF", text: "#3730A3", border: "#C7D2FE" },
  Chatbot: { bg: "#FDF4FF", text: "#86198F", border: "#F5D0FE" },
  UX: { bg: "#F0FDFA", text: "#115E59", border: "#99F6E4" },
  Branding: { bg: "#F5EDE6", text: "#92552A", border: "#E0CEBF" },
  Fintech: { bg: "#FEF9C3", text: "#854D0E", border: "#FEF08A" },
  Healthtech: { bg: "#FFE4E6", text: "#881337", border: "#FECDD3" },
  Growth: { bg: "#FFF7ED", text: "#C2410C", border: "#FDBA74" },
  "Prompt Engineering": { bg: "#F5F3FF", text: "#6D28D9", border: "#DDD6FE" },
  "Social Media": { bg: "#FDF2F8", text: "#9D174D", border: "#FBCFE8" },
  SEO: { bg: "#F0FDF4", text: "#166534", border: "#BBF7D0" },
  "Sales Enablement": { bg: "#FEF3C7", text: "#78350F", border: "#FDE68A" },
  Accessibility: { bg: "#DBEAFE", text: "#1E40AF", border: "#93C5FD" },
  "Data Viz": { bg: "#FEE2E2", text: "#991B1B", border: "#FECACA" },
  "Product Marketing": { bg: "#FFF7ED", text: "#C2410C", border: "#FDBA74" },
  GPT: { bg: "#F5F3FF", text: "#6D28D9", border: "#DDD6FE" },
  "Voice of Customer": { bg: "#FEF3C7", text: "#78350F", border: "#FDE68A" },
  Automation: { bg: "#EEF2FF", text: "#3730A3", border: "#C7D2FE" },
};
const Tag = ({ label }) => {
  const c = tagPalette[label] || { bg: C.surface, text: C.textSec, border: C.border };
  return <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded border" style={{ backgroundColor: c.bg, color: c.text, borderColor: c.border }}>{label}</span>;
};

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif", color: C.text }}>{title}</h2>
    {subtitle && <p className="text-sm mt-1.5 leading-relaxed" style={{ color: C.muted }}>{subtitle}</p>}
    <div className="w-12 h-0.5 mt-3 rounded-full" style={{ backgroundColor: C.accent }} />
  </div>
);

/* All three callouts now share the same surface style, no accent highlight */
const Callout = ({ icon: Icon, title, children }) => (
  <div className="rounded-lg border px-5 py-4 transition-all duration-300 hover:shadow-md"
    style={{ backgroundColor: C.surface, borderColor: C.border }}>
    <div className="flex gap-3 items-start">
      {Icon && <div className="mt-0.5 shrink-0"><Icon size={18} style={{ color: C.accent }} /></div>}
      <div>
        {title && <span className="font-semibold text-sm block mb-1" style={{ color: C.text }}>{title}</span>}
        <div className="text-sm leading-relaxed" style={{ color: C.textSec }}>{children}</div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   DATA: CORE PROJECTS (with granular deep dives)
   ═══════════════════════════════════════════════ */
const projects = [
  {
    id: "valur", title: "Building Marketing from Zero at Valur",
    tags: ["Go-to-Market", "Fintech", "Sales Enablement", "Analytics"],
    oneLiner: "First marketing hire. Built the entire function from scratch: campaigns, positioning, pipeline.",
    problem: "Valur is a fintech startup that makes tax optimization tools, traditionally reserved for the ultra-wealthy, accessible to everyday Americans. When I joined as the first marketing hire, there was no marketing function at all. No campaigns, no content engine, no lead nurture sequences, no positioning documents, no partner outreach playbook. The sales team was closing deals without any top-of-funnel support. Everything had to be designed, built, and shipped from scratch, while the company was actively selling.",
    research: "I started by sitting in on sales calls and reading through dozens of transcripts to understand how prospects actually talked about tax planning, the words they used, the objections they raised, and where they got stuck in the decision process. I mapped the competitive landscape of fintech tax platforms, analyzed messaging across competitor websites, email sequences, and ad copy. I then built a GPT-powered voice-of-customer program that could systematically extract buyer objections, language patterns, and decision-stage signals from call transcripts, so our messaging would be grounded in real buyer language, not internal assumptions.",
    solution: "I designed and launched the full marketing stack: a multi-touch email campaign sequence for new leads, a content calendar aligned to the buyer journey, partner outreach templates and follow-up sequences for the advisor partnerships team, and positioning frameworks for each of Valur's core products (CRTs, DAFs, GRATs). I built a GPT-powered sales enablement toolkit that let the sales team quickly surface relevant objection-handling content, and an AI-assisted VOC research pipeline that ran continuously in the background, processing new transcripts and updating the team's understanding of buyer sentiment. I also worked closely with the CEO to sharpen brand positioning and refine how Valur communicated its value proposition across all touchpoints.",
    results: "The first major email campaign achieved a 54.84% open rate and 4.71% CTR, roughly 3x industry benchmarks for fintech. Partner outreach sequences doubled discovery calls from 6 to 13 per week and tripled second-round calls from 1 to 7 within one week of launch. Multiple campaigns directly contributed to closed deals. The VOC program became a core part of how the marketing and sales teams aligned on messaging, and the sales enablement toolkit reduced time-to-content for the partnerships team by an estimated 40%."
  },
  {
    id: "yuzi", title: "GTM Strategy for AI-Powered Maternal Care",
    tags: ["Go-to-Market", "Healthtech", "User Research", "Growth"],
    oneLiner: "Led go-to-market for a wellness SaaS reimagining postpartum support.",
    problem: "Yuzi Care is an AI-powered maternal care marketplace designed to support new mothers through the postpartum period, connecting them with vetted providers, resources, and community. The company was early-stage and needed a go-to-market strategy that would validate product-market fit, generate early provider and customer adoption, and establish a brand presence in a category that barely existed. The challenge was twofold: the product was in a sensitive, trust-dependent space (maternal health), and the target audience, new and expecting mothers, was bombarded with noise from every wellness brand on the internet.",
    research: "I led a structured customer research initiative that achieved a 70% survey response rate, unusually high, which I attribute to designing the survey around empathy rather than feature validation. I mapped the full postpartum care journey from prenatal planning through the fourth trimester, identifying specific gaps where mothers felt unsupported, overwhelmed, or unable to find reliable resources. I conducted qualitative interviews with both mothers and providers to understand the two-sided marketplace dynamic. The research directly revealed that the biggest pain point wasn't finding providers, it was trusting them. That insight reshaped the product roadmap.",
    solution: "I led GTM planning alongside the founders, building the launch strategy across three pillars: provider acquisition, customer acquisition, and brand awareness. For providers, I designed cold outreach campaigns with personalized messaging frameworks. For customers, I built a LinkedIn content strategy that positioned Yuzi Care as a thought leader in the maternal wellness space. I developed the core brand messaging, value propositions for each audience segment, and a content calendar focused on building trust through education rather than promotion. I also created an early-stage growth experimentation framework to test channels and messaging at low cost before scaling.",
    results: "Cold outreach campaigns achieved a 46% CTR. LinkedIn content drove a 65% engagement lift month-over-month. Early adoption improved by approximately 10% after the GTM strategy was implemented. Most significantly, the customer research I led directly reshaped the product roadmap, the founders reprioritized provider verification and trust signals based on the insight that trust, not discovery, was the primary barrier. The brand messaging I developed became the foundation for all subsequent marketing materials."
  },
  {
    id: "dcenter", title: "Marketing Automation at UW Disability Cultural Center",
    tags: ["Marketing", "SEO", "Accessibility", "Content Strategy"],
    oneLiner: "Website redesign, accessible newsletters with voice narration, and A/B testing that moved the needle.",
    problem: "The Disability Cultural Center at the University of Washington had a fragmented digital presence: two separate versions of the website (a text-based version and a graphic version) that split the user experience and undermined accessibility. The newsletter program was underperforming with a 0.1% click rate. There was no SEO strategy, no consistent content architecture, and no data-driven approach to engagement. For a center whose mission is inclusion, the digital experience was inadvertently creating barriers.",
    research: "I conducted a comprehensive website audit using Google Search Console, Yoast SEO, and Screaming Frog to identify technical SEO gaps, broken links, missing alt text, and content quality issues. I developed target personas for the center's diverse audience, students with disabilities, allies, faculty, and community members, and mapped their user journeys through the site. I performed semantic keyword research and thematic clustering to understand what content the audience was actually searching for. I also analyzed newsletter engagement data to identify patterns in what subject lines, content formats, and send times performed best.",
    solution: "I spearheaded a full WordPress website redesign that unified the two separate site versions into a single accessible platform integrating WCAG 2.1 standards and SEO best practices. I used HTML and CSS to build custom event landing pages and embedded forms. I redesigned the newsletter program in Mailchimp, implementing A/B testing on subject lines and content formats. I introduced an innovative voice-narrated version of the newsletter, initially designed for users with visual impairments, which ended up driving engagement across all segments. I created a revised sitemap using Miro, eliminating redundant pages and consolidating content based on behavioral insights. I implemented thematic clustering and semantic keyword strategies across all content pages.",
    results: "Newsletter click rates jumped from 0.1% to 3.8%, a 38x improvement driven by A/B testing and the voice-narrated format. The voice narration feature received overwhelmingly positive community feedback and became a permanent part of the newsletter. The unified website eliminated the fragmented user experience, improved navigation, and increased overall site engagement by 20%. The revised site architecture and SEO strategy improved search visibility for key terms related to disability resources and accessibility on campus."
  },
  {
    id: "drfirst", title: "Strategic Marketing at DrFirst",
    tags: ["Healthcare AI", "Social Media", "Branding"],
    oneLiner: "Social strategy, competitive intel, crisis comms, and a custom GPT. All in one summer.",
    problem: "DrFirst is a healthcare technology company specializing in e-prescribing and medication management. During my summer internship, the company needed to increase brand engagement for its iPrescribe product, conduct competitive intelligence to inform strategic decisions, establish crisis preparedness protocols, and maintain brand consistency across a growing volume of content. These were four distinct challenges that needed to be addressed simultaneously within a compressed timeline.",
    research: "For the social media strategy, I analyzed engagement patterns across DrFirst's existing social channels and benchmarked against competitor healthcare brands. For competitive intelligence, I developed an in-depth stakeholder survey designed to align CI research with the specific needs of individual users across the organization, ensuring that the intelligence gathered would be actionable, not just informational. I evaluated competitors' marketing channels, messaging, unique selling propositions, and pricing strategies to identify gaps DrFirst could exploit. For the crisis communications plan, I researched industry best practices and analyzed recent healthcare tech crises to inform the trigger tree framework.",
    solution: "I delivered four major projects: (1) A comprehensive social media content strategy for iPrescribe, including content pillars, posting cadence, creative direction, and engagement tactics designed to humanize a compliance-heavy product. (2) A competitive intelligence audit with stakeholder-aligned research that gave leadership actionable insights tied to strategic priorities. (3) A crisis communications scenario plan including a trigger tree that mapped potential crisis types to response protocols, escalation paths, and messaging templates. (4) A custom GPT model trained on DrFirst's brand guidelines, product positioning, and approved messaging, enabling any team member to produce on-brand content without going through lengthy review cycles.",
    results: "The social media strategy drove a significant increase in engagement metrics for iPrescribe and improved overall brand loyalty signals. The competitive intelligence work was adopted as a reference framework for ongoing strategic planning. The crisis communications plan gave the team a structured, ready-to-deploy response framework. The custom GPT reduced content review cycles and enabled non-marketing team members to write on-brand materials independently. I was recognized by leadership for jumping in and contributing immediately, receiving a company High Five award within the first week."
  },
  {
    id: "beech", title: "Marketing Consulting for Beecher's Handmade Cheese",
    tags: ["Marketing", "Branding", "Content Strategy", "User Research"],
    oneLiner: "Full-funnel marketing strategy for an artisanal brand entering new markets.",
    problem: "Beecher's Handmade Cheese is an artisanal cheese company with a strong local reputation but limited brand awareness beyond its home market. The company faced challenges differentiating from mass-produced cheese brands, lacked a cohesive marketing strategy across channels, had inconsistent brand messaging and positioning, underutilized digital marketing platforms, and had an unclear understanding of target audience preferences and behaviors. They needed a comprehensive strategy that could convey the value proposition of handmade, artisanal cheese to a broader audience without diluting the brand's craft identity.",
    research: "Our team conducted in-depth market analysis of the artisanal cheese industry, including consumer trends in specialty foods, growth opportunities, and potential market segments. We evaluated strategies of both direct artisanal competitors and larger cheese brands, analyzing their marketing channels, messaging, and unique selling propositions to identify gaps Beecher's could fill. We created detailed buyer personas using demographic, psychographic, and behavioral data. This included conducting interviews and surveys with existing and potential customers, and developing empathy maps to understand customer pain points, from the overwhelm of choosing at the cheese counter to the desire to feel like a knowledgeable food enthusiast.",
    solution: "We developed a comprehensive marketing strategy with seven integrated components: (1) Brand positioning that refined Beecher's unique selling proposition around craftsmanship, quality, and tradition. (2) A brand voice and messaging framework with a brand story emphasizing the maker's journey. (3) Overarching campaign themes including seasonal promotions and product-specific campaigns. (4) Creative concept exploration with mood boards and visual direction that showcased the cheese-making process. (5) A channel strategy tailored to target audience behavior across social media, email, and content marketing. (6) A content strategy focused on education, engagement, and conversion, including draft blog posts, social content, and video scripts. (7) A measurement framework with KPIs for every initiative.",
    results: "The project delivered a clear, implementable brand positioning strategy that differentiated Beecher's from both mass-market and competing artisanal brands. Well-defined audience personas gave the company a foundation for targeted marketing. The multi-channel plan included draft content ready for refinement. Creative campaign concepts were directly actionable. The measurement framework provided a system for tracking ROI and optimizing future campaigns. The strategy was presented to Beecher's stakeholders and received positive feedback as a viable roadmap for market expansion."
  },
  {
    id: "tizana", title: "Product Marketing at Tizana Mexicana",
    tags: ["Product Marketing", "Social Media", "Branding", "User Research"],
    oneLiner: "Storytelling-driven product marketing for a startup preserving Mexican artisan culture.",
    problem: "Tizana Mexicana is a startup focused on selling authentic, locally sourced Mexican handcrafted products. They faced limited brand awareness in a competitive market, difficulty communicating the value of handcrafted authenticity, no cohesive product marketing strategy, and the complex challenge of balancing business growth with supporting local artisans and cultural preservation. The product story, artisans in small Mexican communities making beautiful things by hand, was powerful, but it wasn't being told in a way that reached or moved the right people.",
    research: "I conducted in-depth customer research including interviews that allowed us to segment the audience into three distinct personas: cultural enthusiasts (drawn to authenticity and story), ethical shoppers (motivated by sustainability and fair trade), and local community supporters (invested in small business and cultural preservation). I performed a competitive deep-dive analyzing messaging, pricing strategies, and go-to-market approaches of similar brands. I mapped the full customer decision journey from discovery to purchase, identifying that the emotional connection to the artisan's story was the single most powerful conversion driver, but it was buried on the website and absent from social media.",
    solution: "I built a message house framework that articulated brand values, product benefits, and emotional narratives across all channels. I developed the overarching brand narrative centered on artisans' journeys, cultural significance, and customer impact. I produced creative assets including artisan interview videos and product journey content tailored for website, social media, and sales decks. I executed the holiday-focused 'Unwrap a Legacy' campaign that positioned handcrafted products as meaningful gifts rooted in Mexican traditions. I integrated customer insights into every product launch, ensuring alignment with customer values and cultural traditions. I also created a social media content calendar and executed ongoing campaigns.",
    results: "Social media engagement grew by 25%. Website traffic increased by 20%. Customer feedback consistently cited stronger emotional connection with the brand. The storytelling-driven approach created a cohesive narrative that elevated Tizana Mexicana's market presence, increased visibility, and, most importantly, supported local artisans by connecting their work with people who genuinely valued it."
  },
  {
    id: "wholef", title: "UX Research for Amazon Whole Foods",
    tags: ["UX", "User Research", "Analytics"],
    oneLiner: "End-to-end UX research that improved discoverability and personalization.",
    problem: "Amazon's Whole Foods Service within the app suffered from poor service discoverability, many Amazon users didn't know the Whole Foods delivery option existed or couldn't find it easily. The user experience was suboptimal, with inefficient navigation, a lack of personalized product recommendations, and friction points throughout the ordering process. The challenge was to diagnose these issues systematically and develop evidence-based design recommendations.",
    research: "I created detailed user personas representing the primary Whole Foods online customer segments. I designed and conducted an extensive user survey to quantify pain points across the experience. I developed a thorough heuristics evaluation report assessing the interface against established usability principles. I then created a usability testing script and conducted in-depth moderated usability tests with target users, observing them as they attempted key tasks, finding the Whole Foods service, browsing products, adding items to cart, and completing checkout. I analyzed all collected data to identify patterns, ranking issues by severity and frequency.",
    solution: "Based on the research findings, I developed a set of design recommendations addressing three core issues: (1) Discoverability: proposed changes to navigation hierarchy and entry points that would make the Whole Foods service more visible within the Amazon app without adding clutter. (2) Personalization: recommended an AI-based personalized product recommendation system that would learn from purchase history and browsing behavior. (3) Navigation: proposed a streamlined information architecture for the Whole Foods section that reduced clicks-to-purchase and organized products in a way that matched mental models observed in testing. I packaged all findings into comprehensive UX strategy deliverables.",
    results: "The research identified specific, actionable fixes for discoverability that could be implemented quickly. The personalization recommendations were supported by clear user data showing demand for tailored experiences. The navigation proposals reduced theoretical clicks-to-purchase by 30%. All deliverables were structured as a comprehensive UX strategy package designed to inform both immediate fixes and long-term product roadmap decisions."
  },
  {
    id: "content-web", title: "Content Strategy for University Web",
    tags: ["Content Strategy", "UX", "Accessibility"],
    oneLiner: "Redesigned international student web content for clarity, inclusivity, and reduced cognitive load.",
    problem: "The University of Washington's Communication Leadership program website had an international student section that caused significant frustration. International students, more than 25% of the student body, faced usability issues, inaccessible content, and high cognitive load, particularly for non-native English speakers. The site architecture didn't match how international students actually looked for information, application guidance was scattered across multiple pages, and the tone felt institutional rather than welcoming.",
    research: "I conducted usability testing with diverse groups of international students from different countries, language backgrounds, and program stages. I analyzed the existing site architecture to identify where users got lost, where they abandoned tasks, and what content they couldn't find. I mapped user journeys for key tasks, understanding program requirements, navigating the application process, finding financial aid information, and accessing student support services. The research revealed that the primary issue wasn't missing content, it was content organization and language complexity that created unnecessary cognitive burden.",
    solution: "I reorganized the entire site architecture based on how international students actually think about and search for information, rather than how the university internally organized it. I rewrote all content for clarity, inclusivity, and cultural sensitivity, shortening sentences, removing jargon, adding contextual explanations for U.S.-specific concepts. I implemented responsive design elements, accessibility features including proper heading hierarchy and screen reader optimization, an FAQ section addressing the most common questions from usability testing, and a language selection tool. The redesign focused on reducing cognitive load at every step.",
    results: "The revamped section delivered intuitive navigation with significantly shorter paths to key information. Content was clear, concise, and culturally inclusive. The design was mobile-friendly and accessible. The application process was streamlined with step-by-step guidance. Non-native English speakers reported reduced cognitive load in follow-up testing. The overall experience reflected the university's commitment to its global student community."
  },
  {
    id: "strat-comm", title: "Strategic Communications at Braxton Institute",
    tags: ["Marketing", "Content Strategy", "Social Media"],
    oneLiner: "First newsletter, 71.4% open rate, multimedia content engine. Built from nothing.",
    problem: "The Braxton Institute, a social justice organization, lacked consistent branding and communication strategy. There was no regular newsletter to engage stakeholders, email marketing was underutilized, there was limited multimedia content across platforms, and no social media calendar or style guide. The organization had a powerful mission but wasn't communicating it effectively, donors, community members, and partners weren't being engaged between events. Everything needed to be built from the ground up.",
    research: "I conducted a thorough marketing audit analyzing existing communication touchpoints, brand consistency, audience engagement data, and competitive benchmarks against similar nonprofit organizations. I mapped stakeholder segments, donors, community members, partner organizations, board members, and identified what type of content each group found most engaging and what channels they preferred. I analyzed key metrics from any existing outreach to establish baselines and inform a data-driven approach.",
    solution: "I designed and launched the organization's first-ever monthly newsletter, developing the template, content strategy, and distribution plan. I created an email marketing campaign to re-engage lapsed donors and community members. I produced, recorded, and edited multimedia content, including social media content celebrating LGBTQIA+ history (Stonewall Riots series), video series teasers, and event highlight content. I established a structured social media calendar with content pillars tied to the organization's mission. I developed a comprehensive style guide to ensure brand consistency across all touchpoints. I also edited and reviewed blog content and pitched new content ideas to the board.",
    results: "The inaugural newsletter achieved a 71.4% open rate and 32.1% click-through rate, dramatically exceeding nonprofit industry averages of ~25% open and ~3% CTR. The email marketing campaign drove measurable increases in brand awareness and donor re-engagement. The multimedia content strategy elevated the organization's presence across platforms. The marketing audit and subsequent strategies laid a foundation for sustained, data-driven communication that continued after my departure."
  },
  {
    id: "dataviz", title: "Data Analytics & Visualization",
    tags: ["Analytics", "Data Viz"],
    oneLiner: "How age and income shape digital ad performance, told through data.",
    problem: "Marketers routinely make assumptions about how demographics influence digital ad performance, but those assumptions are often wrong or oversimplified. This project investigated the specific, sometimes surprising ways that age and income shape ad engagement and conversion rates, with the goal of producing actionable insights that could improve targeting and ad format decisions.",
    research: "I conducted a data-driven analysis using statistical methods including z-score standardization to compare CTR and conversion rate performance across age groups on a common scale. I explored how income levels correlated with ad format preferences and purchasing behavior. I analyzed datasets from the US Census Bureau (via Census Reporter) and digital advertising performance benchmarks. I used Datawrapper to create publication-quality visualizations including county-level demographic maps of Washington state, age-group comparison charts, and agricultural industry data visualizations.",
    solution: "I developed a comprehensive set of data visualizations that made complex patterns accessible and actionable. These included: a z-score comparison chart showing CTR vs. conversion rate deviation by age group (revealing that the 80+ demographic had the highest CTR but lowest conversion, a counterintuitive finding), county-level maps showing median age distribution and poverty rate variation across Washington state, and industry-specific charts analyzing farm operation sizes in California. Each visualization was accompanied by analysis text explaining the marketing implications and recommended targeting strategies.",
    results: "The analysis produced several actionable insights: seniors show high click-through rates but low conversion rates, except when engaging with video ads, which significantly boost their purchasing behavior. Younger audiences favor interactive ad formats. Income levels directly dictate whether users respond to luxury goods or everyday necessity positioning. These findings provide concrete guidance for marketers to optimize both ad format selection and audience targeting strategy."
  },
];

/* ═══════════════════════════════════════════════
   DATA: AI-DRIVEN MARKETING PROJECTS
   ═══════════════════════════════════════════════ */
const aiProjects = [
  {
    id: "voc", title: "GPT-Powered Voice-of-Customer Program",
    tags: ["AI", "Sales Enablement", "Voice of Customer", "Automation"],
    oneLiner: "An AI system that extracts buyer objections from sales calls, so marketing speaks the customer's language.",
    problem: "At Valur, marketing messaging was being written based on internal assumptions about what buyers cared about. Meanwhile, the sales team was having real conversations with real prospects every day, conversations full of specific objections, hesitations, and language patterns that marketing never saw. There was no systematic way to extract these insights from sales calls and feed them back into positioning, content, and campaign strategy. The gap between what marketing said and what buyers actually felt was growing wider with every campaign.",
    research: "I analyzed dozens of recorded sales call transcripts across different deal stages, initial discovery calls, follow-ups, and closed-won/closed-lost conversations. I identified recurring objection categories (cost concerns, trust in fintech, complexity of tax planning, comparison to traditional advisors), mapped language clusters that prospects used repeatedly, and documented decision-stage signals that indicated where a prospect was in their buying journey. I categorized objections by frequency, deal impact, and which ones the sales team could already handle versus which ones required new messaging or content.",
    solution: "I designed and built a GPT-powered pipeline that processes new sales call transcripts on an ongoing basis. The system extracts buyer objections, classifies them by type and deal stage, identifies the specific language patterns prospects use (not the language we'd use internally), and surfaces win/loss patterns, which objections correlated with closed deals vs. lost deals. The output fed directly into marketing: campaign copy was rewritten to address real objections, email sequences were restructured around the actual buyer journey, and the sales team received objection-handling one-pagers with language grounded in what prospects actually said. I also built a dashboard that let the marketing team monitor trending objections over time.",
    results: "Marketing messaging shifted from assumption-based to evidence-based. Campaign copy and email sequences were rewritten using the actual language patterns of buyers, leading to higher resonance and engagement. The system accelerated content production because writers had a clear, research-backed brief for every piece. The sales team reported that the objection-handling materials felt more relevant and useful. Win/loss patterns surfaced by the system directly informed strategic decisions about which buyer segments to prioritize and which messaging angles to retire."
  },
  {
    id: "drfirst-gpt", title: "Custom GPT for Healthcare Brand Consistency",
    tags: ["AI", "Healthcare AI", "Prompt Engineering", "GPT"],
    oneLiner: "A custom ChatGPT trained on DrFirst's brand voice, enabling consistent content at scale.",
    problem: "DrFirst produces content across multiple channels and teams, social media, blog posts, sales collateral, product marketing materials, and executive communications. Different people writing for the brand meant inconsistent voice, varying levels of accuracy in product positioning, and a slow review process to catch and correct deviations. In healthcare technology, where regulatory sensitivity and trust are paramount, brand inconsistency isn't just a marketing problem, it's a credibility risk. The company needed a way to maintain brand voice at scale without bottlenecking everything through one reviewer.",
    research: "I audited DrFirst's existing content across all channels, social posts, blog articles, email campaigns, sales decks, and product documentation. I identified specific patterns of inconsistency: tone shifts between formal and casual within the same channel, product claims that varied in specificity and accuracy, and messaging that sometimes emphasized features over outcomes. I mapped the brand's core voice attributes (authoritative but approachable, technically precise but accessible, compliance-aware but not fear-based) and documented where each channel deviated most from these attributes.",
    solution: "I built a custom GPT model specifically trained on DrFirst's brand guidelines, product positioning documents, approved messaging frameworks, and tone specifications. The model was designed so that any team member, not just the marketing team, could input a content request and receive output that was pre-aligned with DrFirst's voice, accurate in its product claims, and structured appropriately for the intended channel. I included guardrails for healthcare compliance language, a style guide reference layer, and prompt templates for common content types (social posts, blog outlines, email drafts, press release scaffolds). I tested the model against existing approved content to validate consistency before deployment.",
    results: "The custom GPT enabled team members across the organization to produce on-brand content independently, reducing the bottleneck on the marketing team. Content review cycles shortened significantly because the first drafts were already aligned with brand guidelines. The tool became particularly valuable for the sales team, who could quickly generate accurate product descriptions and objection-handling content without waiting for marketing support. It demonstrated how AI could be embedded into a marketing workflow not as a novelty but as an operational efficiency tool."
  },
  {
    id: "braxbot", title: "Conversational AI Chatbot: Braxbot",
    tags: ["Chatbot", "AI", "UX", "User Research"],
    oneLiner: "A conversational AI designed to make social justice resources accessible to the people who need them most.",
    problem: "The Braxton Institute is a social justice organization that provides resources, education, and support to marginalized communities. They faced a set of interconnected challenges: limited accessibility to information (people couldn't easily find what they needed), insufficient community engagement (stakeholders dropped off between events), lack of personalized educational support (resources were one-size-fits-all), and difficulty facilitating public conversations on sensitive topics at scale. The people who most needed the Institute's resources were often the least likely to navigate traditional website structures to find them.",
    research: "I conducted user research to understand how marginalized communities actually interact with organizational resources and support systems, where they look first, what language they use, what barriers prevent them from engaging, and what formats they prefer. I gathered requirements from the Institute's staff about their most common inquiries and pain points in serving their community. I analyzed existing chatbot implementations in adjacent spaces (healthcare, education, crisis support) to identify best practices and common pitfalls, particularly around cultural sensitivity, tone, and trust-building in AI interactions with vulnerable populations. I also prototyped conversational flows and tested them with potential users.",
    solution: "I designed 'Braxbot', a conversational AI chatbot with four core design pillars: (1) Empathetic personality: the bot was designed to communicate with warmth, patience, and cultural awareness, never making users feel judged for their questions. (2) Culturally sensitive visual representation: the avatar and interface design reflected the community the Institute serves. (3) Crisis communication capabilities: the bot could recognize language patterns suggesting a user in crisis and seamlessly escalate to human support or provide emergency resources. (4) Tailored conversational flows: different entry paths for different audiences (community members seeking resources, educators looking for materials, potential donors wanting to learn more). I developed a full implementation proposal including technical architecture, content strategy, conversation design, and success metrics.",
    results: "The proposed chatbot solution was designed to increase accessibility to information and support, enhance community engagement between events, provide personalized educational content based on user needs and interests, facilitate public conversations on social justice topics in a safe environment, and reduce staff workload for routine inquiries. The project demonstrated the potential for conversational AI to serve communities that traditional digital interfaces often fail, and provided a replicable model for other mission-driven organizations."
  },
];

/* ═══════════════════════════════════════════════
   DATA: TIMELINE
   ═══════════════════════════════════════════════ */
const timeline = [
  { role: "Marketing Operations Analyst", note: "First Marketing Hire", company: "Valur", period: "2024 – Present",
    desc: "Built the marketing function from zero. Email campaigns hitting 54.84% open rate. Doubled partner calls in one week. Designed AI-powered systems that now run continuously: a GPT pipeline that extracts buyer objections and language patterns from sales call transcripts to ground all messaging in real customer language, and a sales enablement toolkit that lets the partnerships team generate on-brand, objection-specific content in minutes instead of days.", current: true },
  { role: "Product Marketing & Growth", company: "Yuzi Care", period: "2023 – 2024",
    desc: "Led GTM for an AI-powered maternal care marketplace. 46% cold outreach CTR, 65% LinkedIn engagement lift. Research that directly reshaped the product roadmap." },
  { role: "Marketing Communications Intern", company: "DrFirst", period: "2023",
    desc: "Social strategy for iPrescribe, competitive intelligence, crisis comms planning, and a custom GPT for brand consistency." },
  { role: "Graduate Marketing Specialist", company: "UW Disability Cultural Center", period: "2022 – 2023",
    desc: "Website redesign, accessible newsletters, community campaigns. 20% site engagement increase. Newsletter CTR from 0.1% to 3.8%." },
];

/* ═══════════════════════════════════════════════
   DATA: WRITING
   ═══════════════════════════════════════════════ */
const writings = [
  { title: "Braxton Institute: Blog Editor", desc: "Edited and published blog content for a racial justice organization.", href: "https://www.braxtoninstitute.org/blog" },
  { title: "When Was the Last Time You Listened to Nature?", desc: "An essay on mindful engagement with the natural world.", href: "https://www.listeninginn.com/post/when-was-the-last-time-you-listened-to-nature" },
  { title: "Why Listen to Opposing Opinions?", desc: "On intellectual empathy and conversations that change your mind.", href: "https://www.listeninginn.com/post/why-and-how-should-we-listen-to-people-with-opposing-opinions" },
  { title: "Turning The Inside Out: Bo Burnham's 'Inside'", desc: "A critical reading as counter-cinema.", href: "https://www.academia.edu/89458699/Turning_The_Inside_Out_Reading_Bo_Burnhams_Inside_As_Counter_Cinema" },
  { title: "Italian Renaissance Art and Literature", desc: "Academic essay on visual art and literary traditions.", href: "https://www.academia.edu/89529561/Italian_Renaissance_Art_and_Literature" },
  { title: "Braxton Institute: Newsletter", desc: "Fundraising and engagement newsletters. 71.4% open rate.", href: "https://www.braxtoninstitute.org/blog" },
];

/* ═══════════════════════════════════════════════
   DEEP DIVE PAGE
   ═══════════════════════════════════════════════ */
const ProjectDeepDive = ({ project, onBack }) => (
  <div className="pt-24 pb-16 px-6">
    <div className="max-w-[800px] mx-auto">
      <Reveal>
        <button onClick={onBack} className="flex items-center gap-2 text-sm mb-8 cursor-pointer transition-colors"
          style={{ color: C.muted }} onMouseEnter={e => e.currentTarget.style.color = C.accent}
          onMouseLeave={e => e.currentTarget.style.color = C.muted}>
          <ArrowLeft size={14} /> Back to portfolio
        </button>
      </Reveal>
      <Reveal delay={50}>
        <h1 className="text-3xl font-semibold mb-3" style={{ fontFamily: "'IBM Plex Serif',Georgia,serif", color: C.text }}>{project.title}</h1>
        <div className="flex flex-wrap gap-1.5 mb-10">{project.tags.map(t => <Tag key={t} label={t} />)}</div>
      </Reveal>
      {[
        { icon: Puzzle, label: "The Problem", content: project.problem },
        { icon: Search, label: "The Research", content: project.research },
        { icon: Lightbulb, label: "The Solution", content: project.solution },
        { icon: Award, label: "The Results", content: project.results },
      ].map((s, i) => (
        <Reveal key={i} delay={100 + i * 100}>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <s.icon size={15} style={{ color: C.accent }} />
              <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: C.accent }}>{s.label}</h3>
            </div>
            <div className="rounded-lg border px-5 py-4" style={{ backgroundColor: C.surface, borderColor: C.border }}>
              <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{s.content}</p>
            </div>
          </div>
        </Reveal>
      ))}
      <Reveal delay={550}>
        <button onClick={onBack} className="flex items-center gap-2 text-sm mt-6 cursor-pointer transition-colors"
          style={{ color: C.muted }} onMouseEnter={e => e.currentTarget.style.color = C.accent}
          onMouseLeave={e => e.currentTarget.style.color = C.muted}>
          <ArrowLeft size={14} /> Back to portfolio
        </button>
      </Reveal>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   BUILT-WITH-AI POPUP
   ═══════════════════════════════════════════════ */
const BuiltWithAI = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium shadow-lg transition-all cursor-pointer hover:scale-105"
        style={{ backgroundColor: C.bg, borderColor: C.border, color: C.textSec }}>
        <Wand2 size={13} style={{ color: C.accent }} /> Built with zero code
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(44,37,33,0.4)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)}>
          <div className="rounded-2xl border p-6 md:p-8 max-w-lg w-full relative" onClick={e => e.stopPropagation()}
            style={{ backgroundColor: C.bg, borderColor: C.border, boxShadow: "0 25px 60px rgba(44,37,33,0.15)" }}>
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 cursor-pointer" style={{ color: C.muted }}><X size={18} /></button>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} style={{ color: C.accent }} />
              <h3 className="text-lg font-semibold" style={{ fontFamily: "'IBM Plex Serif',Georgia,serif", color: C.text }}>This portfolio wrote itself</h3>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: C.textSec }}>
              Well, almost. I built this entire site using <strong style={{ color: C.text }}>Claude Opus 4.6</strong> and <strong style={{ color: C.text }}>Cursor IDE</strong>. No manual coding, no templates, no drag-and-drop builders.
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: C.textSec }}>
              Every component, interaction, and design decision was generated through structured prompts. I directed the architecture, the copy, the design system, and the interaction patterns. The AI handled the code. It's how I think about tools: learn the logic, direct the output, ship the thing.
            </p>
            <div className="rounded-lg border p-4 mb-4" style={{ backgroundColor: C.surface, borderColor: C.border }}>
              <p className="text-xs font-semibold mb-2" style={{ color: C.text }}>The stack:</p>
              <div className="text-xs space-y-2" style={{ fontFamily: "'IBM Plex Mono',monospace", color: C.textSec }}>
                {["React 18 + Vite + Tailwind CSS v4","Lucide Icons · IBM Plex Serif + Inter fonts","Single-file architecture, zero build complexity","Scroll animations, expandable cards, interactive counters","Content extracted and restructured via AI prompts","Warm Notion/Claude-inspired design system"].map((s, i) => (
                  <div key={i} className="flex items-start gap-2"><CheckCircle2 size={11} style={{ color: C.accent }} className="mt-0.5 shrink-0" />{s}</div>
                ))}
              </div>
            </div>
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'IBM Plex Mono',monospace" }}>February 2026 · Model: Claude Opus 4.6 · IDE: Cursor</p>
          </div>
        </div>
      )}
    </>
  );
};

/* ═══════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════ */
const Nav = ({ onHome }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }); };
  const links = [["about","About"],["work","Work"],["projects","Projects"],["ai-lab","AI-Driven"],["writing","Writing"],["contact","Contact"]];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ backgroundColor: scrolled ? "rgba(253,252,250,0.92)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent" }}>
      <div className="max-w-[800px] mx-auto px-6 h-14 flex items-center justify-between">
        <button onClick={onHome} className="text-lg font-semibold tracking-tight cursor-pointer" style={{ fontFamily: "'IBM Plex Serif',Georgia,serif", color: C.text }}>TK</button>
        <div className="hidden md:flex items-center gap-5 text-sm">
          {links.map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="transition-colors cursor-pointer"
              style={{ color: C.muted }} onMouseEnter={e => e.target.style.color = C.accent} onMouseLeave={e => e.target.style.color = C.muted}>{label}</button>
          ))}
        </div>
        <div className="flex md:hidden items-center gap-3 text-xs">
          {[["about","About"],["projects","Projects"],["contact","Contact"]].map(([id,label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="cursor-pointer" style={{ color: C.muted }}>{label}</button>
          ))}
        </div>
      </div>
    </nav>
  );
};

/* ═══════════════════════════════════════════════
   EXPANDABLE PROJECT CARD
   ═══════════════════════════════════════════════ */
const ProjectCard = ({ project, onDeepDive }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-xl border transition-all duration-300"
      style={{ backgroundColor: C.bg, borderColor: expanded ? C.accent : C.border, boxShadow: expanded ? "0 4px 16px rgba(196,122,74,0.08)" : "none" }}>
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-5 cursor-pointer">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-semibold leading-snug pr-2" style={{ fontFamily: "'IBM Plex Serif',Georgia,serif", color: C.text }}>{project.title}</h3>
          <ChevronDown size={14} className="shrink-0 mt-1 transition-transform duration-300" style={{ color: C.muted, transform: expanded ? "rotate(180deg)" : "rotate(0)" }} />
        </div>
        <p className="text-xs leading-relaxed mb-3" style={{ color: C.muted }}>{project.oneLiner}</p>
        <div className="flex flex-wrap gap-1.5">{project.tags.map(t => <Tag key={t} label={t} />)}</div>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: expanded ? "300px" : "0" }}>
        <div className="px-5 pb-5 pt-0">
          <div className="border-t pt-4 mb-3" style={{ borderColor: C.border }}>
            <p className="text-xs leading-relaxed mb-2" style={{ color: C.textSec }}><strong style={{ color: C.text }}>Problem:</strong> {project.problem.substring(0, 150)}...</p>
            <p className="text-xs leading-relaxed" style={{ color: C.textSec }}><strong style={{ color: C.text }}>Result:</strong> {project.results.substring(0, 150)}...</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onDeepDive(project.id); }}
            className="flex items-center gap-1.5 text-xs font-medium cursor-pointer transition-opacity"
            style={{ color: C.accent }} onMouseEnter={e => e.currentTarget.style.opacity = 0.7} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
            Full deep dive <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════ */
export default function Portfolio() {
  const [deepDiveId, setDeepDiveId] = useState(null);
  const allProjects = [...projects, ...aiProjects];
  const activeProject = allProjects.find(p => p.id === deepDiveId);
  const goHome = () => { setDeepDiveId(null); window.scrollTo(0, 0); };
  const openDeepDive = (id) => { setDeepDiveId(id); window.scrollTo(0, 0); };

  if (activeProject) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: C.bg, color: C.text, fontFamily: "'Inter',sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <Nav onHome={goHome} />
        <ProjectDeepDive project={activeProject} onBack={goHome} />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.bg, color: C.text, fontFamily: "'Inter',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Nav onHome={goHome} />
      <BuiltWithAI />

      {/* ── HERO ── */}
      <header className="pt-28 pb-16 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-2 text-sm mb-6" style={{ fontFamily: "'IBM Plex Mono',monospace", color: C.muted }}>
              <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: C.accent }} />
              Seattle, WA
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-5" style={{ fontFamily: "'IBM Plex Serif',Georgia,serif" }}>
              Tonishqa Kaplish
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lg leading-relaxed max-w-xl mb-3" style={{ fontFamily: "'IBM Plex Serif',Georgia,serif", fontStyle: "italic", color: C.textSec }}>
              I build marketing systems that listen before they sell.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-base leading-relaxed max-w-xl mb-8" style={{ color: C.textSec }}>
              I've built marketing functions from scratch and shipped go-to-market strategies across fintech and healthtech, using AI not as a shortcut, but as infrastructure. I design systems that surface real buyer language, automate insight extraction, and turn research into campaigns that move pipeline.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="flex flex-wrap items-center gap-3">
              <a href="https://drive.google.com/file/d/1T-C7rqrs5Hjn61aavQDGebtuAmQkTHoA/view" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors" style={{ backgroundColor: C.text, color: C.bg }}>
                <FileText size={15} /> Resume
              </a>
              <a href="http://www.linkedin.com/in/tonishqa" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border transition-all" style={{ borderColor: C.border, color: C.textSec }}>
                <Linkedin size={15} /> LinkedIn
              </a>
              <a href="https://calendly.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border transition-all" style={{ borderColor: C.border, color: C.textSec }}>
                <Coffee size={15} /> Schedule a virtual coffee with me
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ── ABOUT ── */}
      <section id="about" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="About" /></Reveal>
          <Reveal delay={100}>
            <div className="space-y-4 mb-8">
              <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>I geek out on understanding why people choose what they choose. What they're afraid of, what they actually want, what language they use when nobody's optimizing for keywords. Then I turn that into positioning, campaigns, and systems that work, because they started from something true.</p>
              <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>I use AI to build that bridge faster: extracting buyer language from sales transcripts, automating competitive intelligence, training custom models on brand voice so entire teams can ship on-message content without bottlenecks. I don't just use AI tools. I design AI-driven marketing workflows.</p>
              <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>I've worked across fintech, healthtech, and maternal care. Industries where you earn trust or you earn nothing.</p>
            </div>
          </Reveal>
          {/* All three callouts, same style, no highlighted accent */}
          <Reveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Callout icon={Target} title="Marketing">
                Campaigns, segmentation, growth experiments. 54.84% email open rates. I start with research and let the data do the talking.
              </Callout>
              <Callout icon={BookOpen} title="Storytelling">
                65% LinkedIn engagement lift. Messaging that founders trusted on their homepage. I care about getting the words right.
              </Callout>
              <Callout icon={Users} title="User Research">
                Built a GPT-powered VOC program. 70% survey response rates that reshaped product roadmaps. I show up with what users actually said.
              </Callout>
            </div>
          </Reveal>
          {/* Toolkit. NOT clickable */}
          <Reveal delay={300}>
            <div className="mt-10">
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: C.muted }}>Toolkit</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {[
                  { icon: Megaphone, label: "Go-to-Market" }, { icon: BarChart3, label: "Marketing Analytics" },
                  { icon: Brain, label: "AI / LLM Workflows" }, { icon: PenTool, label: "Content Strategy" },
                  { icon: Users, label: "User Research" }, { icon: MessageSquare, label: "Conversational AI" },
                  { icon: Layers, label: "Product Marketing" }, { icon: Lightbulb, label: "Brand Storytelling" },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium"
                    style={{ backgroundColor: C.bg, borderColor: C.border, color: C.textSec }}>
                    <Icon size={13} style={{ color: C.accent }} className="shrink-0" />{label}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="work" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="Experience" subtitle="From strategic communications to AI-native marketing operations." /></Reveal>
          <div className="relative ml-4 md:ml-8">
            <div className="absolute left-0 top-2 bottom-2 w-px" style={{ backgroundColor: C.border }} />
            {timeline.map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="relative pl-8 pb-10 last:pb-0">
                  <div className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full border-2 -translate-x-1"
                    style={{ backgroundColor: item.current ? C.accent : C.bg, borderColor: item.current ? C.accent : "#D1CBC3", boxShadow: item.current ? "0 0 0 3px rgba(196,122,74,0.15)" : "none" }} />
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 mb-1">
                    <h3 className="text-base font-semibold" style={{ fontFamily: "'IBM Plex Serif',Georgia,serif", color: C.text }}>{item.role}</h3>
                    <span className="text-sm font-medium" style={{ color: C.accent }}>{item.company}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs" style={{ fontFamily: "'IBM Plex Mono',monospace", color: C.muted }}>{item.period}</span>
                    {item.note && <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: C.accentLight, color: C.accent }}>{item.note}</span>}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="Projects" subtitle="Click to preview. Expand for the snapshot. Deep dive for the full story." /></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}><ProjectCard project={p} onDeepDive={openDeepDive} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI-DRIVEN MARKETING ── */}
      <section id="ai-lab" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <SectionHeader title="AI-Driven Marketing" subtitle="Systems I've designed where AI is the infrastructure, not the afterthought." />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiProjects.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}><ProjectCard project={p} onDeepDive={openDeepDive} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WRITING ── */}
      <section id="writing" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="Writing" subtitle="Blogs, essays, newsletters, and thought pieces." /></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {writings.map((w, i) => (
              <Reveal key={i} delay={i * 60}>
                <a href={w.href} target="_blank" rel="noopener noreferrer"
                  className="group block rounded-xl border p-5 transition-all duration-300"
                  style={{ backgroundColor: C.bg, borderColor: C.border }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.boxShadow = "0 4px 16px rgba(196,122,74,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}>
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="text-sm font-semibold leading-snug pr-2" style={{ fontFamily: "'IBM Plex Serif',Georgia,serif", color: C.text }}>{w.title}</h3>
                    <ArrowUpRight size={13} style={{ color: "#D1CBC3" }} className="shrink-0 mt-0.5" />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{w.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="Let's Connect" /></Reveal>
          <Reveal delay={100}>
            <div className="rounded-xl border p-6 md:p-8" style={{ backgroundColor: C.surface, borderColor: C.border }}>
              <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: C.textSec }}>
                I'm always interested in opportunities at the intersection of marketing, AI, and user-centered growth. If something here resonated, or if you just want to talk about what makes great marketing, let's have a conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <a href="mailto:tkaplish@uw.edu" className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors" style={{ backgroundColor: C.text, color: C.bg }}>
                  <Mail size={15} /> tkaplish@uw.edu
                </a>
                <a href="http://www.linkedin.com/in/tonishqa" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border text-sm font-medium px-5 py-2.5 rounded-lg transition-all" style={{ borderColor: C.border, color: C.textSec, backgroundColor: C.bg }}>
                  <Linkedin size={15} /> LinkedIn
                </a>
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border text-sm font-medium px-5 py-2.5 rounded-lg transition-all" style={{ borderColor: C.border, color: C.textSec, backgroundColor: C.bg }}>
                  <Coffee size={15} /> Schedule a virtual coffee with me
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: C.muted }}><MapPin size={12} /> Seattle, Washington</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-[800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: C.muted }}>
          <span>&copy; 2026 Tonishqa Kaplish</span>
          <span className="flex items-center gap-1.5"><Sparkles size={10} style={{ color: C.accent }} /> Built with Claude Opus 4.6 + Cursor</span>
        </div>
      </footer>
    </div>
  );
}
