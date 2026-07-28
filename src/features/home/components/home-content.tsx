"use client";

import { useState } from "react";

import { ComboSection } from "@/features/home/components/combo-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { SignatureMenu } from "@/features/home/components/signature-menu";
import { ValuesFooter } from "@/features/home/components/values-footer";

import { BanhMiBuilder, type BuilderSelections } from "./banh-mi-builder";

export function HomeContent() {
  const [presetKey, setPresetKey] = useState(0);
  const [presetSelections, setPresetSelections] = useState<BuilderSelections | null>(null);

  function applyBanhMiPreset(selections: BuilderSelections) {
    setPresetSelections(selections);
    setPresetKey((currentKey) => currentKey + 1);
  }

  return (
    <main>
      <HeroSection />
      <SignatureMenu onBuildBanhMi={applyBanhMiPreset} />
      <BanhMiBuilder key={presetKey} presetSelections={presetSelections} />
      <ComboSection />
      <ValuesFooter />
    </main>
  );
}
