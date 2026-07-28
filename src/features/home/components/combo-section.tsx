"use client";

import Image from "next/image";
import { PlusIcon } from "@phosphor-icons/react/dist/csr/Plus";
import { ShoppingCartIcon } from "@phosphor-icons/react/dist/csr/ShoppingCart";

import { comboItems } from "@/features/home/data/menu";

import { SectionHeading } from "./section-heading";
import styles from "./combo-section.module.scss";

type ComboSectionProps = {
  onAddToCart?: (item: { id: string; ingredients?: string[]; name: string; price: number }) => void;
};

export function ComboSection({ onAddToCart }: ComboSectionProps) {
  function addComboItem(item: (typeof comboItems)[number]) {
    onAddToCart?.({
      id: `combo-${item.name.toLowerCase()}`,
      name: item.name,
      price: Number(item.price.replace(/[^0-9.]/g, "")),
    });
  }

  function addMealCombo() {
    onAddToCart?.({
      id: "combo-drink-side",
      name: "Drink and Side Combo",
      price: 3.5,
    });
  }

  return (
    <section className={styles.section} id="combos">
      <div className={styles.inner}>
        <SectionHeading description="Add a drink and a side to complete your meal." title="Make It a Combo" />
        <div className={styles.grid}>
          {comboItems.map((item) => (
            <article className={styles.item} key={item.name}>
              <div className={styles.image}>
                <Image
                  alt={item.name}
                  className={styles.artwork}
                  fill
                  sizes="80px"
                  src={item.image}
                />
              </div>
              <div>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.price}>{item.price}</p>
              </div>
              <button
                aria-label={`Add ${item.name}`}
                className={styles.plus}
                onClick={() => addComboItem(item)}
                type="button"
              >
                <PlusIcon size={15} weight="bold" />
              </button>
            </article>
          ))}
          <button aria-label="Add drink and side combo to cart" className={styles.deal} onClick={addMealCombo} type="button">
            <div className={styles.dealParts}>
              <span>Drink</span>
              <PlusIcon size={15} weight="bold" />
              <span>Side</span>
            </div>
            <p className={styles.dealLabel}>Add combo to cart</p>
            <span className={styles.dealPrice}>
              <ShoppingCartIcon size={19} weight="bold" /> €3.50
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
