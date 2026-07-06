const folders = [
  ["app/", "Routes, layouts, metadata, and global styles"],
  ["features/", "Domain modules and feature-owned components"],
  ["components/", "Shared layout, UI, and registry components"],
  ["config/", "Typed application-wide configuration"],
  ["lib/", "Framework-agnostic helpers and integrations"],
] as const;

export function StructureSection() {
  return (
    <section className="px-6 py-20 sm:py-28" id="structure">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-[#181915] text-white lg:grid-cols-[0.9fr_1.1fr]">
        <div className="p-8 sm:p-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-lime-300">
            Clear ownership
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Know where the next file belongs.
          </h2>
          <p className="mt-5 max-w-md leading-7 text-white/60">
            The structure grows by product domain instead of becoming one endless components folder.
          </p>
        </div>
        <div className="border-t border-white/10 bg-white/[0.035] p-6 sm:p-10 lg:border-l lg:border-t-0">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 font-mono text-sm">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-amber-300" />
              <span className="size-2.5 rounded-full bg-lime-300" />
              <span className="ml-2 text-xs text-white/40">src</span>
            </div>
            <div className="divide-y divide-white/8">
              {folders.map(([folder, purpose]) => (
                <div className="grid gap-1 px-5 py-4 sm:grid-cols-[110px_1fr]" key={folder}>
                  <span className="text-lime-300">{folder}</span>
                  <span className="text-xs leading-5 text-white/45">{purpose}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
