import { RobotCategory, IndustrySector, ServiceStep, TechPillar } from "./types";

export const ROBOTS_CATALOG: RobotCategory[] = [
  {
    id: "interaction",
    title: "Interaction & Accueil Humanoïde",
    subtitle: "Robots de Réception et d'Assistance Client",
    description: "Incarnez l'excellence opérationnelle. Nos robots d'interaction accueillent et orientent vos visiteurs tout en qualifiant efficacement leurs requêtes.",
    featuredRobot: "Pepper & NAO",
    robots: [
      {
        name: "Pepper",
        manufacturer: "SoftBank Robotics / URG",
        type: "Robot d'accueil humanoïde",
        specs: {
          height: "120 cm",
          weight: "28 kg",
          autonomy: "Jusqu'à 12 heures",
          sensors: ["Caméras 3D", "Télémètres laser", "Capteurs tactiles", "Microphones directionnels"]
        },
        description: "Le robot de service humanoïde le plus populaire au monde, conçu pour accueillir, informer et engager les clients.",
        benefits: ["Augmenter l'engagement client", "Garantir un accueil 7j/7", "Collecter des avis de manière autonome"]
      },
      {
        name: "NAO",
        manufacturer: "SoftBank Robotics / URG",
        type: "Robot compagnon & éducatif",
        specs: {
          height: "58 cm",
          weight: "5.4 kg",
          autonomy: "Jusqu'à 1.5 heure",
          sensors: ["Caméras HD", "Capteurs sonars", "Logiciel de reconnaissance faciale"]
        },
        description: "L'outil parfait pour l'interaction dynamique, la recherche et l'animation pédagogique de vos événements.",
        benefits: ["Animer vos événements B2B", "Fluidifier l'apprentissage interactif", "Interagir en mode multilingue"]
      }
    ],
    keyBenefits: [
      "Améliorer l'accueil des visiteurs",
      "Orienter efficacement dans l'espace",
      "Connecter les demandes à vos agendas"
    ],
    iconName: "User"
  },
  {
    id: "hospitality",
    title: "Service, Restauration & Retail",
    subtitle: "Assistants Cobotiques pour l'Hôtellerie et la Vente",
    description: "Libérez vos équipes des tâches de portage pénibles. Nos cobots de service mobiles assurent le transfert de charges pour replacer l'humain au cœur de l'expérience client.",
    featuredRobot: "Plato",
    robots: [
      {
        name: "Plato",
        manufacturer: "Aldebaran / United Robotics Group",
        type: "Cobot de service de table",
        specs: {
          payload: "Jusqu'à 30 kg",
          autonomy: "Jusqu'à 15 heures",
          sensors: ["LiDAR haute précision", "Caméras de profondeur", "Bandes tactiles d'arrêt d'urgence"]
        },
        description: "Un robot de service autonome conçu pour la restauration et l'hôtellerie, capable d'évoluer en toute sécurité dans des environnements très denses.",
        benefits: ["Soulager les efforts physiques des équipes", "Naviguer en sécurité en milieu dense", "Interagir naturellement avec les clients"]
      }
    ],
    keyBenefits: [
      "Réduire les déplacements inutiles",
      "Fluidifier le service en salle",
      "Améliorer les conditions de travail"
    ],
    iconName: "Coffee"
  },
  {
    id: "logistics",
    title: "Logistique & Intralogistique",
    subtitle: "Navettes Spatiales Autonomes de Transfert Interne",
    description: "Sécurisez vos circulations internes de charges légères. Nos navettes autonomes garantissent une distribution continue dans vos bâtiments tertiaires ou industriels.",
    featuredRobot: "uLink",
    robots: [
      {
        name: "uLink",
        manufacturer: "United Robotics Group",
        type: "Robot mobile autonome (AMR)",
        specs: {
          payload: "Jusqu'à 50 kg",
          autonomy: "Jusqu'à 10 heures",
          sensors: ["Double LiDAR 360°", "Capteurs de vide", "Avertisseurs lumineux et sonores"]
        },
        description: "Un robot mobile compact et robuste équipé de compartiments sécurisés interchangeables pour le transport automatique d'équipements, pièces ou fournitures.",
        benefits: ["Sécuriser les coffres par badge RFID", "Recharger en autonomie sur base", "Intégrer les ascenseurs du site"]
      }
    ],
    keyBenefits: [
      "Sécuriser les transferts internes",
      "Automatiser le transport logistique léger",
      "Éviter les obstacles en temps réel"
    ],
    iconName: "Truck"
  },
  {
    id: "healthcare",
    title: "Laboratoires, Pharma & Santé",
    subtitle: "Intralogistique Médicale et Assistance Thérapeutique",
    description: "Garantissez le respect des normes d'hygiène les plus strictes. Du transport d’échantillons à l'assistance physique, nos solutions sécurisent vos environnements cliniques.",
    featuredRobot: "uMobileLab & Robert",
    robots: [
      {
        name: "uMobileLab",
        manufacturer: "United Robotics Group",
        type: "AMR pour laboratoires stériles",
        specs: {
          payload: "Jusqu'à 20 kg",
          autonomy: "Jusqu'à 8 heures",
          sensors: ["LiDAR 3D stérile", "Scanner de codes-barres", "Amortisseurs anti-vibrations"]
        },
        description: "Conçu spécifiquement pour le transport automatisé d'échantillons cliniques et réactifs au sein des hôpitaux et laboratoires.",
        benefits: ["Éliminer les risques de contamination", "Tracer les échantillons par code-barres", "Protéger les flacons fragiles"]
      },
      {
        name: "Robert",
        manufacturer: "Life Science Robotics",
        type: "Robot de réhabilitation médicale",
        specs: {
          autonomy: "Alimentation secteur continue",
          sensors: ["Capteurs de force 6 axes", "Suivi biométrique", "Boutons d'urgence redondés"]
        },
        description: "Un dispositif robotique actif révolutionnaire pour la mobilisation précoce et répétitive des membres inférieurs des patients hospitalisés.",
        benefits: ["Soutenir les kinésithérapeutes au quotidien", "Mobiliser intensément les patients", "Adapter l'effort de rééducation"]
      }
    ],
    keyBenefits: [
      "Fiabiliser le transport d'échantillons",
      "Assurer une traçabilité totale des flux",
      "Soutenir ergonomiquement les soignants"
    ],
    iconName: "Activity"
  },
  {
    id: "security",
    title: "Sécurité & Surveillance de Site",
    subtitle: "Ronde Autonome Extérieure et Intérieure 24/7",
    description: "Protégez vos infrastructures critiques avec le robot tout-terrain RB Watcher. Équipé d'analyses thermiques, il patrouille en continu dans toutes les conditions climatiques.",
    featuredRobot: "RB Watcher",
    robots: [
      {
        name: "RB Watcher",
        manufacturer: "Robotnik / URG",
        type: "Robot de patrouille tout-terrain",
        specs: {
          height: "85 cm",
          weight: "80 kg",
          payload: "40 kg",
          autonomy: "Jusqu'à 8 heures",
          sensors: ["Vision thermique infrarouge", "LiDAR d'extérieur longue portée", "Module GPS RTK", "Microphones d'écoute active"]
        },
        description: "Un robot de patrouille terrestre conçu pour la surveillance autonome de zones industrielles et de grands sites sensibles.",
        benefits: ["Détecter les départs de feu par thermique", "Alerter en cas d'intrusion nocturne", "Résister aux conditions rudes IP65"]
      }
    ],
    keyBenefits: [
      "Éliminer les zones d'ombre de ronde",
      "Lever les doutes thermiques à distance",
      "Sécuriser l'intervention des agents"
    ],
    iconName: "Shield"
  }
];

export const INDUSTRY_SECTORS: IndustrySector[] = [
  {
    id: "retail",
    title: "Retail & Grande Distribution",
    challenge: "Flux clients irréguliers, réassort fatigant et manque d'orientation en magasin.",
    solution: "Réponse Phoenix-Botics : Déploiement de robots d'accueil pour orienter vos clients et automatisation des flux logistiques légers en rayons.",
    valueProposition: "Expérience interactive et réassort optimisé.",
    efficiencyGain: "+20% d'engagement client",
    iconName: "ShoppingBag",
    supportedRobots: ["Pepper", "Plato"],
    imageUrl: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&q=80"
  },
  {
    id: "hospitality",
    title: "Hôtellerie & Restauration",
    challenge: "Tâches pénibles de portage de vaisselle, absentéisme élevé et surcharge de service.",
    solution: "Réponse Phoenix-Botics : Nos robots de table Plato prennent en charge les allers-retours cuisine-salle pour recentrer vos équipes sur l'accueil.",
    valueProposition: "Recentrage sur l'attention client.",
    efficiencyGain: "3h à 4h de temps qualitatif gagné par serveur",
    iconName: "Utensils",
    supportedRobots: ["Plato", "Pepper"],
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
  },
  {
    id: "healthcare",
    title: "Santé & Hôpitaux",
    challenge: "Soignants surchargés de tâches annexes et goulots logistiques quotidiens.",
    solution: "Réponse Phoenix-Botics : Intégration de robots mobiles autonomes d'intralogistique pour faire circuler draps, linges et consommables.",
    valueProposition: "Soutien logistique et confort de soin.",
    efficiencyGain: "-35% de temps perdu en déplacements",
    iconName: "HeartPulse",
    supportedRobots: ["uLink", "Robert"],
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
  },
  {
    id: "industry",
    title: "Industrie Légère & Entrepôts",
    challenge: "Manutention répétitive de petites pièces et éparpillement d'outils entre postes.",
    solution: "Réponse Phoenix-Botics : Liaison dynamique de vos lignes de production via des robots mobiles sans réorganisation physique lourde.",
    valueProposition: "Agilité logistique sans arrêt de ligne.",
    efficiencyGain: "+15% de productivité sur ligne",
    iconName: "Warehouse",
    supportedRobots: ["uLink"],
    imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
  }
];

export const SERVICES_PHOENIX: ServiceStep[] = [
  {
    number: "01",
    title: "Audit & Conseil Stratégique",
    duration: "1 à 2 semaines",
    description: "Analyse in situ de vos flux de travail et de vos locaux pour identifier les opportunités robotiques les plus rentables.",
    milestones: ["Audit in situ de vos locaux", "Analyse fine de vos flux", "Rapport d'étude de ROI"]
  },
  {
    number: "02",
    title: "Proof-of-Concept & Pilotage",
    duration: "2 à 4 semaines",
    description: "Validation de la pertinence technique par le déploiement d'un robot test en conditions de travail réelles.",
    milestones: ["Cartographie LiDAR complète", "Déploiement du robot pilote", "Ajustement ergonomique direct"]
  },
  {
    number: "03",
    title: "Déploiement & Configuration",
    duration: "1 semaine",
    description: "Programmation de vos parcours et interfaçage API métier direct avec vos logiciels de caisse, CRM ou PMS.",
    milestones: ["Optimisation du plan de routage", "Intégration d'API métier", "Formation certifiante d'équipes"]
  },
  {
    number: "04",
    title: "Support, Supervision & Maintenance",
    duration: "Garantie continue",
    description: "Supervision Cloud continue de vos parcs matériels avec assistance réactive en France sous contrat de SLA.",
    milestones: ["Supervision Cloud 24/7", "Hotline technique sous 2h", "Maintenance physique prioritaire"]
  }
];

export const TECHNOLOGY_PILLARS: TechPillar[] = [
  {
    title: "Fiabilité Industrielle",
    description: "Disponibilité supérieure à 99% grâce à des châssis durables éprouvés sur des millions de kilomètres.",
    iconName: "CheckCircle2"
  },
  {
    title: "Sécurité Autonome 360°",
    description: "Navigation intelligente intégrant évitement d'obstacles dynamiques et arrêt d'urgence immédiat.",
    iconName: "ShieldCheck"
  },
  {
    title: "Souveraineté & RGPD",
    description: "Flux vidéo analysés localement en temps réel; aucune donnée sensible ou visage n'est stocké.",
    iconName: "Lock"
  },
  {
    title: "Supervision Cloud",
    description: "Tableau de bord d'entreprise unifié pour orchestrer et analyser toute votre flotte en un clic.",
    iconName: "Cloud"
  },
  {
    title: "Intégration Métier Directe",
    description: "Connecteurs API pré-construits pour vos outils PMS, logiciels de caisse et ERP logistiques.",
    iconName: "Cpu"
  }
];
