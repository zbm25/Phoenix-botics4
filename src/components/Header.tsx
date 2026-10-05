import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { IconRenderer } from "./IconRenderer";
import { ChevronDown, ChevronRight, ArrowRight, ShieldCheck, Cpu, Layers, Truck, User, ShoppingBag, Utensils, HeartPulse, Warehouse } from "lucide-react";
import { optimizeCloudinaryUrl } from "../data/robotSeries";

interface NavLink {
  label: string;
  targetId?: string;
  path?: string;
}

interface RobotModelItem {
  id: string;
  canonicalId: string;
  name: string;
  tagline: string;
  description: string;
  photo: string;
  subfamily?: string;
}

interface DropdownGamme {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  models: RobotModelItem[];
  subfamilies?: {
    title: string;
    description: string;
    models: RobotModelItem[];
  }[];
}

const ROBOT_GAMMES: DropdownGamme[] = [
  {
    id: "uclean-series",
    title: "Série uClean",
    subtitle: "Nettoyage & Hygiène autonome",
    description: "Gamme d'autolaveuses et aspirateurs autonomes pour tous types de sols et très grandes surfaces.",
    iconName: "Layers",
    models: [
      {
        id: "uclean-compact",
        canonicalId: "uclean-compact",
        name: "uClean Compact",
        tagline: "Autolaveuse compacte pour espaces exigus",
        description: "Bionettoyage des couloirs, boutiques, halls d'accueil et commerces de proximité.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745472/Compact_wyrf5v.png"
      },
      {
        id: "uclean-vacuum-40",
        canonicalId: "uclean-vacuum-40",
        name: "uClean Vacuum 40",
        tagline: "Aspirateur autonome filtration HEPA H13",
        description: "Aspiration continue pour moquettes, tapis et sols durs dans l'hôtellerie et tertiaire.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745773/Vacuum40_xhxlps.png"
      },
      {
        id: "uclean-scrub-50-disc",
        canonicalId: "uclean-scrub-50-disc",
        name: "uClean Scrub 50 Disc",
        tagline: "Autolaveuse brosse disque standard",
        description: "Lavage et séchage haute performance sur carrelage, vinyle et béton ciré.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745593/Scrub50Disc_iwqmbf.png"
      },
      {
        id: "uclean-scrub-50-roller",
        canonicalId: "uclean-scrub-50-roller",
        name: "uClean Scrub 50 Roller",
        tagline: "Autolaveuse brosse rouleau sols texturés",
        description: "Incrustation renforcée et balayage intégré pour sols structurés et micro-poreux.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745734/Scrub50Roller_iqgbqn.png"
      },
      {
        id: "uclean-scrub-75",
        canonicalId: "uclean-scrub-75",
        name: "uClean Scrub 75",
        tagline: "Autolaveuse industrielle grande largeur",
        description: "Lavage intensif continu de très grandes surfaces logistiques, usines et hypermarchés.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745753/Scrub75_cyuy2d.png"
      }
    ]
  },
  {
    id: "userve-series",
    title: "Série uServe",
    subtitle: "Accueil & Service en salle",
    description: "Robots d'accueil, d'orientation dynamique et d'assistance interactive en point de vente et restauration.",
    iconName: "User",
    models: [
      {
        id: "userve",
        canonicalId: "userve",
        name: "uServe",
        tagline: "Robot d'accueil et de guidage interactif",
        description: "Grand écran tactile Full HD, interaction vocale et guidage autonome en hall ou restaurant.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png"
      }
    ]
  },
  {
    id: "ulog-series",
    title: "Série uLog",
    subtitle: "Intralogistique & Manutention",
    description: "Plateformes mobiles AMR pour le transport sécurisé de bacs et le levage de charges de 80 kg à 600 kg.",
    iconName: "Truck",
    subfamilies: [
      {
        title: "Gamme Deliver — Transport sécurisé & bacs",
        description: "AMR de livraison multi-bacs et transfert de petits colis à charges moyennes",
        models: [
          {
            id: "deliver-80",
            canonicalId: "ulog-deliver-80",
            name: "uLog Deliver 80",
            tagline: "AMR agile de livraison multi-étagères (80 kg)",
            description: "Distribution fréquente de petits colis, matériel médical ou pièces détachées.",
            photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747971/uLogDELIVER80_URGlogo_01_face_ktme3v.png",
            subfamily: "Deliver"
          },
          {
            id: "deliver-150",
            canonicalId: "ulog-deliver-150",
            name: "uLog Deliver 150",
            tagline: "Transport autonome sécurisé multi-bacs (150 kg)",
            description: "Transit sécurisé de repas, linge, médicaments et consommables en santé et tertiaire.",
            photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747959/uLogDELIVER150_URGlogo_01_face_Box_Admin_tprnbn.png",
            subfamily: "Deliver"
          },
          {
            id: "deliver-300",
            canonicalId: "ulog-deliver-300",
            name: "uLog Deliver 300",
            tagline: "Plateforme logistique pour bacs industriels (300 kg)",
            description: "Liaison automatisée entre zones de stockage et lignes d'assemblage.",
            photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747948/uLogDELIVER300_URGlogo_01_face_pihxaa.png",
            subfamily: "Deliver"
          },
          {
            id: "deliver-300-xl",
            canonicalId: "ulog-deliver-300-xl",
            name: "uLog Deliver 300 XL",
            tagline: "Châssis étendu pour contenants volumineux (300 kg)",
            description: "Manipulation sécurisée de grands cartons et eurobox sur châssis élargi.",
            photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747951/uLogDELIVER300XL_LIFT300XL_URGlogo_01_face_m95qag.png",
            subfamily: "Deliver"
          }
        ]
      },
      {
        title: "Gamme Lift — Levage d'étagères & palettes",
        description: "AMR à levage sous-châssis pour manutention lourde de 300 kg à 600 kg",
        models: [
          {
            id: "lift-300-base",
            canonicalId: "ulog-lift-300-base",
            name: "uLog Lift 300 Base",
            tagline: "Base de levage agile pour chariots & racks (300 kg)",
            description: "Glissement ultra-bas sous chariots et racks pour soulevage et transfert autonome.",
            photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747963/uLogLIFT600BASE_LIFT300XL_URGlogo_01_uv1lwf.png",
            subfamily: "Lift"
          },
          {
            id: "lift-300-xl",
            canonicalId: "ulog-lift-300-xl",
            name: "uLog Lift 300 XL",
            tagline: "AMR de levage avec écran de contrôle tactile (300 kg)",
            description: "Guidage visuel des opérateurs et manutention de structures roulantes hors standards.",
            photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747951/uLogDELIVER300XL_LIFT300XL_URGlogo_01_face_m95qag.png",
            subfamily: "Lift"
          },
          {
            id: "lift-600-base",
            canonicalId: "ulog-lift-600-base",
            name: "uLog Lift 600 Base",
            tagline: "Base modulaire ultra-robuste pour charges lourdes (600 kg)",
            description: "Transfert lourd d'étagères et sous-ensembles industriels avec recharge rapide 1h30.",
            photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747963/uLogLIFT600BASE_LIFT300XL_URGlogo_01_uv1lwf.png",
            subfamily: "Lift"
          },
          {
            id: "lift-600",
            canonicalId: "ulog-lift-600",
            name: "uLog Lift 600",
            tagline: "AMR de levage haute capacité pour palettes (600 kg)",
            description: "Navigation SLAM ultra-précise et intégration WMS/ERP pour entrepôts exigeants.",
            photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747964/uLogLIFT600_URGlogo_01_face_xgxuh0.png",
            subfamily: "Lift"
          }
        ]
      }
    ],
    models: [] // Populated dynamically or aggregated from subfamilies
  }
];

// Helper to extract flat list of models for uLog
ROBOT_GAMMES.forEach((gamme) => {
  if (gamme.subfamilies && (!gamme.models || gamme.models.length === 0)) {
    gamme.models = gamme.subfamilies.flatMap((sub) => sub.models);
  }
});

interface DropdownIndustry {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  supportedRobots: string[];
}

const INDUSTRY_SECTORS_DATA: DropdownIndustry[] = [
  {
    id: "retail",
    title: "Retail & Grande Distribution",
    subtitle: "GMS, hypermarchés & centres commerciaux",
    description: "Entretien continu des allées à fort trafic, accueil interactif et guidage des visiteurs en magasin.",
    iconName: "ShoppingBag",
    supportedRobots: ["uClean", "uServe", "uLog Deliver"]
  },
  {
    id: "hospitality",
    title: "Hôtellerie & Restauration",
    subtitle: "Hôtels, restaurants & grands complexes",
    description: "Débarrassage fluide en salle, livraison autonome en room-service et soulagement physique des équipes.",
    iconName: "Utensils",
    supportedRobots: ["uServe", "uClean"]
  },
  {
    id: "health",
    title: "Santé & Médico-social",
    subtitle: "Hôpitaux, cliniques & EHPAD",
    description: "Logistique interne sécurisée (repas, linge, médicaments) et bionettoyage certifié traçable.",
    iconName: "HeartPulse",
    supportedRobots: ["uLog Deliver", "uClean", "uServe"]
  },
  {
    id: "industry",
    title: "Logistique & Industrie",
    subtitle: "Entrepôts, usines 4.0 & intralogistique",
    description: "Transfert autonome de palettes SLAM, approvisionnement dynamique des lignes et exploitation en 3x8.",
    iconName: "Warehouse",
    supportedRobots: ["uLog Lift", "uLog Deliver", "uClean"]
  }
];

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileRobotsOpen, setMobileRobotsOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState<"robots" | "industries" | null>(null);
  const [hoveredGamme, setHoveredGamme] = useState<string>("uclean-series");
  const [hoveredIndustry, setHoveredIndustry] = useState<string>("retail");
  const [hoveredModelId, setHoveredModelId] = useState<string>("uclean-compact");

  // Ref for mouseleave timeout delay to avoid unintentional dropdown closing
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeGammeObj =
    ROBOT_GAMMES.find((gamme) => gamme.id === hoveredGamme) ?? ROBOT_GAMMES[0];

  const activeModel =
    activeGammeObj.models.find((m) => m.id === hoveredModelId || m.canonicalId === hoveredModelId) ??
    activeGammeObj.models[0];

  const activeIndustryObj =
    INDUSTRY_SECTORS_DATA.find((ind) => ind.id === hoveredIndustry) ?? INDUSTRY_SECTORS_DATA[0];

  // Mouse Enter / Leave handlers with smooth 180ms delay
  const handleMouseEnter = (dropdown: "robots" | "industries") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  // Keyboard accessibility: Escape key closes panels
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Header scroll observer
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    const element = document.getElementById(id);
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

  const goToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    const isLocalContact =
      id === "contact" &&
      (location.pathname.startsWith("/robots/") ||
        location.pathname.startsWith("/secteurs/") ||
        location.pathname.startsWith("/industries/") ||
        location.pathname.startsWith("/services"));

    if (location.pathname !== "/" && !isLocalContact) {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
      scrollToSection(id);
    }
  };

  const handleLaunchPrequalification = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    navigate("/industries/retail#prequalification");
    setTimeout(() => {
      const element = document.getElementById("prequalification");
      if (element) {
        const headerOffset = 90;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <>
      <motion.header
        role="navigation"
        aria-label="Navigation principale"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-3 sm:top-4 left-3 right-3 sm:left-6 sm:right-6 max-w-7xl mx-auto z-50 transition-all duration-300 rounded-full bg-white/95 backdrop-blur-md border px-4 sm:px-6 py-2.5 flex items-center justify-between ${
          showNavbar ? "translate-y-0" : "-translate-y-[200%]"
        } ${
          isScrolled
            ? "border-slate-200/90 shadow-xl shadow-slate-900/5"
            : "border-slate-200/60 shadow-md"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo brand item */}
          <div
            className="cursor-pointer flex items-center"
            onClick={() => {
              if (location.pathname !== "/") {
                navigate("/");
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <Logo iconSize={36} variant="dark" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">

            {/* 1. Robots Mega Menu Dropdown */}
            <div
              className="py-2"
              onMouseEnter={() => handleMouseEnter("robots")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                aria-expanded={activeDropdown === "robots"}
                onClick={() => {
                  if (location.pathname === "/") {
                    scrollToSection("robots-catalog");
                  } else {
                    navigate("/robots/uclean-series");
                  }
                }}
                className={`relative text-sm font-semibold px-3.5 py-2 transition-all rounded-full cursor-pointer group flex items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                  location.pathname.startsWith("/robots") || activeDropdown === "robots"
                    ? "text-slate-900 bg-slate-100/80"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>Robots</span>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-200 group-hover:text-orange-500 ${
                    activeDropdown === "robots" ? "rotate-180 text-orange-500" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "robots" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.99 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[1020px] max-w-[calc(100vw-2rem)] bg-white/98 backdrop-blur-2xl border border-slate-200/80 rounded-3xl shadow-2xl shadow-slate-900/15 p-6 z-50 grid grid-cols-12 gap-5 before:content-[''] before:absolute before:-top-4 before:left-0 before:right-0 before:h-4"
                  >
                    {/* Column 1: Gammes (3 Series) */}
                    <div className="col-span-3 flex flex-col gap-1.5 pr-3 border-r border-slate-100">
                      <div className="flex items-center justify-between px-2 mb-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                          Gammes United Robots
                        </span>
                      </div>
                      {ROBOT_GAMMES.map((gamme) => {
                        const isGammeActive = hoveredGamme === gamme.id;
                        return (
                          <button
                            key={gamme.id}
                            onMouseEnter={() => {
                              setHoveredGamme(gamme.id);
                              setHoveredModelId(gamme.models[0]?.id || "");
                            }}
                            onClick={() => {
                              navigate(`/robots/${gamme.id}`);
                              setActiveDropdown(null);
                            }}
                            className={`flex items-start gap-3 p-2.5 rounded-2xl transition-all text-left w-full cursor-pointer group/item border ${
                              isGammeActive
                                ? "bg-orange-50/80 border-orange-200/80 text-slate-900 shadow-sm"
                                : "bg-transparent border-transparent hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <div
                              className={`p-2 rounded-xl transition-all shrink-0 ${
                                isGammeActive
                                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                                  : "bg-slate-100 text-slate-500 group-hover/item:bg-orange-100 group-hover/item:text-orange-600"
                              }`}
                            >
                              <IconRenderer name={gamme.iconName} size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div
                                className={`font-bold text-xs transition-colors ${
                                  isGammeActive ? "text-orange-600" : "text-slate-900 group-hover/item:text-orange-600"
                                }`}
                              >
                                {gamme.title}
                              </div>
                              <div className="text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                                {gamme.subtitle}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Column 2: Models & Sub-families */}
                    <div className="col-span-4 flex flex-col gap-1 pr-3 border-r border-slate-100">
                      <div className="flex items-center justify-between px-2 mb-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                          {activeGammeObj.title} — Modèles
                        </span>
                        <span className="text-[10px] font-mono text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full font-bold">
                          {activeGammeObj.models.length} modèles
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 overflow-y-auto max-h-[340px] pr-1.5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                        {activeGammeObj.subfamilies ? (
                          // Render subfamilies (uLog)
                          activeGammeObj.subfamilies.map((subfamily) => (
                            <div key={subfamily.title} className="mb-2">
                              <div className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-wider bg-slate-100/80 px-2.5 py-1 rounded-lg mb-1.5 border border-slate-200/60">
                                {subfamily.title}
                              </div>
                              <div className="flex flex-col gap-1">
                                {subfamily.models.map((model) => {
                                  const isSelected = activeModel.id === model.id || activeModel.canonicalId === model.canonicalId;
                                  return (
                                    <button
                                      key={model.id}
                                      onMouseEnter={() => setHoveredModelId(model.id)}
                                      onClick={() => {
                                        navigate(`/robots/${activeGammeObj.id}?model=${model.canonicalId || model.id}#model-${model.canonicalId || model.id}`);
                                        setActiveDropdown(null);
                                      }}
                                      className={`flex flex-col p-2 rounded-xl transition-all text-left w-full cursor-pointer border ${
                                        isSelected
                                          ? "bg-orange-50 border-orange-200 text-slate-900 shadow-sm"
                                          : "bg-transparent border-transparent hover:bg-slate-50 text-slate-700"
                                      }`}
                                    >
                                      <div className="flex items-center justify-between w-full">
                                        <span
                                          className={`font-bold text-xs transition-colors ${
                                            isSelected ? "text-orange-600" : "text-slate-900"
                                          }`}
                                        >
                                          {model.name}
                                        </span>
                                        <ChevronRight
                                          size={12}
                                          className={`transition-transform ${
                                            isSelected ? "text-orange-500 translate-x-0.5" : "text-slate-300 opacity-0 group-hover:opacity-100"
                                          }`}
                                        />
                                      </div>
                                      <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                        {model.tagline || model.description}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))
                        ) : (
                          // Flat list of models (uClean, uServe)
                          activeGammeObj.models.map((model) => {
                            const isSelected = activeModel.id === model.id;
                            return (
                              <button
                                key={model.id}
                                onMouseEnter={() => setHoveredModelId(model.id)}
                                onClick={() => {
                                  navigate(`/robots/${activeGammeObj.id}?model=${model.canonicalId || model.id}#model-${model.canonicalId || model.id}`);
                                  setActiveDropdown(null);
                                }}
                                className={`flex flex-col p-2.5 rounded-xl transition-all text-left w-full cursor-pointer border ${
                                  isSelected
                                    ? "bg-orange-50 border-orange-200 text-slate-900 shadow-sm"
                                    : "bg-transparent border-transparent hover:bg-slate-50 text-slate-700"
                                }`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span
                                    className={`font-bold text-xs transition-colors ${
                                      isSelected ? "text-orange-600" : "text-slate-900"
                                    }`}
                                  >
                                    {model.name}
                                  </span>
                                  <ChevronRight
                                    size={13}
                                    className={`transition-transform ${
                                      isSelected ? "text-orange-500 translate-x-0.5" : "text-slate-300"
                                    }`}
                                  />
                                </div>
                                <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                  {model.tagline || model.description}
                                </span>
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Column 3: Active Model Preview */}
                    <div className="col-span-2 flex flex-col justify-between h-full min-h-[320px] bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/60">
                      <div className="flex flex-col gap-2">
                        <div className="w-full h-36 bg-white rounded-xl flex items-center justify-center p-2 border border-slate-200/60 overflow-hidden relative shadow-sm">
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={activeModel.id || activeModel.canonicalId}
                              initial={{ opacity: 0, scale: 0.92 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.92 }}
                              transition={{ duration: 0.15 }}
                              src={optimizeCloudinaryUrl(activeModel.photo, 300)}
                              alt={activeModel.name}
                              className="h-full object-contain filter drop-shadow-sm"
                              loading="lazy"
                            />
                          </AnimatePresence>
                        </div>

                        <div className="text-left mt-1">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeModel.id || activeModel.canonicalId}
                              initial={{ opacity: 0, y: 3 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 3 }}
                              transition={{ duration: 0.12 }}
                            >
                              <h4 className="text-slate-900 font-bold text-xs leading-snug">
                                {activeModel.name}
                              </h4>
                              <p className="text-[10px] text-orange-600 font-mono font-semibold uppercase tracking-wider mt-0.5">
                                {activeGammeObj.title}
                              </p>
                              <p className="text-[11px] text-slate-600 mt-1.5 leading-snug line-clamp-3">
                                {activeModel.description}
                              </p>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          navigate(`/robots/${activeGammeObj.id}?model=${activeModel.canonicalId || activeModel.id}#model-${activeModel.canonicalId || activeModel.id}`);
                          setActiveDropdown(null);
                        }}
                        className="mt-3 flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-bold group/btn text-left self-start cursor-pointer transition-colors"
                      >
                        <span>Voir la fiche</span>
                        <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                    {/* Column 4: Selection Tool Side Panel Card (Dark Technical Contrast) */}
                    <div className="col-span-3 bg-[#0B1121] text-white p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between shadow-xl relative overflow-hidden group">
                      {/* Subtle architectural background accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
                          <Cpu size={12} className="text-orange-400" />
                          <span>Faisabilité 2 min</span>
                        </div>

                        <h3 className="text-white font-bold text-sm leading-snug">
                          Quel robot pour votre établissement ?
                        </h3>

                        <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                          Évaluez la faisabilité de votre site et obtenez une préconisation sur-mesure.
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-white/10">
                        <button
                          type="button"
                          onClick={handleLaunchPrequalification}
                          className="w-full py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer group-hover:scale-[1.02]"
                        >
                          <span>Lancer la préqualification</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Industries Mega Menu Dropdown */}
            <div
              className="py-2"
              onMouseEnter={() => handleMouseEnter("industries")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                aria-expanded={activeDropdown === "industries"}
                onClick={() => {
                  if (location.pathname === "/") {
                    scrollToSection("industries");
                  } else {
                    navigate("/industries/retail");
                  }
                }}
                className={`relative text-sm font-semibold px-3.5 py-2 transition-all rounded-full cursor-pointer group flex items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                  location.pathname.startsWith("/industries") || activeDropdown === "industries"
                    ? "text-slate-900 bg-slate-100/80"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>Industries</span>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-200 group-hover:text-orange-500 ${
                    activeDropdown === "industries" ? "rotate-180 text-orange-500" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "industries" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.99 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[720px] max-w-[calc(100vw-2rem)] bg-white/98 backdrop-blur-2xl border border-slate-200/80 rounded-3xl shadow-2xl shadow-slate-900/15 p-6 z-50 grid grid-cols-12 gap-5 before:content-[''] before:absolute before:-top-4 before:left-0 before:right-0 before:h-4"
                  >
                    <div className="col-span-7 flex flex-col gap-1.5 pr-3 border-r border-slate-100">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
                        Secteurs applicatifs
                      </span>

                      {INDUSTRY_SECTORS_DATA.map((ind) => {
                        const isIndActive = hoveredIndustry === ind.id;
                        return (
                          <button
                            key={ind.id}
                            onMouseEnter={() => setHoveredIndustry(ind.id)}
                            onClick={() => {
                              navigate(`/industries/${ind.id}`);
                              setActiveDropdown(null);
                            }}
                            className={`flex items-start gap-3 p-2.5 rounded-2xl transition-all text-left w-full cursor-pointer group/item border ${
                              isIndActive
                                ? "bg-orange-50/80 border-orange-200/80 text-slate-900 shadow-sm"
                                : "bg-transparent border-transparent hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <div
                              className={`p-2 rounded-xl transition-all shrink-0 ${
                                isIndActive
                                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                                  : "bg-slate-100 text-slate-500 group-hover/item:bg-orange-100 group-hover/item:text-orange-600"
                              }`}
                            >
                              <IconRenderer name={ind.iconName} size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div
                                className={`font-bold text-xs transition-colors ${
                                  isIndActive ? "text-orange-600" : "text-slate-900 group-hover/item:text-orange-600"
                                }`}
                              >
                                {ind.title}
                              </div>
                              <div className="text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                                {ind.subtitle}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="col-span-5 flex flex-col justify-between h-full min-h-[260px] bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
                      <div className="flex flex-col gap-2">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeIndustryObj.id}
                            initial={{ opacity: 0, x: 4 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 4 }}
                            transition={{ duration: 0.15 }}
                            className="flex flex-col gap-2.5"
                          >
                            <div className="flex items-center gap-2">
                              <div className="p-2 rounded-xl bg-orange-500 text-white shadow-sm">
                                <IconRenderer name={activeIndustryObj.iconName} size={16} />
                              </div>
                              <div>
                                <h4 className="text-slate-900 font-bold text-xs leading-tight">
                                  {activeIndustryObj.title}
                                </h4>
                                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                                  {activeIndustryObj.subtitle}
                                </p>
                              </div>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed mt-1">
                              {activeIndustryObj.description}
                            </p>

                            <div className="mt-2 pt-2 border-t border-slate-200/80">
                              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                                Flotte recommandée :
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {activeIndustryObj.supportedRobots.map((robot) => (
                                  <span
                                    key={robot}
                                    className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-orange-600 shadow-2xs"
                                  >
                                    {robot}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          navigate(`/industries/${activeIndustryObj.id}`);
                          setActiveDropdown(null);
                        }}
                        className="mt-4 flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-bold group/btn text-left self-start cursor-pointer transition-colors"
                      >
                        <span>Découvrir la solution sectorielle</span>
                        <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Direct Link: Services (No heavy dropdown, clean link) */}
            <button
              type="button"
              onClick={() => {
                setActiveDropdown(null);
                navigate("/services");
              }}
              className={`relative text-sm font-semibold px-3.5 py-2 transition-all rounded-full cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                location.pathname === "/services"
                  ? "text-slate-900 bg-slate-100/80"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>Services</span>
            </button>

            {/* 4. Direct Link: Technologie */}
            <button
              type="button"
              onClick={() => {
                setActiveDropdown(null);
                navigate("/technologie");
              }}
              className={`relative text-sm font-semibold px-3.5 py-2 transition-all rounded-full cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                location.pathname === "/technologie"
                  ? "text-slate-900 bg-slate-100/80"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>Technologie</span>
            </button>

            {/* 5. Direct Link: À propos */}
            <button
              type="button"
              onClick={() => {
                setActiveDropdown(null);
                navigate("/a-propos");
              }}
              className={`relative text-sm font-semibold px-3.5 py-2 transition-all rounded-full cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                location.pathname === "/a-propos"
                  ? "text-slate-900 bg-slate-100/80"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>À propos</span>
            </button>
          </nav>

          {/* Persistent Header CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="header-cta-quote"
              type="button"
              onClick={() => goToSection("contact")}
              className="px-5 py-2.5 text-xs font-bold tracking-wide uppercase rounded-full transition-all duration-200 shadow-sm cursor-pointer bg-slate-900 text-white hover:bg-orange-500 hover:shadow-orange-500/20 hover:shadow-md hover:-translate-y-[1px] active:translate-y-0"
            >
              Parler à un expert
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none p-2 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer transition-colors text-slate-800 hover:text-black active:bg-slate-100 rounded-full"
              aria-label="Ouvrir le menu de navigation"
            >
              <IconRenderer name={isMobileMenuOpen ? "X" : "Menu"} size={26} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-3 sm:inset-x-6 top-[76px] z-45 bg-white/98 backdrop-blur-xl border border-slate-200 p-4 sm:p-6 flex flex-col justify-between rounded-3xl shadow-2xl h-[calc(100vh-96px)] max-h-[720px] overflow-y-auto"
          >
            <div className="flex flex-col gap-3 py-1">

              {/* Accordion 1: Robots */}
              <div className="border-b border-slate-100 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileRobotsOpen(!mobileRobotsOpen)}
                  className="w-full text-left py-3 min-h-[44px] text-base font-bold text-slate-900 hover:text-orange-600 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>Robots & Gammes</span>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200/60">
                      3 séries
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      mobileRobotsOpen ? "rotate-180 text-orange-500" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileRobotsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-1 pt-1 pb-2 flex flex-col gap-3"
                    >
                      {ROBOT_GAMMES.map((gamme) => (
                        <div key={gamme.id} className="bg-slate-50/90 rounded-2xl p-3 border border-slate-100">
                          <button
                            type="button"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              navigate(`/robots/${gamme.id}`);
                            }}
                            className="w-full text-left flex items-center justify-between group cursor-pointer"
                          >
                            <div>
                              <div className="text-sm font-bold text-slate-900 group-hover:text-orange-600 flex items-center gap-1.5">
                                <span>{gamme.title}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-orange-500 transition-transform group-hover:translate-x-0.5" />
                              </div>
                              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                                {gamme.subtitle}
                              </p>
                            </div>
                          </button>

                          {/* List of models in mobile view */}
                          <div className="flex flex-col gap-1.5 mt-2.5 pt-2.5 border-t border-slate-200/60">
                            {gamme.models.map((m) => (
                              <button
                                key={m.id}
                                type="button"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  navigate(`/robots/${gamme.id}?model=${m.canonicalId || m.id}#model-${m.canonicalId || m.id}`);
                                }}
                                className="w-full flex items-center gap-3 p-2 rounded-xl bg-white hover:bg-orange-50/60 border border-slate-200/80 hover:border-orange-200 text-left transition-all group cursor-pointer shadow-2xs"
                              >
                                <div className="w-10 h-10 shrink-0 bg-slate-50 rounded-lg p-0.5 flex items-center justify-center overflow-hidden border border-slate-100">
                                  <img
                                    src={optimizeCloudinaryUrl(m.photo, 150)}
                                    alt={m.name}
                                    className="h-9 w-full object-contain"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors truncate">
                                    {m.name}
                                  </div>
                                  <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                    {m.tagline || m.description}
                                  </div>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 2: Industries */}
              <div className="border-b border-slate-100 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                  className="w-full text-left py-3 min-h-[44px] text-base font-bold text-slate-900 hover:text-orange-600 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>Industries & Secteurs</span>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      4 secteurs
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      mobileIndustriesOpen ? "rotate-180 text-orange-500" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileIndustriesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-1 pt-1 pb-2 flex flex-col gap-2"
                    >
                      {INDUSTRY_SECTORS_DATA.map((ind) => (
                        <button
                          key={ind.id}
                          type="button"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            navigate(`/industries/${ind.id}`);
                          }}
                          className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50/60 border border-slate-200/80 hover:border-orange-200 transition-all group flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-white border border-slate-200/80 text-orange-600">
                              <IconRenderer name={ind.iconName} size={16} />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-orange-600">
                                {ind.title}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {ind.subtitle}
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct links */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/services");
                }}
                className="text-left py-3 min-h-[44px] text-base font-semibold text-slate-900 hover:text-orange-600 flex items-center justify-between cursor-pointer border-b border-slate-100"
              >
                <span>Services & Intégration</span>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/technologie");
                }}
                className="text-left py-3 min-h-[44px] text-base font-semibold text-slate-900 hover:text-orange-600 flex items-center justify-between cursor-pointer border-b border-slate-100"
              >
                <span>Technologie & Normes</span>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/a-propos");
                }}
                className="text-left py-3 min-h-[44px] text-base font-semibold text-slate-900 hover:text-orange-600 flex items-center justify-between cursor-pointer border-b border-slate-100"
              >
                <span>À propos & Alliance</span>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

            </div>

            {/* Sticky Action CTAs at bottom of Mobile Drawer */}
            <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleLaunchPrequalification}
                className="w-full py-3 min-h-[44px] text-center rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Cpu size={15} />
                <span>Lancer la préqualification</span>
              </button>
              <button
                type="button"
                onClick={() => goToSection("contact")}
                className="w-full py-3 min-h-[44px] text-center rounded-xl border border-slate-200 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Parler à un expert</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
