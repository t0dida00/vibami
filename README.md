# Vibami

A production-minded Next.js foundation using TypeScript, Tailwind CSS, Magic UI,
and Phosphor Icons.

## Start locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Before deploying, copy `.env.example` to the appropriate environment file and
set `NEXT_PUBLIC_SITE_URL` to the real public origin. Canonical URLs, Open Graph,
robots.txt, and sitemap.xml are generated from it.

## Project structure

```text
src/
├── app/          # Routes, layouts, metadata, and global styles
├── components/   # Shared layout and UI building blocks
├── config/       # Typed app-wide configuration
├── features/     # Product domains and feature-owned code
└── lib/          # Framework-agnostic utilities and integrations
```

Keep code inside a feature until at least two domains need it. Move it into
`components`, `lib`, or `config` only when it is genuinely shared.

## Integration notes

- Magic UI uses the shadcn registry model: its component source is owned by this
  repository under `src/components/ui`.
- Server components import Phosphor icons from `@phosphor-icons/react/dist/ssr`
  to avoid React context and hydration conflicts.
- Tailwind CSS v4 animation tokens for Magic UI live in `src/app/globals.css`.
- Marketing pages are statically prerendered as complete HTML. This keeps the SEO
  benefits of server rendering without adding per-request server latency.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```
