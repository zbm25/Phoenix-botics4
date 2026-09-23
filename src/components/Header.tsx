import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { IconRenderer } from "./IconRenderer";
import { ChevronDown, ChevronRight } from "lucide-react";

interface NavLink {
  label: string;
  targetId?: string;
  path?: string;
}

interface RobotModelItem {
  id: string;
  name: string;
  description: string;
  photo: string;
}

interface DropdownGamme {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  models: RobotModelItem[];
}

const ROBOT_GAMMES: DropdownGamme[] = [
  {
    id: "uclean-series",
    title: "uClean Series",
    subtitle: "Autolaveuses autonomes pour sols durs",
    description: "Gamme d’autolaveuses autonomes compactes et industrielles pour tous types de sols.",
    iconName: "Layers",
    models: [
      {
        id: "uclean-compact",
        name: "uClean Compact",
        description: "Autolaveuse compacte pour espaces exigus : couloirs, boutiques, halls et commerces.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745472/Compact_wyrf5v.png"
      },
      {
        id: "uclean-vacuum-40",
        name: "uClean Vacuum 40",
        description: "Aspirateur autonome avec filtration HEPA H13 pour moquettes et sols durs.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745773/Vacuum40_xhxlps.png"
      },
      {
        id: "uclean-scrub-50-disc",
        name: "uClean Scrub 50 Disc",
        description: "Autolaveuse standard à brosse disque pour sols lisses : carrelage, vinyle, béton ciré.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745593/Scrub50Disc_iwqmbf.png"
      },
      {
        id: "uclean-scrub-50-roller",
        name: "uClean Scrub 50 Roller",
        description: "Autolaveuse standard à brosse rouleau pour sols texturés et micro-poreux.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745734/Scrub50Roller_iqgbqn.png"
      },
      {
        id: "uclean-scrub-75",
        name: "uClean Scrub 75",
        description: "Autolaveuse grande largeur pour très grandes surfaces industrielles et logistiques.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745753/Scrub75_cyuy2d.png"
      }
    ]
  },
  {
    id: "ulog-series",
    title: "uLog Series",
    subtitle: "Robots de logistique autonome",
    description: "Plateformes mobiles AMR pour la livraison et le levage de charges de 80 à 600 kg.",
    iconName: "Truck",
    models: [
      {
        id: "ulog-deliver-80",
        name: "uLog Deliver 80",
        description: "AMR compact pour charges légères jusqu'à 80 kg, idéal pour les espaces restreints.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747971/uLogDELIVER80_URGlogo_01_face_ktme3v.png"
      },
      {
        id: "ulog-deliver-150",
        name: "uLog Deliver 150",
        description: "Robot de transport sécurisé multi-bacs pour les hôpitaux, cliniques et centres de tri.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747959/uLogDELIVER150_URGlogo_01_face_Box_Admin_tprnbn.png"
      },
      {
        id: "ulog-deliver-300",
        name: "uLog Deliver 300",
        description: "Plateforme logistique pour transfert de bacs et charges moyennes jusqu'à 300 kg.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747948/uLogDELIVER300_URGlogo_01_face_pihxaa.png"
      },
      {
        id: "ulog-deliver-300-xl",
        name: "uLog Deliver 300 XL",
        description: "Châssis étendu 300 kg pour contenants volumineux et logistique de production.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747951/uLogDELIVER300XL_LIFT300XL_URGlogo_01_face_m95qag.png"
      },
      {
        id: "ulog-lift-300-base",
        name: "uLog Lift 300 Base",
        description: "Base de levage agile 300 kg pour chariots et étagères mobiles industrielles.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747963/uLogLIFT600BASE_LIFT300XL_URGlogo_01_uv1lwf.png"
      },
      {
        id: "ulog-lift-300-xl",
        name: "uLog Lift 300 XL",
        description: "AMR de levage 300 kg équipé d'un écran de contrôle tactile intégré.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747951/uLogDELIVER300XL_LIFT300XL_URGlogo_01_face_m95qag.png"
      },
      {
        id: "ulog-lift-600-base",
        name: "uLog Lift 600 Base",
        description: "Base modulaire ultra-robuste pour charges lourdes et palettes jusqu'à 600 kg.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747963/uLogLIFT600BASE_LIFT300XL_URGlogo_01_uv1lwf.png"
      },
      {
        id: "ulog-lift-600",
        name: "uLog Lift 600",
        description: "AMR de levage haute capacité avec intégration WMS/ERP pour entrepôts industriels.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747964/uLogLIFT600_URGlogo_01_face_xgxuh0.png"
      }
    ]
  },
  {
    id: "userve-series",
    title: "uServe Series",
    subtitle: "Service & interaction client",
    description: "Robots d’accueil, de guidage dynamique et de service en salle.",
    iconName: "User",
    models: [
      {
        id: "userve",
        name: "uServe",
        description: "Robot d’accueil et de guidage interactif avec grand écran HD pour informer et servir.",
        photo: "https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png"
      }
    ]
  }
];

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
    title: "Retail & Commerce",
    subtitle: "Grande distribution, boutiques",
    description: "Déploiement de robots d'accueil pour orienter vos clients et automatisation des flux logistiques légers en rayons.",
    iconName: "ShoppingBag",
    supportedRobots: ["uClean", "uLog Deliver", "uServe"]
  },
  {
    id: "hospitality",
    title: "Hôtellerie & Restauration",
    subtitle: "Hôtels, restaurants, hospitality",
    description: "Nos robots prennent en charge les allers-retours cuisine-salle et le room-service pour recentrer vos équipes sur l'accueil.",
    iconName: "Utensils",
    supportedRobots: ["uServe", "uClean", "uLog Deliver"]
  },
  {
    id: "health",
    title: "Santé & Médical",
    subtitle: "Hôpitaux, cliniques, EHPAD",
    description: "Intégration de robots mobiles autonomes d'intralogistique pour faire circuler linge, repas, médicaments et prélèvements.",
    iconName: "HeartPulse",
    supportedRobots: ["uLog Deliver", "uClean"]
  },
  {
    id: "industry",
    title: "Logistique & Industrie",
    subtitle: "Entrepôts, usines, intralogistique",
    description: "Liaison dynamique de vos lignes de production via des AMR sans réorganisation physique lourde.",
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
  const [hoveredModelId, setHoveredModelId] = useState<string | null>(null);

  const activeGammeObj =
    ROBOT_GAMMES.find((gamme) => gamme.id === hoveredGamme) ?? ROBOT_GAMMES[0];

  const activeModel =
    activeGammeObj.models.find((m) => m.id === hoveredModelId) ?? activeGammeObj.models[0];

  const activeIndustryObj =
    INDUSTRY_SECTORS_DATA.find((ind) => ind.id === hoveredIndustry) ?? INDUSTRY_SECTORS_DATA[0];

  const navLinks: NavLink[] = [
    { label: "Robots", targetId: "robots-catalog" },
    { label: "Industries", targetId: "industries" },
    { label: "Services", path: "/services" },
    { label: "Technologie", path: "/technologie" },
    { label: "À propos", path: "/a-propos" },
    { label: "Contact", targetId: "contact" }
  ];

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
    const isLocalContact = id === "contact" && (location.pathname.startsWith("/robots/") || location.pathname.startsWith("/secteurs/") || location.pathname.startsWith("/industries/"));
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

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-3 sm:top-4 left-3 right-3 sm:left-6 sm:right-6 max-w-7xl mx-auto z-50 transition-all duration-300 rounded-full bg-white/95 backdrop-blur-md border px-4 sm:px-6 py-2.5 flex items-center justify-between ${
          showNavbar ? "translate-y-0" : "-translate-y-[200%]"
        } ${
          isScrolled
            ? "border-gray-200/80 shadow-xl shadow-gray-200/15"
            : "border-gray-150 shadow-md"
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 lg:gap-4">
            {/* Robots with dropdown */}
            <div 
              className="py-2"
              onMouseEnter={() => setActiveDropdown("robots")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => {
                  if (location.pathname === "/") {
                    scrollToSection("robots-catalog");
                  } else {
                    navigate("/robots/uclean-series");
                  }
                }}
                className="relative text-sm font-medium text-slate-700 px-3 py-1.5 transition-colors duration-150 hover:text-orange-500 cursor-pointer group flex items-center gap-1 animate-none outline-none focus:outline-none"
              >
                <span>Robots</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 group-hover:text-orange-500 ${activeDropdown === "robots" ? "rotate-180 text-orange-500" : ""}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === "robots" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[940px] max-w-[calc(100vw-2rem)] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 z-50 grid grid-cols-12 gap-6 backdrop-blur-md before:content-[''] before:absolute before:-top-4 before:left-0 before:right-0 before:h-4"
                  >
                    {/* Left Column - List of Series */}
                    <div className="col-span-4 flex flex-col gap-1 pr-2 border-r border-white/5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block px-2 mb-2">Séries</span>
                      {ROBOT_GAMMES.map((gamme) => (
                        <button
                          key={gamme.id}
                          onMouseEnter={() => {
                            setHoveredGamme(gamme.id);
                            setHoveredModelId(gamme.models[0].id);
                          }}
                          onClick={() => {
                            navigate(`/robots/${gamme.id}`);
                            setActiveDropdown(null);
                          }}
                          className={`flex items-start gap-3 p-2 rounded-xl transition-all text-left w-full cursor-pointer group/item ${
                            hoveredGamme === gamme.id
                              ? "bg-white/10 text-orange-400"
                              : "hover:bg-white/5 text-slate-200"
                          }`}
                        >
                          <div className={`p-2 rounded-lg transition-all ${hoveredGamme === gamme.id ? "bg-orange-500/20 text-orange-400" : "bg-white/5 text-slate-400 group-hover/item:text-orange-400 group-hover/item:bg-orange-500/10"}`}>
                            <IconRenderer name={gamme.iconName} size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`font-bold text-sm transition-colors ${hoveredGamme === gamme.id ? "text-orange-400" : "text-white group-hover/item:text-orange-400"}`}>{gamme.title}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5 truncate leading-tight">{gamme.subtitle}</div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Middle Column - List of Models */}
                    <div className="col-span-4 flex flex-col gap-1 pr-2 border-r border-white/5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block px-2 mb-2">Modèles</span>
                      <div className="flex flex-col gap-1 overflow-y-auto max-h-[300px] pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {activeGammeObj.models.map((model) => (
                          <button
                            key={model.id}
                            onMouseEnter={() => setHoveredModelId(model.id)}
                            onClick={() => {
                              navigate(`/robots/${activeGammeObj.id}?model=${model.id}#model-${model.id}`);
                              setActiveDropdown(null);
                            }}
                            className={`flex flex-col p-2.5 rounded-xl transition-all text-left w-full cursor-pointer border ${
                              activeModel.id === model.id
                                ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
                                : "bg-transparent border-transparent hover:bg-white/5 text-slate-300"
                            }`}
                          >
                            <span className={`font-bold text-xs transition-colors ${activeModel.id === model.id ? "text-orange-400" : "text-white"}`}>{model.name}</span>
                            <span className="text-[10px] text-slate-400 leading-normal line-clamp-1 mt-0.5">{model.description}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right Column - Dynamic Preview */}
                    <div className="col-span-4 flex flex-col justify-between h-full min-h-[350px]">
                      <div className="flex flex-col gap-3">
                        <div className="w-full h-52 bg-slate-950/60 rounded-xl flex items-center justify-center p-4 border border-white/5 overflow-hidden relative">
                          <div className="absolute top-3 left-3 px-1.5 py-0.5 rounded bg-orange-500/20 border border-orange-500/30 text-[8px] font-mono font-semibold text-orange-400 uppercase tracking-wider">
                            Aperçu
                          </div>
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={activeModel.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              src={activeModel.photo}
                              alt={activeModel.name}
                              onError={() => {
                                console.error("Image navbar introuvable :", activeModel.photo);
                              }}
                              className="h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                              referrerPolicy="no-referrer"
                            />
                          </AnimatePresence>
                        </div>

                        <div className="text-left px-1">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeModel.id}
                              initial={{ opacity: 0, x: 5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 5 }}
                              transition={{ duration: 0.15 }}
                            >
                              <h4 className="text-white font-bold text-sm leading-tight">{activeModel.name}</h4>
                              <p className="text-[9px] text-orange-400 font-mono mt-0.5 uppercase tracking-wider">{activeGammeObj.title}</p>
                              <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                                {activeModel.description}
                              </p>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          navigate(`/robots/${activeGammeObj.id}?model=${activeModel.id}#model-${activeModel.id}`);
                          setActiveDropdown(null);
                        }}
                        className="mt-3 flex items-center gap-1 text-orange-400 hover:text-orange-300 text-xs font-semibold group/btn text-left self-start cursor-pointer px-1"
                      >
                        <span>Voir la fiche de ce modèle</span>
                        <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries with dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown("industries")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => {
                  if (location.pathname === "/") {
                    scrollToSection("industries");
                  } else {
                    navigate("/industries/retail");
                  }
                }}
                className="relative text-sm font-medium text-slate-700 px-3 py-1.5 transition-colors duration-150 hover:text-orange-500 cursor-pointer group flex items-center gap-1 animate-none outline-none focus:outline-none"
              >
                <span>Industries</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 group-hover:text-orange-500 ${activeDropdown === "industries" ? "rotate-180 text-orange-500" : ""}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === "industries" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[580px] sm:w-[620px] md:w-[660px] max-w-[calc(100vw-2rem)] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-4 z-50 grid grid-cols-12 gap-4 backdrop-blur-md"
                  >
                    <div className="col-span-7 flex flex-col gap-1 pr-2 border-r border-white/5">
                      {INDUSTRY_SECTORS_DATA.map((ind) => (
                        <button
                          key={ind.id}
                          onMouseEnter={() => setHoveredIndustry(ind.id)}
                          onClick={() => {
                            navigate(`/industries/${ind.id}`);
                            setActiveDropdown(null);
                          }}
                          className={`flex items-start gap-3 p-2 rounded-xl transition-all text-left w-full cursor-pointer group/item ${
                            hoveredIndustry === ind.id
                              ? "bg-white/10 text-orange-400"
                              : "hover:bg-white/5 text-slate-200"
                          }`}
                        >
                          <div className={`p-2 rounded-lg transition-all ${hoveredIndustry === ind.id ? "bg-orange-500/20 text-orange-400" : "bg-white/5 text-slate-400 group-hover/item:text-orange-400 group-hover/item:bg-orange-500/10"}`}>
                            <IconRenderer name={ind.iconName} size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`font-bold text-sm transition-colors ${hoveredIndustry === ind.id ? "text-orange-400" : "text-white group-hover/item:text-orange-400"}`}>{ind.title}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5 truncate leading-tight">{ind.subtitle}</div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="col-span-5 flex flex-col justify-between h-full min-h-[220px]">
                      <div className="flex flex-col gap-3">
                        <div className="text-left">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeIndustryObj.id}
                              initial={{ opacity: 0, x: 5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 5 }}
                              transition={{ duration: 0.15 }}
                              className="flex flex-col gap-2"
                            >
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded bg-orange-500/20 text-orange-400">
                                  <IconRenderer name={activeIndustryObj.iconName} size={14} />
                                </div>
                                <h4 className="text-white font-bold text-sm leading-tight">{activeIndustryObj.title}</h4>
                              </div>
                              <p className="text-[9px] text-orange-400 font-mono mt-0.5 uppercase tracking-wider">{activeIndustryObj.subtitle}</p>
                              <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-3">
                                {activeIndustryObj.description}
                              </p>
                              
                              <div className="mt-2 pt-2 border-t border-white/10">
                                <span className="text-[9px] font-mono text-slate-400 uppercase block mb-1">Cobiots recommandés:</span>
                                <div className="flex flex-wrap gap-1">
                                  {activeIndustryObj.supportedRobots.map((robot) => (
                                    <span key={robot} className="text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-white/10 border border-white/5 text-orange-400">
                                      {robot}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          navigate(`/industries/${activeIndustryObj.id}`);
                          setActiveDropdown(null);
                        }}
                        className="mt-3 flex items-center gap-1 text-orange-400 hover:text-orange-300 text-xs font-semibold group/btn text-left self-start cursor-pointer"
                      >
                        <span>Voir ce secteur</span>
                        <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simple links */}
            {[
              { label: "Services", path: "/services" },
              { label: "Technologie", path: "/technologie" },
              { label: "À propos", path: "/a-propos" },
              { label: "Contact", targetId: "contact" }
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setActiveDropdown(null);
                  if (link.path) {
                    navigate(link.path);
                  } else if (link.targetId) {
                    goToSection(link.targetId);
                  }
                }}
                className="relative text-sm font-medium text-slate-700 px-3 py-1.5 transition-colors duration-150 hover:text-orange-500 cursor-pointer group"
              >
                <span className="relative">
                  {link.label}
                  <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-[2px] rounded-full origin-center scale-x-0 bg-orange-500 transition-transform duration-200 group-hover:scale-x-100" />
                </span>
              </button>
            ))}
          </nav>

          {/* Desktop Call to Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              id="header-cta-quote"
              onClick={() => goToSection("contact")}
              className="px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-150 shadow-sm cursor-pointer bg-slate-900 text-white hover:bg-slate-950 hover:shadow-md hover:-translate-y-[1px]"
            >
              Parler à un expert
            </button>
          </div>

          {/* Mobile/Tablet hamburger button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none p-2 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer transition-colors text-slate-800 hover:text-black active:bg-slate-100 rounded-full"
              aria-label="Toggle navigation menu"
            >
              <IconRenderer name={isMobileMenuOpen ? "X" : "Menu"} size={26} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Slide Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-3 sm:inset-x-6 top-[76px] z-45 bg-white/95 backdrop-blur-lg border border-slate-200 p-4 sm:p-6 flex flex-col justify-between rounded-3xl shadow-2xl h-[calc(100vh-100px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-3 py-2">
              {/* Accordéon 1 : Robots */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileRobotsOpen(!mobileRobotsOpen)}
                  className="w-full text-left py-3 min-h-[44px] text-lg font-display font-medium text-slate-900 hover:text-orange-500 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <span>Robots</span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200/60">
                      3 gammes
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
                      className="overflow-hidden pl-2 pt-1 pb-2 flex flex-col gap-2"
                    >
                      {ROBOT_GAMMES.map((gamme) => (
                        <div key={gamme.id} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                          <button
                            type="button"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              navigate(`/robots/${gamme.id}`);
                            }}
                            className="w-full text-left flex items-center justify-between group cursor-pointer"
                          >
                            <div>
                              <div className="text-sm font-bold text-slate-900 group-hover:text-orange-500 flex items-center gap-1.5">
                                <span>{gamme.title}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-orange-500 transition-transform group-hover:translate-x-0.5" />
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {gamme.subtitle}
                              </p>
                            </div>
                          </button>
                          
                          {/* Liste enrichie des modèles avec photo, descriptif et navigation ciblée */}
                          <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-200/60">
                            {gamme.models.map((m) => (
                              <button
                                key={m.id}
                                type="button"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  navigate(`/robots/${gamme.id}?model=${m.id}#model-${m.id}`);
                                }}
                                className="w-full flex items-center gap-3 p-2 rounded-lg bg-white hover:bg-orange-50/50 border border-slate-200/80 hover:border-orange-200 text-left transition-all group cursor-pointer"
                              >
                                <div className="w-10 h-10 shrink-0 bg-slate-100/60 rounded-md p-0.5 flex items-center justify-center overflow-hidden">
                                  <img
                                    src={m.photo}
                                    alt={m.name}
                                    className="h-10 w-full object-contain"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors truncate">
                                    {m.name}
                                  </div>
                                  <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                    {m.description}
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

              {/* Accordéon 2 : Industries */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                  className="w-full text-left py-3 min-h-[44px] text-lg font-display font-medium text-slate-900 hover:text-orange-500 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <span>Industries</span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
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
                      className="overflow-hidden pl-2 pt-1 pb-2 flex flex-col gap-1.5"
                    >
                      {INDUSTRY_SECTORS_DATA.map((ind) => (
                        <button
                          key={ind.id}
                          type="button"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            navigate(`/industries/${ind.id}`);
                          }}
                          className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50/50 border border-slate-100 hover:border-orange-200 transition-all group flex items-center justify-between cursor-pointer"
                        >
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover:text-orange-600">
                              {ind.title}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {ind.subtitle}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Liens simples directs */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/services");
                }}
                className="text-left py-3 min-h-[44px] text-lg font-display font-medium text-slate-900 hover:text-orange-500 flex items-center justify-between cursor-pointer border-b border-gray-100"
              >
                <span>Services & Intégration</span>
                <IconRenderer name="ArrowRight" size={16} className="text-orange-500" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/technologie");
                }}
                className="text-left py-3 min-h-[44px] text-lg font-display font-medium text-slate-900 hover:text-orange-500 flex items-center justify-between cursor-pointer border-b border-gray-100"
              >
                <span>Technologie & Normes</span>
                <IconRenderer name="ArrowRight" size={16} className="text-orange-500" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/a-propos");
                }}
                className="text-left py-3 min-h-[44px] text-lg font-display font-medium text-slate-900 hover:text-orange-500 flex items-center justify-between cursor-pointer border-b border-gray-100"
              >
                <span>À Propos & Alliance</span>
                <IconRenderer name="ArrowRight" size={16} className="text-orange-500" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  goToSection("contact");
                }}
                className="text-left py-3 min-h-[44px] text-lg font-display font-medium text-slate-900 hover:text-orange-500 flex items-center justify-between cursor-pointer border-b border-gray-100"
              >
                <span>Contact & Audit</span>
                <IconRenderer name="ArrowRight" size={16} className="text-orange-500" />
              </button>
            </div>

            <div className="flex flex-col gap-3 pb-4">
              <button
                id="mobile-cta-meeting"
                onClick={() => goToSection("contact")}
                className="w-full py-3.5 min-h-[44px] text-center rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 cursor-pointer flex items-center justify-center"
              >
                Planifier une démo
              </button>
              <button
                id="mobile-cta-callback"
                onClick={() => goToSection("contact")}
                className="w-full py-3 min-h-[44px] text-center rounded-xl border border-gray-200 text-slate-700 text-xs font-semibold uppercase tracking-wider hover:bg-black/5 cursor-pointer flex items-center justify-center"
              >
                Me faire rappeler
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
