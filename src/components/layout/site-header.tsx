import Link from "next/link";
import { BreadIcon } from "@phosphor-icons/react/dist/ssr/Bread";
import { ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { ShoppingCartIcon } from "@phosphor-icons/react/dist/ssr/ShoppingCart";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import styles from "./site-header.module.scss";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="#home">
          <span className={styles.brandMark}>
            <BreadIcon aria-hidden="true" size={26} weight="fill" />
          </span>
          <span className={styles.brandCopy}>
            <span className={styles.brandName}>BÁNH MÌ</span>
            <span className={styles.brandSubtitle}>STATION</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className={styles.nav}>
          {siteConfig.navigation.map((item) => (
            <Link
              className={styles.navLink}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <Link
            aria-label="Shopping cart with 2 items"
            className={styles.cart}
            href="#builder"
          >
            <ShoppingCartIcon size={23} weight="bold" />
            <span className={styles.cartCount}>
              2
            </span>
          </Link>
          <Link className={cn(buttonVariants(), styles.order)} href="#menu">
            Order now
          </Link>
          <button
            aria-label="Open navigation"
            className={styles.menu}
            type="button"
          >
            <ListIcon size={22} weight="bold" />
          </button>
        </div>
      </div>
    </header>
  );
}
