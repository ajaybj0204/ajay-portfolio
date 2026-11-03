/**
 * Personal details & site-wide settings.
 * Anything marked TODO is a placeholder you should confirm or fill in.
 */
export const site = {
  name: "Ajay B J",
  shortName: "Ajay",
  // Your stated resume positioning
  headline: "Business Operations & Payments Operations · Data Analytics · AI-Assisted Building",
  heroKicker: "Business Operations · Payments · Data · AI-assisted building",
  heroTitle: ["I run payment operations,", "and I build the tools", "that make them better."],
  heroText:
    "2+ years in fintech operations at Razorpay and G2 Risk Solutions: POS merchant onboarding for bank partners, MID/TID management, KYC/AML and risk checks, transaction monitoring and reconciliation. I use Excel, SQL, Power BI, Python and AI-assisted tools to turn that operational know-how into dashboards, automations and working products.",
  location: "Bengaluru, Karnataka, India",
  availability: "Open to Business Operations, Payments Operations, Business Analyst and Data Analyst roles in Bengaluru",
  email: "ajaybj0204@gmail.com",
  phone: "+91 76763 53149", // shown on your previous site; set to "" to hide it
  linkedin: "https://linkedin.com/in/ajay-b-j",
  // From your GitHub repo owner name (ajaybj0204/...). Confirm the profile is public.
  github: "https://github.com/ajaybj0204",
  resumePdf: "/Ajay-B-J-Resume.pdf",
  url: "https://ajay-bj-portfolio.vercel.app",
  education: {
    degree: "BE, Information Science & Engineering",
    institution: "New Horizon College of Engineering, Bangalore",
    year: "2024",
  },
  profileImage: { src: "/images/profile.webp", alt: "Ajay B J", width: 720, height: 743 },
  /** Netlify Forms: requires "Enable form detection" once in the Netlify UI */
  contactFormName: "contact",
  seo: {
    title: "Ajay B J — Business & Payments Operations | Data Analytics | AI-Assisted Building",
    description:
      "Portfolio of Ajay B J, a Bengaluru-based business and payments operations professional (Razorpay, G2 Risk Solutions) with 2+ years in POS onboarding, KYC/AML, transaction monitoring and reconciliation, building dashboards, reconciliation tools and products with data and AI.",
  },
} as const;

export const nav = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#ai", label: "AI & Automation" },
  { href: "/#journey", label: "Journey" },
  { href: "/#contact", label: "Contact" },
];
