import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { optimizeCloudinaryUrl } from "../data/robotSeries";

export interface FleetCarouselItem {
  id: string;
  name: string;
  segmentLabel: string;
  shortDesc: string;
  image: string;
  link: string;
  category?: string;
  canonicalId?: string;
  seriesId?: string;
}

export interface FleetCarouselTab {
  id: string;
  label: string;
}

export interface FleetCarouselProps {
  title: React.ReactNode;
  eyebrow?: string;
  subtitle?: string;
  backgroundImage?: string;
  tabs?: FleetCarouselTab[];
  items: FleetCarouselItem[];
  defaultTab?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  onItemSelect?: (item: FleetCarouselItem) => void;
  onPrimaryAction?: (item: FleetCarouselItem) => void;
  getSecondaryLink?: (item: FleetCarouselItem) => string | undefined;
  centerCardsOnDesktop?: boolean;
  sectionId?: string;
}

export const FleetCarousel: React.FC<FleetCarouselProps> = ({
  title,
  eyebrow = "- LA FLOTTE IDÉALE -",
  subtitle,
  backgroundImage,
  tabs,
  items,
  defaultTab = "all",
  primaryCtaLabel,
  secondaryCtaLabel,
  onItemSelect,
  onPrimaryAction,
  getSecondaryLink,
  centerCardsOnDesktop = false,
  sectionId = "fleet-carousel"
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    carouselRef.current?.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }, [activeTab]);

  const filteredItems = useMemo(() => {
    if (!tabs || tabs.length === 0 || activeTab === "all") {
      return items;
    }
    return items.filter((item) => {
      if (item.category) {
        return item.category === activeTab;
      }
      return item.id === activeTab;
    });
  }, [items, tabs, activeTab]);

  const handleScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth"
      });
    }
  };

  const renderCtaContent = (item: FleetCarouselItem) => {
    if (primaryCtaLabel) {
      if (primaryCtaLabel.includes("{name}")) {
        return primaryCtaLabel.replace("{name}", item.name);
      }
      return primaryCtaLabel;
    }
    return `Découvrir ${item.name}`;
  };

  return (
    <section 
      id={sectionId} 
      className="py-24 bg-gray-50 border-t border-gray-200 relative z-20 overflow-hidden"
    >
      {/* 1. En-tête de section centré */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mb-12 text-center">
        {eyebrow && (
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-4 block"
          >
            {eyebrow}
          </motion.span>
        )}
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl lg:text-5xl font-bold font-display tracking-tight text-[#0a0f1c]"
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-gray-600 font-light max-w-xl mx-auto mt-4"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* 2. Grand conteneur sombre avec effet verre fumé / fond immersif */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="relative w-full overflow-hidden rounded-[40px] shadow-2xl py-12 lg:py-16 border border-gray-200/50 bg-[#0a0f1c]">
          
          {/* Calque de fond : image floutée immersive ou dégradé géométrique */}
          {backgroundImage ? (
            <div className="absolute inset-0 z-0">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
              />
              <div className="absolute inset-0 bg-[#0a0f1c]/75 backdrop-blur-xl" />
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0f1c] via-[#0E1626] to-[#0a0f1c] z-0" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
            </>
          )}

          <div className="relative z-10 w-full max-w-[1400px] mx-auto">
            
            {/* Barre d'onglets pilule translucide */}
            {tabs && tabs.length > 0 && (
              <div className="flex justify-center mb-12 px-4">
                <div className="inline-flex items-center p-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-pressed={activeTab === tab.id}
                      className={`px-5 lg:px-6 py-2.5 min-h-[44px] inline-flex items-center justify-center rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                        activeTab === tab.id
                          ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                          : "bg-transparent text-gray-200 hover:text-white hover:bg-white/20"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Carrousel avec grandes flèches blanches extérieures */}
            <div className="relative w-full max-w-7xl mx-auto">
              
              {/* Flèche Gauche Blanche Flottante */}
              <button
                type="button"
                onClick={() => handleScroll("left")}
                className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white shadow-2xl items-center justify-center text-[#0a0f1c] hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label="Élément précédent"
              >
                <ArrowLeft size={22} aria-hidden="true" />
              </button>

              {/* Flèche Droite Blanche Flottante */}
              <button
                type="button"
                onClick={() => handleScroll("right")}
                className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white shadow-2xl items-center justify-center text-[#0a0f1c] hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label="Élément suivant"
              >
                <ArrowRight size={22} aria-hidden="true" />
              </button>

              {/* Conteneur des Cartes Blanches */}
              <div
                ref={carouselRef}
                className={`flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 pt-4 px-4 sm:px-6 md:px-12 scrollbar-none ${
                  centerCardsOnDesktop ? "justify-start lg:justify-center" : "justify-start"
                } [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => {
                    const secondaryLink = getSecondaryLink?.(item);
                    const hasCardAction = Boolean(onPrimaryAction || secondaryLink);

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35 }}
                        className="snap-center shrink-0 w-[82vw] max-w-[340px] sm:max-w-none sm:w-[360px] lg:w-[390px] xl:w-[420px] bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 lg:p-8 shadow-2xl flex flex-col group transition-all duration-300 hover:-translate-y-2 text-center"
                      >
                        {/* Zone d'image grise avec zoom au survol */}
                        <div className="w-full h-[200px] sm:h-[260px] bg-[#f9f9f9] rounded-[24px] flex items-center justify-center overflow-hidden mb-4 sm:mb-6 p-4 sm:p-6 group-hover:bg-[#f3f3f3] transition-colors border border-gray-100">
                          <img
                            src={optimizeCloudinaryUrl(item.image, 800)}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Textes centrés */}
                        <div className="flex flex-col flex-grow text-center">
                          <h3 className="text-2xl font-bold text-[#0a0f1c] mb-1">
                            {item.name}
                          </h3>
                          <p className="text-[11px] tracking-widest uppercase text-orange-500 font-bold mb-3 sm:mb-4 font-mono">
                            {item.segmentLabel}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed flex-grow mb-6 sm:mb-8 font-light">
                            {item.shortDesc}
                          </p>

                          {/* Boutons d'action */}
                          <div className="mt-auto w-full">
                            {hasCardAction ? (
                              <div className="flex flex-col gap-2 w-full">
                                {onPrimaryAction && (
                                  <button
                                    type="button"
                                    onClick={() => onPrimaryAction(item)}
                                    className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white font-semibold py-3 sm:py-3.5 px-5 sm:px-6 min-h-[44px] rounded-full transition-all shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                                  >
                                    <span>{primaryCtaLabel || "Demander une étude de site"}</span>
                                    <ArrowRight size={16} aria-hidden="true" />
                                  </button>
                                )}
                                {secondaryLink && (
                                  <Link
                                    to={secondaryLink}
                                    className="w-full bg-white hover:bg-slate-50 active:scale-[0.99] text-[#0a0f1c] hover:text-orange-500 border border-slate-200 hover:border-slate-300 font-semibold py-3 sm:py-3.5 px-5 sm:px-6 min-h-[44px] rounded-full transition-all shadow-sm flex items-center justify-center gap-2 text-xs sm:text-sm"
                                  >
                                    <span>{secondaryCtaLabel || "Voir les spécifications"}</span>
                                    <ArrowRight size={16} aria-hidden="true" />
                                  </Link>
                                )}
                              </div>
                            ) : onItemSelect ? (
                              <div className="flex justify-center">
                                <button
                                  type="button"
                                  onClick={() => onItemSelect(item)}
                                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-[#0a0f1c] hover:bg-orange-500 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-colors shadow-md w-full sm:w-auto cursor-pointer"
                                >
                                  <span>{renderCtaContent(item)}</span>
                                  <ArrowRight size={16} aria-hidden="true" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-center">
                                <Link
                                  to={item.link}
                                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-[#0a0f1c] hover:bg-orange-500 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-colors shadow-md w-full sm:w-auto"
                                >
                                  <span>{renderCtaContent(item)}</span>
                                  <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
