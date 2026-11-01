import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { site } from "@/content/site";
import { experience } from "@/content/experience";
import { Footer, Header } from "@/components/layout";
import { Enhancements } from "@/components/client";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: `%s · ${site.name}` },
  description: site.seo.description,
  keywords: ["Ajay B J", "Business Operations Analyst", "Payments Operations", "Fintech Operations", "Business Analyst", "Data Analyst", "Bengaluru", "Razorpay", "SQL", "Power BI", "Excel"],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: site.seo.title,
    description: site.seo.description,
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}: fintech operations, data and AI-assisted building` }],
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description, images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Business & Payments Operations Professional",
  description: site.seo.description,
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
  sameAs: [site.linkedin, site.github],
  alumniOf: { "@type": "CollegeOrUniversity", name: site.education.institution },
  hasOccupation: experience.map((r) => ({ "@type": "Occupation", name: `${r.title}, ${r.company}` })),
  knowsAbout: ["Payments operations", "Merchant onboarding", "KYC/AML", "Reconciliation", "SQL", "Excel", "Power BI", "Python", "Next.js", "Supabase"],
};

// Sets the theme before paint to avoid a flash (light is default)
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-theme="light" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="page-bg min-h-dvh">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Enhancements />
      </body>
    </html>
  );
}
