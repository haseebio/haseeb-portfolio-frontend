// src/data/blog.js
// Real posts only — each one is a case-study writeup of an actual project,
// using facts already documented elsewhere (see data/portfolio.js). No invented events,
// no fabricated stats, no first-hand claims beyond what's actually documented.
//
// body block types:
//   { type: 'p',    text }              — paragraph. Supports [label](url) inline links —
//                                          internal (starts with /) or external, rendered via RichText.
//   { type: 'h',    text }              — H2 subheading
//   { type: 'h3',   text }              — H3 subheading (nested under the preceding H2)
//   { type: 'code', code, language }    — code block with copy button
//   { type: 'list', items }             — bullet list (items support the same [label](url) syntax)
//
// post-level fields:
//   primaryKeyword, secondaryKeywords   — keyword targets, tracked here for the content calendar,
//                                          not injected as a meta keywords tag (Google ignores it)
//   faq                                 — [{ q, a }], rendered as its own section + FAQPage schema

export const blogPosts = [
  {
    slug: 'hard-budget-cap-on-every-ai-call',
    title: 'Why I Put a Hard Budget Cap on Every AI Call',
    excerpt:
      "Every AI call in TicketHandler is capped at 10 requests a minute and 800 a day, enforced server-side. Here's why that rule exists and how to apply it to your own AI feature.",
    date: '2026-07-15',
    readTime: '6 min read',
    tags: ['AI', 'Engineering', 'TicketHandler'],
    primaryKeyword: 'AI API rate limiting',
    secondaryKeywords: [
      'Gemini API cost control',
      'structured output JSON schema',
      'prevent AI API runaway costs',
      'LLM budget cap implementation',
    ],
    body: [
      {
        type: 'p',
        text: `Short answer: every AI call in [TicketHandler](/projects#tickethandler) is capped at 10 requests a minute and 800 a day, enforced on the server, no exceptions. If a request would go over that limit, the system rejects it before it reaches [Gemini](https://ai.google.dev/gemini-api/docs), not after. That one rule is the difference between an AI feature that's safe to leave running unattended and one that can quietly turn into a bill you don't notice until it's too late to stop.`,
      },
      { type: 'h', text: 'The problem nobody demos' },
      {
        type: 'p',
        text: `Most AI feature demos skip the part that actually matters in production. TicketHandler — a support ticket triage system I built — auto-categorizes, prioritizes, and summarizes every incoming ticket using Gemini. That's fine at demo volume, a handful of test tickets typed in by hand. It stops being fine the moment real traffic hits, because nothing about a typical AI integration naturally slows down when usage spikes. The API will accept as many requests as you send it, for as long as your card keeps getting charged. Nobody puts that part in the pitch.`,
      },
      { type: 'h', text: 'Rule one: never free text, always a schema' },
      {
        type: 'p',
        text: `Every single AI call in TicketHandler returns one fixed [JSON schema](https://json-schema.org/) — category, priority, summary. No open-ended prompting, no parsing loosely-structured text and hoping it matches what the UI expects. That's not a style preference, it's a cost and reliability decision at the same time: structured output is shorter, which means fewer tokens, and it's predictable, which means the code calling it doesn't need a pile of defensive parsing logic for every possible way the model might phrase an answer.`,
      },
      { type: 'h3', text: "What happens when the model doesn't comply" },
      {
        type: 'p',
        text: `If the model ever returns something that doesn't fit the schema, that's a defined failure case, not a silent bug three steps downstream. The request gets treated as failed and logged, the same way a database write failure or an API timeout would be — not retried forever, not swallowed. An AI call that fails loudly is much cheaper to fix than one that fails quietly and shows up as a support ticket about a support-ticket system.`,
      },
      { type: 'h', text: 'Rule two: hard caps, enforced server-side' },
      {
        type: 'p',
        text: `Budget enforcement happens server-side, not as a UI suggestion someone could bypass by calling the API directly. The limits are hard: 10 AI requests per minute, 800 per day. Once you hit the ceiling, the system degrades gracefully — new tickets still get created, they just wait for manual triage instead of AI triage — instead of quietly running up a bill you find out about at the end of the month.`,
      },
      { type: 'h3', text: "Why client-side limits don't count" },
      {
        type: 'p',
        text: `A rate limit implemented only in the frontend is a suggestion, not a control. Anyone who opens the browser's network tab can see the request being made and replay it directly against your backend, skipping whatever UI logic was supposed to stop them. If a limit matters — and a budget cap always matters — it has to live on the server, checked before the request to the AI provider goes out, not after.`,
      },
      { type: 'h', text: 'Common mistakes when adding AI to a product' },
      {
        type: 'list',
        items: [
          'Shipping with no rate limit at all, because the demo never generated enough traffic to expose the problem',
          'Trusting a client-side check as if it were a real control',
          'Parsing free-text model output instead of requesting structured JSON, which turns every response format change into a potential bug',
          'Testing only the happy path — nobody tests what happens when the budget cap actually triggers, until it triggers in production for the first time',
        ],
      },
      { type: 'h', text: 'What actually made this production-ready' },
      {
        type: 'p',
        text: `Getting Gemini to categorize a ticket correctly is the easy 80%. The other 20% — budget caps, structured schemas, and 12 automated tests specifically covering the triage logic and budget enforcement — is what makes it something you could actually hand to a real support team without worrying it'll surprise you. None of that 20% shows up in a demo video. All of it is the reason the system is still predictable under real load.`,
      },
      { type: 'h', text: "Best practices if you're adding AI to your own product" },
      {
        type: 'list',
        items: [
          'Define the output schema before you write the prompt, not after — design the contract first',
          'Put every limit on the server, checked before the provider call goes out',
          "Make the \u201cover budget\u201d state a designed UI state, not something that surfaces as an unhandled error",
          "Write a test for the limit path itself — it's the one path that only runs when something's already gone wrong",
          'Log every rejected request. That log is the only honest picture of real demand versus what you allowed through',
        ],
      },
      {
        type: 'p',
        text: `If you're deciding how to structure your own AI feature's cost controls, this is the same reasoning I used for [StackRadar](/blog/stackradar-hackathon-to-production)'s rate-limited API endpoints — a different technology stack, the same underlying principle: limits belong on the server, not in the UI.`,
      },
    ],
    faq: [
      {
        q: 'How do you rate-limit AI API calls in a backend?',
        a: 'Enforce the cap server-side with a counter tied to a fixed time window (per minute, per day), checked before the request to the AI provider goes out. If the counter is at its limit, reject the request immediately rather than queueing it indefinitely.',
      },
      {
        q: "What happens if you exceed the AI provider's own rate limits?",
        a: "Providers like Gemini enforce their own limits separately from anything you build. The point of an application-level cap set below your provider's ceiling is to fail predictably on your own terms — with a UI state you designed — instead of hitting the provider's limit unexpectedly and getting whatever error message they return.",
      },
      {
        q: 'Do budget caps hurt the user experience?',
        a: "Not if the fallback is designed. In TicketHandler, hitting the cap doesn't block ticket creation \u2014 it just means that ticket waits for manual triage instead of AI triage. The feature degrades, it doesn't break.",
      },
      {
        q: 'Where can I see this implemented?',
        a: 'The system is live at [tickethandler-haseeb.vercel.app](https://tickethandler-haseeb.vercel.app), and the full technical breakdown is on the [TicketHandler project page](/projects#tickethandler).',
      },
    ],
  },
  {
    slug: 'stackradar-hackathon-to-production',
    title: 'Rebuilding StackRadar: From Hackathon Demo to Production App',
    excerpt:
      "StackRadar started as a Generative AI Hackathon entry. The dataset didn't change when I rebuilt it \u2014 the architecture, security, and reliability around it did. Here's the actual checklist.",
    date: '2026-06-20',
    readTime: '6 min read',
    tags: ['StackRadar', 'Architecture', 'Python'],
    primaryKeyword: 'turning a hackathon project into production',
    secondaryKeywords: [
      'FastAPI Next.js production deployment',
      'securing a FastAPI backend',
      'hackathon to production checklist',
      'scikit-learn forecasting deployment',
    ],
    body: [
      {
        type: 'p',
        text: `Short answer: the core idea and dataset didn't change. The architecture, security, and reliability around it did. [StackRadar](/projects#stackradar) started as a single script built for a Generative AI Hackathon aligned with SDG 8. Turning it into something meant to stay live meant splitting it into a proper backend and frontend, adding real rate limiting and input validation, and building a forecasting layer the original demo never had.`,
      },
      { type: 'h', text: 'What a hackathon project gets right, and what it skips' },
      {
        type: 'p',
        text: `Hackathon code optimizes for one thing: working on demo day, in front of judges, on your machine. That's a reasonable trade-off under a 24-to-48-hour deadline. It's the right call to skip production concerns then. It's the wrong call to leave them skipped afterward, if the project is going to outlive the hackathon.`,
      },
      { type: 'h', text: 'Splitting one script into a real system' },
      {
        type: 'p',
        text: `The core dataset — the [2024 Stack Overflow Developer Survey](https://survey.stackoverflow.co/2024/), 65,437 respondents across 180 countries — stayed exactly the same. What changed was everything around it: a split deployment with a [FastAPI](https://fastapi.tiangolo.com/) backend on Render and a [Next.js 14](https://nextjs.org/docs) frontend on Vercel, talking over a REST API instead of living in one monolithic hackathon script.`,
      },
      { type: 'h3', text: 'Why split deployment instead of one app' },
      {
        type: 'p',
        text: `A single script is easy to run once. It's harder to scale, harder to secure, and harder to deploy on free hosting tiers, which usually expect one process doing one job. Splitting the data-processing backend from the interactive frontend meant each half could be deployed, scaled, and redeployed independently — and each free tier (Render for the API, Vercel for the frontend) is doing the job it's actually designed for.`,
      },
      { type: 'h', text: "Adding a forecasting layer the demo didn't need" },
      {
        type: 'p',
        text: `A hackathon demo can just show current data and that's enough to impress judges in a five-minute pitch. A tool people might actually return to needs to say something about where things are headed. I added a forecasting model built with [scikit-learn](https://scikit-learn.org/stable/), trained on 24 months of Google Trends data, to predict 6-month technology demand trajectories — surfaced through 4 interactive Recharts visualizations on the frontend. That feature exists because "current data" stops being interesting the second time someone visits.`,
      },
      { type: 'h', text: "The security checklist a hackathon entry never needs" },
      {
        type: 'list',
        items: [
          'CORS locked to the frontend URL only, not left open to any origin',
          'Rate limiting on every endpoint, not just the ones that seemed obviously expensive',
          'Input validation on every request \u2014 max length enforced, HTML stripped, technology names checked against a whitelist',
          'Swagger UI disabled in production, so the full API surface isn\u2019t browsable by anyone who finds the URL',
          'No stack traces leaking into error responses \u2014 a failed request tells the client it failed, not why, internally, it failed',
        ],
      },
      { type: 'h', text: 'Common mistakes when moving a prototype to production' },
      {
        type: 'list',
        items: [
          "Assuming demo-day traffic represents real usage \u2014 five judges clicking once is nothing like real load",
          'Leaving debug endpoints or interactive API docs open in production, because closing them "can happen later"',
          'Skipping input validation because it worked fine in testing with well-behaved input',
          'Not separating development and production configuration, so a local `.env` value quietly ends up controlling production behavior',
        ],
      },
      { type: 'h', text: 'Best practices for the hackathon-to-production jump' },
      {
        type: 'list',
        items: [
          'Treat the rebuild as its own project, not a patch on top of the hackathon code',
          'Add automated deployment (CI/CD) before adding new features \u2014 it catches mistakes before they reach users',
          'Lock down anything that was deliberately left open for judges to inspect',
          'Write down what changed and why. A case study like this one is basically documentation for the next time you do this',
        ],
      },
      {
        type: 'p',
        text: `The same discipline applies outside of data pipelines. I used the same server-side-first thinking when I wrote about [rate-limiting AI calls in TicketHandler](/blog/hard-budget-cap-on-every-ai-call) \u2014 different stack, same underlying rule: nothing that matters for cost or security should live only on the client.`,
      },
    ],
    faq: [
      {
        q: 'How do I turn a hackathon project into a production app?',
        a: 'Start by separating what made the demo work (the core idea, the data) from what made it fast to build (skipped security, no rate limiting, hardcoded config). Rebuild the second part properly \u2014 split architecture where it makes sense, add validation and rate limiting, disable anything left open for judges \u2014 while keeping the first part intact.',
      },
      {
        q: 'Why use a split FastAPI + Next.js architecture instead of one framework?',
        a: 'It lets the data-processing backend and the interactive frontend scale, deploy, and fail independently, and it matches how most free hosting tiers are actually designed \u2014 one process, one job \u2014 rather than fighting the platform to run both from a single service.',
      },
      {
        q: 'What is the Stack Overflow Developer Survey data used for here?',
        a: 'StackRadar processes the 2024 Stack Overflow Developer Survey \u2014 65,437 respondents across 180 countries \u2014 combined with Google Trends data, to show actual technology demand instead of relying on social-media hype.',
      },
      {
        q: 'Where can I see this implemented?',
        a: 'StackRadar is live at [stackradar-dev.vercel.app](https://stackradar-dev.vercel.app), and the full technical breakdown is on the [StackRadar project page](/projects#stackradar).',
      },
    ],
  },
];