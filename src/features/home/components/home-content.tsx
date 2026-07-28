"use client";

import { useState } from "react";

import { ComboSection } from "@/features/home/components/combo-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { SignatureMenu } from "@/features/home/components/signature-menu";
import { ValuesFooter } from "@/features/home/components/values-footer";

import { BanhMiBuilder, type BuilderSelections } from "./banh-mi-builder";
import { useCart } from "./cart-context";

export function HomeContent() {
  const { addCartItem } = useCart();
  const [presetKey, setPresetKey] = useState(0);
  const [presetSelections, setPresetSelections] = useState<BuilderSelections | null>(null);

  function applyBanhMiPreset(selections: BuilderSelections) {
    setPresetSelections(selections);
    setPresetKey((currentKey) => currentKey + 1);
  }

  return (
    <main>
      <HeroSection />
      <SignatureMenu onAddToCart={addCartItem} onBuildBanhMi={applyBanhMiPreset} />
      <BanhMiBuilder key={presetKey} onAddToCart={addCartItem} presetSelections={presetSelections} />
      <ComboSection onAddToCart={addCartItem} />
      <ValuesFooter />
    </main>
  );
}
