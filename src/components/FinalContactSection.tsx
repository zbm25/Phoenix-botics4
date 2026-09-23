import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  getAllRobotModels,
  getRobotById
} from "../data/robotSeries";

export const FinalContactSection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const modelParam = searchParams.get("model");
  const industryParam = searchParams.get("industry");

  const allModels = getAllRobotModels();

  const normalizeIndustry = (val: string | null): string => {
    if (!val) return "";
    const lower = val.toLowerCase().trim();
    const valid = ["retail", "hospitality", "health", "industry", "other"];
    if (valid.includes(lower)) return lower;
    const map: Record<string, string> = {
      hotellerie: "hospitality",
      restauration: "hospitality",
      sante: "health",
      "santé": "health",
      healthcare: "health",
      medical: "health",
      ehpad: "health",
      clinique: "health",
      logistique: "industry",
      logistics: "industry",
      industrie: "industry",
      usine: "industry",
      entrepot: "industry",
      agroalimentaire: "industry",
      autre: "other",
    };
    return map[lower] || "";
  };

  const resolveCanonicalModel = (param: string | null): string => {
    if (!param) return "";
    const found = getRobotById(param);
    return found ? found.canonicalId : "";
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    industry: normalizeIndustry(industryParam),
    technology: resolveCanonicalModel(modelParam),
    details: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (modelParam !== null) {
      const resolved = resolveCanonicalModel(modelParam);
      setFormData((prev) => ({
        ...prev,
        technology: resolved
      }));
    }
    if (industryParam !== null) {
      const norm = normalizeIndustry(industryParam);
      setFormData((prev) => ({
        ...prev,
        industry: norm
      }));
    }
  }, [modelParam, industryParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate real high-end B2B API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      company: "",
      industry: "",
      technology: "",
      details: ""
    });
    setIsSubmitted(false);
  };

  return (
    <section 
      id="contact" 
      className="max-w-7xl mx-auto px-6 py-24 relative z-10"
    >
      {/* Principal Premium Dark Card */}
      <div className="bg-slate-950 rounded-[2.5rem] p-8 border border-slate-900 shadow-2xl relative overflow-hidden text-left">
        
        {/* Soft, beautiful radial brand glow in the top-right corner */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative z-10">
          
          {/* COLONNE DE GAUCHE (Informations & Réassurance - lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-start h-full">
            <div>
              <span className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-4 block font-mono">
                Prendre Contact
              </span>
              
              <h2 className="text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-6 leading-tight">
                Prêt à tester vos premiers robots ?
              </h2>
              
              <p className="text-slate-400 text-lg mb-10 font-light leading-relaxed">
                Nos experts analysent vos flux sous 48h pour concevoir une simulation sur-mesure. Sans engagement.
              </p>
            </div>

            {/* Coordinates / Contact Blocks */}
            <div className="flex flex-col gap-6 border-t border-slate-900/80 pt-8 mt-4">
              {/* Ligne Directe */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-slate-900 text-orange-500 flex items-center justify-center rounded-full shrink-0 border border-slate-800 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider font-mono">
                    Ligne Directe
                  </span>
                  <a href="tel:+33145420900" className="text-white font-medium hover:text-orange-400 transition-colors">
                    +33 (0)1 45 42 09 00
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-slate-900 text-orange-500 flex items-center justify-center rounded-full shrink-0 border border-slate-800 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider font-mono">
                    Email professionnel
                  </span>
                  <a href="mailto:contact@phoenix-botics.com" className="text-white font-medium hover:text-orange-400 transition-colors">
                    contact@phoenix-botics.com
                  </a>
                </div>
              </div>

              {/* Siège */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-slate-900 text-orange-500 flex items-center justify-center rounded-full shrink-0 border border-slate-800 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider font-mono">
                    Siège social
                  </span>
                  <span className="text-slate-300 font-medium block">
                    8 Rue de la Paix, 75002 Paris, France
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE DE DROITE (Formulaire B2B - lg:col-span-7) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 shadow-lg"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nom & Prénom + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Nom & Prénom <span className="text-orange-500">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          placeholder="Jean Dupont"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm font-light"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Adresse E-mail Professionnelle <span className="text-orange-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="j.dupont@entreprise.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm font-light"
                        />
                      </div>
                    </div>

                    {/* Nom de l'entreprise + Secteur */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Nom de l'entreprise <span className="text-orange-500">*</span>
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          required
                          placeholder="Logistique SA"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm font-light"
                        />
                      </div>
                      <div>
                        <label htmlFor="industry" className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Secteur d'activité <span className="text-orange-500">*</span>
                        </label>
                        <select
                          id="industry"
                          name="industry"
                          required
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm font-light cursor-pointer appearance-none"
                        >
                          <option value="" disabled className="bg-slate-950 text-slate-500">Sélectionnez votre secteur</option>
                          <option value="retail" className="bg-slate-950 text-white">Retail & Commerce</option>
                          <option value="hospitality" className="bg-slate-950 text-white">Hôtellerie & Restauration</option>
                          <option value="health" className="bg-slate-950 text-white">Santé & Médical</option>
                          <option value="industry" className="bg-slate-950 text-white">Industrie & Logistique</option>
                          <option value="other" className="bg-slate-950 text-white">Autre secteur</option>
                        </select>
                      </div>
                    </div>

                    {/* Technologie souhaitée */}
                    <div>
                      <label htmlFor="technology" className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Technologie souhaitée en évaluation <span className="text-orange-500">*</span>
                      </label>
                      <select
                        id="technology"
                        name="technology"
                        required
                        value={formData.technology}
                        onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                        className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm font-light cursor-pointer appearance-none"
                      >
                        <option value="" disabled className="bg-slate-950 text-slate-500">Sélectionnez le type de robot</option>
                        <optgroup label="Modèles de robots" className="bg-slate-950 text-slate-400">
                          {allModels.map((model) => (
                            <option key={model.canonicalId} value={model.canonicalId} className="bg-slate-950 text-white">
                              {model.name} — {model.segmentLabel}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Flottes & Audits" className="bg-slate-950 text-slate-400">
                          <option value="flotte-mixte" className="bg-slate-950 text-white">Flotte mixte</option>
                          <option value="audit-site" className="bg-slate-950 text-white">Audit global de site</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Détails du projet */}
                    <div>
                      <label htmlFor="details" className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Détails de votre projet / Besoins
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        rows={4}
                        placeholder="Décrivez brièvement vos défis opérationnels ou les tâches à automatiser..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm font-light resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/70 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex justify-center items-center gap-2 shadow-lg hover:shadow-orange-500/10 cursor-pointer text-sm"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      ) : (
                        <>
                          <span>Demander une étude de site</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-900/40 border border-emerald-500/20 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center gap-6"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8 animate-bounce" aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Demande enregistrée !</h3>
                    <p className="text-slate-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
                      Merci <span className="font-semibold text-white">{formData.fullName}</span>. Un ingénieur expert de Phoenix Botics étudiera la faisabilité pour <span className="font-semibold text-white">{formData.company}</span> et vous recontactera sous 48 heures.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs text-slate-500 hover:text-white underline transition-colors cursor-pointer"
                    >
                      Soumettre une nouvelle demande
                    </button>
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
