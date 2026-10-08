import React from "react";
import { CheckCircle2, ShieldCheck, FileText, Info } from "lucide-react";

export type ProofType = "constructor_spec" | "indicative_estimate" | "client_result";

export interface ProofBlockProps {
  assertion: string;
  type: ProofType;
  source: string;
  scope?: string;
  date?: string;
  methodology?: string;
  className?: string;
  compact?: boolean;
}

const TYPE_CONFIG: Record<
  ProofType,
  { label: string; bg: string; text: string; border: string; icon: React.ElementType }
> = {
  constructor_spec: {
    label: "Spécification constructeur",
    bg: "bg-blue-50 text-blue-800",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: ShieldCheck,
  },
  client_result: {
    label: "Résultat client",
    bg: "bg-emerald-50 text-emerald-800",
    border: "border-emerald-200",
    text: "text-emerald-700",
    icon: CheckCircle2,
  },
  indicative_estimate: {
    label: "Estimation indicative",
    bg: "bg-amber-50 text-amber-800",
    border: "border-amber-200",
    text: "text-amber-700",
    icon: Info,
  },
};

export const ProofBlock: React.FC<ProofBlockProps> = ({
  assertion,
  type,
  source,
  scope,
  date,
  methodology,
  className = "",
  compact = false,
}) => {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.indicative_estimate;

  if (compact) {
    return (
      <div className={`p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 ${className}`}>
        <p className="font-semibold text-slate-900 text-xs leading-snug">{assertion}</p>
        {methodology && (
          <p className="text-[11px] text-slate-500 font-light leading-relaxed">{methodology}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2 ${className}`}>
      <p className="text-sm font-semibold text-slate-900 leading-snug">{assertion}</p>
      {methodology && (
        <p className="text-xs text-slate-600 leading-relaxed font-light">{methodology}</p>
      )}
    </div>
  );
};
