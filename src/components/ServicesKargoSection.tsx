import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceCard {
  title: string;
  description: string;
  imageUrl: string;
  colSpan: string;
  height: string;
  anchor: string;
}

const KARGO_SERVICES: ServiceCard[] = [
  {
    title: "Vente & Intégration",
    description: "Des solutions personnalisées, installées et configurées directement sur votre site.",
    imageUrl: "https://res.cloudinary.com/df1x718yw/image/upload/v1783684834/ChatGPT_Image_10_juil._2026_13_49_37_zzk9ba.png",
    colSpan: "lg:col-span-7",
    height: "h-[380px]",
    anchor: "integration"
  },
  {
    title: "Location de robots (RaaS)",
    description: "Testez sans engagement, ajustez votre flotte selon vos besoins opérationnels et pics d'activité.",
    imageUrl: "https://res.cloudinary.com/df1x718yw/image/upload/v1783684835/ChatGPT_Image_10_juil._2026_13_20_41_h38epx.png",
    colSpan: "lg:col-span-5",
    height: "h-[380px]",
    anchor: "location"
  },
  {
    title: "Maintenance & Suivi",
    description: "Un accompagnement continu : hotline 24/7, mises à jour, réparations et optimisation des trajets.",
    imageUrl: "https://res.cloudinary.com/df1x718yw/image/upload/v1783684832/ChatGPT_Image_10_juil._2026_13_56_40_bm8sbx.png",
    colSpan: "lg:col-span-5",
    height: "h-[400px]",
    anchor: "maintenance"
  },
  {
    title: "Développements Spécifiques",
    description: "Nos ingénieurs conçoivent des modules et interfaces sur-mesure selon vos contraintes métiers.",
    imageUrl: "https://res.cloudinary.com/df1x718yw/image/upload/v1783684833/uClean_Compact_-_H%C3%B4pital_ay0pxa.png",
    colSpan: "lg:col-span-7",
    height: "h-[400px]",
    anchor: "sur-mesure"
  }
];

export const ServicesKargoSection: React.FC = () => {
  const navigate = useNavigate();

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleServiceClick = (anchor: string) => {
    navigate(`/services#${anchor}`);
  };

  return (
    <section 
      id="services" 
      className="bg-white py-24 border-b border-slate-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 text-left">
          <div>
            <span className="text-orange-500 font-mono font-bold tracking-widest uppercase text-xs px-3 py-1 bg-orange-500/5 border border-orange-500/10 rounded-full">
              Nos Services
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 mt-4 leading-tight">
              Une offre modulaire,
              <span className="block text-slate-400 font-normal mt-1">pensée pour s'adapter</span>
            </h2>
          </div>
          
          <button 
            onClick={handleScrollToContact}
            className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer shrink-0"
          >
            Nous contacter
          </button>
        </div>
 
        {/* Asymmetrical 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {KARGO_SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => handleServiceClick(service.anchor)}
              className={`${service.colSpan} ${service.height} relative overflow-hidden rounded-3xl w-full group cursor-pointer shadow-sm border border-slate-100`}
            >
              {/* Background Image with Zoom */}
              <img
                src={service.imageUrl}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />

              {/* Crucial Gradient Filter for Ultimate Legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/80" />

              {/* Positioned Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-left">
                {/* Top content */}
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {service.title}
                </h3>

                {/* Bottom content */}
                <div className="flex justify-between items-end gap-6">
                  <p className="text-sm text-slate-200/90 max-w-md leading-relaxed">
                    {service.description}
                  </p>

                  {/* Diagonal Arrow Icon with custom brand orange background */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-white shrink-0 shadow-lg group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
