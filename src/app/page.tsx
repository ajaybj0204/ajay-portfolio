import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { experience } from "@/content/experience";
import { skillGroups, levelLabel } from "@/content/skills";
import { projects, earlierWork, caseStudies } from "@/content/projects";
import { journey, nowLearning } from "@/content/journey";
import type { ProjectCategory, SkillLevel } from "@/content/types";
import { Icon } from "@/components/Icon";
import { Button, SectionHead, StatusBadge, Tag } from "@/components/ui";
import { ProjectCard } from "@/components/layout";
import { ContactForm, CopyButton, HeroVideo, ProjectFilter, Typewriter } from "@/components/client";

const W = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
);

/** The bouncing arrow from the original site that jumps to the next section. */
const NextArrow = ({ to }: { to: string }) => (
  <a href={`#${to}`} aria-label="Go to next section" className="icon-btn next-arrow absolute right-8 bottom-6 hidden xl:grid">
    <Icon name="arrow-right" className="size-4 rotate-90" />
  </a>
);

/** Checkmark badge styled by evidence level (replaces the old "Experienced / Basic" labels). */
const levelBadge: Record<SkillLevel, string> = {
  professional: "bg-ink text-bg border-ink",
  applied: "border-ink text-ink",
  working: "border-line-strong text-muted",
  learning: "border-dashed border-warn text-warn",
};
const Check = ({ level }: { level: SkillLevel }) => (
  <span className={`grid size-6 shrink-0 place-items-center rounded-full border-[1.5px] ${levelBadge[level]}`} aria-hidden>
    <Icon name="check" className="size-3.5" />
  </span>
);

const roles = ["Payments Operations", "Business Operations Analyst", "Data Analyst", "AI-Assisted Builder"];
const ticker = ["Excel", "Google Sheets", "SQL", "Python", "pandas", "Power BI", "KYC / AML", "Merchant onboarding", "MID / TID", "POS", "Reconciliation", "Transaction monitoring", "SOPs", "Dashboards", "Next.js", "Supabase", "Razorpay payments", "Claude", "ChatGPT", "Google Flow", "Freshdesk"];

export default function Home() {
  const cats = Array.from(new Set(projects.flatMap((p) => p.categories))) as ProjectCategory[];
  const flagship = projects.find((p) => p.flagship)!;
  return (
    <>
      {/* ───────────────────────── 1. PROFILE / HERO ───────────────────────── */}
      <section aria-labelledby="hero-title" className="relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden">
        {/* floating decorative shapes */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="float absolute top-[12%] left-[6%] size-16 rounded-full border-2 border-line-strong" />
          <span className="float absolute top-[70%] left-[12%] size-6 rounded-full bg-line-strong [animation-delay:-2s]" />
          <span className="float absolute top-[18%] right-[8%] size-10 rotate-12 rounded-xl border-2 border-dashed border-line-strong [animation-delay:-4s]" />
          <span className="float absolute right-[16%] bottom-[14%] size-4 rounded-full bg-ink/20 [animation-delay:-1s]" />
          <span className="grid-lines absolute inset-0 opacity-70" />
        </div>

        <W className="grid w-full items-center gap-14 py-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Reel (photo shows while it loads, or for reduced motion) */}
          <div className="enter-zoom relative mx-auto">
            <div className="hero-photo float relative size-[250px] sm:size-[330px] lg:size-[400px]">
              <HeroVideo
                src="/videos/reel.mp4"
                poster={site.profileImage.src}
                label={`Short video of ${site.name}`}
                className="relative size-full rounded-full border-[6px] border-bg object-cover object-top shadow-[var(--shadow)]"
              />
            </div>
            <span className="orbit-chip glass absolute top-6 -left-6 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-[var(--shadow)] sm:-left-10 sm:text-sm" aria-hidden>💳 Payments ops</span>
            <span className="orbit-chip glass absolute top-1/2 -right-6 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-[var(--shadow)] [animation-delay:-1.6s] sm:-right-12 sm:text-sm" aria-hidden>📊 SQL · Power BI</span>
            <span className="orbit-chip glass absolute bottom-4 left-2 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-[var(--shadow)] [animation-delay:-3.2s] sm:text-sm" aria-hidden>✨ AI builder</span>
          </div>

          {/* Text */}
          <div className="text-center">
            <p className="enter inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-xs font-semibold text-ink-2" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-good opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-good" /></span>
              Open to roles · Bengaluru
            </p>
            <p className="kicker enter mt-6 text-lg" style={{ "--i": 1 } as React.CSSProperties}>Hello, I&apos;m</p>
            <h1 id="hero-title" className="enter mt-1 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl" style={{ "--i": 2 } as React.CSSProperties}>
              {site.name}
            </h1>
            <p className="enter mt-3 min-h-[2.2em] text-xl font-semibold text-ink-2 sm:text-[1.75rem]" style={{ "--i": 3 } as React.CSSProperties}>
              <Typewriter words={roles} />
            </p>
            <p className="enter mx-auto mt-4 max-w-lg text-[16.5px] leading-relaxed text-ink-2" style={{ "--i": 4 } as React.CSSProperties}>
              {site.heroTitle[0]} <span className="grad-text font-semibold">{site.heroTitle[1]}</span> {site.heroTitle[2]}
            </p>
            <div className="enter mt-8 flex flex-wrap justify-center gap-3" style={{ "--i": 5 } as React.CSSProperties}>
              <Button href={site.resumePdf} download><Icon name="download" /> Download CV</Button>
              <Button href="/#contact" variant="primary">Contact Info</Button>
              <Button href="/#projects">View projects <Icon name="arrow-right" /></Button>
            </div>
            <div className="enter mt-6 flex justify-center gap-3" style={{ "--i": 6 } as React.CSSProperties}>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="My LinkedIn profile"><Icon name="linkedin" /></a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="My GitHub profile"><Icon name="github" /></a>
              <a href={`mailto:${site.email}`} className="icon-btn" aria-label="Email me"><Icon name="mail" /></a>
            </div>
            <dl className="enter mx-auto mt-9 grid max-w-md grid-cols-3 divide-x divide-line rounded-[2rem] border border-line-strong py-4" style={{ "--i": 7 } as React.CSSProperties}>
              {[["2+", " yrs", "fintech ops"], ["2", "", "fintech companies"], ["10+", "", "projects shipped or underway"]].map(([n, unit, label]) => (
                <div key={label} className="px-2">
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-2xl font-bold"><span data-count={n}>{n}</span>{unit}</dd>
                  <dd className="text-[11px] leading-tight text-muted">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </W>

        <a href="#about" aria-label="Scroll to About" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted [@media(min-height:760px)]:flex">
          <span className="mouse" />
          Scroll
        </a>
      </section>

      {/* ───────────────────────── 2. ABOUT ───────────────────────── */}
      <section id="about" aria-labelledby="about-title" className="relative py-24">
        <W>
          <SectionHead id="about-title" eyebrow="Get To Know More" title="About Me" />
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="relative mx-auto w-full max-w-md" data-reveal="left">
              <span className="absolute -inset-4 rotate-3 rounded-[2.5rem] border-2 border-dashed border-line-strong" aria-hidden />
              <Image src="/images/hero-photo-wide.webp" alt="Ajay at his desk with headphones and a laptop" width={1162} height={784} sizes="(min-width: 1024px) 450px, 90vw" className="relative aspect-[4/4.4] w-full rounded-[2rem] object-cover object-[50%_30%] shadow-[var(--shadow)]" />
              <span className="float glass absolute -right-4 -bottom-5 rounded-[1.25rem] px-4 py-3 text-left shadow-[var(--shadow)]">
                <span className="block text-2xl font-bold">2+ yrs</span>
                <span className="text-xs text-ink-2">inside fintech operations</span>
              </span>
            </div>

            <div>
              <div className="grid gap-5 sm:grid-cols-2" data-stagger>
                <div className="glass lift rounded-[2rem] p-6 text-center">
                  <span className="mx-auto grid size-12 place-items-center rounded-full border-[1.5px] border-ink"><Icon name="briefcase" className="size-5" /></span>
                  <h3 className="mt-3 text-lg font-semibold">Experience</h3>
                  <p className="text-ink-2">2+ years · Fintech operations</p>
                  <p className="mt-1 text-xs text-muted">Razorpay · G2 Risk Solutions</p>
                </div>
                <div className="glass lift rounded-[2rem] p-6 text-center">
                  <span className="mx-auto grid size-12 place-items-center rounded-full border-[1.5px] border-ink"><Icon name="graduation" className="size-5" /></span>
                  <h3 className="mt-3 text-lg font-semibold">Education</h3>
                  <p className="text-ink-2">{site.education.degree}</p>
                  <p className="mt-1 text-xs text-muted">New Horizon College of Engineering · {site.education.year}</p>
                </div>
              </div>
              <div className="mt-8 space-y-4 text-[16px] leading-relaxed text-ink-2" data-reveal="right">
                <h3 className="text-2xl font-semibold tracking-tight text-ink">Operations background. <span className="grad-text">Builder&apos;s habits.</span></h3>
                <p>I&apos;m Ajay, a business and payments operations professional from Bengaluru with a BE in Information Science &amp; Engineering (New Horizon College of Engineering, 2024). At <strong className="text-ink">G2 Risk Solutions</strong> I worked on Transaction Laundering Detection, risk-based transaction analysis and global KYC/AML onboarding. At <strong className="text-ink">Razorpay</strong> I ran POS merchant onboarding for Kotak Bank and YES Bank: MID/TID configuration, device onboarding, reconciliation, SOPs, and dashboards and trackers I built with AI-assisted tools.</p>
                <p>That work taught me where payment processes actually break, and how much of an ops team&apos;s day goes on spreadsheets, manual checks and chasing mismatches. So I started building: dashboards, a reconciliation engine, report automations and a full-stack ordering platform with Razorpay payments.</p>
                <p>I build with AI tools (Claude, ChatGPT, Google Flow) and I&apos;m open about it. The requirements, business rules, testing and decisions are mine, and every project here is labelled with how far it really is.</p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {[
              { icon: "shield" as const, t: "Payments & risk", d: "Onboarding, KYC/AML, transaction monitoring, MID/TID and POS. I know the domain from the inside." },
              { icon: "chart" as const, t: "Analytical", d: "SQL, Excel and Python on real data, with KPIs defined before they're calculated." },
              { icon: "workflow" as const, t: "Process-minded", d: "SOPs, trackers and automation. I look for the manual step that shouldn't exist." },
              { icon: "sparkles" as const, t: "AI-assisted builder", d: "From spec to working product fast, with testing and honesty built in." },
            ].map((c) => (
              <div key={c.t} className="group glass lift rounded-[2rem] p-6 text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-ink text-bg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[360deg]"><Icon name={c.icon} className="size-5" /></span>
                <h3 className="mt-4 font-semibold">{c.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[2rem] border border-dashed border-line-strong p-6 text-center" data-reveal>
            <p className="eyebrow">Looking for</p>
            <p className="mt-2 text-[15px] text-ink">Business Operations Analyst · Payments Operations · Fintech Operations · Business Analyst · Data Analyst · technology-enabled operations</p>
            <p className="mt-1 text-sm text-muted">Bengaluru-based · also open to work-from-home roles</p>
          </div>
        </W>
        <NextArrow to="experience" />
      </section>

      {/* ───────────────────────── 3. EXPERIENCE ───────────────────────── */}
      <section id="experience" aria-labelledby="exp-title" className="relative bg-bg-2 py-24">
        <W>
          <SectionHead id="exp-title" eyebrow="Explore My" title="Experience" intro="2+ years inside fintech operations: payments, risk and compliance work at two fintech companies, the context behind every project on this site." />
          <ol className="timeline relative mx-auto grid max-w-4xl gap-8 pl-8 sm:pl-12">
            {experience.map((r, i) => (
              <li key={r.company} className="relative" data-reveal="right" style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
                <span className="absolute top-8 -left-[39px] grid size-4 place-items-center rounded-full border-2 border-ink bg-bg sm:-left-[55px]" aria-hidden>
                  <span className="size-1.5 rounded-full bg-ink" />
                </span>
                <article className="glass lift rounded-[2rem] p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {r.title}{r.team && <span className="text-ink-2"> · {r.team}</span>}
                    </h3>
                    <p className="rounded-full border border-line-strong px-3 py-0.5 text-xs font-medium text-ink-2">{r.start} – {r.end}</p>
                  </div>
                  <p className="mt-1 font-semibold">{r.company}{r.location && <span className="font-normal text-muted"> · {r.location}</span>}</p>
                  <p className="mt-3 text-ink-2">{r.summary}</p>
                  <ul className="mt-4 grid gap-2.5">
                    {r.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-ink-2"><Icon name="check" className="mt-1 size-4 shrink-0 text-ink" />{h}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">{r.tags.map((t) => (<Tag key={t}>{t}</Tag>))}</div>
                </article>
              </li>
            ))}
          </ol>
        </W>
        <NextArrow to="skills" />
      </section>

      {/* ───────────────────────── 4. SKILLS ───────────────────────── */}
      <section id="skills" aria-labelledby="skills-title" className="relative py-24">
        <W>
          <SectionHead id="skills-title" eyebrow="Explore My" title="Skills & Tools" intro="No percentage bars. Each skill is tagged with the evidence behind it: a paid role, a project on this site, or something I'm still learning." />
          <ul className="mb-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-ink-2" aria-label="Skill level legend" data-reveal>
            {(Object.keys(levelLabel) as SkillLevel[]).map((l) => (
              <li key={l} className="inline-flex items-center gap-2"><Check level={l} />{levelLabel[l]}</li>
            ))}
          </ul>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-stagger>
            {skillGroups.map((g) => (
              <article key={g.title} className="glass lift rounded-[2rem] p-6 sm:p-7">
                <div className="text-center">
                  <span className="mx-auto grid size-12 place-items-center rounded-full border-[1.5px] border-ink"><Icon name={g.icon} className="size-5" /></span>
                  <h3 className="mt-3 text-xl font-semibold text-ink-2">{g.title}</h3>
                  <p className="text-xs text-muted">{g.blurb}</p>
                </div>
                <ul className="mt-6 grid gap-3.5">
                  {g.skills.map((s) => (
                    <li key={s.name} className="flex items-start gap-3">
                      <Check level={s.level} />
                      <div>
                        <h4 className="text-[14.5px] leading-snug font-medium">{s.name}</h4>
                        <p className="text-xs text-muted">{levelLabel[s.level]}{s.note && ` · ${s.note}`}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </W>
        {/* Infinite tools ticker */}
        <div className="marquee mt-16 overflow-hidden py-2" aria-hidden>
          <div className="marquee-track">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="rounded-full border-[1.5px] border-line-strong px-5 py-2 text-sm font-medium whitespace-nowrap text-ink-2">{t}</span>
            ))}
          </div>
        </div>
        <NextArrow to="projects" />
      </section>

      {/* ───────────────────────── 5. PROJECTS ───────────────────────── */}
      <section id="projects" aria-labelledby="projects-title" className="relative bg-bg-2 py-24">
        <W>
          <SectionHead id="projects-title" eyebrow="Browse My Recent" title="Projects" intro="Full-stack products, fintech and data analysis, business experiments and AI workflows. Status badges say exactly how far each one has got." />

          {/* Flagship spotlight */}
          <article className="glass mb-12 grid overflow-hidden rounded-[2.5rem] p-3 lg:grid-cols-[1.1fr_0.9fr]" data-reveal="zoom">
            <Link href={`/projects/${flagship.slug}`} className="group relative block overflow-hidden rounded-[2rem]">
              <Image src={flagship.cover!.src} alt={flagship.cover!.alt} width={flagship.cover!.width} height={flagship.cover!.height} sizes="(min-width: 1024px) 60vw, 100vw" className="h-full w-full object-cover object-top transition duration-1000 group-hover:scale-[1.06]" />
              <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold tracking-widest text-accent-ink uppercase">Flagship</span>
            </Link>
            <div className="flex flex-col gap-4 p-6 lg:p-9">
              <p className="eyebrow">Flagship · full-stack</p>
              <h3 className="text-3xl font-semibold tracking-tight">{flagship.title}</h3>
              <StatusBadge status={flagship.status} note={flagship.statusNote} />
              <p className="leading-relaxed text-ink-2">{flagship.summary}</p>
              <div className="flex flex-wrap gap-1.5">{flagship.tools.map((t) => (<Tag key={t}>{t}</Tag>))}</div>
              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                <Button href={`/projects/${flagship.slug}`} variant="primary">Read case study <Icon name="arrow-right" /></Button>
                {flagship.links?.[0] && <Button href={flagship.links[0].href} external>{flagship.links[0].label}</Button>}
              </div>
            </div>
          </article>

          <ProjectFilter categories={cats}>
            {projects.filter((p) => !p.flagship).map((p) => (<ProjectCard key={p.slug} p={p} />))}
          </ProjectFilter>

          <p className="eyebrow mt-14 mb-4 text-center" data-reveal>Earlier analytics projects · 2024</p>
          <div className="grid gap-5 md:grid-cols-2" data-stagger>
            {earlierWork.map((e) => (
              <article key={e.title} className="lift rounded-[2rem] border border-dashed border-line-strong bg-bg p-6 transition duration-300">
                <div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-semibold">{e.title}</h3><span className="text-xs text-muted">{e.when}</span></div>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{e.text}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{e.tools.map((t) => (<Tag key={t}>{t}</Tag>))}</div>
              </article>
            ))}
          </div>

          {/* Case studies index */}
          <div className="glass mt-14 rounded-[2.5rem] p-7 text-center sm:p-10" data-reveal>
            <p className="kicker">Read the full story</p>
            <h2 id="cases-title" className="mt-1 text-3xl font-semibold tracking-tight">Project Case Studies</h2>
            <p className="mx-auto mt-2 max-w-2xl text-ink-2">Problem, solution, my contribution, architecture, screenshots, challenges, business considerations and lessons learned.</p>
            <ul className="mt-8 grid gap-3 text-left sm:grid-cols-2" data-stagger>
              {caseStudies.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="group flex items-center justify-between gap-3 rounded-full border-[1.5px] border-line-strong px-5 py-3 transition duration-300 hover:border-ink hover:bg-ink hover:text-bg">
                    <span>
                      <span className="block font-medium">{p.title}</span>
                      <span className="text-xs opacity-70">{p.tagline}</span>
                    </span>
                    <Icon name="arrow-right" className="size-4 shrink-0 transition group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
              <li>
                <a href="/data-projects.html" className="group flex items-center justify-between gap-3 rounded-full border-[1.5px] border-line-strong px-5 py-3 transition duration-300 hover:border-ink hover:bg-ink hover:text-bg">
                  <span>
                    <span className="block font-medium">Data & Automation Lab (8 projects)</span>
                    <span className="text-xs opacity-70">Interactive dashboards on real public data</span>
                  </span>
                  <Icon name="arrow-right" className="size-4 shrink-0 transition group-hover:translate-x-1" />
                </a>
              </li>
            </ul>
          </div>
        </W>
        <NextArrow to="ai" />
      </section>

      {/* ───────────────────────── 6. AI & AUTOMATION ───────────────────────── */}
      <section id="ai" aria-labelledby="ai-title" className="relative py-24">
        <W>
          <SectionHead id="ai-title" eyebrow="How I Work With" title="AI & Automation" intro="AI speeds up the parts that are slow for one person: drafting code, generating video, formatting content. The judgement parts stay human: what to build, what's correct, what's safe to ship." />
          <div className="grid gap-6 lg:grid-cols-3" data-stagger>
            {[
              { icon: "code" as const, t: "AI-assisted development", d: "Claude and ChatGPT write and refactor code from my specs. I review every change, test the flows (payments, refunds, edge cases) and keep the final say on architecture.", ex: "Mane & Oggarane, this website, data projects" },
              { icon: "video" as const, t: "Generative video workflows", d: "Google Flow clips from scene-by-scene prompt templates with a consistent presenter character, cut into 9:16 shorts for Instagram, Facebook and YouTube.", ex: "AI short-form video workflows" },
              { icon: "workflow" as const, t: "Ops automation", d: "Python scripts that replace manual export → pivot → email routines, with logs so a failed run is never silent.", ex: "Daily ops report, reconciliation engine" },
            ].map((c) => (
              <article key={c.t} className="group glass lift rounded-[2rem] p-7 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-ink text-bg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12"><Icon name={c.icon} className="size-6" /></span>
                <h3 className="mt-5 text-lg font-semibold">{c.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{c.d}</p>
                <p className="mt-4 text-xs text-muted">Seen in: {c.ex}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-6 rounded-[2rem] border border-dashed border-line-strong p-7 text-center sm:grid-cols-3" data-stagger>
            {[
              ["What AI does", "Drafts code, formats content, generates video clips"],
              ["What I do", "Requirements, business rules, testing, review, decisions"],
              ["What I don't claim", "Proprietary models, autonomous systems, or skills I haven't used"],
            ].map(([a, b]) => (
              <div key={a}>
                <p className="eyebrow">{a}</p>
                <p className="mt-2 text-sm text-ink-2">{b}</p>
              </div>
            ))}
          </div>
        </W>
        <NextArrow to="journey" />
      </section>

      {/* ───────────────────────── 7. LEARNING JOURNEY ───────────────────────── */}
      <section id="journey" aria-labelledby="journey-title" className="relative bg-bg-2 py-24">
        <W>
          <SectionHead id="journey-title" eyebrow="Follow My" title="Learning Journey" intro="From operations to building. Every step has added a layer: domain knowledge first, then tools, then shipping things." />
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="glass h-fit rounded-[2rem] p-7 text-center lg:sticky lg:top-28" data-reveal="left">
              <span className="mx-auto grid size-12 place-items-center rounded-full border-[1.5px] border-ink"><Icon name="book" className="size-5" /></span>
              <h3 className="mt-3 text-lg font-semibold">Currently learning</h3>
              <ul className="mt-5 flex flex-wrap justify-center gap-2" data-stagger>
                {nowLearning.map((n) => (<li key={n} className="rounded-full border border-dashed border-warn px-3 py-1 text-sm text-ink">{n}</li>))}
              </ul>
            </div>
            <ol className="timeline relative grid gap-6 pl-8">
              {journey.map((j) => (
                <li key={j.title} className="relative" data-reveal="right">
                  <span className={`absolute top-6 -left-[39px] size-4 rounded-full border-2 ${j.kind === "next" ? "border-dashed border-warn" : "border-ink"} bg-bg`} aria-hidden />
                  <div className="glass lift rounded-[1.75rem] p-5">
                    <p className="text-xs font-semibold text-muted">{j.when}</p>
                    <h3 className="mt-1 font-semibold">{j.title}</h3>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-ink-2">{j.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </W>
      </section>

      {/* ───────────────────────── 8. RESUME ───────────────────────── */}
      <section id="resume" aria-labelledby="resume-title" className="py-20">
        <W>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-accent p-8 text-center text-accent-ink sm:p-14" data-reveal="zoom">
            <span className="float absolute -top-10 -left-10 size-40 rounded-full border-2 border-accent-ink/20" aria-hidden />
            <span className="float absolute -right-8 -bottom-12 size-52 rounded-full border-2 border-dashed border-accent-ink/20 [animation-delay:-3s]" aria-hidden />
            <div className="relative">
              <p className="font-semibold opacity-70">Want the short version?</p>
              <h2 id="resume-title" className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">My Current Resume</h2>
              <p className="mx-auto mt-3 max-w-xl opacity-80">Experience at Razorpay and G2 Risk Solutions, skills, analytics projects and education, as a two-page PDF.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={site.resumePdf} download className="btn border-accent-ink bg-accent-ink text-accent before:bg-bg-2"><Icon name="download" /> Download PDF</a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn border-accent-ink text-accent-ink before:bg-accent-ink hover:text-accent">LinkedIn <Icon name="arrow-up-right" className="size-3.5" /></a>
              </div>
            </div>
          </div>
        </W>
      </section>

      {/* ───────────────────────── 9. CONTACT ───────────────────────── */}
      <section id="contact" aria-labelledby="contact-title" className="py-20">
        <W>
          <SectionHead id="contact-title" eyebrow="Get in Touch" title="Contact Me" intro="Hiring for operations, payments, business analysis or data roles in Bengaluru? Or want an ordering platform for your restaurant? I'd love to hear from you." />
          <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-[2rem] border-[1.5px] border-line-strong px-6 py-5" data-stagger>
            <li className="flex flex-wrap items-center justify-center gap-3">
              <a href={`mailto:${site.email}`} className="nav-link inline-flex items-center gap-2.5 text-[17px]"><Icon name="mail" className="size-6" /><span>{site.email}</span></a>
              <CopyButton text={site.email} />
            </li>
            {site.phone && (
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="nav-link inline-flex items-center gap-2.5 text-[17px]"><Icon name="phone" className="size-5" /><span>{site.phone}</span></a>
              </li>
            )}
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="nav-link inline-flex items-center gap-2.5 text-[17px]"><Icon name="linkedin" className="size-5" /><span>LinkedIn</span></a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-ink-2"><Icon name="map-pin" className="size-5" />{site.location}</li>
          </ul>
          <div className="mx-auto mt-10 max-w-2xl" data-reveal>
            <ContactForm formName={site.contactFormName} />
          </div>
        </W>
      </section>
    </>
  );
}
