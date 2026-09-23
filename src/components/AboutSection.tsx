import React from "react";
import { motion } from "motion/react";
import { IconRenderer } from "./IconRenderer";
import { fadeUp, staggerContainer } from "../motion/variants";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[color:var(--color-surface-page)]">
      
      {/* Background decoration elements */}
      <div className="absolute top-[30%] left-[-15%] w-[40%] h-[40%] rounded-full bg-purple-900/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[40%] h-[40%] rounded-full bg-orange-600/5 blur-[120px] -z-10 pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Premium Corporate Introduction & Stats */}
          <div className="lg:col-span-6 text-left flex flex-col items-start font-sans">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/5 border border-black/10 rounded-full w-fit mb-4 text-[10px] uppercase tracking-widest font-semibold text-slate-600"
            >
              <span>À propos de nous</span>
            </motion.div>
            
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 mb-6 leading-tight"
            >
              Pionniers de la <br />
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                Robotique de Service
              </span>
            </motion.h2>
            
            <motion.div
              variants={fadeUp}
              className="space-y-4 mb-6 text-sm text-slate-600 font-light leading-relaxed lg:leading-7"
            >
              <p>
                Phoenix‑Botics est une société française dédiée à la robotique de service de nouvelle génération. Nous accompagnons les acteurs du retail, de l’hôtellerie‑restauration, la santé, les laboratoires et l’industrie dans la conception, le déploiement et l’exploitation de flottes de robots adaptées à leurs enjeux terrain.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-0">
              <a
                href="/about"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                aria-label="En savoir plus sur Phoenix-Botics"
              >
                En savoir plus sur Phoenix‑Botics →
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3 Blocks */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Block 1: Partenaire des leaders */}
            <motion.div
              variants={fadeUp}
              className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-orange-500/60 transition-all duration-300 shadow-sm group"
            >
              <div className="flex gap-4 sm:gap-5 items-start text-left">
                <div className="w-12 h-12 rounded-xl bg-orange-500/5 border border-orange-500/15 flex items-center justify-center text-orange-500 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <IconRenderer name="Award" size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 mb-2">
                    Solutions d’Ingénierie sur Mesure
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    Nous construisons des solutions d'ingénierie robustes et parfaitement adaptées à vos infrastructures de travail. Notre équipe assure l'adaptation technique et logicielle complète des robots de votre flotte.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Block 2: Accompagnement de A à Z */}
            <motion.div
              variants={fadeUp}
              className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-orange-500/60 transition-all duration-300 shadow-sm group"
            >
              <div className="flex gap-4 sm:gap-5 items-start text-left">
                <div className="w-12 h-12 rounded-xl bg-orange-500/5 border border-orange-500/15 flex items-center justify-center text-orange-500 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <IconRenderer name="Compass" size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 mb-2">
                    Accompagnement de A à Z
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    De l'audit initial de vos surfaces au déploiement de sécurité et la formation de vos collaborateurs, nous gérons l'intégralité du projet. Vous disposez d'un chef de projet dédié à votre réussite opérationnelle.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Block 3: Approche orientée ROI & expérience utilisateur */}
            <motion.div
              variants={fadeUp}
              className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-orange-500/60 transition-all duration-300 shadow-sm group"
            >
              <div className="flex gap-4 sm:gap-5 items-start text-left">
                <div className="w-12 h-12 rounded-xl bg-orange-500/5 border border-orange-500/15 flex items-center justify-center text-orange-500 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <IconRenderer name="Activity" size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 mb-2">
                    Approche orientée ROI & expérience utilisateur
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    Chaque déploiement de robot de service vise à soulager la pénibilité physique de vos collaborateurs (réduction nette des TMS). Vos équipes regagnent du temps de travail à haute valeur ajoutée.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};
