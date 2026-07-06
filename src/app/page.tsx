import { FoundationGrid } from "@/features/home/components/foundation-grid";
import { HeroSection } from "@/features/home/components/hero-section";
import { StackStrip } from "@/features/home/components/stack-strip";
import { StructureSection } from "@/features/home/components/structure-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StackStrip />
      <FoundationGrid />
      <StructureSection />
      <footer className="px-6 py-10 text-center text-sm text-muted-foreground">
        Built to be changed—not merely admired.
      </footer>
    </main>
  );
}
