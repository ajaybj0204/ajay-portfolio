import type { Role } from "./types";

/**
 * Work history — sourced from Ajay's current resume (Ajay_Cvv.pdf, Nov 2026).
 * Keep this in sync with public/Ajay-B-J-Resume.pdf.
 */
export const experience: Role[] = [
  {
    company: "Razorpay",
    title: "Business Operations",
    team: "Payments & POS",
    start: "May 2025",
    end: "Aug 2026",
    location: "Bengaluru",
    summary:
      "End-to-end POS merchant onboarding and payment operations for bank partners: MID/TID configuration, device onboarding, KYC and risk checks, reconciliation, and TAT-driven issue resolution.",
    highlights: [
      "Developed SOPs, training documentation and process resources for onboarding Kotak Bank and YES Bank POS merchants, reducing support inquiries by 40% after implementation.",
      "Managed MID & TID creation, mapping, validation and configuration to bank-specific requirements, plus device onboarding and device-to-TID mapping.",
      "Conducted KYC verification, risk checks and compliance validation during onboarding; coordinated with bank teams, internal setup ops, tech and support to resolve integration and configuration issues.",
      "Troubleshot MID/TID mismatches, tagging issues, HSM/TSS issues and device-mapping failures; kept configuration within TAT and closed Freshdesk tickets on time for smooth merchant go-live.",
      "Handled transaction and operational reconciliation, prepared reconciliation reports, and worked with bank teams to investigate and track unmatched transactions and exceptions.",
      "Built operational dashboards, automated daily trackers and reusable reporting workflows in Excel/Google Sheets with AI-assisted tools (Claude, ChatGPT, Gemini), cutting repetitive manual work and improving data accuracy and turnaround time.",
    ],
    tags: ["MID/TID", "POS onboarding", "Kotak · YES Bank", "KYC & risk checks", "Reconciliation", "SOPs", "Freshdesk", "Dashboards & trackers"],
  },
  {
    company: "G2 Risk Solutions",
    title: "Risk Operations",
    start: "Aug 2024",
    end: "Apr 2025",
    summary:
      "Merchant risk and compliance operations: Transaction Laundering Detection (TLD), risk-based transaction analysis and global merchant onboarding under KYC/AML standards.",
    highlights: [
      "Worked on Transaction Laundering Detection (TLD), monitoring merchant transactions for suspicious patterns, policy violations and potential misuse of POS infrastructure.",
      "Performed risk-based transaction analysis to flag abnormal volumes, MCC mismatches and high-risk merchant behaviour.",
      "Spearheaded enhanced risk-monitoring protocols for high-risk merchants, leading to a 7% increase in the early-detection rate of fraudulent transactions.",
      "Supported Global Onboarding for international markets, applying global KYC, AML and risk standards and coordinating with Risk, Compliance, Tech and Bank Ops.",
      "Ran ongoing fraud-risk assessments and kept documentation audit-ready, closing risk and monitoring cases on time within SLA and quality standards.",
    ],
    tags: ["TLD", "Transaction monitoring", "MCC checks", "Fraud risk", "KYC/AML", "Global onboarding", "SLA"],
  },
];
