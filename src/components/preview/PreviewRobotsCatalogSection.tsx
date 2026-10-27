import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
import { ROBOT_RANGE_SHOWCASES } from "../../data/robotRangeShowcase";

export const PreviewRobotsCatalogSection: React.FC = () => {
  return (
    <section
      id="robots-catalog"
      className="py-16 sm:py-24 bg-slate-900 border-t border-slate-800 relative z-20 overflow-hidden text-white"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-orange-500/10 via-blue-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-3 block"
          >
            - GAMMES DE ROBOTS AMRs & COBOTS -
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight"
          >
            Une ingénierie de pointe pour <span className="text-orange-500">chaque défi opérationnel.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-300 font-light max-w-xl mx-auto mt-4"
          >
            Trois gammes spécialisées conçues pour automatiser le nettoyage, la manutention litière/lourde et l'accueil en cohabitation sécurisée.
          </motion.p>
        </div>

        {/* Bento Grid: 3 Range Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

          {ROBOT_RANGE_SHOWCASES.map((range, index) => {
            const isLarge = range.id === "range-uclean" || range.id === "range-ulog";
            const colSpan = isLarge ? "lg:col-span-6" : "lg:col-span-12";

            return (
              <motion.div
                key={range.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className={`${colSpan} group relative bg-slate-950/80 rounded-3xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between hover:border-orange-500/60 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1.5`}
              >
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
                      {range.title}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {range.subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                    Gamme {range.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-6">
                    {range.tagline}
                  </p>

                  {/* Highlight Metric Card */}
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-xl sm:text-2xl font-display font-black text-orange-400">
                        {range.metricValue}
                      </span>
                      <span className="block text-[11px] text-slate-300 font-medium mt-0.5">
                        {range.metricLabel}
                      </span>
                    </div>
                    <div className="hidden sm:block text-right text-[10px] text-slate-500 font-mono max-w-[180px]">
                      {range.metricSourceNote}
                    </div>
                  </div>

                  {/* Product Visual Area */}
                  <div className="relative bg-slate-900/50 rounded-2xl p-4 sm:p-6 mb-6 flex items-center justify-center min-h-[220px] sm:min-h-[260px] border border-slate-800/60 group-hover:bg-slate-900/80 transition-colors">
                    {/* Dominant Model */}
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={range.dominantModel.image}
                        alt={range.dominantModel.alt}
                        className="h-36 sm:h-44 object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="text-xs font-bold text-slate-200 mt-3 block">
                        Modèle de référence : {range.dominantModel.name}
                      </span>
                    </div>

                    {/* Secondary Models Thumbnails if present */}
                    {range.secondaryModels && range.secondaryModels.length > 0 && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 backdrop-blur-md">
                        {range.secondaryModels.map((sec) => (
                          <img
                            key={sec.name}
                            src={sec.image}
                            alt={sec.alt}
                            title={sec.name}
                            className="w-9 h-9 object-contain rounded-lg bg-slate-900 p-0.5"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    to={range.primaryCta.href}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-orange-500/20 active:scale-[0.98]"
                  >
                    <span>{range.primaryCta.label}</span>
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    to={range.secondaryCta.href}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 hover:border-slate-600 transition-all duration-200 active:scale-[0.98]"
                  >
                    <Calculator size={14} className="text-orange-400" />
                    <span>{range.secondaryCta.label}</span>
                  </Link>
                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
