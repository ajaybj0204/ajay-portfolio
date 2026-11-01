/**
 * Generates public/og.png (social preview) from src/content/*.
 *
 *   npm run assets              → og.png only (your real resume PDF is left alone)
 *   npm run assets -- --resume  → ALSO overwrites public/Ajay-B-J-Resume.pdf with a
 *                                 one-page resume generated from the site content
 *
 * Uses Playwright (Chromium). Install once with: npx playwright install chromium
 */
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "../src/content/site";
import { experience } from "../src/content/experience";
import { skillGroups } from "../src/content/skills";
import { projects } from "../src/content/projects";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const pub = join(__dirname, "..", "public");

const skillsBy = (lv: string[]) =>
  skillGroups.flatMap((g) => g.skills.filter((s) => lv.includes(s.level)).map((s) => s.name));

const resumeProjects = ["mane-oggarane", "payment-reconciliation", "data-automation-lab"]
  .map((slug) => projects.find((p) => p.slug === slug)!)
  .filter(Boolean);

const statusWord: Record<string, string> = {
  "live-demo": "Live demo",
  live: "Live",
  experiment: "Experiment",
  "in-progress": "In progress",
  planned: "Planned",
  completed: "Completed",
};

const resume = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@page{size:A4;margin:14mm 15mm}
*{box-sizing:border-box}body{font:9.4pt/1.4 "Inter",Arial,sans-serif;color:#111827;margin:0}
h1{font-size:21pt;margin:0;letter-spacing:-.02em}h2{font-size:9pt;letter-spacing:.14em;text-transform:uppercase;color:#0f766e;margin:13px 0 5px;padding-bottom:3px;border-bottom:1px solid #d1d5db}
.head{display:flex;justify-content:space-between;align-items:flex-end;gap:12px}.sub{color:#374151;margin-top:2px;font-size:10pt}
.contact{text-align:right;font-size:8.6pt;color:#374151;line-height:1.45;white-space:nowrap}a{color:#0f766e;text-decoration:none}
.role{margin-top:7px}.row{display:flex;justify-content:space-between;gap:8px}.row b{font-size:10pt}.muted{color:#6b7280}
ul{margin:3px 0 0;padding-left:15px}li{margin:1.5px 0}
.grid{display:grid;grid-template-columns:118px 1fr;gap:3px 10px}.grid dt{font-weight:600;color:#374151}.grid dd{margin:0}
.proj{margin-top:5px}.tag{font-size:8pt;color:#0f766e;border:1px solid #99f6e4;border-radius:9px;padding:0 6px;margin-left:5px}
.note{font-size:7.8pt;color:#6b7280;margin-top:12px;border-top:1px solid #e5e7eb;padding-top:5px}
</style></head><body>
<div class="head"><div><h1>${esc(site.name)}</h1><div class="sub">${esc(site.headline).replace(" · Data", "<br>Data")}</div></div>
<div class="contact">${esc(site.location)}<br><a href="mailto:${site.email}">${site.email}</a>${site.phone ? "<br>" + esc(site.phone) : ""}<br>
<a href="${site.linkedin}">${site.linkedin.replace("https://", "")}</a><br><a href="${site.url}">${site.url.replace("https://", "")}</a></div></div>

<h2>Summary</h2>
<div>Fintech and business operations professional with 2 years across payments, POS and risk operations at Razorpay and G2 Risk Solutions: merchant onboarding, MID/TID configuration, KYC/AML, transaction monitoring and reconciliation. I apply SQL, Excel, Python and AI-assisted development to build dashboards, reconciliation tooling and a full-stack ordering platform. Seeking Business Operations, Payments Operations, Business Analyst and Data Analyst roles in Bengaluru.</div>

<h2>Experience</h2>
${experience
  .map(
    (r) => `<div class="role"><div class="row"><b>${esc(r.title)}${r.team ? " · " + esc(r.team) : ""}, ${esc(r.company)}</b><span class="muted">${r.start} – ${r.end}</span></div>
<ul>${r.highlights.map((h) => `<li>${esc(h.replace(/; credited on my previous portfolio with/, ", credited with").replace(/ \(as stated on my previous portfolio\)/, ""))}</li>`).join("")}</ul></div>`,
  )
  .join("")}

<h2>Projects</h2>
${resumeProjects
  .map(
    (p) => `<div class="proj"><b>${esc(p.title)}</b><span class="tag">${statusWord[p.status]}</span> <span class="muted">· ${esc(p.tools.slice(0, 5).join(", "))}</span>
<div>${esc(p.summary)}</div></div>`,
  )
  .join("")}

<h2>Skills</h2>
<dl class="grid">
<dt>Operations</dt><dd>${esc(skillsBy(["professional"]).filter((s) => !/Excel|Freshdesk/.test(s)).join(" · "))}</dd>
<dt>Analytics</dt><dd>${esc(skillGroups.find((g) => g.title.startsWith("Analytics"))!.skills.filter((s) => s.level !== "learning").map((s) => s.name).join(" · "))}</dd>
<dt>Building</dt><dd>${esc(skillGroups.find((g) => g.title === "Development")!.skills.filter((s) => s.level === "applied").map((s) => s.name).join(" · "))} · AI-assisted coding (Claude, ChatGPT) · Google Flow</dd>
<dt>Tools</dt><dd>Excel · Freshdesk · Vercel · Netlify · GitHub · Shopify · SuperProfile</dd>
<dt>Learning</dt><dd>${esc(skillsBy(["learning"]).join(" · "))}</dd>
</dl>

<h2>Education</h2>
<div>${esc(site.education.degree)}${site.education.institution ? ", " + esc(site.education.institution) : ""}${site.education.year ? " (" + site.education.year + ")" : ""}</div>

<div class="note">Project code is AI-assisted; requirements, business rules and testing are my own. Full case studies at ${site.url.replace("https://", "")}</div>
</body></html>`;

const og = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
body{margin:0;width:1200px;height:630px;background:#090c13;color:#eef2f8;font-family:Inter,Arial,sans-serif;overflow:hidden;position:relative}
.g{position:absolute;inset:0;background-image:linear-gradient(rgba(148,163,184,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.12) 1px,transparent 1px);background-size:56px 56px;-webkit-mask-image:radial-gradient(ellipse at 70% 0%,black 20%,transparent 70%)}
.glow{position:absolute;width:800px;height:500px;right:-200px;top:-200px;background:radial-gradient(closest-side,rgba(94,234,212,.28),transparent)}
.w{position:absolute;left:80px;top:90px;right:80px}
.k{font:600 20px ui-monospace,Menlo,monospace;letter-spacing:.14em;color:#5eead4;text-transform:uppercase}
h1{font-size:84px;margin:22px 0 0;letter-spacing:-.04em;line-height:1}
.t{font-size:34px;margin-top:22px;line-height:1.25;color:#aab4c5;max-width:980px}
.t b{background:linear-gradient(95deg,#5eead4,#a5b4fc);-webkit-background-clip:text;color:transparent}
.f{position:absolute;left:80px;bottom:70px;display:flex;gap:14px}.f span{border:1px solid rgba(148,163,184,.3);border-radius:999px;padding:8px 18px;font-size:22px;color:#cbd5e1}
</style></head><body><div class="g"></div><div class="glow"></div><div class="w">
<div class="k">Bengaluru · Open to roles</div><h1>${esc(site.name)}</h1>
<div class="t">Fintech & business operations, now building <b>dashboards, reconciliation tools and products</b> with data and AI.</div></div>
<div class="f"><span>Payments ops</span><span>SQL · Excel · Power BI</span><span>Next.js · Supabase · Razorpay</span></div></body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  if (process.argv.includes("--resume")) {
  await page.setContent(resume, { waitUntil: "load" });
  await page.pdf({ path: join(pub, "Ajay-B-J-Resume.pdf"), format: "A4", printBackground: true, margin: { top: "14mm", bottom: "12mm", left: "15mm", right: "15mm" } });
  writeFileSync(join(__dirname, "resume-preview.html"), resume);
  }
  const og2 = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await og2.setContent(og, { waitUntil: "load" });
  await og2.screenshot({ path: join(pub, "og.png") });
  await browser.close();
  console.log(process.argv.includes("--resume") ? "wrote resume PDF + og.png" : "wrote og.png");
})();
