import React, { useState, useEffect, useId, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ArrowRight, ChevronDown } from "lucide-react";
import { getAllRobotModels } from "../data/robotSeries";

export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  sector: string;
  model: string;
  details: string;
}

export interface ContactFormProps {
  defaultSector?: string;
  defaultModel?: string;
  defaultDetails?: string;
  sectorOptions?: Array<{ val: string; label: string }>;
  robotOptions?: Array<{ val: string; label: string }>;
  emailPlaceholder?: string;
  ctaLabel?: string;
  onSuccess?: (data: ContactFormData) => void;
  idPrefix?: string;
}

const DEFAULT_SECTOR_OPTIONS: Array<{ val: string; label: string }> = [
  { val: "retail", label: "Retail & Commerce" },
  { val: "hospitality", label: "Hôtellerie & Restauration" },
  { val: "health", label: "Santé & Médical" },
  { val: "industry", label: "Industrie & Logistique" },
  { val: "other", label: "Autre secteur" },
];

export const ContactForm: React.FC<ContactFormProps> = ({
  defaultSector = "",
  defaultModel = "",
  defaultDetails = "",
  sectorOptions,
  robotOptions,
  emailPlaceholder = "contact@entreprise.com",
  ctaLabel = "Demander une étude d'implantation",
  onSuccess,
  idPrefix,
}) => {
  const generatedId = useId();
  const baseId = idPrefix ? `${idPrefix}-${generatedId}` : generatedId;

  const actualSectorOptions = useMemo(() => {
    return sectorOptions && sectorOptions.length > 0 ? sectorOptions : DEFAULT_SECTOR_OPTIONS;
  }, [sectorOptions]);

  const defaultRobotOptions = useMemo(() => {
    const models = getAllRobotModels();
    const opts = models.map((m) => ({
      val: m.canonicalId,
      label: `${m.name} (${m.segmentLabel})`,
    }));
    opts.push({ val: "flotte-mixte", label: "Flotte mixte (plusieurs modèles)" });
    opts.push({ val: "audit-site", label: "Audit global de site" });
    return opts;
  }, []);

  const actualRobotOptions = useMemo(() => {
    return robotOptions && robotOptions.length > 0 ? robotOptions : defaultRobotOptions;
  }, [robotOptions, defaultRobotOptions]);

  const sanitizeSector = (sec: string) => {
    if (!sec) return "";
    const exists = actualSectorOptions.some((opt) => opt.val === sec);
    if (exists) return sec;
    const defaultExists = DEFAULT_SECTOR_OPTIONS.some((opt) => opt.val === sec);
    return defaultExists ? sec : "";
  };

  const sanitizeModel = (mod: string) => {
    if (!mod) return "";
    const existsInActual = actualRobotOptions.some((opt) => opt.val === mod);
    if (existsInActual) return mod;
    const existsInDefault = defaultRobotOptions.some((opt) => opt.val === mod);
    return existsInDefault ? mod : "";
  };

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    company: "",
    sector: sanitizeSector(defaultSector),
    model: sanitizeModel(defaultModel),
    details: defaultDetails,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      sector: sanitizeSector(defaultSector),
      model: sanitizeModel(defaultModel),
      details: defaultDetails,
    }));
  }, [defaultSector, defaultModel, defaultDetails, actualSectorOptions, actualRobotOptions, defaultRobotOptions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess(formData);
      }
    }, 300);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      company: "",
      sector: sanitizeSector(defaultSector),
      model: sanitizeModel(defaultModel),
      details: defaultDetails,
    });
    setIsSubmitted(false);
  };

  const selectedSectorLabel = useMemo(() => {
    if (!formData.sector) return "";
    const found = actualSectorOptions.find((opt) => opt.val === formData.sector);
    if (found) return found.label;
    const defaultFound = DEFAULT_SECTOR_OPTIONS.find((opt) => opt.val === formData.sector);
    return defaultFound ? defaultFound.label : formData.sector;
  }, [formData.sector, actualSectorOptions]);

  const selectedRobotLabel = useMemo(() => {
    if (!formData.model) return "";
    const foundInActual = actualRobotOptions.find((opt) => opt.val === formData.model);
    if (foundInActual) return foundInActual.label;
    const foundInDefault = defaultRobotOptions.find((opt) => opt.val === formData.model);
    return foundInDefault ? foundInDefault.label : formData.model;
  }, [formData.model, actualRobotOptions, defaultRobotOptions]);

  const nameInputId = `${baseId}-fullName`;
  const emailInputId = `${baseId}-email`;
  const companyInputId = `${baseId}-company`;
  const sectorInputId = `${baseId}-sector`;
  const modelInputId = `${baseId}-model`;
  const detailsInputId = `${baseId}-details`;

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4 text-left"
          >
            {/* Nom & Prénom + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor={nameInputId}
                  className="block text-[10px] font-bold text-gray-300 tracking-widest uppercase font-mono"
                >
                  Nom & Prénom <span className="text-orange-500">*</span>
                </label>
                <input
                  id={nameInputId}
                  name="fullName"
                  type="text"
                  required
                  placeholder="Jean Dupont"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#12192B] border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 focus:outline-none transition-colors placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor={emailInputId}
                  className="block text-[10px] font-bold text-gray-300 tracking-widest uppercase font-mono"
                >
                  Email professionnel <span className="text-orange-500">*</span>
                </label>
                <input
                  id={emailInputId}
                  name="email"
                  type="email"
                  required
                  placeholder={emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#12192B] border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 focus:outline-none transition-colors placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Entreprise + Secteur */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor={companyInputId}
                  className="block text-[10px] font-bold text-gray-300 tracking-widest uppercase font-mono"
                >
                  Entreprise <span className="text-orange-500">*</span>
                </label>
                <input
                  id={companyInputId}
                  name="company"
                  type="text"
                  required
                  placeholder="Nom de l'entreprise"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-[#12192B] border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 focus:outline-none transition-colors placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor={sectorInputId}
                  className="block text-[10px] font-bold text-gray-300 tracking-widest uppercase font-mono"
                >
                  Secteur d'activité <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id={sectorInputId}
                    name="sector"
                    required
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full bg-[#12192B] border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 focus:outline-none transition-colors appearance-none pr-10 cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#12192B] text-slate-400">
                      Sélectionnez votre secteur
                    </option>
                    {actualSectorOptions.map((opt) => (
                      <option key={opt.val} value={opt.val} className="bg-[#12192B] text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown size={16} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            {/* Robot d'intérêt */}
            <div className="space-y-1.5">
              <label
                htmlFor={modelInputId}
                className="block text-[10px] font-bold text-gray-300 tracking-widest uppercase font-mono"
              >
                Robot d'intérêt / Technologie <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <select
                  id={modelInputId}
                  name="model"
                  required
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full bg-[#12192B] border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 focus:outline-none transition-colors appearance-none pr-10 cursor-pointer"
                >
                  <option value="" disabled className="bg-[#12192B] text-slate-400">
                    Sélectionnez le type de robot
                  </option>
                  {actualRobotOptions.map((opt) => (
                    <option key={opt.val} value={opt.val} className="bg-[#12192B] text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown size={16} aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Détails du projet */}
            <div className="space-y-1.5">
              <label
                htmlFor={detailsInputId}
                className="block text-[10px] font-bold text-gray-300 tracking-widest uppercase font-mono"
              >
                Détails du projet
              </label>
              <textarea
                id={detailsInputId}
                name="details"
                rows={3}
                placeholder="Décrivez vos défis opérationnels ou flux à automatiser..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full bg-[#12192B] border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 focus:outline-none transition-colors resize-none placeholder:text-slate-500"
              />
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20 text-sm"
              >
                {isSubmitting ? (
                  <div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                    aria-label="Chargement..."
                  />
                ) : (
                  <>
                    <span>{ctaLabel}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="p-6 text-center flex flex-col items-center justify-center gap-4 bg-slate-900/40 border border-emerald-500/20 rounded-2xl"
          >
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 size={28} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white font-display">Demande enregistrée !</h3>
              <p className="text-slate-300 text-sm max-w-md font-light leading-relaxed">
                Un ingénieur Phoenix Robotics expert
                {selectedSectorLabel ? (
                  <>
                    {" "}du secteur <span className="font-semibold text-white">{selectedSectorLabel}</span>
                  </>
                ) : null}
                {" "}vous recontactera sous 48h.
              </p>
              {selectedRobotLabel && (
                <p className="text-slate-400 text-xs font-light">
                  Demande enregistrée pour la solution <span className="font-semibold text-slate-200">{selectedRobotLabel}</span>.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-2 text-xs text-orange-400 hover:text-orange-300 underline transition-colors cursor-pointer"
            >
              Nouvelle demande
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
