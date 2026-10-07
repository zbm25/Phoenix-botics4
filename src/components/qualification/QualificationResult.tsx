import React from "react";
import { QualificationEvaluation } from "./qualificationTypes";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Building2,
  Check,
  ChevronRight
} from "lucide-react";
import { getRobotById, optimizeCloudinaryUrl } from "../../data/robotSeries";
import { ProofBlock } from "../ProofBlock";

interface QualificationResultProps {
  evaluation: QualificationEvaluation;
  onContactClick: () => void;
  onExploreFleetClick?: () => void;
  onReset: () => void;
}

export const QualificationResult: React.FC<QualificationResultProps> = ({
  evaluation,
  onContactClick,
  onExploreFleetClick,
  onReset,
}) => {
  const isFavorable = evaluation.status === "favorable";
  const isConditional = evaluation.status === "conditional";

  const badgeBg = isFavorable
    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
    : isConditional
    ? "bg-amber-50 text-amber-800 border-amber-200"
    : "bg-slate-100 text-slate-800 border-slate-300";

  const iconColor = isFavorable
    ? "text-emerald-600"
    : isConditional
    ? "text-amber-600"
    : "text-slate-600";

  return (
    <div className="w-full space-y-8 text-left">
      {/* 1. HEADER STATUS BADGE & DIAGNOSTIC */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className={`p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shrink-0 shadow-xs ${iconColor}`}>
            {isFavorable ? (
              <CheckCircle2 size={28} />
            ) : isConditional ? (
              <AlertTriangle size={28} />
            ) : (
              <ShieldCheck size={28} />
            )}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${badgeBg}`}>
                {evaluation.status === "favorable"
                  ? "Diagnostic Favorable"
                  : evaluation.status === "conditional"
                  ? "Faisable sous réserve"
                  : "Expertise Nécessaire"}
              </span>
              {evaluation.primaryNeedLabel && (
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200">
                  Besoin : {evaluation.primaryNeedLabel}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 leading-tight pt-1">
              {evaluation.statusTitle}
            </h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              {evaluation.nextStepRecommendation}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-orange-600 transition-colors cursor-pointer shrink-0 self-start md:self-center"
        >
          <RefreshCw size={14} />
          <span>Modifier mes réponses</span>
        </button>
      </div>

      {/* 2. SYNTHÈSE MÉTIER & FAISABILITÉ SITE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Forces & Atouts */}
        {evaluation.favorablePoints.length > 0 && (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                Forces & Atouts du site
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {evaluation.favorablePoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                  <span className="leading-relaxed font-normal">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prérequis & Points à valider sur site */}
        {(evaluation.constraints.length > 0 || evaluation.itemsToConfirm.length > 0) && (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                Points à valider lors de l'audit
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {evaluation.constraints.map((c, i) => (
                <li key={`c-${i}`} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">•</span>
                  <span className="leading-relaxed font-medium text-slate-800">{c}</span>
                </li>
              ))}
              {evaluation.itemsToConfirm.map((it, i) => (
                <li key={`it-${i}`} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">?</span>
                  <span className="leading-relaxed text-slate-600">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 3. RECOMMANDATION DE FLOTTE EXPLIQUÉE */}
      {evaluation.recommendedRobotDetails && evaluation.recommendedRobotDetails.length > 0 && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-600 block">
                PRÉCONISATION TECHNIQUE SUR-MESURE
              </span>
              <h4 className="text-base font-bold text-slate-900 font-display">
                Flotte cobotique recommandée pour votre configuration
              </h4>
            </div>
            {onExploreFleetClick && (
              <button
                type="button"
                onClick={onExploreFleetClick}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 cursor-pointer"
              >
                <span>Voir la galerie</span>
                <ChevronRight size={14} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {evaluation.recommendedRobotDetails.map((detail) => {
              const robotData = getRobotById(detail.id);
              return (
                <div
                  key={detail.id}
                  className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-orange-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Visual & Titles */}
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg bg-white p-1.5 border border-slate-200/80 shrink-0 flex items-center justify-center overflow-hidden">
                        {robotData?.image ? (
                          <img
                            src={optimizeCloudinaryUrl(robotData.image, 200)}
                            alt={detail.name}
                            className="w-full h-full object-contain mix-blend-multiply"
                          />
                        ) : (
                          <Building2 size={24} className="text-slate-400" />
                        )}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-900">{detail.name}</h5>
                        <p className="text-[10px] font-mono uppercase font-semibold text-orange-600">{detail.role}</p>
                      </div>
                    </div>

                    {/* Concise Dynamic Justification */}
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {detail.justification}
                    </p>

                    {/* Verifiable Proof Component */}
                    <ProofBlock
                      compact
                      assertion={
                        robotData?.specs?.[0]
                          ? `${robotData.specs[0].label} : ${robotData.specs[0].value}`
                          : "Navigation autonome certifiée CE ISO 3691-4"
                      }
                      type="constructor_spec"
                      source="Fiche Technique Constructeur (United Robotics Group)"
                      scope="Site d'exploitation"
                      date="2025"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. RÉASSURANCE B2B PHOENIX-BOTICS */}
      <div className="p-6 rounded-2xl bg-[#0B1121] text-white space-y-4 shadow-lg border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-display">
              Accompagnement par l'intégrateur officiel Phoenix-Botics
            </h4>
            <p className="text-xs text-slate-400 font-light">
              Partenaire de distribution et d'intégration certifié en France
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-lg border border-white/5">
            <Check size={14} className="text-orange-400 shrink-0" />
            <span>Audit de site sous 48h</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-lg border border-white/5">
            <Check size={14} className="text-orange-400 shrink-0" />
            <span>Simulation d'implantation 3D</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-lg border border-white/5">
            <Check size={14} className="text-orange-400 shrink-0" />
            <span>Essai terrain sans engagement</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 font-light leading-relaxed italic border-t border-white/10 pt-3">
          Estimation indicative calculée sur la base de vos paramètres. Une étude de site permet de valider les trajectoires, l’infrastructure et le ROI réel.
        </p>
      </div>

      {/* 5. HIÉRARCHIE DES CTA POST-DIAGNOSTIC */}
      <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-200">
        {/* CTA Secondaire */}
        {onExploreFleetClick && (
          <button
            type="button"
            onClick={onExploreFleetClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer order-2 sm:order-1"
          >
            <span>Explorer la flotte recommandée</span>
            <ChevronRight size={15} />
          </button>
        )}

        {/* CTA Principal */}
        <button
          type="button"
          onClick={onContactClick}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer shrink-0 order-1 sm:order-2"
        >
          <span>Demander une étude de faisabilité</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
