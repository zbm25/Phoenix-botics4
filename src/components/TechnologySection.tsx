import React from "react";
import { motion } from "motion/react";
import { TECHNOLOGY_PILLARS } from "../data";
import { IconRenderer } from "./IconRenderer";

export const TechnologySection: React.FC = () => {
  return (
    <section id="technology" className="py-24 relative overflow-hidden cobiot-grid-bg">
      {/* Visual glowing center */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-purple-900/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/5 border border-black/10 rounded-full w-fit mb-4 text-[10px] uppercase tracking-widest font-semibold text-slate-600">
            <span>Écosystème Technologique</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 mb-6">
            Une plateforme modulaire de robotique de service, <br />
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              infiniment connectée
            </span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            Phoenix‑Botics interconnecte vos robots de service au cœur de votre infrastructure informatique. Grâce à nos connecteurs et nos APIs sécurisées, nous raccordons chaque flotte aux logiciels de caisse, ERP, PMS hôteliers et systèmes de supervision cloud pour exploiter vos données en temps réel en vue d'une parfaite intégration métier.
          </p>
        </div>

        {/* Dynamic Architect Flowchart Diagram - High-tech visual mock */}
        <div className="mb-20 p-6 sm:p-10 rounded-2xl bg-[color:var(--color-surface-card)] border border-gray-200 relative shadow-xl">
          
          {/* Subtle blueprint grid overlay */}
          <div className="absolute inset-4 rounded-xl border border-dashed border-gray-150 -z-10" />
          
          <div className="text-center mb-10">
            <h4 className="text-xs sm:text-sm uppercase tracking-widest font-mono font-bold text-orange-500">
              MODÈLE D'INTÉGRATION SYSTÈME PHOENIX-BOTICS
            </h4>
            <p className="text-[10px] text-slate-500 font-mono mt-1">Interfaçage bidirectionnel cloud & matériel</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center relative">
            
            {/* Step 1: Robot Edge Hardware */}
            <div className="lg:col-span-3 p-4 rounded-xl bg-black/5 border border-black/5 text-center text-left">
              <span className="text-[9px] font-mono text-orange-500 uppercase block mb-1">01. CAPTEURS EMBARQUÉS</span>
              <h5 className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider mb-2">Robot Edge Hardware</h5>
              <p className="text-[11px] text-[color:var(--color-text-muted)] leading-tight mb-3">Vision 3D Depth, LiDAR 360°, Télémètrie Infrarouge.</p>
              <div className="flex justify-center gap-1 flex-wrap">
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-550">Fast SLAM Navigation</span>
              </div>
            </div>

            {/* Path connector 1 */}
            <div className="lg:col-span-1 flex justify-center py-2 lg:py-0">
              <span className="hidden lg:inline text-orange-400 font-mono text-lg font-bold animate-pulse">⟶</span>
              <span className="lg:hidden text-orange-400 font-mono text-lg font-bold animate-pulse">↓</span>
            </div>

            {/* Step 2: Custom SDK Gateway */}
            <div className="lg:col-span-3 p-5 rounded-xl bg-orange-500/5 border border-orange-500/20 text-center relative shadow-lg shadow-orange-500/5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded bg-orange-600 text-[8px] uppercase tracking-wider font-bold font-mono text-white">
                Cœur d'intégration
              </div>
              <span className="text-[9px] font-mono text-orange-500 uppercase block mb-1">02. PASSERELLE API</span>
              <h5 className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider mb-2">Phoenix-Botics Router</h5>
              <p className="text-[11px] text-[color:var(--color-text-muted)] leading-tight mb-3">Protocoles MQTT, WebSocket de télémétrie en temps réel et ordonnanceur intelligent.</p>
              <div className="flex justify-center gap-1.5">
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600">WebSocket SSL</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600">HTTPS REST</span>
              </div>
            </div>

            {/* Path connector 2 */}
            <div className="lg:col-span-1 flex justify-center py-2 lg:py-0">
              <span className="hidden lg:inline text-orange-400 font-mono text-lg font-bold animate-pulse">⟶</span>
              <span className="lg:hidden text-orange-400 font-mono text-lg font-bold animate-pulse">↓</span>
            </div>

            {/* Step 3: Client Business Suite */}
            <div className="lg:col-span-3 p-4 rounded-xl bg-black/5 border border-black/5 text-center text-left">
              <span className="text-[9px] font-mono text-orange-500 uppercase block mb-1">03. RECEPTION SYSTÈME</span>
              <h5 className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider mb-2">Outils Métiers Client</h5>
              <p className="text-[11px] text-[color:var(--color-text-muted)] leading-tight mb-3">Intégration instantanée avec vos applications clés quotidiennes.</p>
              <div className="grid grid-cols-2 gap-1.5">
                <span className="text-[9px] font-mono p-1 rounded bg-black/5 text-slate-705">PMS Hôtelier</span>
                <span className="text-[9px] font-mono p-1 rounded bg-black/5 text-slate-705">Logiciels Caisse</span>
                <span className="text-[9px] font-mono p-1 rounded bg-black/5 text-slate-705">SCADA Entrepôt</span>
                <span className="text-[9px] font-mono p-1 rounded bg-black/5 text-slate-705">Systèmes Alarmes</span>
              </div>
            </div>

          </div>
        </div>

        {/* 5 Core Pillars detailed lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {TECHNOLOGY_PILLARS.map((pillar, index) => {
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-5 border border-gray-200 bg-[color:var(--color-surface-card)] rounded-xl hover:border-orange-500/40 transition-all duration-300 group text-center lg:text-left flex flex-col justify-start shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500/5 border border-orange-500/15 flex items-center justify-center text-orange-500 group-hover:bg-orange-500/20 group-hover:text-orange-400 transition-all duration-300 mb-4 mx-auto lg:mx-0">
                  <IconRenderer name={pillar.iconName} size={18} />
                </div>
                
                <h3 className="text-sm font-display font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                  {pillar.title}
                </h3>
                
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
