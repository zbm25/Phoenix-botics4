import React from "react";
import { motion } from "motion/react";

export interface ProcessStep {
  number: string;
  title: string;
  text: string;
}

const DEFAULT_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Cadrage du besoin",
    text: "Analyse approfondie de vos flux opérationnels, de vos contraintes de site et de vos objectifs métiers."
  },
  {
    number: "02",
    title: "Étude de site",
    text: "Relevé technique sur le terrain : cartographie des circulations, analyse des sols, portes et ascenseurs."
  },
  {
    number: "03",
    title: "Recommandation de configuration",
    text: "Dimensionnement sur-mesure de la flotte cobotique, préconisation des modèles et modélisation du ROI."
  },
  {
    number: "04",
    title: "Validation technique / test terrain",
    text: "Mise en situation réelle ou preuve de concept (POC) sur vos trajectoires pour valider l'efficience."
  },
  {
    number: "05",
    title: "Déploiement et formation",
    text: "Intégration IT/WMS, cartographie SLAM fine, paramétrage des missions et formation de vos équipes."
  },
  {
    number: "06",
    title: "Suivi d'exploitation",
    text: "Supervision SaaS, support technique dédié, maintenance préventive et optimisation continue des flux."
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
  steps = DEFAULT_STEPS,
  titleLine1 = "Méthode de déploiement maîtrisée,",
  titleLine2 = "du diagnostic au suivi opérationnel.",
  eyebrow = "MÉTHODOLOGIE D'INTÉGRATION",
  className = "bg-white py-24"
}) => {
  return (
    <section id="process" className={`${className} relative overflow-hidden border-t border-slate-100 z-20`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Centered header */}
        <div className="text-center max-w-3xl mx-auto">
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
            className="text-3xl md:text-5xl font-bold font-display mt-4 mb-16 text-slate-900 text-center tracking-tight"
          >
            {titleLine1}<br />
            <span className="text-slate-400 font-light">{titleLine2}</span>
          </motion.h2>
        </div>

        {/* 6 columns or 3x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-50/70 border border-slate-200/80 p-6 sm:p-8 rounded-2xl flex flex-col group hover:border-orange-500/50 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200 tracking-wider">
                  ÉTAPE {step.number}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900 group-hover:text-orange-600 transition-colors duration-200 font-display">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-light text-xs sm:text-sm">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
