import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, TrendingUp, Calculator, X } from "lucide-react";

export const RobotsCatalogSection: React.FC = () => {
  const [showRoiSelector, setShowRoiSelector] = useState(false);

  return (
    <section className="py-16 lg:py-24 bg-[#ffffff] text-[#0C111D] font-sans" id="robots-catalog">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* En-tête centré */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-wider uppercase">
            Nos Gammes de Robots
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0C111D]">
            Une flotte unifiée pour <br />
            <span className="text-[#F97316]">transformer vos opérations.</span>
          </h2>
        </div>

        {/* Grille Bento Unifiée 12 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* 1. CARTE VERTICALE HAUTE : uLab Mobile (5 cols, 2 rangées) */}
          <div className="lg:col-span-5 lg:row-span-2 bg-[#F2F4F7] rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-slate-200/60 shadow-sm group min-h-[520px]">
            <div className="space-y-3 z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F97316] text-xs font-bold tracking-wider uppercase">
                Sciences de la Vie & Laboratoires
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0C111D]">
                uLab Mobile
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Automatisez le transport de tubes et de portoirs entre vos postes, ainsi que le chargement d’analyseurs selon les workflows intégrés.
              </p>
            </div>

            {/* Illustration verticale robot debout */}
            <div className="my-6 flex-1 flex items-center justify-center p-4 bg-white/70 rounded-2xl border border-slate-200/50 overflow-hidden min-h-[260px]">
              <img
                src="https://res.cloudinary.com/df1x718yw/image/upload/v1793705292/20a60af5-4139-430a-b193-c89c8ce08f73_ckcv71.webp"
                alt="uLab Mobile Cobot"
                className="max-h-64 sm:max-h-72 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
              />
            </div>

            <div className="pt-2">
              <Link
                to="/robots/ulab-series"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0C111D] hover:bg-[#F97316] text-white text-sm font-bold transition-colors duration-200 w-full justify-center sm:w-auto"
              >
                Découvrir uLab Mobile
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 2. CARTE : Série uClean (7 cols) */}
          <div className="lg:col-span-7 bg-[#F2F4F7] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 border border-slate-200/60 shadow-sm group">
            <div className="space-y-3 flex-1 order-2 sm:order-1">
              <span className="text-xs font-bold tracking-widest text-[#F97316] uppercase">
                Hygiène & Propreté Autonome
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0C111D]">
                Série uClean
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Des aspirateurs compacts aux autolaveuses industrielles (jusqu'à 3 000 m²/h). Libérez vos équipes avec une régularité irréprochable.
              </p>
              <div className="pt-2">
                <Link
                  to="/robots/uclean-series"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0C111D] hover:bg-[#F97316] text-white text-sm font-bold transition-colors duration-200"
                >
                  Découvrir uClean
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="w-full sm:w-64 h-56 sm:h-64 flex-shrink-0 rounded-2xl overflow-hidden flex items-center justify-center p-0 order-1 sm:order-2">
              <img
                src="https://res.cloudinary.com/df1x718yw/image/upload/v1793705586/Gemini_Generated_Image_tnr3t6tnr3t6tnr3_nhjogh.jpg"
                alt="Flotte robotique uClean"
                className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
              />
            </div>
          </div>

          {/* 3. CARTE : Série uServe (7 cols) - previously 4 cols, expanded to sit next to uLab */}
          <div className="lg:col-span-7 bg-[#F2F4F7] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 border border-slate-200/60 shadow-sm group">
            <div className="space-y-3 flex-1 order-2 sm:order-1">
              <span className="text-xs font-bold tracking-widest text-[#F97316] uppercase">
                Accueil & Service
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0C111D]">
                Série uServe
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Guidage physique, assistance et interaction multilingue en espaces recevant du public.
              </p>
              <div className="pt-2">
                <Link
                  to="/robots/userve-series"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0C111D] hover:bg-[#F97316] text-white text-sm font-bold transition-colors duration-200"
                >
                  Découvrir uServe
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="w-full sm:w-48 h-40 sm:h-48 flex-shrink-0 flex items-center justify-center bg-white/60 rounded-xl p-2 order-1 sm:order-2">
              <img
                src="https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png"
                alt="Robot d'accueil uServe"
                className="max-h-full object-contain drop-shadow group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* 4. CARTE PLEINE LARGEUR BAS : Série uLog avec la flotte (12 cols) */}
          <div className="lg:col-span-12 bg-[#F2F4F7] rounded-3xl p-6 sm:p-10 border border-slate-200/60 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group overflow-hidden">
            <div className="lg:col-span-5 space-y-4 z-10 relative">
              <span className="text-xs font-bold tracking-widest text-[#F97316] uppercase">
                Intralogistique & Manutention AMR
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0C111D]">
                Série uLog
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Transport autonome de charges industrielles (jusqu'à 600 kg). Intégration transparente aux flux logistiques, convoyeurs et ascenseurs connectés.
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

            <div className="lg:col-span-7 flex items-center justify-center sm:justify-end -mx-6 sm:-mx-10 -my-6 sm:-my-10 h-72 sm:h-80 md:h-[400px]">
              <img
                src="https://res.cloudinary.com/df1x718yw/image/upload/v1794219645/Gemini_Generated_Image_cxpg34cxpg34cxpg_leiybf.jpg"
                alt="Flotte robotique uLog complète"
                className="w-full h-full object-cover sm:object-contain object-right group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
              />
            </div>
          </div>

          {/* 5. BANDEAU D'ACTION ROI (12 cols) - transversale bottom */}
          <div className="lg:col-span-12 bg-[#F97316] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm group relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

            <div className="flex items-center gap-4 z-10 w-full md:w-auto">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold tracking-widest text-orange-100 uppercase">
                  Rentabilité
                </span>
                <h3 className="text-xl font-bold">
                  Simulateur de ROI
                </h3>
              </div>
            </div>

            <div className="z-10 w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
              <p className="text-orange-50 text-sm hidden lg:block mr-2">
                Estimez vos gains de productivité instantanément.
              </p>
              <button
                id="open-roi-selector"
                onClick={() => setShowRoiSelector(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0C111D] hover:bg-orange-50 text-sm font-bold transition-colors duration-200 w-full sm:w-auto justify-center cursor-pointer shadow-sm hover:shadow"
              >
                <Calculator className="w-4 h-4 text-[#F97316]" />
                Calculer mon ROI
              </button>
            </div>

            {/* Modale In-Card modifiée pour le bandeau */}
            <AnimatePresence>
              {showRoiSelector && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 bottom-0 md:bottom-full md:mb-4 bg-white shadow-xl z-20 rounded-2xl p-6 flex flex-col border border-slate-200 w-full md:w-72 m-4 md:m-0 text-[#0C111D]"
                >
                  <button
                    onClick={() => setShowRoiSelector(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h4 className="text-sm font-bold mb-4 text-center">Sélectionnez une gamme</h4>
                  <div className="space-y-2">
                    <Link to="/robots/uclean-series#simulateur-roi" className="block w-full py-2 px-3 rounded-lg bg-[#F2F4F7] hover:bg-orange-50 hover:text-[#F97316] text-sm font-semibold text-slate-800 text-center transition-colors">
                      uClean (Propreté)
                    </Link>
                    <Link to="/robots/ulog-series#simulateur-roi" className="block w-full py-2 px-3 rounded-lg bg-[#F2F4F7] hover:bg-orange-50 hover:text-[#F97316] text-sm font-semibold text-slate-800 text-center transition-colors">
                      uLog (Logistique)
                    </Link>
                    <Link to="/robots/userve-series#simulateur-roi" className="block w-full py-2 px-3 rounded-lg bg-[#F2F4F7] hover:bg-orange-50 hover:text-[#F97316] text-sm font-semibold text-slate-800 text-center transition-colors">
                      uServe (Accueil)
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
