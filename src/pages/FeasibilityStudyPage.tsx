import React, { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Compass,
  TrendingUp,
  Cpu,
  Layers,
  Wifi,
  Workflow,
  Lock,
  ArrowRight,
  ChevronRight,
  Clock,
  Sparkles,
  Building2,
  Check
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ContactForm } from "../components/ContactForm";
import { fadeUp, staggerContainer } from "../motion/variants";
import { usePageMeta } from "../hooks/usePageMeta";

// Mapping of query param aliases to canonical sector values matching ContactForm
const SECTOR_MAPPING: Record<string, string> = {
  retail: "retail",
  commerce: "retail",
  hospitality: "hospitality",
  hotel: "hospitality",
  hotellerie: "hospitality",
  restaurant: "hospitality",
  health: "health",
  sante: "health",
  medical: "health",
  industry: "industry",
  industrie: "industry",
  logistique: "industry",
  logistics: "industry",
};

export const FeasibilityStudyPage: React.FC = () => {
  usePageMeta(
    "Étude de Faisabilité Robotique | Cadrage & Diagnostic Site | Phoenix-Botics",
    "Validez la faisabilité technique, l'intégration opérationnelle et le ROI réel de votre projet robotique AMR/Cobot sur votre site avant tout investissement."
  );

  const [searchParams] = useSearchParams();

  // Resolve search query params strictly and map them to standard ContactForm default values
  const { resolvedSector, resolvedModel } = useMemo(() => {
    const rawIndustry = (searchParams.get("industry") || searchParams.get("sector") || "").toLowerCase().trim();
    const rawModel = (searchParams.get("model") || searchParams.get("robot") || "").trim();

    const sector = SECTOR_MAPPING[rawIndustry] || rawIndustry || "";
    return {
      resolvedSector: sector,
      resolvedModel: rawModel || "audit-site"
    };
  }, [searchParams]);

  const scrollToContact = () => {
    const element = document.getElementById("formulaire-etude");
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const deliverables = [
    {
      id: "01",
      icon: Compass,
      title: "Cartographie & Diagnostic de Flux",
      subtitle: "Analyse approfondie in situ",
      description:
        "Relevé précis des parcours, goulots d'étranglement, contraintes architecturales (pentes, ascenseurs, allées) et flux de circulation vivants."
    },
    {
      id: "02",
      icon: Cpu,
      title: "Dimensionnement & Flotte Idéale",
      subtitle: "Préconisation matérielle & logicielle",
      description:
        "Sélection rigoureuse des modèles AMR / cobots (uClean, uLog, uServe), nombre d'unités requises et matrice de rotation de charge."
    },
    {
      id: "03",
      icon: Workflow,
      title: "Étude d'Intégration IT & Réseau",
      subtitle: "Interopérabilité sans couture",
      description:
        "Audit des couvertures Wi-Fi/4G privées, protocoles de communication avec vos systèmes WMS/ERP et sécurité des accès réseau."
    },
    {
      id: "04",
      icon: TrendingUp,
      title: "Projection Economique & ROI",
      subtitle: "Plan de déploiement sécurisé",
      description:
        "Modélisation précise du Temps de Retour sur Investissement (TCO / ROI), gains de productivité et feuille de route de déploiement par phases."
    }
  ];

  const technicalScope = [
    {
      category: "Contraintes Physiques & Sols",
      icon: Layers,
      items: [
        "Sols & revêtement (planéité, adhérence, moquette/béton)",
        "Passages étroits, allées & hauteurs sous plafond",
        "Pentes, rampes d'accès & seuils de portes",
        "Interfaçage ascenseurs & portes automatiques"
      ]
    },
    {
      category: "Infrastructure & Connectivité",
      icon: Wifi,
      items: [
        "Cartographie de la couverture Wi-Fi / 4G industrielle",
        "Emplacements & puissance des stations de recharge",
        "Connecteurs API / Webhooks vers ERP & WMS",
        "Télémétrie & supervision de flotte à distance"
      ]
    },
    {
      category: "Sécurité & Conformité CE",
      icon: ShieldCheck,
      items: [
        "Conformité aux normes de sécurité cobotique (ISO/CE)",
        "Analyse de la cohabitation avec le personnel & le public",
        "Zones de détection LiDAR & arrêt d'urgence",
        "Gestion des obstacles dynamiques et imprévus"
      ]
    },
    {
      category: "Process & Flux Opérationnels",
      icon: Workflow,
      items: [
        "Volume de charges quotidiennes & fréquences de transport",
        "Synoptique des rotations de préparation & nettoyage",
        "Procédures d'approvisionnement & gestion de charge",
        "Plan d'accompagnement au changement des équipes"
      ]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Cadrage Initial & Échange",
      duration: "30 min",
      description: "Qualification téléphonique de vos enjeux, périmètre du site, objectifs et pré-requis logistiques."
    },
    {
      step: "02",
      title: "Diagnostic de Site In Situ",
      duration: "1 demi-journée",
      description: "Venue de nos ingénieurs sur votre site : relevé de mapping, analyse des flux réels et tests de connectivité."
    },
    {
      step: "03",
      title: "Simulation & Dimensionnement",
      duration: "48 à 72h",
      description: "Modélisation logicielle de la flotte, calcul du temps de cycle, planification de la charge et du ROI."
    },
    {
      step: "04",
      title: "Restitution & Plan d'Action",
      duration: "Visio / Sur site",
      description: "Présentation de votre rapport complet personnalisé d'étude de faisabilité avec préconisations prêtes à l'emploi."
    }
  ];

  const sectorsGrid = [
    {
      id: "industry",
      title: "Industrie & Logistique",
      desc: "Automatisation du transfert de bacs/palettes et approvisionnement de lignes de production.",
      tag: "AMR uLog Deliver & Lift"
    },
    {
      id: "retail",
      title: "Retail & Grande Distribution",
      desc: "Entretien autonome des surfaces de vente et guidage interactif des visiteurs.",
      tag: "uClean & uServe"
    },
    {
      id: "health",
      title: "Santé & Médical",
      desc: "Transport sécurisé de linge, repas, échantillons et désinfection automatisée.",
      tag: "uLog Deliver 150 & uClean"
    },
    {
      id: "hospitality",
      title: "Hôtellerie & Restauration",
      desc: "Service en salle, assistance au débarrassage et nettoyage discret d'espaces.",
      tag: "uServe & uClean Compact"
    }
  ];

  return (
    <div className="min-h-screen text-[color:var(--color-text-main)] relative bg-[#0a0f1c] selection:bg-orange-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-500/10 via-orange-500/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Corporate Header */}
      <Header />

      <main className="pt-24 sm:pt-28">
        {/* =========================================================================
            SECTION 1 : HERO DARK PREMIUM
           ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pb-20 max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            {/* Engineering Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs uppercase tracking-widest font-semibold">
                <Sparkles size={14} className="text-orange-500" />
                Dérisquage & Ingénierie Préalable
              </span>
            </motion.div>

            {/* H1 Title */}
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.15]"
            >
              Validez la faisabilité de votre projet robotique{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">
                sur votre site avant tout investissement.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-base sm:text-xl text-slate-300 font-light max-w-3xl leading-relaxed"
            >
              Évitez les erreurs de dimensionnement. Nos ingénieurs analysent vos flux, vos contraintes architecturales et vos systèmes IT pour concevoir un plan de déploiement sur-mesure et garanti.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-orange-500/25 flex items-center justify-center gap-3 text-sm sm:text-base cursor-pointer"
              >
                <span>Demander une étude préalable</span>
                <ArrowRight size={18} />
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeUp}
              className="mt-12 pt-8 border-t border-slate-800/80 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-400 text-xs font-mono"
            >
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck size={16} className="text-orange-500 shrink-0" />
                <span>Analyse in situ sur-mesure</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-orange-500 shrink-0" />
                <span>Interfaçage WMS/ERP vérifié</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Building2 size={16} className="text-orange-500 shrink-0" />
                <span>Équipe Ingénierie France</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Lock size={16} className="text-orange-500 shrink-0" />
                <span>Étude offerte pour projets qualifiés</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* =========================================================================
            SECTION 2 : CE QUE VOUS OBTENEZ (LES 4 LIVRABLES)
           ========================================================================= */}
        <section className="py-16 sm:py-24 bg-[#080d19] border-y border-slate-800/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-orange-500 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
                - CE QUE CONTIENT L'ÉTUDE -
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-display tracking-tight">
                4 livrables concrets pour éclairer votre décision.
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base font-light">
                À l'issue du cadrage, vous recevez un dossier d'ingénierie complet et exploitable par vos équipes direction et exploitation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliverables.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="bg-[#0f172a]/70 border border-slate-800 rounded-2xl p-6 hover:border-orange-500/40 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          <IconComponent size={22} />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-600 group-hover:text-orange-500 transition-colors">
                          / {item.id}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] font-mono text-orange-400/90 mb-3 uppercase tracking-wider">
                        {item.subtitle}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3 : PÉRIMÈTRE D'ANALYSE TECHNIQUE
           ========================================================================= */}
        <section className="py-16 sm:py-24 bg-[#0a0f1c] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-orange-500 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
                - EXIGENCE & RIGUEUR -
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-display tracking-tight">
                Les questions et contraintes que nous analysons.
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base font-light">
                Un projet robotique ne s'improvise pas. Notre protocole d'évaluation scrute l'ensemble des facteurs de risque terrain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {technicalScope.map((cat, idx) => {
                const CategoryIcon = cat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#12192b] border border-slate-800/90 rounded-2xl p-6 sm:p-8 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                      <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        <CategoryIcon size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-white font-display">{cat.category}</h3>
                    </div>

                    <ul className="space-y-3.5">
                      {cat.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={12} strokeWidth={3} />
                          </span>
                          <span className="text-xs sm:text-sm text-slate-300 font-light leading-snug">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4 : COMMENT SE DÉROULE L'ÉTUDE (MÉTHODOLOGIE 4 ÉTAPES)
           ========================================================================= */}
        <section className="py-16 sm:py-24 bg-[#080d19] border-t border-slate-800/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-orange-500 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
                - PROTOCOLE CLAIR -
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-display tracking-tight">
                Comment se déroule l'étude de faisabilité ?
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base font-light">
                Une démarche structurée et rapide qui ne perturbe pas le fonctionnement de vos équipes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {processSteps.map((step, idx) => (
                <div
                  key={step.step}
                  className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-orange-500">
                        {step.step}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">
                        <Clock size={11} className="text-orange-400" />
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5 : SOLUTIONS ADAPTÉES À VOS ENJEUX MÉTIERS
           ========================================================================= */}
        <section className="py-16 sm:py-24 bg-[#0a0f1c] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-orange-500 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
                - POLYVALENCE MÉTIER -
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-display tracking-tight">
                Un protocole d'étude adapté à votre secteur.
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base font-light">
                Chaque métier impose des contraintes spécifiques. Nous calibrons l'audit selon vos réalités terrain.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sectorsGrid.map((s) => (
                <div
                  key={s.id}
                  className="bg-[#12192b] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-orange-500/30 transition-all group"
                >
                  <div>
                    <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20 inline-block mb-3">
                      {s.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-light mb-6">
                      {s.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <Link
                      to={`/industries/${s.id}`}
                      className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-medium transition-colors"
                    >
                      <span>Cas d'usage</span>
                      <ChevronRight size={14} className="text-orange-500" />
                    </Link>
                    <button
                      onClick={() => {
                        const formElem = document.getElementById("formulaire-etude");
                        if (formElem) {
                          formElem.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="text-xs text-orange-400 hover:text-orange-300 font-semibold cursor-pointer"
                    >
                      Sélectionner
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6 : BLOC DE RÉASSURANCE & ENGAGEMENT
           ========================================================================= */}
        <section className="py-16 sm:py-20 bg-[#080d19] border-t border-slate-800/60 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#0f172a] via-[#12192b] to-[#0f172a] border border-orange-500/20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

              <span className="text-orange-500 font-mono text-xs uppercase tracking-widest font-bold block mb-3">
                GARANTIE PHOENIX-BOTICS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display max-w-2xl mx-auto leading-snug">
                Un engagement d'indépendance et d'excellence d'intégration.
              </h2>
              <p className="mt-4 text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
                En tant que partenaire certifié United Robotics Group en France, nos ingénieurs garantissent une évaluation neutre, réaliste et 100% basée sur vos données terrain réelles.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-slate-300 font-mono">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange-500" />
                  Rapport sous 48-72h
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange-500" />
                  Sans engagement d'achat
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange-500" />
                  Support technique basé en France
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7 : BLOC FINAL AVEC CONTACTFORM
           ========================================================================= */}
        <section
          id="formulaire-etude"
          className="py-16 sm:py-24 bg-[#0a0f1c] relative scroll-mt-20 border-t border-slate-800/60"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0b1121] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="mb-8 text-center sm:text-left">
                <span className="text-orange-500 font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold block mb-2">
                  DEMANDE DE CADRAGE PROJET
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  Solliciter votre étude de faisabilité
                </h2>
                <p className="mt-2 text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                  Remplissez les informations ci-dessous. Un ingénieur d'application Phoenix-Botics analysera vos éléments et prendra contact avec vous sous 48h.
                </p>
              </div>

              {/* Single Source of Truth: ContactForm Component */}
              <ContactForm
                defaultSector={resolvedSector}
                defaultModel={resolvedModel}
                emailPlaceholder="direction.technique@entreprise.com"
                ctaLabel="Demander mon étude de faisabilité"
                idPrefix="feasibility-page"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
