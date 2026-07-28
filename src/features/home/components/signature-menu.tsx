"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCartIcon } from "@phosphor-icons/react/dist/csr/ShoppingCart";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";

import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { signatureItems } from "@/features/home/data/menu";
import signatureIngredients from "@/features/home/data/signature-ingredients.json";

import type { BuilderSelections } from "./banh-mi-builder";
import { SectionHeading } from "./section-heading";
import styles from "./signature-menu.module.scss";

type SignatureItem = (typeof signatureItems)[number];

type SignatureMenuProps = {
  onBuildBanhMi?: (selections: BuilderSelections) => void;
};

export function SignatureMenu({ onBuildBanhMi }: SignatureMenuProps) {
  const [selectedItem, setSelectedItem] = useState<SignatureItem | null>(null);
  const selectedPreset = selectedItem
    ? signatureIngredients[selectedItem.name as keyof typeof signatureIngredients]
    : null;
  const selectedIngredients = selectedPreset?.ingredients ?? [];

  function buildSelectedBanhMi() {
    if (!selectedPreset) {
      return;
    }

    const { builder } = selectedPreset;
    onBuildBanhMi?.({
      0: builder.bread,
      1: builder.size,
      2: builder.protein,
      3: builder.sauce,
      4: builder.toppings,
      5: builder.spiceLevel,
    });
    setSelectedItem(null);
    document.getElementById("builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
                {/* <p className={styles.price}>{item.price}</p> */}
                <div className={styles.cardActions}>
                  <button className={styles.orderNow} type="button">
                    <ShoppingCartIcon size={15} weight="bold" />
                    Order now
                  </button>
                  <button
                    className={styles.customize}
                    onClick={() => setSelectedItem(item)}
                    type="button"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {selectedItem ? (
        <div
          aria-labelledby="signature-ingredients-title"
          aria-modal="true"
          className={styles.modalOverlay}
          onClick={() => setSelectedItem(null)}
          role="dialog"
        >
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <button
              aria-label="Close ingredient details"
              className={styles.close}
              onClick={() => setSelectedItem(null)}
              type="button"
            >
              <XIcon size={18} weight="bold" />
            </button>
        
            <h3 className={styles.modalTitle} id="signature-ingredients-title">
              {selectedItem.name}
            </h3>
            <ImagePlaceholder className={styles.modalImage} label={selectedItem.name} />
            <div className={styles.ingredients}>
              {selectedIngredients.map((ingredient) => (
                <span className={styles.ingredient} key={ingredient}>
                  {ingredient}
                </span>
              ))}
            </div>
            <button
              className={styles.modalAction}
              onClick={buildSelectedBanhMi}
              type="button"
            >
              Build your bánh mì
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
