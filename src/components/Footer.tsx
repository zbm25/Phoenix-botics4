import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { IconRenderer } from "./IconRenderer";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../motion/variants";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const handleContactClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById("contact");
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <footer id="footer" className="w-full bg-slate-950 text-white rounded-t-[2.5rem] rounded-b-none mt-12 px-12 lg:px-24 pt-16 pb-12 text-left relative overflow-hidden">
      {/* Subtle background atmospheric glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-orange-500/5 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto relative z-10"
      >
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Column 1: Brand Info */}
          <motion.div variants={fadeUp} className="md:col-span-5 flex flex-col items-start">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <Logo iconSize={36} className="mb-5" />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-md mb-6">
              Phoenix‑Botics conçoit, déploie et maintient des flottes de robots de service et cobots collaboratifs pour le retail, l’hôtellerie, la santé et l’industrie en France.
            </p>
            
            <div className="flex gap-3 text-brand-muted">
              {["User", "ShieldCheck", "Settings", "Activity"].map((icon, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 p-3 rounded-full flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-500/30 transition-all">
                  <IconRenderer name={icon} size={15} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Gammes Robots */}
          <motion.div variants={fadeUp} className="md:col-span-3 flex flex-col gap-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
              Flotte & Gammes
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <Link
                to="/robots/uclean-series"
                onClick={() => window.scrollTo(0, 0)}
                className="text-slate-300 hover:text-orange-500 transition-colors text-left"
              >
                Gamme uClean
              </Link>
              <Link
                to="/robots/ulog-series"
                onClick={() => window.scrollTo(0, 0)}
                className="text-slate-300 hover:text-orange-500 transition-colors text-left"
              >
                Gamme uLog
              </Link>
              <Link
                to="/robots/userve-series"
                onClick={() => window.scrollTo(0, 0)}
                className="text-slate-300 hover:text-orange-500 transition-colors text-left"
              >
                Gamme uServe
              </Link>
            </div>
          </motion.div>

          {/* Column 3: Solutions & Méthodes */}
          <motion.div variants={fadeUp} className="md:col-span-2 flex flex-col gap-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
              Expertise
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <Link
                to="/services"
                onClick={() => window.scrollTo(0, 0)}
                className="text-slate-300 hover:text-orange-500 transition-colors text-left"
              >
                Services & Intégration
              </Link>
              <Link
                to="/technologie"
                onClick={() => window.scrollTo(0, 0)}
                className="text-slate-300 hover:text-orange-500 transition-colors text-left"
              >
                Technologie & Normes
              </Link>
              <Link
                to="/a-propos"
                onClick={() => window.scrollTo(0, 0)}
                className="text-slate-300 hover:text-orange-500 transition-colors text-left"
              >
                Notre Alliance
              </Link>
              <Link
                to="/#contact"
                onClick={handleContactClick}
                className="text-slate-300 hover:text-orange-500 transition-colors text-left"
              >
                Contact & Devis
              </Link>
            </div>
          </motion.div>

          {/* Column 4: Bureau Paris */}
          <motion.div variants={fadeUp} className="md:col-span-2 flex flex-col gap-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
              Bureau Paris
            </h4>
            <div className="text-xs text-slate-300 leading-relaxed font-light space-y-2">
              <p className="font-semibold text-white">Phoenix-Botics SAS</p>
              <p className="text-slate-400 font-mono text-[11px]">Avenue de la Grande Armée, 75017 Paris, France</p>
              <div className="inline-block bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-full px-3 py-1.5 text-[11px] font-medium mt-3 w-fit text-left">
                Intégration clé en main
              </div>
            </div>
          </motion.div>
        </div>

        {/* Legal Mentions and copyright bar */}
        <motion.div variants={fadeUp} className="border-t border-slate-800 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Phoenix‑Botics France. Tous droits réservés.</p>
          
          <div className="flex gap-6">
            <Link
              to="/a-propos#contact"
              className="hover:text-orange-500 transition-colors"
            >
              Mentions Légales
            </Link>
            <Link
              to="/a-propos#contact"
              className="hover:text-orange-500 transition-colors"
            >
              RGPD & Confidentialité
            </Link>
          </div>
        </motion.div>

      </motion.div>
    </footer>
  );
};
