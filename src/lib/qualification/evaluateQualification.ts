import {
  SectorQualificationConfig,
  UserAnswerMap,
  QualificationEvaluation,
  QualificationStatus
} from "../../components/qualification/qualificationTypes";
import { retailQualificationConfig } from "../../config/qualification/retail";
import { hospitalityQualificationConfig } from "../../config/qualification/hospitality";
import { healthQualificationConfig } from "../../config/qualification/health";
import { industryQualificationConfig } from "../../config/qualification/industry";

export function getSectorConfig(sectorKey: string): SectorQualificationConfig {
  const key = sectorKey.toLowerCase().trim();
  if (key === "retail" || key.includes("retail") || key.includes("commerce")) {
    return retailQualificationConfig;
  }
  if (key === "hospitality" || key.includes("hotel") || key.includes("restau")) {
    return hospitalityQualificationConfig;
  }
  if (key === "health" || key.includes("sante") || key.includes("médical") || key.includes("hopital")) {
    return healthQualificationConfig;
  }
  return industryQualificationConfig;
}

export function evaluateQualification(
  sectorKey: string,
  answers: UserAnswerMap
): QualificationEvaluation {
  const config = getSectorConfig(sectorKey);
  const favorablePoints: string[] = [];
  const constraints: string[] = [];
  const itemsToConfirm: string[] = [];
  const recommendedRobots: string[] = [];

  // Inspect answer options
  config.questions.forEach((q) => {
    const rawAns = answers[q.id];
    if (!rawAns) {
      itemsToConfirm.push(`Préciser : ${q.title.toLowerCase()}`);
      return;
    }

    const selectedIds = Array.isArray(rawAns) ? rawAns : [rawAns];
    selectedIds.forEach((ansId) => {
      const opt = q.options.find((o) => o.id === ansId);
      if (!opt) return;

      if (opt.flagConstraint) {
        constraints.push(opt.flagConstraint);
      }
      if (opt.flagFavorable) {
        favorablePoints.push(opt.flagFavorable);
      }
    });
  });

  // Determine status strictly between 3 allowed states: favorable, conditional, expert_required
  let status: QualificationStatus = "favorable";

  // Check critical constraints
  const hasCriticalConstraint = constraints.some(
    (c) =>
      c.toLowerCase().includes("escalier") ||
      c.toLowerCase().includes("étages accessibles uniquement par escalier") ||
      c.toLowerCase().includes("inférieure à 80 cm") ||
      c.toLowerCase().includes("sous 1,20 m")
  );

  if (hasCriticalConstraint) {
    status = "expert_required";
  } else if (constraints.length > 0 || itemsToConfirm.length > 0) {
    status = "conditional";
  } else {
    status = "favorable";
  }

  // Determine robot recommendations strictly from allowedRobots
  const allowed = config.allowedRobots;
  const getSelectedValues = (val: string | string[] | undefined): string[] =>
    Array.isArray(val) ? val : val ? [val] : [];

  if (config.sectorKey === "industry") {
    const selectedLoads = getSelectedValues(answers["industry_load_type"]);
    if (selectedLoads.length === 0) {
      if (allowed.includes("ulog-deliver-150")) recommendedRobots.push("ulog-deliver-150");
      if (allowed.includes("ulog-lift-300-base")) recommendedRobots.push("ulog-lift-300-base");
    } else {
      selectedLoads.forEach((load) => {
        if (load === "pallets_heavy_racks") {
          if (allowed.includes("ulog-lift-600")) recommendedRobots.push("ulog-lift-600");
          if (allowed.includes("ulog-lift-600-base")) recommendedRobots.push("ulog-lift-600-base");
        } else if (load === "heavy_floor_scrub") {
          if (allowed.includes("uclean-scrub-75")) recommendedRobots.push("uclean-scrub-75");
        } else if (load === "bins_kitting_300") {
          if (allowed.includes("ulog-deliver-300")) recommendedRobots.push("ulog-deliver-300");
          if (allowed.includes("ulog-lift-300-base")) recommendedRobots.push("ulog-lift-300-base");
        } else if (load === "light_line_feed") {
          if (allowed.includes("ulog-deliver-80")) recommendedRobots.push("ulog-deliver-80");
          if (allowed.includes("ulog-deliver-150")) recommendedRobots.push("ulog-deliver-150");
        }
      });
    }
  } else if (config.sectorKey === "retail") {
    const selectedNeeds = getSelectedValues(answers["retail_primary_need"]);
    if (selectedNeeds.length === 0) {
      if (allowed.includes("uclean-compact")) recommendedRobots.push("uclean-compact");
      if (allowed.includes("userve")) recommendedRobots.push("userve");
    } else {
      selectedNeeds.forEach((need) => {
        if (need === "guidance_welcome") {
          if (allowed.includes("userve")) recommendedRobots.push("userve");
        } else if (need === "floor_washing") {
          if (allowed.includes("uclean-scrub-50-disc")) recommendedRobots.push("uclean-scrub-50-disc");
          if (allowed.includes("uclean-compact")) recommendedRobots.push("uclean-compact");
        } else if (need === "carpet_vacuum") {
          if (allowed.includes("uclean-vacuum-40")) recommendedRobots.push("uclean-vacuum-40");
        } else if (need === "light_replenishment") {
          if (allowed.includes("uclean-compact")) recommendedRobots.push("uclean-compact");
          if (allowed.includes("userve")) recommendedRobots.push("userve");
        }
      });
    }
  } else if (config.sectorKey === "hospitality") {
    const selectedFlows = getSelectedValues(answers["hospitality_flow_type"]);
    if (selectedFlows.length === 0) {
      if (allowed.includes("userve")) recommendedRobots.push("userve");
      if (allowed.includes("uclean-compact")) recommendedRobots.push("uclean-compact");
    } else {
      selectedFlows.forEach((flow) => {
        if (flow === "table_service_bussing" || flow === "reception_welcome" || flow === "room_service") {
          if (allowed.includes("userve")) recommendedRobots.push("userve");
        } else if (flow === "silent_cleaning") {
          if (allowed.includes("uclean-vacuum-40")) recommendedRobots.push("uclean-vacuum-40");
          if (allowed.includes("uclean-compact")) recommendedRobots.push("uclean-compact");
        }
      });
    }
  } else if (config.sectorKey === "health") {
    const selectedHealthNeeds = getSelectedValues(answers["health_transport_need"]);
    if (selectedHealthNeeds.length === 0) {
      if (allowed.includes("ulog-deliver-150")) recommendedRobots.push("ulog-deliver-150");
      if (allowed.includes("uclean-compact")) recommendedRobots.push("uclean-compact");
    } else {
      selectedHealthNeeds.forEach((need) => {
        if (need === "pharmacy_meds") {
          if (allowed.includes("ulog-deliver-150")) recommendedRobots.push("ulog-deliver-150");
        } else if (need === "linen_meals_waste") {
          if (allowed.includes("ulog-lift-300-base")) recommendedRobots.push("ulog-lift-300-base");
        } else if (need === "bio_cleaning") {
          if (allowed.includes("uclean-compact")) recommendedRobots.push("uclean-compact");
          if (allowed.includes("uclean-scrub-50-disc")) recommendedRobots.push("uclean-scrub-50-disc");
        } else if (need === "reception_guidance") {
          if (allowed.includes("userve")) recommendedRobots.push("userve");
        }
      });
    }
  }

  // Ensure all recommendedRobots are strictly in allowedRobots list
  const uniqueRecommended = Array.from(new Set(recommendedRobots.filter((r) => allowed.includes(r))));

  // Extract primary need label
  let primaryNeedLabel = "";
  if (config.sectorKey === "industry") {
    const selected = getSelectedValues(answers["industry_load_type"]);
    const q = config.questions.find((question) => question.id === "industry_load_type");
    if (q && selected.length > 0) {
      const labels = selected.map((s) => q.options.find((o) => o.id === s)?.label).filter(Boolean);
      primaryNeedLabel = labels.join(", ");
    }
  } else if (config.sectorKey === "retail") {
    const selected = getSelectedValues(answers["retail_primary_need"]);
    const q = config.questions.find((question) => question.id === "retail_primary_need");
    if (q && selected.length > 0) {
      const labels = selected.map((s) => q.options.find((o) => o.id === s)?.label).filter(Boolean);
      primaryNeedLabel = labels.join(", ");
    }
  } else if (config.sectorKey === "hospitality") {
    const selected = getSelectedValues(answers["hospitality_flow_type"]);
    const q = config.questions.find((question) => question.id === "hospitality_flow_type");
    if (q && selected.length > 0) {
      const labels = selected.map((s) => q.options.find((o) => o.id === s)?.label).filter(Boolean);
      primaryNeedLabel = labels.join(", ");
    }
  } else if (config.sectorKey === "health") {
    const selected = getSelectedValues(answers["health_transport_need"]);
    const q = config.questions.find((question) => question.id === "health_transport_need");
    if (q && selected.length > 0) {
      const labels = selected.map((s) => q.options.find((o) => o.id === s)?.label).filter(Boolean);
      primaryNeedLabel = labels.join(", ");
    }
  }

  // Generate dynamic robot details
  const robotMetadataMap: Record<string, { name: string; role: string; justification: string }> = {
    "userve": {
      name: "uServe",
      role: "Accueil & Service interactif",
      justification: "Sélectionné pour l'accueil, l'orientation des usagers et le service fluide en salle."
    },
    "uclean-compact": {
      name: "uClean Compact",
      role: "Entretien 4-en-1 agile",
      justification: "Sélectionné pour son agilité dans les espaces restreints et les passages sous 1 mètre."
    },
    "uclean-vacuum-40": {
      name: "uClean Vacuum 40",
      role: "Aspiration HEPA H13",
      justification: "Sélectionné pour son aspiration silencieuse en continu et sa filtration de qualité médicale."
    },
    "uclean-scrub-50-disc": {
      name: "uClean Scrub 50 Disc",
      role: "Lavage & Séchage sols lisses",
      justification: "Sélectionné pour le lavage haute performance et le séchage immédiat des allées."
    },
    "uclean-scrub-50-roller": {
      name: "uClean Scrub 50 Roller",
      role: "Brossage sols texturés",
      justification: "Sélectionné pour le nettoyage en profondeur des joints et surfaces antidérapantes."
    },
    "uclean-scrub-75": {
      name: "uClean Scrub 75",
      role: "Lavage industriel Heavy Duty",
      justification: "Sélectionné pour le lavage rapide et autonome des très grandes surfaces d'usine."
    },
    "ulog-deliver-80": {
      name: "uLog Deliver 80",
      role: "Livraison agile 80 kg",
      justification: "Sélectionné pour l'approvisionnement rapide de pièces légères et bacs sur ligne."
    },
    "ulog-deliver-150": {
      name: "uLog Deliver 150",
      role: "Distribution sécurisée 150 kg",
      justification: "Sélectionné pour le transport autonome et traçable de colis, linge ou médicaments."
    },
    "ulog-deliver-300": {
      name: "uLog Deliver 300",
      role: "Convoyage kitting 300 kg",
      justification: "Sélectionné pour le transfert de bacs industriels et charges moyennes."
    },
    "ulog-lift-300-base": {
      name: "uLog Lift 300 Base",
      role: "Levage autonome 300 kg",
      justification: "Sélectionné pour se glisser sous les chariots et racks afin d'automatiser leur manutention."
    },
    "ulog-lift-600-base": {
      name: "uLog Lift 600 Base",
      role: "Manutention lourde 600 kg",
      justification: "Sélectionné pour le déplacement puissant de palettes et charges lourdes."
    },
    "ulog-lift-600": {
      name: "uLog Lift 600",
      role: "Levage palettes 600 kg",
      justification: "Sélectionné pour le transfert sécurisé de palettes industrielles avec écran de guidage."
    }
  };

  const recommendedRobotDetails = uniqueRecommended.map((id) => {
    const meta = robotMetadataMap[id] || {
      name: id,
      role: "Solution cobotique spécialisée",
      justification: "Recommandé pour répondre aux critères techniques sélectionnés."
    };
    return {
      id,
      name: meta.name,
      role: meta.role,
      justification: meta.justification
    };
  });

  // Default items to confirm
  itemsToConfirm.push("Visite technique de confirmation sur site");
  itemsToConfirm.push("Validation des accès réseau / WiFi / Ascenseurs");

  let statusTitle = "";
  let nextStepRecommendation = "";

  if (status === "favorable") {
    statusTitle = "Potentiel favorable identifié";
    nextStepRecommendation = "Validation des détails d'implantation lors d'un échange avec nos ingénieurs.";
  } else if (status === "conditional") {
    statusTitle = "Faisable sous réserve de validation technique";
    nextStepRecommendation = "Analyse approfondie des contraintes identifiées avec un expert Phoenix-Botics.";
  } else {
    statusTitle = "Expertise technique nécessaire";
    nextStepRecommendation = "Visite d'audit in situ obligatoire pour analyser la faisabilité des accès et pentes.";
  }

  const disclaimer =
    "Cette préqualification en ligne constitue une première orientation indicative et ne remplace pas une visite technique, une analyse de risques ni une validation menée par un expert Phoenix-Botics.";

  return {
    status,
    statusTitle,
    primaryNeedLabel,
    favorablePoints: Array.from(new Set(favorablePoints)),
    constraints: Array.from(new Set(constraints)),
    itemsToConfirm: Array.from(new Set(itemsToConfirm)),
    recommendedRobots: uniqueRecommended,
    recommendedRobotDetails,
    nextStepRecommendation,
    disclaimer
  };
}
