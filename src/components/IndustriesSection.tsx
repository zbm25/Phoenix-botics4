import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Utensils, 
  HeartPulse, 
  Warehouse, 
  ChevronRight, 
  Play, 
  Pause,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface Industry {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  defi: string;
  reponse: string;
  cobots: string[];
  bgImage: string; // Variables préparées vides selon spécification, avec fallback esthétique intégré
}

const INDUSTRIES_DATA: Industry[] = [
  {
    id: "retail",
    title: "Retail & Commerce",
    subtitle: "Grande distribution, boutiques",
    metric: "+20% d'engagement client",
    defi: "Flux clients irréguliers et manque d'orientation en magasin.",
    reponse: "Accueil interactif des clients et réassort automatisé des rayons.",
    cobots: ["uServe", "uLog Deliver", "uClean"],
    bgImage: "" // Variable vide prête pour l'intégration de votre URL d'image
  },
  {
    id: "hospitality",
    title: "Hôtellerie & Restauration",
    subtitle: "Hôtels, restaurants, hospitality",
    metric: "3h à 4h gagnées / jour",
    defi: "Tâches de portage pénibles de vaisselle et surcharge de service.",
    reponse: "Nos cobots assurent le transfert de plats pour recentrer les serveurs.",
    cobots: ["uServe", "uLog Deliver", "uClean"],
    bgImage: "" // Variable vide prête pour l'intégration de votre URL d'image
  },
  {
    id: "health",
    title: "Santé & Médical",
    subtitle: "Hôpitaux, cliniques, EHPAD",
    metric: "-35% de déplacements perdus",
    defi: "Soignants surchargés de manutention et déplacements annexes.",
    reponse: "Routage autonome du linge, repas et consommables médicaux.",
    cobots: ["uLog Deliver", "uClean"],
    bgImage: "" // Variable vide prête pour l'intégration de votre URL d'image
  },
  {
    id: "industry",
    title: "Logistique & Industrie",
    subtitle: "Entrepôts, usines, intralogistique",
    metric: "+15% de productivité",
    defi: "Liaison logistique répétitive de charges légères entre postes.",
    reponse: "Navettes mobiles intelligentes connectant vos lignes de production.",
    cobots: ["uClean", "uLog Deliver", "uLog Lift"],
    bgImage: "" // Variable vide prête pour l'intégration de votre URL d'image
  }
];

// Fallback high-quality Unsplash images representing each industry nicely if user leaves bgImage empty
const FALLBACK_IMAGES: Record<string, string> = {
  retail: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80",
  hospitality: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  health: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  industry: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
};

// Icons map for easy custom rendering
const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
  retail: <ShoppingBag className="w-5 h-5" />,
  hospitality: <Utensils className="w-5 h-5" />,
  health: <HeartPulse className="w-5 h-5" />,
  industry: <Warehouse className="w-5 h-5" />
};

export const IndustriesSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Custom manual state to pause autoplay permanently
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  // Auto-défilement toutes les 12 secondes
  useEffect(() => {
    if (autoplayPaused) {
      setProgress(0);
      return;
    }

    const intervalTime = 50; // mise à jour toutes les 50ms pour une fluidité absolue
    const totalDuration = 12000; // 12 secondes
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % INDUSTRIES_DATA.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [autoplayPaused, activeIndex]);

  // Click handler on tabs pauses autoplay permanently
  const handleSelectIndustry = (index: number) => {
    setAutoplayPaused(true);
    setActiveIndex(index);
    setProgress(0);
  };

  // Hovering the right panel pauses autoplay permanently
  const handleRightPanelEnter = () => {
    setAutoplayPaused(true);
    setProgress(0);
  };

  const activeIndustry = INDUSTRIES_DATA[activeIndex];
  const activeBgImage = activeIndustry.bgImage || FALLBACK_IMAGES[activeIndustry.id];

  return (
    <section 
      id="industries" 
      className="py-24 bg-slate-50 border-b border-slate-100 relative overflow-hidden"
    >
      {/* Visual ambient gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-100/10 via-purple-50/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-slate-100/20 via-slate-200/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. En-tête de la section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200/80 shadow-xs rounded-full mb-4 text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-slate-400"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span>Verticales d'intégration</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 mb-6"
          >
            Des industries clés équipées en <span className="text-orange-500 font-extrabold">robots de service</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-light leading-relaxed"
          >
            Découvrez comment nos cobots mobiles résolvent les pénibilités opérationnelles et optimisent la productivité de chaque secteur.
          </motion.p>
        </div>

        {/* Layout Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* PANNEAU DE GAUCHE : Onglets Interactifs */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            
            {/* Desktop Tabs list */}
            <div className="hidden lg:flex flex-col gap-4">
              {INDUSTRIES_DATA.map((industry, index) => {
                const isActive = index === activeIndex;
                
                return (
                  <button
                    key={industry.id}
                    onClick={() => handleSelectIndustry(index)}
                    className={`text-left w-full p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden select-none cursor-pointer flex items-center justify-between gap-4 ${
                      isActive 
                        ? "bg-white border-slate-200 shadow-md translate-x-1.5" 
                        : "bg-transparent border-transparent hover:bg-white/40 hover:border-slate-200/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon with state-dependent color accent */}
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive 
                          ? "bg-orange-50 text-orange-500 border border-orange-100" 
                          : "bg-slate-200/50 text-slate-400"
                      }`}>
                        {INDUSTRY_ICONS[industry.id]}
                      </div>

                      {/* Headings with orange accent transition when active, subtitle remains gray */}
                      <div>
                        <span className={`text-base font-bold block leading-tight mb-1 transition-colors duration-300 ${
                          isActive ? "text-orange-500" : "text-slate-800"
                        }`}>
                          {industry.title}
                        </span>
                        <span className="text-xs block leading-snug font-light text-slate-500 mb-1.5">
                          {industry.subtitle}
                        </span>
                        <span className={`text-xs font-semibold block leading-none transition-colors duration-300 ${
                          isActive ? "text-orange-500" : "text-slate-400"
                        }`}>
                          {industry.metric}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? "text-orange-500 translate-x-1" : "text-slate-300"
                    }`} />

                    {/* Accent border highlight on the left */}
                    {isActive && (
                      <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-b from-orange-500 to-orange-400" />
                    )}

                    {/* Progress Bar Line at the bottom of active tab (if autoplay is not permanently paused) */}
                    {isActive && !autoplayPaused && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-100 overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 transition-all duration-75 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Fallback Navigation (Horizontal scrollable tabs) */}
            <div className="lg:hidden w-full overflow-x-auto pb-4 flex gap-3 scrollbar-none snap-x">
              {INDUSTRIES_DATA.map((industry, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={industry.id}
                    onClick={() => handleSelectIndustry(index)}
                    className={`snap-center shrink-0 flex items-center gap-3 px-5 py-4 rounded-xl border transition-all duration-300 select-none cursor-pointer relative overflow-hidden ${
                      isActive 
                        ? "bg-white border-slate-200 shadow-sm" 
                        : "bg-slate-200/30 border-transparent text-slate-600"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      isActive ? "bg-orange-50 text-orange-500" : "bg-slate-200 text-slate-400"
                    }`}>
                      {INDUSTRY_ICONS[industry.id]}
                    </div>
                    <div className="text-left">
                      <p className={`text-xs font-bold whitespace-nowrap transition-colors duration-300 ${
                        isActive ? "text-orange-500" : "text-slate-800"
                      }`}>
                        {industry.title}
                      </p>
                      <span className="text-[9px] block whitespace-nowrap text-slate-500 my-0.5">
                        {industry.subtitle}
                      </span>
                      <span className={`text-[10px] font-semibold block whitespace-nowrap transition-colors duration-300 ${
                        isActive ? "text-orange-500" : "text-slate-400"
                      }`}>
                        {industry.metric}
                      </span>
                    </div>

                    {/* Mobile Progress Bar Line */}
                    {isActive && !autoplayPaused && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-100 overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 transition-all duration-75 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Interactive Control indicator panel */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAutoplayPaused(!autoplayPaused)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer shrink-0 ${
                    autoplayPaused ? "bg-amber-500 text-white" : "bg-orange-500 text-white animate-pulse"
                  }`}
                  title={autoplayPaused ? "Relancer l'auto-défilement" : "Suspendre l'auto-défilement"}
                >
                  {autoplayPaused ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 translate-x-0.5" />
                  )}
                </button>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    {autoplayPaused ? "Défilement figé" : "Auto-défilement Actif (12s)"}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {autoplayPaused 
                      ? "Le carrousel est stabilisé sur votre choix." 
                      : "S'arrête au survol du panneau ou clic onglet."}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-1.5">
                {INDUSTRIES_DATA.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectIndustry(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeIndex ? "w-6 bg-orange-500" : "w-1.5 bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* PANNEAU DE DROITE : Affichage Dynamique Premium */}
          <div 
            className="lg:col-span-7 relative h-auto lg:h-full min-h-[560px] sm:min-h-[520px]"
            onMouseEnter={handleRightPanelEnter}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative lg:absolute lg:inset-0 w-full h-auto lg:h-full bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200/10 flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-white group"
              >
                {/* 3. Image de fond avec assombrissement fort (bg-slate-950/80 et backdrop-blur-xs) */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                  <img
                    src={activeBgImage}
                    alt={activeIndustry.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-[12000ms] ease-out group-hover:scale-105"
                  />
                  {/* Filtre d'assombrissement fort */}
                  <div className="absolute inset-0 bg-slate-950/80 z-10" />
                  <div className="absolute inset-0 backdrop-blur-xs z-10" />
                </div>

                {/* Badge métrique en haut */}
                <div className="relative z-20 flex items-center">
                  <span className="text-xs font-mono font-bold tracking-wider px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-orange-400">
                    {activeIndustry.metric}
                  </span>
                </div>

                {/* Contenu textuel principal (Défi & Réponse Phoenix) */}
                <div className="relative z-20 my-auto pt-6 pb-6">
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white mb-6">
                    {activeIndustry.title}
                  </h3>
                  
                  {/* Section DÉFI */}
                  <div className="mb-6 max-w-xl">
                    <span className="text-[10px] text-orange-500 font-bold tracking-widest uppercase block mb-1.5 font-mono">
                      DÉFI
                    </span>
                    <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed">
                      {activeIndustry.defi}
                    </p>
                  </div>

                  <div className="w-16 h-[1.5px] bg-gradient-to-r from-orange-500 via-rose-500 to-transparent my-4" />

                  {/* Section RÉPONSE PHOENIX */}
                  <div className="max-w-xl">
                    <span className="text-[10px] text-orange-500 font-bold tracking-widest uppercase block mb-1.5 font-mono">
                      RÉPONSE PHOENIX
                    </span>
                    <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed">
                      {activeIndustry.reponse}
                    </p>
                  </div>
                </div>

                {/* Robots recommandés en bas de carte - Alignement horizontal parfait */}
                <div className="relative z-20 pt-5 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest shrink-0">
                      Robots recommandés :
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeIndustry.cobots.map((cobot, idx) => (
                        <span 
                          key={idx} 
                          className="bg-black/50 border border-white/10 px-3 py-1 text-xs rounded-full font-mono text-slate-200 select-none hover:bg-orange-500/30 hover:border-orange-500/50 transition-colors duration-200"
                        >
                          {cobot}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate(`/industries/${activeIndustry.id}`)}
                    className="w-full sm:w-auto justify-center px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-orange-500/20 shrink-0 cursor-pointer"
                  >
                    <span>Découvrir ce secteur</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Dynamic call-to-action banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 bg-white rounded-2xl border border-slate-100 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs relative overflow-hidden"
        >
          {/* Subtle line decoration on top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-500" />
          
          <div className="text-left relative z-10">
            <h4 className="text-base font-bold text-slate-900 mb-1">
              Vous faites face à d'autres problématiques de pénibilité ou de recrutement ?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 font-light">
              Nos ingénieurs d’application réalisent un prédiagnostic de vos flux et de vos contraintes d’exploitation sous 48 heures.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) {
                const headerOffset = 90;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }
            }}
            className="shrink-0 relative z-10 px-5 py-2.5 bg-slate-900 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors duration-300 text-center cursor-pointer shadow-sm hover:shadow-md"
          >
            Obtenir un prédiagnostic
          </button>
        </motion.div>

      </div>
    </section>
  );
};
