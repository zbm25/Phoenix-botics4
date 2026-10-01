import { SectorQualificationConfig } from "../../components/qualification/qualificationTypes";
import { COMMON_QUESTIONS } from "./common";

export const healthQualificationConfig: SectorQualificationConfig = {
  sectorKey: "health",
  sectorTitle: "Santé & Médical",
  allowedRobots: [
    "userve",
    "ulog-deliver-150",
    "ulog-lift-300-base",
    "uclean-compact",
    "uclean-vacuum-40",
    "uclean-scrub-50-disc"
  ],
  questions: [
    ...COMMON_QUESTIONS,
    {
      id: "health_transport_need",
      title: "Nature des flux intralogistiques ou de propreté",
      subtitle: "Quel type de matériel ou zone devez-vous traiter ?",
      type: "single",
      options: [
        { id: "pharmacy_meds", label: "Livraison sécurisée de médicaments / Pharmacie / Échantillons", flagFavorable: "Gamme uLog Deliver 150 avec conteneur sécurisé" },
        { id: "linen_meals_waste", label: "Transport de chariots de linge, repas ou déchets", flagFavorable: "Gamme uLog LIFT pour manutention de chariots lourds" },
        { id: "bio_cleaning", label: "Bionettoyage et entretien traçable des couloirs et circulations", flagFavorable: "Gamme uClean pour décontamination et propreté continue" },
        { id: "reception_guidance", label: "Accueil et orientation des patients / visiteurs aux admissions", flagFavorable: "Gamme uServe pour orientation fluide" }
      ]
    },
    {
      id: "health_security_access",
      title: "Exigences de traçabilité et de sécurité d'accès",
      subtitle: "Niveau de contrôle d'accès nécessaire pour les flux transportés",
      type: "single",
      options: [
        { id: "rfid_badge", label: "Verrouillage sécurisé par badge RFID / Code secret", flagFavorable: "Conformité sécurité transport médicalisée" },
        { id: "standard_open", label: "Plateau ouvert pour consommables non sensibles", flagFavorable: "Accès direct pour équipes soignantes" },
        { id: "hepa_air_clean", label: "Filtration d'air médicale certifiée HEPA H13", flagFavorable: "Purification d'air en zone sensible" }
      ]
    }
  ]
};
