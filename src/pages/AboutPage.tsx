import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  MapPin, 
  Phone, 
  Mail, 
  Award,
  Layers,
  Wrench,
  Clock,
  FileCheck2,
  Lock,
  ChevronRight
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { optimizeCloudinaryUrl } from "../data/robotSeries";
import { usePageMeta } from "../hooks/usePageMeta";

export const AboutPage: React.FC = () => {
  usePageMeta(
    "À Propos de Phoenix-Botics | Alliance Européenne United Robotics Group",
    "L'alliance stratégique entre la R&D d'United Robotics Group et l'expertise terrain de Phoenix-Botics, intégrateur de proximité pour les entreprises françaises."
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    sector: "industry",
    subject: "partenariat",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleScrollToSegment = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        sector: "industry",
        subject: "partenariat",
        message: ""
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen text-[#1a1a1a] bg-slate-50 font-sans relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-500/10 via-purple-900/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header Container */}
      <div className="bg-[#0B1121] relative pt-24 sm:pt-28">
        <Header />
      </div>

      <main className="w-full">
        {/* =========================================================================
            1. HERO INDUSTRIEL INCARNÉ AVEC PHOTOGRAPHIE TERRAIN
           ========================================================================= */}
        <section className="py-24 lg:py-32 bg-[#0B1121] text-white border-b border-slate-800/80 relative overflow-hidden">
          {/* Arrière-plan photographique cobotique industrielle */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src={optimizeCloudinaryUrl("https://res.cloudinary.com/df1x718yw/image/upload/v1788866233/ChatGPT_Image_8_sept._2026_11_48_19_kvssfw.png", 1920)} 
              alt="Ingénierie cobotique et supervision industrielle" 
              className="w-full h-full object-cover object-center opacity-45"
              loading="eager"
              fetchPriority="high"
            />
            {/* Dégradé asymétrique profond pour lisibilité AAA */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1121] via-[#0B1121]/90 to-[#0B1121]/60" />
            <div className="absolute inset-0 bg-[#0B1121]/40 backdrop-blur-[1px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 mb-6 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-400 font-mono text-xs tracking-widest uppercase font-bold">
                ALLIANCE UNITED ROBOTICS GROUP × PHOENIX-BOTICS
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-[1.15] max-w-4xl mx-auto mb-6"
            >
              L'excellence robotique européenne, <br />
              <span className="text-orange-500 font-light">dédiée au marché français.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 font-light max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Adossée à la puissance technologique pionnière d'United Robotics Group, Phoenix-Botics opère comme intégrateur d'ingénierie et de proximité pour déployer, superviser et maintenir vos cobots mobiles sur le territoire national.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <button
                type="button"
                onClick={() => handleScrollToSegment("alliance")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-lg shadow-orange-500/25 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Découvrir notre écosystème</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleScrollToSegment("contact")}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold py-3.5 px-7 rounded-full transition-all text-xs sm:text-sm backdrop-blur-sm cursor-pointer"
              >
                Échanger avec la Direction
              </button>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            2. SECTION STORYTELLING : LES DEUX FORCES DE L'ALLIANCE
           ========================================================================= */}
        <section id="alliance" className="py-24 bg-white border-b border-gray-200/60 relative z-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-3 block">
                - LE MODÈLE D'ALLIANCE -
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold font-display tracking-tight text-[#0a0f1c] leading-tight">
                La puissance d'un géant européen, <br />
                <span className="text-gray-400 font-light">l'agilité d'un pôle d'ingénierie français.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Volet 1 : United Robotics Group */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7 }}
                className="bg-[#faf8f5] border border-gray-200/80 rounded-3xl p-8 sm:p-10 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-orange-600 font-mono text-xs font-bold uppercase tracking-wider">
                      FORCE 01. SOCLE MATÉRIEL & R&D
                    </span>
                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-mono font-semibold">
                      Envergure Européenne
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-[#0a0f1c] mb-4">
                    United Robotics Group (URG)
                  </h3>
                  <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed mb-6">
                    Pionnier européen de la cobotique de service et de l'intralogistique industrielle, United Robotics Group conçoit des plateformes autonomes de classe mondiale (uClean, uLog, Plato). Ce socle garantit :
                  </p>
                  <ul className="space-y-3 text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="text-orange-500 shrink-0 mt-0.5" />
                      <span>Des millions d'heures d'opération éprouvées en conditions réelles</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="text-orange-500 shrink-0 mt-0.5" />
                      <span>Conception mécatronique certifiée aux normes CE et ISO 3691-4</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="text-orange-500 shrink-0 mt-0.5" />
                      <span>Capacité d'approvisionnement et puissance d'innovation continue</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>MATURITÉ MATÉRIELLE</span>
                  <span className="font-bold text-slate-900">PLATEFORMES CERTIFIÉES</span>
                </div>
              </motion.div>

              {/* Volet 2 : Phoenix-Botics */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="bg-[#0B1121] text-white border border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between text-left shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
                      FORCE 02. INTÉGRATION TERRAIN & APPLICATION
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-mono font-semibold">
                      Marché Français
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white mb-4">
                    Phoenix-Botics France
                  </h3>
                  <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed mb-6">
                    L'automatisation réussie dépend de la réalité du terrain. Nos ingénieurs d'application basés en France assurent le déploiement sur-mesure au contact direct de vos équipes :
                  </p>
                  <ul className="space-y-3 text-sm text-slate-300 font-light">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="text-orange-400 shrink-0 mt-0.5" />
                      <span><strong className="text-white font-medium">Interfaçage bâtimentaire :</strong> Commandes sans fil ascenseurs & sas industriels</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="text-orange-400 shrink-0 mt-0.5" />
                      <span><strong className="text-white font-medium">Connexion IT/OT :</strong> APIs directes avec vos logiciels métiers (WMS, ERP, MES)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="text-orange-400 shrink-0 mt-0.5" />
                      <span><strong className="text-white font-medium">Support & MCO dédié :</strong> Techniciens sur site sous 48h sans sous-traitance</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>MAINTENANCE OPÉRATIONNELLE</span>
                  <span className="font-bold text-orange-400">INGÉNIERIE SANS INTERMÉDIAIRE</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. BENTO GRID : RÉASSURANCE TERRITORIALE & CONFORMITÉ
           ========================================================================= */}
        <section className="py-24 bg-[#faf8f5] border-b border-gray-200/60 relative z-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-3 block">
                - ENGAGEMENTS CONTRACTUELS -
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold font-display tracking-tight text-[#0a0f1c] leading-tight">
                Une présence territoriale concrète, <br />
                <span className="text-gray-400 font-light">sans rupture de chaîne logistique.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6 text-left">
              
              {/* Carte Bento 1 : Réactivité SAV (4 cols) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-4 bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
                    <Clock size={22} />
                  </div>
                  <span className="text-3xl font-black font-display text-slate-900 block mb-2">&lt; 48h</span>
                  <h3 className="text-lg font-bold text-[#0a0f1c] mb-2">Intervention sur site garantie</h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                    Nos techniciens certifiés interviennent directement dans vos usines et entrepôts pour toute opération de maintenance corrective ou de reconfiguration.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 mt-6 text-[11px] font-mono text-orange-600 font-semibold">
                  SLA CONTRACTUEL DÉFINI
                </div>
              </motion.div>

              {/* Carte Bento 2 : Atelier & Stock Francilien (4 cols) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-4 bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
                    <Wrench size={22} />
                  </div>
                  <span className="text-3xl font-black font-display text-slate-900 block mb-2">Stock Paris</span>
                  <h3 className="text-lg font-bold text-[#0a0f1c] mb-2">Pièces détachées en France</h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                    Atelier central et stock tampon situés en Île-de-France. Zéro attente liée à des expéditions internationales sur les pièces d'usure ou d'urgence.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 mt-6 text-[11px] font-mono text-orange-600 font-semibold">
                  DISPONIBILITÉ IMMÉDIATE
                </div>
              </motion.div>

              {/* Carte Bento 3 : Souveraineté & RGPD (4 cols) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-4 bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                    <Lock size={22} />
                  </div>
                  <span className="text-3xl font-black font-display text-slate-900 block mb-2">100% RGPD</span>
                  <h3 className="text-lg font-bold text-[#0a0f1c] mb-2">Circuits de données étanches</h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                    Calculs SLAM embarqués localement. Aucun transfert de flux vidéo hors de France. Hébergement des logs de supervision sur serveurs souverains.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 mt-6 text-[11px] font-mono text-emerald-600 font-semibold">
                  CONFORMITÉ DSI VALIDÉE
                </div>
              </motion.div>

              {/* Carte Bento 4 : Taux de disponibilité et bancs de tests (12 cols) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-12 bg-[#0B1121] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-8"
              >
                <div className="text-left max-w-2xl">
                  <span className="text-orange-400 font-mono text-xs font-bold uppercase tracking-widest block mb-2">
                    // FIABILITÉ DES FLUX OPÉRATIONNELS
                  </span>
                  <h3 className="text-2xl font-bold font-display text-white mb-2">
                    99,4% de disponibilité opérationnelle constatée
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                    Avant chaque livraison client, chaque robot est soumis à une batterie d'essais sur nos bancs de charge en Île-de-France (cartographie simulée, endurance batteries, tests d'arrêts d'urgence certifiés).
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 shrink-0">
                  <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="text-xl font-bold font-mono text-orange-400 block">ISO 3691-4</span>
                    <span className="text-[10px] text-slate-400 font-mono">Sécurité AMR</span>
                  </div>
                  <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="text-xl font-bold font-mono text-emerald-400 block">CE Directives</span>
                    <span className="text-[10px] text-slate-400 font-mono">Machines 2006/42</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            4. SECTEURS & PREUVES D'IMPACT OPÉRATIONNEL
           ========================================================================= */}
        <section className="py-24 bg-white border-b border-gray-200/60 relative z-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-3 block">
                - RETOURS D'EXPÉRIENCE TERRAIN -
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold font-display tracking-tight text-[#0a0f1c] leading-tight">
                Des déploiements mesurables <br />
                <span className="text-gray-400 font-light">au cœur des flux critiques français.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              
              {/* Cas 1 : Logistique */}
              <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-7 border border-gray-200/80 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-wider block mb-2">
                    INTRALOGISTIQUE & SUPPLY CHAIN
                  </span>
                  <h3 className="text-lg font-bold text-[#0a0f1c] mb-2">Hubs & Entrepôts 3PL</h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-light mb-4">
                    Automatisation des transferts de palettes et caisses lourdes sans arrêt de chaîne en 3x8.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs font-bold text-slate-900 font-mono">+600 kg par navette</p>
                  <p className="text-[10px] text-slate-500 font-light">Flotte uLog Lift & Deliver déployée</p>
                </div>
              </div>

              {/* Cas 2 : Santé */}
              <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-7 border border-gray-200/80 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-wider block mb-2">
                    SANTÉ & SECTEUR HOSPITALIER
                  </span>
                  <h3 className="text-lg font-bold text-[#0a0f1c] mb-2">Groupes Hospitaliers & EHPAD</h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-light mb-4">
                    Distribution de repas, transfert de pharmacie stérile et hygiène continue des zones d'accueil.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs font-bold text-slate-900 font-mono">Franchissement d'étages IoT</p>
                  <p className="text-[10px] text-slate-500 font-light">Flottes uLog 80 & uClean Compact</p>
                </div>
              </div>

              {/* Cas 3 : Industrie */}
              <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-7 border border-gray-200/80 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-wider block mb-2">
                    INDUSTRIE MANUFACTURIÈRE
                  </span>
                  <h3 className="text-lg font-bold text-[#0a0f1c] mb-2">Usines d'Assemblage</h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-light mb-4">
                    Approvisionnement Just-In-Time en bord de ligne et coactivité sécurisée avec caristes.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs font-bold text-slate-900 font-mono">Zéro modification de sol</p>
                  <p className="text-[10px] text-slate-500 font-light">Navigation LiDAR 3D dynamique</p>
                </div>
              </div>

              {/* Cas 4 : Retail */}
              <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-7 border border-gray-200/80 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-wider block mb-2">
                    RETAIL & ERP GRANDS VOLUMES
                  </span>
                  <h3 className="text-lg font-bold text-[#0a0f1c] mb-2">Grandes Surfaces & Gares</h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-light mb-4">
                    Nettoyage standardisé certifié de nuit et guidage des visiteurs en journée sans gêne sonore.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs font-bold text-slate-900 font-mono">Jusqu'à 3 000 m²/h</p>
                  <p className="text-[10px] text-slate-500 font-light">Flottes uClean Scrub & uServe</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            5. FORMULAIRE DIRECTION & PROJETS D'AUTOMATISATION
           ========================================================================= */}
        <section id="contact" className="py-20 sm:py-28 bg-slate-50 relative z-20 overflow-hidden scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0B1121] rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-14 border border-slate-800 shadow-[0_20px_60px_rgba(11,17,33,0.35)] relative overflow-hidden text-white"
            >
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start relative z-10">
                {/* Colonne Gauche : Échange Exécutif */}
                <div className="lg:col-span-5 flex flex-col justify-between text-left h-full">
                  <div>
                    <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
                      CONTACT INSTITUTIONNEL & DIRECTION
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight mb-4">
                      Échangez avec nos <br />
                      <span className="text-orange-500">responsables d'ingénierie.</span>
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                      Vous envisagez l'intégration d'une flotte cobotique ou souhaitez visiter nos bancs de test en Île-de-France ? Nos directeurs d'application vous répondent sous 24h ouvrées.
                    </p>
                  </div>

                  <div className="space-y-4 border-t border-slate-800/80 pt-6 mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
                        <Phone size={17} />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">LIGNE DIRECTE DIRECTION</p>
                        <p className="text-sm font-mono text-white font-bold">+33 (0)1 45 42 09 00</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
                        <Mail size={17} />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">PÔLE GRANDS COMPTES</p>
                        <p className="text-sm font-mono text-white font-medium">contact@phoenix-botics.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
                        <MapPin size={17} />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">SIÈGE SOCIAL & LAB</p>
                        <p className="text-sm text-slate-300 font-medium">Avenue de la Grande Armée, 75017 Paris</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colonne Droite : Formulaire */}
                <div className="lg:col-span-7">
                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="about-contact-name" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                              Nom & Prénom <span className="text-orange-500">*</span>
                            </label>
                            <input
                              id="about-contact-name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Jean Dupont"
                              className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs placeholder-slate-500 outline-none transition-all"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="about-contact-email" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                              Email Professionnel <span className="text-orange-500">*</span>
                            </label>
                            <input
                              id="about-contact-email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="j.dupont@entreprise.fr"
                              className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs placeholder-slate-500 outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="about-contact-company" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                              Entreprise / Groupe <span className="text-orange-500">*</span>
                            </label>
                            <input
                              id="about-contact-company"
                              name="company"
                              type="text"
                              required
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="Nom de l'entité"
                              className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs placeholder-slate-500 outline-none transition-all"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="about-contact-sector" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                              Secteur d'Activité <span className="text-orange-500">*</span>
                            </label>
                            <select
                              id="about-contact-sector"
                              name="sector"
                              value={formData.sector}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs outline-none transition-all cursor-pointer appearance-none"
                            >
                              <option value="industry">Logistique & Industrie</option>
                              <option value="health">Santé & Secteur Hospitalier</option>
                              <option value="retail">Commerce & Grande Distribution</option>
                              <option value="hospitality">Hôtellerie & Restauration</option>
                              <option value="other">Autre secteur</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="about-contact-subject" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                            Objet de votre démarche <span className="text-orange-500">*</span>
                          </label>
                          <select
                            id="about-contact-subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs outline-none transition-all cursor-pointer appearance-none"
                          >
                            <option value="partenariat">Projet de déploiement multi-sites / Flotte</option>
                            <option value="lab">Visite du Showroom & Bancs de test (Paris)</option>
                            <option value="direction">Échange exécutif avec la Direction</option>
                            <option value="presse">Demande d'information institutionnelle</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="about-contact-message" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                            Détails de votre projet (Sous accord de confidentialité)
                          </label>
                          <textarea
                            id="about-contact-message"
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Enjeux d'automatisation, contraintes opérationnelles ou calendrier envisagé..."
                            className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs placeholder-slate-500 outline-none transition-all resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/25 cursor-pointer flex items-center justify-center gap-2 border-none mt-2"
                        >
                          <span>{isSubmitting ? "Envoi en cours..." : "Contacter nos ingénieurs d'application"}</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </button>
                      </form>
                    ) : (
                      <div className="text-center py-12 space-y-4 flex flex-col justify-center items-center">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <CheckCircle2 size={28} />
                        </div>
                        <h3 className="text-xl font-display font-bold text-white">Demande reçue avec succès !</h3>
                        <p className="text-slate-400 text-xs max-w-sm font-light leading-relaxed">
                          Votre dossier a été transmis à la Direction des Opérations. Un responsable d'ingénierie prendra contact sous 24h ouvrées.
                        </p>
                        <button
                          type="button"
                          onClick={() => setFormSubmitted(false)}
                          className="px-5 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer mt-2"
                        >
                          Envoyer un autre message
                        </button>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
