import type { Project } from "./types";

/**
 * Projects. To add one: copy an object, give it a unique slug, set its status honestly,
 * and add screenshots under /public/images. A case-study page is generated automatically
 * at /projects/<slug> when `sections` is present.
 *
 * Rules kept here on purpose:
 *  - no traffic, sales, revenue or user numbers unless you can show evidence
 *  - demo data is labelled as demo data
 *  - AI-assisted work is described as AI-assisted
 */
export const projects: Project[] = [
  // ───────────────────────────────────────────── FLAGSHIP
  {
    slug: "mane-oggarane",
    title: "Mane & Oggarane",
    tagline: "Restaurant ordering & customer-retention platform",
    status: "live-demo",
    statusNote: "Public demo · Razorpay test mode only",
    categories: ["Full-stack", "Fintech", "Business & Product"],
    featured: true,
    flagship: true,
    summary:
      "A full-stack ordering site for a Karnataka-cuisine restaurant concept, built as a demo to offer small restaurants their own ordering, payments and retention channel. It covers menu to checkout to Razorpay to kitchen dashboard.",
    role:
      "Product owner and builder: I defined the requirements and business rules, built it with AI-assisted development, and tested payments, refunds and delivery rules myself.",
    aiAssisted:
      "Code was generated and refactored with Claude and ChatGPT. I wrote the specifications, made the architecture and business decisions, reviewed changes and ran the testing.",
    tools: ["Next.js", "Supabase", "Razorpay", "Google OAuth", "Vercel"],
    cover: {
      src: "/images/mane-oggarane-home.webp",
      alt: "Mane & Oggarane home page with Kannada headline, menu button and restaurant logo",
      width: 1286,
      height: 666,
    },
    gallery: [
      { src: "/images/mane-oggarane-home.webp", alt: "Home page", caption: "Bilingual (Kannada + English) home page", width: 1286, height: 666 },
      { src: "/images/mane-oggarane-menu.webp", alt: "Menu page with filters, search and basket", caption: "Menu with veg/non-veg filters, search and a live basket; prices are re-confirmed on the server", width: 1286, height: 666 },
      { src: "/images/mane-oggarane-owner.webp", alt: "Owner control room with order and customer tiles", caption: "Owner \"Control Room\". Figures shown are demo test data, not real sales.", width: 1286, height: 666 },
      { src: "/images/mane-oggarane-rewards.webp", alt: "Rewards page explaining points per ₹100", caption: "Loyalty rewards: points credited only after a verified, delivered order", width: 1286, height: 652 },
    ],
    links: [
      { label: "Open live demo", href: "https://mane-oggarane-demo.vercel.app", note: "Test payments only, no real orders" },
    ],
    flow: {
      title: "How an order flows",
      layers: [
        { label: "Customer", items: ["Browse menu", "Google sign-in", "Basket & checkout", "Track order"] },
        { label: "Next.js app (Vercel)", items: ["Server-side price & fee recalculation", "PIN-code eligibility", "Coupons & rewards", "Order API"] },
        { label: "Payments", items: ["Razorpay order", "Checkout", "Signature verification", "Webhooks & refunds"] },
        { label: "Data & ops", items: ["Supabase Postgres", "Supabase Auth", "Owner dashboard", "Cooking → dispatch status"] },
      ],
    },
    sections: [
      {
        heading: "The business problem",
        body:
          "Small restaurants rely on aggregator apps for online orders, which means paying commission and never owning the customer relationship. Without their own customer data they can't run repeat-order offers, loyalty or targeted promotions.\n\nThe idea: give a restaurant its own ordering website with payments, delivery rules, an owner dashboard and retention tools built in, then package it as a product I can offer to other restaurant owners.",
      },
      {
        heading: "What I built",
        bullets: [
          "Customer website with a responsive menu, categories, search and veg/non-veg preference",
          "Google sign-in, with login required before ordering",
          "Basket and checkout with a full order breakdown (items, delivery fee, discounts)",
          "Razorpay payment integration with server-side payment verification",
          "Payment webhooks and refund management",
          "Order management and an owner dashboard: menu manager, kitchen orders, cooking → dispatch status",
          "Customer order tracking and pickup support",
          "PIN-code-based delivery eligibility and delivery-charge calculation",
          "Coupons and a points-based rewards programme",
          "Policy pages (terms, privacy, refunds, delivery) needed for payment-gateway onboarding",
        ],
      },
      {
        heading: "Business rules I defined",
        bullets: [
          "Delivery only to a fixed set of PIN codes; outside them, pickup only",
          "Flat ₹40 delivery fee for small baskets (subtotal up to ₹100), free above that",
          "Prices, fees and discounts are always recalculated on the server, never trusted from the browser",
          "Reward points are credited only after the restaurant marks a verified paid order as delivered",
          "Razorpay stays in test mode, and no paid SMS/AI services are switched on, until explicitly approved",
        ],
      },
      {
        heading: "Technical challenges",
        bullets: [
          "Payment reliability: making payment confirmation idempotent, so a retried webhook or double click can't create duplicate orders",
          "Refunds and rollback paths when a payment succeeds but the order step fails",
          "Keeping client and server totals consistent once coupons, fees and rewards interact",
          "Making a public demo safe to share: a test-mode banner, sample data and no real orders",
        ],
      },
      {
        heading: "How it was tested",
        body:
          "Before calling the staging build approved, I ran a consolidated verification pass covering delivery fees, PIN validation, payments, refunds, idempotency and rollback behaviour. All payments use Razorpay test mode. The demo shows a banner saying no real orders are taken.",
      },
      {
        heading: "Where it stands, honestly",
        body:
          "It's a working staging product and a convincing public demo, but not yet a production-ready SaaS. Before I'd onboard a real restaurant, the remaining work is payment-reservation clean-up and reliability, legal and launch readiness, retention workflows (repeat-order nudges and segments), and a repeatable client-onboarding process.",
      },
      {
        heading: "What I learned",
        bullets: [
          "My payments-ops background mattered most in the edge cases: verification, refunds and reconciliation are where real systems break",
          "Writing business rules down before building saves rework, both for me and for an AI coding assistant",
          "AI makes building fast. Testing, reviewing and saying no to scope creep is still on me.",
          "A demo needs explicit guard-rails (test-mode banners, sample data labels) before you show it to anyone",
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── AI SAAS
  {
    slug: "careerflow-ai",
    title: "CareerFlow AI",
    tagline: "AI job-search platform that tracks applications from Gmail automatically",
    status: "live",
    statusNote: "Live · in daily use for my own job search",
    categories: ["Full-stack", "Business & Product"],
    featured: true,
    summary:
      "A full-stack job-search SaaS for India: it reads job emails from Gmail (read-only), creates and updates applications automatically, tailors resumes truthfully with Gemini AI, and runs in the background every 15 minutes. It found 105 of my own applications from 90 days of email.",
    role:
      "Product owner and builder: I wrote the specification and rules (privacy, honesty, when automation may act), built it with AI-assisted development, set up Google Cloud, Supabase, Vercel and GitHub, and tested it on my own inbox.",
    aiAssisted:
      "Code was generated and refactored with Claude (Claude Code). I wrote the product spec, made the architecture and safety decisions, reviewed changes, and verified every feature against my real Gmail before calling it done.",
    tools: [
      "Next.js 15",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase (Postgres, Auth, RLS)",
      "Gmail API",
      "Google OAuth",
      "Gemini API",
      "Vercel",
      "GitHub Actions",
      "Vitest",
      "Chrome Extension (MV3)",
    ],
    cover: {
      src: "/images/careerflow-home.webp",
      alt: "CareerFlow AI landing page: gradient headline 'From job search to job offer, all in one place' next to a sample application pipeline",
      width: 1286,
      height: 666,
    },
    gallery: [
      { src: "/images/careerflow-home.webp", alt: "CareerFlow AI home page", caption: "Landing page with animated gradient design. The pipeline card is a labelled sample preview.", width: 1286, height: 666 },
      { src: "/images/careerflow-features.webp", alt: "Feature grid: Gmail tracking, tailored resumes, workspaces, interviews, strategy, privacy", caption: "The six parts of the product working around one profile and one application database", width: 1286, height: 590 },
      { src: "/images/careerflow-login.webp", alt: "Sign-in card with Continue with Google button", caption: "Google sign-in; Gmail access is asked for separately, only if you choose to connect it", width: 1286, height: 666 },
    ],
    links: [{ label: "Open CareerFlow AI", href: "https://careerflow-ajaybj.vercel.app", note: "Sign in with Google" }],
    flow: {
      title: "How an application gets tracked without me typing anything",
      layers: [
        { label: "Gmail (read-only)", items: ["Confirmation emails", "Recruiter replies", "Assessments & interviews", "Offers & rejections"] },
        { label: "Background jobs", items: ["GitHub Actions every 15 min", "Gmail History API sync", "Job queue with retries & backoff", "Time-budgeted for serverless"] },
        { label: "Classify & match", items: ["Rules for LinkedIn, Indeed, ATS formats", "Gemini only with consent", "Match to existing application", "Unclear → Needs Review"] },
        { label: "Your pipeline", items: ["Applications & statuses", "Timeline & reminders", "Tailored resumes & prep", "Analytics & strategy"] },
      ],
    },
    sections: [
      {
        heading: "The problem",
        body:
          "When you apply to dozens of jobs across LinkedIn, Indeed, Naukri and company career sites, tracking breaks down fast. Confirmations, assessment links, interview invites and rejections land in Gmail, and a spreadsheet goes out of date within a week.\n\nI wanted one place where every application is tracked automatically from the emails I already receive, and where AI help (resumes, cover letters, interview prep) never invents experience I don't have.",
      },
      {
        heading: "What I built",
        bullets: [
          "Google sign-in with every user's data isolated by Postgres row-level security across 60 tables",
          "Gmail connection with read-only access; Google tokens stored encrypted (AES-256-GCM)",
          "Historical import of the last 90 days, then incremental sync every 15–30 minutes, with no browser open",
          "Email classifier for LinkedIn, Indeed, Keka, SmartRecruiters, iCIMS and generic confirmations, interviews, assessments, offers and rejections",
          "Safe automation: high-impact changes (rejection, offer) need strong evidence; anything unclear goes to a Needs Review queue",
          "Resume tailoring and cover letters with Gemini, checked so AI rewording can't add skills, numbers or employers",
          "Per-job workspace, interview prep, calendar, follow-up reminders and response-rate analytics",
          "A Chrome extension (Manifest V3) to save a job posting in one click and avoid duplicates",
          "Animated gradient UI with its own logo, light and dark themes, breadcrumbs and keyboard search",
        ],
      },
      {
        heading: "Tech stack",
        bullets: [
          "Frontend: Next.js 15 (App Router, server actions), React, TypeScript, Tailwind CSS v4",
          "Database & auth: Supabase Postgres with row-level security, Supabase Auth (Google), Supabase Storage; postgres.js in production, PGlite for local runs and tests",
          "Google: Gmail API (OAuth, History API, read-only scope), Google Cloud OAuth consent setup",
          "AI: Google Gemini API with automatic model fallback; AI processing of emails only with the user's consent",
          "Background work: a database job queue with leasing, retries and backoff, driven by GitHub Actions (every 15 min) and Vercel Cron (daily backup)",
          "Hosting & CI: Vercel (Mumbai region), GitHub, GitHub Actions for CI and scheduling",
          "Quality: Vitest with 57 automated tests, Zod validation, TypeScript type-checking",
          "Monorepo: npm workspaces (web app, worker, Chrome extension, shared packages)",
        ],
      },
      {
        heading: "Rules I set for the product",
        bullets: [
          "Never show fake data: if something isn't connected, the app says so",
          "Gmail is read-only; the app never sends, deletes or labels email",
          "A status you set by hand is never overwritten by automation without asking",
          "Secrets and API keys never reach the browser; tokens are encrypted at rest",
          "The extension never submits applications; it only saves jobs and copies approved answers",
        ],
      },
      {
        heading: "Problems I hit in production and fixed",
        bullets: [
          "Serverless time limits: the 90-day import timed out, so I split it into small pages with a time-budgeted job runner",
          "Gmail API rate limits: added pauses and smaller batches",
          "Data stored twice-encoded as JSON on real Postgres (not seen in local tests): fixed the driver setting and wrote a repair migration",
          "A Gemini model was retired: added automatic fallback to newer models",
          "LinkedIn changed its email layout, so applications landed in review: rewrote the parser against the real format and re-processed the queue (38 → 105 applications)",
          "Sign-in redirect and OAuth callback mismatches between Supabase, Google Cloud and Vercel",
        ],
      },
      {
        heading: "Where it stands, honestly",
        body:
          "CareerFlow AI is live and I use it every day for my own job search. Verified live: Google sign-in, Gmail connection and import, background sync, and Gemini AI. Not yet verified live: Gmail push notifications (polling is used instead), live job-board feeds, and the Chrome extension in a real browser. It's a single-user product today, not a launched SaaS with customers.",
      },
      {
        heading: "What I learned",
        bullets: [
          "Real data breaks things tests don't: my own inbox found the bugs that mattered",
          "Automation needs a safety valve: a review queue made it trustworthy enough to leave running",
          "Most of the work in an integration is setup: OAuth consent, redirect URLs, secrets and quotas",
          "Writing the rules first (privacy, honesty, what automation may change) kept an AI coding assistant on track",
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── CONSUMER APP
  {
    slug: "fitora",
    title: "FITORA",
    tagline: "Full-stack fitness app: smart workout logger, AI coach, gym management and an Android app",
    status: "live",
    statusNote: "Live · web + Android app (installed, not yet on Play Store)",
    categories: ["Full-stack", "Business & Product"],
    featured: true,
    summary:
      "A fitness app for Indian gym-goers and gym owners. It remembers every set you log and tells you what to lift next time, swaps exercises when equipment is busy, and has an AI coach and food logging that understand Indian meals. Gym owners get members, fees, WhatsApp/UPI reminders, QR check-in and monthly reports. Google sign-in, cloud sync, phone reminders and 5 languages.",
    role:
      "Product owner and builder: I researched what makes people quit gyms, chose the features and the rules (no fake numbers, free-to-use media, privacy by default), set up Firebase, Vercel, Gemini and the Android package, and tested every flow live with my own account and phone.",
    aiAssisted:
      "Code was generated and refactored with Claude (Claude Code). I decided what to build and why, set up the cloud accounts and keys, reviewed changes, and tested features end to end on the live site and my Android phone.",
    tools: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS v4",
      "Firebase Auth (Google)",
      "Cloud Firestore + security rules",
      "Firebase Cloud Messaging",
      "Gemini API",
      "Vercel serverless functions",
      "GitHub Actions",
      "PWA + Android (TWA)",
      "UPI deep links",
    ],
    cover: {
      src: "/images/fitora-library.webp",
      alt: "FITORA exercise library: cards for Pushups, Barbell Squat, Barbell Bench Press and more, each with a real demo photo",
      width: 1286,
      height: 720,
    },
    gallery: [
      { src: "/images/fitora-tracker.webp", alt: "Workout tracker showing last time, today's target, warm-up sets, plates per side and the set tracker", caption: "Smart logger: last session, today's target, warm-up ramp and plates to load, then log each set", width: 1286, height: 720 },
      { src: "/images/fitora-plan-builder.webp", alt: "Build my weekly plan dialog with days per week, gym or home, goal and experience, and a 4-day upper/lower plan preview", caption: "Plan builder: a weekly split from days per week, gym or home, goal and experience", width: 1286, height: 720 },
      { src: "/images/fitora-library.webp", alt: "FITORA exercise library grid", caption: "Exercise library: 873 exercises with real photos, used everywhere in the app", width: 1286, height: 720 },
      { src: "/images/fitora-demo.webp", alt: "Pushups detail page with the demo player showing the end position and a rep counter", caption: "Demo player: start and end photos loop like a slow animation, with a rep counter", width: 1286, height: 720 },
    ],
    links: [
      { label: "Open FITORA", href: "https://fit-mate-coral.vercel.app", note: "Try as a guest or sign in with Google" },
      { label: "Code on GitHub", href: "https://github.com/ajaybj0204/FitMate" },
    ],
    flow: {
      title: "How FITORA fits together",
      layers: [
        { label: "Apps", items: ["Website (React + Vite)", "Android app (TWA)", "Works offline in the gym", "5 languages"] },
        { label: "Firebase", items: ["Google sign-in", "Firestore + security rules", "Offline cache & sync", "Push notifications (FCM)"] },
        { label: "Serverless (Vercel)", items: ["AI coach & food estimates (Gemini)", "Hourly reminder job", "Key stays on the server", "Per-user rate limit"] },
        { label: "For gyms", items: ["Members & fee due dates", "WhatsApp + UPI pay links", "QR check-in", "Monthly reports & CSV"] },
      ],
    },
    sections: [
      {
        heading: "The problem",
        body:
          "Most people who join a gym stop going within months. The common reasons are not knowing what to do, seeing no progress, and plans that break on a busy day. Gym owners, meanwhile, track fees in registers and WhatsApp and find out someone quit only when the fee doesn't come.\n\nMost fitness apps are also built for Western diets and English speakers. I wanted FITORA to solve the everyday problems for both sides, for Indian users, in their own language.",
      },
      {
        heading: "What I built",
        bullets: [
          "Smart workout logger: remembers every set and suggests next time's weight and reps (double progression, with an automatic step back after two hard sessions)",
          "In-gym helpers: 'equipment busy?' swaps from the 873-exercise library, warm-up sets, plates per side, and a rest timer with sound and vibration",
          "Plan builder: a weekly split from days per week, gym or home, goal and experience; missed days can be done today, done as a 30-minute version, or skipped",
          "AI coach (Gemini) that reads your real logged workouts, food and targets; AI food logging that understands Indian meals and portions",
          "Real progress only: strength charts, workouts per week, body check-ins and badges, all from what you log, with no sample data",
          "Google sign-in with cloud sync and offline support; phone reminders for workouts, water and gym fees, sent by an hourly server job",
          "Gym owner side: members, plans, payments, fees due/overdue, 'at risk' members, WhatsApp reminders with UPI pay links, reception QR check-in, monthly reports",
          "Installable Android app (Trusted Web Activity) verified with Digital Asset Links; English, Kannada, Telugu, Tamil and Malayalam",
        ],
      },
      {
        heading: "Decisions I made",
        bullets: [
          "Firebase instead of Supabase: my Supabase free slots were used, and Firestore's offline cache suits basement gyms with no signal",
          "Security rules first: each person sees only their own data; members can see their own membership but never other members or payments",
          "The AI key never reaches the browser: a serverless function checks the user's login and limits requests per hour",
          "UPI links instead of a payment gateway: money goes straight to the gym owner with no fees; FITORA only records payments",
          "Fastest working model: the newest Gemini model took over 2 minutes on the free tier, so the coach uses a 'lite' model that answers in about 2 seconds",
        ],
      },
      {
        heading: "Replacing the cartoon animations",
        body:
          "The first version drew exercises as animated cartoon figures, and they didn't look right. I found a popular exercise GIF dataset, but its licence doesn't allow reuse of the media, so I didn't use it. Instead I switched to Free Exercise DB, which is public domain: 873 exercises with real photos and written instructions.\n\nThe photos load on demand from a CDN, the 850 KB exercise list is only downloaded when you open the library, and the old plan exercises were matched to their library versions so saved plans still work.",
      },
      {
        heading: "Where it stands, honestly",
        body:
          "FITORA is live and I use it myself; the Android app is installed on my phone but not yet on the Play Store. Tested live: Google sign-in, cloud sync, the smart logger, AI coach and food logging, phone notifications, and the gym owner tools. Not yet tested with real users: the member side of a gym (invite link and QR check-in need a second account), and there are no gyms or customers using it yet. The gym owner screens and AI answers are still in English, and the regional-language text needs review by native speakers.",
      },
      {
        heading: "What I learned",
        bullets: [
          "Check media licences before building around a dataset; 'on GitHub' doesn't mean free to use",
          "Sample data hurts trust: once real accounts existed, every made-up number had to go",
          "Security rules need their own testing: a rule that allowed saving workouts but not reading them only showed up live",
          "Free AI tiers change fast; build in model fallbacks and timeouts from the start",
          "Real-world features (reminders, payments, an Android app) are mostly setup: keys, permissions and verification files",
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── AI TOOLING
  {
    slug: "ajay-autoflow",
    title: "Ajay AutoFlow",
    tagline: "Chrome extension that batch-runs Google Flow prompts and saves every clip in order",
    status: "live",
    statusNote: "Free download · install from ZIP (not on the Chrome Web Store yet)",
    categories: ["AI & Content", "Business & Product"],
    featured: true,
    summary:
      "A Chrome extension for AI video creators: paste or import a whole storyboard, press Start, and it runs every scene in Google Flow, picks the right character and voice, and saves each clip with a timecoded file name. It also has pause/resume with crash recovery, a run report with retry-failed, and a companion website with a storyboard planner.",
    role:
      "Built it for my own AI video work: I mapped the manual routine in Flow, decided what to automate and what to leave out, designed the side panel and website, and tested each feature.",
    aiAssisted:
      "Code was generated and refactored with Claude (Claude Code). I defined the workflow, reviewed the changes, and tested the extension and website myself.",
    tools: [
      "JavaScript",
      "Chrome Extensions (Manifest V3)",
      "Side Panel API",
      "Chrome DevTools Protocol",
      "chrome.storage / downloads / notifications",
      "HTML & CSS",
      "Vercel",
      "GitHub",
    ],
    cover: {
      src: "/images/autoflow-landing.webp",
      alt: "Ajay AutoFlow website: 'Paste your storyboard once. Get every scene, in order.' next to a mock of the side panel running scene 3 of 6",
      width: 1286,
      height: 720,
    },
    gallery: [
      { src: "/images/autoflow-landing.webp", alt: "AutoFlow landing page", caption: "Website with a download button and a preview of the side panel mid-run", width: 1286, height: 720 },
      { src: "/images/autoflow-features.webp", alt: "Feature cards: prompt queue, import from Sheets, files in order, characters and voices, pause and resume, run report", caption: "What the extension does", width: 1286, height: 720 },
      { src: "/images/autoflow-planner.webp", alt: "Storyboard planner table with timecode, what happens, character and voice columns", caption: "Storyboard planner: plan scenes on any device, then export a CSV the extension imports", width: 1286, height: 720 },
    ],
    links: [
      { label: "Open AutoFlow website", href: "https://ajay-autoflow.vercel.app", note: "Free download" },
      { label: "Code on GitHub", href: "https://github.com/ajaybj0204/ajay-autoflow" },
    ],
    flow: {
      title: "From storyboard to a folder of finished clips",
      layers: [
        { label: "Plan", items: ["Storyboard planner (web)", "Google Sheets / CSV", "Prompt templates", "Per-scene voice, model, ratio"] },
        { label: "Side panel", items: ["Prompt queue", "Projects & settings", "Pause / resume", "Time-left estimate"] },
        { label: "In the Flow tab", items: ["Types each prompt", "Picks @character + voice", "Generates & waits", "Downloads at chosen quality"] },
        { label: "Output", items: ["Timecoded files (0-04.mp4)", "Folder per project", "Caption .txt files", "Run report + CSV shot list"] },
      ],
    },
    sections: [
      {
        heading: "The problem",
        body:
          "A single AI video in Google Flow can need 30 or more scenes. Every scene was the same routine: paste the prompt, choose the character and voice, set the model and ratio, click Generate, wait, download, then rename the file to its timecode so the editor gets them in order. That's roughly 150 clicks for one video, and files easily end up mixed up.",
      },
      {
        heading: "What I built",
        bullets: [
          "A side-panel Chrome extension that runs a queue of prompts in Flow one after another (text to video, frames to video, ingredients, text to image, image editing)",
          "Character and voice picking by name, plus per-prompt settings lines (voice, model, ratio) at the top of a prompt",
          "Scene import from Google Sheets or CSV, with templates like {character} {action}, cinematic",
          "Timecoded file names (#0:04 → 0-04.mp4), a sub-folder per project and optional caption files",
          "Pause and resume, and crash recovery that continues an interrupted batch where it stopped",
          "A run report with time per scene, 'Retry failed only' and a CSV shot list, plus a live time-left estimate and a done notification",
          "A self-check that shows which Flow controls it can still find after a Google update, and an English / Hinglish panel",
          "A companion website with the download, install guide and a storyboard planner that exports straight into the extension",
        ],
      },
      {
        heading: "Decisions I made",
        bullets: [
          "Kept it an extension, not a web app: only an extension can act inside your own signed-in Flow tab; a server would need people's Google logins",
          "No servers and no tracking: everything runs in the user's browser and talks only to Google Flow",
          "Left out anything that gets around Flow's plan limits, credits or watermarks",
          "Built to survive redesigns: controls are found by text, labels and icons, with editable selectors and a self-check",
        ],
      },
      {
        heading: "Where it stands, honestly",
        body:
          "AutoFlow is a free download from its website and the code is public on GitHub. It's installed by loading the unpacked folder; it isn't on the Chrome Web Store yet. Because it drives Google Flow's interface, a Flow redesign can break a step until the selectors are updated. It has no user numbers to report yet.",
      },
      {
        heading: "What I learned",
        bullets: [
          "Automating someone else's interface means planning for change: fallbacks, logs and a self-check matter as much as the happy path",
          "Long-running jobs need recovery: pause, resume and 'retry failed only' turned a fragile script into something I can leave running",
          "A small website and a clear README make a tool much easier to share than a ZIP file on its own",
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── DATA (links to the data lab)
  {
    slug: "payment-reconciliation",
    title: "Payment Reconciliation Engine",
    tagline: "Ledger vs gateway settlement, every row classified",
    status: "in-progress",
    statusNote: "Built & tested · I'm reviewing it",
    categories: ["Fintech", "Data & Analytics"],
    featured: true,
    summary:
      "Matches 18,644 real payment records against a simulated gateway settlement file, sorts every row into 7 statuses, calculates money at risk, and outputs an Excel worklist. It caught all 537 planted errors with 0 false alarms.",
    role: "Designed the statuses and business rules from my reconciliation work; built in Python with AI assistance.",
    aiAssisted: "Python written with AI assistance; I'm rebuilding the matching logic myself as part of my learning plan.",
    tools: ["Python", "pandas", "Excel output", "Testing"],
    externalPage: "/data-projects.html#dashboards",
  },
  {
    slug: "data-automation-lab",
    title: "Data & Automation Lab",
    tagline: "8 projects on real public datasets",
    status: "in-progress",
    statusNote: "Each project labelled individually",
    categories: ["Data & Analytics", "Fintech"],
    featured: true,
    summary:
      "Excel dashboard, SQL analysis, Power BI model, fintech payments analysis, reconciliation, daily-report automation, ops KPI dashboard and a BRD, all on ~100k real Olist orders and the Superstore dataset.",
    role: "Chose the business questions from an operations point of view; analysis built with AI assistance and cross-checked two ways.",
    tools: ["Excel", "SQL", "Power BI", "Python", "KPI design", "BRD"],
    externalPage: "/data-projects.html",
  },

  // ───────────────────────────────────────────── BUSINESS & PRODUCT
  {
    slug: "explorexdeals",
    title: "ExploreXDeals",
    tagline: "Online store & digital-product experiments",
    status: "experiment",
    statusNote: "Ongoing side business · no results claimed",
    categories: ["Business & Product"],
    summary:
      "My ₹0-upfront online-business lab: a Shopify gadget store plus digital products on SuperProfile, used to test pricing, checkout, delivery, promotion and customer communication end to end.",
    role: "Everything: product selection, store and sales-page setup, pricing, marketing content and customer communication.",
    tools: ["Shopify", "SuperProfile", "Meta ads", "AI content"],
    cover: {
      src: "/images/explorexdeals-store.webp",
      alt: "ExploreXDeals Shopify store home page with headphones offer banner",
      width: 1286,
      height: 582,
    },
    gallery: [
      { src: "/images/explorexdeals-store.webp", alt: "Shopify store home page", caption: "Shopify storefront: gadgets and audio, free-shipping threshold, bundled freebie offer", width: 1286, height: 582 },
      { src: "/images/mega-bundle.webp", alt: "11-in-1 Mega Bundle cover", caption: "Digital products sold through SuperProfile with automated delivery", width: 1280, height: 720 },
    ],
    links: [
      { label: "Visit explorexdeals.com", href: "https://explorexdeals.com" },
      { label: "Digital products store", href: "https://superprofile.bio/explorexplorer" },
    ],
    flow: {
      title: "Experiment loop",
      layers: [
        { label: "Idea", items: ["Product / offer", "Price point", "Target buyer"] },
        { label: "Build", items: ["Store or sales page", "Checkout & payments", "Automated delivery"] },
        { label: "Promote", items: ["Instagram / Facebook / Shorts", "Small paid test", "Bundles & bonuses"] },
        { label: "Learn", items: ["Clicks vs checkouts", "Customer questions", "Change one thing, repeat"] },
      ],
    },
    sections: [
      {
        heading: "Why I run it",
        body:
          "I wanted to understand online commerce from the merchant's side, not just the payments side I saw at work. So I run small, low-cost experiments: pick a product, build the page, set the price, take payment, deliver, promote, and see what customers actually do.",
      },
      {
        heading: "What it covers",
        bullets: [
          "Digital product ideation and creation (ebooks and bundles)",
          "Landing pages and sales pages on Shopify and SuperProfile",
          "Pricing experiments, e.g. bundle pricing and launch discounts",
          "Checkout, payment and automated digital delivery workflows",
          "Customer communication and support",
          "Social-media promotion and small paid campaigns with a tight budget",
          "Watching conversion: where people drop between visit, checkout and payment",
        ],
      },
      {
        heading: "Digital products",
        bullets: [
          "Bachelor's Kitchen: 99 Indian Meals Under ₹99",
          "Zero to Side Income: a beginner's guide to online income in India",
          "ExploreXDeals 11-in-1 Mega Bundle: 2,400+ resources in 11 collections",
          "Full details are in the ExploreXplorer Digital Products case study",
        ],
      },
      {
        heading: "Honest status",
        body:
          "This is an ongoing experiment, not a proven business. I'm not quoting sales or follow-on numbers here. What I can show is the full workflow, set up and run by me, and what I learned from it.",
      },
      {
        heading: "What I learned",
        bullets: [
          "Checkout friction is real: every extra field and step costs buyers",
          "Small budgets force discipline: test one variable at a time",
          "Product quality checks must come before launch, not after the first complaint",
        ],
      },
    ],
  },
  {
    slug: "digital-products",
    introSections: 1,
    title: "ExploreXplorer Digital Products",
    tagline: "Three self-published ebooks & bundles, from idea to automated sale",
    status: "live",
    statusNote: "All 3 on sale via SuperProfile",
    categories: ["Business & Product"],
    summary:
      "Three digital products I created and sell on SuperProfile: Bachelor's Kitchen (99 Indian meals under ₹99), Zero to Side Income (a beginner's guide to online income in India) and an 11-in-1 Mega Bundle of 2,400+ resources. Each has its own pricing, delivery, policies and launch.",
    role: "Product planning, content structure, cover and sales-page design, pricing, policies, delivery setup and launch, end to end.",
    aiAssisted:
      "AI helped draft, format and design content and covers. I set the product rules, checked recipe costs and quality, wrote the policies and approved every page before launch.",
    tools: ["SuperProfile", "Ebook design", "AI-assisted writing", "Pricing", "Meta Pixel", "Excel templates"],
    cover: {
      src: "/images/bachelors-kitchen-cover.webp",
      alt: "Bachelor's Kitchen: 99 Meals Under ₹99 ebook cover mockup",
      width: 1280,
      height: 720,
    },
    gallery: [
      { src: "/images/bachelors-kitchen-cover.webp", alt: "Bachelor's Kitchen ebook cover", caption: "Bachelor's Kitchen: 99 Indian Meals Under ₹99", width: 1280, height: 720 },
      { src: "/images/zero-to-side-income.webp", alt: "Zero to Side Income ebook cover", caption: "Zero to Side Income: a practical guide for beginners in India", width: 1280, height: 720 },
      { src: "/images/mega-bundle.webp", alt: "ExploreXDeals 11-in-1 Digital Mega Bundle cover showing the resource libraries", caption: "11-in-1 Mega Bundle: 2,400+ resources in 11 collections", width: 1280, height: 720 },
    ],
    links: [
      { label: "Bachelor's Kitchen", href: "https://superprofile.bio/vp/bachelor-s-kitchen-%E2%80%93-99-indian-meals-under-%E2%82%B999" },
      { label: "Zero to Side Income", href: "https://superprofile.bio/vp/zero-to-side-income-%E2%80%93-explorexplorer-ebook" },
      { label: "11-in-1 Mega Bundle", href: "https://superprofile.bio/vp/explorexdeals-11-in-1-mega-bundle" },
    ],
    flow: {
      title: "How each product goes from idea to sale",
      layers: [
        { label: "Define", items: ["Buyer & problem", "Product rules (scope, quality bar)", "Price point"] },
        { label: "Create", items: ["Write & structure content", "Format PDF / templates", "Cover & mockups"] },
        { label: "Sell", items: ["Sales page & FAQs", "Checkout + OTP-verified phone", "Automated file delivery"] },
        { label: "Run", items: ["Terms, refund & privacy policy", "Bonuses, add-ons & coupons", "Pixel: view → checkout → purchase"] },
      ],
    },
    sections: [
      {
        heading: "Why digital products",
        body:
          "I wanted to learn selling from the merchant's side, with ₹0 upfront cost. Digital products need no inventory or shipping, so I could focus on the parts that decide whether something sells: the problem, the product, the price, the page and the checkout.",
      },
      {
        heading: "Product 1: Bachelor's Kitchen, 99 Indian Meals Under ₹99",
        bullets: [
          "For students, bachelors and young professionals who spend too much on food delivery",
          "Exactly 99 unique recipes, permanently numbered #01–#99, each under ₹99 in ingredients and ready in about 30 minutes",
          "Clickable index, meal plans and a cost-validation pass; not marked ready for sale until those checks passed",
          "Launched at ₹49 with a bonus-ebook offer, and has its first paid orders",
        ],
      },
      {
        heading: "Product 2: Zero to Side Income",
        bullets: [
          "A practical guide for beginners in India: idea selection, account-setup tutorials, product creation, freelancing, pricing, publishing and finding customers",
          "Focused on free and low-cost tools, with real project examples and launch plans",
          "PDF ebook at ₹49 (list price ₹99), with an FAQ section and a clear disclaimer that it doesn't promise income",
          "Also used as a free bonus to raise the perceived value of Bachelor's Kitchen",
        ],
      },
      {
        heading: "Product 3: ExploreXDeals 11-in-1 Mega Bundle",
        bullets: [
          "2,400+ ready-to-use files in 11 collections: planners, budget & finance tools, social-media templates, invitations, resumes, kids' activities, wellness, fitness, meal planning, journals, plus the Bachelor's Kitchen ebook",
          "Includes an Excel workbook with 20 money tools (budget, UPI/expense tracker, EMI & debt planner) that also opens in Google Sheets",
          "Packaged as a START HERE guide, 10 collection ZIPs and a full inventory spreadsheet of every file",
          "One-time ₹149 (list ₹299), with a personal-use licence, an add-on offer and a coupon code",
        ],
      },
      {
        heading: "The operations side (where my payments background helped)",
        bullets: [
          "Wrote terms, a refund policy and a privacy policy, with clear refund cases: duplicate payment, paid but no access, corrupted files, wrong description",
          "OTP-verified phone at checkout and automated delivery right after payment",
          "Meta Pixel set up to measure page views, payment starts and completed purchases, so ads can be judged by conversions rather than clicks",
          "Anchored pricing (list vs launch price), bundling and bonus offers",
        ],
      },
      {
        heading: "Honest status",
        body:
          "All three products are live. Bachelor's Kitchen has its first paying customers; Zero to Side Income and the Mega Bundle (launched 1 Nov 2026) are still early. These are real but small commercial experiments, not a proven business, and I'm not quoting revenue.",
      },
      {
        heading: "What I learned",
        bullets: [
          "Constraints (99 recipes, under ₹99, about 30 minutes) make a product easy to explain and easy to check",
          "A written quality checklist turns \"I think it's done\" into \"it's done\"",
          "Policies and delivery are part of the product: buyers trust a clear refund rule",
          "Making the product is the easy half. Distribution is the real work.",
        ],
      },
    ],
  },

  // ───────────────────────────────────────────── AI & CONTENT
  {
    slug: "ai-video-workflows",
    title: "AI Short-Form Video Workflows",
    tagline: "Repeatable, prompt-driven video production",
    status: "experiment",
    statusNote: "Ongoing creative experiment",
    categories: ["AI & Content"],
    summary:
      "A structured way to produce short vertical videos with Google Flow: a consistent AI presenter character, scene-by-scene prompts and reusable templates for promotional content.",
    role: "Workflow design, prompt templates, scripting and editing decisions.",
    aiAssisted:
      "Videos are generated with Google Flow (a third-party tool). I didn't build a video model. My work is the workflow, prompts and creative direction.",
    tools: ["Google Flow", "Prompt engineering", "ChatGPT / Claude", "9:16 video"],
    flow: {
      title: "Production pipeline",
      layers: [
        { label: "Brief", items: ["Goal & CTA", "Audience", "10–30 s length"] },
        { label: "Script", items: ["Hook in 2 s", "Scene list", "On-screen text"] },
        { label: "Prompt", items: ["Character sheet (fixed identity)", "Per-scene prompt template", "Camera & lighting notes"] },
        { label: "Generate & edit", items: ["Google Flow clips", "Consistency check", "Cut, captions, export 9:16"] },
      ],
    },
    sections: [
      {
        heading: "The problem",
        body:
          "Short-form video is the cheapest way to reach buyers, but filming yourself every day is slow. Generative video tools make it possible, but only if the output is consistent enough to look like a series and not a set of random clips.",
      },
      {
        heading: "What I designed",
        bullets: [
          "A recurring presenter character with a fixed identity (face and build), with a new outfit per video, so every clip feels like the same series",
          "Scene-by-scene prompt templates: setting, action, camera, lighting, duration",
          "Vertical 9:16 framing and platform-specific specs for Instagram, Facebook and YouTube Shorts",
          "Reusable templates, so a new video starts from a filled-in form rather than a blank prompt",
        ],
      },
      {
        heading: "What generative AI is good and bad at here",
        bullets: [
          "Good: speed, variety of settings, no camera or studio needed",
          "Hard: keeping the same face and outfit across clips, hands and text in frame",
          "The fix is process, not luck: fixed character descriptions, short scenes and a consistency check before editing",
        ],
      },
      {
        heading: "Status",
        body:
          "An ongoing experiment. I'm not claiming audience or growth numbers. The deliverable is a repeatable workflow that someone else could follow.",
      },
    ],
  },
  {
    slug: "social-content-workflows",
    title: "Social Media Content Workflows",
    tagline: "Platform-ready content for ExploreXDeals",
    status: "experiment",
    statusNote: "Ongoing",
    categories: ["AI & Content", "Business & Product"],
    summary:
      "The posting system behind ExploreXDeals: platform-specific formats, visual branding, caption rules and AI-assisted reels for Instagram, Facebook and YouTube Shorts.",
    role: "Content planning, branding rules, creative production and posting workflow.",
    tools: ["Instagram", "Facebook", "YouTube Shorts", "AI-assisted reels", "Content calendar"],
    flow: {
      title: "Weekly content workflow",
      layers: [
        { label: "Plan", items: ["Offer of the week", "Hook ideas", "Platform mix"] },
        { label: "Create", items: ["1080×1350 posts", "1080×1920 reels", "AI-assisted visuals"] },
        { label: "Publish", items: ["Caption rules", "Fixed call-to-action link", "Schedule"] },
        { label: "Review", items: ["What got saves/clicks", "Keep / kill", "Next week's plan"] },
      ],
    },
    sections: [
      {
        heading: "What it is",
        body:
          "A lightweight operating system for a one-person brand: the same offer is adapted to each platform's format and audience, with consistent branding and a single call-to-action destination.",
      },
      {
        heading: "Workflow rules",
        bullets: [
          "Platform-specific specs: 1080×1350 for feed posts and 1080×1920 for reels; MP4/MOV video",
          "Every caption ends with the same store link, so all traffic lands in one place",
          "Consistent visual branding across Instagram, Facebook and YouTube Shorts",
          "AI-assisted reels from the video workflow, edited for each platform",
        ],
      },
      {
        heading: "Status",
        body:
          "Running as an experiment. Growth metrics are not claimed here. The value is in the repeatable workflow and what I learned about platform differences.",
      },
    ],
  },
];

/** Earlier analytics projects (from the resume, Jan–May 2024). No public repo links yet. */
export const earlierWork = [
  {
    title: "Customer Churn Analysis",
    when: "Mar – May 2024",
    tools: ["Python", "Feature engineering", "Visualization"],
    text: "Analysed 7,043 telecom customers by tenure, contract type and monthly charges. Engineered contract-type buckets and tenure bands, and built 11 visualizations. Found that 38% of churned users were on monthly contracts with under 3 months' tenure, which pointed to early-engagement strategies.",
  },
  {
    title: "Regional Sales Performance Dashboard",
    when: "Jan – Mar 2024",
    tools: ["SQL", "Power BI"],
    text: "Joined 3 sales tables (25,000+ rows, 12 months, 5 regions) into an analysis-ready dataset. Built 10 dynamic Power BI measures and a multipage dashboard with drill-downs. Detected a 14% post-festival sales drop in the South region, which was later used for a marketing recovery plan.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const caseStudies = projects.filter((p) => p.sections && !p.externalPage);
