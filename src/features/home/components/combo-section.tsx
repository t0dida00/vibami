import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { ShoppingCartIcon } from "@phosphor-icons/react/dist/ssr/ShoppingCart";

import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { comboItems } from "@/features/home/data/menu";

import { SectionHeading } from "./section-heading";
import styles from "./combo-section.module.scss";

export function ComboSection() {
  return (
    <section className={styles.section} id="combos">
      <div className={styles.inner}>
        <SectionHeading description="Add a drink and a side to complete your meal." title="Make It a Combo" />
        <div className={styles.grid}>
          {comboItems.map((item) => (
            <article className={styles.item} key={item.name}>
              <ImagePlaceholder className={styles.image} label={item.name} />
              <div>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.price}>{item.price}</p>
              </div>
              <button aria-label={`Add ${item.name}`} className={styles.plus} type="button">
                <PlusIcon size={15} weight="bold" />
              </button>
            </article>
          ))}
          <article className={styles.deal}>
            <div className={styles.dealParts}>
              <span>Drink</span>
              <PlusIcon size={15} weight="bold" />
              <span>Side</span>
            </div>
            <p className={styles.dealLabel}>Add combo to cart</p>
            <button className={styles.dealPrice} type="button">
              <ShoppingCartIcon size={19} weight="bold" /> €3.50
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
