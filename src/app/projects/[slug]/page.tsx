import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getProject } from "@/content/projects";
import { Icon } from "@/components/Icon";
import { Button, StatusBadge, Tag } from "@/components/ui";
import { FlowDiagram, ProjectCard } from "@/components/layout";
import { Gallery } from "@/components/client";

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title}: case study`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.title}: ${p.tagline}`, description: p.summary, images: p.cover ? [{ url: p.cover.src }] : ["/og.png"] },
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || !p.sections) notFound();
  const idx = caseStudies.findIndex((c) => c.slug === p.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  const facts: [string, React.ReactNode][] = [
    ["Status", <StatusBadge key="s" status={p.status} note={p.statusNote} />],
    ["My contribution", p.role],
    ["Tools", <span key="t" className="flex flex-wrap gap-1.5">{p.tools.map((t) => (<Tag key={t}>{t}</Tag>))}</span>],
  ];
  if (p.aiAssisted) facts.push(["How AI was used", p.aiAssisted]);

  return (
    <article className="pb-20">
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-lines absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-5 pt-12 pb-12">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/#projects" className="inline-flex items-center gap-1.5 hover:text-accent">
              <Icon name="arrow-right" className="size-3.5 rotate-180" /> All projects
            </Link>
          </nav>
          <p className="eyebrow mt-8">Case study · {p.categories.join(" · ")}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">{p.title}</h1>
          <p className="mt-3 text-xl text-ink-2">{p.tagline}</p>
          <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-ink-2">{p.summary}</p>
          {p.links && (
            <div className="mt-7 flex flex-wrap gap-3">
              {p.links.map((l, i) => (
                <span key={l.href} className="inline-flex flex-col gap-1">
                  <Button href={l.href} external variant={i === 0 ? "primary" : "ghost"}>{l.label}</Button>
                  {l.note && <span className="text-xs text-muted">{l.note}</span>}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-12 px-5 pt-12">
        <dl className="glass grid gap-5 rounded-[2rem] p-6 sm:grid-cols-2 sm:p-8" data-reveal>
          {facts.map(([k, v]) => (
            <div key={k} className={k === "How AI was used" || k === "My contribution" ? "sm:col-span-2" : ""}>
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{v}</dd>
            </div>
          ))}
        </dl>

        {p.cover && !p.gallery && (
          <Image src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} priority className="mx-auto w-full max-w-2xl rounded-[2rem] border border-line shadow-[var(--shadow)]" />
        )}

        {p.sections.slice(0, p.introSections ?? 2).map((s) => (<CaseBlock key={s.heading} s={s} />))}

        {p.flow && (
          <section aria-label="Architecture and workflow">
            <h2 className="mb-5 text-2xl font-semibold tracking-tight">{p.slug === "mane-oggarane" ? "Architecture" : "Workflow"}</h2>
            <FlowDiagram flow={p.flow} />
          </section>
        )}

        {p.gallery && (
          <section aria-labelledby="shots">
            <h2 id="shots" className="mb-5 text-2xl font-semibold tracking-tight">Screenshots</h2>
            <Gallery shots={p.gallery} />
          </section>
        )}

        {p.sections.slice(p.introSections ?? 2).map((s) => (<CaseBlock key={s.heading} s={s} />))}

        <nav aria-label="Next case study" className="border-t border-line pt-10">
          <p className="eyebrow mb-4">Next case study</p>
          <div className="max-w-md"><ProjectCard p={next} /></div>
        </nav>
      </div>
    </article>
  );
}

function CaseBlock({ s }: { s: { heading: string; body?: string; bullets?: string[] } }) {
  return (
    <section className="prose-case" data-reveal>
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">{s.heading}</h2>
      {s.body?.split("\n\n").map((para) => (<p key={para.slice(0, 30)}>{para}</p>))}
      {s.bullets && (
        <ul className="grid gap-2.5">
          {s.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-[15.5px] leading-relaxed text-ink-2"><Icon name="check" className="mt-1 size-4 shrink-0 text-ink" />{b}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
