export type QualificationStatus = "favorable" | "conditional" | "expert_required";

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  flagConstraint?: string;
  flagFavorable?: string;
}

export interface QualificationQuestion {
  id: string;
  title: string;
  subtitle?: string;
  type: "single" | "multiple";
  options: QuestionOption[];
}

export interface SectorQualificationConfig {
  sectorKey: string;
  sectorTitle: string;
  allowedRobots: string[];
  questions: QualificationQuestion[];
}

export interface UserAnswerMap {
  [questionId: string]: string | string[];
}

export interface RecommendedRobotDetail {
  id: string;
  name: string;
  role: string;
  justification: string;
}

export interface QualificationEvaluation {
  status: QualificationStatus;
  statusTitle: string;
  primaryNeedLabel?: string;
  favorablePoints: string[];
  constraints: string[];
  itemsToConfirm: string[];
  recommendedRobots: string[];
  recommendedRobotDetails?: RecommendedRobotDetail[];
  recommendedFamilyLabel?: string;
  nextStepRecommendation: string;
  disclaimer: string;
}

export interface StructuredQualificationData {
  sector: string;
  answers: UserAnswerMap;
  evaluation: QualificationEvaluation;
  timestamp: string;
}
