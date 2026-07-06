import { BanhMiBuilder } from "@/features/home/components/banh-mi-builder";
import { ComboSection } from "@/features/home/components/combo-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { SignatureMenu } from "@/features/home/components/signature-menu";
import { ValuesFooter } from "@/features/home/components/values-footer";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SignatureMenu />
      <BanhMiBuilder />
      <ComboSection />
      <ValuesFooter />
    </main>
  );
}
