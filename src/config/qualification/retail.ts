import { SectorQualificationConfig } from "../../components/qualification/qualificationTypes";
import { COMMON_QUESTIONS } from "./common";

export const retailQualificationConfig: SectorQualificationConfig = {
  sectorKey: "retail",
  sectorTitle: "Retail & Commerce",
  allowedRobots: [
    "userve",
    "uclean-compact",
    "uclean-vacuum-40",
    "uclean-scrub-50-disc",
    "uclean-scrub-50-roller"
  ],
  questions: [
    ...COMMON_QUESTIONS,
    {
      id: "retail_passage_width",
      title: "Largeur minimale des allées de passage",
      subtitle: "Largeur minimale entre gondoles, caisses et linéaires",
      type: "single",
      options: [
        { id: "wide_over_120", label: "Superieure à 1,20 m", flagFavorable: "Allées larges permettant un croisement aisé" },
        { id: "medium_80_120", label: "Entre 80 cm et 1,20 m", flagFavorable: "Allées standards adaptées à la gamme compacte" },
        { id: "narrow_under_80", label: "Inférieure à 80 cm", flagConstraint: "Passages étroits sous 80 cm nécessitant validation" },
        { id: "to_confirm", label: "À confirmer", flagFavorable: "Cote à mesurer lors de la visite" }
      ]
    },
    {
      id: "retail_primary_need",
      title: "Besoin prioritaire sur le point de vente",
      subtitle: "Quelle est la mission principale recherchée ?",
      type: "single",
      options: [
        { id: "guidance_welcome", label: "Accueil, information et guidage dynamique des clients", flagFavorable: "Orienté interaction client & animation commercial" },
        { id: "floor_washing", label: "Lavage et entretien des sols de vente", flagFavorable: "Orienté propreté continue des surfaces de vente" },
        { id: "carpet_vacuum", label: "Aspiration des moquettes et tapis", flagFavorable: "Orienté dépoussiérage avec filtration HEPA H13" },
        { id: "light_replenishment", label: "Logistique légère / Réassort de rayon", flagFavorable: "Orienté transport léger de pièces ou bacs" }
      ]
    }
  ]
};
