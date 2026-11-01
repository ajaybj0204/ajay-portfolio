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
