import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useLocation, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, useInView, useMotionValue, animate } from "motion/react";
import { Users, Clock, TrendingUp, CheckCircle2, ShieldCheck, Sparkles, Download, ArrowRight, FileText, Cpu, Truck, Globe } from "lucide-react";
import * as Icons from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ROBOT_SERIES_DATA, getRobotById, optimizeCloudinaryUrl } from "../data/robotSeries";
import { fadeUp, staggerContainer } from "../motion/variants";
import { usePageMeta } from "../hooks/usePageMeta";

interface CounterNumberProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const CounterNumber: React.FC<CounterNumberProps> = ({ 
  end, 
  duration = 2000, 
  prefix = "", 
  suffix = "" 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTimestamp: number | null = null;
      const isNegative = end < 0;
      const absEnd = Math.abs(end);

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing fluide (easeOutExpo)
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.floor(easeOut * absEnd);
        
        setCount(isNegative ? -currentVal : currentVal);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

// Dynamic KPI configurations by series
const KPISBYSERIES: Record<string, Array<{ value: string; label: string; sub: string }>> = {
  "uclean-series": [
    { value: "1 800 m²/h", label: "Rendement Max", sub: "Théorique maximal" },
    { value: "5h30", label: "Autonomie", sub: "Lavage continu" },
    { value: "-50%", label: "Conso. d'Eau", sub: "Économie vs manuel" },
    { value: "HEPA H13", label: "Filtre Absolu", sub: "Purification de l'air" }
  ],
  "ulog-series": [
    { value: "600 kg", label: "Charge Utile Max", sub: "Série Lift & Base 600" },
    { value: "± 5 mm", label: "Précision d'Arrêt", sub: "Navigation SLAM / LiDAR" },
    { value: "10 heures", label: "Autonomie Continue", sub: "Recharge sans fil auto" },
    { value: "1,2 m/s", label: "Vitesse Maximale", sub: "Franchissement ascenseur" }
  ],
  "userve-series": [
    { value: "40 kg", label: "Capacité de Charge", sub: "4 plateaux de 10 kg / 12 L" },
    { value: "15,6 pouces", label: "Grand Écran HD", sub: "Affichage promo 1080p" },
    { value: "> 10h", label: "Autonomie en Service", sub: "Opération 24/7 possible" },
    { value: "65 cm", label: "Passage Minimum", sub: "Évitement d'obstacles 3D" }
  ]
};

export const RobotSeriesPage: React.FC = () => {
  const { seriesId } = useParams<{ seriesId: string }>();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    sector: "retail",
    modelInterest: "",
    robotModel: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Models & ROI States
  const [selectedModelIdx, setSelectedModelIdx] = useState(0);
  const [surfaceRoi, setSurfaceRoi] = useState<number>(
    seriesId === "uclean-series" ? 2000 : seriesId === "ulog-series" ? 80 : 6
  );

  // Sticky Banner Visibility State
  const [showStickyBanner, setShowStickyBanner] = useState(false);

  // Lead Modal for PDF Technical Sheet
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadEmail, setDownloadEmail] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  const seriesData = seriesId ? ROBOT_SERIES_DATA[seriesId] : null;
  const kpis = seriesId ? KPISBYSERIES[seriesId] || [] : [];

  // Dynamic SEO metadata based on seriesId
  const getMetaInfo = () => {
    switch (seriesId) {
      case "uclean-series":
        return {
          title: "Gamme uClean | Autolaveuses et Aspirateurs Autonomes Professionnels",
          desc: "Découvrez la flotte d'autolaveuses industrielles uClean. Nettoyage robotisé autonome, filtration HEPA H13 et traçabilité hygiène pour grandes surfaces."
        };
      case "ulog-series":
        return {
          title: "Gamme uLog | Robots Mobiles Autonomes AMR & Levage 80 à 600 kg",
          desc: "Robots AMR uLog pour l'intralogistique industrielle et hospitalière. Navigation LiDAR SLAM sans marquage au sol, transit ascenseur et intégration WMS/ERP."
        };
      case "userve-series":
        return {
          title: "Gamme uServe | Robots d'Accueil, de Guidage et Service Interactif",
          desc: "Robots collaboratifs d'accueil et de service en salle uServe. Écran marketing 15,6'' HD, franchissement étroit dès 65 cm et interaction multilingue."
        };
      default:
        return {
          title: "Gammes Robots Professionnels | Phoenix-Botics",
          desc: "Flottes de robots collaboratifs et autonomes uClean, uLog et uServe pour les entreprises françaises."
        };
    }
  };

  const currentMeta = getMetaInfo();
  usePageMeta(currentMeta.title, currentMeta.desc);

  // Modal accessibility: Escape key listener and focus management
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Focus email input upon open
    const timer = setTimeout(() => {
      emailInputRef.current?.focus();
    }, 100);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isModalOpen]);

  // Deep-linking URL convention synchronization (?model=<canonicalId>&industry=<industryId>#contact)
  useEffect(() => {
    const modelParam = searchParams.get("model");
    const industryParam = searchParams.get("industry");

    if (modelParam) {
      const foundRobot = getRobotById(modelParam);
      if (foundRobot && seriesData?.models) {
        const belongsToSeries = seriesData.models.some(
          (m) =>
            m.id.toLowerCase() === foundRobot.id.toLowerCase() ||
            m.canonicalId.toLowerCase() === foundRobot.canonicalId.toLowerCase()
        );
        if (belongsToSeries) {
          setFormData((prev) => ({ ...prev, modelInterest: foundRobot.canonicalId }));
          const mIdx = seriesData.models.findIndex(
            (m) =>
              m.id.toLowerCase() === foundRobot.id.toLowerCase() ||
              m.canonicalId.toLowerCase() === foundRobot.canonicalId.toLowerCase()
          );
          if (mIdx !== -1) {
            setSelectedModelIdx(mIdx);
          }
        } else {
          setFormData((prev) => ({ ...prev, modelInterest: "" }));
        }
      } else {
        setFormData((prev) => ({ ...prev, modelInterest: "" }));
      }
    }

    if (industryParam) {
      const cleanIndustry = industryParam.toLowerCase().trim();
      let matchedSector = "retail";
      if (
        cleanIndustry === "hospitality" ||
        cleanIndustry === "hotellerie" ||
        cleanIndustry.includes("hotel") ||
        cleanIndustry.includes("restau")
      ) {
        matchedSector = "hospitality";
      } else if (
        cleanIndustry === "health" ||
        cleanIndustry === "healthcare" ||
        cleanIndustry === "sante" ||
        cleanIndustry === "santé" ||
        cleanIndustry === "medical" ||
        cleanIndustry.includes("soin") ||
        cleanIndustry.includes("clinique") ||
        cleanIndustry.includes("hopital")
      ) {
        matchedSector = "health";
      } else if (
        cleanIndustry === "industry" ||
        cleanIndustry === "logistics" ||
        cleanIndustry === "industrie" ||
        cleanIndustry === "usine" ||
        cleanIndustry.includes("log") ||
        cleanIndustry.includes("indus") ||
        cleanIndustry.includes("entrepot")
      ) {
        matchedSector = "industry";
      } else if (cleanIndustry === "other" || cleanIndustry === "autre") {
        matchedSector = "other";
      } else if (cleanIndustry === "retail" || cleanIndustry.includes("commerce") || cleanIndustry.includes("magasin")) {
        matchedSector = "retail";
      }
      setFormData((prev) => ({ ...prev, sector: matchedSector }));
    }
  }, [searchParams, seriesData]);

  useEffect(() => {
    setSelectedModelIdx(0);
    setSurfaceRoi(seriesId === "uclean-series" ? 2000 : seriesId === "ulog-series" ? 80 : 6);
  }, [seriesId]);

  const isUclean = seriesId === "uclean-series";
  const isUlog = seriesId === "ulog-series";
  const isUserve = seriesId === "userve-series";

  // Dynamic Sector Cards Data
  const sectorCardsData = isUclean ? [
    { title: "Surfaces de Vente & Retail", subtitle: "Magasins, supermarchés & centres commerciaux", benefit: "Nettoyage autonome pendant les heures creuses.", image: "https://res.cloudinary.com/df1x718yw/image/upload/v1786538828/ChatGPT_Image_12_ao%C3%BBt_2026_14_33_42_tnmnoc.png" },
    { title: "Hôtellerie & Restauration", subtitle: "Hôtels, restaurants & resorts", benefit: "Des espaces impeccables sans perturber vos clients.", image: "https://res.cloudinary.com/df1x718yw/image/upload/v1785324422/ChatGPT_Image_28_juil._2026_13_45_43_d6fm1m.png" },
    { title: "Santé & Établissements de Soins", subtitle: "Hôpitaux, cliniques, EHPAD & laboratoires", benefit: "Une propreté régulière pour les zones exigeantes.", image: "https://res.cloudinary.com/df1x718yw/image/upload/v1786443283/Gemini_Generated_Image_vqi2bwvqi2bwvqi2_obkh6h.png" },
    { title: "Industrie & Logistique Lourde", subtitle: "Entrepôts, usines & plateformes logistiques", benefit: "Une réponse fiable aux grandes surfaces et passages intensifs.", image: "https://res.cloudinary.com/df1x718yw/image/upload/v1785933751/Gemini_Generated_Image_ehix26ehix26ehix_vcxjhs.png" }
  ] : isUlog ? [
    { title: "Industrie Manufacturière", subtitle: "Usines d'assemblage, kitting & production Just-In-Time", benefit: "Approvisionnement continu des postes sans rupture de matière.", image: "https://res.cloudinary.com/df1x718yw/image/upload/v1785933751/Gemini_Generated_Image_ehix26ehix26ehix_vcxjhs.png" },
    { title: "Entrepôts & Plateformes Logistiques", subtitle: "Cross-docking, stockage & préparation de commandes", benefit: "Transport autonome de charges et palettes jusqu'à 600 kg.", image: "https://res.cloudinary.com/df1x718yw/image/upload/v1785933751/Gemini_Generated_Image_ehix26ehix26ehix_vcxjhs.png" },
    { title: "Santé & Hôpitaux", subtitle: "Transport de linge, médicaments, repas & déchets", benefit: "Franchissement autonome d'ascenseurs et portes automatiques.", image: "https://res.cloudinary.com/df1x718yw/image/upload/v1784381307/ChatGPT_Image_10_juil._2026_13_49_37_zzk9ba.png" },
    { title: "Laboratoires & Biotechnologies", subtitle: "Échantillons, consommables médicaux & contrôle qualité", benefit: "Navigation stérile et traçabilité complète des transferts.", image: "https://res.cloudinary.com/df1x718yw/image/upload/v1786706254/ChatGPT_Image_14_ao%C3%BBt_2026_13_14_25_hbto5m.png" }
  ] : [
    { title: "Restaurants & Brasseries", subtitle: "Salles de restauration, cantines & banquets", benefit: "Service simultané de 4 plateaux et aide au débarrassage.", image: "https://res.cloudinary.com/df1x718yw/image/upload/v1784567142/ChatGPT_Image_20_juil._2026_19_03_52_azmgk0.png" },
    { title: "Hôtellerie & Tourisme", subtitle: "Halls d'hôtels, room service & transport de bagages", benefit: "Livraison autonome en chambre et conciergerie 24/7.", image: "https://res.cloudinary.com/df1x718yw/image/upload/v1785324422/ChatGPT_Image_28_juil._2026_13_45_43_d6fm1m.png" },
    { title: "Centres de Conférence & Salons", subtitle: "Événements d'entreprise, séminaires & showrooms", benefit: "Accueil interactif, diffusion vidéo HD 15.6'' et guidage.", image: "https://res.cloudinary.com/df1x718yw/image/upload/v1786706254/ChatGPT_Image_14_ao%C3%BBt_2026_13_14_25_hbto5m.png" },
    { title: "Bureaux Tertiaires & Sièges", subtitle: "Distribution interne de courrier, café & documents", benefit: "Évitement d'obstacles 3D dans les passages de 65 cm.", image: "https://res.cloudinary.com/df1x718yw/image/upload/v1784381307/ChatGPT_Image_10_juil._2026_13_49_37_zzk9ba.png" }
  ];

  // Dynamic Methodology 4 Phases
  const supportPhases = isUclean ? [
    { step: "01", eyebrow: "Diagnostic du site", title: "Audit technique in situ", desc: "Analyse des sols, des flux de passage et des zones critiques pour valider l'éligibilité robotique.", result: "Éligibilité du site validée" },
    { step: "02", eyebrow: "Configuration précise", title: "Cartographie LiDAR 3D", desc: "Numérisation centimétrique des locaux, création des circuits optimaux et règles de sécurité.", result: "Parcours autonomes configurés" },
    { step: "03", eyebrow: "Mise en œuvre terrain", title: "Déploiement & formation", desc: "Mise en service sur site et formation pratique de vos agents pour une prise en main rapide.", result: "Équipes opérationnelles" },
    { step: "04", eyebrow: "Suivi continu", title: "Supervision 24/7 & Care", desc: "Télésurveillance, alertes proactives et maintenance préventive des consommables.", result: "Flotte suivie en continu" }
  ] : isUlog ? [
    { step: "01", eyebrow: "Analyse des flux", title: "Audit Intralogistique", desc: "Étude des flux de matériaux, des charges (80 à 600 kg) et dimensionnement de la flotte AMR.", result: "Matrice de flux & ROI validés" },
    { step: "02", eyebrow: "Intégration IT / OT", title: "Connexion WMS & SLAM", desc: "Cartographie LiDAR sans bande au sol, interfaçage ERP/WMS/MES et synchronisation ascenseurs.", result: "Interopérabilité logicielle certifiée" },
    { step: "03", eyebrow: "Mise en service", title: "Déploiement & Formation", desc: "Essais en conditions réelles de coactivité homme-robot et formation des opérateurs.", result: "Transferts Just-In-Time opérationnels" },
    { step: "04", eyebrow: "Maintien opérationnel", title: "Supervision RCS 24/7", desc: "Ordonnancement multi-robots cloud, maintenance proactive et disponibilité > 99%.", result: "Flux logistiques sécurisés" }
  ] : [
    { step: "01", eyebrow: "Cadrage opérationnel", title: "Audit d'Implantation", desc: "Analyse des circuits de service, de la typologie des tables et des couloirs de circulation (dès 65 cm).", result: "Plan d'exploitation validé" },
    { step: "02", eyebrow: "Personnalisation", title: "Configuration Multimodale", desc: "Création de la carte 3D SLAM, paramétrage des 4 plateaux et personnalisation de l'écran 15.6'' HD.", result: "Scénarios de service configurés" },
    { step: "03", eyebrow: "Prise en main", title: "Mise en service immédiate", desc: "Immersion sans programmation complexe et formation pratique de vos équipes de salle.", result: "Adoption immédiate par le personnel" },
    { step: "04", eyebrow: "Accompagnement", title: "Support & Care Phoenix", desc: "Assistance technique continue, mises à jour logicielles et garantie matérielle complète.", result: "Service client fluide garanti" }
  ];

  // Dynamic benefits by series with exact Industrie design
  const currentBenefits = isUclean
    ? [
        {
          title: "Régularité & Traçabilité",
          desc: "Nettoyage quotidien programmé, sans faille et scientifiquement traçable via des rapports de performance numériques précis."
        },
        {
          title: "Réduction de la Pénibilité",
          desc: "Soulage vos agents des tâches répétitives d'aspiration et de récurage de milliers de mètres carrés, réduisant les TMS et le turnover."
        },
        {
          title: "Éco-performance & Dosage",
          desc: "Jusqu'à 50% d'économie d'eau et de détergent grâce à un dosage millimétrique et une filtration haute performance des résidus."
        }
      ]
    : isUlog
    ? [
        {
          title: "Productivité & Continuité",
          desc: "Élimine les temps d'attente de matériel entre les postes de travail et garantit un approvisionnement continu 24h/24."
        },
        {
          title: "Ergonomie & Sécurité",
          desc: "Prévient les troubles musculosquelettiques (TMS) liés au port de charges lourdes et sécurise les zones de coactivité."
        },
        {
          title: "Déploiement Transparent",
          desc: "Zéro bande magnétique ni réflecteur au sol : la navigation LiDAR SLAM cartographie et s'adapte en temps réel."
        }
      ]
    : [
        {
          title: "Disponibilité Ininterrompue",
          desc: "Accueil, orientation et guidage interactif 24/7 sans aucune interruption de service pour vos visiteurs."
        },
        {
          title: "Multilinguisme Fluide",
          desc: "Prise en charge instantanée en plus de 20 langues pour orienter une patientèle ou clientèle internationale."
        },
        {
          title: "Valorisation du Personnel",
          desc: "Délègue les requêtes répétitives d'orientation pour recentrer vos équipes sur l'accompagnement à haute valeur ajoutée."
        }
      ];

  // Dynamic models by series from single source of truth ROBOT_SERIES_DATA
  const displayModels = (seriesData?.models || []).map((m, idx) => ({
    id: m.id,
    canonicalId: m.canonicalId || m.id,
    tag: m.tag || `MODÈLE 0${idx + 1}`,
    name: m.name,
    subtitle: m.subtitle || m.tagline,
    description: m.description,
    image: m.image,
    rendement: m.rendement || m.specs?.find(s => s.label.toLowerCase().includes("rendement") || s.label.toLowerCase().includes("charge") || s.label.toLowerCase().includes("vitesse"))?.value || m.specs?.[0]?.value || "-",
    autonomie: m.autonomie || m.specs?.find(s => s.label.toLowerCase().includes("autonomie"))?.value || "-",
    dimensions: m.dimensions || m.specs?.find(s => s.label.toLowerCase().includes("dimension") || s.label.toLowerCase().includes("plateau") || s.label.toLowerCase().includes("écran"))?.value || "-",
    capacite: m.capacite || m.specs?.find(s => s.label.toLowerCase().includes("réservoir") || s.label.toLowerCase().includes("étagère") || s.label.toLowerCase().includes("charge") || s.label.toLowerCase().includes("plateau"))?.value || m.specs?.[1]?.value || "-",
    poids: m.poids || m.specs?.find(s => s.label.toLowerCase().includes("poids"))?.value || "-",
    vitesse: m.vitesse || m.specs?.find(s => s.label.toLowerCase().includes("vitesse"))?.value || "1.2 m/s",
    sols: m.sols || (isUlog ? ["Béton industriel quartzé", "Résine Epoxy", "Carrelage d'atelier", "Enrobé intérieur"] : ["Sols durs lisses", "Parquet vitrifié", "Moquette rase", "Carrelage"]),
    environnements: m.environnements || m.useCases || seriesData?.globalUseCases || ["Entrepôts", "Usines", "Espaces tertiaires"]
  }));

  // Dynamic ROI calculation and configuration
  const currentRoi = isUclean
    ? {
        label: "Surface nettoyée par jour",
        displayValue: `${surfaceRoi.toLocaleString("fr-FR")} m²`,
        min: 500,
        max: 6000,
        step: 100,
        minLabel: "500 m²",
        maxLabel: "6 000 m²",
        hours: Math.round((surfaceRoi / 400) * 22),
        savings: Math.round(Math.round((surfaceRoi / 400) * 22) * 20),
        hypothesis: "Base indicative : 400 m²/h, 22 jours ouvrés et coût horaire chargé de 20 €/h."
      }
    : isUlog
    ? {
        label: "Transferts internes par jour",
        displayValue: `${surfaceRoi} transferts`,
        min: 20,
        max: 200,
        step: 5,
        minLabel: "20 transferts",
        maxLabel: "200 transferts",
        hours: Math.round(((surfaceRoi * 10) / 60) * 22),
        savings: Math.round(Math.round(((surfaceRoi * 10) / 60) * 22) * 20),
        hypothesis: "Base indicative : 10 minutes économisées par transfert, 22 jours ouvrés et coût horaire chargé de 20 €/h."
      }
    : {
        label: "Heures d'accueil et d'orientation par jour",
        displayValue: `${surfaceRoi} heures`,
        min: 2,
        max: 16,
        step: 1,
        minLabel: "2 h",
        maxLabel: "16 h",
        hours: Math.round(surfaceRoi * 22),
        savings: Math.round(Math.round(surfaceRoi * 22) * 20),
        hypothesis: "Base indicative : 22 jours ouvrés et coût horaire chargé de 20 €/h."
      };

  // Scroll listener for sticky banner
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBanner(true);
      } else {
        setShowStickyBanner(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling to target hash or ?model parameter
  useEffect(() => {
    const modelParam = searchParams.get("model");
    let targetId = "";

    if (location.hash) {
      targetId = location.hash.substring(1);
    } else if (modelParam) {
      const foundRobot = getRobotById(modelParam);
      const canonical = foundRobot?.canonicalId || modelParam;
      targetId = `model-${canonical}`;
    }

    if (targetId) {
      const scrollToTarget = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          return true;
        }
        return false;
      };

      // Premier essai rapide, puis fallback sécurisé après le rendu complet
      const timer1 = setTimeout(scrollToTarget, 100);
      const timer2 = setTimeout(scrollToTarget, 400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash, seriesId, searchParams]);

  if (!seriesData) {
    return (
      <div className="min-h-screen flex flex-col text-slate-900 bg-[color:var(--color-surface-page)] relative overflow-x-hidden cobiot-grid-bg">
        <div className="bg-[#070318] pt-24 pb-8 relative">
          <Header />
        </div>
        <main className="flex-grow flex flex-col items-center justify-center py-24 px-4 text-center z-10">
          <Icons.AlertTriangle className="text-orange-500 w-16 h-16 mb-6 animate-pulse" />
          <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight mb-4 text-slate-950">
            Gamme de robots introuvable
          </h1>
          <p className="text-slate-600 text-lg max-w-md mb-8">
            La série demandée n'existe pas ou a été déplacée dans notre catalogue.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:brightness-110 transition-all shadow-lg"
          >
            <Icons.ArrowLeft size={16} />
            <span>Retour à l'accueil</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Dynamic blocks for Challenges (Contexte Terrain) by series
  const getIntroBlocks = () => {
    if (seriesId === "uclean-series") {
      return [
        { title: "Recrutement & Rotation", text: "Face à un turnover élevé dans la propreté, les robots uClean automatisent le récurage et l'aspiration des grandes surfaces pour sécuriser la tenue des plannings.", icon: "Users" },
        { title: "Régularité & Traçabilité", text: "Nettoyage standardisé de jour comme de nuit avec rapports numériques horodatés pour prouver le respect des protocoles d'hygiène.", icon: "Clock" },
        { title: "Valorisation des Agents", text: "Vos collaborateurs sont déchargés des tâches pénibles et se concentrent sur les surfaces de contact, les sanitaires et les finitions à haute valeur ajoutée.", icon: "TrendingUp" }
      ];
    } else if (seriesId === "ulog-series") {
      return [
        { title: "Pénibilité & Prévention TMS", text: "60% des opérateurs logistiques souffrent de TMS. uLog prend en charge le transport lourd répétitif jusqu'à 600 kg pour sécuriser la santé au travail.", icon: "Users" },
        { title: "Flux Continu & Just-In-Time", text: "Suppression des temps d'attente inter-postes et approvisionnement continu 24/7 des lignes de fabrication et zones de préparation.", icon: "Clock" },
        { title: "Déploiement SLAM sans infrastructure", text: "Zéro bande magnétique ni réflecteur au sol : navigation LiDAR dynamique, passage autonome d'ascenseurs et connexion directe WMS / ERP / MES.", icon: "TrendingUp" }
      ];
    } else {
      return [
        { title: "Pression Opérationnelle en Salle", text: "39% des accidents en restauration sont liés à la manutention manuelle. uServe soulage les bras et évite les kilomètres de marche quotidiens.", icon: "Users" },
        { title: "Rotation des Tables & Continuité", text: "Aide au service, débarrassage rapide et approvisionnement continu pour augmenter la rentabilité et le débit de service aux heures de pointe.", icon: "Clock" },
        { title: "Expérience Client & Promotion HD", text: "Double écran tactile avec dalle marketing 15.6'' HD, guidage interactif et interaction fluide sans nécessiter de programmation.", icon: "TrendingUp" }
      ];
    }
  };

  // Helper to render lucide icons dynamically
  const renderIcon = (name: string, className = "w-6 h-6 text-orange-500") => {
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Icons.HelpCircle className={className} />;
  };

  const handleScrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleSelectModelForContact = (canonicalId: string) => {
    setFormData((prev) => ({ ...prev, modelInterest: canonicalId }));
    handleScrollToId("contact");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        sector: "retail",
        modelInterest: "",
        robotModel: "",
        message: ""
      });
    }, 1500);
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadEmail) return;

    setDownloadSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setDownloadSuccess(false);
      setDownloadEmail("");
    }, 2200);
  };

  // Video fallback logic for uClean and uLog series video background
  const heroVideoUrl = seriesId === "uclean-series" 
    ? "https://res.cloudinary.com/df1x718yw/video/upload/v1782758788/uClean_hsvmvx.mp4" 
    : seriesId === "ulog-series"
    ? "https://res.cloudinary.com/df1x718yw/video/upload/v1782758795/ULog_tlu9tt.mp4"
    : null;

  return (
    <div className="min-h-screen flex flex-col text-slate-900 bg-[color:var(--color-surface-page)] relative overflow-x-hidden font-sans cobiot-grid-bg">
      
      {/* Header */}
      <Header />

      {/* ==================== 1. HERO SECTION GAMME UCLEAN (VIDÉO DE FOND) ==================== */}
      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 w-full flex justify-center bg-[#0B1121] relative z-20">
        <div className="relative w-full max-w-[1800px] h-[75vh] min-h-[550px] rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute inset-0">
            {heroVideoUrl ? (
              <video
                src={heroVideoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={optimizeCloudinaryUrl(seriesData.heroImage, 1920)}
                alt={seriesData.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c]/95 via-[#0a0f1c]/60 to-transparent"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center items-start text-left px-6 sm:px-12 lg:px-24 w-full lg:w-3/5">
            <span className="text-orange-500 font-mono text-sm tracking-widest uppercase font-semibold mb-4 block">
              GAMME PROFESSIONNELLE B2B
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-white font-display leading-[1.1] mb-6">
              {seriesId === "uclean-series" ? (
                <>
                  Automatisez le nettoyage de vos{" "}
                  <span className="text-orange-500">espaces professionnels.</span>
                </>
              ) : (
                seriesData.heroTitle
              )}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-xl leading-relaxed">
              {seriesId === "uclean-series"
                ? "L'excellence de la propreté automatisée en continu. Découvrez notre gamme d'autolaveuses et d'aspirateurs autonomes de pointe."
                : seriesData.heroSubtitle || seriesData.heroDescription}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleScrollToId("contact")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition-colors text-sm shadow-lg flex items-center gap-2 cursor-pointer"
              >
                Parler à un expert
              </button>
              <button
                onClick={() => handleScrollToId("modeles")}
                className="text-white border border-white/30 hover:bg-white/10 font-bold py-4 px-8 rounded-full transition-colors text-sm backdrop-blur-sm cursor-pointer"
              >
                Voir les modèles ({seriesData.models.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 1. SECTION CONTEXTE TERRAIN (ANIMATION DOUCE ET RALENTIE) ==================== */}
      <section className="py-24 bg-[#f7f4ef] border-t border-gray-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
             
             {/* Colonne Gauche : Arrivée douce et progressive depuis la gauche */}
             <motion.div 
               className="lg:col-span-5"
               initial={{ opacity: 0, x: -70 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, amount: 0.2 }}
               transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
             >
                <span className="text-orange-500 font-mono text-sm tracking-widest uppercase font-semibold mb-4 block">
                  // CONTEXTE TERRAIN
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#0a0f1c] font-display leading-tight mb-6">
                   Libérez vos équipes des tâches à faible valeur ajoutée.
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                   {isUclean
                     ? "Dans un contexte de recrutement complexe, la régularité opérationnelle est devenue un défi quotidien. Nos cobots travaillent en parfaite harmonie avec le public pour garantir un standard d'hygiène exceptionnel."
                     : isUlog
                     ? "Face aux risques de TMS et aux cadences industrielles, la robotique mobile autonome sécurise les transferts de charges et fluidifie la coactivité opérateurs-machines."
                     : "Soulagez les équipes en salle des kilomètres de marche et des charges répétitives tout en rehaussant l'expérience d'accueil et le débit de service."}
                </p>
                <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
             </motion.div>
             
             {/* Colonne Droite : Cartes qui glissent avec un bel espacement temporel */}
             <motion.div 
               className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.15 }}
               variants={{
                 hidden: { opacity: 0 },
                 visible: {
                   opacity: 1,
                   transition: { staggerChildren: 0.22, delayChildren: 0.1 }
                 }
               }}
             >
                {getIntroBlocks().map((block, idx) => {
                  const IconComp = block.icon === "Users" ? Users : block.icon === "Clock" ? Clock : TrendingUp;
                  const isSpan2 = idx === 2;
                  return (
                    <motion.div 
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, x: 60, y: 30 },
                        visible: { 
                          opacity: 1, 
                          x: 0, 
                          y: 0, 
                          transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } 
                        }
                      }}
                      className={`bg-white border border-gray-200/80 rounded-[20px] p-8 shadow-sm hover:shadow-md transition-shadow ${isSpan2 ? "sm:col-span-2" : ""}`}
                    >
                      {isSpan2 ? (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                            <IconComp size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-[#0a0f1c] mb-2">{block.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{block.text}</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-6">
                            <IconComp size={24} />
                          </div>
                          <h3 className="text-xl font-bold text-[#0a0f1c] mb-3">{block.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{block.text}</p>
                        </>
                      )}
                    </motion.div>
                  );
                })}
             </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== 2. SECTION CHIFFRES CLÉS (COMPTEURS FONCTIONNELS) ==================== */}
      <section className="py-20 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div 
            initial={{ opacity: 0, y: 35, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-orange-500 rounded-[24px] shadow-xl p-8 sm:p-10"
          >
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                {kpis.map((kpi, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center p-2">
                     <div className="text-4xl lg:text-5xl font-black text-orange-500 font-display tracking-tight mb-2">
                       {kpi.value}
                     </div>
                     <span className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">{kpi.label}</span>
                     <p className="text-xs text-slate-500">{kpi.sub}</p>
                  </div>
                ))}
             </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION BÉNÉFICES CLÉS — STYLE PAGE INDUSTRIE ==================== */}
      <section className="py-24 bg-[#F7F8FA] border-t border-gray-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          
          {/* Header animé */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <span className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-4 block">
              - VOS AVANTAGES CONCURRENTIELS -
            </span>

            <h2 className="text-3xl lg:text-5xl font-bold font-display tracking-tight text-[#0a0f1c] leading-tight">
              {isUclean ? (
                <>
                  Rehaussez le standard d’hygiène
                  <span className="block mt-1 text-gray-400 font-light">
                    dans tous vos espaces professionnels.
                  </span>
                </>
              ) : isUlog ? (
                <>
                  Optimisez vos flux logistiques
                  <span className="block mt-1 text-gray-400 font-light">
                    sans aucune altération d'infrastructure.
                  </span>
                </>
              ) : (
                <>
                  Sublimez l'expérience d'accueil
                  <span className="block mt-1 text-gray-400 font-light">
                    avec une assistance interactive multilingue.
                  </span>
                </>
              )}
            </h2>
          </motion.div>

          {/* Trois bénéfices ouverts, style Industrie avec animation latérale */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.22,
                  delayChildren: 0.15,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
          >
            {currentBenefits.map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: idx === 0 ? -55 : idx === 2 ? 55 : 0,
                    y: idx === 1 ? 35 : 0,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="border-t border-gray-300 pt-7"
              >
                <span className="text-orange-500 font-mono text-xs tracking-widest uppercase font-bold mb-4 block">
                  BÉNÉFICE {String(idx + 1).padStart(2, "0")}.
                </span>

                <h3 className="text-xl font-bold text-[#0a0f1c] mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-base leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ==================== 2. SECTION CATALOGUE MODÈLES (STRUCTURE RESTRUCTURÉE) ==================== */}
      <section id="modeles" className="py-24 bg-white border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-3 block">
              - CATALOGUE TECHNIQUE -
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold font-display tracking-tight text-[#0a0f1c]">
              Anatomie & <span className="text-orange-500">Spécifications.</span>
            </h2>
            <p className="text-gray-600 mt-4 text-base">
              Une flotte complète de cobots autonomes conçus pour s'intégrer à tous vos types de sols et contraintes d'espace.
            </p>
          </div>

          {/* Fiches Modèles : Nom + Image à Gauche, Specs & CTA à Droite */}
          <div className="space-y-12">
            {displayModels.map((model, idx) => {
              const modelKey = (model.canonicalId || model.id || "").toLowerCase();
              const isFirstDeliver = isUlog && modelKey.includes("deliver") && (idx === 0 || !(displayModels[idx - 1].canonicalId || displayModels[idx - 1].id || "").toLowerCase().includes("deliver"));
              const isFirstLift = isUlog && modelKey.includes("lift") && (idx === 0 || !(displayModels[idx - 1].canonicalId || displayModels[idx - 1].id || "").toLowerCase().includes("lift"));

              return (
                <React.Fragment key={model.id}>
                  {isFirstDeliver && (
                    <div className="pt-4 pb-2 border-b border-gray-200">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="h-3 w-3 rounded-full bg-orange-500 shrink-0"></span>
                        <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#0a0f1c]">
                          uLog Deliver — Transport & Distribution de flux
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base max-w-3xl ml-6">
                        AMR compacts et sécurisés pour le transfert de bacs, colis, pièces et plateaux (80 à 300 kg).
                      </p>
                    </div>
                  )}

                  {isFirstLift && (
                    <div className="pt-8 pb-2 border-b border-gray-200">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="h-3 w-3 rounded-full bg-orange-500 shrink-0"></span>
                        <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#0a0f1c]">
                          uLog Lift — Levage & Manutention de palettes / racks
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base max-w-3xl ml-6">
                        AMR forte capacité pour le levage et le déplacement de chariots, structures roulantes et palettes (jusqu'à 600 kg).
                      </p>
                    </div>
                  )}

                  <motion.article 
                    id={`model-${model.canonicalId || model.id}`}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.16 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-[#faf8f5] border border-gray-200/80 rounded-[32px] p-8 lg:p-10 shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                      
                      {/* ==========================================
                          COLONNE GAUCHE : NOM DU ROBOT + PHOTO
                      ========================================== */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-5 flex flex-col"
                      >
                        <span className="text-orange-500 font-mono text-xs font-bold tracking-widest uppercase mb-2 block">
                          {model.tag}
                        </span>

                        <h3 className="text-3xl lg:text-4xl font-bold text-[#0a0f1c] font-display leading-tight mb-6">
                          {model.name}
                        </h3>

                        <div className="bg-white rounded-[24px] p-4 sm:p-5 flex items-center justify-center border border-gray-200/60 shadow-inner h-[260px] sm:h-[320px] lg:h-[400px] overflow-hidden">
                          <img 
                            src={optimizeCloudinaryUrl(model.image, 800)} 
                            alt={model.name} 
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                      </motion.div>

                      {/* ==========================================
                          COLONNE DROITE : TOUT LE RESTE
                      ========================================== */}
                      <motion.div 
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7 flex flex-col pt-1 text-left"
                      >
                        {/* Sous-titre */}
                        <p className="text-sm font-semibold text-gray-700 leading-relaxed mb-3">
                          {model.subtitle}
                        </p>

                        {/* Description produit */}
                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                          {model.description}
                        </p>

                        {/* Spécifications techniques adaptées */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                          
                          {/* Case 1 */}
                          <div className="bg-white rounded-xl p-3 border border-gray-200/60 shadow-sm">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                              {isUclean ? "Rendement" : isUlog ? "Charge Utile (Payload)" : "Charge Maximale"}
                            </span>
                            <span className="text-xs font-bold text-[#0a0f1c]">
                              {model.rendement || (isUlog ? "Jusqu'à 600 kg" : isUserve ? "40 kg (4 x 10 kg)" : "-")}
                            </span>
                          </div>

                          {/* Case 2 */}
                          <div className="bg-white rounded-xl p-3 border border-gray-200/60 shadow-sm">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                              Autonomie
                            </span>
                            <span className="text-xs font-bold text-[#0a0f1c]">
                              {model.autonomie || (isUlog ? "10 heures (Li-FePO4)" : isUserve ? "> 10h en continu" : "-")}
                            </span>
                          </div>

                          {/* Case 3 */}
                          <div className="bg-white rounded-xl p-3 border border-gray-200/60 shadow-sm">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                              Dimensions
                            </span>
                            <span className="text-[11px] font-bold text-[#0a0f1c]">
                              {model.dimensions && model.dimensions !== "-" ? model.dimensions : (isUlog ? "950 x 650 x 365 mm" : isUserve ? "580 x 490 x 1290 mm" : "-")}
                            </span>
                          </div>

                          {/* Case 4 (Spanning 2 colonnes ou 1) */}
                          <div className="bg-white rounded-xl p-3 border border-gray-200/60 shadow-sm sm:col-span-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                              {isUclean ? "Capacité & Filtration" : isUlog ? "Technologie de Levage / Flotte" : "Interface & Écrans"}
                            </span>
                            <span className="text-xs font-bold text-[#0a0f1c]">
                              {isUclean && (model.capacite || "-")}
                              {isUlog && (
                                (model.canonicalId || model.id || "").toLowerCase().includes("deliver")
                                  ? "Transport autonome & interfaçage WMS/ERP"
                                  : "Levage automatique d'étagères & interfaçage WMS/ERP"
                              )}
                              {isUserve && 'Double écran : Contrôle 10.1" + Affichage Promo 15.6" HD'}
                            </span>
                          </div>

                          {/* Case 5 */}
                          <div className="bg-white rounded-xl p-3 border border-gray-200/60 shadow-sm">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                              {isUclean ? "Poids & Vitesse" : isUlog ? "Vitesse & Précision" : "Vitesse & Passage"}
                            </span>
                            <span className="text-xs font-bold text-[#0a0f1c]">
                              {isUclean && `${model.poids || "-"} • ${model.vitesse || "1.2 m/s"}`}
                              {isUlog && `${model.vitesse || "1.2 m/s"} - Précision ± 5 mm`}
                              {isUserve && "0.3 à 1.2 m/s - Passage min. 65 cm"}
                            </span>
                          </div>

                        </div>

                        {/* Types de sols compatibles */}
                        {model.sols && model.sols.length > 0 && (
                          <div className="mb-5">
                            <span className="text-[11px] font-mono font-bold text-gray-600 uppercase tracking-wider block mb-2">
                              // TYPES DE SOLS COMPATIBLES :
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {model.sols.map((sol, i) => (
                                <span 
                                  key={i} 
                                  className="bg-white text-gray-700 text-[11px] px-3 py-1 rounded-full border border-gray-200 font-medium"
                                >
                                  {sol}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Environnements cibles */}
                        {model.environnements && model.environnements.length > 0 && (
                          <div className="mb-6">
                            <span className="text-[11px] font-mono font-bold text-gray-600 uppercase tracking-wider block mb-2">
                              // ENVIRONNEMENTS CIBLES :
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {model.environnements.map((env, i) => (
                                <span 
                                  key={i} 
                                  className="bg-orange-50 text-orange-700 text-[11px] px-3 py-1 rounded-full border border-orange-200 font-semibold"
                                >
                                  {env}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.45, delay: 0.20, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-auto flex flex-wrap items-center gap-3 pt-5 border-t border-gray-200/60"
                        >
                          <button
                            type="button"
                            onClick={() => handleSelectModelForContact(model.canonicalId || model.id)}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full text-xs transition-colors shadow-md cursor-pointer flex items-center gap-1.5"
                          >
                            <span>Demander une étude de site</span>
                            <ArrowRight size={14} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            aria-label={`Télécharger la brochure technique pour ${model.name}`}
                            className="bg-white border border-gray-300 hover:bg-gray-50 text-[#0a0f1c] font-semibold py-3 px-5 rounded-full text-xs transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                          >
                            <Download size={14} aria-hidden="true" />
                            <span>Télécharger la brochure technique</span>
                          </button>
                        </motion.div>

                      </motion.div>
                    </div>
                  </motion.article>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== SECTION SIMULATEUR ROI OPTIMISÉ ==================== */}
      <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">

          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-3 block">
              - SIMULATEUR ROI -
            </span>

            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-[#0a0f1c] leading-tight">
              Simulez vos gains et votre{" "}
              <span className="block text-orange-500">rentabilité.</span>
            </h2>

            <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
              Obtenez une première estimation des heures opérationnelles que vos équipes pourraient réallouer. Le résultat est indicatif et sera affiné lors de notre étude de site.
            </p>
          </motion.div>

          {/* Carte ROI */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0B1121] text-white rounded-[32px] p-8 lg:p-12 shadow-2xl border border-gray-800"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              {/* Curseur */}
              <div className="lg:col-span-7 text-left">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
                  <div>
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-2">
                      // VOLUME OPÉRATIONNEL
                    </span>
                    <p className="text-sm font-semibold text-gray-200">
                      {currentRoi.label}
                    </p>
                  </div>

                  <span className="text-3xl font-black text-orange-500 font-display">
                    {currentRoi.displayValue}
                  </span>
                </div>

                <input
                  type="range"
                  min={currentRoi.min}
                  max={currentRoi.max}
                  step={currentRoi.step}
                  value={surfaceRoi}
                  onChange={(e) => setSurfaceRoi(Number(e.target.value))}
                  aria-label={currentRoi.label}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer accent-orange-500 bg-white/20 mb-3"
                />

                <div className="flex justify-between text-xs text-gray-400 font-mono mb-4">
                  <span>{currentRoi.minLabel}</span>
                  <span>{currentRoi.maxLabel}</span>
                </div>

                <p className="text-xs text-gray-400 font-mono leading-relaxed">
                  {currentRoi.hypothesis}
                </p>
              </div>

              {/* Résultats */}
              <div className="lg:col-span-5 grid grid-cols-1 gap-4 text-left">
                <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-5">
                  <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block mb-2">
                    // TEMPS OPÉRATIONNEL RÉALLOUABLE
                  </span>

                  <motion.div
                    key={`hours-${currentRoi.hours}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-3xl font-black text-white font-display"
                  >
                    ~{currentRoi.hours} h
                    <span className="text-sm font-normal text-gray-400 ml-2">
                      / mois
                    </span>
                  </motion.div>
                  <p className="text-xs text-gray-400 mt-2">
                    Estimation du temps d'équipe potentiellement libéré.
                  </p>
                </div>

                <div className="bg-emerald-500/[0.08] border border-emerald-400/20 rounded-2xl p-5">
                  <span className="text-[11px] font-mono text-emerald-300/80 uppercase tracking-widest block mb-2">
                    // POTENTIEL ÉCONOMIQUE INDICATIF
                  </span>

                  <motion.div
                    key={`savings-${currentRoi.savings}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-3xl font-black text-emerald-400 font-display"
                  >
                    ~{currentRoi.savings.toLocaleString("fr-FR")} €
                    <span className="text-sm font-normal text-gray-400 ml-2">
                      / mois
                    </span>
                  </motion.div>
                  <p className="text-xs text-gray-400 mt-2">
                    À confirmer lors de l'étude de vos flux, contraintes et niveaux de service.
                  </p>
                </div>
              </div>
            </div>

            {/* Note et CTA */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <p className="text-[11px] text-gray-400 leading-relaxed italic max-w-xl text-left">
                Ces estimations sont fournies à titre indicatif. Une étude de site Phoenix-Botics permet de prendre en compte vos flux, horaires, distances, équipements existants et objectifs de performance.
              </p>

              <button
                type="button"
                onClick={() => handleScrollToId("contact")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-7 rounded-full text-sm transition-colors shadow-lg whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer"
              >
                Affiner mon estimation avec un expert
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== 6. APPLICATIONS (PREUVE D'USAGE) ==================== */}
      <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-3 block">
              {isUclean ? "- APPLICATIONS UCLEAN -" : isUlog ? "- APPLICATIONS ULOG -" : "- APPLICATIONS USERVE -"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-[#0a0f1c] leading-tight">
              {isUclean && <>Une solution uClean pour chaque <span className="text-orange-500">environnement.</span></>}
              {isUlog && <>Une solution uLog pour chaque <span className="text-orange-500">flux industriel.</span></>}
              {isUserve && <>Une solution uServe pour chaque <span className="text-orange-500">expérience de service.</span></>}
            </h2>
            <p className="text-gray-600 mt-4 text-sm md:text-base">
              {isUclean && "Des robots de nettoyage autonomes conçus pour s'intégrer aux contraintes opérationnelles de vos espaces."}
              {isUlog && "Des robots mobiles autonomes (AMR) conçus pour fluidifier vos flux de matières et éliminer les ruptures logistiques."}
              {isUserve && "Des robots de service intelligents pour assister vos équipes de salle, optimiser la rotation des tables et valoriser votre accueil."}
            </p>
          </motion.div>

          {/* Grille de cartes sectorielles immersives (preuve d'usage non cliquable) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectorCardsData.map((sector, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[340px] rounded-[24px] overflow-hidden flex flex-col justify-end p-6 border border-gray-200/80 shadow-md text-left"
              >
                {/* Image d'arrière-plan sans zoom agressif */}
                <img
                  src={optimizeCloudinaryUrl(sector.image, 800)}
                  alt={sector.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dégradé sombre pour lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-[#0B1121]/75 to-transparent"></div>

                {/* Contenu de la carte */}
                <div className="relative z-10">
                  <span className="text-orange-400 font-mono text-[10px] uppercase tracking-widest font-bold mb-1.5 block">
                    APPLICATION {isUclean ? "UCLEAN" : isUlog ? "ULOG" : "USERVE"}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display leading-snug mb-1.5">
                    {sector.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2 mb-3 leading-relaxed font-light">
                    {sector.subtitle}
                  </p>
                  <div className="text-[11px] font-medium text-orange-300/90 pt-3 border-t border-white/10 flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1"></span>
                    <span className="leading-snug">{sector.benefit}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA centré vers la section contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 text-center"
          >
            <button
              type="button"
              onClick={() => handleScrollToId("contact")}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-full text-sm transition-colors shadow-lg cursor-pointer"
            >
              <span>Échanger avec un expert {isUclean ? "uClean" : isUlog ? "uLog" : "uServe"}</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>

        </div>
      </section>

      {/* 7. ACCOMPAGNEMENT PHOENIX-BOTICS — TIMELINE D’INTÉGRATION */}
      <section className="relative overflow-hidden border-t border-slate-200/70 bg-[#f7f4ef] py-20 sm:py-24 lg:py-28">
        {/* Texture technique très discrète : ne pas remplacer par un gradient décoratif */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(11,17,33,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(11,17,33,.45) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          {/* En-tête avec espacement optimisé */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-16 max-w-3xl text-center sm:mb-20 lg:mb-24"
          >
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-orange-500/60" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-orange-600 sm:text-xs">
                Méthodologie {isUclean ? "uClean" : isUlog ? "uLog" : "uServe"}
              </span>
              <span className="h-px w-8 bg-orange-500/60" />
            </div>

            <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-[#0a0f1c] sm:text-4xl lg:text-5xl">
              De l’audit terrain à la{" "}
              <span className="text-orange-500">performance opérationnelle.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Un processus d’ingénierie en quatre phases pour intégrer votre flotte{" "}
              {isUclean ? "uClean" : isUlog ? "uLog" : "uServe"} avec fiabilité, adoption et rentabilité.
            </p>
          </motion.div>

          {/*
            Timeline desktop :
            - Une seule ligne de processus continue et discrète, positionnée derrière les pastilles.
            - Ne jamais faire passer la ligne à travers le texte ou les cartes.
          */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-slate-300/80 lg:block z-0"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-orange-400/90 via-orange-500 to-orange-400/90 lg:block z-0"
            />

            {/*
              Timeline mobile :
              - Ligne verticale hors du contenu, à gauche, parfaitement centrée avec les pastilles.
              - Les cartes ne sont pas cliquables.
            */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-8 left-0 top-8 w-px bg-gradient-to-b from-orange-300 via-orange-500 to-orange-200 lg:hidden"
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5">
              {supportPhases.map((phase, idx) => {
                return (
                  <motion.article
                    key={phase.step}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.7,
                      delay: idx * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative flex min-h-[310px] flex-col border border-slate-200/90 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(15,23,42,0.11)] sm:rounded-[22px] lg:min-h-[350px] lg:rounded-[24px] lg:p-7"
                  >
                    {/*
                      Repère mobile.
                      Ce rond est volontairement à gauche de la carte et centré sur la ligne verticale.
                    */}
                    <div className="absolute -left-2 top-8 z-20 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[#f7f4ef] bg-orange-500 lg:hidden">
                      <span className="h-1 w-1 rounded-full bg-white" />
                    </div>

                    {/*
                      Repère desktop :
                      Pastille raffinée 56px, contraste élevé, halo maîtrisé, alignée avec la ligne horizontale.
                    */}
                    <div className="relative z-20 mb-6 hidden h-[56px] lg:flex lg:items-start">
                      <div className="absolute left-1/2 top-0 flex h-[56px] w-[56px] -translate-x-1/2 items-center justify-center rounded-full border-[5px] border-[#f7f4ef] bg-orange-500 shadow-[0_4px_12px_rgba(249,115,22,0.20)]">
                        <span className="font-mono text-xs font-black tracking-tight text-white">
                          {phase.step}
                        </span>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="mt-6 lg:mt-2">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-orange-600">
                          {phase.eyebrow}
                        </p>
                        <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-slate-400 lg:hidden">
                          PHASE {phase.step}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold leading-tight text-[#0a0f1c]">
                        {phase.title}
                      </h3>

                      <p className="mt-4 text-sm leading-6 text-slate-600">
                        {phase.desc}
                      </p>
                    </div>

                    {/* Résultat, toujours collé au bas de la carte */}
                    <div className="mt-auto border-t border-slate-100 pt-5">
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                          <Icons.Check size={10} strokeWidth={3} aria-hidden="true" />
                        </div>

                        <p className="text-xs font-semibold leading-5 text-slate-700">
                          {phase.result}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* CTA unique : suite logique du parcours */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 text-center sm:mt-14"
          >
            <button
              type="button"
              onClick={() => handleScrollToId("contact")}
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(249,115,22,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-[0_14px_30px_rgba(249,115,22,0.32)] focus:outline-none focus:ring-4 focus:ring-orange-200 cursor-pointer"
            >
              Valider mon projet avec un ingénieur
              <Icons.ArrowRight size={16} aria-hidden="true" />
            </button>

            <p className="mt-3 text-xs text-slate-500">
              Audit d’éligibilité technique personnalisé pour votre établissement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION DYNAMISÉE */}
      <section className="py-20 sm:py-24 bg-white border-t border-gray-100 relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* En-tête centré */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-600">
                FAQ DE SERVICE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#0a0f1c] tracking-tight">
              Questions <span className="text-orange-500">fréquentes.</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
              Tout ce que vous devez savoir sur notre méthodologie d'implantation et nos garanties de support.
            </p>
          </motion.div>

          {/* Conteneur Accordéon Blanc avec ombre douce */}
          <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-slate-200/80 shadow-[0_10px_35px_rgba(15,23,42,0.06)] divide-y divide-slate-100 text-left">
            {seriesData.faq.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-label={item.question}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full group cursor-pointer flex items-center justify-between text-left gap-4 py-3 focus:outline-none transition-colors"
                  >
                    <span className={`text-base font-bold transition-colors duration-200 ${isOpen ? "text-orange-600" : "text-[#0a0f1c] group-hover:text-orange-500"}`}>
                      {item.question}
                    </span>
                    <span 
                      aria-hidden="true"
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/25 rotate-180"
                        : "bg-orange-50/80 border-orange-200/60 text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500"
                    }`}>
                      {isOpen ? <Icons.Minus size={15} strokeWidth={2.5} /> : <Icons.Plus size={15} strokeWidth={2.5} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-l-2 border-orange-500 pl-4 py-2.5 mt-2 text-slate-600 text-sm leading-relaxed bg-orange-50/30 rounded-r-xl">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. B2B CONTACT FORM — CARTE COMPACTE FLOTTANTE ARRONDIE */}
      <section id="contact" className="py-16 sm:py-24 bg-white relative z-10 border-t border-slate-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Carte Flottante Bleu Nuit Phoenix avec grands arrondis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0B1121] rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-14 border border-slate-800 shadow-[0_20px_60px_rgba(11,17,33,0.35)] relative overflow-hidden text-white"
          >
            {/* Lueur d'ambiance technique discrète */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start relative z-10">
              
              {/* Colonne Gauche : Coordonnées & Réassurance */}
              <div className="lg:col-span-5 flex flex-col justify-between text-left h-full">
                <div>
                  <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
                    PRENDRE CONTACT
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight mb-4">
                    Prêt à tester vos <br />
                    <span className="text-orange-500">premiers robots ?</span>
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    Nos experts analysent vos flux sous 48h pour concevoir une simulation sur-mesure. Sans engagement.
                  </p>
                </div>

                <div className="space-y-4 border-t border-slate-800/80 pt-6 mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
                      <Icons.Phone size={17} />
                    </div>
                    <div>
                      <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">LIGNE DIRECTE</p>
                      <p className="text-sm font-mono text-white font-bold">+33 (0)1 45 42 09 00</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
                      <Icons.Mail size={17} />
                    </div>
                    <div>
                      <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">EMAIL PROFESSIONNEL</p>
                      <p className="text-sm font-mono text-white font-medium">contact@phoenix-botics.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
                      <Icons.MapPin size={17} />
                    </div>
                    <div>
                      <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">SIÈGE SOCIAL</p>
                      <p className="text-sm text-slate-300 font-medium">Avenue de la Grande Armée, 75017 Paris, France</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne Droite : Formulaire B2B Interactif */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  {!submitSuccess ? (
                    <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="form-series-name" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                            Nom & Prénom <span className="text-orange-500">*</span>
                          </label>
                          <input
                            id="form-series-name"
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
                          <label htmlFor="form-series-email" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                            Email Professionnel <span className="text-orange-500">*</span>
                          </label>
                          <input
                            id="form-series-email"
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
                          <label htmlFor="form-series-company" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                            Entreprise <span className="text-orange-500">*</span>
                          </label>
                          <input
                            id="form-series-company"
                            name="company"
                            type="text"
                            required
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Nom de votre établissement"
                            className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs placeholder-slate-500 outline-none transition-all"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="form-series-sector" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                            Secteur d'Activité <span className="text-orange-500">*</span>
                          </label>
                          <select
                            id="form-series-sector"
                            name="sector"
                            value={formData.sector}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs outline-none transition-all cursor-pointer appearance-none"
                          >
                            <option value="retail">Retail & Grande Distribution</option>
                            <option value="hospitality">Hôtellerie & Restauration</option>
                            <option value="health">Santé, Cliniques & EHPAD</option>
                            <option value="industry">Industrie & Logistique</option>
                            <option value="other">Autre secteur</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="form-series-model" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                          Modèle d'Intérêt / Technologie Souhaitée <span className="text-orange-500">*</span>
                        </label>
                        <select
                          id="form-series-model"
                          name="modelInterest"
                          value={formData.modelInterest || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs outline-none transition-all cursor-pointer appearance-none"
                        >
                          <option value="">Sélectionnez un modèle ou un audit global</option>
                          {seriesData?.models?.map((m) => (
                            <option key={m.canonicalId || m.id} value={m.canonicalId || m.id}>
                              {m.name} — {m.tagline || m.subtitle || m.segmentLabel}
                            </option>
                          ))}
                          <option value="audit">Audit global de site — Définition de flotte mixte</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="form-series-message" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                          Détails du projet / Besoins
                        </label>
                        <textarea
                          id="form-series-message"
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Décrivez brièvement vos défis opérationnels ou les tâches à automatiser..."
                          className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs placeholder-slate-500 outline-none transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/25 cursor-pointer flex items-center justify-center gap-2 border-none mt-2"
                      >
                        <span>{isSubmitting ? "Transmission en cours..." : "Demander une étude de site"}</span>
                        <Icons.ArrowRight size={14} aria-hidden="true" />
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-12 space-y-4 flex flex-col justify-center items-center">
                      <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Icons.CheckCircle2 size={28} />
                      </div>
                      <h3 className="text-xl font-display font-bold text-white">Demande reçue avec succès !</h3>
                      <p className="text-slate-400 text-xs max-w-sm">
                        Un ingénieur expert Phoenix-Botics analysera vos locaux et prendra contact sous 48h.
                      </p>
                      <button
                        onClick={() => setSubmitSuccess(false)}
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

      {/* =========================================================================
         STICKY CONVERSION BANNER
         ========================================================================= */}
      <AnimatePresence>
        {showStickyBanner && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-white/10 text-white py-2.5 sm:py-3.5 px-4 sm:px-6 z-50 shadow-2xl max-h-[60px] sm:max-h-none flex items-center"
          >
            <div className="max-w-7xl mx-auto w-full flex flex-row items-center justify-between gap-3 text-left">
              <div className="hidden sm:flex items-center gap-3">
                <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-orange-500/20 border border-orange-500/30 text-[9px] font-mono font-semibold text-orange-400 uppercase tracking-wider">
                  HOTLINE B2B
                </span>
                <p className="text-xs sm:text-sm text-slate-200">
                  Gamme <strong className="text-white font-semibold">{seriesData.title}</strong> : Discutez de votre projet avec un ingénieur.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
                <span className="hidden sm:inline-block text-xs font-mono text-slate-400 font-bold">
                  +33 (0)1 45 42 09 00
                </span>
                <button
                  onClick={() => handleScrollToId("contact")}
                  className="w-full sm:w-auto justify-center px-5 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:brightness-105 text-white font-bold text-[10px] sm:text-[11px] uppercase tracking-widest rounded-full shadow-lg transition-all border-none cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <span>Parler à un expert</span>
                  <Icons.ArrowRight size={11} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
         DOWNLOAD PDF MODAL (MODAL DE TÉLÉCHARGEMENT DE FICHE TECHNIQUE)
         ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-pdf-title"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-left"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Fermer la fenêtre"
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer bg-transparent border-none outline-none focus:ring-2 focus:ring-orange-500/20 rounded w-11 h-11 flex items-center justify-center"
              >
                <Icons.X size={20} aria-hidden="true" />
              </button>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mx-auto">
                  <Icons.FileText size={22} aria-hidden="true" />
                </div>
                
                <h3 id="modal-pdf-title" className="text-lg font-display font-black text-slate-900">
                  Fiche Technique PDF
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Le document complet de spécifications et d'intégration de la gamme <strong className="text-slate-950">"{seriesData.title}"</strong> est prêt. Renseignez votre e-mail pour lancer le téléchargement.
                </p>

                <AnimatePresence mode="wait">
                  {!downloadSuccess ? (
                    <form
                      onSubmit={handleDownloadSubmit}
                      className="space-y-3 mt-4 text-left"
                    >
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="brochure-email"
                          className="text-[9px] uppercase tracking-wider font-mono text-slate-500 font-bold"
                        >
                          E-mail professionnel <span className="text-orange-500">*</span>
                        </label>
                        <input
                          ref={emailInputRef}
                          id="brochure-email"
                          name="email"
                          type="email"
                          required
                          value={downloadEmail}
                          onChange={(e) => setDownloadEmail(e.target.value)}
                          placeholder="votre-nom@entreprise.fr"
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-xl text-slate-900 text-xs placeholder-slate-400 outline-none transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:brightness-105 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 border-none"
                      >
                        <Icons.Download size={14} aria-hidden="true" />
                        <span>Télécharger la fiche technique</span>
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-6 flex flex-col items-center justify-center space-y-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                        <Icons.Check size={20} aria-hidden="true" />
                      </div>
                      <p className="text-xs font-bold text-slate-900">
                        Votre téléchargement va démarrer !
                      </p>
                      <p className="text-[10px] text-slate-500">
                        La fiche PDF a été générée avec succès pour <strong className="text-slate-900">{downloadEmail}</strong>.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-[9px] text-slate-400 font-light mt-4 leading-normal">
                  * Phoenix-Botics protège vos données. En soumettant ce formulaire, vous consentez à recevoir nos documentations techniques complémentaires.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Raccord propre avec le Footer sur fond blanc */}
      <div className="bg-white relative z-20 w-full">
        <Footer />
      </div>
    </div>
  );
};
