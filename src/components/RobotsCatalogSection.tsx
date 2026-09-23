import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { optimizeCloudinaryUrl } from "../data/robotSeries";

const FLEET_IMAGE_URL =
  "https://res.cloudinary.com/df1x718yw/image/upload/v1789039451/ChatGPT_Image_10_sept._2026_13_19_56_xujlb2.png";

interface RangeButton {
  name: string;
  subtitle: string;
  href: string;
}

const RANGES: RangeButton[] = [
  {
    name: "uClean",
    subtitle: "Nettoyage & propreté autonome",
    href: "/robots/uclean-series",
  },
  {
    name: "uLog",
    subtitle: "Intralogistique & manutention AMR",
    href: "/robots/ulog-series",
  },
  {
    name: "uServe",
    subtitle: "Accueil & service interactif",
    href: "/robots/userve-series",
  },
];

export const RobotsCatalogSection: React.FC = () => {
  return (
    <section
      id="robots-catalog"
      className="py-20 sm:py-24 bg-gray-50 border-t border-gray-200 relative z-20 overflow-hidden"
    >
      {/* 1. En-tête de section centré */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mb-10 sm:mb-12 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-4 block"
        >
          - ÉCOSYSTÈME PHOENIX -
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl lg:text-5xl font-bold font-display tracking-tight text-[#0a0f1c]"
        >
          Une flotte unifiée pour{" "}
          <span className="text-orange-500">transformer vos opérations.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base text-gray-600 font-light max-w-xl mx-auto mt-4"
        >
          Découvrez nos solutions robotiques de pointe, conçues pour s'adapter à
          chaque métier et cohabiter en toute sécurité avec vos équipes.
        </motion.p>
      </div>

      {/* 2. Cadre intérieur sombre compacté */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative mx-auto w-full overflow-hidden rounded-[32px] sm:rounded-[40px] bg-[#0B1121] px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9 shadow-2xl border border-slate-800/80">
          {/* 3. Photo de la flotte complète bien proportionnée */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center items-center relative z-10 w-full mb-6 sm:mb-7"
          >
            <div className="relative w-full max-w-5xl flex justify-center items-center">
              {/* Fondu très doux sur les bordures pour fusionner avec le fond #0B1121 */}
              <div 
                className="relative w-full flex justify-center [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%),linear-gradient(to_right,transparent_0%,black_3%,black_97%,transparent_100%)] [mask-composite:intersect]"
              >
                <img
                  src={optimizeCloudinaryUrl(FLEET_IMAGE_URL, 1600)}
                  alt="Flotte robotique unifiée Phoenix-Botics : uClean, uLog et uServe"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[460px] sm:max-h-[520px] object-contain drop-shadow-2xl select-none pointer-events-none"
                />
              </div>
            </div>
          </motion.div>

          {/* 4. Séparation discrète et navigation compacte vers les 3 gammes */}
          <div className="relative z-10 max-w-5xl mx-auto pt-5 sm:pt-6 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3.5">
              {RANGES.map((range, index) => (
                <motion.div
                  key={range.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.1 + index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full"
                >
                  <Link
                    to={range.href}
                    className="group w-full flex items-center justify-between gap-2.5 py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-orange-500/70 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1121]"
                  >
                    <div className="min-w-0 flex-1 text-left">
                      <span className="block text-sm sm:text-base font-bold text-white group-hover:text-orange-400 transition-colors duration-200 leading-snug">
                        {range.name}
                      </span>
                      <span className="block text-[11px] text-slate-400 font-light truncate mt-0.5 group-hover:text-slate-300 transition-colors duration-200">
                        {range.subtitle}
                      </span>
                    </div>

                    <ArrowRight
                      size={15}
                      className="text-slate-400 group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-200 shrink-0"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
