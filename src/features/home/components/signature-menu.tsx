"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCartIcon } from "@phosphor-icons/react/dist/csr/ShoppingCart";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";

import signatureItems from "@/features/home/data/signature-items.json";
import signatureIngredients from "@/features/home/data/signature-ingredients.json";

import type { BuilderSelections } from "./banh-mi-builder";
import { SectionHeading } from "./section-heading";
import styles from "./signature-menu.module.scss";

type SignatureItem = (typeof signatureItems)[number];

type SignatureMenuProps = {
  onAddToCart?: (item: { id: string; ingredients?: string[]; name: string; price: number }) => void;
  onBuildBanhMi?: (selections: BuilderSelections) => void;
};

function getPresetIngredients(preset: (typeof signatureIngredients)[keyof typeof signatureIngredients] | null) {
  if (!preset) {
    return [];
  }

  const { builder } = preset;

  return [
    builder.bread,
    builder.protein,
    ...builder.toppings,
    builder.sauce,
  ];
}

export function SignatureMenu({ onAddToCart, onBuildBanhMi }: SignatureMenuProps) {
  const [selectedItem, setSelectedItem] = useState<SignatureItem | null>(null);
  const selectedPreset = selectedItem
    ? signatureIngredients[selectedItem.name as keyof typeof signatureIngredients]
    : null;
  const selectedIngredients = getPresetIngredients(selectedPreset);

  function buildSelectedBanhMi() {
    if (!selectedPreset) {
      return;
    }

    const { builder } = selectedPreset;
    onBuildBanhMi?.({
      0: builder.size,
      1: builder.protein,
      2: builder.sauce,
      3: builder.toppings,
      4: builder.spiceLevel,
    });
    setSelectedItem(null);
    document.getElementById("builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function addSignatureItem(item: SignatureItem) {
    const preset = signatureIngredients[item.name as keyof typeof signatureIngredients];

    onAddToCart?.({
      id: `signature-${item.name.toLowerCase()}`,
      ingredients: getPresetIngredients(preset),
      name: item.name,
      price: Number(item.price.replace(/[^0-9.]/g, "")),
    });
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
                <Image
                  alt={item.name}
                  className={styles.menuImage}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  src={item.image}
                />
                <span className={styles.number}>
                  {index + 1}
                </span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.description}>{item.description}</p>
                {/* <p className={styles.price}>{item.price}</p> */}
                <div className={styles.cardActions}>
                  <button className={styles.orderNow} onClick={() => addSignatureItem(item)} type="button">
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
            <div className={styles.modalImage}>
              <Image
                alt={selectedItem.name}
                className={styles.menuImage}
                fill
                sizes="min(100vw, 430px)"
                src={selectedItem.image}
              />
            </div>
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
