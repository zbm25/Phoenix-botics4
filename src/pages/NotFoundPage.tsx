import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, Search, ShieldAlert } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { usePageMeta } from "../hooks/usePageMeta";

export const NotFoundPage: React.FC = () => {
  usePageMeta(
    "Page non trouvée - 404 | Phoenix-Botics",
    "La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil de Phoenix-Botics."
  );

  return (
    <div className="min-h-screen text-[#1a1a1a] bg-slate-50 font-sans relative overflow-x-hidden flex flex-col justify-between">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-500/10 via-purple-900/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header Container */}
      <div className="bg-[#0B1121] relative pt-24 sm:pt-28">
        <Header />
      </div>

      <main className="w-full my-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-orange-500/10 text-orange-500 mb-8 border border-orange-500/20">
            <ShieldAlert size={40} />
          </div>

          <span className="block text-orange-500 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
            Erreur 404 — Page non trouvée
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold font-display text-[#0B1121] tracking-tight mb-6">
            Oups ! Cette destination est introuvable.
          </h1>

          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto mb-10">
            La page que vous tentez de consulter n’existe pas, a été modifiée ou est temporairement indisponible.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-7 rounded-full transition-all shadow-lg shadow-orange-500/25 text-xs sm:text-sm"
            >
              <Home size={16} />
              <span>Retour à l'accueil</span>
            </Link>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold py-3.5 px-6 rounded-full transition-all text-xs sm:text-sm shadow-sm cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Page précédente</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
