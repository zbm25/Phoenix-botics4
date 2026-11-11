# Content & Media Pack Phoenix-botics

Ce document synthétise l'intégralité des contenus textuels (copywriting) et médias du dépôt Phoenix-botics. Il est formaté pour servir de prompt de données direct pour l'intégration de nos contenus sur la maquette haute fidélité AI Studio.

## 1. Plan de Mapping (Maquette Standard Bots)

Ce plan fait correspondre les blocs de la maquette "Standard Bots" avec les données et le contexte de Phoenix-Botics.

| Bloc Maquette Standard Bots | Données Phoenix-Botics à intégrer |
| :--- | :--- |
| **Header & Navigation** | - **Logo:** Phoenix-Botics<br>- **Menus:** Gammes (uClean, uLog, uServe, uLab Mobile), Industries, Étude de faisabilité<br>- **Bouton Principal (ex: Book a Demo):** "Parler à un expert" (Ancre vers #contact) |
| **Hero Section** | - **Vidéo de fond:** Vidéo Hero uLog ou uClean (`https://res.cloudinary.com/df1x718yw/video/upload/v1782758795/ULog_tlu9tt.mp4` ou `https://res.cloudinary.com/df1x718yw/video/upload/v1782758788/uClean_hsvmvx.mp4`)<br>- **Slogan principal:** "Libérer le potentiel humain par la robotique."<br>- **Sous-titre:** "L'automatisation intelligente au service de votre croissance."<br>- **4 Vignettes Interactives (Bas de Hero):** uClean (Nettoyage), uLog (Logistique), uServe (Accueil), uLab Mobile (Laboratoire) |
| **Bandeau Mission / Accroche** | - **Texte:** Partenaire de distribution et d'intégration des solutions United Robotics Group en France. Déployons l'automatisation pour recentrer vos équipes sur l'essentiel. |
| **Benchmark / Métriques** | - **SLA:** 99.4% de disponibilité<br>- **Déploiement:** 100+ robots de service en exploitation<br>- **Couverture:** 4 secteurs clés d'expertise |
| **Démonstrateur d'applications (Carrousel)** | Mapper sur nos 4 secteurs avec les vidéos à lancer :<br>1. **Retail & Food:** `https://res.cloudinary.com/df1x718yw/video/upload/v1783460477/uClean_Compact_-_Use_case_KFC_Venise_pbnpdk.mp4`<br>2. **Hôtellerie / Restaurant:** `https://res.cloudinary.com/df1x718yw/video/upload/v1783504966/Plato_%C3%A0_l_Henriette_Restaurant_VO_FR_Sous-titres_en_fran%C3%A7ais_zo3d1o.mp4`<br>3. **Santé / Nettoyage:** `https://res.cloudinary.com/df1x718yw/video/upload/v1782758788/uClean_hsvmvx.mp4`<br>4. **Logistique / Entrepôt:** `https://res.cloudinary.com/df1x718yw/video/upload/v1782758795/ULog_tlu9tt.mp4` |
| **Section "Gap Industriel" / Problématique** | - **Thèmes à aborder:** Pénurie de personnel, tâches pénibles (TMS), déplacements à faible valeur ajoutée, difficultés de recrutement. <br>- **Message clé:** La robotique ne remplace pas l'humain, elle l'assiste en absorbant les tâches répétitives pour libérer du temps opérationnel. |
| **Grille Hardware Produits** | Catalogue des 4 gammes (uClean, uLog, uServe, uLab) formatées avec 3 tags techniques par carte (voir structure JSON section 5).<br>- **CTA par produit:** "Estimer le ROI" (sauf uLab) / "Voir la gamme" |
| **Calculateur ROI interactif** | Utiliser les ancres et hypothèses du ROI Phoenix-botics (Section 6) :<br>- uClean: m² / jour (Base 400m²/h, 20€/h)<br>- uLog: transferts / jour (Base 15min/transfert, 20€/h)<br>- uServe: déplacements / jour (Base 8min/déplacement, 20€/h)<br>- *Note: Pas de simulateur pour uLab.* |
| **Preuves de terrain, Témoignages & Logos** | - **Logos Partenaires:** Utiliser la liste existante (Section 8) avec Carrefour, Geodis, Sodexo, Airbus, etc.<br>- **Bandeau de réassurance:** "Solutions certifiées & déployées sur le terrain" (Intégrer les ProofBlocks: 'Spécification constructeur', 'Estimation indicative', 'Résultat client') |
| **Formulaire de simulation / Lead capture** | - **Titre:** "Recevoir ma recommandation" ou "Demander une étude de site"<br>- **Champs clés:** Secteur d'activité, Surface/Flux, Coordonnées professionnelles.<br>- **Disclaimer:** "Estimation indicative calculée sur la base de vos paramètres. Une étude de site permet de valider..." |
| **Footer** | - **Liens:** Mentions Légales, Politique de Confidentialité, Contact.<br>- **Copyright:** © 2026 Phoenix-Botics. Partenaire URG.<br>- **Mention:** ISO 10218-1 Compliant (selon la maquette) |

## 2. Arborescence & Cartographie complète du Site

Voici la structure des routes du site Phoenix-Botics, issue de `src/App.tsx` et des pages associées.

| Route / Path | Composant Principal (Page) | Rôle de la Page | H1 Principal (ou titre Hero) |
| :--- | :--- | :--- | :--- |
| `/` | `HomePage` (`App.tsx`) | Page d'accueil vitrine (Hero, Industries, Catalogue, Vidéo, Services, Process, Contact). | "Libérer le potentiel humain par la robotique." |
| `/robots/:seriesId` | `RobotSeriesPage` | Page de détail d'une gamme de robots (uClean, uLog, uServe, uLab Mobile). Affiche les modèles, specs, simulateur ROI (sauf uLab). | *Dynamique selon gamme (ex: "Gamme uClean")* |
| `/industries/:industryId` | `IndustryPage` | Page détaillée d'un secteur (Retail, Hôtellerie, Santé, Industrie). Affiche les cas d'usage, le flux de préqualification. | *Dynamique selon secteur (ex: "Robotique pour le Retail")* |
| `/technologie` | `TechnologyPage` | Page de présentation des technologies (navigation, capteurs). | "Notre Technologie" (à vérifier) |
| `/a-propos` | `AboutPage` | Page de présentation de l'entreprise Phoenix-Botics, son équipe et son ADN. | "À Propos de Phoenix-Botics" (à vérifier) |
| `/services` | `ServicesPage` | Page détaillant l'offre de services, maintenance et déploiement. | "Nos Services & Accompagnement" (à vérifier) |
| `/*` | `NotFoundPage` | Page 404 standard. | "Page introuvable" (à vérifier) |

## 3. Inventaire Média Exhaustif

Liste complète de tous les médias Cloudinary utilisés dans la base de code Phoenix-botics, extraite depuis les données, composants et pages.

### Vidéos (.mp4)
- **uClean Hero/Intro:** `https://res.cloudinary.com/df1x718yw/video/upload/v1782758788/uClean_hsvmvx.mp4`
- **uLog Hero/Intro:** `https://res.cloudinary.com/df1x718yw/video/upload/v1782758795/ULog_tlu9tt.mp4`
- **uClean Cas d'Usage (KFC Venise):** `https://res.cloudinary.com/df1x718yw/video/upload/v1783460477/uClean_Compact_-_Use_case_KFC_Venise_pbnpdk.mp4`
- **uServe Cas d'Usage (Plato à l'Henriette):** `https://res.cloudinary.com/df1x718yw/video/upload/v1783504966/Plato_%C3%A0_l_Henriette_Restaurant_VO_FR_Sous-titres_en_fran%C3%A7ais_zo3d1o.mp4`
- **uServe Cas d'Usage (Kili Beach):** `https://res.cloudinary.com/df1x718yw/video/upload/v1783504963/uServe_en_Action___Le_Retour_d_Exp%C3%A9rience_du_Kili_Beach_u8ykj6.mp4`
- **Démo AQN 1:** `https://res.cloudinary.com/df1x718yw/video/upload/v1783504930/AQN186O-b3MNcwG13bVdWBzkfIni-dlAw80J18tUykayxG8VZKE1waTNjDuZTbzk00HagIEaJNOxJPn33Zegc2JhlmtV5wVKNSs_m50ixj.mp4`
- **Démo AQN 2:** `https://res.cloudinary.com/df1x718yw/video/upload/v1783504948/AQN6nSJ8lH-1Rcr_yTkG4FwArxweFvyz1k6ApifEXQnEpn-rUhW-00k1WFoS0y3eBzpJLpychG4ZOW7U4SGmxPcoqGEyR8MfMzA_rnjzhs.mp4`

### Images Gammes et Robots Détourés (.png / .webp / .jpg)
- **uClean Scrub 75:** `https://res.cloudinary.com/df1x718yw/image/upload/v1782745753/Scrub75_cyuy2d.png`
- **uClean Scrub 50 Disc:** `https://res.cloudinary.com/df1x718yw/image/upload/v1782745593/Scrub50Disc_iwqmbf.png`
- **uClean Scrub 50 Roller:** `https://res.cloudinary.com/df1x718yw/image/upload/v1782745734/Scrub50Roller_iqgbqn.png`
- **uClean Compact:** `https://res.cloudinary.com/df1x718yw/image/upload/v1782745472/Compact_wyrf5v.png`
- **uClean Vacuum 40:** `https://res.cloudinary.com/df1x718yw/image/upload/v1782745773/Vacuum40_xhxlps.png`
- **uClean Visuel (Généré):** `https://res.cloudinary.com/df1x718yw/image/upload/v1793705586/Gemini_Generated_Image_tnr3t6tnr3t6tnr3_nhjogh.jpg`
- **uLog Lift 600:** `https://res.cloudinary.com/df1x718yw/image/upload/v1782747964/uLogLIFT600_URGlogo_01_face_xgxuh0.png`
- **uLog Lift 600 Base / 300 XL:** `https://res.cloudinary.com/df1x718yw/image/upload/v1782747963/uLogLIFT600BASE_LIFT300XL_URGlogo_01_uv1lwf.png`
- **uLog Deliver 300 / 300 XL:** `https://res.cloudinary.com/df1x718yw/image/upload/v1782747948/uLogDELIVER300_URGlogo_01_face_pihxaa.png`, `https://res.cloudinary.com/df1x718yw/image/upload/v1782747951/uLogDELIVER300XL_LIFT300XL_URGlogo_01_face_m95qag.png`
- **uLog Deliver 150:** `https://res.cloudinary.com/df1x718yw/image/upload/v1782747959/uLogDELIVER150_URGlogo_01_face_Box_Admin_tprnbn.png`
- **uLog Deliver 80:** `https://res.cloudinary.com/df1x718yw/image/upload/v1782747971/uLogDELIVER80_URGlogo_01_face_ktme3v.png`
- **uLog Visuel Panoramique (Généré):** `https://res.cloudinary.com/df1x718yw/image/upload/v1794219645/Gemini_Generated_Image_cxpg34cxpg34cxpg_leiybf.jpg`
- **uServe:** `https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png`
- **uLab Mobile:** `https://res.cloudinary.com/df1x718yw/image/upload/v1793705292/20a60af5-4139-430a-b193-c89c8ce08f73_ckcv71.webp`

### Images Cas d'Usage, Secteurs et Services (.png / .jpg)
- **Retail & Commerce:** `https://res.cloudinary.com/df1x718yw/image/upload/v1786706254/ChatGPT_Image_14_ao%C3%BBt_2026_13_14_25_hbto5m.png`
- **Hôtellerie & Restauration:** `https://res.cloudinary.com/df1x718yw/image/upload/v1784567142/ChatGPT_Image_20_juil._2026_19_03_52_azmgk0.png`
- **Santé & Médical:** `https://res.cloudinary.com/df1x718yw/image/upload/v1786449000/ChatGPT_Image_11_ao%C3%BBt_2026_13_48_55_bhfnwm.png`
- **Logistique & Industrie:** `https://res.cloudinary.com/df1x718yw/image/upload/v1786019271/ChatGPT_Image_6_ao%C3%BBt_2026_14_27_13_myx8mn.png`
- **Divers Cas / Services:**
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1783684832/ChatGPT_Image_10_juil._2026_13_56_40_bm8sbx.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1783684833/uClean_Compact_-_H%C3%B4pital_ay0pxa.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1783684834/ChatGPT_Image_10_juil._2026_13_49_37_zzk9ba.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1783684835/ChatGPT_Image_10_juil._2026_13_20_41_h38epx.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1785153876/ChatGPT_Image_27_juil._2026_14_03_53_pqkzw7.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1785324418/ChatGPT_Image_28_juil._2026_13_22_38_zqkyx1.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1785324422/ChatGPT_Image_28_juil._2026_13_45_43_d6fm1m.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1785933725/Gemini_Generated_Image_ncnba4ncnba4ncnb_tmywdz.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1785933751/Gemini_Generated_Image_ehix26ehix26ehix_vcxjhs.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1785933757/ChatGPT_Image_5_ao%C3%BBt_2026_14_12_02_glwn9v.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1786443278/Gemini_Generated_Image_e0xc1ke0xc1ke0xc_n0quzz.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1786443283/Gemini_Generated_Image_vqi2bwvqi2bwvqi2_obkh6h.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1786443284/Gemini_Generated_Image_xao0i0xao0i0xao0_hbe4v6.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1786538785/ChatGPT_Image_12_ao%C3%BBt_2026_14_20_10_chhifv.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1786538787/ChatGPT_Image_12_ao%C3%BBt_2026_14_44_30_vo5p1c.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1786538828/ChatGPT_Image_12_ao%C3%BBt_2026_14_33_42_tnmnoc.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1788439746/ChatGPT_Image_3_sept._2026_14_47_24_khevxq.png`
  - `https://res.cloudinary.com/df1x718yw/image/upload/v1788866233/ChatGPT_Image_8_sept._2026_11_48_19_kvssfw.png`

## 4. Identité & Accroches Globales

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

## 5. Les 4 Gammes de Robots

Voici la structure JSON demandée pour la section des robots afin de faciliter l'intégration via un LLM :

```json
[
  {
    "id": "range-uclean",
    "title": "uClean",
    "subtitle": "Nettoyage & Propreté Autonome",
    "tagline": "Autolaveuses et aspirateurs industriels autonomes pour grandes surfaces et espaces exigus.",
    "stat_1": "RENDEMENT : 3 000 m²/h",
    "stat_2": "VITESSE : 1.2 m/s",
    "stat_3": "MODÈLES : Scrub 75, 50, Vacuum 40",
    "image_url": "https://res.cloudinary.com/df1x718yw/image/upload/v1793705586/Gemini_Generated_Image_tnr3t6tnr3t6tnr3_nhjogh.jpg"
  },
  {
    "id": "range-ulog",
    "title": "uLog",
    "subtitle": "Intralogistique & Manutention AMR",
    "tagline": "Robots mobiles autonomes de levage et de livraison pour ateliers, entrepôts et santé.",
    "stat_1": "CHARGE UTILE : Jusqu'à 600 kg",
    "stat_2": "PRÉCISION : ±5 mm",
    "stat_3": "AUTONOMIE : 10 h",
    "image_url": "https://res.cloudinary.com/df1x718yw/image/upload/v1794219645/Gemini_Generated_Image_cxpg34cxpg34cxpg_leiybf.jpg"
  },
  {
    "id": "range-userve",
    "title": "uServe",
    "subtitle": "Accueil, Orientation & Service Interactif",
    "tagline": "Assistant cobotique d'orientation et de guidage interactif pour établissements ouverts au public.",
    "stat_1": "CHARGE : 40 kg (4 plateaux)",
    "stat_2": "PASSAGE MIN : 65 cm",
    "stat_3": "LANGUES : 20+ langues",
    "image_url": "https://res.cloudinary.com/df1x718yw/image/upload/v1782748309/uServe_URGlogo_02_face-mirror_cc_1_ayohed.png"
  },
  {
    "id": "ulab-series",
    "title": "uLab Mobile",
    "subtitle": "L'automatisation des laboratoires",
    "tagline": "Automatisez le transport de tubes et de portoirs entre vos postes.",
    "stat_1": "BRAS : Cobot 7 axes",
    "stat_2": "PRÉCISION : ±0.1 mm",
    "stat_3": "WORKFLOW : Tubes, portoirs & analyseurs",
    "image_url": "https://res.cloudinary.com/df1x718yw/image/upload/v1793705292/20a60af5-4139-430a-b193-c89c8ce08f73_ckcv71.webp"
  }
]
```

### Autres Images Associées (Gammes)
- **uClean Scrub 50 Disc :** `https://res.cloudinary.com/df1x718yw/image/upload/v1782745593/Scrub50Disc_iwqmbf.png`
- **uClean Compact :** `https://res.cloudinary.com/df1x718yw/image/upload/v1782745472/Compact_wyrf5v.png`
- **uLog Deliver 150 :** `https://res.cloudinary.com/df1x718yw/image/upload/v1782747959/uLogDELIVER150_URGlogo_01_face_Box_Admin_tprnbn.png`
- **uLog Deliver 80 :** `https://res.cloudinary.com/df1x718yw/image/upload/v1782747971/uLogDELIVER80_URGlogo_01_face_ktme3v.png`

## 6. Simulateurs de Rentabilité (ROI)

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

## 7. Secteurs d'Activité & Applications Métier

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

## 8. Logos Partenaires & Réassurance

**Slogan Slider :** SOLUTIONS CERTIFIÉES & DÉPLOYÉES SUR LE TERRAIN

- **GEODIS** (Texte formaté : `font-display font-black tracking-[0.2em] text-slate-700 italic`)
- **Carrefour** : `https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrefour_logo.svg`
- **SODEXO** (Texte formaté : `font-sans font-bold tracking-widest text-slate-500`)
- **Decathlon** : `https://upload.wikimedia.org/wikipedia/commons/a/a9/Decathlon_Logo.svg`
- **AIRBUS** (Texte formaté : `font-sans font-medium tracking-[0.3em] text-slate-600`)
- **ACCOR** (Texte formaté : `font-serif font-light tracking-[0.25em] text-slate-500 italic`)
- **BOLLORÉ** (Texte formaté : `font-mono font-bold tracking-widest text-slate-700`)
- **Alstom** : `https://upload.wikimedia.org/wikipedia/commons/1/1a/Alstom_logo.svg`