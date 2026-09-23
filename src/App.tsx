/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LogoSliderSection } from "./components/LogoSliderSection";
import { RobotsCatalogSection } from "./components/RobotsCatalogSection";
import { RobotInActionSection } from "./components/RobotInActionSection";
import { ProcessSection } from "./components/ProcessSection";
import { ServicesKargoSection } from "./components/ServicesKargoSection";
import { IndustriesSection } from "./components/IndustriesSection";
import { FinalContactSection } from "./components/FinalContactSection";
import { Footer } from "./components/Footer";
import { RobotSeriesPage } from "./pages/RobotSeriesPage";
import { IndustryPage } from "./pages/IndustryPage";
import { TechnologyPage } from "./pages/TechnologyPage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { usePageMeta } from "./hooks/usePageMeta";

function HomePage() {
  usePageMeta(
    "Phoenix-Botics | Intégrateur de Robots Mobiles Autonomes AMR",
    "Intégrateur expert de cobots et robots autonomes en France. Automatisez vos flux logistiques, le nettoyage et le service client sans altérer vos locaux."
  );

  // Custom click trigger handlers to smoothly steer users from Hero actions down to target widgets
  const handleScrollToSegment = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen text-[color:var(--color-text-main)] selection:bg-brand-primary selection:text-white relative overflow-x-hidden bg-[color:var(--color-surface-page)]">
      {/* Sleek Interface Ambient Background Bulbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-900/25 via-orange-600/15 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-red-900/15 via-violet-900/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Decorative large bottom typography watermark */}
      <div className="absolute bottom-12 right-0 p-4 opacity-5 pointer-events-none select-none z-0 hidden lg:block">
        <span className="text-[120px] font-display font-black italic tracking-wider">PHOENIX</span>
      </div>

      {/* Corporate sticky header */}
      <main className="w-full">
        <div className="bg-[#070318] relative pt-24 sm:pt-28">
          <Header />

          <section className="phoenix-section-alt text-white pb-6">
            <Hero
              onDiscoverClick={() => handleScrollToSegment("robots-catalog")}
              onDemoClick={() => handleScrollToSegment("contact")}
            />
          </section>
          <div className="h-16 bg-gradient-to-b from-[#070318] to-[#f5f5f7] -mt-1" />
        </div>

        <LogoSliderSection />

        <section>
          <IndustriesSection />
        </section>

        <section>
          <RobotsCatalogSection />
        </section>

        <section>
          <RobotInActionSection />
        </section>

        {/* 1. Nos Services & Accompagnement */}
        <section>
          <ServicesKargoSection />
        </section>

        {/* 2. Notre Méthodologie & Processus */}
        <section>
          <ProcessSection />
        </section>

        <section>
          <FinalContactSection />
        </section>
      </main>

      {/* Legal and brand Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/robots/:seriesId" element={<RobotSeriesPage />} />
        <Route path="/industries/:industryId" element={<IndustryPage />} />
        <Route path="/technologie" element={<TechnologyPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </>
  );
}
