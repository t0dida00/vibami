import Link from "next/link";
import { ArrowRightIcon, CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-24 pt-20 sm:pb-32 sm:pt-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 mx-auto h-[520px] max-w-5xl bg-[radial-gradient(circle_at_50%_20%,rgba(190,242,100,0.34),transparent_55%)]"
      />
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/60 px-3.5 py-2 text-xs font-medium shadow-sm backdrop-blur">
          <CheckCircleIcon className="text-lime-600" size={16} weight="fill" />
          Production-ready foundation
        </div>
        <h1 className="text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
          Build the product. Keep the codebase{" "}
          <AnimatedGradientText colorFrom="#65a30d" colorTo="#0891b2" speed={0.75}>
            calm.
          </AnimatedGradientText>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
          A deliberate Next.js starter with domain-first organization, server-safe icons,
          and source-owned Magic UI components.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link className={cn(buttonVariants(), "group")} href="#foundation">
            Explore the foundation
            <ArrowRightIcon
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
              size={17}
            />
          </Link>
          <Link className={buttonVariants({ variant: "outline" })} href="#structure">
            View structure
          </Link>
        </div>
      </div>
    </section>
  );
}
