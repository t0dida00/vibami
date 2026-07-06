# Vibami

A production-minded Next.js foundation using TypeScript, SCSS Modules, Magic UI,
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

- Shared and feature components own their styles through colocated `.module.scss`
  files, with global tokens under `src/styles`.
- Server components import Phosphor icons from `@phosphor-icons/react/dist/ssr`
  to avoid React context and hydration conflicts.
- The source-owned Magic UI component has been converted to a colocated SCSS Module.
- Marketing pages are statically prerendered as complete HTML. This keeps the SEO
  benefits of server rendering without adding per-request server latency.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```
