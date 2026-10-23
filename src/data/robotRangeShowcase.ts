import { optimizeCloudinaryUrl } from "./robotSeries";

export interface RobotHighlight {
  text: string;
}

export interface RobotRangeShowcase {
  id: string;
  seriesId: string;
  badgeLabel: string;
  badgeCategory: string;
  badgeColor: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  metricLabel: string;
  metricValue: string;
  highlights: RobotHighlight[];
  roiHref: string;
  discoverHref: string;
}

export const ROBOT_RANGE_SHOWCASES: RobotRangeShowcase[] = [
  {
    id: "uclean",
    seriesId: "uclean-series",
    badgeLabel: "NETTOYAGE & HYGIÈNE AUTONOME",
    badgeCategory: "Gamme Autolaveuses & Aspirateurs",
    badgeColor: "bg-[#0B1121] text-white",
    title: "Série uClean",
    description: "Lavage, aspiration et bionettoyage intensif pour tous types de sols.",
    image: optimizeCloudinaryUrl(
      "https://res.cloudinary.com/df1x718yw/image/upload/v1789039451/ChatGPT_Image_10_sept._2026_13_19_56_xujlb2.png",
      800
    ),
    imageAlt: "Gamme de robots d'entretien autonettoyants uClean par Phoenix-Botics",
    metricLabel: "RENDEMENT MAXIMAL",
    metricValue: "3 000 m²/h",
    highlights: [
      { text: "Filtration HEPA H13 médicale" },
      { text: "Séchage instantané anti-glisse" },
      { text: "Économie d'eau jusqu'à 50%" },
    ],
    roiHref: "/robots/uclean-series#simulateur-roi",
    discoverHref: "/robots/uclean-series",
  },
  {
    id: "ulog",
    seriesId: "ulog-series",
    badgeLabel: "INTRALOGISTIQUE & MANUTENTION AMR",
    badgeCategory: "Gamme Deliver & Lift AMR",
    badgeColor: "bg-[#0B1121] text-white",
    title: "Série uLog",
    description: "Transfert sécurisé de bacs et levage de palettes sans filoguidage.",
    image: optimizeCloudinaryUrl(
      "https://res.cloudinary.com/df1x718yw/image/upload/v1789039451/ChatGPT_Image_10_sept._2026_13_19_56_xujlb2.png",
      800
    ),
    imageAlt: "Robots mobiles intralogistiques AMR Série uLog Phoenix-Botics",
    metricLabel: "CAPACITÉ DE CHARGE",
    metricValue: "80 à 600 kg",
    highlights: [
      { text: "Navigation SLAM 3D dynamique" },
      { text: "Interfaçage WMS / ERP & ascenseurs" },
      { text: "Recharge rapide 1h30 Li-FePO4" },
    ],
    roiHref: "/robots/ulog-series#simulateur-roi",
    discoverHref: "/robots/ulog-series",
  },
  {
    id: "userve",
    seriesId: "userve-series",
    badgeLabel: "ACCUEIL & SERVICE INTERACTIF",
    badgeCategory: "Robot d'Accueil & Escorte",
    badgeColor: "bg-[#0B1121] text-white",
    title: "Série uServe",
    description: "Accueil haut de gamme, orientation dynamique et assistance en salle.",
    image: optimizeCloudinaryUrl(
      "https://res.cloudinary.com/df1x718yw/image/upload/v1789039451/ChatGPT_Image_10_sept._2026_13_19_56_xujlb2.png",
      800
    ),
    imageAlt: "Robot assistant et escorte d'accueil interactif uServe",
    metricLabel: "ÉCRAN INTERACTIF",
    metricValue: "15.6'' Full HD",
    highlights: [
      { text: "Interaction vocale multilingue (+20 langues)" },
      { text: "Escorte physique des visiteurs" },
      { text: "4 plateaux de service amovibles" },
    ],
    roiHref: "/robots/userve-series#simulateur-roi",
    discoverHref: "/robots/userve-series",
  },
];
