import type { SkillGroup, SkillLevel } from "./types";

export const levelLabel: Record<SkillLevel, string> = {
  professional: "Professional experience",
  applied: "Applied in projects",
  working: "Working knowledge",
  learning: "Currently learning",
};

/**
 * Honest labelling rule: move a skill up a level only when there is evidence
 * (a role, a project in this portfolio, or a finished course/certificate).
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Business & Operations",
    icon: "briefcase",
    blurb: "Where my professional experience is.",
    skills: [
      { name: "Merchant onboarding & go-live (domestic + global)", level: "professional", note: "Razorpay, G2" },
      { name: "MID/TID mapping, POS configuration & device onboarding", level: "professional", note: "Razorpay" },
      { name: "KYC / AML & risk checks", level: "professional", note: "Razorpay, G2" },
      { name: "Transaction Laundering Detection (TLD) & fraud monitoring", level: "professional", note: "G2" },
      { name: "Reconciliation & exception tracking", level: "professional", note: "Razorpay" },
      { name: "SOPs & training documentation", level: "professional", note: "Razorpay" },
      { name: "SLA/TAT-driven issue resolution", level: "professional", note: "Razorpay, G2" },
      { name: "Bank integrations & partner coordination", level: "professional", note: "Kotak, YES Bank" },
    ],
  },
  {
    title: "Analytics & BI",
    icon: "chart",
    blurb: "Growing fast, with public-data projects to show for it.",
    skills: [
      { name: "Advanced Excel & Google Sheets (dashboards, trackers)", level: "professional", note: "Razorpay reporting + Excel dashboard project" },
      { name: "SQL (joins, CTEs, window functions)", level: "applied", note: "Sales dashboard, e-commerce analysis" },
      { name: "Python · pandas", level: "applied", note: "Churn analysis, payments analysis" },
      { name: "KPI design & dashboards", level: "applied", note: "Ops KPI dashboard" },
      { name: "Data cleaning & validation", level: "applied", note: "Cleaning logs, cross-checks" },
      { name: "Power BI (measures, multipage dashboards)", level: "applied", note: "Regional sales dashboard" },
      { name: "Operational dashboards & daily trackers", level: "professional", note: "Razorpay" },
      { name: "Requirements & BRDs", level: "learning", note: "Reconciliation BRD draft" },
      { name: "Process mapping", level: "learning" },
    ],
  },
  {
    title: "Development",
    icon: "code",
    blurb: "Built with AI assistance; I own the requirements, testing and decisions.",
    skills: [
      { name: "HTML · CSS · JavaScript", level: "applied", note: "This site, demo sites" },
      { name: "React · Next.js", level: "applied", note: "Mane & Oggarane, this site" },
      { name: "TypeScript", level: "learning", note: "This site" },
      { name: "Supabase (Postgres, Auth)", level: "applied", note: "Mane & Oggarane" },
      { name: "Google OAuth", level: "applied", note: "Mane & Oggarane" },
      { name: "Razorpay integration & webhooks", level: "applied", note: "Test mode" },
      { name: "REST APIs & integrations", level: "working" },
      { name: "Git & GitHub", level: "working" },
    ],
  },
  {
    title: "AI & Automation",
    icon: "sparkles",
    blurb: "Using AI to go from idea to working thing faster.",
    skills: [
      { name: "ChatGPT · Claude · Gemini · Astra AI", level: "professional", note: "Reporting & automation at Razorpay" },
      { name: "AI-assisted coding", level: "applied", note: "Every project here" },
      { name: "Prompt engineering & reusable templates", level: "applied" },
      { name: "Google Flow (AI video)", level: "applied", note: "Short-form video experiments" },
      { name: "Scene-by-scene video workflows", level: "applied" },
      { name: "Automated trackers & reporting workflows", level: "professional", note: "Razorpay" },
      { name: "Python report automation", level: "applied", note: "Daily ops report" },
    ],
  },
  {
    title: "Platforms & Tools",
    icon: "layers",
    blurb: "Tools I have actually set up and used.",
    skills: [
      { name: "Vercel", level: "applied" },
      { name: "Netlify", level: "applied" },
      { name: "GitHub", level: "working" },
      { name: "Shopify", level: "applied", note: "ExploreXDeals store" },
      { name: "SuperProfile", level: "applied", note: "Digital product sales" },
      { name: "Freshdesk", level: "professional", note: "Razorpay ticketing" },
      { name: "SFTP (FileZilla)", level: "professional" },
      { name: "Google Sheets", level: "professional" },
    ],
  },
];
