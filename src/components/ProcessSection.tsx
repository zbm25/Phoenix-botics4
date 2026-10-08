import React from "react";
import { motion } from "motion/react";

export interface ProcessStep {
  number: string;
  title: string;
  text: string;
}

const FOUR_PHASE_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Diagnostic du site",
    text: "Audit d'éligibilité technique in situ : analyse des flux, contraintes de sols, portes et ascenseurs."
  },
  {
    number: "02",
    title: "Configuration & ROI",
    text: "Cartographie SLAM 3D, dimensionnement de la flotte cobotique et modélisation précise du ROI."
  },
  {
    number: "03",
    title: "Validation terrain",
    text: "Essai en situation réelle (POC) sur vos trajectoires d'exploitation pour confirmer l'efficience."
  },
  {
    number: "04",
    title: "Déploiement & Suivi",
    text: "Intégration WMS/IT, formation des équipes, supervision SaaS 24/7 et maintenance préventive."
  }
];

interface ProcessSectionProps {
  steps?: ProcessStep[];
  titleLine1?: string;
  titleLine2?: string;
  eyebrow?: string;
  className?: string;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  steps = FOUR_PHASE_STEPS,
  titleLine1 = "Méthode de déploiement en 4 phases,",
  titleLine2 = "du diagnostic au suivi opérationnel.",
  eyebrow = "MÉTHODOLOGIE D'INTÉGRATION",
  className = "bg-white py-12 sm:py-16"
}) => {
  return (
    <section id="process" className={`${className} relative overflow-hidden border-t border-slate-100 z-20`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Centered header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-widest text-orange-500 uppercase flex items-center justify-center gap-2 font-mono"
          >
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            {eyebrow}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl font-bold font-display mt-3 text-slate-900 text-center tracking-tight"
          >
            {titleLine1} <span className="text-slate-400 font-light">{titleLine2}</span>
          </motion.h2>
        </div>

        {/* 4 compact columns timeline on desktop, horizontal scroll-snap on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="bg-slate-50/80 border border-slate-200/80 p-5 rounded-2xl flex flex-col group hover:border-orange-500/50 hover:bg-white hover:shadow-md transition-all duration-300 relative"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200 tracking-wider">
                  PHASE {step.number}
                </span>
              </div>
              <h3 className="text-base font-bold mb-2 text-slate-900 group-hover:text-orange-600 transition-colors duration-200 font-display">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-light text-xs">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
