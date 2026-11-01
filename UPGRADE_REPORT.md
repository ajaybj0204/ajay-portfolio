# Portfolio Upgrade Report

Date: 2 Nov 2026 · Scope: rebuild of explorexplorer.netlify.app following the master prompt.

---

## Sources
Live site (Netlify), Netlify deploy metadata, your current resume (`Ajay_Cvv.pdf`, Nov 2026), the Mane & Oggarane demo, explorexdeals.com and your SuperProfile pages.

## Phase 1: Inspection of the current site

**How it was inspected:** through the Netlify API (project and deploy metadata) and by loading the live site in a browser. There is **no source repository**. The live site is a drag-and-drop upload from 11 June 2026 (`deploy_source: drop`, 1 HTML page + 2 assets), so the published HTML *is* the source.

### Architecture found
- One `index.html` (~60 KB), Tailwind loaded at runtime from `cdn.tailwindcss.com`, GSAP + ScrollTrigger from cdnjs, about 11 KB of inline JS.
- One image, `hero-bg.jpg` (1527×1030), used as the full-screen hero background.
- No build step, no forms, no redirects or headers, Netlify Forms not enabled.

### Content inventory (all preserved where still valid)
| Content | Kept? |
|---|---|
| Name, email, phone, LinkedIn (`linkedin.com/in/ajay-b-j`) | ✅ |
| Razorpay, Business Operations, May 2025 → | ✅ **corrected end date to Aug 2026** |
| G2 Risk Solutions, Risk Operations, Aug 2024 – Apr 2025 | ✅ |
| Bullets (MID/TID, KYC, HSM/TSS, transaction monitoring, SLA) | ✅ |
| "Reduced support inquiries by 40%" / "7% increase in early detection" | ✅ kept, **flagged for you to confirm** |
| Skills: SQL, Python, Power BI, Tableau, POS, Payments, KYC, AML, Freshdesk, Excel, Bank APIs, HSM | ✅ mapped to evidence levels and updated from your resume (Tableau dropped as it isn't on the resume; Google Sheets, SFTP, TLD and Gemini added) |
| Projects: Customer Churn (Python), Sales Dashboard (Power BI) | ✅ kept as "Earlier analytics work" (no links available) |
| Hero photo | ✅ reused as the profile image |
| "My Process" (Define/Design/Build/Launch) | Replaced by the AI & Automation and Journey sections |

### Problems found
| Area | Issue |
|---|---|
| **Accuracy** | Says "Currently scaling operations at Razorpay"; you left in Aug 2026. Headline "FinTech Ops Expert" overstates for analyst roles. Footer © 2024. |
| **Broken UI** | "PLAY REEL" button has nothing to play. "Hire Me" and "View Work" only scroll. |
| **Missing** | No real projects (Mane & Oggarane, ExploreXDeals, data work), no resume download, no GitHub, no contact form, no case studies, no light mode. |
| **Performance** | Tailwind CDN compiles CSS in the browser on every visit (Tailwind says not for production). GSAP for simple fades. A full-bleed 1527 px JPEG hero. |
| **SEO** | No meta description, no Open Graph image, no sitemap/robots, no structured data. |
| **Accessibility** | Text over a busy photo (contrast varies), emoji used as icons in contact links, animation with no reduced-motion handling. |

### Recommendation: **B. Rebuild** (Next.js + TypeScript + Tailwind, static export)
There's no codebase to modernise, only one generated HTML file. A rebuild gives typed, editable content files; reusable project and case-study templates; zero runtime CDN dependencies; and a static `out/` folder that Netlify hosts for free. Next.js is also the stack you already used for Mane & Oggarane, so the code will look familiar.
No motion library: CSS transitions plus a ~20-line IntersectionObserver do the reveal effects, which keeps the JavaScript small (Framer Motion would add ~40 KB for no visible gain).

---

## Phase 2: Architecture & design

**Information architecture (home page, in order):** Home/hero → About → Professional experience → Skills & tools → Featured projects (flagship spotlight + filterable grid + earlier work) → Case-studies index → AI & automation → Learning journey → Resume → Contact.
**Separate pages:** `/projects/<slug>` × 5 case studies, `/data-projects.html` (Data & Automation Lab with live dashboards), 404.

**Positioning:** "I run payment operations, and I build the tools that make them better." This leads with your verified operations experience, then shows the building, rather than presenting you as a senior engineer.

**Design system**
- Dark-first, optional light mode (remembered, no flash on load), tokens in `globals.css`.
- Accent: teal `#5eead4` → indigo `#a5b4fc` gradient for emphasis only.
- Type: Inter (text) + JetBrains Mono (labels), self-hosted, Latin subset.
- Components: glass cards, status badges (Live demo / Live / Experiment / In progress / Planned / Completed), evidence-level dots for skills, flow diagrams, keyboard-accessible gallery.

**Data model:** `src/content/types.ts`. `Project` has status, categories, role, `aiAssisted`, tools, cover, gallery, links, flow diagram and case-study sections; `Skill` has an evidence level instead of a percentage.

---

## Phase 4: Test results (local production build)

| Check | Result |
|---|---|
| Build (`next build`, static export) | ✅ 0 errors, 11 routes |
| Console errors (all pages, both themes) | ✅ none |
| axe-core WCAG 2 A/AA + best practice (8 pages × 2 themes) | ✅ 0 violations |
| Horizontal overflow at 1440 / 834 / 390 px, both themes | ✅ none |
| Internal links (all pages) | ✅ all 200 |
| Keyboard: skip link first, gallery ←/→/Esc, mobile menu Esc | ✅ |
| Project filter, theme toggle, copy email, back-to-top | ✅ |
| Contact form markup (`data-netlify`, honeypot, skeleton file) | ✅ (submission itself can only be tested on Netlify) |
| Lighthouse, home (mobile simulation) | Performance 93–96 · Accessibility 100 · Best practices 100 · SEO 100 |
| Lighthouse, Mane & Oggarane case study | 98 · 100 · 100 · 100 |
| SEO files | ✅ sitemap.xml, robots.txt, Open Graph image, Person JSON-LD, canonical URLs |

---

## Things only you can confirm

1. **Profile photo:** reused from your current site. Make sure you're happy for recruiters to see it; replace `public/images/profile.webp` otherwise.
2. **40% and 7% claims:** both appear on your current resume (Kotak/YES Bank SOPs → 40% fewer support inquiries; enhanced high-risk monitoring → 7% better early detection). Be ready to explain how each was measured in interviews.
3. **GitHub link:** `github.com/ajaybj0204` comes from your repo owner name. Check the profile is public and tidy (the Mane & Oggarane repo can stay private).
4. **Education:** BE, Information Science & Engineering, New Horizon College of Engineering, 2024, taken from your resume.
5. **Phone number:** shown, as on your old site. Set `phone: ""` to hide it.
6. **Video persona:** your AI presenter is described generically and **not named**, and no social handles are linked, so the persona stays anonymous. Add channel links only if you're OK connecting them to your name.
7. **Resume PDF:** the download is your own current resume (`Ajay_Cvv.pdf`), unchanged.

## Update: resume + all digital products (2 Nov 2026)
- **Resume:** experience, skills, education and earlier projects now follow your current resume (`Ajay_Cvv.pdf`), and that exact PDF is the download.
- **Digital products:** one case study, *ExploreXplorer Digital Products*, now covers all three products you created on SuperProfile: Bachelor's Kitchen, Zero to Side Income and the 11-in-1 Mega Bundle. The Coding/DSA bundle is left out because you resell it under licence; you didn't create it.
- **Check on SuperProfile:** the Mega Bundle *cover image* lists "Coding / DSA / AI / Tech Interview Mastery" as the 11th library, but the *description* says the 11th is Bachelor's Kitchen (the coding bundle is a separate add-on). The cover also says "Lifetime Updates". Align the cover with what buyers actually get, to avoid refund requests.
