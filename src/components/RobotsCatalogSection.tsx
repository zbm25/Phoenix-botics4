import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight, ChevronRight, Layers, Cpu, Users } from "lucide-react";
import { ROBOT_RANGE_SHOWCASES, RobotRangeShowcase } from "../data/robotRangeShowcase";

const ICON_MAP: Record<string, React.ReactNode> = {
  uclean: <Layers size={13} className="text-orange-400" aria-hidden="true" />,
  ulog: <Cpu size={13} className="text-orange-400" aria-hidden="true" />,
  userve: <Users size={13} className="text-orange-400" aria-hidden="true" />,
};

export const RobotsCatalogSection: React.FC = () => {
  return (
    <section
      id="robots-catalog"
      className="py-16 sm:py-24 bg-white text-slate-900 overflow-hidden font-sans border-t border-slate-200/80 relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* En-tête de section centré */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>GAMMES DE ROBOTS PROFESSIONNELS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-slate-900 leading-[1.15]"
          >
            Une flotte autonome conçue pour{" "}
            <span className="relative whitespace-nowrap text-orange-500">
              l'excellence opérationnelle.
              <svg
                className="absolute -bottom-2 left-0 w-full h-2 text-orange-400/40 -z-10"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            Trois gammes complémentaires certifiées pour cohabiter en toute sécurité avec vos équipes et sublimer vos environnements professionnels.
          </motion.p>
        </div>

        {/* Grille des Cartes Monumentales pilotée via ROBOT_RANGE_SHOWCASES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {ROBOT_RANGE_SHOWCASES.map((range: RobotRangeShowcase, index: number) => (
            <motion.article
              key={range.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 * index }}
              className="group relative bg-slate-50/70 hover:bg-white rounded-3xl border border-slate-200/80 hover:border-slate-300 p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-slate-900/5"
            >
              <div>
                {/* Badges d'intention et catégorie */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1121] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
                    {ICON_MAP[range.id]}
                    <span>{range.badgeLabel}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-[11px] font-medium">
                    {range.badgeCategory}
                  </span>
                </div>

                {/* Titre & Description de la gamme */}
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight group-hover:text-orange-600 transition-colors duration-200">
                  {range.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 font-normal leading-relaxed min-h-[40px]">
                  {range.description}
                </p>

                {/* Zone Visuel Produit Aéré avec Ombre d'Occlusion */}
                <div className="relative my-6 rounded-2xl bg-gradient-to-b from-white to-slate-100/80 border border-slate-200/60 p-4 sm:p-6 flex items-center justify-center min-h-[260px] overflow-hidden group-hover:border-slate-300 transition-colors">

                  {/* Visuel principal avec cadrage propre */}
                  <img
                    src={range.image}
                    alt={range.imageAlt}
                    loading="lazy"
                    className="max-h-[220px] w-auto object-contain select-none transform group-hover:scale-105 transition-transform duration-300 relative z-10"
                  />

                  {/* Ombre d'occlusion douce sous le robot */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/25 rounded-full blur-md z-0 pointer-events-none" />

                  {/* Tag métrique clé flottant */}
                  <div className="absolute bottom-3 right-3 z-20 bg-[#0B1121]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl border border-white/10 text-right shadow-lg">
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                      {range.metricLabel}
                    </span>
                    <span className="block text-xs font-bold text-orange-400">
                      {range.metricValue}
                    </span>
                  </div>
                </div>

                {/* Liste des points forts */}
                <ul className="space-y-2.5 mb-8">
                  {range.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 size={16} className="text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{highlight.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs Double Conformes (Standard Case & whitespace-nowrap) */}
              <div className="pt-4 border-t border-slate-200/70 flex flex-col sm:flex-row gap-3">
                <Link
                  to={range.roiHref}
                  className="flex-1 whitespace-nowrap px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-md shadow-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 cursor-pointer"
                >
                  <span>Estimer le ROI</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>

                <Link
                  to={range.discoverHref}
                  className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 cursor-pointer"
                >
                  <span>Découvrir la gamme</span>
                  <ChevronRight size={15} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Link>
              </div>

            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
