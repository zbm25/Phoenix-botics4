import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Play, Pause, Volume2, VolumeX, ArrowRight } from "lucide-react";

interface VideoCase {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  videoUrl: string;
  category: "hotel" | "resto" | "industry" | "retail";
}

const CASES_DATA: VideoCase[] = [
  {
    id: "kili-beach",
    title: "Kili Beach",
    subtitle: "Hôtellerie & Resort",
    badge: "Témoignage uServe",
    videoUrl: "https://res.cloudinary.com/df1x718yw/video/upload/v1783504963/uServe_en_Action___Le_Retour_d_Exp%C3%A9rience_du_Kili_Beach_u8ykj6.mp4",
    category: "hotel"
  },
  {
    id: "henriette",
    title: "Henriette Restaurant",
    subtitle: "Restauration Traditionnelle",
    badge: "Témoignage uServe",
    videoUrl: "https://res.cloudinary.com/df1x718yw/video/upload/v1783504966/Plato_%C3%A0_l_Henriette_Restaurant_VO_FR_Sous-titres_en_fran%C3%A7ais_zo3d1o.mp4",
    category: "resto"
  },
  {
    id: "kfc-venise",
    title: "KFC",
    subtitle: "Restauration Rapide",
    badge: "Cas d'usage uClean",
    videoUrl: "https://res.cloudinary.com/df1x718yw/video/upload/v1783460477/uClean_Compact_-_Use_case_KFC_Venise_pbnpdk.mp4",
    category: "retail"
  },
  {
    id: "intralog-01",
    title: "Flux Intralogistique 01",
    subtitle: "Industrie Manufacturière",
    badge: "En action uLog",
    videoUrl: "https://res.cloudinary.com/df1x718yw/video/upload/v1783504930/AQN186O-b3MNcwG13bVdWBzkfIni-dlAw80J18tUykayxG8VZKE1waTNjDuZTbzk00HagIEaJNOxJPn33Zegc2JhlmtV5wVKNSs_m50ixj.mp4",
    category: "industry"
  },
  {
    id: "intralog-02",
    title: "Flux Intralogistique 02",
    subtitle: "Entrepôt & Stockage",
    badge: "En action uLog",
    videoUrl: "https://res.cloudinary.com/df1x718yw/video/upload/v1783504948/AQN6nSJ8lH-1Rcr_yTkG4FwArxweFvyz1k6ApifEXQnEpn-rUhW-00k1WFoS0y3eBzpJLpychG4ZOW7U4SGmxPcoqGEyR8MfMzA_rnjzhs.mp4",
    category: "industry"
  }
];

export const RobotInActionSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Détection si la section est visible à l'écran
  const isInView = useInView(sectionRef, { amount: 0.25 });
  const activeCase = CASES_DATA[activeIndex];

  // Lecture / Pause automatique selon le scroll
  useEffect(() => {
    if (isInView) {
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isInView]);

  // Rechargement au changement d'onglet
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isInView) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [activeIndex]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  return (
    <section 
      id="robots-in-action" 
      ref={sectionRef}
      className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200/60 relative overflow-hidden text-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. En-tête de section centré et compact */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 border border-black/10 rounded-full mb-3 text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-slate-600"
          >
            <span>- RETOURS D'EXPÉRIENCE TERRAIN -</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900 mb-3 leading-tight"
          >
            Nos robots en action : <span className="text-orange-500">l'autonomie en conditions réelles.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 font-light max-w-xl mx-auto"
          >
            Découvrez comment nos clients améliorent leur productivité et sécurisent leurs opérations au quotidien.
          </motion.p>
        </div>

        {/* 2. Grille principale compacte */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Colonne Gauche : Boutons interactifs compacts */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {CASES_DATA.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  aria-label={`Afficher la vidéo : ${item.title}`}
                  className={`w-full p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 relative overflow-hidden flex items-center justify-between gap-3 cursor-pointer group ${
                    isActive 
                      ? "bg-white border-l-4 border-l-orange-500 border border-slate-200/80 shadow-md shadow-orange-500/5 translate-x-1" 
                      : "bg-white/70 border border-slate-200/50 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex flex-col gap-0.5 relative z-10 text-left">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${
                      isActive ? "text-orange-600" : "text-slate-400 group-hover:text-slate-500"
                    } transition-colors`}>
                      {item.badge}
                    </span>
                    <span className={`text-sm sm:text-base font-bold font-display tracking-tight transition-colors ${
                      isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                    }`}>
                      {item.title}
                    </span>
                    <span className="text-xs text-slate-500 font-light">
                      {item.subtitle}
                    </span>
                  </div>

                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isActive 
                      ? "bg-orange-500 text-white shadow-sm scale-105" 
                      : "bg-slate-100 text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500"
                  }`}>
                    <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" aria-hidden="true" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Colonne Droite : Lecteur Vidéo */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 aspect-video group shadow-xl"
            >
              <video
                key={activeCase.id}
                ref={videoRef}
                src={activeCase.videoUrl}
                loop
                muted={isMuted}
                playsInline
                preload="none"
                className="w-full h-full object-cover relative z-10"
                referrerPolicy="no-referrer"
              />

              {/* HUD / Contrôles overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-20 flex flex-col justify-between p-5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-mono uppercase tracking-wider border border-white/10">
                    {activeCase.badge}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="w-11 h-11 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center cursor-pointer transition-transform active:scale-95 shadow-md shadow-orange-500/30 shrink-0"
                      aria-label={isPlaying ? "Pause" : "Lecture"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" aria-hidden="true" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" aria-hidden="true" />}
                    </button>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">{activeCase.title}</h4>
                      <p className="text-[11px] text-slate-300 font-light">{activeCase.subtitle}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Activer le son" : "Couper le son"}
                    className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-colors backdrop-blur-md shrink-0 ${
                      isMuted ? "bg-white/15 hover:bg-white/25 text-white" : "bg-orange-500 text-white shadow-md"
                    }`}
                    title={isMuted ? "Activer le son" : "Couper le son"}
                  >
                    {isMuted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
                  </button>
                </div>

              </div>
            </motion.div>
          </div>

        </div>

        {/* 3. Bouton d'action centré */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-10 sm:mt-12 text-center"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-full transition-all duration-200 shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Demander une étude d'implantation</span>
            <ArrowRight size={15} aria-hidden="true" />
          </a>
          <p className="mt-2.5 text-xs text-slate-500 font-light">
            Audit de faisabilité et simulation ROI sans engagement sous 48h.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
