import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Layers, Truck, User, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { optimizeCloudinaryUrl } from "../../data/robotSeries";

interface FleetCardSpec {
  id: string;
  name: string;
  category: string;
  href: string;
  roiHref: string;
  tagline: string;
  keyMetric: string;
  metricLabel: string;
  primaryImage: string;
  secondaryImage?: string;
  icon: React.ElementType;
  badgeText: string;
  highlights: string[];
}

const FLEET_CARDS: FleetCardSpec[] = [
  {
    id: "uclean",
    name: "Série uClean",
    category: "NETTOYAGE & HYGIÈNE AUTONOME",
    href: "/robots/uclean-series",
    roiHref: "/robots/uclean-series#simulateur-roi",
    tagline: "Lavage, aspiration et bionettoyage intensif pour tous types de sols.",
    keyMetric: "3 000 m²/h",
    metricLabel: "Rendement maximal",
    primaryImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745753/Scrub75_cyuy2d.png",
    secondaryImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745472/Compact_wyrf5v.png",
    icon: Layers,
    badgeText: "Gamme Autolaveuses & Aspirateurs",
    highlights: [
      "Filtration HEPA H13 médicale",
      "Séchage instantané anti-glisse",
      "Économie d'eau jusqu'à 50%"
    ]
  },
  {
    id: "ulog",
    name: "Série uLog",
    category: "INTRALOGISTIQUE & MANUTENTION AMR",
    href: "/robots/ulog-series",
    roiHref: "/robots/ulog-series#simulateur-roi",
    tagline: "Transfert sécurisé de bacs et levage de palettes sans filoguidage.",
    keyMetric: "80 à 600 kg",
    metricLabel: "Capacité de charge",
    primaryImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747964/uLogLIFT600_URGlogo_01_face_xgxuh0.png",
    secondaryImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747959/uLogDELIVER150_URGlogo_01_face_Box_Admin_tprnbn.png",
    icon: Truck,
    badgeText: "Gamme Deliver & Lift AMR",
    highlights: [
      "Navigation SLAM 3D dynamique",
      "Interfaçage WMS / ERP & ascenseurs",
      "Recharge rapide 1h30 Li-FePO4"
    ]
  },
  {
    id: "userve",
    name: "Série uServe",
    category: "ACCUEIL & SERVICE INTERACTIF",
    href: "/robots/userve-series",
    roiHref: "/robots/userve-series#simulateur-roi",
    tagline: "Accueil haut de gamme, orientation dynamique et assistance en salle.",
    keyMetric: "15.6'' Full HD",
    metricLabel: "Écran interactif",
    primaryImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png",
    icon: User,
    badgeText: "Robot d'Accueil & Escorte",
    highlights: [
      "Interaction vocale multilingue (+20 langues)",
      "Escorte physique des visiteurs",
      "4 plateaux de service amovibles"
    ]
  }
];

export const FleetCatalogMockup: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-200 relative overflow-hidden font-sans">
      {/* Container principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* En-tête de section B2B sobre */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-orange-600 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-bold mb-3 block">
            — GAMMES DE ROBOTS PROFESSIONNELS —
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0F1C] leading-[1.15]">
            Une flotte autonome conçue pour{" "}
            <span className="text-orange-500 underline decoration-orange-500/30 underline-offset-8">
              l'excellence opérationnelle.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Trois gammes complémentaires certifiées pour cohabiter en toute sécurité avec vos équipes et sublimer vos environnements professionnels.
          </p>
        </div>

        {/* Grille des 3 Cartes de Gammes Monumentales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {FLEET_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="group relative bg-[#F8FAFC] border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:bg-white hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-1"
              >
                {/* 1. Entête de la Carte */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-slate-900 text-white">
                      <Icon size={12} className="text-orange-400" />
                      {card.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      {card.badgeText}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0A0F1C] tracking-tight group-hover:text-orange-600 transition-colors">
                    {card.name}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed min-h-[40px]">
                    {card.tagline}
                  </p>
                </div>

                {/* 2. Zone Visuelle Studio Monumentale sans fond sombre écrasant */}
                <div className="relative my-6 py-6 px-4 bg-white rounded-2xl border border-slate-200/70 overflow-hidden flex items-center justify-center min-h-[260px] sm:min-h-[290px] group-hover:border-orange-200/80 transition-colors shadow-inner">
                  {/* Subtle background glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-orange-500/[0.03] pointer-events-none" />

                  {/* Robot Principal Dominant */}
                  <div className="relative z-10 flex items-center justify-center w-full h-full">
                    {card.secondaryImage && (
                      <img
                        src={optimizeCloudinaryUrl(card.secondaryImage, 240)}
                        alt={`${card.name} modèle secondaire`}
                        className="absolute left-2 bottom-2 h-36 sm:h-40 object-contain opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-300 pointer-events-none"
                      />
                    )}
                    <img
                      src={optimizeCloudinaryUrl(card.primaryImage, 450)}
                      alt={`Robot principal ${card.name}`}
                      className="h-52 sm:h-60 object-contain drop-shadow-xl group-hover:scale-[1.03] transition-transform duration-300 pointer-events-none"
                    />
                  </div>

                  {/* Badge Métrique Fort en Overlay Sobres */}
                  <div className="absolute bottom-3 right-3 bg-[#0A0F1C]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl border border-slate-800 shadow-md">
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                      {card.metricLabel}
                    </span>
                    <span className="block text-sm font-extrabold text-orange-400">
                      {card.keyMetric}
                    </span>
                  </div>
                </div>

                {/* 3. Points Forts Synthétiques */}
                <div className="mb-6 space-y-2">
                  {card.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 size={14} className="text-orange-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* 4. Action CTAs Doublés Conformes */}
                <div className="pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center gap-2.5">
                  <Link
                    to={card.roiHref}
                    className="w-full sm:w-1/2 h-11 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] shadow-md shadow-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 cursor-pointer"
                  >
                    <span>Calculer le ROI</span>
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    to={card.href}
                    className="w-full sm:w-1/2 h-11 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 cursor-pointer"
                  >
                    <span>Découvrir</span>
                    <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
