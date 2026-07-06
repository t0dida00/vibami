import {
  FoldersIcon,
  LightningIcon,
  StackIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

const foundations: Array<{
  title: string;
  description: string;
  icon: Icon;
  label: string;
}> = [
  {
    title: "Domain-first features",
    description:
      "Product logic stays close to the feature that owns it, while truly shared pieces remain reusable.",
    icon: FoldersIcon,
    label: "Scalable",
  },
  {
    title: "Server-safe by default",
    description:
      "App Router server components and Phosphor's SSR exports avoid context and hydration collisions.",
    icon: StackIcon,
    label: "Compatible",
  },
  {
    title: "Source-owned UI",
    description:
      "Magic UI follows the registry model: components live in the repository and evolve with the product.",
    icon: LightningIcon,
    label: "Maintainable",
  },
];

export function FoundationGrid() {
  return (
    <section className="px-6 py-20 sm:py-28" id="foundation">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">
            Strong defaults
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
            Enough structure to scale. No ceremony for ceremony’s sake.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {foundations.map(({ title, description, icon: IconComponent, label }) => (
            <article
              className="group rounded-3xl border border-foreground/10 bg-white/55 p-7 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition hover:-translate-y-1 hover:bg-white/80 hover:shadow-xl hover:shadow-black/5"
              key={title}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-2xl bg-foreground text-background">
                  <IconComponent aria-hidden="true" size={22} weight="duotone" />
                </span>
                <span className="rounded-full bg-lime-100 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-lime-800">
                  {label}
                </span>
              </div>
              <h3 className="mt-10 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
