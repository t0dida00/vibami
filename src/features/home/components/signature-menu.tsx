import Link from "next/link";

import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { signatureItems } from "@/features/home/data/menu";

import { SectionHeading } from "./section-heading";
import styles from "./signature-menu.module.scss";

export function SignatureMenu() {
  return (
    <section className={styles.section} id="menu">
      <div className={styles.inner}>
        <SectionHeading
          action={
            <Link
              className={styles.viewAll}
              href="#menu"
            >
              View all menu
            </Link>
          }
          description="Tried and loved by our customers."
          title="Signature Bánh Mì"
        />
        <div className={styles.grid}>
          {signatureItems.map((item, index) => (
            <article
              className={styles.card}
              key={item.name}
            >
              <div className={styles.imageWrap}>
                <ImagePlaceholder className={styles.image} label={item.name} />
                <span className={styles.number}>
                  {index + 1}
                </span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.description}>{item.description}</p>
                <p className={styles.price}>{item.price}</p>
                <button className={styles.customize} type="button">
                  Customize
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
