"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { Icon } from "./Icon";
import type { Shot } from "@/content/types";

/* ───────────── Theme toggle (light default, remembers choice) ───────────── */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      className="grid size-10 place-items-center rounded-full border-[1.5px] border-line-strong text-ink transition duration-500 hover:rotate-[360deg] hover:bg-accent hover:text-accent-ink"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} />
    </button>
  );
}

/* ───────────── Hamburger menu (the original site's 3-line icon, animated into an X) ───────────── */
export function MobileNav({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const bar = "absolute left-0 h-[2px] w-full rounded bg-ink transition-all duration-300";
  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative grid size-10 place-items-center"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className="relative block h-[18px] w-[26px]" aria-hidden>
          <span className={`${bar} ${open ? "top-2 rotate-45" : "top-0"}`} />
          <span className={`${bar} top-2 ${open ? "scale-x-0 opacity-0" : ""}`} />
          <span className={`${bar} ${open ? "top-2 -rotate-45" : "top-4"}`} />
        </span>
      </button>
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={`glass absolute inset-x-4 top-[calc(100%+8px)] origin-top rounded-[2rem] p-4 shadow-[var(--shadow)] transition-all duration-300 ${
          open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
        }`}
      >
        <ul className="grid gap-1 text-center">
          {items.map((i, n) => (
            <li
              key={i.href}
              className="transition-all duration-500"
              style={{ transitionDelay: open ? `${n * 45}ms` : "0ms", opacity: open ? 1 : 0, transform: open ? "none" : "translateY(-8px)" }}
            >
              <Link href={i.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="block rounded-full px-3 py-2.5 text-lg text-ink transition hover:bg-bg-2">
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

/* ───────────── Typewriter for the hero role line ───────────── */
export function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0;
    let i = words[0].length;
    let deleting = true;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[w];
      i += deleting ? -1 : 1;
      setText(word.slice(0, i));
      let delay = deleting ? 35 : 75;
      if (!deleting && i === word.length) {
        deleting = true;
        delay = 2200;
      } else if (deleting && i === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        delay = 350;
      }
      t = setTimeout(tick, delay);
    };
    t = setTimeout(tick, 2600);
    return () => clearTimeout(t);
  }, [words]);
  return (
    <span>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden>
        {text}
        <span className="caret" />
      </span>
    </span>
  );
}

/* ───────────── Site-wide motion: reveals, stagger, progress, active nav, count-up, tilt, back-to-top ───────────── */
export function Enhancements() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Count numbers up from 0 (e.g. "10+")
    const countUp = (el: HTMLElement) => {
      const raw = el.dataset.count!;
      const n = parseFloat(raw);
      const suffix = raw.replace(/^[\d.]+/, "");
      if (reduced || !n) return;
      const t0 = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          if (el.hasAttribute("data-stagger")) {
            Array.from(el.children).forEach((c, i) => {
              const ch = c as HTMLElement;
              ch.style.transitionDelay = `${i * 90}ms`;
              // clear the delay afterwards so hover effects respond instantly
              setTimeout(() => (ch.style.transitionDelay = ""), 900 + i * 90);
            });
          }
          el.classList.add("in");
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
          if (el.dataset.count) countUp(el);
          io.unobserve(el);
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    const scan = () =>
      document.querySelectorAll("[data-reveal]:not(.in), [data-stagger]:not(.in), .timeline:not(.in), [data-count]:not(.counted)").forEach((el) => {
        el.classList.add("counted");
        io.observe(el);
      });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    // Header state + scroll progress
    const links = document.querySelectorAll<HTMLElement>("[data-nav]");
    const header = document.getElementById("site-header");
    const bar = document.querySelector<HTMLElement>(".scroll-progress");
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar?.style.setProperty("--p", String(max > 0 ? y / max : 0));
        header?.setAttribute("data-scrolled", String(y > 20));
        if (y < 200) links.forEach((l) => l.setAttribute("aria-current", "false"));
        setShow(y > 700);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Highlight the nav link for the section in view
    const spy = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((l) => l.setAttribute("aria-current", String(l.dataset.nav === e.target.id)));
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const s = l.dataset.nav && document.getElementById(l.dataset.nav);
      if (s) spy.observe(s);
    });

    // 3D tilt + light spot on cards (mouse only)
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
      if (!card) return;
      const inner = card.firstElementChild as HTMLElement;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      inner.style.transform = `rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 9}deg) translateY(-6px)`;
      inner.style.setProperty("--mx", `${x * 100}%`);
      inner.style.setProperty("--my", `${y * 100}%`);
    };
    const onOut = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
      if (card && !card.contains(e.relatedTarget as Node)) (card.firstElementChild as HTMLElement).style.transform = "";
    };
    if (fine && !reduced) {
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerout", onOut);
    }

    return () => {
      io.disconnect();
      mo.disconnect();
      spy.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      className={`btn btn-solid fixed right-5 bottom-5 z-40 !size-12 !p-0 transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
      tabIndex={show ? 0 : -1}
    >
      <Icon name="arrow-up" />
    </button>
  );
}

/* ───────────── Copy-to-clipboard ───────────── */
export function CopyButton({ text, label = "Copy email" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      window.prompt("Copy this:", text);
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="btn btn-outline !px-3.5 !py-1.5 text-[13px]"
    >
      <Icon name={done ? "check" : "copy"} className="size-4" />
      <span aria-live="polite">{done ? "Copied!" : label}</span>
    </button>
  );
}

/* ───────────── Project filter (animated) ───────────── */
export function ProjectFilter({ categories, children }: { categories: string[]; children: React.ReactNode }) {
  const [active, setActive] = useState("All");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelectorAll<HTMLElement>("[data-cats]").forEach((el) => {
      const show = active === "All" || el.dataset.cats!.split("|").includes(active);
      el.style.display = show ? "" : "none";
      if (show) el.animate?.([{ opacity: 0, transform: "scale(.98)" }, { opacity: 1, transform: "none" }], { duration: 260, easing: "ease-out" });
    });
  }, [active]);
  return (
    <>
      <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap justify-center gap-2" data-reveal>
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`rounded-full border-[1.5px] px-4 py-1.5 text-sm font-medium transition duration-300 ${
              active === c ? "scale-105 border-ink bg-ink text-bg shadow-[var(--shadow)]" : "border-line-strong text-ink-2 hover:-translate-y-0.5 hover:border-ink hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div ref={ref} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-stagger>
        {children}
      </div>
    </>
  );
}

/* ───────────── Screenshot gallery with keyboard lightbox ───────────── */
export function Gallery({ shots }: { shots: Shot[] }) {
  const [i, setI] = useState<number | null>(null);
  const close = useCallback(() => setI(null), []);
  useEffect(() => {
    if (i === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setI((n) => ((n ?? 0) + 1) % shots.length);
      if (e.key === "ArrowLeft") setI((n) => ((n ?? 0) - 1 + shots.length) % shots.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [i, shots.length, close]);
  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {shots.map((s, n) => (
          <li key={s.src + n}>
            <button type="button" onClick={() => setI(n)} className="group block w-full overflow-hidden rounded-[1.5rem] border border-line text-left">
              <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(min-width: 640px) 50vw, 100vw" className="aspect-[16/9] w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
              <span className="sr-only">Open larger image</span>
            </button>
            {s.caption && <p className="mt-2 text-sm text-muted">{s.caption}</p>}
          </li>
        ))}
      </ul>
      {i !== null && (
        <div role="dialog" aria-modal="true" aria-label={shots[i].alt} className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4 backdrop-blur" onClick={close}>
          <figure className="max-h-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image src={shots[i].src} alt={shots[i].alt} width={shots[i].width} height={shots[i].height} className="max-h-[80vh] w-auto rounded-xl" />
            <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm text-white/80">
              <span>{shots[i].caption}</span>
              <span className="flex gap-2">
                <button type="button" className="rounded-lg border border-white/30 px-3 py-1" onClick={() => setI((i - 1 + shots.length) % shots.length)} aria-label="Previous image">←</button>
                <button type="button" className="rounded-lg border border-white/30 px-3 py-1" onClick={() => setI((i + 1) % shots.length)} aria-label="Next image">→</button>
                <button type="button" autoFocus className="rounded-lg border border-white/30 px-3 py-1" onClick={close}>Close</button>
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

/* ───────────── Contact form (Netlify Forms, AJAX) ───────────── */
export function ContactForm({ formName }: { formName: string }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("ok");
      e.currentTarget?.reset?.();
    } catch {
      setState("error");
    }
  };
  const field = "w-full rounded-2xl border-[1.5px] border-line bg-bg px-4 py-3 text-[15px] text-ink transition placeholder:text-muted hover:border-line-strong focus:border-ink focus:shadow-[0_0_0_4px_var(--glow)] focus:outline-none";
  if (state === "ok")
    return (
      <div className="glass rounded-[2rem] p-7 text-center" role="status">
        <p className="flex items-center justify-center gap-2 font-semibold text-good"><Icon name="check" /> Message sent, thank you.</p>
        <p className="mt-2 text-ink-2">I&apos;ll get back to you as soon as I can.</p>
      </div>
    );
  return (
    <form name={formName} method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="glass grid gap-4 rounded-[2rem] p-6 sm:p-8">
      <input type="hidden" name="form-name" value={formName} />
      <p className="hidden"><label>Don&apos;t fill this out: <input name="bot-field" /></label></p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm text-ink-2">Name<input required name="name" autoComplete="name" className={field} placeholder="Your name" /></label>
        <label className="grid gap-1.5 text-sm text-ink-2">Email<input required type="email" name="email" autoComplete="email" className={field} placeholder="you@company.com" /></label>
      </div>
      <label className="grid gap-1.5 text-sm text-ink-2">Company / role (optional)<input name="company" className={field} placeholder="e.g. Payments Ops Analyst at …" /></label>
      <label className="grid gap-1.5 text-sm text-ink-2">Message<textarea required name="message" rows={5} className={field} placeholder="What would you like to talk about?" /></label>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={state === "sending"} className="btn btn-solid disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Send message"} <Icon name="arrow-right" />
        </button>
        {state === "error" && (
          <p role="alert" className="text-sm text-warn">Couldn&apos;t send right now. Please email me directly instead.</p>
        )}
      </div>
    </form>
  );
}

/**
 * Hero reel in the round frame: plays muted on loop (browsers only autoplay muted video),
 * with a small button to turn sound on. The photo is the poster while it loads, and stays
 * as a still image for visitors who prefer reduced motion.
 */
export function HeroVideo({ src, poster, label, className = "" }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setStill(mq.matches);
      const v = ref.current;
      if (!v) return;
      if (mq.matches) v.pause();
      else v.play().catch(() => {});
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  };

  return (
    <>
      <video
        ref={ref}
        className={className}
        src={src}
        poster={poster}
        autoPlay={!still}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Turn video sound on" : "Turn video sound off"}
        aria-pressed={!muted}
        className="glass absolute right-[12%] bottom-[8%] z-10 grid size-10 place-items-center rounded-full text-base shadow-[var(--shadow)] transition-transform hover:scale-110"
      >
        <span aria-hidden>{muted ? "🔇" : "🔊"}</span>
      </button>
    </>
  );
}
