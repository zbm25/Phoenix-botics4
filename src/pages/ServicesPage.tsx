import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ClipboardCheck, 
  CalendarDays, 
  Wrench, 
  Cpu, 
  Users,
  Layers,
  Check, 
  ArrowRight, 
  Plus, 
  Minus,
  Settings,
  ShieldCheck,
  Zap,
  Activity
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { fadeUp, staggerContainer } from "../motion/variants";
import { usePageMeta } from "../hooks/usePageMeta";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200/80 py-5 group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left gap-4 font-semibold text-slate-900 hover:text-orange-600 transition-colors py-2"
      >
        <span className="text-base sm:text-lg tracking-tight">{question}</span>
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-orange-50 transition-colors">
          {isOpen ? (
            <Minus className="w-4 h-4 text-slate-600 group-hover:text-orange-600" />
          ) : (
            <Plus className="w-4 h-4 text-slate-600 group-hover:text-orange-600" />
          )}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-slate-500 font-light mt-3 leading-relaxed text-sm sm:text-base max-w-4xl pb-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ServicesPage: React.FC = () => {
  usePageMeta(
    "Services & Déploiement Robotique | Audit, Test Terrain & Support",
    "De l'audit d'implantation sur site à la supervision 24/7 : découvrez l'accompagnement clé en main Phoenix-Botics pour rentabiliser votre investissement cobotique."
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    sector: "industry",
    serviceType: "audit",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
        serviceType: "audit",
        message: ""
      });
    }, 1200);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-33% 0px -33% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setActiveIdx(index);
          }
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 120;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
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
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else {
      window.location.assign(`/#${id}`);
    }
  };

  const editorialServices = [
    {
      id: "integration",
      title: "Étude, intégration & déploiement",
      subtitle: "Une solution robotique configurée autour de vos flux, de vos contraintes de site et de vos objectifs opérationnels.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1783684834/ChatGPT_Image_10_juil._2026_13_49_37_zzk9ba.png",
      benefits: [
        "Analyse des flux, zones, surfaces et contraintes d’exploitation",
        "Recommandation de configuration et plan d’implantation",
        "Mise en service et accompagnement des équipes sur site"
      ]
    },
    {
      id: "location",
      title: "Location, test terrain & démonstration",
      subtitle: "Évaluez une solution en conditions réelles avant un déploiement plus large, ou répondez à un besoin ponctuel d’exploitation.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1783684835/ChatGPT_Image_10_juil._2026_13_20_41_h38epx.png",
      benefits: [
        "Définition du périmètre d’usage et des objectifs du test",
        "Mise en service de la solution sur votre site",
        "Bilan d’usage pour éclairer votre décision"
      ]
    },
    {
      id: "maintenance",
      title: "Supervision, maintenance & optimisation",
      subtitle: "Un suivi opérationnel pour maintenir la disponibilité de votre flotte et améliorer son utilisation dans la durée.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1783684832/ChatGPT_Image_10_juil._2026_13_56_40_bm8sbx.png",
      benefits: [
        "Suivi de disponibilité et assistance technique selon contrat",
        "Maintenance préventive planifiée et mises à jour logicielles",
        "Recommandations d’optimisation à partir des usages observés"
      ]
    },
    {
      id: "sur-mesure",
      title: "Intégration sur mesure & interopérabilité",
      subtitle: "Lorsque vos flux exigent une configuration particulière, nous étudions les connexions logicielles et adaptations nécessaires à votre environnement.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1783684833/uClean_Compact_-_H%C3%B4pital_ay0pxa.png",
      benefits: [
        "Étude de faisabilité de vos besoins spécifiques",
        "Intégration API, ERP ou WMS selon votre environnement",
        "Adaptation d’interfaces et de scénarios d’exploitation"
      ]
    }
  ];

  return (
    <div className="min-h-screen text-[color:var(--color-text-main)] relative bg-slate-50">
      {/* Sleek Interface Ambient Background Bulbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-900/10 via-orange-600/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="bg-slate-950 relative pt-24 sm:pt-28 pb-12 lg:pb-16">
        <Header />
        
        {/* New Hero Section */}
        <section 
          id="hero" 
          className="relative mx-4 sm:mx-6 rounded-[2rem] overflow-hidden min-h-[62vh] sm:min-h-[68vh] md:min-h-[72vh] flex items-center bg-slate-950 shadow-2xl animate-none"
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <img
              src="https://res.cloudinary.com/df1x718yw/image/upload/v1788439746/ChatGPT_Image_3_sept._2026_14_47_24_khevxq.png"
              alt="Ingénieurs et responsable de site supervisant l'intégration d'un robot mobile"
              className="w-full h-full object-cover object-right"
              loading="eager"
              fetchPriority="high"
            />
            {/* Overlay pour la lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/65 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[62vh] sm:min-h-[68vh] md:min-h-[72vh] flex items-center">
            {/* Text Container aligned bottom-left or center-left */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full max-w-xl lg:max-w-[48%] pl-8 sm:pl-12 lg:pl-16 py-16 md:py-24 flex flex-col items-start text-left"
            >
              {/* Badge */}
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 mb-6 border border-white/20">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400/60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.18em] uppercase text-orange-400">
                    SERVICES & INTÉGRATION
                  </span>
                </div>
              </motion.div>

              {/* H1 Title */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-display tracking-tight"
              >
                Vos robots, intégrés et suivis de bout en bout.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl text-white/90 font-light mt-5 max-w-2xl leading-relaxed"
              >
                Audit de site, déploiement, formation et maintenance : Phoenix-Botics vous accompagne à chaque étape.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-8">
                <button
                  id="hero-contact-btn"
                  onClick={() => handleScrollToSegment("contact")}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm md:text-base px-6 py-3 rounded-full transition-colors duration-200 cursor-pointer flex items-center justify-center animate-none"
                >
                  Échanger sur mon projet
                </button>
                
                <button
                  id="hero-discover-btn"
                  onClick={() => handleScrollToSegment("accompagnement-360")}
                  className="bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold text-sm md:text-base px-6 py-3 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center backdrop-blur-sm"
                >
                  Découvrir nos services
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Section Pourquoi Phoenix-Botics ? */}
      <section className="bg-[#faf8f5] py-24 border-b border-gray-200/60 overflow-hidden relative z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-4 block">
              - POURQUOI CHOISIR PHOENIX-BOTICS -
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold font-display tracking-tight text-[#0a0f1c] leading-tight">
              Une approche modulaire et humaine
              <span className="block mt-1 text-gray-400 font-light">
                pour pérenniser votre performance opérationnelle.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Pilier 01 */}
            <div className="border-t border-gray-300 pt-7 text-left">
              <span className="text-orange-500 font-mono text-xs tracking-widest uppercase font-bold mb-4 block">
                PILIER 01.
              </span>
              <h3 className="text-xl font-bold text-[#0a0f1c] mb-3">
                Expertise technique
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                Ingénieurs spécialisés en robotique mobile autonome, navigation SLAM et interfaçage WMS/ERP. Nous parlons votre langage opérationnel.
              </p>
            </div>

            {/* Pilier 02 */}
            <div className="border-t border-gray-300 pt-7 text-left">
              <span className="text-orange-500 font-mono text-xs tracking-widest uppercase font-bold mb-4 block">
                PILIER 02.
              </span>
              <h3 className="text-xl font-bold text-[#0a0f1c] mb-3">
                Accompagnement humain
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                De l'audit in situ à la formation pratique : nos cobots sont pensés pour assister et valoriser vos équipes sans friction.
              </p>
            </div>

            {/* Pilier 03 */}
            <div className="border-t border-gray-300 pt-7 text-left">
              <span className="text-orange-500 font-mono text-xs tracking-widest uppercase font-bold mb-4 block">
                PILIER 03.
              </span>
              <h3 className="text-xl font-bold text-[#0a0f1c] mb-3">
                Offre modulaire
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                Vente, location flexible, POC ou déploiement par étapes : choisissez le niveau d'engagement adapté à votre calendrier.
              </p>
            </div>

            {/* Pilier 04 */}
            <div className="border-t border-gray-300 pt-7 text-left">
              <span className="text-orange-500 font-mono text-xs tracking-widest uppercase font-bold mb-4 block">
                PILIER 04.
              </span>
              <h3 className="text-xl font-bold text-[#0a0f1c] mb-3">
                Partenaire de confiance
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                Flottes suivies en télémétrie, maintenance préventive et support réactif : nous sécurisons votre investissement au quotidien.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button 
              type="button" 
              onClick={() => handleScrollToSegment("contact")} 
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold py-3.5 px-8 rounded-full shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
            >
              <span>Échanger avec un ingénieur d'application</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Scroll Section (Cinematic Dark Split-Screen) */}
      <section id="accompagnement-360" className="relative w-full bg-slate-950 text-white scroll-mt-20">
        
        {/* Sticky background images with cross-fade (lg only) */}
        <div className="hidden lg:block sticky top-0 left-0 w-full h-screen overflow-hidden z-0 pointer-events-none">
          {editorialServices.map((service, idx) => (
            <div
              key={service.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                activeIdx === idx ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          {/* Linear gradient overlay from left (dark) to right (transparent) */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* COLONNE DE GAUCHE (FIXE & ANCRÉE - col-span-5 sur desktop) */}
            <div className="lg:col-span-5 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-16 lg:py-0">
              <span className="text-orange-500 font-mono text-xs font-bold tracking-widest uppercase mb-4 block">
                ACCOMPAGNEMENT 360°
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mt-4 leading-tight font-display max-w-lg">
                Une offre qui évolue au rythme de vos ambitions.
              </h2>
            </div>

            {/* COLONNE DE DROITE (DÉFILANTE - col-span-7 sur desktop) */}
            <div className="lg:col-span-7 flex flex-col gap-[30vh] lg:gap-[40vh] pt-12 lg:pt-[25vh] pb-24 lg:pb-[45vh]">
              {editorialServices.map((service, idx) => (
                <div
                  key={service.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  id={service.id}
                  className="bg-slate-950/75 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 lg:p-12 shadow-2xl transition-all duration-300 hover:border-orange-500/30 scroll-mt-32"
                >
                  {/* Titre du service */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-slate-300 mb-6 font-light leading-relaxed">
                    {service.subtitle}
                  </p>

                  {/* Image dynamically shown on mobile inside the flow */}
                  <div className="block lg:hidden my-6 aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-slate-800">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Liste des bénéfices */}
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <span className="text-orange-500 bg-orange-500/10 p-1 rounded-full shrink-0 mt-0.5">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </span>
                        <span className="text-slate-200 text-sm font-medium leading-normal">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* White/light background for FAQ & CTA at the bottom */}
      <div className="relative z-20 bg-slate-50 border-t border-slate-200/50">
        {/* Section FAQ (Accordéons) */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-xs font-semibold tracking-widest text-orange-500 uppercase flex items-center justify-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                FAQ DE SERVICE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Questions fréquentes
              </h2>
              <p className="text-slate-500 font-light mt-4 max-w-xl mx-auto">
                Tout ce que vous devez savoir sur notre méthodologie d'implantation et nos garanties de support.
              </p>
            </div>

            <div className="space-y-1 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/60 shadow-sm">
              <FAQItem 
                question="Vos robots sont-ils compatibles avec tous les environnements ?"
                answer="Nos robots de la gamme Phoenix sont conçus pour s'adapter à une large diversité de sols lisses et intérieurs (hôtels, restaurants, entrepôts, cliniques). Grâce à leur navigation LiDAR 3D de pointe, ils évitent les obstacles dynamiques de manière autonome, gèrent les ascenseurs compatibles et cohabitent en toute sécurité avec les équipes et le public."
              />
              <FAQItem 
                question="Que se passe-t-il en cas de panne ou besoin de SAV ?"
                answer="Nous assurons un support technique et un suivi opérationnel continu. La plupart des ajustements ou diagnostics s'effectuent à distance par télémaintenance. Si nécessaire, un technicien Phoenix intervient sur site pour les réparations matérielles afin de limiter au maximum l'impact sur vos opérations."
              />
              <FAQItem 
                question="Proposez-vous des démonstrations ou phases de test ?"
                answer="Absolument. Avant tout déploiement définitif, nous pouvons réaliser un mapping complet et une démonstration de faisabilité en conditions réelles sur votre site. Cela vous permet d'évaluer concrètement l'intégration des flux et de valider les gains de productivité projetés."
              />
              <FAQItem 
                question="Comment se passe l'intégration avec nos logiciels existants (ERP/WMS) ?"
                answer="Notre équipe d'ingénieurs dispose d'une API moderne et de connecteurs pré-intégrés pour s'interfacer avec vos systèmes de gestion (WMS, ERP, ou messagerie de service). Nous automatisons le déclenchement des missions de transport et le retour d'état en temps réel pour une visibilité totale."
              />
              <FAQItem 
                question="Quelle est la durée de vie des batteries et leur autonomie ?"
                answer="Nos robots utilisent des batteries lithium-fer-phosphate (LFP) haute performance offrant une autonomie en fonctionnement continu allant de 8 à 12 heures selon le modèle. Ils retournent automatiquement à leur station de charge rapide intelligente dès que leur niveau d'énergie est faible."
              />
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION B2B CONTACT FORM — ÉTUDE & SERVICES PHOENIX
           ========================================================================= */}
        <section id="contact" className="py-20 sm:py-28 bg-slate-50 relative z-20 border-t border-slate-200/60 overflow-hidden scroll-mt-20">
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
                {/* Colonne Gauche : Coordonnées & Réassurance */}
                <div className="lg:col-span-5 flex flex-col justify-between text-left h-full">
                  <div>
                    <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
                      PRENDRE CONTACT
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight mb-4">
                      Parlons de vos flux et <br />
                      <span className="text-orange-500">de votre projet.</span>
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                      Nos ingénieurs d'application analysent vos contraintes de site sous 48h pour concevoir un plan de déploiement sur-mesure. Sans engagement.
                    </p>
                  </div>

                  <div className="space-y-4 border-t border-slate-800/80 pt-6 mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
                        <Zap size={17} />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">LIGNE DIRECTE</p>
                        <p className="text-sm font-mono text-white font-bold">+33 (0)1 45 42 09 00</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
                        <ShieldCheck size={17} />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">EMAIL PROFESSIONNEL</p>
                        <p className="text-sm font-mono text-white font-medium">contact@phoenix-botics.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
                        <Activity size={17} />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">SIÈGE SOCIAL</p>
                        <p className="text-sm text-slate-300 font-medium">Avenue de la Grande Armée, 75017 Paris, France</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colonne Droite : Formulaire B2B de Service */}
                <div className="lg:col-span-7">
                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="service-contact-name" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                              Nom & Prénom <span className="text-orange-500">*</span>
                            </label>
                            <input
                              id="service-contact-name"
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
                            <label htmlFor="service-contact-email" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                              Email Professionnel <span className="text-orange-500">*</span>
                            </label>
                            <input
                              id="service-contact-email"
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
                            <label htmlFor="service-contact-company" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                              Entreprise <span className="text-orange-500">*</span>
                            </label>
                            <input
                              id="service-contact-company"
                              name="company"
                              type="text"
                              required
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="Nom de votre établissement"
                              className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs placeholder-slate-500 outline-none transition-all"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="service-contact-sector" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                              Secteur d'Activité <span className="text-orange-500">*</span>
                            </label>
                            <select
                              id="service-contact-sector"
                              name="sector"
                              value={formData.sector}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs outline-none transition-all cursor-pointer appearance-none"
                            >
                              <option value="industry">Logistique & Industrie</option>
                              <option value="health">Santé & Médical (Cliniques, EHPAD)</option>
                              <option value="retail">Retail & Grande Distribution</option>
                              <option value="hospitality">Hôtellerie & Restauration</option>
                              <option value="other">Autre secteur</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="service-contact-type" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                            Projet / Service Souhaité <span className="text-orange-500">*</span>
                          </label>
                          <select
                            id="service-contact-type"
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs outline-none transition-all cursor-pointer appearance-none"
                          >
                            <option value="audit">Audit de flux & Étude d'implantation in situ</option>
                            <option value="integration">Vente & Intégration clé en main de flotte</option>
                            <option value="location">Location flexible & Test en conditions réelles (POC)</option>
                            <option value="maintenance">Contrat de maintenance, supervision & MCO</option>
                            <option value="sur-mesure">Développement sur-mesure & Interfaçage WMS/ERP</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="service-contact-message" className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                            Détails du projet / Besoins opérationnels
                          </label>
                          <textarea
                            id="service-contact-message"
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Décrivez vos flux actuels, les superficies ou les tâches à automatiser..."
                            className="w-full px-4 py-3 bg-[#070B14] border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 rounded-xl text-white text-xs placeholder-slate-500 outline-none transition-all resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/25 cursor-pointer flex items-center justify-center gap-2 border-none mt-2"
                        >
                          <span>{isSubmitting ? "Transmission en cours..." : "Demander mon étude personnalisée"}</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </button>
                      </form>
                    ) : (
                      <div className="text-center py-12 space-y-4 flex flex-col justify-center items-center">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <ShieldCheck size={28} />
                        </div>
                        <h3 className="text-xl font-display font-bold text-white">Demande transmise avec succès !</h3>
                        <p className="text-slate-400 text-xs max-w-sm font-light leading-relaxed">
                          Un ingénieur d'application Phoenix-Botics étudiera vos besoins et prendra contact sous 48h.
                        </p>
                        <button
                          type="button"
                          onClick={() => setFormSubmitted(false)}
                          className="px-5 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer mt-2"
                        >
                          Envoyer une autre demande
                        </button>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};
