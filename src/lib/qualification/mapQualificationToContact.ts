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
  const primarySuggestedModel = evaluation.recommendedRobots[0] || "";

  const structuredData: StructuredQualificationData = {
    sector: sectorKey,
    answers,
    evaluation,
    timestamp: new Date().toISOString()
  };

  const lines: string[] = [];
  lines.push(`[Préqualification Technique Phoenix-Botics]`);
  lines.push(`Secteur: ${sectorKey.toUpperCase()}`);
  lines.push(`Diagnostic: ${evaluation.statusTitle.toUpperCase()} (${evaluation.status})`);

  if (evaluation.recommendedRobots.length > 0) {
    lines.push(`Robots préconisés: ${evaluation.recommendedRobots.join(", ")}`);
  }

  if (evaluation.favorablePoints.length > 0) {
    lines.push(`Points forts: ${evaluation.favorablePoints.join(" ; ")}`);
  }

  if (evaluation.constraints.length > 0) {
    lines.push(`Points d'attention: ${evaluation.constraints.join(" ; ")}`);
  }

  lines.push(`Prochaine étape: ${evaluation.nextStepRecommendation}`);

  return {
    sector: sectorKey,
    suggestedModel: primarySuggestedModel,
    formattedSummary: lines.join("\n"),
    structuredData
  };
}
