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

  if (config.sectorKey === "industry") {
    const loadAns = answers["industry_load_type"];
    if (loadAns === "pallets_heavy_racks") {
      if (allowed.includes("ulog-lift-600")) recommendedRobots.push("ulog-lift-600");
      if (allowed.includes("ulog-lift-600-base")) recommendedRobots.push("ulog-lift-600-base");
    } else if (loadAns === "heavy_floor_scrub") {
      if (allowed.includes("uclean-scrub-75")) recommendedRobots.push("uclean-scrub-75");
    } else if (loadAns === "bins_kitting_300") {
      if (allowed.includes("ulog-deliver-300")) recommendedRobots.push("ulog-deliver-300");
      if (allowed.includes("ulog-lift-300-base")) recommendedRobots.push("ulog-lift-300-base");
    } else if (loadAns === "light_line_feed") {
      if (allowed.includes("ulog-deliver-80")) recommendedRobots.push("ulog-deliver-80");
      if (allowed.includes("ulog-deliver-150")) recommendedRobots.push("ulog-deliver-150");
    } else {
      if (allowed.includes("ulog-deliver-150")) recommendedRobots.push("ulog-deliver-150");
      if (allowed.includes("ulog-lift-300-base")) recommendedRobots.push("ulog-lift-300-base");
    }
  } else if (config.sectorKey === "retail") {
    const needAns = answers["retail_primary_need"];
    if (needAns === "guidance_welcome") {
      if (allowed.includes("userve")) recommendedRobots.push("userve");
    } else if (needAns === "floor_washing") {
      if (allowed.includes("uclean-scrub-50-disc")) recommendedRobots.push("uclean-scrub-50-disc");
      if (allowed.includes("uclean-compact")) recommendedRobots.push("uclean-compact");
    } else if (needAns === "carpet_vacuum") {
      if (allowed.includes("uclean-vacuum-40")) recommendedRobots.push("uclean-vacuum-40");
    } else {
      if (allowed.includes("uclean-compact")) recommendedRobots.push("uclean-compact");
      if (allowed.includes("userve")) recommendedRobots.push("userve");
    }
  } else if (config.sectorKey === "hospitality") {
    const flowAns = answers["hospitality_flow_type"];
    if (flowAns === "table_service_bussing" || flowAns === "reception_welcome" || flowAns === "room_service") {
      if (allowed.includes("userve")) recommendedRobots.push("userve");
    } else if (flowAns === "silent_cleaning") {
      if (allowed.includes("uclean-vacuum-40")) recommendedRobots.push("uclean-vacuum-40");
      if (allowed.includes("uclean-compact")) recommendedRobots.push("uclean-compact");
    } else {
      if (allowed.includes("userve")) recommendedRobots.push("userve");
      if (allowed.includes("uclean-compact")) recommendedRobots.push("uclean-compact");
    }
  } else if (config.sectorKey === "health") {
    const healthAns = answers["health_transport_need"];
    if (healthAns === "pharmacy_meds") {
      if (allowed.includes("ulog-deliver-150")) recommendedRobots.push("ulog-deliver-150");
    } else if (healthAns === "linen_meals_waste") {
      if (allowed.includes("ulog-lift-300-base")) recommendedRobots.push("ulog-lift-300-base");
    } else if (healthAns === "bio_cleaning") {
      if (allowed.includes("uclean-compact")) recommendedRobots.push("uclean-compact");
      if (allowed.includes("uclean-scrub-50-disc")) recommendedRobots.push("uclean-scrub-50-disc");
    } else if (healthAns === "reception_guidance") {
      if (allowed.includes("userve")) recommendedRobots.push("userve");
    } else {
      if (allowed.includes("ulog-deliver-150")) recommendedRobots.push("ulog-deliver-150");
      if (allowed.includes("uclean-compact")) recommendedRobots.push("uclean-compact");
    }
  }

  // Ensure all recommendedRobots are strictly in allowedRobots list
  const filteredRecommended = recommendedRobots.filter((r) => allowed.includes(r));

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
    favorablePoints: Array.from(new Set(favorablePoints)),
    constraints: Array.from(new Set(constraints)),
    itemsToConfirm: Array.from(new Set(itemsToConfirm)),
    recommendedRobots: Array.from(new Set(filteredRecommended)),
    nextStepRecommendation,
    disclaimer
  };
}
