import { SectorQualificationConfig } from "../../components/qualification/qualificationTypes";
import { COMMON_QUESTIONS } from "./common";

export const hospitalityQualificationConfig: SectorQualificationConfig = {
  sectorKey: "hospitality",
  sectorTitle: "Hôtellerie & Restauration",
  allowedRobots: [
    "userve",
    "uclean-compact",
    "uclean-vacuum-40",
    "uclean-scrub-50-disc"
  ],
  questions: [
    ...COMMON_QUESTIONS,
    {
      id: "hospitality_flow_type",
      title: "Mission prioritaire dans votre établissement",
      subtitle: "Quel est le flux principal à traiter ?",
      type: "single",
      options: [
        { id: "table_service_bussing", label: "Aide au service en salle & Débarrassage vers la plonge", flagFavorable: "Gamme uServe dédiée au portage de plateau & débarrassage" },
        { id: "room_service", label: "Livraison Room-Service aux chambres", flagFavorable: "Gamme uServe pour livraison autonome interfaçable ascenseur" },
        { id: "silent_cleaning", label: "Nettoyage discret des moquettes & couloirs", flagFavorable: "Aspiration silencieuse avec HEPA H13" },
        { id: "reception_welcome", label: "Accueil, information et guidage des résidents / clients", flagFavorable: "Gamme uServe avec écran HD interactif" }
      ]
    },
    {
      id: "hospitality_obstacles",
      title: "Contraintes de circulation et environnement",
      subtitle: "Spécificités architecturales des espaces de circulation",
      type: "single",
      options: [
        { id: "smooth_elevators", label: "Sols lisses, ascenseurs modernes et couloirs dégagés", flagFavorable: "Conditions idéales de circulation" },
        { id: "thick_carpets", label: "Moquettes épaisses en couloirs", flagFavorable: "Solution d'aspiration forte pression préconisée" },
        { id: "thresholds_ramps", label: "Seuils de portes prononcés ou rampes raides (> 5%)", flagConstraint: "Pentes ou seuils nécessitant validation d'ingénierie" },
        { id: "to_confirm", label: "À confirmer lors de l'audit", flagFavorable: "Éléments à vérifier in situ" }
      ]
    }
  ]
};
