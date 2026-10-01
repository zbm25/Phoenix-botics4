import React, { useState, useEffect } from "react";
import { getSectorConfig } from "../../lib/qualification/evaluateQualification";
import { mapQualificationToContact, MappedContactQualification } from "../../lib/qualification/mapQualificationToContact";
import { UserAnswerMap, QualificationEvaluation } from "./qualificationTypes";
import { QuestionStep } from "./QuestionStep";
import { QualificationResult } from "./QualificationResult";

interface PrequalificationFlowProps {
  sectorKey: string;
  onCompleteQualification?: (mapped: MappedContactQualification) => void;
}

export const PrequalificationFlow: React.FC<PrequalificationFlowProps> = ({
  sectorKey,
  onCompleteQualification,
}) => {
  const config = getSectorConfig(sectorKey);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswerMap>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<QualificationEvaluation | null>(null);

  useEffect(() => {
    setCurrentStepIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setEvaluationResult(null);
  }, [sectorKey]);

  const currentQuestion = config.questions[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === config.questions.length - 1;

  const handleAnswerChange = (val: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: val,
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      const mapped = mapQualificationToContact(sectorKey, answers);
      setEvaluationResult(mapped.structuredData.evaluation);
      setIsCompleted(true);
      if (onCompleteQualification) {
        onCompleteQualification(mapped);
      }
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setEvaluationResult(null);
  };

  const handleContactClick = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="prequalification"
      className="py-16 bg-white border-t border-slate-100 relative z-20"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Module Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-orange-500 font-mono text-xs tracking-widest uppercase font-semibold block mb-2">
            PREQUALIFICATION TECHNIQUE {config.sectorTitle.toUpperCase()}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight">
            Vérifiez la faisabilité technique de votre site
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed font-light">
            Répondez à quelques questions sur votre environnement et vos flux. Vous obtiendrez une première orientation à confirmer avec un expert Phoenix-Botics.
          </p>
        </div>

        {/* Card Container using approved Phoenix-Botics design tokens */}
        <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-[28px] p-6 sm:p-10 shadow-xl">
          {!isCompleted ? (
            <QuestionStep
              question={currentQuestion}
              currentStepIndex={currentStepIndex}
              totalSteps={config.questions.length}
              selectedValue={answers[currentQuestion.id]}
              onChange={handleAnswerChange}
              onNext={handleNext}
              onPrev={handlePrev}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
            />
          ) : (
            evaluationResult && (
              <QualificationResult
                evaluation={evaluationResult}
                onContactClick={handleContactClick}
                onReset={handleReset}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};
