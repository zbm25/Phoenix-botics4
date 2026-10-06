import React, { useState, useRef, useEffect } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { 
  Shield, 
  Zap, 
  Cpu, 
  Layers,
  ShoppingBag,
  Bell,
  Utensils,
  Truck,
  ShieldCheck
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FleetCarousel, FleetCarouselItem, FleetCarouselTab } from "../components/FleetCarousel";
import { ContactForm } from "../components/ContactForm";
import { PrequalificationFlow } from "../components/qualification/PrequalificationFlow";
import { MappedContactQualification } from "../lib/qualification/mapQualificationToContact";
import { motion, useInView, useMotionValue, animate } from "motion/react";
import { 
  getRobotById,
  optimizeCloudinaryUrl,
  RobotModelData
} from "../data/robotSeries";

interface AnimatedNumberProps {
  value: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const motionValue = useMotionValue(0);

  const match = value.match(/^([+-xX]*)(\d+(?:\.\d+)?)(.*)$/);

  useEffect(() => {
    if (isInView && match) {
      const target = parseFloat(match[2]);
      const controls = animate(motionValue, target, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            const isFloat = match[2].includes(".");
            const formatted = isFloat ? latest.toFixed(1) : Math.round(latest).toString();
            ref.current.textContent = `${match[1]}${formatted}${match[3]}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  if (!match) {
    return <span>{value}</span>;
  }

  return <span ref={ref}>{match[1]}0{match[3]}</span>;
};

interface IndustrySectorConfig {
  sectorKey: string;
  heroHeading: React.ReactNode;
  heroDescription: string;
  heroImage: string;
  defisTitleLine1: string;
  defisTitleLine2: string;
  challenges: Array<{ title: string; desc: string }>;
  kpis: Array<{ stat: string; suffix: string; label: string; desc: string }>;
  beneficesTitleLine1: string;
  beneficesTitleLine2: string;
  benefits: Array<{ id: string; title: string; desc: string }>;
  usageSectionTitle: string;
  usageItems: Array<{ id: string; icon: React.ElementType; title: string; desc: string; image: string }>;
  techTitleLine1: string;
  techTitleLine2: string;
  techFeatures: Array<{ icon: React.ElementType; title: string; desc: string }>;
  robotsSubtitle: string;
  robotList: RobotModelData[];
  contactEmailPlaceholder: string;
  contactSectorDefault: string;
  contactSectorOptions: Array<{ val: string; label: string }>;
  contactRobotOptions: Array<{ val: string; label: string }>;
}

const hospitalityConfig: IndustrySectorConfig = {
  sectorKey: "hospitality",
  heroHeading: (
    <>
      L'excellence du service, <br />
      par la <span className="text-orange-500">robotique.</span>
    </>
  ),
  heroDescription: "Rationalisez votre logistique, du débarrassage en salle au room-service. Libérez vos équipes pour offrir une expérience client mémorable.",
  heroImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1784567142/ChatGPT_Image_20_juil._2026_19_03_52_azmgk0.png",
  defisTitleLine1: "Les défis de la restauration",
  defisTitleLine2: "et de l'hôtellerie.",
  challenges: [
    { title: "Surcharge des équipes en salle", desc: "Les allers-retours vers la plonge épuisent votre personnel et réduisent leur temps auprès des clients." },
    { title: "Rotation lente des tables", desc: "Un retard dans le débarrassage ralentit le service et bride le chiffre d'affaires." },
    { title: "Pénurie de personnel d'étage", desc: "Les livraisons de room-service saturent des équipes de nuit réduites à leur minimum." },
    { title: "Exigences d'hygiène strictes", desc: "Le maintien d'une propreté constante exige une main-d'œuvre et un temps considérables." }
  ],
  kpis: [
    { stat: "+30", suffix: "%", label: "Temps en salle", desc: "Temps récupéré pour le conseil client." },
    { stat: "-40", suffix: "%", label: "TMS & Fatigue", desc: "Baisse des contraintes liées au port de charges." },
    { stat: "24", suffix: "h/24", label: "Disponibilité", desc: "Couverture continue du room-service." },
    { stat: "98", suffix: "%", label: "Acceptation client", desc: "Taux de satisfaction face à l'innovation." }
  ],
  beneficesTitleLine1: "Sublimez votre séjour",
  beneficesTitleLine2: "et votre service en salle.",
  benefits: [
    { id: "01", title: "Temps libéré pour le client", desc: "En déléguant le port de charges lourdes, votre personnel reste disponible en salle." },
    { id: "02", title: "Réduction de la pénibilité", desc: "Une solution efficace pour réduire la fatigue et les troubles musculosquelettiques." },
    { id: "03", title: "Rentabilité & Rotation", desc: "Accélérez le débarrassage des tables, et assurez un room-service rentable la nuit." }
  ],
  usageSectionTitle: "L'automatisation au cœur de vos opérations",
  usageItems: [
    {
      id: "debarrassage",
      icon: Utensils,
      title: "Débarrassage vers la plonge",
      desc: "Le robot navigue entre les tables pour transporter la vaisselle sale vers la cuisine.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1785153876/ChatGPT_Image_27_juil._2026_14_03_53_pqkzw7.png"
    },
    {
      id: "room-service",
      icon: Bell,
      title: "Livraison Room-Service",
      desc: "Interfacé avec vos ascenseurs, le cobot achemine les commandes à la porte du client.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1785324418/ChatGPT_Image_28_juil._2026_13_22_38_zqkyx1.png"
    },
    {
      id: "proprete",
      icon: ShieldCheck,
      title: "Propreté automatisée",
      desc: "Nos gammes de nettoyage maintiennent les sols dans un état de propreté constant.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1785324422/ChatGPT_Image_28_juil._2026_13_45_43_d6fm1m.png"
    }
  ],
  techTitleLine1: "Ingénierie Cobotique",
  techTitleLine2: "Avancée.",
  techFeatures: [
    { icon: Layers, title: "Pilotage d'ascenseurs", desc: "Module pour appeler les ascenseurs." },
    { icon: Shield, title: "Évitement LiDAR 3D", desc: "Cartographie en temps réel pour contourner les obstacles." },
    { icon: Zap, title: "Discrétion sonore", desc: "Moteurs électriques à faible décibel." },
    { icon: Cpu, title: "Compartiments sécurisés", desc: "Coffre verrouillé pour garantir l'hygiène." }
  ],
  robotsSubtitle: "hôteliers.",
  robotList: [
    getRobotById("userve")!,
    getRobotById("uclean-compact")!,
    getRobotById("uclean-vacuum-40")!,
    getRobotById("uclean-scrub-50-disc")!
  ].filter(Boolean),
  contactEmailPlaceholder: "j.dupont@hotel.com",
  contactSectorDefault: "hospitality",
  contactSectorOptions: [
    { val: "hospitality", label: "Hôtellerie" },
    { val: "restauration", label: "Restauration" }
  ],
  contactRobotOptions: [
    { val: "userve", label: "uServe (Service en salle & Accueil)" },
    { val: "uclean-compact", label: "uClean Compact (Entretien restreint)" },
    { val: "uclean-vacuum-40", label: "uClean Vacuum 40 (Aspiration HEPA)" },
    { val: "uclean-scrub-50-disc", label: "uClean Scrub 50 Disc (Lavage sols lisses)" },
    { val: "flotte-mixte", label: "Flotte mixte" },
    { val: "audit-site", label: "Audit global de site" }
  ]
};

const retailConfig: IndustrySectorConfig = {
  sectorKey: "retail",
  heroHeading: (
    <>
      Le futur du Retail, <br />
      par la <span className="text-orange-500">robotique.</span>
    </>
  ),
  heroDescription: "Optimisez l'expérience client en rayon et automatisez l'entretien des surfaces de vente pour maximiser vos performances commerciales.",
  heroImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1786706254/ChatGPT_Image_14_ao%C3%BBt_2026_13_14_25_hbto5m.png",
  defisTitleLine1: "Les défis du retail",
  defisTitleLine2: "et de la grande distribution.",
  challenges: [
    { title: "Pénurie de personnel en magasin", desc: "La difficulté de recrutement limite la disponibilité des équipes pour l'accueil et le conseil client." },
    { title: "Désorientation des clients en rayon", desc: "Dans les grandes surfaces, les clients peinent à trouver les produits, réduisant le taux de conversion." },
    { title: "Entretien lourd des allées de vente", desc: "Maintenir des sols impeccables pendant les heures d'ouverture requiert des ressources importantes." },
    { title: "Gestion des flux aux heures de pointe", desc: "Les pics d'affluence engorgent les allées et saturent les équipes de vente." }
  ],
  kpis: [
    { stat: "+35", suffix: "%", label: "Satisfaction client", desc: "Mesurée en enquête post-visite en magasin." },
    { stat: "-25", suffix: "%", label: "Attente perçue", desc: "Réduction de l'attente lors des heures de pointe." },
    { stat: "12", suffix: "h", label: "Autonomie continue", desc: "Couverture d'une journée complète d'ouverture." },
    { stat: "x2.5", suffix: "", label: "Retour sur investissement", desc: "ROI moyen mesuré sur 18 mois d'exploitation." }
  ],
  beneficesTitleLine1: "Rehaussez l'expérience d'achat",
  beneficesTitleLine2: "dans tous vos points de vente.",
  benefits: [
    { id: "01", title: "Orientation & Guidage interactif", desc: "uServe accompagne proactivement les clients vers les rayons demandés et affiche les offres." },
    { id: "02", title: "Propreté continue sans gêne", desc: "Nettoyage autonome et silencieux des allées pendant les heures d'ouverture au public." },
    { id: "03", title: "Valorisation du personnel", desc: "Vos vendeurs se concentrent à 100% sur l'accompagnement commercial et l'encaissement." }
  ],
  usageSectionTitle: "L'assistance intelligente en point de vente",
  usageItems: [
    {
      id: "guidage",
      icon: ShoppingBag,
      title: "Accueil & Guidage en rayon",
      desc: "Orientation dynamique des visiteurs et diffusion de promos sur écran 21 pouces.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1786538785/ChatGPT_Image_12_ao%C3%BBt_2026_14_20_10_chhifv.png"
    },
    {
      id: "nettoyage-allees",
      icon: ShieldCheck,
      title: "Entretien continu des allées",
      desc: "Lavage et aspiration des surfaces de vente en toute sécurité au milieu des flux clients.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1786538828/ChatGPT_Image_12_ao%C3%BBt_2026_14_33_42_tnmnoc.png"
    },
    {
      id: "conseil-client",
      icon: ShoppingBag,
      title: "Recentrage sur le conseil client",
      desc: "Vos vendeurs restent disponibles pour accompagner et convertir davantage.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1786538787/ChatGPT_Image_12_ao%C3%BBt_2026_14_44_30_vo5p1c.png"
    }
  ],
  techTitleLine1: "Technologie Retail",
  techTitleLine2: "et Navigation Rayons.",
  techFeatures: [
    { icon: Layers, title: "Cartographie Magasin 3D", desc: "Modélisation précise des rayons et gondoles." },
    { icon: Shield, title: "Navigation sécurisée public", desc: "Détection des piétons et arrêt d'urgence instantané." },
    { icon: Layers, title: "Affichage promo HD", desc: "Écran dynamique pour la mise en valeur des offres." },
    { icon: Cpu, title: "Synchronisation stocks & SI", desc: "Connexion sécurisée aux données magasin." }
  ],
  robotsSubtitle: "pour le retail.",
  robotList: [
    getRobotById("userve")!,
    getRobotById("uclean-compact")!,
    getRobotById("uclean-vacuum-40")!,
    getRobotById("uclean-scrub-50-disc")!,
    getRobotById("uclean-scrub-50-roller")!
  ].filter(Boolean),
  contactEmailPlaceholder: "j.dupont@retail.com",
  contactSectorDefault: "retail",
  contactSectorOptions: [
    { val: "retail", label: "Retail & Commerce" },
    { val: "grande-distribution", label: "Grande Distribution" }
  ],
  contactRobotOptions: [
    { val: "userve", label: "uServe (Accueil & Guidage)" },
    { val: "uclean-compact", label: "uClean Compact (Entretien restreint)" },
    { val: "uclean-vacuum-40", label: "uClean Vacuum 40 (Aspiration HEPA)" },
    { val: "uclean-scrub-50-disc", label: "uClean Scrub 50 Disc (Lavage à disques)" },
    { val: "uclean-scrub-50-roller", label: "uClean Scrub 50 Roller (Brossage rouleau)" },
    { val: "flotte-mixte", label: "Flotte mixte" },
    { val: "audit-site", label: "Audit global de site" }
  ]
};

const healthConfig: IndustrySectorConfig = {
  sectorKey: "health",
  heroHeading: (
    <>
      L'excellence des soins, <br />
      par la <span className="text-orange-500">robotique.</span>
    </>
  ),
  heroDescription: "Sécurisez l'intralogistique hospitalière, soulagez le personnel soignant et garantissez des standards d'hygiène irréprochables.",
  heroImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1786449000/ChatGPT_Image_11_ao%C3%BBt_2026_13_48_55_bhfnwm.png",
  defisTitleLine1: "Les défis du secteur médical",
  defisTitleLine2: "et hospitalier.",
  challenges: [
    { title: "Surcapacité & Épuisement soignant", desc: "Le personnel de santé consacre un temps précieux au transport de repas, linge et consommables." },
    { title: "Risques nosocomiaux & Hygiène", desc: "La prévention des infections exige un bio-nettoyage rigoureux et traçable en continu." },
    { title: "Flux logistiques complexes 24h/24", desc: "Acheminement des bilans, médicaments et linge entre la pharmacie, la blanchisserie et les services." },
    { title: "Troubles musculosquelettiques", desc: "La manipulation répétée de chariots lourds génère fatigue et arrêts de travail." }
  ],
  kpis: [
    { stat: "-50", suffix: "%", label: "TMS & Pénibilité", desc: "Réduction drastique des contraintes physiques." },
    { stat: "99.9", suffix: "%", label: "Conformité Hygiène", desc: "Traçabilité intégrale du nettoyage et désinfection." },
    { stat: "24", suffix: "h/24", label: "Disponibilité continue", desc: "Acheminement logistique garanti jour et nuit." },
    { stat: "+40", suffix: "%", label: "Temps soignant", desc: "Temps réattribué aux soins et aux patients." }
  ],
  beneficesTitleLine1: "Optimisez l'intralogistique",
  beneficesTitleLine2: "et le bien-être à l'hôpital.",
  benefits: [
    { id: "01", title: "Transport autonome sécurisé", desc: "uLog Deliver livre médicaments, linge et plateaux repas directement dans les unités de soins." },
    { id: "02", title: "Bionettoyage haute rigueur", desc: "La gamme uClean assure la décontamination et le nettoyage constant des couloirs et halls." },
    { id: "03", title: "Temps dédié au soin", desc: "Déléguez les tâches logistiques répétitives pour recentrer les soignants sur les patients." }
  ],
  usageSectionTitle: "La cobotique au service du soin",
  usageItems: [
    {
      id: "livraison-soins",
      icon: Shield,
      title: "Livraison inter-services",
      desc: "Acheminement sécurisé et traçable de matériel médical, pharmacie et repas.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1786443278/Gemini_Generated_Image_e0xc1ke0xc1ke0xc_n0quzz.png"
    },
    {
      id: "bionettoyage",
      icon: ShieldCheck,
      title: "Bio-nettoyage des circulations",
      desc: "Entretien régulier et silencieux des espaces communs, chambres et couloirs.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1786443283/Gemini_Generated_Image_vqi2bwvqi2bwvqi2_obkh6h.png"
    },
    {
      id: "logistique-flux-lourds",
      icon: Truck,
      title: "Logistique des flux lourds",
      desc: "Transport autonome et sécurisé des chariots de blanchisserie, des plateaux repas et des déchets, réduisant la pénibilité pour les équipes.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1786443284/Gemini_Generated_Image_xao0i0xao0i0xao0_hbe4v6.png"
    }
  ],
  techTitleLine1: "Normes Médicales",
  techTitleLine2: "et Traçabilité.",
  techFeatures: [
    { icon: Layers, title: "Interfaçage Ascenseurs", desc: "Franchissement autonome d'étages et portes automatiques." },
    { icon: Shield, title: "Compartiments Badgés", desc: "Verrouillage sécurisé par carte RFID / Code." },
    { icon: Zap, title: "Silencieux & Médicalisé", desc: "Composants certifiés pour environnement hospitalier." },
    { icon: Cpu, title: "Traçabilité SaaS", desc: "Journal d'historique des livraisons et nettoyages." }
  ],
  robotsSubtitle: "pour la santé.",
  robotList: [
    getRobotById("userve")!,
    getRobotById("uclean-compact")!,
    getRobotById("uclean-vacuum-40")!,
    getRobotById("uclean-scrub-50-disc")!,
    getRobotById("ulog-deliver-150")!,
    getRobotById("ulog-lift-300-base")!
  ].filter(Boolean),
  contactEmailPlaceholder: "j.dupont@hopital.fr",
  contactSectorDefault: "health",
  contactSectorOptions: [
    { val: "health", label: "Santé & Médical" },
    { val: "ehpad", label: "EHPAD & Résidence Senior" },
    { val: "clinique", label: "Clinique Privée" }
  ],
  contactRobotOptions: [
    { val: "userve", label: "uServe (Accueil & Guidage)" },
    { val: "uclean-compact", label: "uClean Compact (Entretien restreint)" },
    { val: "uclean-vacuum-40", label: "uClean Vacuum 40 (Aspiration HEPA)" },
    { val: "uclean-scrub-50-disc", label: "uClean Scrub 50 Disc (Lavage sols lisses)" },
    { val: "ulog-deliver-150", label: "uLog Deliver 150 (Distribution sécurisée)" },
    { val: "ulog-lift-300-base", label: "uLog Lift 300 Base (Levage & manutention agile)" },
    { val: "flotte-mixte", label: "Flotte mixte" },
    { val: "audit-site", label: "Audit global de site" }
  ]
};

const industryConfig: IndustrySectorConfig = {
  sectorKey: "industry",
  heroHeading: (
    <>
      La performance industrielle, <br />
      par la <span className="text-orange-500">robotique.</span>
    </>
  ),
  heroDescription: "Fluidifiez vos lignes de production, automatisez la manutention de charges lourdes et maintenez vos entrepôts au sommet de l'efficacité.",
  heroImage: "https://res.cloudinary.com/df1x718yw/image/upload/v1786019271/ChatGPT_Image_6_ao%C3%BBt_2026_14_27_13_myx8mn.png",
  defisTitleLine1: "Les défis de l'industrie",
  defisTitleLine2: "et de l'intralogistique.",
  challenges: [
    { title: "Flux d'approvisionnement tendus", desc: "La rupture de composants sur chaîne de montage bloque la production et génère des coûts d'arrêt." },
    { title: "Pénibilité & Risques d'accidents", desc: "La manutention manuelle de palettes lourdes entraîne des accidents et des TMS à répétition." },
    { title: "Grandes surfaces à entretenir", desc: "Les poussières et débris industriels dégradent le matériel et les conditions de travail." },
    { title: "Besoin de flexibilité sans travaux", desc: "Modifier les lignes de production sans réaménager physiquement les entrepôts." }
  ],
  kpis: [
    { stat: "+45", suffix: "%", label: "Productivité intralogistique", desc: "Gain de cadence sur l'approvisionnement des lignes." },
    { stat: "-60", suffix: "%", label: "Accidents du travail", desc: "Réduction des risques liés au carristage manuel." },
    { stat: "100", suffix: "%", label: "Autonomie AMR", desc: "Navigation naturelle sans marquage au sol." },
    { stat: "24", suffix: "h/7j", label: "Opérationnel", desc: "Fonctionnement en continu 3x8 sans interruption." }
  ],
  beneficesTitleLine1: "Automatisez vos flux",
  beneficesTitleLine2: "de bout en bout dans l'entrepôt.",
  benefits: [
    { id: "01", title: "Intralogistique flexible (AMR)", desc: "uLog LIFT déplace automatiquement vos palettes et bacs sans infrastructure lourde." },
    { id: "02", title: "Lavage industriel haute performance", desc: "uClean Scrub 75 nettoie les très grandes surfaces d'usine rapidement et efficacement." },
    { id: "03", title: "ROI rapide & Intégration WMS", desc: "Connexion directe avec vos systèmes ERP/WMS pour déclencher les missions en temps réel." }
  ],
  usageSectionTitle: "L'intralogistique de précision",
  usageItems: [
    {
      id: "livraison-ligne",
      icon: Cpu,
      title: "Approvisionnement des lignes",
      desc: "Transfert autonome de composants entre la zone de stockage et la chaîne de montage.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1785933757/ChatGPT_Image_5_ao%C3%BBt_2026_14_12_02_glwn9v.png"
    },
    {
      id: "manutention-palettes",
      icon: Layers,
      title: "Levage & Déplacement de palettes",
      desc: "Prise en charge autonome des supports de charge jusqu'à 600 kg.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1785933725/Gemini_Generated_Image_ncnba4ncnba4ncnb_tmywdz.png"
    },
    {
      id: "nettoyage-entrepot",
      icon: ShieldCheck,
      title: "Nettoyage industriel intensif",
      desc: "Lavage à grande eau et séchage instantané des allées logistiques à fort trafic.",
      image: "https://res.cloudinary.com/df1x718yw/image/upload/v1785933751/Gemini_Generated_Image_ehix26ehix26ehix_vcxjhs.png"
    }
  ],
  techTitleLine1: "Ingénierie Robuste",
  techTitleLine2: "et Navigation SLAM.",
  techFeatures: [
    { icon: Layers, title: "SLAM Laser & Cartographie", desc: "Navigation 100% autonome sans fil ni réflecteur." },
    { icon: Shield, title: "Sécurité ISO 3691-4", desc: "Capteurs de sécurité certifiés pour cohabitation hommes/robots." },
    { icon: Zap, title: "Recharge d'opportunité", desc: "Recharge automatique ultra-rapide sur station." },
    { icon: Cpu, title: "Gestion de flotte Fleet", desc: "Ordonnancement intelligent et évitement de trafic." }
  ],
  robotsSubtitle: "pour l'industrie.",
  robotList: [
    getRobotById("ulog-deliver-80")!,
    getRobotById("ulog-deliver-150")!,
    getRobotById("ulog-deliver-300")!,
    getRobotById("ulog-deliver-300-xl")!,
    getRobotById("ulog-lift-300-base")!,
    getRobotById("ulog-lift-300-xl")!,
    getRobotById("ulog-lift-600-base")!,
    getRobotById("ulog-lift-600")!,
    getRobotById("uclean-scrub-75")!
  ].filter(Boolean),
  contactEmailPlaceholder: "j.dupont@usine-logistique.com",
  contactSectorDefault: "industry",
  contactSectorOptions: [
    { val: "industry", label: "Logistique & Industrie" },
    { val: "agroalimentaire", label: "Agroalimentaire" },
    { val: "entrepot", label: "Entrepôt & Logistique" }
  ],
  contactRobotOptions: [
    { val: "ulog-deliver-80", label: "uLog Deliver 80 (Charges légères 80kg)" },
    { val: "ulog-deliver-150", label: "uLog Deliver 150 (Transport sécurisé 150kg)" },
    { val: "ulog-deliver-300", label: "uLog Deliver 300 (Plateforme 300kg)" },
    { val: "ulog-deliver-300-xl", label: "uLog Deliver 300 XL (Châssis étendu 300kg)" },
    { val: "ulog-lift-300-base", label: "uLog Lift 300 Base (Base de levage 300kg)" },
    { val: "ulog-lift-300-xl", label: "uLog Lift 300 XL (Levage avec écran 300kg)" },
    { val: "ulog-lift-600-base", label: "uLog Lift 600 Base (Levage lourd 600kg)" },
    { val: "ulog-lift-600", label: "uLog Lift 600 (Levage haute capacité 600kg)" },
    { val: "uclean-scrub-75", label: "uClean Scrub 75 (Lavage industriel 75L)" },
    { val: "flotte-mixte", label: "Flotte mixte" },
    { val: "audit-site", label: "Audit global de site" }
  ]
};

// --- REUSABLE 8-SECTION INDUSTRY VIEW TEMPLATE ---
const SectorView: React.FC<{ config: IndustrySectorConfig }> = ({ config }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const modelParam = searchParams.get("model");
  const industryParam = searchParams.get("industry");

  const [prequalificationDetails, setPrequalificationDetails] = useState<string>("");
  const [prequalificationModel, setPrequalificationModel] = useState<string>("");
  const [recommendedRobotIds, setRecommendedRobotIds] = useState<string[]>([]);

  const [activeUsageIdx, setActiveUsageIdx] = useState(0);
  const usageCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sector normalization
  const validSectors = ["hospitality", "retail", "health", "industry", "other"];
  const sectorAliases: Record<string, string> = {
    hotellerie: "hospitality",
    restauration: "hospitality",
    retail: "retail",
    sante: "health",
    healthcare: "health",
    medical: "health",
    ehpad: "health",
    clinique: "health",
    industrie: "industry",
    logistics: "industry",
    logistique: "industry",
    usine: "industry",
    entrepot: "industry",
    agroalimentaire: "industry"
  };

  const normalizeSector = (val: string | null): string => {
    if (!val) return config.contactSectorDefault;
    const lower = val.toLowerCase().trim();
    if (validSectors.includes(lower)) return lower;
    if (sectorAliases[lower]) return sectorAliases[lower];
    return config.contactSectorDefault;
  };

  // Safe canonical model resolver
  const resolveCanonicalModel = (modelKey: string | null): string => {
    if (!modelKey) return "";
    if (modelKey === "flotte-mixte" || modelKey === "audit-site") return modelKey;
    const robot = getRobotById(modelKey);
    if (!robot) return "";
    const isInSector = config.robotList.some((r) => r.canonicalId === robot.canonicalId || r.id === robot.id);
    return isInSector ? robot.canonicalId : "";
  };

  const selectedSector = normalizeSector(industryParam);
  const selectedModel = prequalificationModel || resolveCanonicalModel(modelParam);

  const handleQualificationComplete = (mapped: MappedContactQualification) => {
    const recommended = mapped.structuredData.evaluation.recommendedRobots || [];
    setRecommendedRobotIds(recommended);

    if (mapped.suggestedModel) {
      setPrequalificationModel(mapped.suggestedModel);
    } else if (recommended.length > 0) {
      setPrequalificationModel(recommended[0]);
    }

    setPrequalificationDetails(mapped.formattedSummary);

    // Smoothly scroll to the top of #prequalification taking the sticky header offset into account
    setTimeout(() => {
      const prequalEl = document.getElementById("prequalification");
      if (prequalEl) {
        const headerOffset = 100;
        const elementPosition = prequalEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 50);
  };

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const scrollToTarget = () => {
        const el = document.getElementById(targetId);
        if (el) {
          const headerOffset = 100;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          return true;
        }
        return false;
      };
      const timer1 = setTimeout(scrollToTarget, 150);
      const timer2 = setTimeout(scrollToTarget, 450);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = usageCardRefs.current.findIndex((ref) => ref === entry.target);
          if (index !== -1) {
            setActiveUsageIdx(index);
          }
        }
      });
    }, observerOptions);

    usageCardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [config.usageItems]);

  const carouselTabs: FleetCarouselTab[] = config.sectorKey === "industry"
    ? [
        { id: "all", label: "Tous" },
        { id: "deliver", label: "uLog Deliver (Livraison)" },
        { id: "lift", label: "uLog LIFT (Manutention)" },
        { id: "scrub", label: "uClean 75 (Lavage)" },
      ]
    : [
        { id: "all", label: "Tous" },
        ...config.robotList.map((r) => ({ id: r.id, label: r.name })),
      ];

  const rawCarouselItems: FleetCarouselItem[] = config.robotList.map((robot) => {
    const rawId = robot.canonicalId || robot.id;
    const resolvedRobot = getRobotById(rawId) || robot;
    const canonicalModelId = resolvedRobot.canonicalId || resolvedRobot.id;
    const seriesId = resolvedRobot.seriesId;

    let category: string | undefined = undefined;
    if (config.sectorKey === "industry") {
      if (robot.id.includes("deliver")) category = "deliver";
      else if (robot.id.includes("lift")) category = "lift";
      else if (robot.id.includes("scrub")) category = "scrub";
    }

    const fallbackLink = seriesId
      ? `/robots/${seriesId}?model=${encodeURIComponent(canonicalModelId)}#model-${encodeURIComponent(canonicalModelId)}`
      : `/robots/ulog-series`;

    const isRecommended = recommendedRobotIds.some(
      (rec) =>
        rec === robot.id ||
        rec === canonicalModelId ||
        rec === rawId ||
        (robot.canonicalId && rec.toLowerCase() === robot.canonicalId.toLowerCase()) ||
        (robot.id && rec.toLowerCase().endsWith(robot.id.toLowerCase()))
    );

    return {
      id: robot.id,
      canonicalId: canonicalModelId,
      seriesId: seriesId,
      name: resolvedRobot.name || robot.name,
      segmentLabel: resolvedRobot.segmentLabel || robot.segmentLabel,
      shortDesc: resolvedRobot.shortDesc || robot.shortDesc,
      image: resolvedRobot.image || robot.image,
      link: fallbackLink,
      category,
      badge: isRecommended ? "Recommandé pour votre sélection" : undefined,
    };
  });

  const carouselItems: FleetCarouselItem[] = [...rawCarouselItems].sort((a, b) => {
    const aRec = Boolean(a.badge);
    const bRec = Boolean(b.badge);
    if (aRec && !bRec) return -1;
    if (!aRec && bRec) return 1;
    return 0;
  });

  const handlePrimaryAction = (item: FleetCarouselItem) => {
    const rawId = item.canonicalId || item.id;
    const robot = getRobotById(rawId);
    let chosenModel = "";

    if (robot && robot.canonicalId) {
      chosenModel = robot.canonicalId;
    } else if (rawId === "flotte-mixte" || rawId === "audit-site") {
      chosenModel = rawId;
    } else {
      chosenModel = "flotte-mixte";
    }

    const nextParams = new URLSearchParams(searchParams);
    if (chosenModel) {
      nextParams.set("model", chosenModel);
    }
    nextParams.set("industry", config.sectorKey);
    setSearchParams(nextParams, { replace: true });

    if (window.location.hash !== "#contact") {
      window.location.hash = "contact";
    }
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getSecondaryLink = (item: FleetCarouselItem): string | undefined => {
    const rawId = item.canonicalId || item.id;
    const robot = getRobotById(rawId);
    const seriesId = robot?.seriesId || item.seriesId;
    const canonicalId = robot?.canonicalId || item.canonicalId;

    if (seriesId && canonicalId) {
      return `/robots/${seriesId}?model=${encodeURIComponent(canonicalId)}#model-${encodeURIComponent(canonicalId)}`;
    }
    if (seriesId) {
      return `/robots/${seriesId}`;
    }
    return undefined;
  };

  return (
    <div className="min-h-screen flex flex-col text-[#1a1a1a] font-sans overflow-x-clip bg-white relative">
      {/* Header */}
      <Header />

      {/* ==================== 1. HERO SECTION ==================== */}
      <div className="pt-28 pb-12 px-2 sm:px-4 w-full flex justify-center bg-[#0B1121] relative z-20">
        <div className="relative w-full max-w-[1800px] h-[75vh] min-h-[550px] rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute inset-0">
            <img 
              src={optimizeCloudinaryUrl(config.heroImage, 1800)} 
              alt={config.sectorKey} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c]/85 via-[#0a0f1c]/60 to-transparent"></div>
          </div>
          
          <div className={`relative z-10 h-full flex flex-col justify-center items-start text-left px-6 sm:px-12 lg:px-24 w-full ${config.sectorKey === "health" ? "lg:w-[46%]" : "lg:w-3/5"}`}>
            <h1 className={`text-4xl sm:text-5xl lg:text-[54px] font-bold text-white font-display leading-[1.1] mb-6 ${config.sectorKey === "health" ? "max-w-[520px]" : ""}`}>
              {config.heroHeading}
            </h1>
            
            <p className={`text-base sm:text-lg text-gray-300 mb-10 leading-relaxed ${config.sectorKey === "health" ? "max-w-[500px]" : "max-w-xl"}`}>
              {config.heroDescription}
            </p>
            
            <a 
              href="#contact"
              className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition-colors text-sm shadow-lg gap-2"
            >
              Parler à un expert
            </a>
          </div>
        </div>
      </div>

      {/* ==================== 2. SECTION "LES DÉFIS" ==================== */}
      <div className="bg-[#faf7f2] relative z-20">
        <section id="defis" className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center max-w-4xl mx-auto">
            <span className="text-xs font-mono text-orange-500 uppercase tracking-widest block mb-4 font-semibold">- CONTEXTE OPÉRATIONNEL</span>
            <h2 className="text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#0a0f1c]">
              {config.defisTitleLine1} <br/>
              <span className="text-gray-400 font-light">{config.defisTitleLine2}</span>
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {config.challenges.map((challenge, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="bg-white p-10 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col gap-4 text-center">
                <h3 className="text-xl font-bold text-[#0a0f1c]">{challenge.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed font-light">{challenge.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* ==================== 3. SECTION "CHIFFRES CLÉS" ==================== */}
      <div className="bg-white border-t border-gray-100 relative z-20">
        <section id="chiffres" className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="bg-white border border-orange-500 rounded-[20px] shadow-lg py-12 px-6 relative overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              {config.kpis.map((item, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="flex flex-col items-center pt-8 sm:pt-0 px-4 first:pt-0">
                  <div className="text-5xl font-bold text-gray-900 font-display tracking-tight mb-3 flex items-baseline justify-center">
                    <AnimatedNumber value={item.stat} /><span className="text-3xl ml-1">{item.suffix}</span>
                  </div>
                  <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">{item.label}</div>
                  <p className="text-sm text-gray-500 max-w-[180px] font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ==================== 4. SECTION "BÉNÉFICES" ==================== */}
      <div className="bg-[#fafafa] border-t border-gray-100 relative z-20">
        <section id="benefices" className="py-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 text-center max-w-4xl mx-auto">
            <span className="text-xs font-mono text-orange-500 uppercase tracking-widest block mb-4 font-semibold">- VOS AVANTAGES CONCURRENTIELS</span>
            <h2 className="text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#0a0f1c]">
              {config.beneficesTitleLine1} <br/>
              <span className="text-gray-400 font-light">{config.beneficesTitleLine2}</span>
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pt-8"
          >
            {config.benefits.map((benefit, bIdx) => (
              <motion.div key={bIdx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: bIdx * 0.15 }} className="border-t border-gray-200 pt-6">
                <span className="text-xs font-mono text-orange-500 font-bold mb-3 block">BÉNÉFICE {benefit.id}.</span>
                <h3 className="text-xl font-bold text-[#0a0f1c] mb-4">{benefit.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed font-light">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* ==================== 5. SECTION "CAS D'USAGE" ==================== */}
      <section id="fonctionnalites" className="relative w-full bg-[#0a0f1c] text-white z-10 scroll-mt-20">
        {/* Desktop Sticky Background (lg:block only) */}
        <div className="hidden lg:block sticky top-0 left-0 w-full h-screen overflow-hidden z-0 pointer-events-none">
          {config.usageItems.map((item, idx) => (
            <div
              key={item.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                activeUsageIdx === idx ? "opacity-100" : "opacity-0"
              }`}
            >
              <img 
                src={optimizeCloudinaryUrl(item.image, 1600)} 
                alt={item.title} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c]/90 via-[#0a0f1c]/40 to-transparent" />
        </div>

        {/* Desktop Sticky Layout (>= 1024px) */}
        <div className="hidden lg:block relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-16 items-start">
            <div className="col-span-6 sticky top-0 h-screen flex flex-col justify-center py-0">
              <span className="text-orange-500 font-mono text-xs font-bold tracking-widest uppercase mb-4 block">CAS D'USAGE</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mt-4 leading-tight font-display max-w-lg drop-shadow-md">
                {config.usageSectionTitle}
              </h2>
            </div>

            <div className="col-span-6 flex flex-col items-end gap-[30vh] pt-[30vh] pb-[40vh]">
              {config.usageItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    ref={(el) => (usageCardRefs.current[idx] = el)}
                    id={item.id}
                    className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl transition-all duration-300 w-full max-w-[420px]"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    </div>
                    
                    <p className="text-base text-gray-300 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile & Tablette Vertical Flow (< 1024px) - Version Immersive Plein Format */}
        <div className="lg:hidden relative z-10 max-w-2xl mx-auto px-4 py-12">

          <div className="mb-8 text-left">
            <span className="text-orange-500 font-mono text-xs font-bold tracking-widest uppercase mb-2 block">
              CAS D'USAGE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display leading-tight">
              {config.usageSectionTitle}
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {config.usageItems.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  id={`mobile-${item.id}`}
                  className="bg-[#12192B] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col group"
                >
                  {/* Visuel immersif en tête : bord à bord, ratio 4/3 généreux */}
                  <div className="w-full aspect-[4/3] relative bg-[#0a0f1c] overflow-hidden">
                    <img
                      src={optimizeCloudinaryUrl(item.image, 1000)}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Dégradé de fondu vers le corps de la carte */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12192B] via-transparent to-black/20" />

                    {/* Badge icône flottant sur l'image */}
                    <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-xl bg-[#0a0f1c]/80 backdrop-blur-md border border-orange-500/30 flex items-center justify-center text-orange-500 shadow-lg">
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Bloc textuel sous le visuel */}
                  <div className="p-5 sm:p-6 flex flex-col -mt-2 relative z-10">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-300 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================== 6. SECTION "CARACTÉRISTIQUES TECHNIQUES" ==================== */}
      <div className="bg-[#f7f4ef] border-t border-gray-100 relative z-20">
        <section id="ingenierie" className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <span className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-4 block">
              - Technologies intégrées -
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold font-display tracking-tight text-[#0a0f1c]">
              {config.techTitleLine1} <span className="text-gray-400 font-light">{config.techTitleLine2}</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {config.techFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 group"
                >
                  <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-6 text-gray-700 group-hover:text-orange-500 group-hover:border-orange-200 transition-colors">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </div>

      {/* ==================== 7. MODULE DE PRÉQUALIFICATION TECHNIQUE ==================== */}
      <PrequalificationFlow
        sectorKey={config.sectorKey}
        onCompleteQualification={handleQualificationComplete}
      />

      {/* ==================== 7.5 SECTION "COBOTS RECOMMANDÉS" ==================== */}
      <FleetCarousel
        sectionId="robots-secteur"
        eyebrow="- La flotte idéale -"
        title={
          <>
            Découvrez nos robots <span className="text-gray-400 font-light">{config.robotsSubtitle}</span>
          </>
        }
        backgroundImage={config.heroImage}
        tabs={carouselTabs}
        items={carouselItems}
        defaultTab="all"
        centerCardsOnDesktop={false}
        primaryCtaLabel="Demander une étude de site"
        secondaryCtaLabel="Voir les spécifications"
        onPrimaryAction={handlePrimaryAction}
        getSecondaryLink={getSecondaryLink}
      />

      {/* ==================== 8. CTA FORM ==================== */}
      <section id="contact" className="py-20 bg-white border-t border-gray-100 relative z-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="bg-[#0B1121] rounded-[32px] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-gray-800">
            <div className="w-full lg:w-5/12 p-8 lg:p-12 flex flex-col justify-center">
              <div>
                <span className="text-orange-500 font-mono text-[10px] tracking-widest uppercase font-semibold mb-3 block">
                  Prendre contact
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-display leading-snug">
                  Prêt à tester vos <br/><span className="text-gray-400">premiers robots ?</span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                  Nos experts analysent vos flux sous 48h pour concevoir une simulation sur-mesure. Sans engagement.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-7/12 bg-white/[0.02] p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-white/5">
              <ContactForm
                defaultSector={selectedSector}
                defaultModel={selectedModel}
                defaultDetails={prequalificationDetails}
                sectorOptions={config.contactSectorOptions}
                robotOptions={config.contactRobotOptions}
                emailPlaceholder={config.contactEmailPlaceholder}
                ctaLabel="Demander une étude de site"
                idPrefix={`industry-${config.sectorKey}`}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20"><Footer /></div>
    </div>
  );
};

export const IndustryPage: React.FC = () => {
  const { industryId } = useParams<{ industryId: string }>();

  const isRetail = industryId === "retail" || industryId === "retail-commerce" || industryId === "retail-grande-distribution";
  const isHealth = industryId === "health" || industryId === "healthcare" || industryId === "sante" || industryId === "sante-medical" || industryId === "sante-logistique-hospitaliere";
  const isIndustry = industryId === "industry" || industryId === "logistique" || industryId === "industrie" || industryId === "industrie-logistique" || industryId === "industrie-agroalimentaire";

  if (isRetail) {
    return <SectorView config={retailConfig} />;
  }

  if (isHealth) {
    return <SectorView config={healthConfig} />;
  }

  if (isIndustry) {
    return <SectorView config={industryConfig} />;
  }

  return <SectorView config={hospitalityConfig} />;
};
