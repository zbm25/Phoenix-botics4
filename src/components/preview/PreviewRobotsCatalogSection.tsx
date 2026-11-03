import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, TrendingUp, Calculator, X } from "lucide-react";

export const PreviewRobotsCatalogSection: React.FC = () => {
  const [showRoiSelector, setShowRoiSelector] = useState(false);

  return (
    <section className="py-20 lg:py-28 bg-[#ffffff] text-[#0C111D] font-sans" id="preview-robots-catalog">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* En-tête centré avec badge pilule */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-wider uppercase">
            Nos Gammes de Robots
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0C111D]">
            Une flotte unifiée pour <br />
            <span className="text-[#F97316]">transformer vos opérations.</span>
          </h2>
        </div>

        {/* Grille Bento principale (12 colonnes, gap 2rem) */}
        <div className="space-y-8">

          {/* LIGNE 1 : uClean (7 cols) + ROI (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bento-row-1">

            {/* CARTE 1 — uClean (Col 7) */}
            <div className="lg:col-span-7 bg-[#F2F4F7] rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden min-h-[420px] border border-slate-200/60 shadow-sm group">
              <div className="relative w-full h-56 sm:h-64 mb-6 flex items-center justify-center overflow-hidden rounded-2xl bg-white">
                <img
                  src="https://res.cloudinary.com/df1x718yw/image/upload/v1793705586/Gemini_Generated_Image_tnr3t6tnr3t6tnr3_nhjogh.jpg"
                  alt="Flotte robotique uClean"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-4 z-10">
                <span className="text-xs font-bold tracking-widest text-[#F97316] uppercase">
                  Hygiène & Propreté Autonome
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0C111D]">
                  Série uClean
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                  Des aspirateurs compacts aux autolaveuses industrielles (jusqu'à 3 000 m²/h).
                  Libérez vos équipes des tâches répétitives avec une régularité irréprochable.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to="/robots/uclean-series"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0C111D] hover:bg-[#F97316] text-white text-sm font-bold transition-colors duration-200"
                  >
                    Découvrir la gamme uClean
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* CARTE 2 — Module Simulateur ROI (Col 5) */}
            <div className="lg:col-span-5 bg-[#F2F4F7] rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-slate-200/60 shadow-sm group relative">
              <div className="w-full h-44 sm:h-52 flex items-end justify-between gap-3 px-4 pb-4 bg-white/70 rounded-2xl border border-slate-200/50 mb-6">
                <div className="w-1/4 bg-slate-200 rounded-t-lg h-[25%]" />
                <div className="w-1/4 bg-slate-300 rounded-t-lg h-[50%]" />
                <div className="w-1/4 bg-slate-400 rounded-t-lg h-[75%]" />
                <div className="w-1/4 bg-[#F97316] rounded-t-lg h-[95%] relative flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <TrendingUp className="w-5 h-5 text-white -mt-2" />
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Rentabilité & Économies
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0C111D]">
                  Simulateurs de rentabilité
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Estimez vos gains de productivité et votre seuil de rentabilité grâce à nos calculateurs de retour sur investissement dédiés par gamme.
                </p>
                <div className="pt-2">
                  <button
                    id="open-roi-selector"
                    onClick={() => setShowRoiSelector(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0C111D] hover:bg-[#F97316] text-white text-sm font-bold transition-colors duration-200 w-full justify-center sm:w-auto sm:justify-start cursor-pointer"
                  >
                    <Calculator className="w-4 h-4" />
                    Choisir un simulateur
                  </button>
                </div>
              </div>

              {/* Sélecteur ROI Modale in-card */}
              <AnimatePresence>
                {showRoiSelector && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 rounded-3xl p-8 flex flex-col justify-center border border-slate-200"
                  >
                    <button
                      onClick={() => setShowRoiSelector(false)}
                      className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 cursor-pointer"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <h4 className="text-xl font-bold mb-6 text-center">Sélectionnez une gamme</h4>
                    <div className="space-y-3">
                      <Link to="/robots/uclean-series#simulateur-roi" className="block w-full py-3 px-4 rounded-xl bg-[#F2F4F7] hover:bg-orange-50 border border-slate-200 hover:border-orange-200 text-center font-semibold text-slate-800 transition-colors">
                        Simulateur uClean (Propreté)
                      </Link>
                      <Link to="/robots/ulog-series#simulateur-roi" className="block w-full py-3 px-4 rounded-xl bg-[#F2F4F7] hover:bg-orange-50 border border-slate-200 hover:border-orange-200 text-center font-semibold text-slate-800 transition-colors">
                        Simulateur uLog (Logistique)
                      </Link>
                      <Link to="/robots/userve-series#simulateur-roi" className="block w-full py-3 px-4 rounded-xl bg-[#F2F4F7] hover:bg-orange-50 border border-slate-200 hover:border-orange-200 text-center font-semibold text-slate-800 transition-colors">
                        Simulateur uServe (Accueil)
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* LIGNE 2 : uLog (5 cols) + uServe (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bento-row-2">

            {/* CARTE 3 — uLog (Col 5) */}
            <div className="lg:col-span-5 bg-[#F2F4F7] rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-slate-200/60 shadow-sm group">
              <div className="relative w-full h-52 mb-6 flex items-center justify-center bg-white/60 rounded-2xl p-4">
                <img
                  src="https://res.cloudinary.com/df1x718yw/image/upload/v1782747964/uLogLIFT600_URGlogo_01_face_xgxuh0.png"
                  alt="Robot uLog Lift 600"
                  className="max-h-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-[#F97316] uppercase">
                  Intralogistique & Manutention AMR
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0C111D]">
                  Série uLog
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Transport autonome de charges (jusqu'à 600 kg pour certains modèles). Intégration aux flux logistiques existants et options de franchissement d'ascenseurs.
                </p>
                <div className="pt-2">
                  <Link
                    to="/robots/ulog-series"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0C111D] hover:bg-[#F97316] text-white text-sm font-bold transition-colors duration-200"
                  >
                    Découvrir la gamme uLog
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* CARTE 4 — uServe (Col 7) */}
            <div className="lg:col-span-7 bg-[#F2F4F7] rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-slate-200/60 shadow-sm group">
              <div className="relative w-full h-52 mb-6 flex items-center justify-center bg-white/60 rounded-2xl p-4">
                <img
                  src="https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png"
                  alt="Robot d'accueil uServe"
                  className="max-h-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-[#F97316] uppercase">
                  Accueil & Service Interactif
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0C111D]">
                  Série uServe
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                  Assistance à l'accueil et à l'orientation. Guidage physique et interaction dans de nombreuses langues pour les espaces ouverts au public.
                </p>
                <div className="pt-2">
                  <Link
                    to="/robots/userve-series"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0C111D] hover:bg-[#F97316] text-white text-sm font-bold transition-colors duration-200"
                  >
                    Découvrir la gamme uServe
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* LIGNE 3 : uLab Mobile (Pleine Largeur 12 colonnes) */}
          <div className="bg-[#F2F4F7] rounded-3xl p-8 sm:p-12 border border-slate-200/60 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group bento-row-3">
            <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F97316] text-xs font-bold tracking-wider uppercase">
                Sciences de la Vie & Laboratoires
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold text-[#0C111D]">
                Série uLab Mobile
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                Automatisation de la logistique de laboratoire. Le cobot mobile conçu pour le transfert d'échantillons et l'interaction avec des équipements spécialisés (spécifications exactes à valider selon modèle).
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/robots/ulab-series"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0C111D] hover:bg-[#F97316] text-white text-sm sm:text-base font-bold transition-colors duration-200 shadow-sm"
                >
                  Découvrir la gamme uLab Mobile
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
              <div className="w-full max-w-md h-64 sm:h-72 bg-white/80 rounded-2xl p-6 flex items-center justify-center border border-slate-200/50 shadow-inner">
                <img
                  src="https://res.cloudinary.com/df1x718yw/image/upload/v1793705292/20a60af5-4139-430a-b193-c89c8ce08f73_ckcv71.webp"
                  alt="uLab Mobile Cobot"
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
