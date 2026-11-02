export interface RobotRangeShowcase {
  id: string;
  seriesId: string;
  title: string;
  subtitle: string;
  tagline: string;
  metricValue: string;
  metricLabel: string;
  metricSourceNote: string;
  dominantModel: {
    name: string;
    image: string;
    alt: string;
  };
  secondaryModels?: {
    name: string;
    image: string;
    alt: string;
  }[];
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  status?: "available" | "pilot" | "upcoming";
}

export const ROBOT_RANGE_SHOWCASES: RobotRangeShowcase[] = [
  {
    id: "range-uclean",
    seriesId: "uclean-series",
    title: "uClean",
    subtitle: "Nettoyage & Propreté Autonome",
    tagline: "Autolaveuses et aspirateurs industriels autonomes pour grandes surfaces et espaces exigus.",
    metricValue: "Jusqu'à 3 000 m²/h",
    metricLabel: "Rendement max (uClean Scrub 75)",
    metricSourceNote: "Rendement théorique maximal du modèle Scrub 75 sur sols industriels lisses.",
    dominantModel: {
      name: "uClean Scrub 75",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745753/Scrub75_cyuy2d.png",
      alt: "Autolaveuse industrielle autonome uClean Scrub 75"
    },
    secondaryModels: [
      {
        name: "uClean Scrub 50 Disc",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745593/Scrub50Disc_iwqmbf.png",
        alt: "Autolaveuse compacte uClean Scrub 50 Disc"
      },
      {
        name: "uClean Compact",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745472/Compact_wyrf5v.png",
        alt: "Robot tout-en-un uClean Compact"
      }
    ],
    primaryCta: {
      label: "Découvrir la gamme",
      href: "/robots/uclean-series"
    },
    secondaryCta: {
      label: "Estimer le ROI",
      href: "/robots/uclean-series#simulateur-roi"
    },
    status: "available"
  },
  {
    id: "range-ulog",
    seriesId: "ulog-series",
    title: "uLog",
    subtitle: "Intralogistique & Manutention AMR",
    tagline: "Robots mobiles autonomes de levage et de livraison pour ateliers, entrepôts et santé.",
    metricValue: "Jusqu'à 600 kg",
    metricLabel: "Charge utile max (uLog Lift 600)",
    metricSourceNote: "Capacité de levage et de transport du modèle Lift 600.",
    dominantModel: {
      name: "uLog Lift 600",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747964/uLogLIFT600_URGlogo_01_face_xgxuh0.png",
      alt: "Robot mobile autonome uLog Lift 600 avec charge utile 600kg"
    },
    secondaryModels: [
      {
        name: "uLog Deliver 150",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747959/uLogDELIVER150_URGlogo_01_face_Box_Admin_tprnbn.png",
        alt: "AMR de livraison uLog Deliver 150"
      },
      {
        name: "uLog Deliver 80",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747971/uLogDELIVER80_URGlogo_01_face_ktme3v.png",
        alt: "AMR agile uLog Deliver 80"
      }
    ],
    primaryCta: {
      label: "Découvrir la gamme",
      href: "/robots/ulog-series"
    },
    secondaryCta: {
      label: "Estimer le ROI",
      href: "/robots/ulog-series#simulateur-roi"
    },
    status: "available"
  },
  {
    id: "range-userve",
    seriesId: "userve-series",
    title: "uServe",
    subtitle: "Accueil, Orientation & Service Interactif",
    tagline: "Assistant cobotique d'orientation et de guidage interactif pour établissements ouverts au public.",
    metricValue: "Jusqu'à 10h",
    metricLabel: "Autonomie continue & 20+ langues",
    metricSourceNote: "Autonomie en mission continue et synthèse vocale multi-langues.",
    dominantModel: {
      name: "uServe",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png",
      alt: "Robot interactif d'accueil et de guidage uServe"
    },
    primaryCta: {
      label: "Découvrir la gamme",
      href: "/robots/userve-series"
    },
    secondaryCta: {
      label: "Estimer le ROI",
      href: "/robots/userve-series#simulateur-roi"
    },
    status: "available"
  }
];
