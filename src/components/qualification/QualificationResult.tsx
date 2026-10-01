import React from "react";
import { QualificationEvaluation } from "./qualificationTypes";
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";

interface QualificationResultProps {
  evaluation: QualificationEvaluation;
  onContactClick: () => void;
  onReset: () => void;
}

export const QualificationResult: React.FC<QualificationResultProps> = ({
  evaluation,
  onContactClick,
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
    <div className="w-full space-y-6 text-left">
      {/* Header Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl bg-white border border-slate-200/60 shadow-sm ${iconColor}`}>
            {isFavorable ? (
              <CheckCircle2 size={26} />
            ) : isConditional ? (
              <AlertTriangle size={26} />
            ) : (
              <ShieldCheck size={26} />
            )}
          </div>
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border mb-2 ${badgeBg}`}>
              {evaluation.status === "favorable"
                ? "Diagnostic Favorable"
                : evaluation.status === "conditional"
                ? "Faisable sous réserve"
                : "Expertise Nécessaire"}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 leading-tight">
              {evaluation.statusTitle}
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-orange-600 transition-colors cursor-pointer self-start sm:self-center"
        >
          <RefreshCw size={14} />
          <span>Modifier mes réponses</span>
        </button>
      </div>

      {/* Points breakdown grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Favorable Points */}
        {evaluation.favorablePoints.length > 0 && (
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Points de compatibilité identifiés
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {evaluation.favorablePoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Constraints / Items to confirm */}
        {(evaluation.constraints.length > 0 || evaluation.itemsToConfirm.length > 0) && (
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Points d'attention & prérequis
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {evaluation.constraints.map((c, i) => (
                <li key={`c-${i}`} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold shrink-0">•</span>
                  <span className="leading-relaxed font-medium text-slate-800">{c}</span>
                </li>
              ))}
              {evaluation.itemsToConfirm.map((it, i) => (
                <li key={`it-${i}`} className="flex items-start gap-2">
                  <span className="text-slate-400 font-bold shrink-0">?</span>
                  <span className="leading-relaxed text-slate-600">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Robot Recommendations if available */}
      {evaluation.recommendedRobots.length > 0 && (
        <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-200/80 space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-600 block">
            Cobiots préconisés pour votre secteur
          </span>
          <p className="text-xs text-slate-800 font-semibold">
            Modèles suggérés : {evaluation.recommendedRobots.join(", ")}
          </p>
        </div>
      )}

      {/* Mandatory Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200/80 text-[11px] text-slate-600 font-light leading-relaxed italic">
        {evaluation.disclaimer}
      </div>

      {/* Final Action CTA */}
      <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
        <p className="text-xs text-slate-600">
          {evaluation.nextStepRecommendation}
        </p>
        <button
          type="button"
          onClick={onContactClick}
          className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <span>Échanger avec un expert sur ce projet</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
