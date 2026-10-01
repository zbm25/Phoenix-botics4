import React from "react";
import { QualificationQuestion } from "./qualificationTypes";

interface QuestionStepProps {
  question: QualificationQuestion;
  currentStepIndex: number;
  totalSteps: number;
  selectedValue: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({
  question,
  currentStepIndex,
  totalSteps,
  selectedValue,
  onChange,
  onNext,
  onPrev,
  isFirstStep,
  isLastStep,
}) => {
  const isMultiple = question.type === "multiple";
  const selectedList = Array.isArray(selectedValue)
    ? selectedValue
    : selectedValue
    ? [selectedValue]
    : [];

  const handleOptionClick = (optionId: string) => {
    if (isMultiple) {
      if (selectedList.includes(optionId)) {
        onChange(selectedList.filter((id) => id !== optionId));
      } else {
        onChange([...selectedList, optionId]);
      }
    } else {
      onChange(optionId);
    }
  };

  const isOptionSelected = (optionId: string) => selectedList.includes(optionId);
  const isNextDisabled = selectedList.length === 0;

  return (
    <div className="w-full space-y-6 text-left">
      {/* Step Progress Indicator */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-200 pb-3">
        <span className="font-semibold uppercase text-orange-600">
          Étape {currentStepIndex + 1} sur {totalSteps}
        </span>
        <span className="text-slate-400">
          {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% complété
        </span>
      </div>

      {/* Question Title & Subtitle */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 leading-snug">
          {question.title}
        </h3>
        {question.subtitle && (
          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed font-light">
            {question.subtitle}
          </p>
        )}
      </div>

      {/* Options List */}
      <div className="space-y-3 pt-2" role="radiogroup" aria-label={question.title}>
        {question.options.map((opt) => {
          const selected = isOptionSelected(opt.id);
          return (
            <button
              type="button"
              key={opt.id}
              onClick={() => handleOptionClick(opt.id)}
              className={`w-full p-4 rounded-xl border transition-all text-left flex items-start gap-3.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${
                selected
                  ? "bg-orange-50/70 border-orange-500/80 shadow-sm text-slate-900"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-800"
              }`}
              role={isMultiple ? "checkbox" : "radio"}
              aria-checked={selected}
            >
              <div
                className={`mt-0.5 w-5 h-5 shrink-0 rounded-${
                  isMultiple ? "md" : "full"
                } border flex items-center justify-center transition-colors ${
                  selected
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {selected && (
                  <span className="text-xs font-bold leading-none">✓</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-sm font-semibold leading-snug">
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="block text-xs text-slate-500 mt-1 font-light leading-relaxed">
                    {opt.description}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirstStep}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border cursor-pointer ${
            isFirstStep
              ? "opacity-0 pointer-events-none"
              : "border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
          }`}
        >
          Retour
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer ${
            isNextDisabled
              ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20"
          }`}
        >
          {isLastStep ? "Voir la préqualification" : "Continuer"}
        </button>
      </div>
    </div>
  );
};
