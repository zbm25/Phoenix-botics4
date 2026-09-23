export interface RobotModelSpec {
  label: string;
  value: string;
}

export interface RobotModelData {
  id: string;
  canonicalId: string;
  seriesId: string;
  name: string;
  tag?: string;
  tagline: string;
  subtitle?: string;
  segmentLabel: string;
  shortDesc: string;
  description: string;
  image: string;
  link: string;
  industries: string[];
  specs: RobotModelSpec[];
  useCases?: string[];
  tasks?: string[];
  rendement?: string;
  autonomie?: string;
  dimensions?: string;
  capacite?: string;
  poids?: string;
  vitesse?: string;
  tempsCharge?: string;
  stations?: string;
  modes?: string[];
  sols?: string[];
  environnements?: string[];
}

export interface BenefitData {
  title: string;
  description: string;
  iconName: string;
}

export interface SupportStepData {
  title: string;
  description: string;
}

export interface FAQData {
  question: string;
  answer: string;
}

export interface RobotSeriesPageData {
  id: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  introTitle: string;
  introParagraphs: string[];
  benefits: BenefitData[];
  models: RobotModelData[];
  globalUseCases: string[];
  supportSteps: SupportStepData[];
  faq: FAQData[];
}

export const ROBOT_SERIES_DATA: Record<string, RobotSeriesPageData> = {
  "uclean-series": {
    id: "uclean-series",
    title: "Série uClean",
    heroTitle: "Automatisez le nettoyage de vos espaces professionnels",
    heroSubtitle: "L'excellence de la propreté automatisée en continu.",
    heroDescription: "Découvrez notre gamme d'autolaveuses et d'aspirateurs autonomes de pointe. Conçus pour opérer en toute sécurité aux côtés de vos collaborateurs et du grand public, ils garantissent une hygiène impeccable de vos locaux tout en valorisant le travail de vos équipes d'entretien.",
    heroImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745753/Scrub75_cyuy2d.png",
    introTitle: "La propreté autonome comme standard de qualité",
    introParagraphs: [
      "Dans un contexte de recrutement complexe et de forte rotation des équipes de nettoyage, la régularité opérationnelle est devenue un défi quotidien pour tous les gestionnaires de sites. Les robots de la gamme uClean interviennent pour libérer vos agents des tâches d'aspiration et de brossage de grandes surfaces, qui s'avèrent être les plus répétitives et pénibles du métier.",
      "Nos cobots travaillent de jour comme de nuit, en parfaite harmonie avec vos visiteurs ou clients, pour assurer une propreté constante et scientifiquement traçable. Vos agents de propreté se concentrent quant à eux sur les tâches d'expertise à forte valeur ajoutée (surfaces de contact, sanitaires, finitions), augmentant ainsi la qualité globale du service, leur productivité et leur fierté professionnelle au quotidien."
    ],
    benefits: [
      {
        title: "Régularité Opérationnelle",
        description: "Nettoyage quotidien programmé, sans faille et traçable via des rapports de performance numériques précis.",
        iconName: "CheckCircle2"
      },
      {
        title: "Réduction de la Pénibilité",
        description: "Soulage vos équipes des tâches répétitives d'aspiration et de récurage de milliers de mètres carrés.",
        iconName: "ShieldCheck"
      },
      {
        title: "Optimisation des Ressources",
        description: "Jusqu'à 50% d'économie d'eau et de détergent grâce à un dosage d'une précision millimétrique de nos injecteurs.",
        iconName: "Layers"
      }
    ],
    models: [
      {
        id: "compact",
        canonicalId: "uclean-compact",
        seriesId: "uclean-series",
        tag: "MODÈLE 01",
        name: "uClean Compact",
        tagline: "Robot de nettoyage tout-en-un 4-en-1 pour espaces exigus (< 1 000 m²)",
        subtitle: "Robot de nettoyage tout-en-un 4-en-1 pour espaces exigus (< 1 000 m²)",
        segmentLabel: "ENTRETIEN RESTREINT",
        shortDesc: "Autolaveuse compacte pensée pour les espaces restreints et les circulations serrées.",
        description: "L'autolaveuse autonome la plus agile de notre catalogue, idéale pour les espaces exigus de moins de 1000m². Elle se faufile avec aisance sous le mobilier et dans les couloirs étroits de 1 mètre de large.",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745472/Compact_wyrf5v.png",
        link: "/robots/uclean-series?model=uclean-compact#model-uclean-compact",
        industries: ["hospitality", "retail", "health"],
        rendement: "300 - 450 m²/h",
        autonomie: "Lavage : 4h30 | Aspiration : 4h50 | Balayage : 12h",
        dimensions: "540 (L) × 440 (l) × 617 (H) mm",
        capacite: "42 L propre / 45 L usé",
        poids: "130 kg",
        vitesse: "0.8 m/s",
        tempsCharge: "~2 h",
        stations: "Compatible uCharge 03 & uHarbor 03 (vidange/remplissage auto)",
        modes: ["Balayage", "Aspiration", "Frottement", "Nettoyage humide"],
        sols: ["Carrelage en céramique", "Pierres naturelles", "Moquette à poils ras", "PVC & Vinyle", "Bois véritable", "Epoxy", "Sol en béton"],
        environnements: ["Magasins & Supermarchés", "Hôpitaux & Cliniques", "Bureaux tertiaires", "Restaurants & Hôtels", "Établissements scolaires"],
        specs: [
          { label: "Rendement théorique", value: "300 - 450 m²/h" },
          { label: "Dimensions", value: "540 × 440 × 617 mm" },
          { label: "Autonomie moyenne", value: "Lavage 4h30 / Aspiration 4h50" },
          { label: "Réservoirs eau", value: "42 L propre / 45 L usé" },
          { label: "Poids à vide", value: "130 kg" }
        ],
        useCases: ["Halls de réception", "Boutiques & supermarchés", "Hôtels & restaurants", "Bureaux et couloirs"],
        tasks: ["Aspiration des poussières", "Lavage humide haute pression", "Séchage immédiat anti-glissade"]
      },
      {
        id: "vacuum-40",
        canonicalId: "uclean-vacuum-40",
        seriesId: "uclean-series",
        tag: "MODÈLE 02",
        name: "uClean Vacuum 40",
        tagline: "Aspiration autonome continue avec filtration médicale HEPA H13",
        subtitle: "Aspiration autonome continue avec filtration médicale HEPA H13",
        segmentLabel: "ASPIRATION AUTONOME",
        shortDesc: "Robot d’aspiration autonome pour maintenir les sols propres dans les halls et espaces communs.",
        description: "Aspirateur autonome équipé d'un filtre HEPA H13 de niveau médical. Il capture 99,97% de la poussière fine et des allergènes tout en maintenant un niveau sonore feutré idéal pour un usage en journée.",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745773/Vacuum40_xhxlps.png",
        link: "/robots/uclean-series?model=uclean-vacuum-40#model-uclean-vacuum-40",
        industries: ["hospitality", "health", "retail"],
        rendement: "800 - 1 200 m²/h",
        autonomie: "Aspiration continue : 4h00",
        dimensions: "650 × 520 × 1050 mm",
        capacite: "Bac poussière 35 L + Filtre HEPA H13",
        poids: "115 kg",
        vitesse: "1.0 m/s",
        tempsCharge: "~2h30",
        stations: "Station de charge autonome uCharge",
        modes: ["Aspiration haute puissance", "Filtration HEPA", "Brossage des bordures"],
        sols: ["Moquette rase", "Moquette épaisse", "Parquet", "PVC", "Béton ciré"],
        environnements: ["Hôtels & Résidences", "Bureaux et Coworking", "Cliniques", "Espaces événementiels"],
        specs: [
          { label: "Rendement théorique", value: "800 - 1 200 m²/h" },
          { label: "Dimensions", value: "650 × 520 × 1050 mm" },
          { label: "Autonomie moyenne", value: "4h00 en continu" },
          { label: "Collecteur poussière", value: "Bac 35 L + Filtre HEPA H13" },
          { label: "Poids à vide", value: "115 kg" }
        ],
        useCases: ["Hôtels de luxe", "Cliniques et hôpitaux", "Bureaux tertiaires", "Bibliothèques et musées"],
        tasks: ["Aspiration robotisée de précision", "Filtration de l'air HEPA H13", "Gestion intelligente des tapis et sols durs"]
      },
      {
        id: "scrub-50-disc",
        canonicalId: "uclean-scrub-50-disc",
        seriesId: "uclean-series",
        tag: "MODÈLE 03",
        name: "uClean Scrub 50 Disc",
        tagline: "Autolaveuse polyvalente à disques pour surfaces moyennes à fortes",
        subtitle: "Autolaveuse polyvalente à disques pour surfaces moyennes à fortes",
        segmentLabel: "LAVAGE AUTONOME",
        shortDesc: "Autolaveuse autonome performante pour les grandes surfaces et espaces à fort passage.",
        description: "L'autolaveuse polyvalente par excellence pour tous les sols lisses plats. Grâce à son système à double disques, elle garantit un récurage homogène, un dosage précis et un séchage immédiat.",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745593/Scrub50Disc_iwqmbf.png",
        link: "/robots/uclean-series?model=uclean-scrub-50-disc#model-uclean-scrub-50-disc",
        industries: ["retail", "health", "hospitality"],
        rendement: "1 200 - 1 800 m²/h",
        autonomie: "Lavage continu : 5h30",
        dimensions: "860 × 700 × 1030 mm",
        capacite: "50 L propre / 50 L usé",
        poids: "180 kg",
        vitesse: "1.2 m/s",
        tempsCharge: "~3 h",
        stations: "Compatible Station autonome uHarbor (Eau + Électricité)",
        modes: ["Lavage haute pression", "Aspiration des liquides", "Séchage immédiat anti-glisse"],
        sols: ["Carrelage", "Marbre & Granit", "Résine Epoxy", "Thermoplastique", "Béton poli"],
        environnements: ["Grandes surfaces", "Centres commerciaux", "Halls de gares", "Hôpitaux"],
        specs: [
          { label: "Rendement théorique", value: "1 200 - 1 800 m²/h" },
          { label: "Dimensions", value: "860 × 700 × 1030 mm" },
          { label: "Autonomie moyenne", value: "5h30" },
          { label: "Réservoirs eau", value: "50 L propre / 50 L usé" },
          { label: "Poids à vide", value: "180 kg" }
        ],
        useCases: ["Centres commerciaux", "Hôpitaux", "Gares & Aéroports", "Bureaux d'entreprises"],
        tasks: ["Brossage disque intensif", "Dosage de détergent automatique", "Séchage instantané de la piste"]
      },
      {
        id: "scrub-50-roller",
        canonicalId: "uclean-scrub-50-roller",
        seriesId: "uclean-series",
        tag: "MODÈLE 04",
        name: "uClean Scrub 50 Roller",
        tagline: "Brossage cylindrique intensif pour sols texturés et joints profonds",
        subtitle: "Brossage cylindrique intensif pour sols texturés et joints profonds",
        segmentLabel: "BROSSAGE CYLINDRIQUE",
        shortDesc: "Autolaveuse cylindrique pour désincruster les joints et surfaces antidérapantes.",
        description: "Ses brosses rouleaux cylindriques nettoient en profondeur les aspérités des sols poreux et ramassent les petits débris solides sans bloquer les conduits d'aspiration.",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745734/Scrub50Roller_iqgbqn.png",
        link: "/robots/uclean-series?model=uclean-scrub-50-roller#model-uclean-scrub-50-roller",
        industries: ["industry", "retail"],
        rendement: "1 200 - 1 800 m²/h",
        autonomie: "Lavage & Brossage : 5h00",
        dimensions: "860 × 700 × 1030 mm",
        capacite: "50 L propre / 50 L usé + bac à déchets",
        poids: "190 kg",
        vitesse: "1.2 m/s",
        tempsCharge: "~3 h",
        stations: "Compatible Station autonome uHarbor",
        modes: ["Balayage intégré", "Brossage rouleau haute pression", "Lavage humide", "Séchage"],
        sols: ["Carrelage avec joints profonds", "Sols antidérapants", "Pierres structurées", "Béton brut"],
        environnements: ["Grandes cuisines & Agro", "Centres aquatiques", "Ateliers", "Halles commerciales"],
        specs: [
          { label: "Rendement théorique", value: "1 200 - 1 800 m²/h" },
          { label: "Dimensions", value: "860 × 700 × 1030 mm" },
          { label: "Autonomie moyenne", value: "5h00" },
          { label: "Réservoirs eau", value: "50 L propre / 55 L usé" },
          { label: "Poids à vide", value: "190 kg" }
        ],
        useCases: ["Cuisines industrielles", "Ateliers légers", "Salles de sport", "Halls de transit rugueux"],
        tasks: ["Brossage rouleau pénitent", "Ramassage de petits débris solides", "Séchage haute efficacité"]
      },
      {
        id: "scrub-75",
        canonicalId: "uclean-scrub-75",
        seriesId: "uclean-series",
        tag: "MODÈLE 05",
        name: "uClean Scrub 75",
        tagline: "Puissance industrielle pour très grands volumes et sites logistiques",
        subtitle: "Puissance industrielle pour très grands volumes et sites logistiques",
        segmentLabel: "LAVAGE INDUSTRIEL HEAVY DUTY",
        shortDesc: "Autolaveuse industrielle très haute capacité pour le nettoyage intensif des entrepôts et usines.",
        description: "Le géant du lavage autonome conçu pour les environnements les plus exigeants, avec une tête de brossage large de 750 mm et un recyclage d'eau actif à 4 filtres.",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782745753/Scrub75_cyuy2d.png",
        link: "/robots/uclean-series?model=uclean-scrub-75#model-uclean-scrub-75",
        industries: ["industry"],
        rendement: "2 500 - 3 000 m²/h",
        autonomie: "Lavage intensif : 6h00",
        dimensions: "1350 × 920 × 1250 mm",
        capacite: "75 L propre / 85 L usé",
        poids: "320 kg",
        vitesse: "1.4 m/s",
        tempsCharge: "~3h30",
        stations: "Station uHarbor Heavy Duty",
        modes: ["Décapage intensif", "Élimination des graisses", "Lavage grande vitesse", "Aspiration lourde"],
        sols: ["Béton industriel quartzé", "Enrobé lisse", "Résines industrielles", "Grandes dalles"],
        environnements: ["Usines de production", "Hubs logistiques", "Parkings couverts", "Aéroports"],
        specs: [
          { label: "Rendement théorique", value: "2 500 - 3 000 m²/h" },
          { label: "Dimensions", value: "1350 × 920 × 1250 mm" },
          { label: "Autonomie moyenne", value: "6h00" },
          { label: "Réservoirs eau", value: "75 L propre / 85 L usé" },
          { label: "Poids à vide", value: "320 kg" }
        ],
        useCases: ["Entrepôts logistiques", "Usines de fabrication", "Grands halls d'expositions", "Parkings couverts lisses"],
        tasks: ["Nettoyage intensif grande largeur", "Recyclage d'eau actif à 4 filtres", "Cartographie multi-zones complexe"]
      }
    ],
    globalUseCases: [
      "Surfaces de vente et galeries marchandes",
      "Établissements de santé et cliniques",
      "Hubs de transport (gares, aéroports, métros)",
      "Entrepôts et plateformes logistiques",
      "Campus universitaires et établissements scolaires",
      "Établissements d'accueil du public et bureaux"
    ],
    supportSteps: [
      { title: "Audit Technique", description: "Analyse complète in situ de la nature de vos sols, des encombrements, et rédaction du cahier des charges de nettoyage." },
      { title: "Cartographie fine", description: "Numérisation par LiDAR 3D haute précision de vos bâtiments pour définir les parcours optimaux et les zones d'exclusion." },
      { title: "Déploiement & Formation", description: "Formation et accompagnement de vos agents de propreté sur le terrain pour une prise en main conviviale et sécurisée." },
      { title: "Supervision & Maintenance", description: "Contrôle à distance permanent et maintenance réactive Phoenix Care (remplacement de brosses, raclettes, filtres)." }
    ],
    faq: [
      {
        question: "Les robots uClean perturbent-ils les usagers ou clients ?",
        answer: "Absolument pas. Grâce à leur ensemble de capteurs LiDAR 3D, ultrasons et caméras, ils ralentissent ou s'arrêtent instantanément face à un piéton. De plus, les modèles comme l'aspirateur Vacuum 40 fonctionnent à un niveau sonore extrêmement bas (moins de 65 dB), idéal pour des passages discrets en journée."
      },
      {
        question: "Comment se fait le remplissage d'eau et la recharge ?",
        answer: "Les robots uClean peuvent être associés à une station de service (Smart Dock) en option. Ils s'y connectent de manière 100% autonome pour vider l'eau usée, faire le plein d'eau propre avec détergent dosé, et recharger leurs batteries."
      },
      {
        question: "La formation des équipes d'entretien est-elle complexe ?",
        answer: "Non, nos ingénieurs forment vos équipes en moins d'une demi-journée. L'interface logicielle Phoenix-Botics sur écran tactile et sur mobile est extrêmement intuitive : l'opérateur n'a qu'à appuyer sur un bouton pour démarrer une zone pré-enregistrée."
      },
      {
        question: "Quelle est la durée de garantie et comment fonctionne le support ?",
        answer: "Tous nos cobots sont garantis 2 ans. Notre contrat de support Phoenix Care inclut une supervision à distance permanente, des mises à jour logicielles de navigation et une intervention de techniciens sur site sous 24h en cas de nécessité opérationnelle."
      }
    ]
  },
  "ulog-series": {
    id: "ulog-series",
    title: "Série uLog",
    heroTitle: "Fluidifiez vos flux logistiques sans réorganiser vos sites",
    heroSubtitle: "L'intralogistique autonome, du colis léger à la palette lourde.",
    heroDescription: "Connectez vos différents services, entrepôts et lignes de production en toute simplicité. Nos robots mobiles autonomes (AMR) de livraison et de levage uLog automatisent les flux internes de charges de 80 kg à 600 kg sans modification d'infrastructure.",
    heroImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747964/uLogLIFT600_URGlogo_01_face_xgxuh0.png",
    introTitle: "L'excellence de la manutention autonome flexible",
    introParagraphs: [
      "Dans les secteurs industriels, hospitaliers ou logistiques, le transfert interne de matériel consomme un temps précieux aux opérateurs et engendre une fatigue physique importante qui impacte la santé au travail. La gamme uLog est conçue pour prendre le relais de cette manutention répétitive.",
      "Qu'il s'agisse de livrer des plateaux de médicaments, de transporter des bacs de pièces ou de déplacer des étagères entières de marchandises, nos AMR naviguent de façon totalement dynamique en s'intégrant nativement à vos ascenseurs et portes automatiques. Le tout s'interface avec vos progiciels WMS, ERP ou MES existants pour une traçabilité totale."
    ],
    benefits: [
      {
        title: "Productivité Boostée",
        description: "Élimine les temps d'attente de matériel entre les postes de travail et garantit un approvisionnement continu.",
        iconName: "Cpu"
      },
      {
        title: "Zéro Modification de Site",
        description: "Pas de bandes magnétiques ni de réflecteurs physiques. La navigation LiDAR s'adapte instantanément à votre environnement.",
        iconName: "Truck"
      },
      {
        title: "Ergonomie & Sécurité",
        description: "Prévient les troubles musculosquelettiques (TMS) liés au port de charges et sécurise les flux de passage industriels.",
        iconName: "ShieldCheck"
      }
    ],
    models: [
      {
        id: "deliver-80",
        canonicalId: "ulog-deliver-80",
        seriesId: "ulog-series",
        tag: "MODÈLE 01",
        name: "uLog Deliver 80",
        tagline: "Le cobot de livraison multi-étagères ultra-agile",
        subtitle: "AMR de livraison compact pour charges légères jusqu'à 80 kg",
        segmentLabel: "INTRALOGISTIQUE AGILE",
        shortDesc: "AMR de livraison compact pour charges légères jusqu'à 80kg.",
        description: "Le compagnon idéal pour la distribution fréquente de petits colis, matériel médical ou pièces détachées. Il comporte 4 plateaux modulables et se faufile aisément dans des passages étroits.",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747971/uLogDELIVER80_URGlogo_01_face_ktme3v.png",
        link: "/robots/ulog-series?model=ulog-deliver-80#model-ulog-deliver-80",
        industries: ["health", "hospitality", "industry"],
        rendement: "Charge utile : 80 kg",
        autonomie: "10 heures continues",
        dimensions: "520 × 480 × 1280 mm",
        capacite: "4 étagères réglables (20 kg/plateau)",
        poids: "58 kg",
        vitesse: "1.2 m/s",
        specs: [
          { label: "Capacité de charge", value: "80 kg max" },
          { label: "Nombre de plateaux", value: "4 étagères réglables" },
          { label: "Autonomie moyenne", value: "10 heures" },
          { label: "Capteurs principaux", value: "LiDAR 360° + Caméras 3D" },
          { label: "Poids à vide", value: "58 kg" }
        ],
        useCases: ["Hôpitaux et laboratoires", "Bureaux et courrier", "Ateliers d'assemblage", "Établissements hôteliers"],
        tasks: ["Distribution de consommables", "Transfert de tubes d'analyses", "Portage de courrier confidentiel"]
      },
      {
        id: "deliver-150",
        canonicalId: "ulog-deliver-150",
        seriesId: "ulog-series",
        tag: "MODÈLE 02",
        name: "uLog Deliver 150",
        tagline: "Capacité accrue pour la logistique de charges moyennes",
        subtitle: "Transport autonome sécurisé de bacs et caisses jusqu'à 150 kg",
        segmentLabel: "INTRALOGISTIQUE SÉCURISÉE",
        shortDesc: "AMR autonome de livraison sécurisée multi-niveaux pour repas, linge et consommables.",
        description: "Gabarit compact pour une charge utile doublée. Avec seulement 500 mm de largeur hors-tout, il navigue dans des couloirs de 70 cm de large tout en transportant 150 kg en toute stabilité.",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747959/uLogDELIVER150_URGlogo_01_face_Box_Admin_tprnbn.png",
        link: "/robots/ulog-series?model=ulog-deliver-150#model-ulog-deliver-150",
        industries: ["health", "industry", "retail"],
        rendement: "Charge utile : 150 kg",
        autonomie: "10 heures continues",
        dimensions: "580 × 500 × 1200 mm",
        capacite: "150 kg de charge utile",
        poids: "90 kg",
        vitesse: "1.5 m/s",
        specs: [
          { label: "Capacité de charge", value: "150 kg max" },
          { label: "Dimensions plateaux", value: "580 × 500 mm" },
          { label: "Autonomie moyenne", value: "10 heures" },
          { label: "Vitesse maximale", value: "1.5 m/s" },
          { label: "Poids à vide", value: "90 kg" }
        ],
        useCases: ["Pharmacie hospitalière", "Salles blanches", "Lignes de production de pièces", "Bureaux administratifs"],
        tasks: ["Distribution de colis sécurisés", "Approvisionnement de composants", "Collecte de déchets légers"]
      },
      {
        id: "deliver-300",
        canonicalId: "ulog-deliver-300",
        seriesId: "ulog-series",
        tag: "MODÈLE 03",
        name: "uLog Deliver 300",
        tagline: "Plateforme plate ouverte pour les flux industriels",
        subtitle: "Plateforme de convoyage automatisée pour bacs industriels",
        segmentLabel: "INTRALOGISTIQUE INDUSTRIELLE",
        shortDesc: "Plateforme robuste pour le transport de matériel lourd.",
        description: "Conçu avec une surface de chargement plate et robuste, ce robot est parfaitement adapté aux flux de caisses, de bacs Europe ou d'équipements personnalisés lourds dans les usines.",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747948/uLogDELIVER300_URGlogo_01_face_pihxaa.png",
        link: "/robots/ulog-series?model=ulog-deliver-300#model-ulog-deliver-300",
        industries: ["industry"],
        rendement: "Charge utile : 300 kg",
        autonomie: "10 heures",
        dimensions: "620 × 500 × 350 mm",
        capacite: "300 kg max sur plateforme",
        poids: "90 kg",
        vitesse: "1.2 m/s",
        specs: [
          { label: "Capacité de charge", value: "300 kg max" },
          { label: "Plateforme utile", value: "620 × 500 mm" },
          { label: "Autonomie moyenne", value: "10 heures" },
          { label: "Précision d'arrêt", value: "±5 mm" },
          { label: "Poids à vide", value: "90 kg" }
        ],
        useCases: ["Ateliers d'usinage", "Centres de tri logistiques", "Industrie automobile", "Blocs opératoires"],
        tasks: ["Transport de bacs de pièces", "Convoyage automatisé inter-postes", "Liaison magasin - ligne"]
      },
      {
        id: "deliver-300-xl",
        canonicalId: "ulog-deliver-300-xl",
        seriesId: "ulog-series",
        tag: "MODÈLE 04",
        name: "uLog Deliver 300 XL",
        tagline: "Le transport grand volume de charges lourdes",
        subtitle: "Châssis étendu pour cartons volumineux et bacs grands formats",
        segmentLabel: "INTRALOGISTIQUE GRAND VOLUME",
        shortDesc: "Surface de chargement étendue pour les colis volumineux.",
        description: "Une déclinaison au châssis élargi (900×600 mm) offrant une zone de chargement de 770×600 mm. Idéal pour manipuler des cartons volumineux et des eurobox sans risque de basculement.",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747951/uLogDELIVER300XL_LIFT300XL_URGlogo_01_face_m95qag.png",
        link: "/robots/ulog-series?model=ulog-deliver-300-xl#model-ulog-deliver-300-xl",
        industries: ["industry"],
        rendement: "Charge utile : 300 kg XL",
        autonomie: "10 heures",
        dimensions: "900 × 600 × 350 mm",
        capacite: "Plateforme XL 770 × 600 mm",
        poids: "100 kg",
        vitesse: "1.2 m/s",
        specs: [
          { label: "Capacité de charge", value: "300 kg max" },
          { label: "Plateforme XL", value: "770 × 600 mm" },
          { label: "Autonomie moyenne", value: "10 heures" },
          { label: "Vitesse maximale", value: "1.2 m/s" },
          { label: "Poids à vide", value: "100 kg" }
        ],
        useCases: ["Plateformes de e-commerce", "Centres de distribution", "Industrie aéronautique", "Hôpitaux régionaux"],
        tasks: ["Transfert de bacs volumineux", "Liaison logistique inter-bâtiments", "Approvisionnement de matières premières"]
      },
      {
        id: "lift-300-base",
        canonicalId: "ulog-lift-300-base",
        seriesId: "ulog-series",
        tag: "MODÈLE 05",
        name: "uLog Lift 300 Base",
        tagline: "Base de levage AMR ultra-basse pour intégrateurs",
        subtitle: "Levage automatique de chariots et racks légers sous 300 kg",
        segmentLabel: "MANUTENTION COMPACTE",
        shortDesc: "Module de levage agile pour chariots et palettes légères.",
        description: "AMR de levage compact sans écran, idéal pour glisser sous des chariots, des étagères ou des racks personnalisés de 300 kg pour les soulever et les transférer automatiquement vers leur destination.",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747963/uLogLIFT600BASE_LIFT300XL_URGlogo_01_uv1lwf.png",
        link: "/robots/ulog-series?model=ulog-lift-300-base#model-ulog-lift-300-base",
        industries: ["industry"],
        rendement: "Levage : 300 kg max",
        autonomie: "10 heures",
        dimensions: "720 × 550 × 260 mm",
        capacite: "Hauteur de levée 60 mm",
        poids: "72 kg",
        vitesse: "1.2 m/s",
        specs: [
          { label: "Capacité de levage", value: "300 kg max" },
          { label: "Hauteur de levée", value: "60 mm" },
          { label: "Autonomie moyenne", value: "10 heures" },
          { label: "Recharge", value: "Sans fil automatique" },
          { label: "Poids à vide", value: "72 kg" }
        ],
        useCases: ["Logistique de stockage", "Liaison d'assemblage KANBAN", "Intégrateurs robotiques", "Automobile"],
        tasks: ["Prise et dépose automatique d'étagères", "Transfert de kits de pièces", "Navette automatique de chariots"]
      },
      {
        id: "lift-300-xl",
        canonicalId: "ulog-lift-300-xl",
        seriesId: "ulog-series",
        tag: "MODÈLE 06",
        name: "uLog Lift 300 XL",
        tagline: "AMR de levage premium avec écran d'interaction",
        subtitle: "Levage de racks hors standards avec guidage tactile opérateur",
        segmentLabel: "MANUTENTION PREMIUM",
        shortDesc: "Structure élargie pour lever des formats hors standards.",
        description: "Doté d'un écran tactile d'interaction opérateur de 10,1 pouces, ce robot gère le levage et le transport de structures roulantes de 300 kg tout en guidant visuellement les collaborateurs du site.",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747951/uLogDELIVER300XL_LIFT300XL_URGlogo_01_face_m95qag.png",
        link: "/robots/ulog-series?model=ulog-lift-300-xl#model-ulog-lift-300-xl",
        industries: ["industry", "health"],
        rendement: "Levage : 300 kg max",
        autonomie: "10 heures",
        dimensions: "900 × 600 × 1200 mm",
        capacite: "Étagères 860 × 920 mm",
        poids: "100 kg",
        vitesse: "1.2 m/s",
        specs: [
          { label: "Capacité de levage", value: "300 kg max" },
          { label: "Interface", value: "Écran tactile 10.1 pouces" },
          { label: "Autonomie moyenne", value: "10 heures" },
          { label: "Dimensions étagères", value: "860 × 920 mm" },
          { label: "Poids à vide", value: "100 kg" }
        ],
        useCases: ["Entrepôts de préparation", "Zones de picking", "Supermarchés industriels", "Hôpitaux"],
        tasks: ["Assistance au picking dynamique", "Levage de racks d'outillages", "Messagerie inter-services interactive"]
      },
      {
        id: "lift-600-base",
        canonicalId: "ulog-lift-600-base",
        seriesId: "ulog-series",
        tag: "MODÈLE 07",
        name: "uLog Lift 600 Base",
        tagline: "La force brute d'un AMR de levage 600 kg",
        subtitle: "Base ultra-robuste pour manutention lourde et palettes 600 kg",
        segmentLabel: "MANUTENTION LOURDE",
        shortDesc: "Puissance de levage industrielle jusqu'à 600kg.",
        description: "Une base robuste de manutention lourde capable d'enlever et déplacer des étagères et charges jusqu'à 600 kg. Équipé d'une batterie Li-FePO4 à recharge rapide complète en 1h30.",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747963/uLogLIFT600BASE_LIFT300XL_URGlogo_01_uv1lwf.png",
        link: "/robots/ulog-series?model=ulog-lift-600-base#model-ulog-lift-600-base",
        industries: ["industry"],
        rendement: "Levage : 600 kg max",
        autonomie: "8 heures",
        dimensions: "950 × 680 × 280 mm",
        capacite: "Levée 65 mm / Batterie Li-FePO4",
        poids: "160 kg",
        vitesse: "1.2 m/s",
        specs: [
          { label: "Capacité de levage", value: "600 kg max" },
          { label: "Temps de recharge", value: "1h30 (Li-FePO4)" },
          { label: "Autonomie moyenne", value: "8 heures" },
          { label: "Hauteur de levée", value: "65 mm" },
          { label: "Poids à vide", value: "160 kg" }
        ],
        useCases: ["Industrie lourde", "Stockage palettes", "Aéronautique et fonderies", "Grande distribution"],
        tasks: ["Déplacement de palettes d'usine", "Levage de racks d'approvisionnement lourds", "Rotations intralogistiques intensives"]
      },
      {
        id: "lift-600",
        canonicalId: "ulog-lift-600",
        seriesId: "ulog-series",
        tag: "MODÈLE 08",
        name: "uLog Lift 600",
        tagline: "Le summum de la manutention autonome intelligente",
        subtitle: "AMR de levage forte capacité pour palettes industrielles jusqu'à 600 kg",
        segmentLabel: "MANUTENTION FORTE CAPACITÉ",
        shortDesc: "AMR à levage forte capacité pour le transport autonome de charges et palettes jusqu'à 600kg.",
        description: "Le robot le plus puissant de notre catalogue de levage, intégrant un écran de contrôle 10,1 pouces et des capteurs de sécurité redondants. Il orchestre les flux de palettes de 600 kg avec une précision millimétrique.",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782747964/uLogLIFT600_URGlogo_01_face_xgxuh0.png",
        link: "/robots/ulog-series?model=ulog-lift-600#model-ulog-lift-600",
        industries: ["industry"],
        rendement: "Levage : 600 kg max",
        autonomie: "8 heures",
        dimensions: "950 × 680 × 1250 mm",
        capacite: "Levée 65 mm + Écran 10.1 pouces",
        poids: "180 kg",
        vitesse: "1.2 m/s",
        specs: [
          { label: "Capacité de levage", value: "600 kg max" },
          { label: "Interface tactile", value: "10.1 pouces interactive" },
          { label: "Autonomie moyenne", value: "8 heures" },
          { label: "Précision de positionnement", value: "±5 mm / ±1°" },
          { label: "Poids à vide", value: "180 kg" }
        ],
        useCases: ["Entrepôts logistiques géants", "Lignes de montage d'équipements", "Fret de marchandises", "Plateformes de colis lourds"],
        tasks: ["Transport de palettes de production", "Supervision de flotte en temps réel", "Co-opération homme-machine assistée"]
      }
    ],
    globalUseCases: [
      "Entrepôts logistiques et centres de e-commerce",
      "Lignes d'assemblage et usines manufacturières",
      "Centres hospitaliers, blanchisseries et pharmacies centrales",
      "Centres de tri de colis et plateformes de messagerie",
      "Zones de stockage KANBAN de pièces détachées",
      "Grande distribution pour réassort de nuit"
    ],
    supportSteps: [
      { title: "Analyse des flux", description: "Étude technique rigoureuse de vos allées de circulation, des zones de chargement et des dénivelés de votre site." },
      { title: "Intégration logicielle", description: "Connexion de notre Fleet Manager Phoenix RCS avec vos logiciels internes WMS, ERP ou MES via API REST." },
      { title: "Déploiement et tests", description: "Programmation des points de transit, des missions automatiques et tests rigoureux d'évitement d'obstacles." },
      { title: "Supervision en direct", description: "Supervision de flotte Cloud continue pour optimiser les temps de transit et de rotation de batterie." }
    ],
    faq: [
      {
        question: "Le robot uLog nécessite-t-il d'adapter nos locaux ?",
        answer: "Absolument pas. Nos robots de la gamme uLog sont des AMR (Autonomous Mobile Robots) de dernière génération. Ils cartographient d'eux-mêmes vos locaux à l'aide de leur LiDAR. Si un obstacle (un opérateur, un carton, un transpalette) obstrue le passage, le robot calcule un itinéraire d'évitement à la volée."
      },
      {
        question: "Comment se gère le passage d'ascenseurs et de portes ?",
        answer: "Nous installons un boîtier de communication industriel sans fil (IoT) sur vos portes automatiques et ascenseurs. Le robot communique directement avec ces éléments pour en demander l'ouverture ou appeler l'ascenseur au bon étage de façon autonome."
      },
      {
        question: "Quelle est la précision d'arrêt pour le levage ou le transfert ?",
        answer: "Nos AMR uLog atteignent une précision millimétrique de ±5 mm et ±1° d'angle lors de l'alignement sur leurs stations de prise et de dépose. Cela permet un interfaçage parfait avec des convoyeurs ou des étagères fixes."
      },
      {
        question: "Quelle est la durée de vie de la batterie et comment se charge-t-elle ?",
        answer: "Les modèles utilisent des batteries Li-FePO4 de dernière génération (pour la série Lift 600), supportant des milliers de cycles sans perte d'efficacité. Les robots retournent d'eux-mêmes au dock de charge pendant les périodes creuses opérationnelles (recharge d'opportunité)."
      }
    ]
  },
  "userve-series": {
    id: "userve-series",
    title: "Série uServe",
    heroTitle: "Améliorez l’accueil et l’expérience client grâce à la robotique",
    heroSubtitle: "L'interaction humaine augmentée par l'intelligence de service.",
    heroDescription: "Idéal pour les halls d'accueil, musées, cliniques et grands magasins. Le robot uServe assure un accueil haut de gamme 24h/24, guide avec élégance vos visiteurs et prend en charge l'enregistrement ou les requêtes d'information récurrentes.",
    heroImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png",
    introTitle: "L'intelligence relationnelle au service de votre image",
    introParagraphs: [
      "Dans tous les lieux ouverts au public, la qualité de l'accueil initial détermine toute l'expérience visiteur. Pourtant, les équipes d'accueil passent souvent plus de la moitié de leur temps de travail à répondre à des questions de premier niveau et répétitives ('Où se trouvent les toilettes ?', 'À quel étage se trouve le service des admissions ?'), au détriment des cas complexes nécessitant une écoute humaine de qualité.",
      "Le robot uServe se positionne comme un assistant d'accueil premium. Il accueille chaleureusement vos visiteurs dès leur entrée, répond de manière hautement interactive à leurs questions d'orientation dans plus de 20 langues configurables, et peut même les escorter physiquement jusqu'à leur destination finale grâce à sa base mobile autonome sécurisée de pointe."
    ],
    benefits: [
      {
        title: "Disponibilité Totale",
        description: "Assure un point de renseignement et d'accueil disponible 24h/24 et 7j/7, sans aucune interruption de service.",
        iconName: "User"
      },
      {
        title: "Orientation Accompagnée",
        description: "Ne se contente pas de donner des consignes verbales : il escorte physiquement vos visiteurs jusqu'à leur destination.",
        iconName: "Activity"
      },
      {
        title: "Image de Marque Premium",
        description: "Positionne immédiatement votre établissement à la pointe de l'innovation technologique et de la modernité de service.",
        iconName: "CheckCircle2"
      }
    ],
    models: [
      {
        id: "userve",
        canonicalId: "userve",
        seriesId: "userve-series",
        tag: "MODÈLE 01",
        name: "uServe",
        tagline: "Le robot d'accueil, d'assistance et de guidage interactif",
        subtitle: "Robot d'accueil, d'assistance en salle et de guidage interactif",
        segmentLabel: "SERVICE & INTERACTION",
        shortDesc: "Robot d'accueil, d'assistance en salle et de guidage interactif pour informer, orienter et assister vos clients.",
        description: "Un robot de service haut de gamme doté d'une silhouette accueillante, d'un grand écran tactile Full HD de 15,6 pouces et d'une autonomie de navigation sécurisée. Il engage spontanément la conversation et guide les personnes dans les halls d'accueil les plus fréquentés.",
        image: "https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png",
        link: "/robots/userve-series?model=userve#model-userve",
        industries: ["hospitality", "retail", "health"],
        rendement: "Service simultané 4 plateaux",
        autonomie: "Jusqu'à 10 heures",
        dimensions: "540 × 500 × 1400 mm",
        capacite: "40 kg max / Écran 15.6'' Full HD",
        poids: "55 kg",
        vitesse: "0.8 m/s",
        specs: [
          { label: "Hauteur hors-tout", value: "1400 mm" },
          { label: "Écran interactif", value: "15.6 pouces tactile capacitif" },
          { label: "Autonomie moyenne", value: "Jusqu'à 10 heures" },
          { label: "Langues prises en charge", value: "Plus de 20 langues" },
          { label: "Poids", value: "55 kg" }
        ],
        useCases: ["Halls d'hôtels de luxe", "Accueil d'hôpitaux", "Musées et expositions", "Sièges d'entreprises"],
        tasks: ["Accueil chaleureux des visiteurs", "Enregistrement autonome / Check-in", "Guidage et escortes physiques", "Diffusion de messages d'information interactifs"]
      }
    ],
    globalUseCases: [
      "Lobby d'hôtels de prestige et résidences de standing",
      "Halls de réception d'hôpitaux et cliniques privées",
      "Sièges sociaux d'entreprises et centres d'affaires",
      "Musées, centres de congrès et grands espaces d'expositions",
      "Centres commerciaux d'envergure nationale",
      "Halls d'aéroports et gares ferroviaires"
    ],
    supportSteps: [
      { title: "Scénarisation d'accueil", description: "Définition des arbres de dialogue, des langues d'expression requises et des parcours d'orientation clés de votre site." },
      { title: "Personnalisation graphique", description: "Intégration de votre logo, de votre charte colorée de marque et de l'habillage de l'interface sur l'écran tactile." },
      { title: "Interfaçage Système", description: "Connexion de notre robot avec vos agendas de rendez-vous d'entreprise, CRM ou bornes de check-in." },
      { title: "Mise en service assistée", description: "Accompagnement de vos collaborateurs sur le terrain pour favoriser l'adoption et la synergie homme-robot." }
    ],
    faq: [
      {
        question: "Le robot uServe remplace-t-il les hôtesses ou hôtes d'accueil ?",
        answer: "Non. uServe est conçu comme un cobot, c'est-à-dire un robot collaboratif. Il prend en charge l'accueil de premier niveau, les check-ins d'urgence et l'orientation géographique de base. Cela libère du temps à vos équipes humaines pour qu'elles se consacrent pleinement à l'écoute active des requêtes spécifiques et personnalisées."
      },
      {
        question: "Comment se comporte-t-il s'il y a du bruit dans le hall ?",
        answer: "uServe est équipé d'un réseau de microphones directionnels de pointe et d'un traitement antibruit par intelligence artificielle. Il isole la voix de l'interlocuteur direct situé face à lui pour comprendre parfaitement ses commandes vocales, même dans les environnements animés."
      },
      {
        question: "Peut-on personnaliser son discours et son interface graphique ?",
        answer: "Absolument. Phoenix-Botics personnalise entièrement l'interface utilisateur pour correspondre à votre charte (couleurs, logos, polices de caractères) et intègre vos propres scripts de dialogue d'accueil ainsi que le plan interactif 3D de votre établissement."
      },
      {
        question: "Comment le robot escorte-t-il les personnes ?",
        answer: "Une fois que le visiteur a indiqué sa destination (par la voix ou l'écran tactile), le robot uServe se retourne et invite poliment le visiteur à le suivre. Il roule à une vitesse de marche naturelle (environ 0.8 m/s) et ralentit ou s'arrête si la personne prend du retard ou s'il rencontre des obstacles."
      }
    ]
  }
};

/**
 * Return all robot models from all series combined.
 */
export function getAllRobotModels(): RobotModelData[] {
  const all: RobotModelData[] = [];
  Object.values(ROBOT_SERIES_DATA).forEach((series) => {
    if (series.models && Array.isArray(series.models)) {
      all.push(...series.models);
    }
  });
  return all;
}

/**
 * Return models belonging to a specific series ID (e.g. 'uclean-series', 'ulog-series', 'userve-series').
 */
export function getRobotsBySeries(seriesId: string): RobotModelData[] {
  const series = ROBOT_SERIES_DATA[seriesId];
  return series ? series.models : [];
}

/**
 * Find a robot model by its id or canonicalId.
 */
export function getRobotById(idOrCanonicalId: string): RobotModelData | undefined {
  if (!idOrCanonicalId) return undefined;
  const cleanKey = idOrCanonicalId.toLowerCase().trim();
  const all = getAllRobotModels();
  return all.find(
    (m) =>
      m.id.toLowerCase() === cleanKey ||
      m.canonicalId.toLowerCase() === cleanKey ||
      m.canonicalId.toLowerCase().replace(/-/g, "") === cleanKey.replace(/-/g, "") ||
      m.id.toLowerCase().replace(/-/g, "") === cleanKey.replace(/-/g, "")
  );
}

/**
 * Return all robot models recommended for a specific industry (e.g. 'hospitality', 'retail', 'health', 'industry', 'logistics').
 */
export function getRobotsByIndustry(industryId: string): RobotModelData[] {
  if (!industryId) return [];
  const cleanId = industryId.toLowerCase().trim();
  const all = getAllRobotModels();
  return all.filter((m) =>
    m.industries.some((ind) => ind.toLowerCase() === cleanId || cleanId.includes(ind.toLowerCase()))
  );
}

/**
 * Cloudinary asset URL optimizer adding auto format, auto quality and optional width limit.
 */
export function optimizeCloudinaryUrl(url: string, width?: number): string {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  if (url.includes("/f_auto,q_auto") || url.includes("/f_auto/q_auto") || url.includes("/q_auto,f_auto")) {
    return url;
  }
  const transform = width ? `f_auto,q_auto,w_${width},c_limit` : `f_auto,q_auto`;
  return url.replace("/upload/", `/upload/${transform}/`);
}

