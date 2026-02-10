import { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  Sparkles, Brain, Target, PenTool, BarChart3, MessageSquare,
  Mail, Linkedin, MapPin, ArrowUpRight, ArrowLeft,
  Layers, Lightbulb, Megaphone, Users, BookOpen,
  CheckCircle2, FileText, ChevronDown, Coffee, Search,
  Puzzle, Award, X, Wand2, Sun, Moon, Play, Newspaper
} from "lucide-react";

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
};
const darkColors = {
  bg: "#17140F", surface: "#211D17", surface2: "#2B261F",
  border: "#3A342B", accent: "#D4935F", accentLight: "#2A2015",
  accentGlow: "rgba(212,147,95,0.1)",
  text: "#F0EDE8", textSec: "#B5AFA6", muted: "#7A746C",
  navBg: "rgba(23,20,15,0.92)", overlay: "rgba(0,0,0,0.55)",
  metricBg: "#2A2218", metricBorder: "#3D3225",
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
  "Sales Enablement": { l: { bg:"#FEF3C7",text:"#78350F",border:"#FDE68A" }, d: { bg:"#3D2E10",text:"#FDE68A",border:"#5C4520" } },
  Accessibility: { l: { bg:"#DBEAFE",text:"#1E40AF",border:"#93C5FD" }, d: { bg:"#101D36",text:"#93C5FD",border:"#1A335E" } },
  "Data Viz": { l: { bg:"#FEE2E2",text:"#991B1B",border:"#FECACA" }, d: { bg:"#361010",text:"#FECACA",border:"#5E1A1A" } },
  "Product Marketing": { l: { bg:"#FFF7ED",text:"#C2410C",border:"#FDBA74" }, d: { bg:"#3A2210",text:"#FDBA74",border:"#5C3518" } },
  GPT: { l: { bg:"#F5F3FF",text:"#6D28D9",border:"#DDD6FE" }, d: { bg:"#1E1536",text:"#DDD6FE",border:"#33245E" } },
  "Voice of Customer": { l: { bg:"#FEF3C7",text:"#78350F",border:"#FDE68A" }, d: { bg:"#3D2E10",text:"#FDE68A",border:"#5C4520" } },
  Automation: { l: { bg:"#EEF2FF",text:"#3730A3",border:"#C7D2FE" }, d: { bg:"#161936",text:"#C7D2FE",border:"#272D5E" } },
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

/* ═══════════════════════════════════════════════
   DATA: CORE PROJECTS
   ═══════════════════════════════════════════════ */
const projects = [
  {
    id:"valur", title:"Building Marketing from Zero at Valur",
    tags:["Go-to-Market","Fintech","Sales Enablement","Analytics"],
    oneLiner:"First marketing hire. Built the entire function from scratch: campaigns, positioning, pipeline.",
    image:"/images/valur.png", imageAlt:"Valur logo",
    caseStudyUrl:"https://thundering-lake-b4e.notion.site/Valur-Marketing-GTM-Case-Study-2b57738ae7a18048b9dec60849e268b9", caseStudyLabel:"View full case study",
    metrics:[{v:"54.84%",l:"Email open rate"},{v:"4.71%",l:"Click-through rate"},{v:"2x",l:"Partner calls in 1 week"},{v:"3x",l:"Second-round calls"}],
    problem:"Valur makes tax optimization tools accessible to everyday Americans. When I joined as the **first marketing hire**, there was **no marketing function at all**: no campaigns, no content engine, no lead nurture sequences, no positioning documents, no partner outreach playbook. The sales team was closing deals without any top-of-funnel support. Everything had to be designed, built, and shipped from scratch while the company was actively selling.",
    research:"I sat in on sales calls and analyzed dozens of transcripts to understand how prospects actually talked about tax planning: the words they used, the objections they raised, and where they got stuck. I mapped the competitive landscape and built a **GPT-powered voice-of-customer program** that systematically extracted buyer objections, language patterns, and decision-stage signals from call transcripts, grounding all messaging in **real buyer language, not internal assumptions**.",
    solution:"I designed and launched the full marketing stack: **multi-touch email campaigns**, a content calendar aligned to the buyer journey, partner outreach sequences, and positioning frameworks for each core product (CRTs, DAFs, GRATs). I built a **GPT-powered sales enablement toolkit** for on-brand, objection-specific content and an **AI-assisted VOC pipeline** that ran continuously, processing new transcripts and updating buyer sentiment insights. I also worked with the CEO to sharpen brand positioning across all touchpoints.",
    results:"First email campaign hit **54.84% open rate and 4.71% CTR**, roughly 3x industry benchmarks for fintech. Partner outreach **doubled discovery calls from 6 to 13 per week** and **tripled second-round calls from 1 to 7** within one week. Multiple campaigns directly contributed to closed deals. The VOC program became core to marketing-sales alignment, and the enablement toolkit **reduced time-to-content by ~40%**."
  },
  {
    id:"yuzi", title:"GTM Strategy for AI-Powered Maternal Care",
    tags:["Go-to-Market","Healthtech","User Research","Growth"],
    oneLiner:"Led go-to-market for a wellness SaaS reimagining postpartum support.",
    metrics:[{v:"46%",l:"Cold outreach CTR"},{v:"65%",l:"LinkedIn engagement lift"},{v:"70%",l:"Survey response rate"},{v:"~10%",l:"Early adoption lift"}],
    problem:"Yuzi Care is an AI-powered maternal care marketplace for postpartum support. The company needed a GTM strategy that would **validate product-market fit**, generate early adoption, and establish brand presence in a category that barely existed. The challenge: the product was in a **sensitive, trust-dependent space**, and the target audience was bombarded with noise from every wellness brand online.",
    research:"I led customer research that achieved a **70% survey response rate** by designing around empathy rather than feature validation. I mapped the full postpartum care journey, identifying specific gaps where mothers felt unsupported. Qualitative interviews with mothers and providers revealed the core insight: **the biggest pain point wasn't finding providers, it was trusting them**. That insight reshaped the product roadmap.",
    solution:"I built the launch strategy across three pillars: **provider acquisition, customer acquisition, and brand awareness**. For providers: cold outreach with personalized messaging. For customers: a LinkedIn content strategy positioning Yuzi as a thought leader. I developed core brand messaging, value propositions per segment, and a **growth experimentation framework** to test channels and messaging at low cost before scaling.",
    results:"Cold outreach hit **46% CTR**. LinkedIn content drove a **65% engagement lift** month-over-month. Early adoption improved by **~10%** after GTM implementation. Most significantly, my customer research **directly reshaped the product roadmap**: founders reprioritized provider verification and trust signals based on the insight that trust, not discovery, was the primary barrier."
  },
  {
    id:"dcenter", title:"Marketing Automation at UW Disability Cultural Center",
    tags:["Marketing","SEO","Accessibility","Content Strategy"],
    oneLiner:"Website redesign, accessible newsletters with voice narration, and A/B testing that moved the needle.",
    image:"/images/dcenter-newsletter.png", imageAlt:"D Center Purple Tuesday newsletter celebrating accessibility",
    metrics:[{v:"38x",l:"Click rate improvement"},{v:"3.8%",l:"Newsletter CTR (from 0.1%)"},{v:"20%",l:"Site engagement increase"}],
    problem:"The Disability Cultural Center at UW had a fragmented digital presence: **two separate website versions** that split the user experience and undermined accessibility. The newsletter had a **0.1% click rate**. No SEO strategy, no content architecture, no data-driven engagement approach. For a center whose mission is inclusion, the digital experience was inadvertently creating barriers.",
    research:"I ran a comprehensive audit using Google Search Console, Yoast SEO, and Screaming Frog to identify technical gaps. I developed target personas, mapped user journeys, and performed **semantic keyword research with thematic clustering**. I analyzed newsletter engagement data to identify what subject lines, formats, and send times performed best.",
    solution:"I spearheaded a **full WordPress redesign** unifying both site versions into a single accessible platform with WCAG 2.1 standards. I redesigned the newsletter in Mailchimp with **A/B testing on subject lines and content formats**. I introduced a **voice-narrated newsletter version**, initially for users with visual impairments, which ended up driving engagement across all segments. Built custom event landing pages with HTML/CSS and implemented thematic clustering across all content.",
    results:"Newsletter click rates jumped from **0.1% to 3.8%, a 38x improvement** driven by A/B testing and the voice-narrated format. The voice narration received overwhelmingly positive feedback and became permanent. The unified website eliminated fragmentation, improved navigation, and **increased site engagement by 20%**. SEO strategy improved search visibility for key disability resource terms."
  },
  {
    id:"drfirst", title:"Strategic Marketing at DrFirst",
    tags:["Healthcare AI","Social Media","Branding"],
    oneLiner:"Social strategy, competitive intel, crisis comms, and a custom GPT. All in one summer.",
    image:"/images/drfirst-award.jpg", imageAlt:"DrFirst High Five recognition award",
    caseStudyUrl:"https://drive.google.com/drive/folders/1mjJv5jooAuidoDr2lPbA2pQnMY0mgePv?usp=sharing", caseStudyLabel:"View work samples",
    metrics:[{v:"4",l:"Major projects shipped"},{v:"1 week",l:"Time to first recognition"}],
    problem:"DrFirst specializes in e-prescribing and medication management. During my summer internship, the company needed to **increase brand engagement for iPrescribe**, conduct competitive intelligence, establish crisis preparedness, and maintain brand consistency. Four distinct challenges, addressed simultaneously within a compressed timeline.",
    research:"I analyzed engagement patterns across DrFirst's social channels, benchmarked against competitors, and developed an **in-depth stakeholder survey** aligning CI research with specific user needs across the organization. I evaluated competitors' channels, messaging, USPs, and pricing to identify exploitable gaps. For crisis comms, I researched industry best practices and analyzed recent healthcare tech crises.",
    solution:"Delivered **four major projects**: (1) Social media content strategy for iPrescribe with content pillars, creative direction, and engagement tactics. (2) **Competitive intelligence audit** with stakeholder-aligned research tied to strategic priorities. (3) Crisis communications plan with a **trigger tree mapping crisis types to response protocols**. (4) A **custom GPT trained on DrFirst's brand guidelines**, enabling any team member to produce on-brand content independently.",
    results:"Social strategy drove significant engagement increases for iPrescribe. CI work was adopted as an **ongoing strategic planning reference**. The crisis plan gave the team a ready-to-deploy response framework. The custom GPT reduced content review cycles and enabled non-marketing teams to write on-brand materials. Recognized with a **company High Five award within the first week**."
  },
  {
    id:"beech", title:"Marketing Consulting for Beecher's Handmade Cheese",
    tags:["Marketing","Branding","Content Strategy","User Research"],
    oneLiner:"Full-funnel marketing strategy for an artisanal brand entering new markets.",
    image:"/images/beechers.png", imageAlt:"Beecher's Handmade Cheese vintage brand logo",
    metrics:[{v:"7",l:"Integrated strategy components"},{v:"3",l:"Detailed buyer personas"}],
    problem:"Beecher's Handmade Cheese had a strong local reputation but **limited brand awareness beyond its home market**. They faced challenges differentiating from mass-produced brands, lacked a cohesive cross-channel strategy, had inconsistent messaging, and underutilized digital platforms. They needed a strategy to convey artisanal value to a broader audience without diluting craft identity.",
    research:"We conducted market analysis of the artisanal cheese industry, evaluated direct competitors and larger brands, and created **three detailed buyer personas** using demographic, psychographic, and behavioral data. We built empathy maps through interviews and surveys to understand pain points, from the overwhelm of choosing at the cheese counter to wanting to feel like a knowledgeable food enthusiast.",
    solution:"Developed a **seven-component integrated strategy**: (1) Brand positioning around craftsmanship and tradition. (2) Brand voice and messaging framework with maker's journey storytelling. (3) Seasonal and product-specific campaign themes. (4) Creative concepts with mood boards showcasing the cheese-making process. (5) **Channel strategy tailored to audience behavior**. (6) Content strategy for education, engagement, and conversion. (7) Measurement framework with KPIs for every initiative.",
    results:"Delivered **clear, implementable brand positioning** differentiating Beecher's from both mass-market and competing artisanal brands. Well-defined personas provided a foundation for targeted marketing. Multi-channel plan included draft content ready for refinement. The strategy was presented to stakeholders and received positive feedback as a **viable roadmap for market expansion**."
  },
  {
    id:"tizana", title:"Product Marketing at Tizana Mexicana",
    tags:["Product Marketing","Social Media","Branding","User Research"],
    oneLiner:"Storytelling-driven product marketing for a startup preserving Mexican artisan culture.",
    caseStudyUrl:"https://drive.google.com/file/d/1vcwH1meWTg7D95pZV9fCahMDfhqcAroE/view", caseStudyLabel:"View case study",
    metrics:[{v:"25%",l:"Social engagement growth"},{v:"20%",l:"Website traffic increase"}],
    problem:"Tizana Mexicana sells authentic, locally sourced Mexican handcrafted products. They faced limited brand awareness, difficulty communicating handcrafted authenticity, no cohesive product marketing strategy, and the challenge of **balancing business growth with supporting local artisans and cultural preservation**. The artisan story was powerful but wasn't being told effectively.",
    research:"Customer research segmented the audience into three personas: **cultural enthusiasts, ethical shoppers, and local community supporters**. Competitive analysis mapped messaging and pricing of similar brands. I mapped the full decision journey, identifying that the **emotional connection to the artisan's story was the most powerful conversion driver**, but it was buried on the website and absent from social media.",
    solution:"Built a **message house framework** articulating brand values and emotional narratives across channels. Developed the brand narrative centered on artisans' journeys and cultural significance. Produced **artisan interview videos and product journey content**. Executed the holiday **'Unwrap a Legacy' campaign** positioning products as meaningful gifts rooted in Mexican traditions. Created and maintained social media content calendar.",
    results:"**Social media engagement grew 25%**. **Website traffic increased 20%**. Customer feedback consistently cited stronger emotional connection. The storytelling-driven approach elevated market presence, increased visibility, and connected artisan work with people who genuinely valued it."
  },
  {
    id:"wholef", title:"UX Research for Amazon Whole Foods",
    tags:["UX","User Research","Analytics"],
    oneLiner:"End-to-end UX research that improved discoverability and personalization.",
    caseStudyUrl:"https://docs.google.com/presentation/d/1wFet1dHgS5GJXXuvb_O5BSfooJDaY2HG/edit", caseStudyLabel:"View research deck",
    metrics:[{v:"30%",l:"Fewer clicks to purchase"},{v:"5",l:"Research deliverables"}],
    problem:"Amazon's Whole Foods Service within the app suffered from **poor service discoverability**: many users didn't know Whole Foods delivery existed or couldn't find it. The experience had inefficient navigation, no personalized recommendations, and friction throughout the ordering flow.",
    research:"Created detailed user personas, designed and conducted a user survey to quantify pain points, developed a **heuristics evaluation** against usability principles, and ran **moderated usability tests** observing users attempting key tasks: finding the service, browsing, adding to cart, and checkout. Analyzed all data to rank issues by severity and frequency.",
    solution:"Developed recommendations for three core issues: (1) **Discoverability**: changes to navigation hierarchy making Whole Foods more visible without adding clutter. (2) **Personalization**: AI-based product recommendations learning from purchase history. (3) **Navigation**: streamlined information architecture matching mental models observed in testing. Packaged findings into comprehensive UX deliverables.",
    results:"Identified specific, actionable discoverability fixes for quick implementation. Personalization recommendations backed by clear user data. Navigation proposals **reduced clicks-to-purchase by 30%**. All deliverables structured to inform both immediate fixes and long-term product roadmap."
  },
  {
    id:"content-web", title:"Content Strategy for University Web",
    tags:["Content Strategy","UX","Accessibility"],
    oneLiner:"Redesigned international student web content for clarity, inclusivity, and reduced cognitive load.",
    image:"/images/uw-intl-students.png", imageAlt:"UW Communication Leadership International Students page redesign",
    caseStudyUrl:"https://drive.google.com/file/d/1YMI0IE35YWikw2ZjTdZ0F9rtPUV4EhRB/view?usp=sharing", caseStudyLabel:"View content strategy doc",
    metrics:[{v:"25%+",l:"Student body served"},{v:"100%",l:"Mobile responsive"}],
    problem:"UW's Communication Leadership website had an international student section causing significant frustration. **Over 25% of the student body** faced usability issues, inaccessible content, and high cognitive load, particularly for non-native English speakers. The architecture didn't match how students actually looked for information.",
    research:"Usability testing with diverse international students revealed the primary issue: **not missing content, but content organization and language complexity** creating unnecessary cognitive burden. I mapped user journeys for key tasks, understanding requirements, navigating applications, finding financial aid, and accessing support services.",
    solution:"Reorganized site architecture based on **how students actually search for information**, not how the university internally organized it. Rewrote all content for clarity and cultural sensitivity: shorter sentences, removed jargon, added contextual explanations for U.S.-specific concepts. Implemented **responsive design, accessibility features, FAQ section**, and a language selection tool focused on reducing cognitive load at every step.",
    results:"Delivered **intuitive navigation with shorter paths** to key information. Content was clear, concise, and culturally inclusive. Mobile-friendly and accessible design. Application process streamlined with step-by-step guidance. Non-native speakers reported **reduced cognitive load** in follow-up testing."
  },
  {
    id:"strat-comm", title:"Strategic Communications at Braxton Institute",
    tags:["Marketing","Content Strategy","Social Media"],
    oneLiner:"First newsletter, 71.4% open rate, multimedia content engine. Built from nothing.",
    image:"/images/braxton-stonewall.png", imageAlt:"Stonewall Riots mobile video series created for Braxton Institute",
    metrics:[{v:"71.4%",l:"Newsletter open rate"},{v:"32.1%",l:"Click-through rate"},{v:"3x",l:"vs. industry avg open rate"}],
    problem:"The Braxton Institute, a social justice organization, had **no consistent branding, no newsletter, no email marketing, limited multimedia content, and no social media calendar or style guide**. The organization had a powerful mission but wasn't communicating it effectively. Donors and community members weren't being engaged between events. Everything needed to be built from scratch.",
    research:"Conducted a thorough marketing audit analyzing existing touchpoints, brand consistency, and engagement data. Mapped stakeholder segments, **donors, community members, partner organizations, and board members**, identifying what content each group found most engaging and which channels they preferred.",
    solution:"Designed and launched the **organization's first-ever newsletter**. Created email campaigns to re-engage lapsed donors. Produced multimedia content including a **Stonewall Riots social media video series**, event highlight content, and video teasers. Established a **structured social media calendar** with mission-tied content pillars. Developed a comprehensive style guide and contributed blog content and editorial ideas.",
    results:"Inaugural newsletter achieved **71.4% open rate and 32.1% CTR**, dramatically exceeding nonprofit averages of ~25% open and ~3% CTR (roughly **3x industry average**). Email campaigns drove measurable donor re-engagement. Multimedia strategy elevated presence across platforms. The marketing foundation continued to perform after my departure."
  },
  {
    id:"dataviz", title:"Data Analytics & Visualization",
    tags:["Analytics","Data Viz"],
    oneLiner:"How age and income shape digital ad performance, told through data.",
    image:"/images/dataviz-ctr.png", imageAlt:"Z-score comparison of CTR and conversion rate performance by age group",
    caseStudyUrl:"https://drive.google.com/file/d/1W_ytduVvw1BOoJ-cMTB7MCnyOsVup994/view", caseStudyLabel:"View full analysis",
    metrics:[{v:"6+",l:"Visualizations created"},{v:"3",l:"Actionable audience insights"}],
    problem:"Marketers routinely make assumptions about how demographics influence digital ad performance, but those assumptions are often wrong. This project investigated the **specific, sometimes surprising ways that age and income shape ad engagement and conversion**, with the goal of producing actionable targeting insights.",
    research:"Data-driven analysis using **z-score standardization** to compare CTR and conversion rates across age groups. Explored income-ad format correlations. Analyzed datasets from the **US Census Bureau** and digital advertising benchmarks. Used **Datawrapper** for publication-quality visualizations including county-level maps and age-group comparison charts.",
    solution:"Created comprehensive visualizations: a **z-score chart revealing the 80+ demographic had highest CTR but lowest conversion** (counterintuitive), county-level maps of median age and poverty rates across Washington state, and industry-specific analysis. Each visualization included marketing implications and recommended targeting strategies.",
    results:"Key findings: **seniors show high CTR but low conversion, except with video ads** which significantly boost purchasing behavior. Younger audiences favor interactive formats. **Income levels directly dictate** whether users respond to luxury vs. necessity positioning. Concrete guidance for optimizing ad format selection and audience targeting."
  },
];

/* ═══════════════════════════════════════════════
   DATA: AI-DRIVEN MARKETING PROJECTS
   ═══════════════════════════════════════════════ */
const aiProjects = [
  {
    id:"voc", title:"GPT-Powered Voice-of-Customer Program",
    tags:["AI","Sales Enablement","Voice of Customer","Automation"],
    oneLiner:"An AI system that extracts buyer objections from sales calls, so marketing speaks the customer's language.",
    image:"/images/valur.png", imageAlt:"Valur logo, where the VOC program was built",
    metrics:[{v:"40%",l:"Faster time-to-content"},{v:"Ongoing",l:"Runs continuously"}],
    problem:"At Valur, marketing messaging was written based on internal assumptions. Meanwhile, the sales team had real conversations daily, full of **specific objections, hesitations, and language patterns that marketing never saw**. No systematic way existed to extract these insights and feed them into positioning and campaigns. The gap between what marketing said and what buyers felt was growing.",
    research:"Analyzed dozens of transcripts across deal stages. Identified **recurring objection categories** (cost concerns, trust in fintech, complexity, comparison to traditional advisors), mapped language clusters prospects used repeatedly, and documented decision-stage signals. Categorized objections by frequency, deal impact, and which ones required new messaging.",
    solution:"Built a **GPT-powered pipeline** processing new transcripts on an ongoing basis. The system extracts objections, classifies by type and deal stage, identifies **specific buyer language patterns**, and surfaces win/loss correlations. Output feeds directly into: rewritten campaign copy, restructured email sequences, **objection-handling one-pagers** for sales, and a dashboard tracking trending objections over time.",
    results:"Messaging shifted from **assumption-based to evidence-based**. Campaign copy now uses actual buyer language for higher resonance. Sales reported objection-handling materials felt more relevant. Win/loss patterns directly informed strategic decisions on **which segments to prioritize and which messaging angles to retire**. The system accelerated content production with clear, research-backed briefs."
  },
  {
    id:"drfirst-gpt", title:"Custom GPT for Healthcare Brand Consistency",
    tags:["AI","Healthcare AI","Prompt Engineering","GPT"],
    oneLiner:"A custom ChatGPT trained on DrFirst's brand voice, enabling consistent content at scale.",
    image:"/images/drfirst-gpt.jpg", imageAlt:"DrFirst Assistant custom GPT interface",
    metrics:[{v:"100%",l:"Brand voice alignment"},{v:"Org-wide",l:"Adoption across teams"}],
    problem:"DrFirst produces content across multiple teams. Different writers meant **inconsistent voice, varying product claim accuracy, and slow review cycles**. In healthcare, where regulatory sensitivity is paramount, brand inconsistency isn't just a marketing problem, it's a credibility risk. They needed to **maintain brand voice at scale** without bottlenecking through one reviewer.",
    research:"Audited existing content across all channels. Identified specific patterns: **tone shifts within the same channel, product claims varying in accuracy, and messaging that emphasized features over outcomes**. Mapped core voice attributes (authoritative but approachable, precise but accessible, compliance-aware but not fear-based) and documented where each channel deviated most.",
    solution:"Built a **custom GPT trained on DrFirst's brand guidelines**, positioning documents, and tone specifications. Any team member could input a request and receive pre-aligned output, accurate in product claims and structured for the intended channel. Included **compliance language guardrails**, style guide reference layer, and prompt templates for common content types (social, blogs, emails, press releases). Tested against approved content before deployment.",
    results:"Team members across the organization produced on-brand content independently, **reducing the marketing bottleneck**. Content review cycles shortened significantly because first drafts arrived pre-aligned. Particularly valuable for the **sales team generating product descriptions and objection-handling content** without waiting for marketing. Demonstrated how AI can be embedded as an operational efficiency tool, not a novelty."
  },
  {
    id:"braxbot", title:"Conversational AI Chatbot: Braxbot",
    tags:["Chatbot","AI","UX","User Research"],
    oneLiner:"A conversational AI designed to make social justice resources accessible to the people who need them most.",
    image:"/images/braxbot-chat.png", imageAlt:"Braxbot conversational interface prototype",
    caseStudyUrl:"https://www.canva.com/design/DAGGfblA5h4/Y5wJyWpv1uIFZ_4mYVHoFA/view?utm_content=DAGGfblA5h4&utm_campaign=designshare&utm_medium=link&utm_source=editor", caseStudyLabel:"View design proposal",
    secondaryUrl:"https://creator.voiceflow.com/prototype/664953a4856a15ccad6bd16d", secondaryLabel:"Try live prototype",
    metrics:[{v:"4",l:"Core design pillars"},{v:"Full",l:"Implementation proposal"}],
    problem:"The Braxton Institute provides resources and support to marginalized communities, but faced **limited information accessibility, insufficient engagement between events, no personalized support, and difficulty facilitating sensitive conversations at scale**. The people who most needed resources were least likely to navigate traditional website structures to find them.",
    research:"Researched how marginalized communities interact with organizational support: where they look first, what language they use, **what barriers prevent engagement**. Gathered staff requirements for common inquiries. Analyzed chatbot implementations in adjacent spaces (healthcare, education, crisis support) for best practices around **cultural sensitivity, tone, and trust-building** with vulnerable populations. Prototyped conversational flows and tested with users.",
    solution:"Designed 'Braxbot' on **Voiceflow** with four pillars: (1) **Empathetic personality** communicating with warmth and cultural awareness. (2) **Culturally sensitive visual representation** reflecting the community served. (3) **Crisis communication capabilities** recognizing distress and escalating to human support. (4) **Tailored conversational flows** for different audiences. Developed a full implementation proposal with technical architecture, prompt engineering guidelines, conversation design, and success metrics. The Voiceflow prototype includes a visual flow architecture with welcome, query capture, small talk, and solution nodes.",
    results:"Designed to increase accessibility, enhance community engagement, provide personalized educational content, facilitate safe public conversations on social justice, and **reduce staff workload for routine inquiries**. Demonstrated the potential for conversational AI to serve communities that traditional interfaces often fail, and provided a **replicable model for other mission-driven organizations**."
  },
];

/* ═══════════════════════════════════════════════
   DATA: TIMELINE (Valur ends Feb 2026)
   ═══════════════════════════════════════════════ */
const timeline = [
  { role:"Marketing Operations Analyst", note:"First Marketing Hire", company:"Valur", period:"2024 – Feb 2026",
    desc:"Built the marketing function from zero. Email campaigns hitting 54.84% open rate. Doubled partner calls in one week. Designed AI-powered systems that now run continuously: a GPT pipeline that extracts buyer objections and language patterns from sales call transcripts to ground all messaging in real customer language, and a sales enablement toolkit that lets the partnerships team generate on-brand, objection-specific content in minutes instead of days.", current:true },
  { role:"Product Marketing & Growth", company:"Yuzi Care", period:"2023 – 2024",
    desc:"Led GTM for an AI-powered maternal care marketplace. 46% cold outreach CTR, 65% LinkedIn engagement lift. Research that directly reshaped the product roadmap." },
  { role:"Marketing Communications Intern", company:"DrFirst", period:"2023",
    desc:"Social strategy for iPrescribe, competitive intelligence, crisis comms planning, and a custom GPT for brand consistency." },
  { role:"Graduate Marketing Specialist", company:"UW Disability Cultural Center", period:"2022 – 2023",
    desc:"Website redesign, accessible newsletters, community campaigns. 20% site engagement increase. Newsletter CTR from 0.1% to 3.8%." },
];

/* ═══════════════════════════════════════════════
   DATA: CONTENT PORTFOLIO
   ═══════════════════════════════════════════════ */
const contentItems = [
  { type:"written", title:"Braxton Institute: Blog Editor", desc:"Edited and published blog content for a racial justice organization.", href:"https://www.braxtoninstitute.org/blog" },
  { type:"video", title:"Braxton Institute: Carrying the Torch", desc:"Instagram reel produced and edited for the Braxton Institute.", href:"https://youtu.be/xLn4ttwrG4M" },
  { type:"video", title:"Stonewall Riots: Social Media Video Series", desc:"Produced and edited a mobile video series celebrating LGBTQIA+ history.", href:"https://youtu.be/zCBaR9nVQTo" },
  { type:"social", title:"Braxton Institute: Social Media Content", desc:"Social media posts and creative assets designed for community engagement.", href:"https://drive.google.com/drive/folders/1zkoVi0ZtosahYBzKD-TkfjpupSB8uQ1q" },
  { type:"newsletter", title:"Braxton Institute: Newsletter", desc:"Designed and launched the org's first newsletter. 71.4% open rate, 32.1% CTR.", href:"https://braxtoninstitute.dm.networkforgood.com/emails/3347812" },
  { type:"written", title:"When Was the Last Time You Listened to Nature?", desc:"An essay on mindful engagement with the natural world.", href:"https://www.listeninginn.com/post/when-was-the-last-time-you-listened-to-nature" },
  { type:"written", title:"Why Listen to Opposing Opinions?", desc:"On intellectual empathy and conversations that change your mind.", href:"https://www.listeninginn.com/post/why-and-how-should-we-listen-to-people-with-opposing-opinions" },
  { type:"written", title:"Turning The Inside Out: Bo Burnham's 'Inside'", desc:"A critical reading as counter-cinema.", href:"https://www.academia.edu/89458699/Turning_The_Inside_Out_Reading_Bo_Burnhams_Inside_As_Counter_Cinema" },
  { type:"written", title:"Italian Renaissance Art and Literature", desc:"Academic essay on visual art and literary traditions.", href:"https://www.academia.edu/89529561/Italian_Renaissance_Art_and_Literature" },
];
const typeIcons = { written: PenTool, video: Play, newsletter: Newspaper, social: Megaphone };
const typeLabels = { written: "Written", video: "Video", newsletter: "Newsletter", social: "Social Media" };

/* ═══════════════════════════════════════════════
   PROJECT DEEP DIVE (with metric cards)
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
        {/* Project image */}
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
        {/* Case study / work sample links */}
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
        {/* Metric cards */}
        {project.metrics && (
          <Reveal delay={80}>
            <div className={`grid gap-3 mb-10 ${project.metrics.length <= 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`}>
              {project.metrics.map((m,i)=><MetricCard key={i} value={m.v} label={m.l} />)}
            </div>
          </Reveal>
        )}
        {[
          { icon:Puzzle, label:"The Problem", content:project.problem },
          { icon:Search, label:"The Research", content:project.research },
          { icon:Lightbulb, label:"The Solution", content:project.solution },
          { icon:Award, label:"The Results", content:project.results },
        ].map((s,i)=>{
          // Parse **bold** markers into spans
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
              Well, almost. I built this entire site using <strong style={{ color:C.text }}>Claude Opus 4.6</strong> and <strong style={{ color:C.text }}>Cursor IDE</strong>. No manual coding, no templates, no drag-and-drop builders.
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ color:C.textSec }}>
              Every component, interaction, and design decision was generated through structured prompts. I directed the architecture, the copy, the design system, and the interaction patterns. The AI handled the code. It's how I think about tools: learn the logic, direct the output, ship the thing.
            </p>
            <div className="rounded-lg border p-4 mb-4" style={{ backgroundColor:C.surface, borderColor:C.border }}>
              <p className="text-xs font-semibold mb-2" style={{ color:C.text }}>The stack:</p>
              <div className="text-xs space-y-2" style={{ fontFamily:"'IBM Plex Mono',monospace", color:C.textSec }}>
                {["React 18 + Vite + Tailwind CSS v4","Lucide Icons · IBM Plex Serif + Inter fonts","Single-file architecture, zero build complexity","Scroll animations, expandable cards, dark/light themes","Content extracted and restructured via AI prompts","Warm design system with full dark mode"].map((s,i)=>(
                  <div key={i} className="flex items-start gap-2"><CheckCircle2 size={11} style={{ color:C.accent }} className="mt-0.5 shrink-0"/>{s}</div>
                ))}
              </div>
            </div>
            <p className="text-xs" style={{ color:C.muted, fontFamily:"'IBM Plex Mono',monospace" }}>February 2026 · Model: Claude Opus 4.6 · IDE: Cursor</p>
          </div>
        </div>
      )}
    </>
  );
};

/* ═══════════════════════════════════════════════
   NAV (with theme toggle)
   ═══════════════════════════════════════════════ */
const Nav = ({ onHome }) => {
  const { C, dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{ const h=()=>setScrolled(window.scrollY>40); window.addEventListener("scroll",h); return()=>window.removeEventListener("scroll",h); },[]);
  const scrollTo = id => { const el=document.getElementById(id); if(el) el.scrollIntoView({ behavior:"smooth" }); };
  const links = [["about","About"],["work","Work"],["ai-lab","AI Layer"],["projects","Projects"],["content","Content"],["contact","Contact"]];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ backgroundColor:scrolled?C.navBg:"transparent", backdropFilter:scrolled?"blur(12px)":"none", borderBottom:scrolled?`1px solid ${C.border}`:"1px solid transparent" }}>
      <div className="max-w-[800px] mx-auto px-6 h-14 flex items-center justify-between">
        <button onClick={onHome} className="text-lg font-semibold tracking-tight cursor-pointer" style={{ fontFamily:"'IBM Plex Serif',Georgia,serif", color:C.text }}>TK</button>
        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center gap-5 text-sm mr-3">
            {links.map(([id,label])=>(
              <button key={id} onClick={()=>scrollTo(id)} className="transition-colors cursor-pointer"
                style={{ color:C.muted }} onMouseEnter={e=>e.target.style.color=C.accent} onMouseLeave={e=>e.target.style.color=C.muted}>{label}</button>
            ))}
          </div>
          <div className="flex md:hidden items-center gap-3 text-xs mr-2">
            {[["about","About"],["projects","Projects"],["contact","Contact"]].map(([id,label])=>(
              <button key={id} onClick={()=>scrollTo(id)} className="cursor-pointer" style={{ color:C.muted }}>{label}</button>
            ))}
          </div>
          <button onClick={toggle} className="p-2 rounded-lg transition-colors cursor-pointer" style={{ color:C.muted }}
            onMouseEnter={e=>e.currentTarget.style.color=C.accent} onMouseLeave={e=>e.currentTarget.style.color=C.muted}>
            {dark ? <Sun size={16}/> : <Moon size={16}/>}
          </button>
        </div>
      </div>
    </nav>
  );
};

/* ═══════════════════════════════════════════════
   EXPANDABLE PROJECT CARD
   ═══════════════════════════════════════════════ */
const ProjectCard = ({ project, onDeepDive }) => {
  const { C } = useTheme();
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-xl border transition-all duration-300"
      style={{ backgroundColor:C.bg, borderColor:expanded?C.accent:C.border, boxShadow:expanded?`0 4px 16px ${C.accentGlow}`:"none" }}>
      <button onClick={()=>setExpanded(!expanded)} className="w-full text-left p-5 cursor-pointer">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-semibold leading-snug pr-2" style={{ fontFamily:"'IBM Plex Serif',Georgia,serif", color:C.text }}>{project.title}</h3>
          <ChevronDown size={14} className="shrink-0 mt-1 transition-transform duration-300" style={{ color:C.muted, transform:expanded?"rotate(180deg)":"rotate(0)" }}/>
        </div>
        <p className="text-xs leading-relaxed mb-3" style={{ color:C.muted }}>{project.oneLiner}</p>
        <div className="flex flex-wrap gap-1.5">{project.tags.map(t=><Tag key={t} label={t}/>)}</div>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight:expanded?"300px":"0" }}>
        <div className="px-5 pb-5 pt-0">
          <div className="border-t pt-4 mb-3" style={{ borderColor:C.border }}>
            <p className="text-xs leading-relaxed mb-2" style={{ color:C.textSec }}><strong style={{ color:C.text }}>Problem:</strong> {project.problem.substring(0,150)}...</p>
            <p className="text-xs leading-relaxed" style={{ color:C.textSec }}><strong style={{ color:C.text }}>Result:</strong> {project.results.substring(0,150)}...</p>
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
export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [deepDiveId, setDeepDiveId] = useState(null);
  const C = dark ? darkColors : lightColors;
  const toggle = () => setDark(d=>!d);

  const allProjects = [...projects, ...aiProjects];
  const activeProject = allProjects.find(p=>p.id===deepDiveId);
  const goHome = () => { setDeepDiveId(null); window.scrollTo(0,0); };
  const openDeepDive = id => { setDeepDiveId(id); window.scrollTo(0,0); };

  const shell = children => (
    <ThemeCtx.Provider value={{ C, dark, toggle }}>
      <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor:C.bg, color:C.text, fontFamily:"'Inter',sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <Nav onHome={goHome} />
        {children}
      </div>
    </ThemeCtx.Provider>
  );

  if (activeProject) return shell(<ProjectDeepDive project={activeProject} onBack={goHome} />);

  return shell(
    <>
      <BuiltWithAI />

      {/* HERO */}
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
            <p className="text-lg leading-relaxed max-w-xl mb-3" style={{ fontFamily:"'IBM Plex Serif',Georgia,serif", fontStyle:"italic", color:C.textSec }}>
              I build marketing systems that listen before they sell.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <p className="text-base leading-relaxed max-w-xl mb-8" style={{ color:C.textSec }}>
              I've built marketing functions from scratch and shipped go-to-market strategies across fintech and healthtech, using AI not as a shortcut, but as infrastructure. I design systems that surface real buyer language, automate insight extraction, and turn research into campaigns that move pipeline.
            </p>
          </Reveal>
          <Reveal delay={350}>
            <div className="flex flex-wrap items-center gap-3">
              <a href="https://drive.google.com/file/d/1T-C7rqrs5Hjn61aavQDGebtuAmQkTHoA/view" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors" style={{ backgroundColor:C.text, color:C.bg }}>
                <FileText size={15}/> Resume
              </a>
              <a href="http://www.linkedin.com/in/tonishqa" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border transition-all" style={{ borderColor:C.border, color:C.textSec }}>
                <Linkedin size={15}/> LinkedIn
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
              <p className="text-sm leading-relaxed" style={{ color:C.textSec }}>I think the most underutilized data in marketing lives inside sales calls, support tickets, and onboarding sessions. Real language. Real objections. Real patterns. I build AI systems that extract those signals and turn them into positioning, campaigns, and content that actually resonates, because it started from what people said, not what we assumed they meant.</p>
              <p className="text-sm leading-relaxed" style={{ color:C.textSec }}>That's the throughline across everything I do: using AI to close the gap between what customers experience and what marketing communicates. Extracting buyer language from transcripts, training custom models on brand voice, automating competitive intelligence, building workflows where AI handles the repetitive extraction so marketers can focus on strategy. I don't just use AI tools. I design the systems that make AI useful for marketing teams.</p>
              <p className="text-sm leading-relaxed" style={{ color:C.textSec }}>I've worked across fintech, healthtech, and maternal care. Industries where you earn trust or you earn nothing.</p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Callout icon={Target} title="Marketing">Campaigns, segmentation, growth experiments. 54.84% email open rates. I start with research and let the data do the talking.</Callout>
              <Callout icon={BookOpen} title="Storytelling">65% LinkedIn engagement lift. Messaging that founders trusted on their homepage. I care about getting the words right.</Callout>
              <Callout icon={Users} title="User Research">Built a GPT-powered VOC program. 70% survey response rates that reshaped product roadmaps. I show up with what users actually said.</Callout>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10">
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color:C.muted }}>Toolkit</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {[{icon:Megaphone,label:"Go-to-Market"},{icon:BarChart3,label:"Marketing Analytics"},{icon:Brain,label:"AI / LLM Workflows"},{icon:PenTool,label:"Content Strategy"},{icon:Users,label:"User Research"},{icon:MessageSquare,label:"Conversational AI"},{icon:Layers,label:"Product Marketing"},{icon:Lightbulb,label:"Brand Storytelling"}].map(({icon:Icon,label},i)=>(
                  <div key={i} className="flex items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium"
                    style={{ backgroundColor:C.bg, borderColor:C.border, color:C.textSec }}>
                    <Icon size={13} style={{ color:C.accent }} className="shrink-0"/>{label}
                  </div>
                ))}
              </div>
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

      {/* THE AI LAYER */}
      <section id="ai-lab" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="The AI Layer" subtitle="Systems I've designed where AI is the infrastructure, not the afterthought." /></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiProjects.map((p,i)=>(<Reveal key={p.id} delay={i*80}><ProjectCard project={p} onDeepDive={openDeepDive}/></Reveal>))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="Projects" subtitle="Click to preview. Expand for the snapshot. Deep dive for the full story." /></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* CONTACT */}
      <section id="contact" className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Reveal><SectionHeader title="Let's Connect" /></Reveal>
          <Reveal delay={100}>
            <div className="rounded-xl border p-6 md:p-8" style={{ backgroundColor:C.surface, borderColor:C.border }}>
              <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color:C.textSec }}>
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

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ borderTop:`1px solid ${C.border}` }}>
        <div className="max-w-[800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color:C.muted }}>
          <span>&copy; 2026 Tonishqa Kaplish</span>
          <span className="flex items-center gap-1.5"><Sparkles size={10} style={{ color:C.accent }}/> Built with Claude Opus 4.6 + Cursor</span>
        </div>
      </footer>
    </>
  );ßß
}
