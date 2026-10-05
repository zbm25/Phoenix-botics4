import { evaluateQualification } from "./evaluateQualification";
import {
  UserAnswerMap,
  StructuredQualificationData
} from "../../components/qualification/qualificationTypes";

export interface MappedContactQualification {
  sector: string;
  suggestedModel: string;
  formattedSummary: string;
  structuredData: StructuredQualificationData;
}

export function mapQualificationToContact(
  sectorKey: string,
  answers: UserAnswerMap
): MappedContactQualification {
  const evaluation = evaluateQualification(sectorKey, answers);
  let primarySuggestedModel = "";
  if (evaluation.recommendedRobots.length >= 2) {
    primarySuggestedModel = "flotte-mixte";
  } else if (evaluation.recommendedRobots.length === 1) {
    primarySuggestedModel = evaluation.recommendedRobots[0];
  }

  const structuredData: StructuredQualificationData = {
    sector: sectorKey,
    answers,
    evaluation,
    timestamp: new Date().toISOString()
  };

  const lines: string[] = [];
  lines.push(`[Préqualification Technique Phoenix-Botics]`);
  lines.push(`Secteur: ${sectorKey.toUpperCase()}`);
  if (evaluation.primaryNeedLabel) {
    lines.push(`Besoin principal: ${evaluation.primaryNeedLabel}`);
  }
  lines.push(`Diagnostic: ${evaluation.statusTitle.toUpperCase()} (${evaluation.status})`);

  if (evaluation.recommendedRobots.length > 0) {
    lines.push(`Robots préconisés: ${evaluation.recommendedRobots.join(", ")}`);
  }

  if (evaluation.itemsToConfirm.length > 0) {
    lines.push(`Points à confirmer sur site: ${evaluation.itemsToConfirm.join(" ; ")}`);
  }

  return {
    sector: sectorKey,
    suggestedModel: primarySuggestedModel,
    formattedSummary: lines.join("\n"),
    structuredData
  };
}
