// src/data/portfolio.js
// Single source of truth for real content. Sourced from CV + confirmed live links.
// No invented clients, stats, testimonials, or achievements.

export const profile = {
  name: 'Muhammad Haseeb Ur Rehman',
  handle: 'haseebio',
  role: 'Full-stack Developer',
  roleTagline: 'Full-Stack Developer · MERN Stack · CS Student',
  bio: 'Full Stack + AI Engineer | React.js • Next.js • Node.js • Python | AI-Powered Applications | LLM Integrations | Building Scalable Web Solutions',
  location: 'Lahore, Punjab, Pakistan',
  email: 'haseebur341@gmail.com',
  phone: '0304-4170843',
  siteUrl: 'https://haseebio-portfolio.netlify.app',
  github: 'https://github.com/haseebio',
  linkedin: 'https://www.linkedin.com/in/haseebio',
  facebook: 'https://www.facebook.com/haseebio.dev',
  twitter: 'https://www.twitter.com/haseebio_dev',
  instagram: 'https://www.instagram.com/haseebio.dev',
  threads: 'https://www.threads.net/@haseebio.dev',
  discord: 'haseebio.dev',
  wechat: 'haseeb_codess',
  availableForWork: true,
};

export const heroCopy = {
  eyebrow: 'Full-stack developer / AI enthusiast',
  headline: ['I turn technical problems into', 'working products.'],
  lead: "Self-taught, CS student at University of Punjab, Lahore. I build the full pipeline — interface, logic, data, and increasingly, AI — not just the parts that look good in a screenshot.",
};

export const pipelineStages = [
  {
    key: 'idea',
    num: '01',
    icon: '💡',
    label: 'Idea',
    desc: 'Start with a real problem worth solving, not a technology looking for a use case.',
  },
  {
    key: 'plan',
    num: '02',
    icon: '🧭',
    label: 'Plan',
    desc: "Research what's actually needed and rough out the architecture before writing code.",
  },
  {
    key: 'build',
    num: '03',
    icon: '⚙️',
    label: 'Build',
    desc: 'Interface, logic, data, and the API connecting them — built and wired together.',
  },
  {
    key: 'ai',
    num: '04',
    icon: '✨',
    label: 'AI',
    desc: 'Add AI only where it removes real work, with cost and structure controlled from day one.',
  },
  {
    key: 'product',
    num: '05',
    icon: '🚀',
    label: 'Product',
    desc: 'Shipped, live, and actually used — not a demo that stops after the pitch.',
  },
];

// Merged from CV technical-skills section + existing project stack notes.
export const capabilities = [
  {
    key: 'frontend',
    icon: '🎨',
    title: 'Frontend',
    desc: 'Interfaces that respond fast and stay out of the way. React and Next.js for anything with routing and real state, TypeScript when a project is big enough to need it.',
    tags: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Zustand', 'Recharts'],
  },
  {
    key: 'backend',
    icon: '⚙️',
    title: 'Backend',
    desc: 'APIs, auth flows, and server-side logic — FastAPI when Python fits better, Express when it doesn\u2019t. Auth is never an afterthought.',
    tags: ['Node.js / Express', 'FastAPI (Python)', 'REST APIs', 'JWT + refresh rotation', 'Google OAuth 2.0', 'bcrypt', 'Helmet.js', 'CORS'],
  },
  {
    key: 'data',
    icon: '🗄️',
    title: 'Data',
    desc: 'Picking the database based on the shape of the problem — relational for structured records, document-based for flexible schemas — plus Python for analysis, forecasting, and visualization when the data calls for it.',
    tags: ['MongoDB', 'Mongoose ODM', 'PostgreSQL', 'Redis', 'Python', 'scikit-learn', 'Matplotlib'],
  },
  {
    key: 'realtime',
    icon: '⚡',
    title: 'Real-time',
    desc: 'Live order updates, multi-room chat, anything that needs to feel instant instead of refreshed.',
    tags: ['Socket.io', 'BullMQ queues'],
  },
  {
    key: 'ai',
    icon: '✨',
    title: 'AI / Automation',
    desc: 'Structured AI calls with hard budget caps — never free-text parsing, always a defined schema. Also use AI tooling directly to build faster.',
    tags: ['Gemini API integration', 'Claude Code', 'GPT-4o-mini (via n8n)', 'Structured JSON pipelines'],
  },
  {
    key: 'infra',
    icon: '🚀',
    title: 'Infra',
    desc: 'Getting a project from local machine to something with CI, a live URL, and — usually — zero hosting cost.',
    tags: ['Git / GitHub', 'GitHub Actions CI/CD', 'Docker Compose', 'Vercel / Render / Netlify'],
  },
];

export const principles = [
  { title: 'Simple interfaces.', desc: 'If a user needs a manual, the interface failed first.' },
  { title: 'Reliable systems.', desc: 'Rate limits, budget caps, and error handling before feature count.' },
  { title: 'Useful automation.', desc: 'AI where it removes real work — not because it\u2019s trendy to add.' },
  { title: 'Constant experimentation.', desc: 'Rebuilding StackRadar from a hackathon entry into a real production split-stack app.' },
];

// The three highlighted projects — SK Traders and StackRadar are also on the CV's
// professional experience section; TicketHandler is the most complete personal build.
export const featuredProjects = [
  {
    id: 'sk-traders',
    num: '01',
    title: 'SK Traders',
    tagline: 'Freelance full-stack e-commerce platform',
    problem: 'A Lahore laptop retailer needed a real e-commerce system — storefront, order management, and local payment methods, not just a product catalog.',
    build: 'Architected a 3-application system — storefront, admin panel, and backend API — using React, Node.js, and Express with MongoDB, spanning 100+ source files. Owned it end-to-end, working directly with the client on requirements. Built REST endpoints supporting 500+ concurrent users with rate limiting and failsafe database timeouts.',
    challenge: 'Security and reliability under real usage: JWT with refresh token rotation, Google OAuth 2.0, bcrypt password hashing, Helmet.js, a strict CORS whitelist, and server-side validation on every route — plus optimizing Mongoose schema design for fast lookups on indexed fields.',
    tags: ['React', 'Node/Express', 'MongoDB', 'JWT + OAuth', 'Socket.io'],
    status: 'Client work — not live yet',
    liveUrl: null,
    repoUrl: null,
    role: 'Freelance Full-Stack Developer',
    period: 'Jun 2026 – Present',
  },
  {
    id: 'stackradar',
    num: '02',
    title: 'StackRadar',
    tagline: 'AI-powered tech-stack trend analyzer',
    problem: 'Developers pick technologies based on hype, not evidence — what\u2019s actually in demand vs. what\u2019s loud on social media.',
    build: 'Processes the 2024 Stack Overflow Developer Survey (65,437 respondents, 180 countries) through a FastAPI backend with 5 rate-limited, input-validated endpoints, and a Next.js + TypeScript frontend with 4 interactive Recharts visualization sections.',
    challenge: 'Built a forecasting model with scikit-learn, trained on 24 months of Google Trends data, to predict 6-month technology demand trajectories — then deployed backend to Render and frontend to Vercel with an automated CI/CD pipeline.',
    tags: ['FastAPI', 'Next.js', 'TypeScript', 'scikit-learn', 'Recharts'],
    status: 'Live',
    liveUrl: 'https://stackradar-dev.vercel.app',
    repoUrl: 'https://github.com/haseebio/stackradar-frontend',
    role: 'Full-Stack Developer',
    period: 'Jun 2026 – Jul 2026',
  },
  {
    id: 'tickethandler',
    num: '03',
    title: 'TicketHandler',
    tagline: 'AI-powered support ticket triage',
    problem: 'Support tickets pile up unsorted — no consistent priority, category, or routing until a human reads every single one.',
    build: 'Tickets are auto-categorized, prioritized, and summarized on submission using Gemini, then routed by rule. Every AI call returns one fixed JSON schema — no free-text parsing anywhere in the pipeline.',
    challenge: 'Keeping AI cost predictable: hard caps at 10 requests/min and 800/day, enforced server-side, with 12 automated tests covering the triage logic and budget enforcement specifically.',
    tags: ['Node/Express', 'Next.js', 'Postgres', 'Gemini AI', 'JWT auth'],
    status: 'Live',
    liveUrl: 'https://tickethandler-haseeb.vercel.app',
    repoUrl: 'https://github.com/haseebio/ticket-triage',
    role: 'Personal project',
    period: null,
  },
];

export const otherProjects = [
  {
    id: 'openchat',
    num: '04',
    title: 'Real-Time Multi-Room Chat App',
    tagline: 'Socket.io-based multi-room chat',
    problem: 'Wanted a real-time messaging system that handles multiple concurrent chat rooms cleanly, not just a single global feed.',
    build: 'Built with Socket.io and Node.js, supporting multiple concurrent chat rooms with persistent message history.',
    challenge: 'User authentication tied to persistent message history stored in MongoDB, so conversations survive reconnects.',
    tags: ['Socket.io', 'Node.js', 'MongoDB'],
    status: 'Live',
    liveUrl: 'https://openchat-live.vercel.app/',
    repoUrl: null,
    role: 'Personal project',
    period: 'Mar 2026 – May 2026',
  },
  {
    id: 'website-health-checker',
    num: '05',
    title: 'Website Health Checker',
    tagline: 'Core personal portfolio project',
    problem: 'Wanted a quick way to check a website\u2019s health without digging through multiple separate tools.',
    build: 'A standalone health-check tool, one of the core personal projects in the portfolio lineup.',
    challenge: null,
    tags: [],
    status: 'Live',
    liveUrl: 'https://websitehealthchecker.netlify.app',
    repoUrl: null,
    role: 'Personal project',
    period: null,
  },
];

export const projects = [...featuredProjects, ...otherProjects];

export const aboutTimeline = [
  { stage: 'Curiosity', text: 'Started exploring how software actually works — not just using it.' },
  { stage: 'Learning', text: 'Self-taught the MERN and TypeScript stack, no bootcamp — mostly by building and breaking things.' },
  { stage: 'Building', text: 'Shipped real projects with real backends: an e-commerce platform for a real client, a ticket triage system, a data-driven analyzer.' },
  { stage: 'Automation', text: 'Started integrating AI into products with structured, cost-controlled pipelines — and using AI-assisted tools like Claude Code directly in the build process.' },
  { stage: 'Exploring', text: 'Currently going deeper into Generative AI and where it actually fits into production systems.' },
];

export const nowStatus = {
  learning: 'Generative AI',
  building: 'Real-world full-stack products',
  exploring: 'AI automation and intelligent workflows',
};

export const aboutFacts = [
  { label: 'Location', value: 'Lahore, Pakistan' },
  { label: 'Focus', value: 'Full-stack MERN + AI integration' },
  { label: 'Status', value: 'Open to freelance & internship work' },
  { label: 'Education', value: 'BS Computer Science, University of the Punjab (2025–Present)' },
];

export const contactCopy = {
  headline: 'Have an idea worth building?',
  lead: 'Open to freelance work and internships. If you need a full-stack build — not a mockup, an actual working product — reach out.',
};

// Core competencies — evidence-based, each tied to a real project rather than
// a bare claim. Lives as a section on the Skills page, not a standalone page.
export const coreCompetencies = [
  {
    key: 'crud',
    title: 'CRUD Operations',
    desc: 'Every project starts with getting data creation, retrieval, updates, and deletes right — validated input and indexed queries, before anything else works.',
    projectPath: '/projects#sk-traders',
    projectLabel: 'See it in SK Traders',
  },
  {
    key: 'api',
    title: 'API Integration & Mapping',
    desc: 'Wiring third-party APIs into a product cleanly — mapping their data shape into something the rest of the app can actually use, with rate limits and validation on the way in.',
    projectPath: '/projects#stackradar',
    projectLabel: 'See it in StackRadar',
  },
  {
    key: 'auth',
    title: 'Auth & Security',
    desc: 'JWT with refresh token rotation, Google OAuth 2.0, bcrypt hashing — auth that\u2019s designed in from the start, not bolted on at the end.',
    projectPath: '/projects#sk-traders',
    projectLabel: 'See it in SK Traders',
  },
  {
    key: 'realtime',
    title: 'Real-time Systems',
    desc: 'Socket.io-based live updates — order status, multi-room chat — built to handle reconnects without losing state.',
    projectPath: '/projects#openchat',
    projectLabel: 'See it in the Chat App',
  },
];

// Per-page SEO — title/description pairs so every route has its own unique
// meta instead of all pages sharing one generic tag (the duplicate-title
// issue flagged in the SEO audit).
export const pageMeta = {
  home: {
    title: `${profile.name} — Full-Stack Developer`,
    description: profile.bio,
  },
  about: {
    title: `About — ${profile.name}`,
    description:
      'CS student and self-taught full-stack developer based in Lahore, Pakistan. Real projects, real backends — not a tutorial portfolio.',
  },
  projects: {
    title: `Work — ${profile.name}`,
    description:
      'Full-stack projects built end-to-end: an AI-powered ticket triage system, a tech-stack demand analyzer, and a live e-commerce platform.',
  },
  skills: {
    title: `Skills — ${profile.name}`,
    description:
      'React, Next.js, Node.js, Python, and AI integration — the stack behind every project, with real evidence for each one.',
  },
  contact: {
    title: `Contact — ${profile.name}`,
    description: contactCopy.lead,
  },
};