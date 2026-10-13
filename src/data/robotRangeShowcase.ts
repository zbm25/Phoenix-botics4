export interface ProofItem {
  label: string;
  value?: string;
}

export interface SecondaryRobotConfig {
  image: string;
  desktopOnly: boolean;
  scale: number;
  opacity: number;
  position: string;
}

export interface RobotRangeShowcase {
  id: "uclean" | "ulog" | "userve" | string;
  intent: string;
  rangeName: string;
  eyebrow: string;
  title: string;
  description: string;
  proofs: ProofItem[];
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  primaryRobot: {
    image: string;
    alt: string;
  };
  secondaryRobot?: SecondaryRobotConfig;
  backgroundScene: {
    desktopImage: string;
    mobileImage: string;
  };
}

export const ROBOT_RANGE_SHOWCASES: RobotRangeShowcase[] = [
  {
    id: "uclean",
    intent: "NETTOYER",
    rangeName: "uClean",
    eyebrow: "NETTOYAGE AUTONOME",
    title: "Des sols entretenus, même pendant votre activité.",
    description: "uClean automatise les passages répétitifs sans interrompre les flux de vos équipes et visiteurs.",
    proofs: [
      { label: "Jusqu'à 3 000 m²/h de rendement", value: "3 000 m²/h" },
      { label: "Économie d'eau et de détergent optimisée jusqu'à 50%", value: "-50%" },
    ],
    primaryCta: {
      label: "Estimer le ROI de uClean",
      href: "/robots/uclean-series#simulateur-roi",
    },
    secondaryCta: {
      label: "Découvrir la gamme uClean",
      href: "/robots/uclean-series",
    },
    primaryRobot: {
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745753/Scrub75_cyuy2d.png",
      alt: "Robot autolaveuse autonome uClean Scrub 75",
    },
    backgroundScene: {
      desktopImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1786538828/ChatGPT_Image_12_ao%C3%BBt_2026_14_33_42_tnmnoc.png",
      mobileImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1786538828/ChatGPT_Image_12_ao%C3%BBt_2026_14_33_42_tnmnoc.png",
    },
  },
  {
    id: "ulog",
    intent: "TRANSPORTER",
    rangeName: "uLog",
    eyebrow: "INTRALOGISTIQUE AUTONOME",
    title: "Vos flux avancent sans interrompre vos opérations.",
    description: "uLog automatise les transports répétitifs entre vos zones de stockage, de préparation et de production.",
    proofs: [
      { label: "Charge utile jusqu'à 600 kg (AMR Lift & Base)", value: "600 kg" },
      { label: "Navigation LiDAR SLAM sans marquage au sol", value: "SLAM 3D" },
    ],
    primaryCta: {
      label: "Estimer le ROI de uLog",
      href: "/robots/ulog-series#simulateur-roi",
    },
    secondaryCta: {
      label: "Découvrir la gamme uLog",
      href: "/robots/ulog-series",
    },
    primaryRobot: {
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747964/uLogLIFT600_URGlogo_01_face_xgxuh0.png",
      alt: "Robot mobile autonome intralogistique uLog Lift 600",
    },
    secondaryRobot: {
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747971/uLogDELIVER80_URGlogo_01_face_ktme3v.png",
      desktopOnly: true,
      scale: 0.75,
      opacity: 0.8,
      position: "right-12 bottom-8",
    },
    backgroundScene: {
      desktopImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1785933751/Gemini_Generated_Image_ehix26ehix26ehix_vcxjhs.png",
      mobileImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1785933751/Gemini_Generated_Image_ehix26ehix26ehix_vcxjhs.png",
    },
  },
  {
    id: "userve",
    intent: "SERVIR & ORIENTER",
    rangeName: "uServe",
    eyebrow: "SERVICE & ORIENTATION",
    title: "Un service plus fluide, sans détourner vos équipes.",
    description: "uServe prend en charge l'orientation et les transports de service pour laisser vos équipes se concentrer sur l'accueil.",
    proofs: [
      { label: "4 plateaux de service pour 40 kg de charge", value: "40 kg" },
      { label: "Écran interactif 15,6'' HD & interaction multilingue", value: "15,6\" HD" },
    ],
    primaryCta: {
      label: "Estimer le ROI de uServe",
      href: "/robots/userve-series#simulateur-roi",
    },
    secondaryCta: {
      label: "Découvrir la gamme uServe",
      href: "/robots/userve-series",
    },
    primaryRobot: {
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png",
      alt: "Robot d'accueil, guidage et service interactif uServe",
    },
    backgroundScene: {
      desktopImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1784567142/ChatGPT_Image_20_juil._2026_19_03_52_azmgk0.png",
      mobileImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1784567142/ChatGPT_Image_20_juil._2026_19_03_52_azmgk0.png",
    },
  },
];
