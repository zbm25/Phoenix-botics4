import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { fadeUp, staggerContainer } from "../motion/variants";

interface HeroProps {
  onDiscoverClick: () => void;
  onDemoClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscoverClick, onDemoClick }) => {
  const videos = [
    {
      id: 0,
      src: "https://res.cloudinary.com/df1x718yw/video/upload/v1782758795/ULog_tlu9tt.mp4",
      title: "ULog",
      label: "Robot de service"
    },
    {
      id: 1,
      src: "https://res.cloudinary.com/df1x718yw/video/upload/v1782758788/uClean_hsvmvx.mp4",
      title: "UClean",
      label: "Robot de nettoyage"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeIndex]);

  return (
    <section 
      id="hero" 
      className="relative mb-12 mx-4 sm:mx-6 rounded-[2rem] overflow-hidden min-h-[62vh] sm:min-h-[68vh] md:min-h-[72vh] flex items-center bg-slate-950 shadow-2xl animate-none"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.video
            key={activeIndex}
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover"
            onEnded={() => setActiveIndex((prev) => (prev + 1) % videos.length)}
          >
            <source src={videos[activeIndex].src} type="video/mp4" />
          </motion.video>
        </AnimatePresence>
        {/* Overlay pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[62vh] sm:min-h-[68vh] md:min-h-[72vh] flex items-center">
        {/* Text Container aligned bottom-left or center-left */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-3xl pl-4 sm:pl-12 lg:pl-16 pr-4 sm:pr-0 py-12 sm:py-16 md:py-24 pb-20 sm:pb-16 flex flex-col items-start text-left"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 mb-4 sm:mb-6 border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-orange-400">
                ROBOTIQUE DE SERVICE
              </span>
            </div>
          </motion.div>

          {/* H1 Title */}
          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-display tracking-tight"
          >
            Libérer le potentiel humain<br />
            <span className="text-orange-400">par la robotique.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-xl text-white/90 font-light mt-3 sm:mt-5 max-w-2xl leading-relaxed"
          >
            L'automatisation intelligente au service de votre croissance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto">
            <button
              id="hero-discover-btn"
              onClick={onDiscoverClick}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm md:text-base px-6 py-3 rounded-full transition-colors duration-200 cursor-pointer flex items-center justify-center min-h-[44px]"
            >
              Découvrir notre catalogue →
            </button>
            
            <button
              id="hero-demo-btn"
              onClick={onDemoClick}
              className="w-full sm:w-auto bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold text-sm md:text-base px-6 py-3 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center backdrop-blur-sm min-h-[44px]"
            >
              Planifier une démo
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Selector Indicator Bars (Overlay in bottom-right/bottom-center) */}
      <div className="absolute right-4 sm:right-12 lg:right-16 bottom-4 sm:bottom-8 flex items-end justify-center gap-3 sm:gap-4 z-20">
        {videos.map((video, index) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="flex flex-col items-center gap-1.5 group focus:outline-none cursor-pointer"
            aria-label={`Voir ${video.title}`}
          >
            <div
              className={`h-0.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-orange-400 w-14 lg:w-20"
                  : "bg-white/40 w-10 lg:w-16 group-hover:bg-white/70"
              }`}
            />
            <span
              className={`text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase transition-colors duration-200 ${
                index === activeIndex
                  ? "text-orange-300"
                  : "text-white/50 group-hover:text-white/80"
              }`}
            >
              {video.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
