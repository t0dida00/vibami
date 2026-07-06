const stack = ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Magic UI", "Phosphor Icons"];

export function StackStrip() {
  return (
    <section className="border-y border-foreground/8 py-8" id="stack">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6">
        {stack.map((item) => (
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground" key={item}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
