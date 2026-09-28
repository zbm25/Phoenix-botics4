import React from "react";
import { useSearchParams } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { getRobotById } from "../data/robotSeries";
import { ContactForm } from "./ContactForm";

export const FinalContactSection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const modelParam = searchParams.get("model");
  const industryParam = searchParams.get("industry");

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

  const defaultSector = normalizeIndustry(industryParam);
  const defaultModel = resolveCanonicalModel(modelParam);

  return (
    <section 
      id="contact" 
      className="max-w-7xl mx-auto px-6 py-24 relative z-10"
    >
      {/* Principal Premium Dark Card */}
      <div className="bg-slate-950 rounded-[2.5rem] p-8 border border-slate-900 shadow-2xl relative overflow-hidden text-left">
        
        {/* Soft, beautiful radial brand glow in the top-right corner */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

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
          <div className="lg:col-span-7 bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 shadow-lg">
            <ContactForm
              defaultSector={defaultSector}
              defaultModel={defaultModel}
              idPrefix="final-contact"
              ctaLabel="Demander une étude de site"
              emailPlaceholder="j.dupont@entreprise.com"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
