import { RobotSeriesPageData } from "./robotSeries";

export const PREVIEW_ULAB_DATA: RobotSeriesPageData = {
  id: "ulab-series",
  title: "Série uLab Mobile",
  heroTitle: "Automatisez la logistique de vos laboratoires",
  heroSubtitle: "Le cobot mobile autonome pour les sciences de la vie.",
  heroDescription: "Découvrez uLab Mobile, la solution cobotique agile conçue pour sécuriser le transfert d'échantillons en laboratoire.",
  heroImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1793705292/20a60af5-4139-430a-b193-c89c8ce08f73_ckcv71.webp",
  introTitle: "Un appui logistique pour les sciences de la vie",
  introParagraphs: [
    "Dans des environnements de laboratoire où chaque manipulation compte, uLab Mobile intervient pour assister le personnel dans les tâches logistiques répétitives.",
    "Ce cobot mobile facilite le transfert d'échantillons, permettant aux techniciens de se concentrer sur l'expertise et l'analyse."
  ],
  benefits: [
    {
      title: "Continuité Logistique",
      description: "Appui aux opérations de routine de transfert.",
      iconName: "Activity"
    },
    {
      title: "Manutention",
      description: "Transfert physique de portoirs d'échantillons (capacités exactes à valider avec les ingénieurs d'application).",
      iconName: "Shield"
    },
    {
      title: "Interfaçage Possible",
      description: "Adaptation aux flux existants (compatibilités spécifiques à évaluer lors de l'étude de site).",
      iconName: "Cpu"
    }
  ],
  models: [
    {
      id: "ulab-mobile-base",
      canonicalId: "ulab-mobile-base",
      seriesId: "ulab-series",
      tag: "À CONFIRMER",
      name: "uLab Mobile Base",
      tagline: "Plateforme cobotique mobile pour laboratoire",
      subtitle: "Logistique de paillasse",
      segmentLabel: "SCIENCES DE LA VIE",
      shortDesc: "Cobot mobile dédié aux transferts d'échantillons.",
      description: "Un robot collaboratif mobile conçu pour les laboratoires. (Spécifications techniques en cours de validation finale).",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1793705292/20a60af5-4139-430a-b193-c89c8ce08f73_ckcv71.webp",
      link: "/robots/ulab-series?model=ulab-mobile-base#model-ulab-mobile-base",
      industries: ["health", "laboratory"],
      capacite: "À confirmer",
      autonomie: "À confirmer",
      vitesse: "À confirmer",
      specs: [
        { label: "Navigation", value: "Autonome (spécifications de l'environnement à définir)" },
        { label: "Manipulation", value: "Bras collaboratif" }
      ],
      useCases: ["Laboratoires d'analyses médicales", "Centres de recherche", "Industrie pharmaceutique"],
      tasks: ["Transfert de portoirs", "Logistique inter-paillasses"]
    }
  ],
  globalUseCases: [
    "Laboratoires d'analyses médicales (biologie, hématologie)",
    "Centres de recherche et diagnostic",
    "Industrie pharmaceutique"
  ],
  supportSteps: [
    { title: "Étude de faisabilité", description: "Analyse des flux et des espaces de circulation." },
    { title: "Preuve de concept", description: "Validation de la navigation sur site." }
  ],
  faq: [
    {
      question: "Le robot uLab Mobile nécessite-t-il des modifications du laboratoire ?",
      answer: "L'intégration nécessite une étude précise. Des ajustements d'ergonomie des paillasses ou de l'environnement physique peuvent être requis."
    },
    {
      question: "Quelles sont les capacités réelles du robot ?",
      answer: "Les charges utiles, l'autonomie et les protocoles de communication dépendent de la configuration choisie et doivent être validés par nos ingénieurs lors de l'étude de faisabilité."
    }
  ]
};
