import { SectorQualificationConfig } from "../../components/qualification/qualificationTypes";
import { COMMON_QUESTIONS } from "./common";

export const industryQualificationConfig: SectorQualificationConfig = {
  sectorKey: "industry",
  sectorTitle: "Logistique & Industrie",
  allowedRobots: [
    "ulog-deliver-80",
    "ulog-deliver-150",
    "ulog-deliver-300",
    "ulog-deliver-300-xl",
    "ulog-lift-300-base",
    "ulog-lift-300-xl",
    "ulog-lift-600-base",
    "ulog-lift-600",
    "uclean-scrub-75"
  ],
  questions: [
    ...COMMON_QUESTIONS,
    {
      id: "industry_load_type",
      title: "Type de charge ou mission industrielle",
      subtitle: "Que souhaitez-vous déplacer ou entretenir dans votre usine / entrepôt ? (Sélection multiple possible)",
      type: "multiple",
      options: [
        { id: "pallets_heavy_racks", label: "Palettes / Racks lourds jusqu'à 600 kg", flagFavorable: "Gamme uLog Lift 600 adaptée au levage lourd" },
        { id: "bins_kitting_300", label: "Bacs / Rolls / Kitting de 80 à 300 kg", flagFavorable: "Gamme uLog Deliver / Lift 300 adaptée aux bacs" },
        { id: "light_line_feed", label: "Approvisionnement léger de composants de ligne (< 80 kg)", flagFavorable: "Gamme uLog Deliver 80 agile" },
        { id: "heavy_floor_scrub", label: "Lavage intensif de grands sols industriels", flagFavorable: "Gamme uClean Scrub 75 haute capacité" }
      ]
    },
    {
      id: "industry_aisle_traffic",
      title: "Largeur minimale de passage et trafic d'engins",
      subtitle: "Conditions de circulation dans les allées industrielles",
      type: "single",
      options: [
        { id: "wide_aisles_forklifts", label: "Allées de plus de 1,80 m avec caristes / chariots", flagFavorable: "Espace idéal avec navigation SLAM ISO 3691-4" },
        { id: "narrow_aisles_120_180", label: "Allées serrées entre 1,20 m et 1,80 m", flagFavorable: "Gamme compacte AMR utilisable" },
        { id: "ultra_narrow_under_120", label: "Allées très étroites sous 1,20 m", flagConstraint: "Passage sous 1,20 m nécessitant étude précise des rayons de braquage" },
        { id: "to_confirm", label: "À confirmer", flagFavorable: "Largeurs à mesurer lors de l'étude de site" }
      ]
    }
  ]
};
