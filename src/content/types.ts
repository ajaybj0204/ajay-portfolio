/**
 * Content types — every piece of text on the site is typed here.
 * Edit the data files next to this one (site.ts, experience.ts, skills.ts,
 * projects.ts, journey.ts); you never need to touch components to update content.
 */

export type SkillLevel =
  | "professional" // used in a paid role (verified by work history)
  | "applied" // used to build a real project in this portfolio
  | "working" // can use it, with less evidence than "applied"
  | "learning"; // actively learning, not yet a claimable skill

export interface Skill {
  name: string;
  level: SkillLevel;
  note?: string; // short evidence, e.g. "Razorpay onboarding", "Mane & Oggarane"
}

export interface SkillGroup {
  title: string;
  icon: IconName;
  blurb: string;
  skills: Skill[];
}

export interface Role {
  company: string;
  title: string;
  team?: string;
  start: string; // "May 2025"
  end: string; // "Aug 2026" or "Present"
  location?: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

export type ProjectStatus =
  | "live-demo" // working demo, test mode, not production
  | "live" // publicly available
  | "experiment" // ongoing business/creative experiment, no proven outcome claimed
  | "in-progress"
  | "planned"
  | "completed";

export type ProjectCategory = "Full-stack" | "Data & Analytics" | "Fintech" | "Business & Product" | "AI & Content";

export interface Shot {
  src: string; // path under /public
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface Link {
  label: string;
  href: string;
  note?: string;
}

export interface CaseSection {
  heading: string;
  body?: string; // short paragraphs separated by \n\n
  bullets?: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  statusNote?: string; // e.g. "Test payments only"
  categories: ProjectCategory[];
  featured?: boolean; // shown larger on the home page
  flagship?: boolean;
  summary: string; // card text, 1–2 sentences
  role: string; // "My contribution" in one line
  aiAssisted?: string; // honest note on how AI was used
  tools: string[];
  cover?: Shot;
  gallery?: Shot[];
  links?: Link[];
  /** Architecture / workflow diagram: ordered layers of boxes */
  flow?: { title: string; layers: { label: string; items: string[] }[] };
  /** How many sections appear before the diagram & screenshots (default 2) */
  introSections?: number;
  /** Case-study body, rendered in order on /projects/<slug> */
  sections?: CaseSection[];
  /** If set, the card links here instead of a case-study page */
  externalPage?: string;
}

export interface JourneyItem {
  when: string;
  title: string;
  body: string;
  kind: "education" | "work" | "build" | "learning" | "next";
}

export type IconName =
  | "briefcase"
  | "code"
  | "sparkles"
  | "layers"
  | "chart"
  | "shield"
  | "mail"
  | "phone"
  | "linkedin"
  | "github"
  | "download"
  | "arrow-right"
  | "arrow-up-right"
  | "map-pin"
  | "copy"
  | "check"
  | "sun"
  | "moon"
  | "menu"
  | "x"
  | "play"
  | "workflow"
  | "store"
  | "book"
  | "video"
  | "megaphone"
  | "graduation"
  | "flag"
  | "arrow-up";
