import Link from "next/link";
import { CubeIcon } from "@phosphor-icons/react/dist/ssr/Cube";

import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/8 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link className="flex items-center gap-2 font-semibold tracking-tight" href="/">
          <span className="grid size-8 place-items-center rounded-xl bg-foreground text-background">
            <CubeIcon aria-hidden="true" size={18} weight="duotone" />
          </span>
          {siteConfig.name}
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 sm:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
