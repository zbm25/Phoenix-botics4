import { motion } from "motion/react";
import React, { useState } from "react";

export interface Partner {
  id: string;
  name: string;
  logoUrl?: string;
  // Let's add a custom typography style for each brand when logoUrl is empty
  fontStyle?: string;
}

const PARTNERS: Partner[] = [
  { 
    id: "partner-1", 
    name: "GEODIS", 
    logoUrl: "", 
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
    logoUrl: "", 
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
    logoUrl: "", 
    fontStyle: "font-sans font-medium tracking-[0.3em] text-slate-600" 
  },
  { 
    id: "partner-6", 
    name: "ACCOR", 
    logoUrl: "", 
    fontStyle: "font-serif font-light tracking-[0.25em] text-slate-500 italic" 
  },
  { 
    id: "partner-7", 
    name: "BOLLORÉ", 
    logoUrl: "", 
    fontStyle: "font-mono font-bold tracking-widest text-slate-700" 
  },
  { 
    id: "partner-8", 
    name: "Alstom", 
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Alstom_logo.svg",
  },
];

export function LogoSliderSection() {
  const [isHovered, setIsHovered] = useState(false);

  // We duplicate the partners list to create a seamless loop
  // Duplicating it twice ensures that we have enough width to slide from -50% to 0%
  const duplicatedPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section 
      id="logo-slider-section" 
      className="py-10 bg-white border-b border-slate-100 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header title */}
        <div className="text-sm font-mono text-slate-400 uppercase tracking-[0.2em] text-center mb-8">
          // SOLUTIONS CERTIFIÉES & DÉPLOYÉES SUR LE TERRAIN
        </div>

        {/* Marquee slider container */}
        <div className="relative w-full overflow-hidden flex items-center py-2 mask-gradient-x">
          {/* Subtle gradient overlays on sides for a beautiful fade-out effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Sliding Track */}
          <motion.div
            className="flex gap-16 md:gap-24 whitespace-nowrap min-w-max items-center"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              ease: "linear",
              duration: isHovered ? 120 : 24, // Slows down significantly on hover for linear inspection
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                style={{ minWidth: "150px" }}
              >
                {partner.logoUrl ? (
                  <img
                    src={partner.logoUrl}
                    alt={`${partner.name} logo`}
                    referrerPolicy="no-referrer"
                    className="h-9 w-auto object-contain max-w-[140px] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <span 
                    className={`${partner.fontStyle || "font-sans font-semibold text-slate-500"} text-base md:text-lg grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 select-none`}
                  >
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
