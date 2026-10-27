import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Pause, Play } from "lucide-react";

export interface Partner {
  id: string;
  name: string;
  logoUrl?: string;
  fontStyle?: string;
}

const PARTNERS: Partner[] = [
  {
    id: "partner-1",
    name: "GEODIS",
    fontStyle: "font-display font-black tracking-[0.2em] text-slate-700 italic"
  },
  {
    id: "partner-2",
    name: "Carrefour",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrefour_logo.svg",
  },
  {
    id: "partner-3",
    name: "SODEXO",
    fontStyle: "font-sans font-bold tracking-widest text-slate-500"
  },
  {
    id: "partner-4",
    name: "Decathlon",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Decathlon_Logo.svg",
  },
  {
    id: "partner-5",
    name: "AIRBUS",
    fontStyle: "font-sans font-medium tracking-[0.3em] text-slate-600"
  },
  {
    id: "partner-6",
    name: "ACCOR",
    fontStyle: "font-serif font-light tracking-[0.25em] text-slate-500 italic"
  },
  {
    id: "partner-7",
    name: "BOLLORÉ",
    fontStyle: "font-mono font-bold tracking-widest text-slate-700"
  },
  {
    id: "partner-8",
    name: "Alstom",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Alstom_logo.svg",
  },
];

export const PreviewLogoSliderSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const duplicatedPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section
      id="logo-slider-section"
      className="py-8 bg-white border-y border-slate-200/80 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header bar with accessible pause/play toggle */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-[0.2em]">
            // SOLUTIONS DÉPLOYÉES SUR LE TERRAIN
          </span>

          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? "Reprendre le défilement" : "Mettre en pause le défilement"}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-mono transition-colors cursor-pointer"
          >
            {isPaused ? (
              <>
                <Play size={12} className="fill-current text-orange-500" />
                <span>Reprendre</span>
              </>
            ) : (
              <>
                <Pause size={12} className="fill-current text-slate-500" />
                <span>Pause</span>
              </>
            )}
          </button>
        </div>

        {/* Marquee slider container */}
        <div className="relative w-full overflow-hidden flex items-center py-2">
          {/* Edge gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {prefersReducedMotion ? (
            /* Reduced Motion Static Grid */
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 w-full items-center justify-items-center">
              {PARTNERS.map((partner) => (
                <div key={partner.id} className="flex items-center justify-center p-2">
                  {partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={`${partner.name} logo`}
                      className="h-8 w-auto object-contain max-w-[120px] grayscale opacity-60"
                    />
                  ) : (
                    <span className={`${partner.fontStyle || "font-sans font-semibold text-slate-500"} text-sm grayscale opacity-60`}>
                      {partner.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Animated Marquee */
            <motion.div
              className="flex gap-12 sm:gap-16 whitespace-nowrap min-w-max items-center"
              animate={{ x: isPaused ? "0%" : ["-50%", "0%"] }}
              transition={{
                ease: "linear",
                duration: isHovered ? 60 : 35, // Slow smooth scrolling
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex items-center justify-center transition-all duration-200 transform hover:scale-105"
                  style={{ minWidth: "130px" }}
                >
                  {partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={`${partner.name} logo`}
                      className="h-8 w-auto object-contain max-w-[130px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                    />
                  ) : (
                    <span
                      className={`${partner.fontStyle || "font-sans font-semibold text-slate-500"} text-base md:text-lg grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200 select-none`}
                    >
                      {partner.name}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};
