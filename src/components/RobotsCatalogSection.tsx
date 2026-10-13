import React, { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion, PanInfo } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ROBOT_RANGE_SHOWCASES, RobotRangeShowcase } from "../data/robotRangeShowcase";
import { getCloudinaryUrl } from "../utils/cloudinary";

export const RobotsCatalogSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeRange: RobotRangeShowcase = ROBOT_RANGE_SHOWCASES[activeIndex] || ROBOT_RANGE_SHOWCASES[0];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const count = ROBOT_RANGE_SHOWCASES.length;
    let newIndex = index;

    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % count;
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + count) % count;
      e.preventDefault();
    } else if (e.key === "Home") {
      newIndex = 0;
      e.preventDefault();
    } else if (e.key === "End") {
      newIndex = count - 1;
      e.preventDefault();
    }

    if (newIndex !== index) {
      setActiveIndex(newIndex);
      tabRefs.current[newIndex]?.focus();
    }
  };

  const handleSwipeEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const count = ROBOT_RANGE_SHOWCASES.length;
    if (info.offset.x < -swipeThreshold) {
      setActiveIndex((prev) => (prev + 1) % count);
    } else if (info.offset.x > swipeThreshold) {
      setActiveIndex((prev) => (prev - 1 + count) % count);
    }
  }, []);

  const handlePrimaryCtaClick = (href: string) => {
    const [path, hash] = href.split("#");
    if (path) {
      navigate(path);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const headerOffset = 90;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }, 150);
      }
    }
  };

  return (
    <section
      id="robots-catalog"
      aria-labelledby="robots-catalog-heading"
      className="py-16 sm:py-24 bg-[#070B14] text-white relative overflow-hidden"
    >
      <div className="w-[min(1440px,calc(100vw-32px))] sm:w-[min(1440px,calc(100vw-48px))] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-orange-500 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold mb-3 block">
            - ÉCOSYSTÈME PHOENIX -
          </span>
          <h2
            id="robots-catalog-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white leading-tight"
          >
            Une flotte unifiée pour{" "}
            <span className="text-orange-500">transformer vos opérations.</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Sélectionnez votre intention métier pour explorer notre technologie cobotique en situation réelle.
          </p>
        </div>

        {/* Outer Immersive Scene Container */}
        <div className="bg-[#0B1121] rounded-[28px] sm:rounded-[36px] border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative">

          {/* Mission Selector Bar / Tablist */}
          <div
            role="tablist"
            aria-label="Gammes de robots Phoenix par intention métier"
            className="border-b border-slate-800/80 bg-[#070B14]/80 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-start lg:justify-center gap-3 sm:gap-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {ROBOT_RANGE_SHOWCASES.map((showcase, index) => {
              const isActive = index === activeIndex;
              const formattedIndex = String(index + 1).padStart(2, "0");

              return (
                <button
                  key={showcase.id}
                  id={`tab-${showcase.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${showcase.id}`}
                  tabIndex={isActive ? 0 : -1}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`min-h-[52px] min-w-[140px] sm:min-w-[180px] px-4 py-2.5 rounded-xl transition-all duration-200 flex flex-col justify-center items-start sm:items-center text-left sm:text-center shrink-0 cursor-pointer relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                    isActive
                      ? "bg-slate-800/80 text-white shadow-inner"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs font-bold ${isActive ? "text-orange-500" : "text-slate-500 group-hover:text-slate-400"}`}>
                      {formattedIndex}
                    </span>
                    <span className="text-xs sm:text-sm font-bold tracking-wide uppercase font-display">
                      {showcase.intent}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                    Gamme {showcase.rangeName}
                  </span>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-3 right-3 h-[3px] bg-orange-500 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <div
            id={`panel-${activeRange.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeRange.id}`}
            className="relative min-h-[520px] lg:min-h-[580px] flex flex-col lg:flex-row items-stretch"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRange.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col lg:flex-row items-stretch"
              >
                {/* Mobile View Layout (Touch swipeable, vertical composition) */}
                <div className="block lg:hidden w-full flex flex-col">
                  {/* Visual Scene Mobile 4:5 */}
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleSwipeEnd}
                    className="relative w-full aspect-[4/5] max-h-[420px] bg-slate-950/60 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
                  >
                    {/* Background Environment Image */}
                    <img
                      src={getCloudinaryUrl(activeRange.backgroundScene.mobileImage, { width: 800 })}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-[#0B1121]/50 to-transparent pointer-events-none" />

                    {/* Ground Plane Light Accent */}
                    <div className="absolute bottom-12 w-3/4 h-24 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Contact Shadow */}
                    <div className="absolute bottom-6 w-2/3 h-6 bg-black/80 rounded-full blur-md pointer-events-none" />

                    {/* Dominant Primary Robot */}
                    <img
                      src={getCloudinaryUrl(activeRange.primaryRobot.image, { width: 800, trim: true })}
                      alt={activeRange.primaryRobot.alt}
                      className="relative z-10 max-h-[82%] object-contain drop-shadow-2xl pointer-events-none"
                    />

                    {/* Mobile Position Indicator */}
                    <div className="absolute top-4 right-4 z-20 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/60 text-[11px] font-mono text-orange-400 font-bold">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(ROBOT_RANGE_SHOWCASES.length).padStart(2, "0")}
                    </div>
                  </motion.div>

                  {/* Editorial Content Below Image Mobile */}
                  <div className="p-6 flex flex-col text-left">
                    <span className="text-orange-500 font-mono text-[11px] font-bold tracking-widest uppercase mb-2 block">
                      // {activeRange.eyebrow}
                    </span>
                    <h3 className="text-2xl font-bold font-display text-white leading-tight mb-3">
                      {activeRange.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">
                      {activeRange.description}
                    </p>

                    {/* Proofs */}
                    <div className="space-y-2.5 mb-6">
                      {activeRange.proofs.map((proof, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <CheckCircle2 size={16} className="text-orange-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{proof.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Mobile CTAs */}
                    <div className="flex flex-col gap-3 mt-auto">
                      <button
                        type="button"
                        onClick={() => handlePrimaryCtaClick(activeRange.primaryCta.href)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-xl text-xs transition-colors shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{activeRange.primaryCta.label}</span>
                        <ArrowRight size={15} />
                      </button>

                      <Link
                        to={activeRange.secondaryCta.href}
                        className="w-full text-center py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>{activeRange.secondaryCta.label}</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Desktop View Layout (>= 1024px) */}
                <div className="hidden lg:flex w-full min-h-[560px]">
                  {/* Editorial Column (38%) */}
                  <div className="w-[38%] p-10 xl:p-12 flex flex-col justify-between text-left z-20 bg-[#0B1121]/90 backdrop-blur-sm border-r border-slate-800/60">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold tracking-widest uppercase mb-4">
                        // {activeRange.eyebrow}
                      </span>

                      <h3 className="text-3xl xl:text-4xl font-bold font-display text-white leading-tight mb-4">
                        {activeRange.title}
                      </h3>

                      <p className="text-slate-300 text-sm xl:text-base leading-relaxed mb-8">
                        {activeRange.description}
                      </p>

                      {/* Proofs list */}
                      <div className="space-y-3.5 mb-8">
                        {activeRange.proofs.map((proof, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-3 text-sm text-slate-200">
                            <CheckCircle2 size={18} className="text-orange-500 shrink-0 mt-0.5" />
                            <span className="leading-snug font-medium">{proof.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dual CTAs Desktop */}
                    <div className="pt-6 border-t border-slate-800/80 flex flex-col xl:flex-row items-stretch xl:items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handlePrimaryCtaClick(activeRange.primaryCta.href)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-full text-xs xl:text-sm transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                      >
                        <span>{activeRange.primaryCta.label}</span>
                        <ArrowRight size={16} />
                      </button>

                      <Link
                        to={activeRange.secondaryCta.href}
                        className="text-slate-300 hover:text-white font-semibold text-xs xl:text-sm transition-colors flex items-center justify-center xl:justify-start gap-1.5 py-2 px-2"
                      >
                        <span>{activeRange.secondaryCta.label}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Visual Scene Column (62%) */}
                  <div className="w-[62%] relative bg-slate-950 overflow-hidden flex items-end justify-center p-8">
                    {/* Background Business Environment Image */}
                    <img
                      src={getCloudinaryUrl(activeRange.backgroundScene.desktopImage, { width: 1200 })}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1121] via-transparent to-[#0B1121]/80 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-transparent pointer-events-none" />

                    {/* Subtle Radial Backlight */}
                    <div className="absolute bottom-12 w-2/3 h-48 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

                    {/* Floor Plane Elliptical Shadow */}
                    <div className="absolute bottom-6 w-1/2 h-8 bg-black/90 rounded-full blur-lg pointer-events-none z-10" />

                    {/* Secondary Robot Visual (if configured) */}
                    {activeRange.secondaryRobot && (
                      <img
                        src={getCloudinaryUrl(activeRange.secondaryRobot.image, { width: 600, trim: true })}
                        alt=""
                        aria-hidden="true"
                        style={{
                          transform: `scale(${activeRange.secondaryRobot.scale})`,
                          opacity: activeRange.secondaryRobot.opacity,
                        }}
                        className={`absolute z-10 max-h-[60%] object-contain drop-shadow-xl pointer-events-none transition-all duration-300 ${activeRange.secondaryRobot.position}`}
                      />
                    )}

                    {/* Dominant Primary Robot Visual */}
                    <motion.img
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.1 }}
                      src={getCloudinaryUrl(activeRange.primaryRobot.image, { width: 1000, trim: true })}
                      alt={activeRange.primaryRobot.alt}
                      className="relative z-20 max-h-[88%] xl:max-h-[92%] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] pointer-events-none"
                    />
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
