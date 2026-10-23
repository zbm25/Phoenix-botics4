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
      "https://res.cloudinary.com/df1x718yw/image/upload/v1782745753/Scrub75_cyuy2d.png",
      800
    ),
    imageAlt: "Autolaveuse autonome uClean Scrub 75 par Phoenix-Botics",
    metricLabel: "RENDEMENT MAXIMAL",
    metricValue: "3 000 m²/h",
    highlights: [
      { text: "Nettoyage continu & traçabilité numérique" },
      { text: "Séchage immédiat anti-glissade des zones à fort passage" },
      { text: "Réduction jusqu'à 50% de la consommation d'eau et de produit" },
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
      "https://res.cloudinary.com/df1x718yw/image/upload/v1782747964/uLogLIFT600_URGlogo_01_face_xgxuh0.png",
      800
    ),
    imageAlt: "Robot mobile intralogistique AMR uLog Lift 600 Phoenix-Botics",
    metricLabel: "CAPACITÉ DE CHARGE",
    metricValue: "80 à 600 kg",
    highlights: [
      { text: "Zéro modification de site grâce à la navigation SLAM 3D" },
      { text: "Interfaçage natif avec vos ascenseurs, portes et WMS/ERP" },
      { text: "Suppression des tâches de portage lourd et prévention des TMS" },
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
      "https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png",
      800
    ),
    imageAlt: "Robot assistant et escorte d'accueil interactif uServe",
    metricLabel: "ÉCRAN INTERACTIF",
    metricValue: "15.6'' Full HD",
    highlights: [
      { text: "Point d'accueil et d'information interactif disponible 24/7" },
      { text: "Escorte physique des visiteurs jusqu'à leur destination" },
      { text: "Délestage des équipes d'accueil sur les requêtes répétitives" },
    ],
    roiHref: "/robots/userve-series#simulateur-roi",
    discoverHref: "/robots/userve-series",
  },
];
