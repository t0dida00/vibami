import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { BreadIcon } from "@phosphor-icons/react/dist/ssr/Bread";
import { LeafIcon } from "@phosphor-icons/react/dist/ssr/Leaf";
import { PepperIcon } from "@phosphor-icons/react/dist/ssr/Pepper";

import { buttonVariants } from "@/components/ui/button";

import styles from "./hero-section.module.scss";

const highlights = [
  { label: "Fresh ingredients", icon: LeafIcon },
  { label: "Baked daily", icon: BreadIcon },
  { label: "Bold flavor", icon: PepperIcon },
];

export function HeroSection() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Fresh<span className={styles.titleSpace}> </span><br className={styles.mobileBreak} />Vietnamese
            <br />
            Bánh Mì,
            <br />
            <span className={styles.titleAccent}>Built your way</span>
          </h1>
          <p className={styles.description}>
            Choose your bread, protein, sauce, toppings, and spice level—fast, fresh,
            and full of Vietnamese flavor.
          </p>
          <div className={styles.actions}>
            <Link className={`${buttonVariants()} ${styles.button}`} href="#menu">
              Order now
              <ArrowRightIcon
                className={styles.buttonIcon}
                size={17}
                weight="bold"
              />
            </Link>
            <Link
              className={`${buttonVariants({ variant: "outline" })} ${styles.button}`}
              href="#builder"
            >
              Build your bánh mì
            </Link>
          </div>
          <div className={styles.highlights}>
            {highlights.map(({ label, icon: Icon }) => (
              <span
                className={styles.highlight}
                key={label}
              >
                <Icon className={styles.highlightIcon} size={22} weight="duotone" />
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.visual}>
          {/* <div className={styles.placeholder}>
            
          </div> */}
          <Image
              alt="Fresh bánh mì with Vietnamese ingredients"
              className={styles.photo}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              src="/images/hero-photography.svg"
            />
          {/* <div className={styles.stamp}>
            Made with love
            <br />
            from Vietnam
          </div> */}
        </div>
      </div>
    </section>
  );
}
