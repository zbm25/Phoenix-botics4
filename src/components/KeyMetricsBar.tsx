import React from "react";
import { motion } from "motion/react";
import { IconRenderer } from "./IconRenderer";
import { fadeUp, staggerContainer } from "../motion/variants";

export const KeyMetricsBar: React.FC = () => {
  const metrics = [
    {
      title: "100+ robots de service en exploitation",
      description: "Flottes opérationnelles déployées chez nos clients.",
      icon: "Activity",
    },
    {
      title: "4 secteurs clés",
      description: "Retail, hôtellerie, santé, laboratoires & industrie.",
      icon: "Layers",
    },
    {
      title: "99,4 % de SLA respecté",
      description: "Disponibilité contractuelle de vos robots.",
      icon: "ShieldCheck",
    },
  ];

  return (
    <section className="bg-white border-y border-gray-200/80 py-10 relative z-10 shadow-sm">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className={`flex items-start gap-4 px-4 ${
                idx !== 0 ? "md:border-l md:border-gray-200/70" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-orange-500/5 border border-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                <IconRenderer name={metric.icon} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 tracking-tight leading-tight mb-1">
                  {metric.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
