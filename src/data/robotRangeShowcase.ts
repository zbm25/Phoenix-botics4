export interface RobotRangeShowcase {
  id: "uclean" | "ulog" | "userve" | string;
  name: string;
  intent: string;              // "Nettoyer" | "Transporter" | "Servir & orienter"
  tagline: string;             // Accroche métier courte et percutante
  description: string;         // Présentation synthétique de la valeur ajoutée
  benefits: [string, string, string]; // Exactement 3 atouts concrets
  href: string;                // Redirection page gamme : "/robots/uclean-series", etc.
  qualificationHref: string;   // Redirection préqualification avec paramètre (?series=...)
  imageAlt: string;
  desktop: {
    primaryImage: string;      // URL Cloudinary du robot principal
    secondaryImage?: string;   // URL Cloudinary du robot secondaire (arrière-plan)
  };
  mobile: {
    primaryImage: string;      // URL Cloudinary cadrée verticalement
  };
}

export const ROBOT_RANGE_SHOWCASES: RobotRangeShowcase[] = [
  {
    id: "uclean",
    name: "Série uClean",
    intent: "Nettoyer",
    tagline: "Propreté & hygiène autonome continue",
    description: "Autolaveuses et aspirateurs cobotiques haute performance pour automatiser l'entretien de vos sols sans perturber vos activités.",
    benefits: [
      "Jusqu'à 3 000 m²/h de rendement avec filtration médicale HEPA H13",
      "Économie d'eau et de détergent optimisée jusqu'à 50%",
      "Station uHarbor 100% autonome : vidange, remplissage et recharge"
    ],
    href: "/robots/uclean-series",
    qualificationHref: "/industries/retail?series=uclean#prequalification",
    imageAlt: "Gamme de robots d'entretien et autolaveuses autonomes uClean",
    desktop: {
      primaryImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745753/Scrub75_cyuy2d.png",
      secondaryImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745472/Compact_wyrf5v.png"
    },
    mobile: {
      primaryImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745753/Scrub75_cyuy2d.png"
    }
  },
  {
    id: "ulog",
    name: "Série uLog",
    intent: "Transporter",
    tagline: "Intralogistique & manutention AMR flexible",
    description: "Robots mobiles autonomes de livraison et de levage pour fluidifier vos flux internes de 80 kg à 600 kg sans modification d'infrastructure.",
    benefits: [
      "Capacité de transport et levage lourd jusqu'à 600 kg (palettes, racks, cartons)",
      "Navigation LiDAR 3D réactive sans marquage ni bande magnétique au sol",
      "Interfaçage natif avec ascenseurs, portes automatiques et WMS/ERP"
    ],
    href: "/robots/ulog-series",
    qualificationHref: "/industries/industrie?series=ulog#prequalification",
    imageAlt: "Gamme de robots mobiles autonomes d'intralogistique uLog",
    desktop: {
      primaryImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747964/uLogLIFT600_URGlogo_01_face_xgxuh0.png",
      secondaryImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747971/uLogDELIVER80_URGlogo_01_face_ktme3v.png"
    },
    mobile: {
      primaryImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747964/uLogLIFT600_URGlogo_01_face_xgxuh0.png"
    }
  },
  {
    id: "userve",
    name: "Série uServe",
    intent: "Servir & orienter",
    tagline: "Accueil, guidance & expérience client augmentée",
    description: "Assistant d'accueil interactif et mobile pour informer, enregistrer et escorter physiquement vos visiteurs 24h/24.",
    benefits: [
      "Écran tactile 15.6'' Full HD et interaction vocale multilingue (+20 langues)",
      "Escorte physique des visiteurs avec évitement d'obstacles en temps réel",
      "Check-in autonome et orientation dynamique des flux de visiteurs"
    ],
    href: "/robots/userve-series",
    qualificationHref: "/industries/hotel-restauration?series=userve#prequalification",
    imageAlt: "Robot d'accueil et d'orientation interactif uServe",
    desktop: {
      primaryImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png"
    },
    mobile: {
      primaryImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png"
    }
  }
];
