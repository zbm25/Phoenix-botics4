import React from "react";
import { Header } from "../Header";
import { Hero } from "../Hero";
import { PreviewRobotsCatalogSection } from "./PreviewRobotsCatalogSection";
import { IndustriesSection } from "../IndustriesSection";
import { PreviewRobotInActionSection } from "./PreviewRobotInActionSection";
import { PreviewLogoSliderSection } from "./PreviewLogoSliderSection";
import { ServicesKargoSection } from "../ServicesKargoSection";
import { ProcessSection } from "../ProcessSection";
import { FinalContactSection } from "../FinalContactSection";
import { Footer } from "../Footer";

export const HomeHeroFleetPreview: React.FC = () => {
  const handleScrollToSegment = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 95;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen text-[color:var(--color-text-main)] relative overflow-x-hidden bg-[color:var(--color-surface-page)]">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Corporate header and Hero */}
      <main className="w-full">
        <div className="bg-[#0a0f1c] relative pt-24 sm:pt-28">
          <Header />

          <section className="phoenix-section-alt text-white pb-6">
            <Hero
              onDiscoverClick={() => handleScrollToSegment("robots-catalog")}
              onDemoClick={() => handleScrollToSegment("prediagnostic")}
            />
          </section>
        </div>

        {/* 2. Robots Catalog Bento Grid (Fleet BEFORE Industries) */}
        <PreviewRobotsCatalogSection />

        {/* 3. Industries & Business Use Cases */}
        <section>
          <IndustriesSection />
        </section>

        {/* 4. Robots in Action (Videos) */}
        <section>
          <PreviewRobotInActionSection />
        </section>

        {/* 5. Logo Slider Section (placed directly below videos) */}
        <PreviewLogoSliderSection />

        {/* 6. Services & Support */}
        <section>
          <ServicesKargoSection />
        </section>

        {/* 7. Methodology & Integration Process */}
        <section>
          <ProcessSection />
        </section>

        {/* 8. Final Contact Form */}
        <section>
          <FinalContactSection />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
