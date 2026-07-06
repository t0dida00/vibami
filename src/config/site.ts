export const siteConfig = {
  name: "Bánh Mì Station",
  description:
    "Fresh Vietnamese bánh mì, made daily and built your way with bold, authentic flavor.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Menu", href: "#menu" },
    { label: "Build Your Bánh Mì", href: "#builder" },
    { label: "Combos", href: "#combos" },
    { label: "About", href: "#about" },
  ],
} as const;
