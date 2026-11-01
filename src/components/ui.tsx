import Link from "next/link";
import type { ProjectStatus, SkillLevel } from "@/content/types";
import { levelLabel } from "@/content/skills";
import { Icon } from "./Icon";

export const statusMeta: Record<ProjectStatus, { label: string; cls: string }> = {
  "live-demo": { label: "Live demo", cls: "text-info border-info/40 bg-info/10" },
  live: { label: "Live", cls: "text-good border-good/40 bg-good/10" },
  experiment: { label: "Experiment", cls: "text-accent-2 border-accent-2/40 bg-accent-2/10" },
  "in-progress": { label: "In progress", cls: "text-warn border-warn/40 bg-warn/10" },
  planned: { label: "Planned", cls: "text-muted border-line-strong" },
  completed: { label: "Completed", cls: "text-good border-good/40 bg-good/10" },
};

export function StatusBadge({ status, note }: { status: ProjectStatus; note?: string }) {
  const m = statusMeta[status];
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11.5px] font-semibold ${m.cls}`}>
        <span className="size-1.5 rounded-full bg-current" aria-hidden />
        {m.label}
      </span>
      {note && <span className="text-xs text-muted">{note}</span>}
    </span>
  );
}

const levelCls: Record<SkillLevel, string> = {
  professional: "bg-accent",
  applied: "bg-accent-2",
  working: "bg-muted",
  learning: "bg-warn",
};

export function LevelDot({ level }: { level: SkillLevel }) {
  return <span className={`inline-block size-2 shrink-0 rounded-full ${levelCls[level]}`} aria-hidden />;
}

export function LevelLegend() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-2" aria-label="Skill level legend">
      {(Object.keys(levelLabel) as SkillLevel[]).map((l) => (
        <li key={l} className="inline-flex items-center gap-2">
          <LevelDot level={l} />
          {levelLabel[l]}
        </li>
      ))}
    </ul>
  );
}

/** Classic centred section title: a small line ("Get To Know More") above a big title. */
export function SectionHead({ eyebrow, title, intro, id, align = "center" }: { eyebrow: string; title: React.ReactNode; intro?: React.ReactNode; id?: string; align?: "center" | "left" }) {
  const c = align === "center";
  return (
    <header className={`mb-12 max-w-3xl ${c ? "mx-auto text-center" : ""}`} data-reveal>
      <p className="kicker">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-[2.1rem] leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      <span className={`title-bar ${c ? "" : "!ml-0"}`} aria-hidden />
      {intro && <p className="mt-5 text-[16.5px] leading-relaxed text-ink-2 text-pretty">{intro}</p>}
    </header>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-line bg-bg px-2.5 py-0.5 text-xs text-ink-2 transition-colors hover:border-ink hover:text-ink">{children}</span>;
}

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  download?: boolean;
  className?: string;
};
/** Pill buttons from the original site, with a sweep-fill hover. */
export function Button({ href, children, variant = "ghost", external, download, className = "" }: BtnProps) {
  const cls = `btn ${variant === "primary" ? "btn-solid" : "btn-outline"} ${className}`;
  if (external || download)
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...(download ? { download: "" } : {})}>
        {children}
        {external && <Icon name="arrow-up-right" className="size-3.5" />}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
