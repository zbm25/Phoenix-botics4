import React, { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ShieldCheck,
  FileText,
  CheckCircle2,
  Layers,
  Cpu,
  ArrowRight,
  Building2,
  Compass,
  Network,
  TrendingUp,
  LayoutGrid,
  Zap,
  Lock,
  Users,
  Check,
  ChevronRight,
  ShoppingBag,
  Utensils,
  HeartPulse,
  Warehouse
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ContactForm } from "../components/ContactForm";
import { usePageMeta } from "../hooks/usePageMeta";
import { getRobotById } from "../data/robotSeries";

// Diagnostic options types
interface OptionStep1 {
  id: string;
  label: string;
  desc: string;
}

interface OptionStep2 {
  id: string;
  label: string;
  desc: string;
}

interface OptionStep3 {
  id: string;
  label: string;
  desc: string;
}

const STEP_1_OPTIONS: OptionStep1[] = [
  { id: "plain-pied", label: "Plain-pied / Sols continus lisses", desc: "Surface plane sans franchissement majeur" },
  { id: "multi-etages", label: "Multi-étages (franchissement ascenseurs requis)", desc: "Interfaçage réseau & ascenseurs autonomes" },
  { id: "rampes-etroit", label: "Passages étroits ou rampes d'accès", desc: "Contraintes de gabarit et déclivité à auditer" },
];

const STEP_2_OPTIONS: OptionStep2[] = [
  { id: "industriel", label: "Environnement industriel / Personnel formé", desc: "Co-activité contrôlée avec opérateurs" },
  { id: "mixte-public", label: "Espace mixte ouvert au public", desc: "Navigation sécurisée (clients, patients, visiteurs)" },
];

const STEP_3_OPTIONS: OptionStep3[] = [
  { id: "intralogistique", label: "Intralogistique lourde / palettes / bacs", desc: "Manutention et transport de charges 80 à 600 kg" },
  { id: "navettes", label: "Navettes de petits matériels / linge / repas", desc: "Distribution sécurisée multi-points" },
  { id: "nettoyage", label: "Bio-nettoyage et entretien continu des sols", desc: "Aspiration, lavage et hygiène robotisée" },
];

export const FeasibilityStudyPage: React.FC = () => {
  usePageMeta(
    "Étude de Faisabilité Robotique & Dérisquage | Phoenix-Botics",
    "Validez la faisabilité de votre projet robotique sur votre site avant tout investissement. Audit de site, simulation flux, interfaçage WMS/ERP et étude de ROI."
  );

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Normalize industry query param
  const rawIndustry = searchParams.get("industry") || searchParams.get("sector") || "";
  const normalizeIndustry = (val: string): string => {
    const lower = val.toLowerCase().trim();
    if (["commerce", "retail", "grande-distribution"].includes(lower)) return "retail";
    if (["hotel", "restaurant", "hospitality", "hotellerie", "restauration"].includes(lower)) return "hospitality";
    if (["sante", "medical", "health", "hopital", "ehpad", "clinique"].includes(lower)) return "health";
    if (["usine", "logistique", "industry", "industrie", "entrepot", "agroalimentaire"].includes(lower)) return "industry";
    return "other";
  };
  const selectedSector = normalizeIndustry(rawIndustry);

  // Normalize model query param
  const rawModel = searchParams.get("model") || searchParams.get("robot") || "";
  const resolveCanonicalModel = (param: string): string => {
    if (!param) return "audit-site";
    const robot = getRobotById(param);
    if (robot) return robot.canonicalId;
    if (["flotte-mixte", "audit-site"].includes(param)) return param;
    return "audit-site";
  };
  const selectedModel = resolveCanonicalModel(rawModel);

  // Diagnostic State (Interactive Flash Audit)
  const [selectedStep1, setSelectedStep1] = useState<string>("plain-pied");
  const [selectedStep2, setSelectedStep2] = useState<string>("industriel");
  const [selectedStep3, setSelectedStep3] = useState<string>("intralogistique");

  // Dynamic details summary string built from diagnostic choices
  const diagnosticDetails = useMemo(() => {
    const opt1 = STEP_1_OPTIONS.find((o) => o.id === selectedStep1);
    const opt2 = STEP_2_OPTIONS.find((o) => o.id === selectedStep2);
    const opt3 = STEP_3_OPTIONS.find((o) => o.id === selectedStep3);

    return `[Diagnostic préliminaire] Configuration: ${opt1?.label || ""} | Environnement: ${opt2?.label || ""} | Flux: ${opt3?.label || ""}`;
  }, [selectedStep1, selectedStep2, selectedStep3]);

  const scrollToDiagnostic = () => {
    const el = document.getElementById("diagnostic-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-[#1a1a1a] font-sans bg-[#0a0f1c] text-white selection:bg-orange-500 selection:text-white">
      {/* Global Header */}
      <Header />

      {/* ==================== SECTION 1 : HERO ==================== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-8"
        >
          <ShieldCheck size={16} />
          <span>Dérisquage & Ingénierie Préalable</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.15] tracking-tight max-w-5xl mb-6"
        >
          Validez la faisabilité de votre projet robotique sur votre site <span className="text-orange-500">avant tout investissement</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 font-light max-w-3xl leading-relaxed mb-10"
        >
          Ne prenez aucun risque technique ou opérationnel. Nos ingénieurs analysent vos flux in situ, modélisent vos contraintes et simulent vos parcours pour vous garantir 100% de succès opérationnel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={scrollToDiagnostic}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition-all text-sm shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Lancer l'audit de faisabilité</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>

        {/* 4 Points de Réassurance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16 w-full max-w-5xl text-left"
        >
          <div className="bg-slate-900/60 border border-slate-800 p-4 sm:p-5 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <Compass size={20} />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Analyse in situ</div>
              <div className="text-[11px] text-slate-400 font-light">Audit physique de vos locaux</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-4 sm:p-5 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <Network size={20} />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Interfaçage WMS-ERP</div>
              <div className="text-[11px] text-slate-400 font-light">Compatibilité SI vérifiée</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-4 sm:p-5 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <Users size={20} />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Ingénieurs France</div>
              <div className="text-[11px] text-slate-400 font-light">Accompagnement de proximité</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-4 sm:p-5 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">Sans engagement</div>
              <div className="text-[11px] text-slate-400 font-light">Rapport d'ingénierie offert</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==================== SECTION 2 : 4 LIVRABLES D'ÉTUDE ==================== */}
      <section className="py-20 bg-slate-950 border-t border-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-orange-500 uppercase tracking-widest block mb-3 font-semibold">
              - Ce que vous recevez -
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Les 4 livrables complets de votre étude de faisabilité
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-3xl flex flex-col justify-between hover:border-orange-500/40 transition-colors group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Compass size={24} />
                </div>
                <div className="text-xs font-mono text-orange-500 uppercase font-semibold mb-2">01 / AUDIT</div>
                <h3 className="text-xl font-bold text-white mb-3">Diagnostic des flux</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  Cartographie précise de vos trajets, goulots d'étranglement, contraintes de sols, ascenseurs et rampes.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-3xl flex flex-col justify-between hover:border-orange-500/40 transition-colors group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Layers size={24} />
                </div>
                <div className="text-xs font-mono text-orange-500 uppercase font-semibold mb-2">02 / DIMENSIONNEMENT</div>
                <h3 className="text-xl font-bold text-white mb-3">Dimensionnement & Flotte idéale</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  Calcul exact du nombre de robots nécessaires, préconisation des modèles et modélisation de la cadence.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-3xl flex flex-col justify-between hover:border-orange-500/40 transition-colors group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Network size={24} />
                </div>
                <div className="text-xs font-mono text-orange-500 uppercase font-semibold mb-2">03 / ARCHITECTURE IT</div>
                <h3 className="text-xl font-bold text-white mb-3">Intégration IT & Réseau</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  Schéma de connexion avec votre ERP/WMS, couverture Wi-Fi/4G/5G et gestion des automatismes de portes/ascenseurs.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-3xl flex flex-col justify-between hover:border-orange-500/40 transition-colors group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <TrendingUp size={24} />
                </div>
                <div className="text-xs font-mono text-orange-500 uppercase font-semibold mb-2">04 / BUSINESS CASE</div>
                <h3 className="text-xl font-bold text-white mb-3">Projection économique & ROI</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  Analyse détaillée des coûts (CAPEX/OPEX), calcul du retour sur investissement et calendrier de déploiement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3 : CONTRAINTES PASSÉES AU CRIBE ==================== */}
      <section className="py-20 bg-[#0a0f1c] border-t border-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-orange-500 uppercase tracking-widest block mb-3 font-semibold">
              - Audit Technique Rigooureux -
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Toutes vos contraintes terrain passées au crible
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
                <LayoutGrid size={20} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Physique & Sols</h4>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Planéité, déclivité, joints de dilatation, matériaux de revêtement, passages étroits et franchissements d'obstacles.
              </p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
                <Cpu size={20} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Connectivité & API</h4>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Analyse de la couverture réseau, protocoles de sécurité, API WMS/ERP et interfaces d'automatismes (portes, ascenseurs).
              </p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
                <Lock size={20} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Normes CE & ISO</h4>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Conformité ISO 3691-4 pour les AMR, sécurité de la cohabitation homme-robot, zones de danger et arrêts d'urgence.
              </p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
                <Users size={20} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Conduite du changement</h4>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Acceptabilité par les équipes, formation des opérateurs, parcours utilisateur et ergonomie au quotidien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4 : PROTOCOLE EN 4 PHASES ==================== */}
      <section className="py-20 bg-slate-950 border-t border-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-orange-500 uppercase tracking-widest block mb-3 font-semibold">
              - Déroulement Méthodologique -
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Notre protocole d'étude en 4 phases simples
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="flex flex-col items-start bg-slate-900/40 p-6 rounded-2xl border border-slate-800 relative">
              <div className="text-4xl font-extrabold font-mono text-orange-500/40 mb-4">01</div>
              <h4 className="text-lg font-bold text-white mb-2">Cadrage (30 min)</h4>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Échange visio rapide pour cibler vos enjeux, vos volumes et valider l'opportunité d'une visite site.
              </p>
            </div>

            <div className="flex flex-col items-start bg-slate-900/40 p-6 rounded-2xl border border-slate-800 relative">
              <div className="text-4xl font-extrabold font-mono text-orange-500/40 mb-4">02</div>
              <h4 className="text-lg font-bold text-white mb-2">Relevé in situ (1/2 j)</h4>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Visite de votre site par un ingénieur expert : cartographie, mesures de sol, audit réseau et contraintes.
              </p>
            </div>

            <div className="flex flex-col items-start bg-slate-900/40 p-6 rounded-2xl border border-slate-800 relative">
              <div className="text-4xl font-extrabold font-mono text-orange-500/40 mb-4">03</div>
              <h4 className="text-lg font-bold text-white mb-2">Simulation (48-72h)</h4>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Modélisation numérique des flux, calcul des temps de cycle et sélection rigoureuse des cobots.
              </p>
            </div>

            <div className="flex flex-col items-start bg-slate-900/40 p-6 rounded-2xl border border-slate-800 relative">
              <div className="text-4xl font-extrabold font-mono text-orange-500/40 mb-4">04</div>
              <h4 className="text-lg font-bold text-white mb-2">Restitution Rapport</h4>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Présentation du rapport d'ingénierie complet avec devis détaillé et opportunités de POC/PoP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 5 : SOLUTIONS PAR INDUSTRIE ==================== */}
      <section className="py-20 bg-[#0a0f1c] border-t border-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-orange-500 uppercase tracking-widest block mb-3 font-semibold">
              - Adaptabilité Métier -
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Une expertise sectorielle éprouvée sur le terrain
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
                  <ShoppingBag size={20} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Retail & Commerce</h4>
                <p className="text-slate-400 text-xs font-light leading-relaxed mb-6">
                  Accueil client, guidage dynamique et nettoyage continu en présence du public.
                </p>
              </div>
              <button
                onClick={() => navigate("/industries/retail")}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1 group cursor-pointer"
              >
                <span>Voir les cas d'usage Retail</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
                  <Utensils size={20} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Hôtellerie & Restauration</h4>
                <p className="text-slate-400 text-xs font-light leading-relaxed mb-6">
                  Débarrassage en salle, room-service autonome et réduction de la pénibilité.
                </p>
              </div>
              <button
                onClick={() => navigate("/industries/hospitality")}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1 group cursor-pointer"
              >
                <span>Voir les cas d'usage Hospitality</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
                  <HeartPulse size={20} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Santé & Médical</h4>
                <p className="text-slate-400 text-xs font-light leading-relaxed mb-6">
                  Distribution sécurisée de linge, médicaments, repas et bio-nettoyage hospitalier.
                </p>
              </div>
              <button
                onClick={() => navigate("/industries/health")}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1 group cursor-pointer"
              >
                <span>Voir les cas d'usage Santé</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
                  <Warehouse size={20} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Industrie & Logistique</h4>
                <p className="text-slate-400 text-xs font-light leading-relaxed mb-6">
                  Approvisionnement des lignes, transfert de palettes 600kg et entretien intensif.
                </p>
              </div>
              <button
                onClick={() => navigate("/industries/industry")}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1 group cursor-pointer"
              >
                <span>Voir les cas d'usage Industrie</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 6 : GARANTIE D'INDÉPENDANCE ==================== */}
      <section className="py-16 bg-slate-950 border-t border-slate-900 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <Building2 size={32} />
            </div>

            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest block">
                Garantie d'Indépendance & Expertise
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Partenaire de distribution et d'intégration certifié United Robotics Group en France
              </h3>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                Nos préconisations techniques sont neutres, objectives et dictées uniquement par la réalité de votre terrain et la maximisation de votre ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 7 : MODULE DIAGNOSTIC + CONTACTFORM ==================== */}
      <section id="diagnostic-section" className="py-20 bg-[#0a0f1c] border-t border-slate-900 relative z-10 scroll-mt-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-orange-500 uppercase tracking-widest block mb-3 font-semibold">
              - Audit Flash de Faisabilité -
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight mb-4">
              Pré-qualifiez votre site en 3 clics
            </h2>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Sélectionnez les caractéristiques de votre bâtiment pour personnaliser votre rapport d'ingénierie préliminaire.
            </p>
          </div>

          {/* Module Interactif 3 Étapes */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 space-y-8 shadow-2xl">
            {/* Étape 1 */}
            <div>
              <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px]">1</span>
                <span>Étape 1 : Configuration architecturale</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {STEP_1_OPTIONS.map((opt) => {
                  const isSelected = selectedStep1 === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedStep1(opt.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-orange-500/10 border-orange-500 text-white shadow-lg shadow-orange-500/5"
                          : "bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-800/40 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-white">{opt.label}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? "border-orange-500 bg-orange-500 text-white" : "border-slate-600"}`}>
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-light leading-snug">{opt.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Étape 2 */}
            <div>
              <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px]">2</span>
                <span>Étape 2 : Environnement de cohabitation</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {STEP_2_OPTIONS.map((opt) => {
                  const isSelected = selectedStep2 === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedStep2(opt.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-orange-500/10 border-orange-500 text-white shadow-lg shadow-orange-500/5"
                          : "bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-800/40 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-white">{opt.label}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? "border-orange-500 bg-orange-500 text-white" : "border-slate-600"}`}>
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-light leading-snug">{opt.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Étape 3 */}
            <div>
              <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px]">3</span>
                <span>Étape 3 : Flux prioritaire à automatiser</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {STEP_3_OPTIONS.map((opt) => {
                  const isSelected = selectedStep3 === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedStep3(opt.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-orange-500/10 border-orange-500 text-white shadow-lg shadow-orange-500/5"
                          : "bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-800/40 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-white">{opt.label}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? "border-orange-500 bg-orange-500 text-white" : "border-slate-600"}`}>
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-light leading-snug">{opt.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Compatibility Banner */}
            <motion.div
              key={diagnosticDetails}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs sm:text-sm font-medium"
            >
              <Zap size={20} className="shrink-0 text-emerald-400" />
              <div>
                <span className="font-bold block text-white">Diagnostic préliminaire :</span>
                <span>Projet 100% compatible AMR / Cobotique autonome — Rapport d'ingénierie préconisé.</span>
              </div>
            </motion.div>
          </div>

          {/* Form Component Container */}
          <div className="bg-[#0B1121] rounded-[32px] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-slate-800">
            <div className="w-full lg:w-5/12 p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="text-orange-500 font-mono text-[10px] tracking-widest uppercase font-semibold mb-3 block">
                  Demande d'étude sur-mesure
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-display leading-snug">
                  Obtenez votre <br /><span className="text-slate-400">étude de faisabilité</span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                  Complétez vos coordonnées pour recevoir votre rapport préliminaire et échanger avec un ingénieur d'application sous 48h.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 size={16} className="text-orange-500 shrink-0" />
                  <span>Audit de site gratuit et sans engagement</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 size={16} className="text-orange-500 shrink-0" />
                  <span>Étude de ROI personnalisée sous 48h</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 size={16} className="text-orange-500 shrink-0" />
                  <span>Accompagnement par des ingénieurs certifiés</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-7/12 bg-white/[0.02] p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-white/5">
              <ContactForm
                defaultSector={selectedSector}
                defaultModel={selectedModel}
                defaultDetails={diagnosticDetails}
                ctaLabel="Demander mon étude de faisabilité"
                emailPlaceholder="j.dupont@entreprise.com"
                idPrefix="feasibility-page"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default FeasibilityStudyPage;
