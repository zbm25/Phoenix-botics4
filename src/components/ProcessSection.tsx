import React from "react";
import { motion } from "motion/react";

interface ProcessStep {
  number: string;
  title: string;
  text: string;
}

const STEPS: ProcessStep[] = [
  {
    number: "01.",
    title: "Étude & Audit",
    text: "Analyse approfondie de vos flux, de vos contraintes spatiales et définition des objectifs de ROI."
  },
  {
    number: "02.",
    title: "Cartographie & Démo",
    text: "Mapping précis de votre site par nos ingénieurs et tests de configuration en conditions réelles."
  },
  {
    number: "03.",
    title: "Déploiement & Formation",
    text: "Mise en service fluide de la flotte, interconnexion IT et formation complète de vos équipes."
  },
  {
    number: "04.",
    title: "Suivi & Optimisation",
    text: "Hotline 24/7, maintenance préventive et ajustement continu des trajets pour garantir la performance."
  }
];

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Centered header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-widest text-orange-500 uppercase flex items-center justify-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            NOTRE MÉTHODOLOGIE
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-16 text-slate-900 text-center tracking-tight"
          >
            Une intégration sur-mesure,<br />
            <span className="text-slate-400 font-light">maîtrisée de A à Z.</span>
          </motion.h2>
        </div>

        {/* 4 columns grid (Process step-by-step) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="border-t border-slate-200 pt-6 flex flex-col group hover:border-orange-500/50 transition-colors duration-300"
            >
              <span className="text-xs font-mono font-bold text-orange-500/80 mb-2 block tracking-wider">
                ÉTAPE {step.number}
              </span>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 group-hover:text-orange-500 transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-base">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
