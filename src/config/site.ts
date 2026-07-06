export const siteConfig = {
  name: "Vibami",
  description: "A scalable Next.js foundation for thoughtful digital products.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  navigation: [
    { label: "Foundation", href: "#foundation" },
    { label: "Structure", href: "#structure" },
    { label: "Stack", href: "#stack" },
  ],
} as const;
