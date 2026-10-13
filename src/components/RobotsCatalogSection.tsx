import React, { useState, useRef, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { ROBOT_RANGE_SHOWCASES, RobotRangeShowcase } from "../data/robotRangeShowcase";
import { getCloudinaryUrl, getCloudinarySrcSet, DEFAULT_SHOWCASE_SIZES } from "../utils/cloudinary";

export const RobotsCatalogSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>("uclean");
  const shouldReduceMotion = useReducedMotion();
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const currentIndex = ROBOT_RANGE_SHOWCASES.findIndex((item) => item.id === activeTabId);
  const activeShowcase: RobotRangeShowcase =
    ROBOT_RANGE_SHOWCASES[currentIndex >= 0 ? currentIndex : 0];

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = index;
    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % ROBOT_RANGE_SHOWCASES.length;
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + ROBOT_RANGE_SHOWCASES.length) % ROBOT_RANGE_SHOWCASES.length;
    } else if (e.key === "Home") {
      newIndex = 0;
    } else if (e.key === "End") {
      newIndex = ROBOT_RANGE_SHOWCASES.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextItem = ROBOT_RANGE_SHOWCASES[newIndex];
    setActiveTabId(nextItem.id);
    tabRefs.current[nextItem.id]?.focus();
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      const nextIndex = (currentIndex + 1) % ROBOT_RANGE_SHOWCASES.length;
      setActiveTabId(ROBOT_RANGE_SHOWCASES[nextIndex].id);
    } else if (direction === "right") {
      const prevIndex = (currentIndex - 1 + ROBOT_RANGE_SHOWCASES.length) % ROBOT_RANGE_SHOWCASES.length;
      setActiveTabId(ROBOT_RANGE_SHOWCASES[prevIndex].id);
    }
  };

  return (
    <section
      id="robots-catalog"
      className="py-16 sm:py-20 lg:py-24 bg-gray-50 border-t border-gray-200 relative z-20 overflow-hidden"
    >
      {/* 1. En-tête de section centré */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-8 sm:mb-12 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-3 block"
        >
          - ÉCOSYSTÈME PHOENIX -
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#0a0f1c]"
        >
          Une flotte unifiée pour{" "}
          <span className="text-orange-500">transformer vos opérations.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-gray-600 font-light max-w-2xl mx-auto mt-3 sm:mt-4"
        >
          Sélectionnez votre intention métier pour explorer notre technologie cobotique en situation réelle.
        </motion.p>
      </div>

      {/* 2. Conteneur principal immersif */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative w-full overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#0B1121] p-5 sm:p-8 lg:p-10 shadow-2xl border border-slate-800/80">

          {/* Barre d'onglets W3C interactive */}
          <div
            role="tablist"
            aria-label="Gammes de robots Phoenix par intention métier"
            className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 mb-6 sm:mb-8 border-b border-white/10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {ROBOT_RANGE_SHOWCASES.map((item, idx) => {
              const isSelected = item.id === activeTabId;
              return (
                <button
                  key={item.id}
                  id={`tab-${item.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${item.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  ref={(el) => {
                    tabRefs.current[item.id] = el;
                  }}
                  onClick={() => setActiveTabId(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`relative min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1121] ${
                    isSelected
                      ? "text-white bg-white/10 shadow-lg border border-orange-500/50"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <span className="text-orange-400 font-mono text-[10px] sm:text-xs uppercase tracking-wider">
                    {item.intent}
                  </span>
                  <span className="text-white font-medium">{item.name}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-xl border border-orange-500 pointer-events-none"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Panneau actif synchronisé avec AnimatePresence */}
          <div
            id={`panel-${activeShowcase.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeShowcase.id}`}
            className="focus-visible:outline-none"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeShowcase.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
              >
                {/* Zone Éditoriale (Desktop: 5 cols / Mobile-Tablet: col-1) */}
                <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono mb-3 w-fit">
                    <Sparkles size={12} />
                    <span>INTENTION : {activeShowcase.intent.toUpperCase()}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight">
                    {activeShowcase.name}
                  </h3>

                  <p className="text-sm sm:text-base font-semibold text-orange-400 mt-1.5 leading-snug">
                    {activeShowcase.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 font-light mt-3 leading-relaxed">
                    {activeShowcase.description}
                  </p>

                  {/* 3 Bénéfices chiffrés / techniques */}
                  <div className="mt-5 space-y-2.5">
                    {activeShowcase.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 size={16} className="text-orange-400 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs : Principal + Secondaire */}
                  <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Link
                      to={activeShowcase.qualificationHref}
                      className="min-h-[44px] px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    >
                      <span>Évaluer cette solution</span>
                      <ArrowRight size={15} />
                    </Link>

                    <Link
                      to={activeShowcase.href}
                      className="min-h-[44px] px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/10 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    >
                      <span>Découvrir la gamme</span>
                      <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>

                {/* Zone Visuelle Scénographiée (Desktop: 7 cols / Mobile-Tablet: col-1) */}
                <div className="lg:col-span-7 order-1 lg:order-2 relative flex flex-col items-center justify-center min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]">

                  {/* Halo lumineux en arrière-plan */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-0">
                    <div className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] bg-orange-500/15 rounded-full blur-[80px]" />
                  </div>

                  {/* Conteneur d'image interactif avec Swipe tactile mobile */}
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -40) handleSwipe("left");
                      if (info.offset.x > 40) handleSwipe("right");
                    }}
                    className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
                  >
                    {/* Art Direction : Picture element avec source mobile et desktop */}
                    <picture className="relative z-10 max-w-full flex justify-center items-center">
                      <source
                        media="(max-width: 767px)"
                        srcSet={getCloudinarySrcSet(activeShowcase.mobile.primaryImage, [390, 480, 640], true)}
                        sizes="100vw"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcSet={getCloudinarySrcSet(activeShowcase.desktop.primaryImage, [768, 1024, 1440], true)}
                        sizes={DEFAULT_SHOWCASE_SIZES}
                      />
                      <img
                        src={getCloudinaryUrl(activeShowcase.desktop.primaryImage, { width: 1024, trim: true })}
                        alt={activeShowcase.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="w-auto h-auto max-h-[260px] sm:max-h-[350px] lg:max-h-[420px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] select-none pointer-events-none"
                      />
                    </picture>

                    {/* Robot secondaire (Desktop uniquement >= 1024px) */}
                    {activeShowcase.desktop.secondaryImage && (
                      <div className="hidden lg:block absolute right-2 bottom-4 z-0 opacity-40 hover:opacity-75 transition-opacity duration-300 pointer-events-none">
                        <img
                          src={getCloudinaryUrl(activeShowcase.desktop.secondaryImage, { width: 480, trim: true })}
                          alt={`${activeShowcase.name} - modèle secondaire`}
                          loading="lazy"
                          decoding="async"
                          className="h-[220px] w-auto object-contain filter grayscale-[30%] blur-[0.5px]"
                        />
                      </div>
                    )}
                  </motion.div>

                  {/* Ombre de contact réaliste au sol */}
                  <div className="w-3/4 h-4 bg-black/60 rounded-full blur-md mt-2 pointer-events-none" />

                  {/* Indicateur de position mobile (ex: 1 / 3) */}
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-mono sm:hidden">
                    <span>{currentIndex + 1}</span>
                    <span className="text-slate-600">/</span>
                    <span>{ROBOT_RANGE_SHOWCASES.length}</span>
                    <span className="text-[10px] text-slate-500 ml-1">(glisser ↔)</span>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
