import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-sm text-muted-foreground">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">That page wandered off.</h1>
        <p className="mt-4 text-muted-foreground">The foundation is here; this route is not.</p>
        <Link className={`${buttonVariants()} mt-8`} href="/">
          Back home
        </Link>
      </div>
    </main>
  );
}
