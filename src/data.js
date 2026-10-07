/* ═══════════════════════════════════════════════
   PORTFOLIO CONTENT
   All projects, timeline, education, references and
   content items live here. Edit this file to change
   what the site says. Portfolio.jsx renders it, and
   scripts/prerender.mjs uses it to generate the
   per-project pages, sitemap.xml and llms.txt.
   ═══════════════════════════════════════════════ */

/* Site-level details used for <head> metadata (title, description,
   Open Graph), structured data, sitemap.xml, robots.txt and llms.txt. */
export const site = {
  name: "Tonishqa Kaplish",
  title: "Tonishqa Kaplish | Marketing & AI",
  description: "Tonishqa Kaplish builds AI-powered marketing infrastructure: voice-of-customer pipelines, competitive intelligence monitors and answer-engine visibility tracking.",
  tagline: "Building marketing systems anchored in real customer behavior.",
  location: { city: "Seattle", region: "WA", country: "US" },
  email: "tkaplish888@gmail.com",
  image: "/profile.jpg",
  imageAlt: "Portrait of Tonishqa Kaplish",
  links: {
    linkedin: "https://www.linkedin.com/in/tonishqa",
    github: "https://github.com/tkaplish888-alt",
    calendly: "https://calendly.com/tkaplish888/30min",
  },
};

/* ═══════════════════════════════════════════════
   DATA: CORE PROJECTS (reordered per request)
   Sequence: Valur, YuziCare, D Center, DrFirst,
   Braxton, Tizana, then school-level projects
   ═══════════════════════════════════════════════ */
export const projects = [
  {
    id:"valur", title:"Building Marketing from Zero at Valur",
    tags:["Go-to-Market","Fintech","Lead Generation","Analytics","Voice of Customer"],
    oneLiner:"First marketing hire. Built the entire function from scratch: campaigns, positioning, pipeline, and an AI-powered voice-of-customer program.",
    image:null /* /images/valur.png is not in public/images */, imageAlt:"Valur logo",
    caseStudyUrl:"https://thundering-lake-b4e.notion.site/Valur-Marketing-GTM-Case-Study-2b57738ae7a18048b9dec60849e268b9", caseStudyLabel:"View full case study",
    metrics:[{v:"54.84%",l:"Email open rate"},{v:"4.71%",l:"Click-through rate"},{v:"2x",l:"Partner calls in 1 week"},{v:"3x",l:"Second-round calls"}],
    problem:"Valur makes tax optimization tools accessible to everyday Americans. When I joined as the **first marketing hire**, there was **no marketing function at all**: no campaigns, no content engine, no lead nurture sequences, no positioning documents, no partner outreach playbook. The sales team was closing deals without any top-of-funnel support. Everything had to be designed, built, and shipped from scratch while the company was actively selling.",
    research:"I sat in on sales calls and analyzed dozens of transcripts to understand how prospects actually talked about tax planning: the words they used, the objections they raised, and where they got stuck. I mapped the competitive landscape and built a **voice-of-customer program** powered by the Claude API and integrated across the marketing stack. The system systematically extracted buyer objections, language patterns, and decision-stage signals from call transcripts, grounding all messaging in **real buyer language, not internal assumptions**.",
    solution:"I designed and launched the full marketing stack: **multi-touch email campaigns**, a content calendar aligned to the buyer journey, partner outreach sequences, and positioning frameworks for each core product (CRTs, DAFs, GRATs). I built an **AI-assisted VOC pipeline** using Claude that ran continuously, processing new transcripts and updating buyer sentiment insights. I also developed **lead magnets** including educational guides and downloadable resources designed to capture and nurture top-of-funnel leads, and worked with the CEO to sharpen brand positioning across all touchpoints.",
    results:"First email campaign hit **54.84% open rate and 4.71% CTR**, roughly 3x industry benchmarks for fintech. Partner outreach **doubled discovery calls from 6 to 13 per week** and **tripled second-round calls from 1 to 7** within one week. Multiple campaigns directly contributed to closed deals. The VOC program became core to marketing-sales alignment, and lead magnets contributed to a growing top-of-funnel pipeline."
  },
  {
    id:"yuzi", title:"Early-Stage GTM Support for AI-Powered Maternal Care",
    tags:["Go-to-Market","Healthtech","User Research","Growth"],
    oneLiner:"Supported early go-to-market planning for a postpartum care marketplace. Competitive benchmarking, pricing analysis, and pre-launch research.",
    metrics:[{v:"46%",l:"Cold outreach CTR"},{v:"65%",l:"LinkedIn engagement lift"},{v:"70%",l:"Survey response rate"},{v:"~10%",l:"Early adoption lift"}],
    problem:"YuziCare is an AI-powered postpartum care marketplace. The startup was very early stage and needed foundational GTM research to **validate product-market fit** and establish initial brand presence in a category that barely existed. The challenge: the product operated in a **sensitive, trust-dependent space**, and the target audience was overwhelmed with noise from every wellness brand online.",
    research:"I conducted customer research that achieved a **70% survey response rate** by designing around empathy rather than feature validation. I mapped the full postpartum care journey, identifying specific gaps where mothers felt unsupported. Qualitative interviews with mothers and providers revealed the core insight: **the biggest pain point wasn't finding providers, it was trusting them**. That insight informed the founding team's product decisions.",
    solution:"I supported the founding team's launch planning across three areas: **competitive benchmarking and pricing analysis** to inform positioning, **UX and pre-launch strategy research** to shape early product decisions, and **initial channel testing** including cold outreach with personalized messaging and a LinkedIn content strategy positioning YuziCare as a thought leader. I developed core brand messaging and value propositions per segment to support the team's go-to-market planning.",
    results:"Cold outreach hit **46% CTR**. LinkedIn content drove a **65% engagement lift** month-over-month. Early adoption improved by **~10%** after implementing initial GTM recommendations. Most significantly, the customer research **directly informed the product roadmap**: founders reprioritized provider verification and trust signals based on the insight that trust, not discovery, was the primary barrier."
  },
  {
    id:"dcenter", title:"SEO & Marketing Automation at UW Disability Cultural Center",
    tags:["Technical SEO","SEO","Accessibility","Content Strategy","Marketing"],
    oneLiner:"Technical SEO overhaul, accessible newsletters with AI-generated voice narration, and data-driven engagement optimization.",
    image:null /* /images/dcenter-newsletter.png is not in public/images */, imageAlt:"D Center Purple Tuesday newsletter celebrating accessibility",
    metrics:[{v:"38x",l:"Click rate improvement"},{v:"3.8%",l:"Newsletter CTR (from 0.1%)"},{v:"20%",l:"Site engagement increase"}],
    problem:"The Disability Cultural Center at UW had a fragmented digital presence: **two separate website versions** that split the user experience and undermined accessibility. The newsletter had a **0.1% click rate**. No SEO strategy, no content architecture, no data-driven engagement approach. For a center whose mission is inclusion, the digital experience was inadvertently creating barriers.",
    research:"I ran a comprehensive **technical SEO audit** using Google Search Console, Yoast SEO, and Screaming Frog to surface crawl errors, broken links, missing meta descriptions, and indexation issues. I developed target personas, mapped user journeys, and performed **semantic keyword research with thematic clustering** to identify content gaps and opportunities. I analyzed newsletter engagement data across subject lines, formats, and send times to understand what actually drove clicks.",
    solution:"I spearheaded a **full WordPress redesign** unifying both site versions into a single accessible platform with WCAG 2.1 standards. On the technical SEO side, I implemented **structured data markup, optimized site architecture for crawlability, fixed canonical issues**, and built a thematic content clustering strategy around core disability resource terms. I redesigned the newsletter in Mailchimp with **A/B testing on subject lines and content formats**. I also introduced **AI-generated voice narration** for the newsletter, initially designed to enhance accessibility for users with visual impairments and the center's target audience. Built custom event landing pages with HTML/CSS and implemented on-page SEO across all content.",
    results:"Newsletter click rates jumped from **0.1% to 3.8%, a 38x improvement** driven by A/B testing and the AI-generated voice narration format. The voice narration received overwhelmingly positive feedback and became permanent, proving that accessibility-first design improves engagement for everyone. The unified website eliminated fragmentation, improved navigation, and **increased site engagement by 20%**. Technical SEO improvements boosted search visibility for key disability resource terms."
  },
  {
    id:"drfirst", title:"Strategic Marketing at DrFirst",
    tags:["Healthcare AI","Social Media","Branding","Prompt Engineering"],
    oneLiner:"Social strategy, competitive intel, crisis comms, and a custom GPT built on brand guidelines. All in one summer.",
    image:null /* /images/drfirst-award.jpg is not in public/images */, imageAlt:"DrFirst High Five recognition award",
    caseStudyUrl:"https://drive.google.com/drive/folders/1mjJv5jooAuidoDr2lPbA2pQnMY0mgePv?usp=sharing", caseStudyLabel:"View work samples",
    metrics:[{v:"4",l:"Major projects shipped"},{v:"1 week",l:"Time to first recognition"}],
    problem:"DrFirst specializes in e-prescribing and medication management. During my summer internship, the company needed to **increase brand engagement for iPrescribe**, conduct competitive intelligence, establish crisis preparedness, and maintain brand consistency across teams. Four distinct challenges, addressed simultaneously within a compressed timeline.",
    research:"I analyzed engagement patterns across DrFirst's social channels, benchmarked against competitors, and developed an **in-depth stakeholder survey** aligning CI research with specific user needs across the organization. I evaluated competitors' channels, messaging, USPs, and pricing to identify exploitable gaps. For crisis comms, I researched industry best practices and analyzed recent healthcare tech crises.",
    solution:"Delivered **four major projects**: (1) Social media content strategy for iPrescribe with content pillars, creative direction, and engagement tactics. (2) **Competitive intelligence audit** with stakeholder-aligned research tied to strategic priorities. (3) Crisis communications plan with a **trigger tree mapping crisis types to response protocols**. (4) A **custom GPT trained on DrFirst's brand guidelines**, positioning documents, and tone specifications. The GPT included compliance language guardrails, a style guide reference layer, and prompt templates for common content types (social posts, blog drafts, emails, press releases), enabling any team member across the organization to produce on-brand, regulatory-aware content independently without waiting for marketing review.",
    results:"Social strategy drove significant engagement increases for iPrescribe. CI work was adopted as an **ongoing strategic planning reference**. The crisis plan gave the team a ready-to-deploy response framework. The custom GPT **reduced content review cycles** and enabled non-marketing teams, especially sales, to write on-brand product descriptions and objection-handling materials independently. Recognized with a **company High Five award within the first week**."
  },
  {
    id:"strat-comm", title:"Strategic Communications at Braxton Institute",
    tags:["Marketing","Content Strategy","Social Media"],
    oneLiner:"First newsletter, 71.4% open rate, multimedia content engine. Built from nothing.",
    image:null /* /images/braxton-stonewall.png is not in public/images */, imageAlt:"Stonewall Riots mobile video series created for Braxton Institute",
    metrics:[{v:"71.4%",l:"Newsletter open rate"},{v:"32.1%",l:"Click-through rate"},{v:"3x",l:"vs. industry avg open rate"}],
    problem:"The Braxton Institute, a social justice organization, had **no consistent branding, no newsletter, no email marketing, limited multimedia content, and no social media calendar or style guide**. The organization had a powerful mission but wasn't communicating it effectively. Donors and community members weren't being engaged between events. Everything needed to be built from scratch.",
    research:"Conducted a thorough marketing audit analyzing existing touchpoints, brand consistency, and engagement data. Mapped stakeholder segments, **donors, community members, partner organizations, and board members**, identifying what content each group found most engaging and which channels they preferred.",
    solution:"Designed and launched the **organization's first-ever newsletter**. Created email campaigns to re-engage lapsed donors. Produced multimedia content including a **Stonewall Riots social media video series**, event highlight content, and video teasers. Established a **structured social media calendar** with mission-tied content pillars. Developed a comprehensive style guide and contributed blog content and editorial ideas.",
    results:"Inaugural newsletter achieved **71.4% open rate and 32.1% CTR**, dramatically exceeding nonprofit averages of ~25% open and ~3% CTR (roughly **3x industry average**). Email campaigns drove measurable donor re-engagement. Multimedia strategy elevated presence across platforms. The marketing foundation continued to perform after my departure."
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
    id:"beech", title:"Marketing Consulting for Beecher's Handmade Cheese",
    tags:["Marketing","Branding","Content Strategy","User Research"],
    oneLiner:"Full-funnel marketing strategy for an artisanal brand entering new markets.",
    image:null /* /images/beechers.png is not in public/images */, imageAlt:"Beecher's Handmade Cheese vintage brand logo",
    metrics:[{v:"7",l:"Integrated strategy components"},{v:"3",l:"Detailed buyer personas"}],
    problem:"Beecher's Handmade Cheese had a strong local reputation but **limited brand awareness beyond its home market**. They faced challenges differentiating from mass-produced brands, lacked a cohesive cross-channel strategy, had inconsistent messaging, and underutilized digital platforms. They needed a strategy to convey artisanal value to a broader audience without diluting craft identity.",
    research:"We conducted market analysis of the artisanal cheese industry, evaluated direct competitors and larger brands, and created **three detailed buyer personas** using demographic, psychographic, and behavioral data. We built empathy maps through interviews and surveys to understand pain points, from the overwhelm of choosing at the cheese counter to wanting to feel like a knowledgeable food enthusiast.",
    solution:"Developed a **seven-component integrated strategy**: (1) Brand positioning around craftsmanship and tradition. (2) Brand voice and messaging framework with maker's journey storytelling. (3) Seasonal and product-specific campaign themes. (4) Creative concepts with mood boards showcasing the cheese-making process. (5) **Channel strategy tailored to audience behavior**. (6) Content strategy for education, engagement, and conversion. (7) Measurement framework with KPIs for every initiative.",
    results:"Delivered **clear, implementable brand positioning** differentiating Beecher's from both mass-market and competing artisanal brands. Well-defined personas provided a foundation for targeted marketing. Multi-channel plan included draft content ready for refinement. The strategy was presented to stakeholders and received positive feedback as a **viable roadmap for market expansion**."
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
    image:null /* /images/uw-intl-students.png is not in public/images */, imageAlt:"UW Communication Leadership International Students page redesign",
    caseStudyUrl:"https://drive.google.com/file/d/1YMI0IE35YWikw2ZjTdZ0F9rtPUV4EhRB/view?usp=sharing", caseStudyLabel:"View content strategy doc",
    metrics:[{v:"25%+",l:"Student body served"},{v:"100%",l:"Mobile responsive"}],
    problem:"UW's Communication Leadership website had an international student section causing significant frustration. **Over 25% of the student body** faced usability issues, inaccessible content, and high cognitive load, particularly for non-native English speakers. The architecture didn't match how students actually looked for information.",
    research:"Usability testing with diverse international students revealed the primary issue: **not missing content, but content organization and language complexity** creating unnecessary cognitive burden. I mapped user journeys for key tasks, understanding requirements, navigating applications, finding financial aid, and accessing support services.",
    solution:"Reorganized site architecture based on **how students actually search for information**, not how the university internally organized it. Rewrote all content for clarity and cultural sensitivity: shorter sentences, removed jargon, added contextual explanations for U.S.-specific concepts. Implemented **responsive design, accessibility features, FAQ section**, and a language selection tool focused on reducing cognitive load at every step.",
    results:"Delivered **intuitive navigation with shorter paths** to key information. Content was clear, concise, and culturally inclusive. Mobile-friendly and accessible design. Application process streamlined with step-by-step guidance. Non-native speakers reported **reduced cognitive load** in follow-up testing."
  },
  {
    id:"dataviz", title:"Data Analytics & Visualization",
    tags:["Analytics","Data Viz"],
    oneLiner:"How age and income shape digital ad performance, told through data.",
    image:null /* /images/dataviz-ctr.png is not in public/images */, imageAlt:"Z-score comparison of CTR and conversion rate performance by age group",
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
export const aiProjects = [
  {
    id:"aeo-dashboard", title:"AEO/GEO Visibility Dashboard",
    tags:["AI","Analytics","Data Viz","Automation"],
    oneLiner:"A five-stage pipeline that measures how often AI answer engines mention Flatiron by name, and how strongly they recommend it over competitors. Current standing: 61% mention rate, 35% share of voice, roughly double the nearest competitor.",
    image:null,
    metrics:[{v:"61%",l:"Mention rate"},{v:"35%",l:"Share of voice"},{v:"~2x",l:"Nearest competitor"},{v:"5x",l:"Runs per prompt, per cycle"}],
    hook:"Answer engines like ChatGPT, Perplexity, and Gemini are quietly becoming the first place prospective students look. I built the system that tells us whether Flatiron shows up in those answers, and whether it's the school being recommended or just one listed in passing.",
    problem:"AI answer engines increasingly decide which schools get surfaced before a prospective student ever lands on a website. Flatiron had **no way to measure this**: no baseline mention rate, no sense of how it compared to competing bootcamps in AI-generated answers, and no way to tell whether a content change or campaign actually moved the needle in that channel. AEO/GEO (answer engine optimization / generative engine optimization) was a blind spot.",
    research:"I mapped the actual questions prospective students ask AI tools when researching coding bootcamps: comparison questions, city-specific questions, curriculum and outcomes questions. Single-run testing was unreliable since the same prompt can produce a different answer from one run to the next, even with identical inputs. To control for that, I ran **each prompt five times per cycle** rather than once, and treated **an explicit recommendation as a different outcome from a passing mention**, since showing up in a list of ten schools means something different from being the model's actual pick.",
    solution:"Built a **five-stage Python pipeline**: (1) **Prompt config** — the fixed set of prompts and the competitor set to track. (2) **Scheduled runs** — GitHub Actions triggers each cycle on a recurring schedule with zero manual steps. (3) **Response parsing** — every AI response gets parsed to detect whether Flatiron is mentioned, whether it's explicitly recommended versus just listed, and which competitors appear alongside it. (4) **Time-series storage** — results land in SQLite, preserving history instead of overwriting it, so trends are visible over time, not just a single snapshot. (5) **Live dashboard** — mention rate, share of voice, and competitor comparison, rendered for the team to check without touching the underlying data.",
    results:"Current standing: **61% mention rate** and **35% share of voice**, roughly **double the nearest competitor**. Because scoring separates recommendations from passing mentions, the dashboard shows not just whether Flatiron shows up, but whether the model is actually vouching for it, not just listing it. Running each prompt five times per cycle keeps the numbers from swinging on model randomness alone, so week-over-week movement reflects a real shift, not noise. **Built with:** Python, GitHub Actions, SQLite, prompt-based evaluation."
  },
  {
    id:"agentic-crm", title:"Agentic CRM Layer",
    tags:["MCP","LLM","CRM Infrastructure"],
    oneLiner:"HubSpot already ships an MCP server so AI agents can use its CRM. I tested it against a CRM I built myself, found exactly where the design breaks down, and rebuilt it around a different principle.",
    image:null,
    caseStudyUrl:"https://github.com/tkaplish888-alt/gtm-agent-layer", caseStudyLabel:"View on GitHub",
    metrics:[{v:"2 vs 7",l:"Tool calls to find stale deals"},{v:"112 / $3.68M",l:"Stale deals surfaced (official found 0)"},{v:"32% vs 3.4%",l:"Referral vs. paid_social win rate"},{v:"0 of 2,942",l:"Notes ever queried by official server"}],
    hook:"HubSpot already ships an MCP server so AI agents can use its CRM. I tested it against a CRM I built myself, found exactly where the design breaks down, and rebuilt it around a different principle.",
    problem:"Every CRM integration built for AI agents so far still carries an old assumption: organize the tools the way the database is organized. Contacts here, companies there, deals in their own bucket. That's a fine shape for a person clicking through screens. It's the wrong shape for an agent trying to answer a real question, because **real questions don't live inside one table**. \"Which deals have gone quiet, who owns them, and what should I say\" touches four objects and a join. Hand an agent tools built for objects instead of questions, and it starts assembling the join itself, one lookup at a time, deciding on its own when it's seen enough. **That decision happens silently. The answer looks finished either way.**",
    research:"I didn't take the gap on faith. I built a **synthetic CRM engineered to hold the mess real ones actually have**: missing fields, duplicate records, deals aged from days to months. I set the correct answers before running a single test, which turned the evaluation into arithmetic instead of opinion. Then I ran the questions an operator actually asks, not a demo question, against the existing tooling and watched exactly where the seams opened up.",
    solution:"The fix wasn't a bigger toolkit. It was a **different design principle**. I rebuilt the server so every tool is shaped around a decision someone needs to make, not a table in a database, joining contact to company to deal to activity on the backend so the agent hands back one finished answer instead of stitching one together in front of you. **Every write action drafts.** Nothing reaches a customer without a person approving it first, by design, not as a limitation bolted on after. It's the same shift every CRM platform will eventually have to make: **from tools built for people to click, to tools built for agents to reason with.** This one just made the move early.",
    results:"I connected both servers to Claude Desktop against the same HubSpot portal and asked them the same questions. Same MCP, same REST API, same data, the only variable was how the tools were shaped. Asked which deals had gone quiet for 30 days, the official server made **7 tool calls and found zero**, reading last-modified dates and concluding nothing was stale. The workflow-shaped server made **2 calls and found 112 deals, worth $3.68M**, with the longest silence running **313 days**. Asked which channel sends leads that don't close, the official server made **21 calls** and concluded the CRM had no channel data. It was reading HubSpot's built-in traffic-source field; the real answer lived in a custom property it never discovered. The workflow-shaped server made **2 calls** and returned **paid_social converting at 3.4%, against 32% for referrals**. The clearest result was what never got touched: across five runs and roughly 53 tool calls, the official server never queried a single one of the portal's **2,942 logged notes**, the exact data that answers 'who's gone quiet.' The strongest result wasn't something I built. Given the full picture in one consolidated payload instead of scattered lookups, Claude ranked stalled deals by silence and value, noticed that deals stuck at Contract Sent usually signal internal buyer friction rather than lost interest, and adjusted its outreach tone by role and channel, low-pressure for a referral lead, sharp and value-forward for a CTO. None of that reasoning is in the tool code. It became possible once the agent stopped spending its effort on retrieval. **Built with:** Python, FastMCP, HubSpot CRM API v3/v4, Claude Desktop."
  },
  {
    id:"voc", title:"Autonomous Voice-of-Customer Pipeline",
    tags:["AI","Voice of Customer","Automation","Analytics","Sales Enablement"],
    oneLiner:"An AI system that runs on trigger, not on command. It ingests sales call transcripts and outputs structured competitive intelligence, without a human in the loop.",
    image:null /* /images/valur.png is not in public/images */, imageAlt:"Valur logo, where the VOC pipeline was built",
    caseStudyUrl:"https://github.com/tkaplish888-alt/voc-pipeline", caseStudyLabel:"View on GitHub",
    metrics:[{v:"~90s",l:"Per transcript"},{v:"4-step",l:"Analysis chain"},{v:"<$0.05",l:"Per analysis"},{v:"7",l:"Objections extracted (sample)"}],
    problem:"Every sales call is full of signal. Bers name competitors, describe what 'too expensive' actually means to them, and reveal the internal politics blocking a deal. But in most startups, that intelligence dies in a call recording no one revisits. At Valur, the sales team was having rich, revealing conversations with financial advisors every day. Marketing had **no systematic way to capture those patterns** and feed them back into positioning, campaigns, or enablement materials. I was writing copy based on assumptions while the actual buyer language sat untouched in recordings.",
    research:"Analyzed dozens of transcripts across deal stages. Identified **recurring objection categories** (cost concerns, trust in fintech, complexity, comparison to traditional advisors), mapped the specific language clusters prospects used repeatedly, and documented decision-stage signals. Categorized objections by frequency, deal impact, and which ones required new messaging. The insight that shaped the architecture: this couldn't be a one-time research project. It needed to be **always-on infrastructure**.",
    solution:"Built an **autonomous pipeline** powered by the Claude API that processes sales call transcripts, G2 reviews, and support tickets through a 4-step analysis chain. **Step 1: Extract.** Claude reads the raw transcript and pulls out every buyer objection, hesitation, and notable quote, capturing exact language, not paraphrases. **Step 2: Classify.** Each objection gets tagged by category (pricing, trust, complexity, competitor, internal politics, timing) and by deal stage (discovery, evaluation, negotiation, closed-lost), with a 1-5 severity score. **Step 3: Compare.** New objections get checked against the existing library, flagging what's brand new, what's recurring, and what's a variation. **Step 4: Generate.** Claude produces an updated positioning brief and a practical objection-handling guide written in language sales reps would actually use. The system is **autonomous**: a Python folder watcher monitors a Google Drive inbox. New file in, full pipeline runs, Google Sheet updates, no human touch until review. A weekly VOC Digest summarizes trends in a 5-minute read.",
    results:"From a single sample transcript, the pipeline identified **7 distinct objections across 5 categories**, including **3 severity-4 blockers** (trust concerns about legitimacy, implementation fear from past bad experiences, and competitive pressure from an incumbent). It flagged **4 net-new objections** not in the existing library. Processing time: ~90 seconds. Cost: under $0.05. The system revealed that pricing transparency was a discovery-stage concern tied to website UX, not the actual price, and that internal champion enablement was a recurring theme: buyers wanted collateral they could hand to their legal team without needing to translate it. **Built with:** Claude API (Anthropic), Python, Google Drive API, Google Sheets API.",
    deepDiveImages:[
      { src:"/images/voc-input-drive.png", alt:"Google Drive folder containing sales call transcripts fed into the pipeline", caption:"Input: Google Drive transcript inbox", label:"Open in Google Drive", url:"https://drive.google.com/drive/folders/1iXHctXDoNybxegH3nz0nXgXbp1k1Z1OJ?usp=sharing" },
      { src:"/images/voc-output-sheet.png", alt:"Google Sheet showing structured pipeline output with objections, categories, and severity scores", caption:"Output: Structured analysis in Google Sheets", label:"Open in Google Sheets", url:"https://docs.google.com/spreadsheets/d/1m8_viBvOqxlWLd9-Tp43HEeB84CX7rt8s7crgSSFrvk/edit?usp=sharing" },
    ]
  },
  {
    id:"comp-intel", title:"Autonomous Competitive Intelligence Monitor",
    tags:["AI","Competitive Intelligence","Web Scraping","Automation","Slack"],
    oneLiner:"A system that watches competitor websites on autopilot. When messaging, pricing, or positioning changes, it detects the shift and sends a Slack alert with a strategic analysis. No dashboards to check. No manual reviews. It just runs.",
    image:null,
    deepDiveDescription:"Here's what an alert looks like when the monitor detects a change.",
    deepDiveImages:[
      { src:"/images/comp-intel-slack-alert.png", alt:"Slack alert from the Competitive Intel Bot showing a detected change on Trust & Will with significance rating and structured analysis", caption:"", label:null, url:null },
    ],
    caseStudyUrl:"https://github.com/tkaplish888-alt/competitive-intel-monitor", caseStudyLabel:"View on GitHub",
    metrics:[{v:"5",l:"Competitors monitored"},{v:"Weekly",l:"Autonomous runs"},{v:"<60s",l:"Per competitor analysis"},{v:"Zero",l:"Manual effort after setup"}],
    problem:"Competitive intelligence in most marketing teams is a spreadsheet someone updates when they remember to. A quarterly slide deck built on whatever someone noticed while browsing a competitor's site. By the time the team learns a competitor changed their pricing page or repositioned their messaging, the window to respond strategically has already closed. **The real cost isn't missing one change. It's the pattern blindness that builds when no one is systematically watching.** At Valur, I tracked five direct competitors in the estate planning space. Doing it manually meant inconsistent coverage, missed shifts, and no structured way to assess whether a change actually mattered.",
    research:"Studied how competitive intelligence actually works (and fails) in growth-stage startups. Found the same pattern everywhere: **teams have a competitor list but no monitoring system**. Tools like Crayon and Klue exist but cost $20K+/year and are built for enterprise CI teams, not a solo marketer who needs to know when Trust & Will changes their homepage headline. Mapped the specific signals that matter most for positioning response: messaging language shifts, pricing/packaging changes, new feature announcements, and positioning pivots. The insight that shaped the architecture: most competitor changes are noise. **The system needed to distinguish signal from noise autonomously**, not just flag every edit.",
    solution:"Built a **fully autonomous monitoring system** using Python, BeautifulSoup, and the Claude API. **Step 1: Fetch.** BeautifulSoup scrapes each competitor's key pages weekly, extracting clean text content with a spoofed User-Agent to avoid blocks. **Step 2: Compare.** The system stores up to 10 historical snapshots per URL. Each new fetch gets diffed against the previous version. If the page is identical, it skips analysis entirely, saving API costs. **Step 3: Analyze.** When a real change is detected, Claude receives both versions with a structured prompt and returns a significance rating (HIGH/MEDIUM/LOW/NO CHANGE), a summary of what shifted, before/after messaging quotes, pricing or packaging changes, positioning shifts, and a recommended response. **Step 4: Alert.** Changes rated MEDIUM or above trigger a formatted Slack notification to a dedicated #competitive-intel channel. LOW changes get logged but don't interrupt anyone. **Runs weekly via GitHub Actions cron job. Zero manual effort after initial setup.** Configured with Valur's actual competitive set: Trust & Will, Vanilla, Wealth.com, Holistiplan, and Gentreo.",
    results:"System successfully deployed and tested against live competitor sites. The architecture **eliminates the most expensive failure mode in competitive intelligence: not checking**. The significance filter ensures the team only gets interrupted when something actually matters, solving the alert fatigue problem that kills most monitoring setups. Snapshot history (10 versions per URL) enables trend analysis over time, not just point-in-time comparisons. Total infrastructure cost: effectively zero (GitHub Actions free tier + minimal Claude API usage since identical pages skip analysis). **Built with:** Python, Claude API (Anthropic), BeautifulSoup, Slack Webhooks, GitHub Actions, JSON snapshot storage."
  },
  {
    id:"drfirst-gpt", title:"Custom GPT for Healthcare Brand Consistency",
    tags:["AI","Healthcare AI","Prompt Engineering","GPT"],
    oneLiner:"A custom ChatGPT trained on DrFirst's brand voice, enabling consistent content at scale.",
    image:null /* /images/drfirst-gpt.jpg is not in public/images */, imageAlt:"DrFirst Assistant custom GPT interface",
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
    image:null /* /images/braxbot-chat.png is not in public/images */, imageAlt:"Braxbot conversational interface prototype",
    caseStudyUrl:"https://www.canva.com/design/DAGGfblA5h4/Y5wJyWpv1uIFZ_4mYVHoFA/view?utm_content=DAGGfblA5h4&utm_campaign=designshare&utm_medium=link&utm_source=editor", caseStudyLabel:"View design proposal",
    secondaryUrl:"https://creator.voiceflow.com/prototype/664953a4856a15ccad6bd16d", secondaryLabel:"Try live prototype",
    metrics:[{v:"4",l:"Core design pillars"},{v:"Full",l:"Implementation proposal"}],
    problem:"The Braxton Institute provides resources and support to marginalized communities, but faced **limited information accessibility, insufficient engagement between events, no personalized support, and difficulty facilitating sensitive conversations at scale**. The people who most needed resources were least likely to navigate traditional website structures to find them.",
    research:"Researched how marginalized communities interact with organizational support: where they look first, what language they use, **what barriers prevent engagement**. Gathered staff requirements for common inquiries. Analyzed chatbot implementations in adjacent spaces (healthcare, education, crisis support) for best practices around **cultural sensitivity, tone, and trust-building** with vulnerable populations. Prototyped conversational flows and tested with users.",
    solution:"Designed 'Braxbot' on **Voiceflow** with four pillars: (1) **Empathetic personality** communicating with warmth and cultural awareness. (2) **Culturally sensitive visual representation** reflecting the community served. (3) **Crisis communication capabilities** recognizing distress and escalating to human support. (4) **Tailored conversational flows** for different audiences. Developed a full implementation proposal with technical architecture, prompt engineering guidelines, conversation design, and success metrics. The Voiceflow prototype includes a visual flow architecture with welcome, query capture, small talk, and solution nodes.",
    results:"Designed to increase accessibility, enhance community engagement, provide personalized educational content, facilitate safe public conversations on social justice, and **reduce staff workload for routine inquiries**. Demonstrated the potential for conversational AI to serve communities that traditional interfaces often fail, and provided a **replicable model for other mission-driven organizations**."
  },
  {
    id:"positioning-map", title:"Competitive Positioning Map (Embeddings-Based)",
    tags:["AI","Competitive Intelligence","Embeddings","NLP","GTM Strategy"],
    oneLiner:"Uses text embeddings to map how competitors position themselves across messaging, features, and audience. Instead of manually reading landing pages and decks, the system ingests competitor content, generates vector representations, and plots positioning clusters. You can see where messaging overlaps, where gaps exist, and how your own positioning compares — updated automatically as competitors ship new content.",
    image:null,
    caseStudyUrl:"https://github.com/tkaplish888-alt/competitive-positioning-map", caseStudyLabel:"View on GitHub",
    metrics:[{v:"Real-time",l:"Positioning updates"},{v:"Vector-based",l:"Semantic clustering"},{v:"Automated",l:"Content ingestion"},{v:"Visual",l:"Gap analysis"}],
    problem:"Traditional competitive positioning analysis is manual, slow, and snapshot-based. Someone reads through competitor websites, takes notes, and builds a positioning matrix in a slide deck. By the time the deck is reviewed, the landscape has shifted. **The bigger problem: manual analysis misses semantic overlap.** Two competitors can position differently on the surface while targeting the exact same buyer segment with nearly identical value props, just using different words. Human pattern recognition struggles to catch this at scale across 5+ competitors and dozens of pages.",
    research:"Analyzed how positioning analysis breaks down in practice. Found that teams either (1) do it once during a rebrand and never update it, or (2) assign it to someone who reviews competitor sites quarterly and writes a summary. Neither approach captures **semantic positioning overlap** or tracks shifts in real time. Researched text embedding models and vector similarity techniques. Identified that embeddings can surface when two competitors are saying fundamentally the same thing even when word choice differs, which is exactly what traditional competitive analysis misses.",
    solution:"Built a **positioning intelligence system** using embeddings and clustering. **Step 1: Ingest.** The system scrapes competitor landing pages, product pages, and key messaging content. Extracts headlines, hero copy, feature descriptions, and value props. **Step 2: Embed.** Each piece of content gets converted into a vector embedding using a transformer model. The embedding captures semantic meaning, not just keywords. **Step 3: Cluster.** The system plots all competitor embeddings in vector space and runs clustering algorithms to identify positioning groups. Competitors close together in vector space are positioning similarly, even if their language differs. **Step 4: Visualize.** Outputs a 2D positioning map showing clusters, gaps, and your own positioning relative to competitors. The map updates automatically as new competitor content is ingested. **Step 5: Recommend.** The system flags white space opportunities: areas where no competitors are positioning, or where your messaging overlaps too closely with a competitor's.",
    results:"From an initial set of 5 competitors in the fintech space, the system identified **3 distinct positioning clusters**: trust-focused (2 competitors emphasizing security and compliance), innovation-focused (2 competitors emphasizing AI and automation), and accessibility-focused (1 competitor emphasizing ease of use for non-experts). It flagged that the client's positioning sat directly in the middle of the trust and innovation clusters, creating **ambiguous differentiation**. The system recommended shifting messaging toward the accessibility gap, which was underserved. **Built with:** Python, OpenAI Embeddings API, scikit-learn (clustering), Plotly (visualization), BeautifulSoup (scraping)."
  },
  {
    id:"content-predictor", title:"Content Performance Predictor",
    tags:["AI","Content Strategy","Predictive Analytics","Machine Learning","Optimization"],
    oneLiner:"Predicts how a piece of content will perform before it's published. The model trains on historical content data — engagement rates, conversion metrics, format, topic, channel, publish timing — and scores draft content against learned patterns. It flags what's likely to underperform and suggests adjustments based on what's historically driven results in similar contexts.",
    image:null,
    metrics:[{v:"Pre-publish",l:"Performance scoring"},{v:"Historical",l:"Pattern learning"},{v:"Real-time",l:"Draft feedback"},{v:"Actionable",l:"Optimization suggestions"}],
    problem:"Most content teams operate on gut instinct. Someone drafts a blog post, schedules it, and waits to see if it performs. If it underperforms, the team says 'we'll try a different topic next time' and moves on. **There's no systematic way to predict performance before publishing**, which means teams waste time producing content destined to fail. The data exists: historical performance metrics, topic patterns, format trends, channel behavior. But it sits unused in analytics dashboards instead of feeding forward into content planning.",
    research:"Analyzed content performance data across B2B SaaS companies. Found that **high-performing content shares predictable characteristics**: specific topic clusters, optimal post length ranges, formatting patterns (lists vs. narratives), and timing windows. But teams rarely codify these patterns into decision-making frameworks. Interviewed content marketers and discovered the core issue: **analyzing what worked after the fact is easy. Predicting what will work before you write it is hard.** The insight: this is a supervised learning problem. Historical content is labeled training data. Draft content is unlabeled input. The model should score drafts against learned patterns.",
    solution:"Built a **predictive scoring model** that evaluates draft content before publication. **Step 1: Train.** The model ingests historical content data: post titles, topics, word count, format (listicle, how-to, case study, opinion), publish channel (blog, LinkedIn, email), publish day/time, and performance metrics (pageviews, engagement rate, conversion rate, time on page). It learns which features correlate with high performance. **Step 2: Score.** You input a draft title, topic, planned format, and channel. The model returns a performance score (0-100) predicting how it will perform relative to historical content. **Step 3: Explain.** The system surfaces which features are dragging the score down. Example: 'Posts on this topic historically underperform on LinkedIn but do well in email. Consider repositioning for email distribution.' Or: 'Your title structure matches low-performing patterns. High-performing titles in this topic use how-to framing.' **Step 4: Suggest.** Based on what's worked historically, the system recommends adjustments: title reframing, format changes, or channel shifts. **Step 5: Refine.** As new content publishes and performance data comes in, the model retrains automatically, improving predictions over time.",
    results:"Tested against 6 months of historical blog content from a SaaS company. The model correctly predicted **top-quartile vs. bottom-quartile performance with 76% accuracy**. It flagged that **how-to content outperformed opinion content by 3x on average**, and that posts published on Tuesday mornings had 40% higher engagement than Friday posts. For a draft titled 'Why We Built This Feature,' the model scored it 34/100 and recommended reframing as 'How to [Achieve Outcome] Using [Feature],' which matched a high-performing title pattern. The system turned content strategy from reactive to predictive. **Built with:** Python, scikit-learn (random forest classifier), pandas (data processing), historical content CSV, predictive scoring API."
  },
  {
    id:"lead-scoring", title:"Adaptive Lead Scoring Engine (with Feedback Loop)",
    tags:["AI","Lead Scoring","Predictive Analytics","Automation","Sales Intelligence"],
    oneLiner:"A lead scoring model that retrains itself every time a deal closes. Feed it historical lead data — company size, industry, contact role, acquisition channel, engagement signals like pages visited, emails opened, content downloaded — along with the outcome. The model learns which attributes predict conversion. Every new closed deal (won or lost) triggers automatic retraining. The system re-evaluates feature weights and updates the model on its own. If enterprise deals start outperforming mid-market, the model catches it. If an acquisition channel stops producing, scores adjust. It also flags drift — surfacing alerts like 'Your model's accuracy has dropped 8% this month — here's what changed in the data.'",
    image:null,
    metrics:[{v:"Auto-retrain",l:"After every deal close"},{v:"Drift detection",l:"Built-in accuracy monitoring"},{v:"Dynamic",l:"Feature weight updates"},{v:"Transparent",l:"Explainability included"}],
    problem:"Most lead scoring models are static. Someone builds a model based on historical data, deploys it, and it runs unchanged for months or years. **The problem: buyer behavior shifts. Market conditions change. What predicted conversion six months ago might not predict it today.** A channel that was high-intent last quarter could be flooded with low-quality leads this quarter. An industry that historically converted well might stop converting due to macroeconomic factors. Static models don't adapt. They degrade silently, and by the time someone notices the scores don't match reality, months of opportunity have been lost.",
    research:"Studied lead scoring implementations across B2B SaaS and fintech companies. Found that **most models are built once and forgotten**. Data scientists train a model during initial setup, sales uses it for a while, and then quietly stops trusting it because the scores stop matching their intuition. The core issue: **models are trained on historical data, but they operate in a dynamic environment.** Market conditions shift. Customer segments evolve. Channels mature. The solution isn't a better initial model. It's a model that **learns continuously** as new deals close, updating its understanding of what predicts conversion in real time.",
    solution:"Built a **self-updating lead scoring system** with automatic retraining and drift detection. **Step 1: Train.** The model ingests historical lead data: company size, industry, contact role, acquisition channel (organic, paid, referral, event), engagement signals (pages visited, emails opened, content downloaded, demo requests), and outcome (won, lost, still open). It learns which features predict conversion using a gradient-boosting classifier. **Step 2: Score.** Every new lead gets scored 0-100 based on feature similarity to historical converters. High scores go to sales. Low scores go to nurture. **Step 3: Feedback Loop.** Every time a deal closes (won or lost), the outcome gets fed back into the training data and the model retrains automatically. Feature weights update. If enterprise leads started converting at higher rates, their weight increases. If a previously high-performing channel degrades, its weight drops. **Step 4: Drift Detection.** The system tracks model accuracy over time. If accuracy drops below a threshold (e.g., 8% decline), it triggers an alert: 'Model accuracy has degraded. Here's what changed in the data: [summary of feature distribution shifts].' **Step 5: Explainability.** For every lead score, the system outputs which features contributed most. Example: 'Score: 87. Primary drivers: enterprise company size (+22), demo request (+18), organic acquisition (+12). Detractors: low email engagement (-5).'"
  },
];


/* ═══════════════════════════════════════════════
   DATA: TIMELINE
   ═══════════════════════════════════════════════ */
export const timeline = [
  { role:"Marketing Tech Lead", company:"Flatiron School", period:"Apr 2026 – Present · Remote",
    desc:"Replaced a four-tool registration chain — Formstack, Zoom, Customer.io, custom middleware — with one calendar-native Apps Script flow: lower cost, zero missed consent. Instrumented registration and attendance with HMAC-validated Zoom and Customer.io webhooks, closing a 30% registrant-to-attendee mismatch and unlocking the show-rate analytics admissions now runs on. Built a conversational AI flow that qualifies leads and captures full applications in-chat, with deterministic field mapping into Formstack and Close and the LLM scoped strictly to scoring. Shipped a five-stage Python pipeline tracking Flatiron's visibility in AI answers: 61% mention rate, 35% share of voice, roughly double the nearest competitor. Classified all 165 bot-handled chat transcripts via the Claude API against a validated failure taxonomy, cutting inbound lead noise 20% and arming sales with real buyer language.", current:true },
  { role:"Marketing Operations Analyst", note:"First Marketing Hire", company:"Valur", period:"2024 – Feb 2026",
    desc:"Built the marketing function from zero. Email campaigns hitting 54.84% open rate. Doubled partner calls in one week. Designed an autonomous voice-of-customer pipeline using the Claude API that extracts buyer objections and language patterns from sales call transcripts on an ongoing basis, grounding all messaging in real customer language. Built lead magnets and nurture sequences that grew top-of-funnel pipeline." },
  { role:"Product Marketing & Growth", company:"Yuzi Care", period:"2023 – 2024",
    desc:"Supported early go-to-market planning for an AI-powered postpartum care marketplace. Conducted competitive benchmarking and pricing analysis to inform positioning. Provided UX and pre-launch strategy research that informed the founding team's launch planning. 46% cold outreach CTR, 65% LinkedIn engagement lift." },
  { role:"Marketing Communications Intern", company:"DrFirst", period:"2023",
    desc:"Social strategy for iPrescribe, competitive intelligence, crisis comms planning. Built a custom GPT trained on DrFirst's brand guidelines with compliance guardrails and prompt templates for social, blogs, emails, and press releases, enabling org-wide on-brand content production." },
  { role:"Graduate Marketing Specialist", company:"UW Disability Cultural Center", period:"2022 – 2023",
    desc:"Technical SEO overhaul using Google Search Console, Screaming Frog, and Yoast. WordPress redesign unifying two sites. Newsletter CTR from 0.1% to 3.8%. Added AI-generated voice narration to enhance accessibility for the target audience, which became a permanent feature." },
];


/* ═══════════════════════════════════════════════
   DATA: EDUCATION
   ═══════════════════════════════════════════════ */
export const education = [
  {
    degree:"M.S. Communication: Digital Media, Marketing",
    school:"University of Washington",
    period:"Sep 2023 – Mar 2025",
    location:"Seattle, WA",
    gpa:"4.0",
    courses:"User Research, UX Design, Content Strategy for the Web, Digital Marketing and Branding, Qualitative Research for Social Media Marketing, Conversational AI, Media Entrepreneurship"
  },
  {
    degree:"Post Graduate Diploma in Public Relations, Advertising, and Applied Communication",
    school:"Panjab University, Chandigarh",
    period:"Sep 2022",
    location:"Chandigarh, India",
    gpa:"4.0",
    highlights:"Secured the highest score on the aptitude test during the admissions cycle. Editing team for first-ever department newsletter.",
    courses:"Communication Theory, Digital Advertising and Public Relations, Market Research"
  },
  {
    degree:"B.A. Honours in English Literature (British and Commonwealth)",
    school:"Panjab University, Chandigarh",
    period:"2019 – 2022",
    location:"Chandigarh, India",
    gpa:"82% (First Division) | Honours: 76.2% | GPA 3.79 (WES ICAP)",
    activities:"Declamation Society"
  },
];

/* ═══════════════════════════════════════════════
   DATA: CERTIFICATIONS
   ═══════════════════════════════════════════════ */
export const certifications = [
  { title:"Communicative English", issuer:"Panjab University", date:"Sep 2020" },
  { title:"Spanish Language Course", issuer:"Instituto Cervantes, New Delhi", date:"Jun 2022" },
];

/* ═══════════════════════════════════════════════
   DATA: REFERENCES
   ═══════════════════════════════════════════════ */
export const references = [
  {
    name:"Julia Osmar",
    linkedin:"https://www.linkedin.com/in/julia-osmar/",
    title:"Operations Leader | Customer Experience and Delivery | Team Builder",
    relationship:"Managed Tonishqa directly at Flatiron School",
    date:"September 14, 2026",
    quote:"It's rare to have someone on your team hit the ground as quickly as Tonishqa did. She quickly rolled up her sleeves, asked thoughtful questions to understand where her efforts could be most impactful and built out a roadmap to keep herself accountable. She is a true growth systems thinker and spent several months turning heavy, manual marketing workflows into streamlined, AI-native systems, including evaluation pipelines that catch chatbot failures and automation that connects CRM and event data without manual upkeep. In addition, she is thoughtful, resourceful and amazing to work with - a true delight to have on your team. Every Marketing team needs a Tonishqa!"
  },
  {
    name:"Jem Millett",
    linkedin:"https://www.linkedin.com/in/jemillett/",
    title:"Revenue Operations & Sales Leader | Building AI-enabled forecasting, pipeline, and CRM systems for growth-stage companies | 90%+ CAC reduction, 2500% ARR increase in 12mo | 3x successful Exit",
    relationship:"Worked with Tonishqa on different teams at Flatiron School",
    date:"September 14, 2026",
    quote:"Tonishqa partnered with me on some of the most technical, cross-functional projects I ran at Flatiron School, including migrating our Jira ticketing system to Crisp, our AI-enabled live chat platform. She built the workflows that let admissions and marketing use the new system day-to-day, not just the backend that made it possible. What stood out was how she worked across teams. She didn't just ship the technical piece and move on. She sat with admissions and marketing to understand what they actually needed, then built for that instead of building what was easiest to build. That's a rare combination: someone who can architect an AI system and also translate it for the people who have to live in it every day. Any team bringing her on gets someone who treats technical work as a means to an actual outcome, not an end in itself."
  },
  {
    name:"Susan Lawson-Dawson",
    title:"Word Wrangler",
    relationship:"Mentor at DrFirst",
    date:"August 14, 2024",
    quote:"I had the pleasure of mentoring Tonishqa during her internship at DrFirst. What really stood out to me was her attitude. She was always eager to learn, open to feedback, and ready to tackle any challenge we threw her way. My work with Tonishqa centered on a competitive intelligence (CI) project. She dove in with enthusiasm, helping to audit the many places where CI currently 'lives' and develop an in-depth survey to send to internal stakeholders to align our competitive intelligence to better suit individual users' needs. Tonishqa also worked on several other projects, including an exciting generative AI project that I'm already finding useful! She proved herself as a solid multitasker, approaching each project with the same level of enthusiasm and commitment. If you're looking for someone who's smart, adaptable, and genuinely passionate about what they do, I highly recommend Tonishqa. Despite her short time with DrFirst, she made contributions that are already having a meaningful impact for our PR/Comms/Marketing teams."
  },
  {
    name:"Michelle Taylor",
    title:"Brand & Communications Executive | Founder, Taylor+Scale Healthcare & Senior Living",
    relationship:"Senior colleague at DrFirst",
    date:"August 13, 2024",
    quote:"My team had the pleasure of working with Tonishqa during her internship with DrFirst. She came in and hit the ground running. In three short months she took on crisis communications planning, ML/AI comms model training, and several other important projects. I found Tonishqa to exemplify our core values of being DDS - dedicated, driven, and smart in all that she did. She was self-directed, curious, emotionally intelligent, and carried herself with remarkable poise and professionalism."
  },
];


/* ═══════════════════════════════════════════════
   DATA: CONTENT PORTFOLIO
   ═══════════════════════════════════════════════ */
export const contentItems = [
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
