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
  const Icon = config.icon;

  if (compact) {
    return (
      <div className={`p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 ${className}`}>
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${config.bg} ${config.border}`}>
            <Icon size={12} />
            <span>{config.label}</span>
          </span>
          {date && <span className="text-[10px] font-mono text-slate-400">{date}</span>}
        </div>
        <p className="font-medium text-slate-800 text-xs leading-snug">{assertion}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-slate-500 font-light">
          <span>Source : <strong className="font-medium text-slate-700">{source}</strong></span>
          {scope && <span>• Périmètre : {scope}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${config.bg} ${config.border}`}>
          <Icon size={14} />
          <span>{config.label}</span>
        </span>
        {date && <span className="text-xs font-mono text-slate-400">{date}</span>}
      </div>

      <p className="text-sm font-semibold text-slate-900 leading-snug">{assertion}</p>

      <div className="pt-2 border-t border-slate-100 flex flex-col gap-1 text-xs text-slate-500">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>Source : <strong className="font-medium text-slate-700">{source}</strong></span>
          {scope && <span>• Périmètre : <strong className="font-medium text-slate-700">{scope}</strong></span>}
        </div>
        {methodology && (
          <p className="text-[11px] text-slate-400 font-light italic mt-0.5">
            Note : {methodology}
          </p>
        )}
      </div>
    </div>
  );
};
