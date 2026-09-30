import { QualificationQuestion } from "../../components/qualification/qualificationTypes";

export const COMMON_QUESTIONS: QualificationQuestion[] = [
  {
    id: "site_sub_environment",
    title: "Type précis de sous-environnement",
    subtitle: "Sélectionnez la configuration principale de vos locaux",
    type: "single",
    options: [
      { id: "monosite_flat", label: "Site de plain-pied uni", flagFavorable: "Espace de plain-pied fluide pour la navigation" },
      { id: "multilevel_elevators", label: "Plusieurs niveaux avec ascenseurs automatisables", flagFavorable: "Transit multi-étages envisageable via ascenseur" },
      { id: "multilevel_stairs_only", label: "Plusieurs niveaux accessibles uniquement par escaliers", flagConstraint: "Étages accessibles uniquement par escalier (limitation de franchissement)" },
      { id: "multi_zone_mix", label: "Plusieurs zones / Bâtiments mixtes", flagFavorable: "Zone étendue nécessitant un zonage" }
    ]
  },
  {
    id: "surface_area",
    title: "Surface ou tranche de surface concernée",
    subtitle: "Superficie estimée des zones à traiter ou à desservir",
    type: "single",
    options: [
      { id: "under_500", label: "Moins de 500 m²", flagFavorable: "Surface compacte facilement couvrable par un cobot agronomique" },
      { id: "500_2000", label: "500 m² à 2 000 m²", flagFavorable: "Surface idéale pour une autonomie standard" },
      { id: "2000_5000", label: "2 000 m² à 5 000 m²", flagFavorable: "Volume adapté à une planification de flotte" },
      { id: "over_5000", label: "Plus de 5 000 m²", flagFavorable: "Grand volume nécessitant un dimensionnement multi-robots" }
    ]
  },
  {
    id: "cohabitation_type",
    title: "Type de cohabitation et trafic quotidien",
    subtitle: "Qui circule principalement dans la zone de déploiement ?",
    type: "single",
    options: [
      { id: "staff_only", label: "Personnel de l'entreprise uniquement", flagFavorable: "Flux maîtrisés avec personnel formé" },
      { id: "public_high", label: "Flux continus de public / visiteurs / clients", flagFavorable: "Détection piétonnière et sécurité active requises" },
      { id: "sensitive_patients", label: "Patients / Zones médicalisées sensibles", flagConstraint: "Exigences d'hygiène et de discrétion sonore renforcées" },
      { id: "industrial_mix", label: "Chariots, engins et collaborateurs", flagConstraint: "Coactivité avec engins de manutention lourde" }
    ]
  },
  {
    id: "project_timeline",
    title: "Horizon du projet / Échéance souhaitée",
    subtitle: "Quand envisagez-vous une mise en service ?",
    type: "single",
    options: [
      { id: "immediate", label: "Moins de 3 mois (Immédiat)", flagFavorable: "Projet prioritaire" },
      { id: "mid_term", label: "3 à 6 mois", flagFavorable: "Planning standard de déploiement" },
      { id: "long_term", label: "Plus de 6 mois", flagFavorable: "Phase d'étude prospective" },
      { id: "to_confirm", label: "À confirmer", flagFavorable: "Phase de cadrage préliminaire" }
    ]
  }
];
