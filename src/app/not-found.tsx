import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-3xl place-content-center px-5 py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page doesn&apos;t exist</h1>
      <p className="mt-3 text-ink-2">It may have moved during the portfolio upgrade.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/" variant="primary">Go home</Button>
        <Button href="/#projects">See projects</Button>
      </div>
    </section>
  );
}
