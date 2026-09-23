import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Plus, 
  Minus 
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { optimizeCloudinaryUrl } from "../data/robotSeries";
import { usePageMeta } from "../hooks/usePageMeta";

export const TechnologyPage: React.FC = () => {
  usePageMeta(
    "Technologie Robotique | Navigation LiDAR SLAM 3D & Connectivité IoT",
    "Navigation sans balise, compatibilité ascenseurs IoT, sécurité certifiée ISO 3691-4 et API REST/WMS : les fondations de l'autonomie industrielle Phoenix."
  );

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    sector: "industry",
    techInterest: "slam-lidar",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleScrollToSegment = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        sector: "industry",
        techInterest: "slam-lidar",
        message: ""
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen text-[#1a1a1a] bg-slate-50 font-sans relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-500/10 via-purple-900/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header Container */}
      <div className="bg-[#0B1121] relative pt-24 sm:pt-28">
        <Header />
      </div>

      <main className="w-full">
        {/* =========================================================================
            1. HERO SECTION TECHNIQUE AVEC IMAGE DE FOND
           ========================================================================= */}
        <section className="py-20 lg:py-28 bg-[#0B1121] text-white border-b border-slate-800/80 relative overflow-hidden">
          {/* Background Image with Dark Contrast Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src={optimizeCloudinaryUrl("https://res.cloudinary.com/df1x718yw/image/upload/v1788866233/ChatGPT_Image_8_sept._2026_11_48_19_kvssfw.png", 1920)} 
              alt="Interface d'orchestration logicielle et cobotique industrielle" 
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1121]/95 via-[#0B1121]/75 to-[#0B1121]/40" />
            <div className="absolute inset-0 bg-[#0B1121]/30 backdrop-blur-[1px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.25em] uppercase font-bold mb-4 block"
            >
              // ÉCOSYSTÈME TECHNOLOGIQUE PHOENIX
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-[1.15] max-w-4xl mx-auto mb-6"
            >
              L'ingénierie autonome <br />
              <span className="text-orange-500 font-light">sans modification d'infrastructure.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 font-light max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Navigation LiDAR 3D temps réel, interfaçage bâtimentaire sans fil (IoT) et supervision multi-flottes : découvrez les briques technologiques qui sécurisent vos flux opérationnels.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <button
                type="button"
                onClick={() => handleScrollToSegment("contact")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-lg shadow-orange-500/25 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Étudier la faisabilité de mon site</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleScrollToSegment("architecture")}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold py-3.5 px-7 rounded-full transition-all text-xs sm:text-sm backdrop-blur-sm cursor-pointer"
              >
                Architecture & Normes
              </button>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            2. LES 4 PILIERS DE L'AUTONOMIE INDUSTRIELLE (DESIGN ÉPURÉ EN COLONNES)
           ========================================================================= */}
        <section className="py-24 bg-[#faf8f5] border-b border-gray-200/60 relative z-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className="text-center max-w-4xl mx-auto mb-20">
              <span className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-4 block">
                - PERCEPTION & NAVIGATION -
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold font-display tracking-tight text-[#0a0f1c] leading-tight">
                4 piliers technologiques <br />
                <span className="text-gray-400 font-light">pour une coactivité fluide et sûre.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
              {/* Pilier 01 */}
              <motion.div 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6 }}
                className="border-t border-gray-300 pt-7 text-left flex flex-col justify-between"
              >
                <div>
                  <span className="text-orange-500 font-mono text-xs tracking-widest uppercase font-bold mb-3 block">
                    PILIER 01.
                  </span>
                  <h3 className="text-xl font-bold text-[#0a0f1c] mb-3">
                    SLAM LiDAR 3D Sans Balise
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light mb-6">
                    Cartographie dynamique centimétrique sans bande magnétique ni réflecteur mural. Le robot se repère instantanément et adapte son parcours en temps réel.
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-start gap-2 text-[11px] font-mono text-slate-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1"></span>
                  Précision d'arrêt ± 5 mm / ± 1°
                </div>
              </motion.div>

              {/* Pilier 02 */}
              <motion.div 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="border-t border-gray-300 pt-7 text-left flex flex-col justify-between"
              >
                <div>
                  <span className="text-orange-500 font-mono text-xs tracking-widest uppercase font-bold mb-3 block">
                    PILIER 02.
                  </span>
                  <h3 className="text-xl font-bold text-[#0a0f1c] mb-3">
                    Vision 3D & Sécurité Active
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light mb-6">
                    Scanners optiques de sécurité et caméras de profondeur. Anticipation des trajectoires piétonnes, contournement d'obstacles et arrêt d'urgence matériel certifié.
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-start gap-2 text-[11px] font-mono text-slate-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1"></span>
                  Conforme ISO 3691-4 & ISO 13849
                </div>
              </motion.div>

              {/* Pilier 03 */}
              <motion.div 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="border-t border-gray-300 pt-7 text-left flex flex-col justify-between"
              >
                <div>
                  <span className="text-orange-500 font-mono text-xs tracking-widest uppercase font-bold mb-3 block">
                    PILIER 03.
                  </span>
                  <h3 className="text-xl font-bold text-[#0a0f1c] mb-3">
                    Ascenseurs & Portes IoT
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light mb-6">
                    Franchissement autonome d'étages et commande automatique des portes industrielles via passerelle sécurisée sans fil pour un transit multi-bâtiments fluide.
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-start gap-2 text-[11px] font-mono text-slate-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1"></span>
                  Mobilité verticale autonome
                </div>
              </motion.div>

              {/* Pilier 04 */}
              <motion.div 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="border-t border-gray-300 pt-7 text-left flex flex-col justify-between"
              >
                <div>
                  <span className="text-orange-500 font-mono text-xs tracking-widest uppercase font-bold mb-3 block">
                    PILIER 04.
                  </span>
                  <h3 className="text-xl font-bold text-[#0a0f1c] mb-3">
                    Fleet RCS & Connecteurs IT
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light mb-6">
                    Gestion centralisée de flottes mixtes. Ordonnancement intelligent des missions, gestion du trafic dans les allées et interfaçage API direct WMS / ERP / MES.
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-start gap-2 text-[11px] font-mono text-slate-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1"></span>
                  Connectivité REST API & WMS
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. SCHÉMA D'ARCHITECTURE SYSTÈME & INTÉGRATION
           ========================================================================= */}
        <section id="architecture" className="py-24 bg-white border-b border-gray-200/60 relative z-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-3 block">
                - ARCHITECTURE FLUX & DONNÉES -
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold font-display tracking-tight text-[#0a0f1c] leading-tight">
                Une intégration fluide{" "}
                <span className="block mt-1 text-gray-400 font-light">
                  avec votre système d'information existant.
                </span>
              </h2>
              <p className="text-gray-600 mt-4 text-sm md:text-base font-light">
                Nos cobots s'insèrent dans votre infrastructure sans rupture logicielle ni modification de vos process métiers.
              </p>
            </div>

            {/* Carte du schéma d'intégration */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-[#0B1121] rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl text-white relative overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-stretch">
                
                {/* Étape 1 */}
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-widest block mb-2">01. COBOTS EMBARQUÉS</span>
                    <h3 className="text-base font-bold text-white mb-2">Robot Edge Hardware</h3>
                    <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                      Calculs de navigation et LiDAR SLAM embarqués localement. Le robot opère en continu même en zone blanche réseau.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">LiDAR 360°</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">Vision 3D</span>
                  </div>
                </div>

                {/* Étape 2 */}
                <div className="bg-white/[0.07] border border-orange-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-lg relative">
                  <div className="bg-orange-500 text-white font-mono text-[9px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider self-start mb-3">
                    Cœur d'intégration
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-widest block mb-2">02. PASSERELLE PHOENIX</span>
                    <h3 className="text-base font-bold text-white mb-2">Ordonnancement & IoT</h3>
                    <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                      Supervision de flotte temps réel, gestion des priorités et commandes sans fil des accès (portes et ascenseurs).
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">MQTT / REST API</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">Passerelle IoT</span>
                  </div>
                </div>

                {/* Étape 3 */}
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-widest block mb-2">03. SYSTÈMES CLIENTS</span>
                    <h3 className="text-base font-bold text-white mb-2">Outils Métiers & SI</h3>
                    <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                      Déclenchement automatique des ordres de transport et synchronisation d'état avec vos progiciels.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">WMS / ERP / MES</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">PMS Hôtelier</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            4. SÉCURITÉ INDUSTRIELLE & DIRECTIVES CERTIFIÉES
           ========================================================================= */}
        <section className="py-20 bg-[#faf8f5] border-b border-gray-200/60 relative z-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8 pb-8 border-b border-gray-200">
                <div className="text-left max-w-xl">
                  <span className="text-orange-500 font-mono text-xs font-bold uppercase tracking-widest block mb-2">
                    // SÉCURITÉ & CONFORMITÉ
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#0a0f1c] leading-snug">
                    Conformité stricte aux directives européennes
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-lg border border-emerald-500/20">
                    CE
                  </div>
                  <p className="text-xs text-gray-500 font-mono leading-tight text-left">
                    Directives Européennes <br />Machines, CEM & Radio
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                <div>
                  <h4 className="text-xs font-bold font-mono text-orange-600 uppercase mb-2">Directive Machines</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    ISO 12100 (Évaluation des risques), ISO 13849 & ISO 13850 (Sécurité des commandes & Arrêt d'urgence).
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold font-mono text-orange-600 uppercase mb-2">Véhicules Industriels</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    Conforme ISO 3691-4 pour la coactivité hommes-machines et la gestion des zones de croisement.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold font-mono text-orange-600 uppercase mb-2">Compatibilité CEM</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    EN IEC 62196, IEC 61000-6-2 & IEC 61000-6-4 pour l'immunité aux perturbations électromagnétiques d'usine.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold font-mono text-orange-600 uppercase mb-2">Radio & Données</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    Directive RED (ETSI EN 300 238 / 301 908) et traitement local des flux vidéo dans le respect du RGPD.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            5. SECTION FAQ TECHNIQUE & DSI
           ========================================================================= */}
        <section className="py-24 bg-white border-b border-gray-200/60 relative z-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-semibold tracking-widest text-orange-500 uppercase flex items-center justify-center gap-2 mb-3 font-mono">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                FAQ INGÉNIERIE & DSI
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-[#0a0f1c] tracking-tight">
                Questions techniques <span className="text-orange-500">fréquentes.</span>
              </h2>
              <p className="text-slate-500 font-light mt-4 text-sm sm:text-base">
                Les réponses concrètes aux exigences d'intégration logicielle, de réseau et de sécurité industrielle.
              </p>
            </div>

            <div className="space-y-4 bg-[#faf8f5] p-6 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm text-left">
              {[
                {
                  q: "Les robots nécessitent-ils une modification de l'infrastructure ou du Wi-Fi ?",
                  a: "Non. Grâce à leur navigation LiDAR SLAM 3D embarquée, les calculs de trajectoire s'effectuent localement dans le robot. Ils n'ont besoin d'aucune bande magnétique, ni réflecteur au sol, et continuent d'opérer même en zone blanche réseau sans interruption."
                },
                {
                  q: "Comment est garantie la sécurité des opérateurs en environnement partagé (coactivité) ?",
                  a: "Nos flottes sont conformes à la directive machines et à la norme ISO 3691-4. Elles combinent des scanners laser optiques à 360°, des caméras 3D de détection d'obstacles et un arrêt d'urgence matériel certifié. Le robot ralentit, anticipe et contourne les piétons en toute sécurité."
                },
                {
                  q: "Comment s'interface la flotte avec nos logiciels métiers (WMS / ERP / MES) ?",
                  a: "Notre serveur d'ordonnancement de flotte (Fleet RCS) dispose d'une API REST et de WebSockets sécurisés. Nous pouvons déclencher automatiquement des missions de transport ou de nettoyage depuis votre WMS et remonter les statuts en temps réel."
                },
                {
                  q: "Comment fonctionne le franchissement des portes automatiques et ascenseurs ?",
                  a: "Nous installons une passerelle IoT industrielle sans fil sur vos contrôleurs d'accès. Le robot communique de façon sécurisée avec l'ascenseur pour appeler la cabine, monter à l'étage cible et franchir les sas sans assistance humaine."
                }
              ].map((item, idx) => (
                <div key={idx} className="border-b border-gray-200/80 pb-4 last:border-b-0 last:pb-0">
                  <button
                    type="button"
                    aria-expanded={openFaq === idx}
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center text-left py-2 gap-4 cursor-pointer font-bold text-slate-900 hover:text-orange-600 transition-colors"
                  >
                    <span className="text-base sm:text-lg">{item.q}</span>
                    <span className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 text-orange-500">
                      {openFaq === idx ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-slate-600 font-light text-sm sm:text-base pt-2 leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. FORMULAIRE B2B D'ÉTUDE TECHNIQUE
           ========================================================================= */}
        <section id="contact" className="py-20 sm:py-28 bg-slate-50 relative z-20 overflow-hidden scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0B1121] rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-14 border border-slate-800 shadow-[0_20px_60px_rgba(11,17,33,0.35)] relative overflow-hidden text-white"
            >
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start relative z-10">
                {/* Colonne Gauche : Coordonnées */}
                <div className="lg:col-span-5 flex flex-col justify-between text-left h-full">
                  <div>
                    <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
                      ÉTUDE DE FAISABILITÉ
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight mb-4">
                      Validez l'éligibilité technique <br />
                      <span className="text-orange-500">de votre site.</span>
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                      Nos ingénieurs analysent vos plans, la nature de vos sols et vos contraintes réseau pour valider l'intégration robotique. Sans engagement.
                    </p>
                  </div>

                  <div className="space-y-4 border-t border-slate-800/80 pt-6 mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
                        <Zap size={17} />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">LIGNE DIRECTE</p>
                        <p className="text-sm font-mono text-white font-bold">+33 (0)1 45 42 09 00</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
                        <ShieldCheck size={17} />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">SUPPORT INGÉNIERIE</p>
                        <p className="text-sm font-mono text-white font-medium">contact@phoenix-botics.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colonne Droite : Formulaire */}
                <div className="lg:col-span-7">
                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="tech-contact-name" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                              Nom & Prénom <span className="text-orange-500">*</span>
                            </label>
                            <input
                              id="tech-contact-name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Jean Dupont"
                              className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs placeholder-slate-500 outline-none transition-all"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="tech-contact-email" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                              Email Professionnel <span className="text-orange-500">*</span>
                            </label>
                            <input
                              id="tech-contact-email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="j.dupont@entreprise.fr"
                              className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs placeholder-slate-500 outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="tech-contact-company" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                              Entreprise / Site <span className="text-orange-500">*</span>
                            </label>
                            <input
                              id="tech-contact-company"
                              name="company"
                              type="text"
                              required
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="Nom de l'établissement"
                              className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs placeholder-slate-500 outline-none transition-all"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="tech-contact-sector" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                              Secteur d'Activité <span className="text-orange-500">*</span>
                            </label>
                            <select
                              id="tech-contact-sector"
                              name="sector"
                              value={formData.sector}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs outline-none transition-all cursor-pointer appearance-none"
                            >
                              <option value="industry">Logistique & Industrie</option>
                              <option value="health">Santé & Médical (Hôpitaux, Cliniques)</option>
                              <option value="retail">Retail & Grande Distribution</option>
                              <option value="hospitality">Hôtellerie & Restauration</option>
                              <option value="other">Autre secteur</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="tech-contact-interest" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                            Brique technologique prioritaire <span className="text-orange-500">*</span>
                          </label>
                          <select
                            id="tech-contact-interest"
                            name="techInterest"
                            value={formData.techInterest}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs outline-none transition-all cursor-pointer appearance-none"
                          >
                            <option value="slam-lidar">Cartographie SLAM & Navigation sans infrastructure</option>
                            <option value="wms-erp">Interfaçage API avec WMS / ERP / MES</option>
                            <option value="iot-doors">Franchissement portes automatiques & ascenseurs (IoT)</option>
                            <option value="fleet-rcs">Supervision multi-robots (Fleet RCS)</option>
                            <option value="global-audit">Audit global de faisabilité technique de site</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="tech-contact-message" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                            Contraintes de site & Détails techniques
                          </label>
                          <textarea
                            id="tech-contact-message"
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Typologie des sols, superficie, flux de passage ou systèmes existants à interfacer..."
                            className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs placeholder-slate-500 outline-none transition-all resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/25 cursor-pointer flex items-center justify-center gap-2 border-none mt-2"
                        >
                          <span>{isSubmitting ? "Transmission en cours..." : "Demander une étude de faisabilité"}</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </button>
                      </form>
                    ) : (
                      <div className="text-center py-12 space-y-4 flex flex-col justify-center items-center">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <CheckCircle2 size={28} />
                        </div>
                        <h3 className="text-xl font-display font-bold text-white">Demande technique reçue avec succès !</h3>
                        <p className="text-slate-400 text-xs max-w-sm font-light leading-relaxed">
                          Un ingénieur d'application étudiera la configuration de votre site et prendra contact sous 48h.
                        </p>
                        <button
                          type="button"
                          onClick={() => setFormSubmitted(false)}
                          className="px-5 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer mt-2"
                        >
                          Envoyer une autre demande
                        </button>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
