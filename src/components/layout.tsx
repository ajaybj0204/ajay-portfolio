import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/content/site";
import type { Project } from "@/content/types";
import { Icon } from "./Icon";
import { MobileNav, ThemeToggle } from "./client";
import { StatusBadge, Tag } from "./ui";

/** Classic nav from the original site: name on the left, text links with a sliding underline. */
export function Header() {
  return (
    <header id="site-header" className="sticky top-0 z-40 transition-all duration-500 data-[scrolled=true]:border-b data-[scrolled=true]:border-line data-[scrolled=true]:bg-bg/80 data-[scrolled=true]:shadow-[0_10px_30px_-20px_rgb(0_0_0/0.35)] data-[scrolled=true]:backdrop-blur-xl">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink">
        Skip to content
      </a>
      <div className="scroll-progress progress absolute inset-x-0 bottom-0 h-[2px] bg-ink" aria-hidden />
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 transition-all duration-500 [[data-scrolled=true]_&]:h-16 sm:px-8">
        <Link href="/" className="group text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
          <span className="inline-block transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">{site.name}</span>
          <span className="ml-0.5 inline-block size-2 rounded-full bg-ink transition-transform duration-300 group-hover:scale-150" aria-hidden />
        </Link>
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7 text-[1.02rem]">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} data-nav={n.href.split("#")[1]} className="nav-link">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={site.resumePdf} download className="btn btn-outline hidden !px-4 !py-2 sm:inline-flex">
            <Icon name="download" className="size-3.5" /> Resume
          </a>
          <ThemeToggle />
          <MobileNav items={nav} />
        </div>
      </div>
    </header>
  );
}

/** Classic footer: centred nav links + copyright, with social icons. */
export function Footer() {
  return (
    <footer className="mt-10 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-14 text-center">
        <Link href="/" className="text-2xl font-semibold tracking-tight">{site.name}</Link>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-[15px]">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="nav-link">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn profile"><Icon name="linkedin" /></a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub profile"><Icon name="github" /></a>
          <a href={`mailto:${site.email}`} className="icon-btn" aria-label="Email"><Icon name="mail" /></a>
        </div>
        <p className="text-sm text-ink-2">
          Copyright © {new Date().getFullYear()} {site.name}. All Rights Reserved.
          <span className="mt-1 block text-xs text-muted">Built with Next.js and AI-assisted development; content and claims are my own.</span>
        </p>
      </div>
    </footer>
  );
}

export function projectHref(p: Project) {
  return p.externalPage ?? `/projects/${p.slug}`;
}

export function ProjectCard({ p, priority = false }: { p: Project; priority?: boolean }) {
  const href = projectHref(p);
  const isStatic = href.endsWith(".html") || href.includes(".html#");
  const inner = (
    <>
      <span className="shine pointer-events-none absolute inset-0 z-10" aria-hidden />
      {p.cover ? (
        <div className="relative m-3 mb-0 overflow-hidden rounded-[1.5rem] border border-line">
          <Image src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} priority={priority} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="aspect-[16/9] w-full object-cover object-top transition duration-700 group-hover:scale-[1.07]" />
          {p.flagship && (
            <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 text-[10.5px] font-semibold tracking-widest text-accent-ink uppercase">Flagship</span>
          )}
        </div>
      ) : (
        <div className="relative m-3 mb-0 flex aspect-[16/9] items-end overflow-hidden rounded-[1.5rem] border border-line bg-surface p-5">
          <div className="grid-lines absolute inset-0 opacity-60" aria-hidden />
          <p className="relative text-xs leading-relaxed font-medium text-ink-2">
            {p.tools.slice(0, 4).map((t) => `> ${t}`).join("\n").split("\n").map((l) => (<span key={l} className="block">{l}</span>))}
          </p>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <StatusBadge status={p.status} note={p.statusNote} />
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
          <p className="text-sm text-muted">{p.tagline}</p>
        </div>
        <p className="text-[14.5px] leading-relaxed text-ink-2">{p.summary}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {p.tools.slice(0, 5).map((t) => (<Tag key={t}>{t}</Tag>))}
        </div>
        <span className="btn btn-outline mt-3 self-start !px-4 !py-2 text-[13px]">
          {p.externalPage ? "Open dashboards" : "Read case study"} <Icon name="arrow-right" className="size-3.5 transition group-hover:translate-x-1" />
        </span>
      </div>
    </>
  );
  const cls = "group glass relative flex h-full flex-col overflow-hidden rounded-[2rem] !bg-bg-2 hover:shadow-[var(--shadow)]";
  return (
    <article data-cats={p.categories.join("|")} className="h-full [perspective:1000px]" data-tilt>
      {isStatic ? (<a href={href} className={cls}>{inner}</a>) : (<Link href={href} className={cls}>{inner}</Link>)}
    </article>
  );
}

export function FlowDiagram({ flow }: { flow: NonNullable<Project["flow"]> }) {
  return (
    <figure className="glass rounded-[2rem] p-5 sm:p-7" aria-label={flow.title}>
      <figcaption className="eyebrow mb-5">{flow.title}</figcaption>
      <ol className="grid gap-3 md:grid-cols-4">
        {flow.layers.map((l, i) => (
          <li key={l.label} className="relative">
            <div className="h-full rounded-[1.25rem] border border-line bg-bg-2 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span className="grid size-6 place-items-center rounded-full bg-accent text-[11px] text-accent-ink">{i + 1}</span>
                {l.label}
              </p>
              <ul className="mt-3 grid gap-1.5">
                {l.items.map((it) => (<li key={it} className="text-[13px] leading-snug text-ink-2">{it}</li>))}
              </ul>
            </div>
            {i < flow.layers.length - 1 && (
              <span className="absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 text-accent md:block" aria-hidden>
                <Icon name="arrow-right" className="size-4" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
