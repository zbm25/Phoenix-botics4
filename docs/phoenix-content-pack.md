# Content & Media Pack Phoenix-botics

Ce document synthétise l'intégralité des contenus textuels (copywriting) et médias du dépôt Phoenix-botics. Il est formaté pour servir de prompt de données direct pour l'intégration de nos contenus sur la maquette haute fidélité AI Studio.

## 1. Identité & Accroches Globales

### Hero Section (Page d'accueil)
- **Badge :** ROBOTIQUE DE SERVICE
- **Slogan / H1 :** Libérer le potentiel humain par la robotique.
- **Sous-titre :** L'automatisation intelligente au service de votre croissance.
- **CTA Primaire :** Découvrir notre catalogue →
- **CTA Secondaire :** Évaluer mon projet
- **Vidéos Hero :**
  - ULog : `https://res.cloudinary.com/df1x718yw/video/upload/v1782758795/ULog_tlu9tt.mp4`
  - UClean : `https://res.cloudinary.com/df1x718yw/video/upload/v1782758788/uClean_hsvmvx.mp4`

### Chiffres Clés (KeyMetricsBar)
- **100+ robots de service en exploitation** (Flottes opérationnelles déployées chez nos clients.)
- **4 secteurs clés** (Retail, hôtellerie, santé, laboratoires & industrie.)
- **99,4 % de SLA respecté** (Disponibilité contractuelle de vos robots.)

## 2. Les 4 Gammes de Robots

Voici la structure JSON demandée pour la section des robots afin de faciliter l'intégration via un LLM :

```json
[
  {
    "id": "range-uclean",
    "title": "uClean",
    "subtitle": "Nettoyage & Propreté Autonome",
    "tagline": "Autolaveuses et aspirateurs industriels autonomes pour grandes surfaces et espaces exigus.",
    "metric": "Jusqu'à 3 000 m²/h (Rendement max uClean Scrub 75)",
    "specs": {
      "rendement": "Jusqu'à 3 000 m²/h",
      "poids_vitesse": "Vitesse 1.2 m/s"
    },
    "image_url": "https://res.cloudinary.com/df1x718yw/image/upload/v1782745753/Scrub75_cyuy2d.png"
  },
  {
    "id": "range-ulog",
    "title": "uLog",
    "subtitle": "Intralogistique & Manutention AMR",
    "tagline": "Robots mobiles autonomes de levage et de livraison pour ateliers, entrepôts et santé.",
    "metric": "Jusqu'à 600 kg (Charge utile max uLog Lift 600)",
    "specs": {
      "charge_utile": "Jusqu'à 600 kg",
      "autonomie": "10 heures (Li-FePO4)",
      "vitesse": "1.2 m/s - Précision ± 5 mm",
      "dimensions": "950 x 650 x 365 mm"
    },
    "image_url": "https://res.cloudinary.com/df1x718yw/image/upload/v1782747964/uLogLIFT600_URGlogo_01_face_xgxuh0.png"
  },
  {
    "id": "range-userve",
    "title": "uServe",
    "subtitle": "Accueil, Orientation & Service Interactif",
    "tagline": "Assistant cobotique d'orientation et de guidage interactif pour établissements ouverts au public.",
    "metric": "Jusqu'à 10h (Autonomie continue & 20+ langues)",
    "specs": {
      "charge_maximale": "40 kg (4 x 10 kg)",
      "autonomie": "> 10h en continu",
      "dimensions": "580 x 490 x 1290 mm",
      "vitesse": "0.3 à 1.2 m/s - Passage min. 65 cm"
    },
    "image_url": "https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png"
  },
  {
    "id": "ulab-series",
    "title": "uLab Mobile",
    "subtitle": "L'automatisation des laboratoires",
    "tagline": "Automatisez le transport de tubes et de portoirs entre vos postes.",
    "metric": "Précision millimétrique (±0.1 mm)",
    "specs": {
      "fonctionnalite": "Intègre un bras robotique 7 axes.",
      "precision": "Positionnement avec une précision de ±0.1 mm.",
      "autonomie": "Se déplace de manière autonome."
    },
    "image_url": "https://res.cloudinary.com/df1x718yw/image/upload/v1793705292/20a60af5-4139-430a-b193-c89c8ce08f73_ckcv71.webp"
  }
]
```

### Autres Images Associées (Gammes)
- **uClean Scrub 50 Disc :** `https://res.cloudinary.com/df1x718yw/image/upload/v1782745593/Scrub50Disc_iwqmbf.png`
- **uClean Compact :** `https://res.cloudinary.com/df1x718yw/image/upload/v1782745472/Compact_wyrf5v.png`
- **uLog Deliver 150 :** `https://res.cloudinary.com/df1x718yw/image/upload/v1782747959/uLogDELIVER150_URGlogo_01_face_Box_Admin_tprnbn.png`
- **uLog Deliver 80 :** `https://res.cloudinary.com/df1x718yw/image/upload/v1782747971/uLogDELIVER80_URGlogo_01_face_ktme3v.png`

## 3. Simulateurs de Rentabilité (ROI)

**Arguments Généraux :**
- **Titre :** Simulez vos gains et votre rentabilité.
- **Description :** Obtenez une première estimation des heures opérationnelles que vos équipes pourraient réallouer. Le résultat est indicatif et sera affiné lors de notre étude de site.
- **Note / Disclaimer :** Ces estimations sont fournies à titre indicatif. Une étude de site Phoenix-Botics permet de prendre en compte vos flux, horaires, distances, équipements existants et objectifs de performance.

**Données cibles (Ancres / Métriques ROI) :**
- **uClean (Nettoyage) :**
  - **Métrique :** Surface nettoyée par jour (500 m² à 6 000 m²)
  - **Hypothèse affichée :** Base indicative : 400 m²/h, 22 jours ouvrés et coût horaire chargé de 20 €/h.
- **uLog (Intralogistique) :**
  - **Métrique :** Transferts internes par jour (20 à 200 transferts)
  - **Hypothèse affichée :** Base indicative : 15 min par transfert évité (aller-retour manuel), 22 jours ouvrés, 20 €/h.
- **uServe (Accueil & Hôtellerie) :**
  - **Métrique :** Déplacements de service par jour (30 à 300 déplacements)
  - **Hypothèse affichée :** Base indicative : 8 min par aller-retour (chambre ou table), 22 jours ouvrés, 20 €/h.

**Résultats Affichés (Variables simulées) :**
- **Temps opérationnel réallouable :** Exprimé en "~X h / mois" (Estimation du temps d'équipe potentiellement libéré).
- **Potentiel économique indicatif :** Exprimé en "~X € / mois" (À confirmer lors de l'étude de vos flux, contraintes et niveaux de service).

## 4. Secteurs d'Activité & Applications Métier

### Retail & Commerce
- **Sous-titre :** Grande distribution, boutiques
- **Métrique :** +20% d'engagement client
- **Défi :** Flux clients irréguliers et manque d'orientation en magasin. (Pénurie de personnel, désorientation en rayon, entretien lourd, gestion des flux aux heures de pointe)
- **Réponse :** Accueil interactif des clients et réassort automatisé des rayons.
- **Image Hero Secteur :** `https://res.cloudinary.com/df1x718yw/image/upload/v1786706254/ChatGPT_Image_14_ao%C3%BBt_2026_13_14_25_hbto5m.png`
- **Image Fallback Unsplash :** `https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80`
- **Robots :** uServe, uLog Deliver, uClean

### Hôtellerie & Restauration
- **Sous-titre :** Hôtels, restaurants, hospitality
- **Métrique :** 3h à 4h gagnées / jour
- **Défi :** Tâches de portage pénibles de vaisselle et surcharge de service.
- **Réponse :** Nos cobots assurent le transfert de plats pour recentrer les serveurs.
- **Image Hero Secteur :** `https://res.cloudinary.com/df1x718yw/image/upload/v1784567142/ChatGPT_Image_20_juil._2026_19_03_52_azmgk0.png`
- **Image Fallback Unsplash :** `https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80`
- **Robots :** uServe, uLog Deliver, uClean

### Santé & Médical
- **Sous-titre :** Hôpitaux, cliniques, EHPAD
- **Métrique :** -35% de déplacements perdus
- **Défi :** Soignants surchargés de manutention et déplacements annexes. (Surcapacité, risques nosocomiaux, flux 24/7 complexes, TMS)
- **Réponse :** Routage autonome du linge, repas et consommables médicaux.
- **Image Hero Secteur :** `https://res.cloudinary.com/df1x718yw/image/upload/v1786449000/ChatGPT_Image_11_ao%C3%BBt_2026_13_48_55_bhfnwm.png`
- **Image Fallback Unsplash :** `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80`
- **Robots :** uLog Deliver, uClean

### Logistique & Industrie
- **Sous-titre :** Entrepôts, usines, intralogistique
- **Métrique :** +15% de productivité
- **Défi :** Liaison logistique répétitive de charges légères entre postes. (Ruptures composants, risques d'accidents, grandes surfaces à entretenir)
- **Réponse :** Navettes mobiles intelligentes connectant vos lignes de production.
- **Image Hero Secteur :** `https://res.cloudinary.com/df1x718yw/image/upload/v1786019271/ChatGPT_Image_6_ao%C3%BBt_2026_14_27_13_myx8mn.png`
- **Image Fallback Unsplash :** `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80`
- **Robots :** uClean, uLog Deliver, uLog Lift

### Autres Images Cas d'Usage
- `https://res.cloudinary.com/df1x718yw/image/upload/v1785933757/ChatGPT_Image_5_ao%C3%BBt_2026_14_12_02_glwn9v.png`
- `https://res.cloudinary.com/df1x718yw/image/upload/v1785933725/Gemini_Generated_Image_ncnba4ncnba4ncnb_tmywdz.png`

## 5. Logos Partenaires & Réassurance

**Slogan Slider :** SOLUTIONS CERTIFIÉES & DÉPLOYÉES SUR LE TERRAIN

- **GEODIS** (Texte formaté : `font-display font-black tracking-[0.2em] text-slate-700 italic`)
- **Carrefour** : `https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrefour_logo.svg`
- **SODEXO** (Texte formaté : `font-sans font-bold tracking-widest text-slate-500`)
- **Decathlon** : `https://upload.wikimedia.org/wikipedia/commons/a/a9/Decathlon_Logo.svg`
- **AIRBUS** (Texte formaté : `font-sans font-medium tracking-[0.3em] text-slate-600`)
- **ACCOR** (Texte formaté : `font-serif font-light tracking-[0.25em] text-slate-500 italic`)
- **BOLLORÉ** (Texte formaté : `font-mono font-bold tracking-widest text-slate-700`)
- **Alstom** : `https://upload.wikimedia.org/wikipedia/commons/1/1a/Alstom_logo.svg`
