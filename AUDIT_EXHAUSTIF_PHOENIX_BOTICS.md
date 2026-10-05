# AUDIT D'INVENTAIRE COMPLET & FACTUEL DU SITE PHOENIX-BOTICS4

**Date de réalisation :** Mars 2026
**Auteur :** Jules, Ingénieur Principal & Consultant Intégration Robota/B2B
**Projet :** Phoenix-Botics4 (Plateforme B2B d'intégration cobotique et robotique mobile autonome AMR)
**Positionnement de marque :** Partenaire de distribution et d'intégration des solutions United Robotics Group (URG) en France
**Statut du document :** Feuille de route officielle et référence d'architecture pour les chantiers d'amélioration ultérieurs

---

## TABLE DES MATIÈRES
1. [Cartographie Globale du Site](#1-cartographie-globale-du-site)
2. [Décomposition Page par Page & Composants Mutualisés](#2-décomposition-page-par-page--composants-mutualisés)
   - [2.1 Structure du composant modèle RobotSeriesPage.tsx](#21-structure-du-composant-modèle-robotseriespagetsx)
   - [2.2 Structure du composant modèle IndustryPage.tsx](#22-structure-du-composant-modèle-industrypagetsx)
   - [2.3 Tableau synthétique par Route Dynamique](#23-tableau-synthétique-par-route-dynamique)
   - [2.4 Analyse détaillée des Pages Statiques (Home, Technologie, À Propos, Services)](#24-analyse-détaillée-des-pages-statiques)
3. [Audit Copywriting & Alignement Éditorial B2B](#3-audit-copywriting--alignement-éditorial-b2b)
4. [Audit SEO Sémantique & Mots-Clés Métier](#4-audit-seo-sémantique--mots-clés-métier)
5. [Audit Responsive & Analyse Visuelle Multi-Viewports](#5-audit-responsive--analyse-visuelle-multi-viewports)
6. [Focus Particulier sur la Page d'Accueil (Home)](#6-focus-particulier-sur-la-page-daccueil-home)
7. [Assets, Logos, Médias & Cohérence Visuelle](#7-assets-logos-médias--cohérence-visuelle)
8. [Synthèse Finale & Priorités d'Amélioration](#8-synthèse-finale--priorités-damélioration)

---

## 1. CARTOGRAPHIE GLOBALE DU SITE

Le site est structuré sous **React 19**, **React Router DOM v7**, **Tailwind CSS v4** et animé via **Motion**. La navigation globale est orchestrée par le composant racine `src/App.tsx`.

### Liste Exhaustive des Routes Réelles Détectées

| Route URL | Composant Principal (`src/pages/` ou `src/`) | Rôle dans le Parcours Utilisateur & Niveau dans le Tunnel |
| :--- | :--- | :--- |
| `/` | `HomePage` (`App.tsx`) | **Point d'entrée principal (cold traffic) :** Positionne Phoenix-Botics comme intégrateur B2B premium URG. oriente vers les gammes, les secteurs et la prise de contact. |
| `/robots/:seriesId` | `RobotSeriesPage.tsx` | **Pages de Gammes Produits (3 déclinaisons) :** Présentation technique immersive, spécifications modèles, simulateur ROI, FAQ de service et formulaire B2B dédié. |
| `/robots/uclean-series` | `RobotSeriesPage.tsx` (données uClean) | Gamme Autolaveuses et Aspirateurs Autonomes (uClean Compact, Vacuum 40, Scrub 50 Disc/Roller, Scrub 75). |
| `/robots/ulog-series` | `RobotSeriesPage.tsx` (données uLog) | Gamme Robots Mobiles Autonomes AMR (uLog Deliver 80/150/300/300-XL, uLog Lift 300 Base/300-XL/600 Base/600). |
| `/robots/userve-series` | `RobotSeriesPage.tsx` (données uServe) | Gamme Robots d'Accueil, de Service en salle et de Guidage (uServe). |
| `/industries/:industryId` | `IndustryPage.tsx` | **Pages Verticales Métier (4 déclinaisons) :** Prédiagnostic / Prequalification technique in situ, carrousel de flotte recommandé et étude de faisabilité. |
| `/industries/retail` | `IndustryPage.tsx` (`retailConfig`) | Secteur Retail, Grande Distribution & Commerce. |
| `/industries/hospitality` | `IndustryPage.tsx` (`hospitalityConfig`) | Secteur Hôtellerie, Restauration & Service en salle. |
| `/industries/health` | `IndustryPage.tsx` (`healthConfig`) | Secteur Santé, Cliniques, EHPAD & Intralogistique Hospitalière. |
| `/industries/industry` | `IndustryPage.tsx` (`industryConfig`) | Secteur Industrie Légère, Usines & Entrepôts Logistiques. |
| `/technologie` | `TechnologyPage.tsx` | **Réassurance B2B & DSI :** Explication des briques technologiques (SLAM 3D, IoT ascenseurs, sécurité ISO 3691-4, APIs WMS/ERP). |
| `/a-propos` | `AboutPage.tsx` | **Crédibilité & Modèle d'Alliance :** Explication de la synergie R&D United Robotics Group × Ingénierie de proximité Phoenix-Botics France. |
| `/services` | `ServicesPage.tsx` | **Catalogue d'Ingénierie :** Décomposition des 4 services (Audit/Intégration, Test/Location, Maintenance/MCO, Sur-Mesure). |
| `*` (404) | `NotFoundPage.tsx` | **Gestion d'erreur :** Redirection propre vers la page d'accueil ou les gammes robots. |

---

## 2. DÉCOMPOSITION PAGE PAR PAGE & COMPOSANTS MUTUALISÉS

### 2.1 Structure du Composant Modèle `RobotSeriesPage.tsx`

Toutes les routes `/robots/:seriesId` partagent le même composant d'ingénierie `RobotSeriesPage.tsx`, nourri dynamiquement par `src/data/robotSeries.ts`.

#### Ordre Exact des Sections (10 Blocs) :
1. **Header B2B Mega Menu (`Header.tsx`) :** Fixe/sticky, mega-menu centré avec sélecteur d'industries `#prequalification`.
2. **Hero Immorsif avec Vidéo / Arrière-plan (`Hero`) :**
   - Vidéo MP4 native sur uClean et uLog (`uClean_hsvmvx.mp4`, `ULog_tlu9tt.mp4`), fallback image sur uServe.
   - Titre principal H1 h1-bold + sous-titre H2 + CTAs : `Parler à un expert` (`#contact`) et `Voir les modèles` (`#modeles`).
3. **Contexte Terrain & Défis Opérationnels (`// CONTEXTE TERRAIN`) :**
   - Grille 2 colonnes : Titre H2 + 3 cartes de défis d'exploitation (Recrutement, Régularité, Valorisation agents).
4. **Chiffres Clés & KPIs de Gamme :**
   - Bandeau 4 métriques avec compas d'animation `CounterNumber` (Rendement m²/h, Autonomie, Économie d'eau/charge, Filtration HEPA / Précision).
5. **Bénéfices Clés — Style Ingénierie Industrie :**
   - Section 3 colonnes épurées avec numérotation `BÉNÉFICE 01.`, `02.`, `03.`.
6. **Anatomie & Spécifications Catalogue (`#modeles`) :**
   - Découpage par cartes produits interactives (Image à gauche, fiches techniques à droite).
   - Bouton `Demander une étude de site` (remplit `modelInterest` et défile vers `#contact`) + Bouton `Télécharger la brochure technique` (Modal Lead PDF).
7. **Simulateur ROI Interactif :**
   - Slider paramétrique (Surface/m², Transferts/jour ou Heures/jour) avec calcul instantané des heures libérées et économies indicatives en €.
   - Sélecteur de secteur et CTA `Vérifier la faisabilité sur mon site` (redirection vers `/industries/[sector]#prequalification`).
8. **Applications Sectorielles (Preuve d'usage) :**
   - Grille de 4 cartes immersives sur fond sombre avec dégradé et CTA d'échange expert.
9. **Méthodologie Phoenix-Botics (Timeline 4 Phases) :**
   - Timeline horizontale desktop / verticale mobile : `01. Audit`, `02. Cartographie`, `03. Déploiement`, `04. Supervision 24/7`.
10. **FAQ de Service (Accordéon) & Formulaire de Contact Flottant (`#contact`) :**
    - Accordéon avec icônes Plus/Moins.
    - Carte flottante bleu nuit `#0B1121` intégrant le formulaire de demande d'étude.
11. **Bandeau Sticky de Conversion Bas d'Écran (`Sticky Banner`) :**
    - Déclenché au-delà de 400px de scroll avec numéro de ligne directe B2B et CTA rapide `Parler à un expert`.

---

### 2.2 Structure du Composant Modèle `IndustryPage.tsx`

Toutes les routes `/industries/:industryId` partagent le composant `IndustryPage.tsx` / `SectorView`, configuré par 4 structures d'objets (`hospitalityConfig`, `retailConfig`, `healthConfig`, `industryConfig`).

#### Ordre Exact des Sections (8 Blocs Stricts) :
1. **Header B2B (`Header.tsx`)**
2. **Hero Sectoriel (Bloc 1) :**
   - Grand visuel d'application 75vh, badge secteur, titre H1 percutant, CTA `Parler à un expert` (`#contact`).
3. **Les Défis Métier (Bloc 2 - `#defis`) :**
   - Fond d'arrière-plan architectural `#faf7f2`. 4 cartes de irritants opérationnels.
4. **Chiffres Clés Sectoriels (Bloc 3 - `#chiffres`) :**
   - 4 métriques avec animation de compteurs `AnimatedNumber` encadrées dans une carte à bordure orange.
5. **Vos Avantages Concurrentiels (Bloc 4 - `#benefices`) :**
   - 3 bénéfices stratégiques structurés en 3 colonnes numérotées.
6. **Cas d'Usage en Situation (Bloc 5 - `#fonctionnalites`) :**
   - **Desktop (>= 1024px) :** Effet Sticky Scroll avec `IntersectionObserver` (image de fond fixe à gauche, cartes défilantes à droite).
   - **Mobile (< 1024px) :** Cartes verticales immersives format 4/3 avec fondu et badges.
7. **Caractéristiques Techniques & Ingénierie (Bloc 6 - `#ingenierie`) :**
   - Fond `#f7f4ef`, 4 cartes d'ingénierie (SLAM, Sécurité ISO, IoT, Flotte).
8. **Module de Prequalification Technique (`PrequalificationFlow`) (`#prequalification`) :**
   - Questionnaire interactif multi-étapes (Besoins primaires multi-sélection, contraintes site mono-sélection).
   - Génération du diagnostic d'éligibilité et recommandation de flotte.
9. **Flotte Idéale Recommandée (`FleetCarousel`) (`#robots-secteur`) :**
   - Carrousel filtrable par onglets. Les robots recommandés reçoivent le badge `Recommandé pour votre sélection` et basculent en tête de carrousel.
10. **Formulaire de Contact centralisé (`ContactForm`) (`#contact`) & Footer (`Footer.tsx`).**

---

### 2.3 Tableau Synthétique par Route Dynamique

| Route URL | H1 Principal Visible | Promesse Marketing Majeure | CTA Principaux | Spécificités & Interactions Clés |
| :--- | :--- | :--- | :--- | :--- |
| `/robots/uclean-series` | *Automatisez le nettoyage de vos espaces professionnels.* | Hygiène autonome constante, traçable et réduction de 50% de la pénibilité. | `Parler à un expert`, `Voir les modèles`, `Brochure PDF`, `Simuler ROI` | Vidéo MP4 native en Hero, Slider ROI m², 5 modèles (Compact à Scrub 75). |
| `/robots/ulog-series` | *Fluidifiez vos flux logistiques sans réorganiser vos sites.* | Intralogistique AMR de 80 kg à 600 kg sans marquage au sol ni travaux. | `Parler à un expert`, `Voir les modèles`, `Brochure PDF`, `Vérifier faisabilité` | Vidéo MP4 native en Hero, Slider ROI transferts, 8 modèles (Deliver & Lift). |
| `/robots/userve-series` | *Améliorez l’accueil et l’expérience client grâce à la robotique.* | Accueil haut de gamme 24/7, guidage interactif et service de table 4 plateaux. | `Parler à un expert`, `Voir les modèles`, `Brochure PDF` | Visuel HD, Slider ROI heures d'accueil, modèle uServe (15,6'' HD). |
| `/industries/retail` | *Le futur du Retail, par la robotique.* | Optimisation de l'expérience client en rayon et propreté continue des allées. | `Parler à un expert`, `Prédiagnostic`, `Demander étude` | Questionnaire préqualification Retail, carrousel uServe + uClean. |
| `/industries/hospitality` | *L'excellence du service, par la robotique.* | Rationalisation du débarrassage en salle et du room-service 24/7. | `Parler à un expert`, `Prédiagnostic`, `Demander étude` | Sticky scroll cas d'usage (plonge, room-service), carrousel uServe + uClean. |
| `/industries/health` | *L'excellence des soins, par la robotique.* | Sécurisation de l'intralogistique hospitalière et bionettoyage traçable. | `Parler à un expert`, `Prédiagnostic`, `Demander étude` | Prédiagnostic transport médical, carrousel uServe, uClean + uLog Deliver/Lift. |
| `/industries/industry` | *La performance industrielle, par la robotique.* | Approvisionnement continu des lignes de production et manutention lourde 600 kg. | `Parler à un expert`, `Prédiagnostic`, `Demander étude` | Prédiagnostic charges lourd, carrousel uLog (8 modèles) + uClean Scrub 75. |

---

### 2.4 Analyse Détaillée des Pages Statiques

#### A. Page d'Accueil (`HomePage` dans `App.tsx`)
- **Ordre des Sections :**
  1. `Header` (Sticky Mega Menu).
  2. `Hero` (Arrière-plan sombre `#0a0f1c`, titre H1, boutons CTAs `Découvrir nos solutions` -> `#robots-catalog` et `Demander une démonstration` -> `#contact`).
  3. `LogoSliderSection` (Slider défilant infini des logos partenaires URG/SoftBank/Aldebaran/Robotnik).
  4. `IndustriesSection` (Grille des 4 secteurs d'activité avec cartes interactives et métriques d'efficacité).
  5. `RobotsCatalogSection` (Présentation des 3 grandes gammes uClean, uServe, uLog avec onglets filtrables).
  6. `RobotInActionSection` (Mise en avant vidéo/visuelle des robots en opération).
  7. `ServicesKargoSection` (Présentation des 4 piliers de services Phoenix-Botics).
  8. `ProcessSection` (Méthodologie en 4 étapes : Audit, POC, Déploiement, Support).
  9. `FinalContactSection` (Formulaire de contact B2B global).
  10. `Footer` (Pied de page institutionnel).

#### B. Page Technologie (`TechnologyPage.tsx`)
- **Promesse :** L'ingénierie autonome sans modification d'infrastructure.
- **Ordre des Sections :**
  1. Hero Technique sur fond sombre avec visuel d'interface d'orchestration.
  2. Les 4 Piliers (SLAM LiDAR 3D, Vision 3D/Sécurité, Ascenseurs/Portes IoT, Fleet RCS/WMS).
  3. Schéma d'Architecture Système (Cobots Edge -> Passerelle IoT -> SI Client WMS/ERP/MES).
  4. Sécurité Industrielle & Normes (Directives Machines 2006/42, ISO 3691-4, CEM, RED, RGPD).
  5. FAQ Technique & DSI (Accordéon).
  6. Formulaire d'Étude de Faisabilité Technique (`#contact`).

#### C. Page À Propos (`AboutPage.tsx`)
- **Promesse :** L'excellence robotique européenne, dédiée au marché français.
- **Ordre des Sections :**
  1. Hero Institutionnel mettant en avant l'Alliance URG × Phoenix-Botics.
  2. Storytelling des Deux Forces (R&D United Robotics Group + Intégration terrain Phoenix-Botics France).
  3. Bento Grid Réassurance (Intervention < 48h, Stock central Paris, Souveraineté RGPD, 99.4% disponibilité).
  4. Retours d'Expérience & Preuves Sectorielles (3PL, Santé, Usines, Retail).
  5. Formulaire de Contact Institutionnel & Direction (`#contact`).

#### D. Page Services (`ServicesPage.tsx`)
- **Promesse :** Vos robots, intégrés et suivis de bout en bout.
- **Ordre des Sections :**
  1. Hero Services avec visuel d'ingénieurs sur le terrain.
  2. Pourquoi Choisir Phoenix-Botics ? (4 piliers : Expertise, Accompagnement humain, Offre modulaire, Confiance).
  3. Accompagnement 360° (Sticky Scroll Split-Screen : Étude/Intégration, Location/POC, Maintenance/MCO, Sur-Mesure).
  4. FAQ de Service (Accordéon).
  5. Formulaire B2B d'Étude de Service (`#contact`).

---

## 3. AUDIT COPYWRITING & ALIGNEMENT ÉDITORIAL B2B

### Diagnostic Global du Ton et du Positionnement
Le ton général est **très professionnel, crédible et orienté ingénierie/intégration**. Il évite l'écueil du vocabulaire gadgets "AI" ou "sci-fi" prohibé. La promesse de Phoenix-Botics en tant qu'intégrateur français adossé au fabricant URG est clairement affirmée.

### Points Forts Éditoriaux
1. **Vocabulaire Métier Précis :** Emploi rigoureux des termes techniques (*AMR, SLAM LiDAR 3D, ISO 3691-4, WMS/ERP, TMS, bio-nettoyage, filtration HEPA H13*).
2. **Orienté Résultat Métier :** Les accroches mettent l'accent sur les gains opérationnels (*réduction de la pénibilité, disponibilité 24/7, temps soignant/client libéré, zéro modification de site*).
3. **Structure des Promesses :** Bonne hiérarchie avec des sous-titres qui explicitent la valeur ajoutée concrète.

### Incohérences Éditoriales & Formulations à Corriger

| Emplacement / Page | Formulation Actuelle | Diagnostic / Problème | Recommandation de Correction Éditoriale |
| :--- | :--- | :--- | :--- |
| **Home (Hero)** | *"Intégrateur expert de cobots et robots autonomes en France."* | Un peu court et générique pour capter le décideur froid en 3 secondes. | *"Intégrateur B2B de Robots Mobiles Autonomes (AMR) & Cobots de Service en France."* |
| **Data Générale (`data.ts`)** | *"Navettes Spatiales Autonomes de Transfert Interne"* (catégorie logistics) | **Formulation sci-fi / gadget** contraire à la charte Swiss/Industrielle. | Remplacer par : *"Navettes Autonomes AMR de Transfert Intralogistique"*. |
| **Page Robot Series (uLog)** | *"Le summum de la manutention autonome intelligente"* (Titre uLog Lift 600) | Formulation légèrement hyperbolique / "startup pitch". | Remplacer par : *"AMR à forte capacité de levage pour palettes industrielles (600 kg)"*. |
| **Home (Services Section)** | *"Nos Services & Accompagnement"* | Titre trop neutre, manque d'accroche résultat. | Remplacer par : *"Ingénierie, Déploiement & Maintien en Conditions Opérationnelles"*. |
| **Home (Process Section)** | *"Notre Méthodologie & Processus"* | Titre classique et peu engageant. | Remplacer par : *"De l'Audit In Situ à la Performance Opérationnelle : Notre Méthodologie"*. |
| **Page Services** | *"Une offre qui évolue au rythme de vos ambitions."* | Formulation légèrement vague / marketing générique. | Remplacer par : *"Des prestations d'ingénierie adaptées au cycle de vie de votre flotte"*. |

---

## 4. AUDIT SEO SÉMANTIQUE & MOTS-CLÉS MÉTIER

### Balisage HTML & Métadonnées
- **Meta Title & Description :** Chaque page utilise le hook `usePageMeta` pour injecter dynamiquement un `<title>` et une `<meta name="description">` personnalisés et uniques.
- **Structure H1/H2/H3 :**
  - Chaque page possède **exactement un seul `<h1>`** situé dans sa section Hero.
  - La hiérarchie des `<h2>` et `<h3>` respecte la logique sémantique.

### Matrice d'Exploitation des Expressions Clés B2B

| Expression Clé Marché | Présence Effective sur le Site | Qualité d'Intégration & Pertinence Sémantique | Recommandations d'Optimisation SEO |
| :--- | :---: | :--- | :--- |
| **robotique mobile** | **OUI** | Excellente (présente en Meta Title Home, Hero, About). | Conserver et renforcer dans le maillage interne. |
| **AMR** | **OUI** | Excellente (utilisée sur Home, uLog, Technologie). | Associer systématiquement à *"Autonomous Mobile Robot"*. |
| **cobotique** | **OUI** | Très bonne (présente sur Restauration, Services, About). | Étendre à l'assistance physique des agents de propreté. |
| **automatisation** | **OUI** | Excellente (présente sur toutes les pages). | Associer aux expressions *"automatisation des flux internes"*. |
| **intralogistique** | **OUI** | Excellente (cœur de la page uLog et Industrie). | Mailler avec *"intralogistique hospitalière"* et *"industrielle"*. |
| **autolaveuse autonome** | **OUI** | Très bonne (page uClean). | Créer des ancres textuelles sur *"autolaveuse robotisée industrielle"*. |
| **robot d'accueil** | **OUI** | Bonne (page uServe et Retail). | Renforcer le terme *"robot d'accueil interactif B2B"*. |
| **robot de service** | **OUI** | Très bonne (page uServe et Hôtellerie). | Préciser *"robot de service de table et room-service"*. |
| **étude de faisabilité** | **OUI** | Excellente (formulaires, prédiagnostic, Technologie). | Ancre prioritaire pour la conversion. |
| **intégrateur robotique**| **OUI** | Excellente (positionnement de marque principal). | Renforcer *"intégrateur AMR France"*. |
| **logistique hospitalière**| **OUI** | Excellente (page Santé et uLog Deliver). | Très bonne traçabilité sémantique. |
| **logistique industrielle**| **OUI** | Excellente (page Industrie et uLog Lift). | Très bon ciblage 3PL / Usines. |
| **nettoyage autonome** | **OUI** | Excellente (page uClean). | Associer à *"nettoyage autonome des grandes surfaces"*. |
| **maintenance / MCO** | **OUI** | Très bonne (page Services et About). | Intégrer l'expression *"maintien en conditions opérationnelles"*. |

---

## 5. AUDIT RESPONSIVE & ANALYSE VISUELLE MULTI-VIEWPORTS

L'audit responsive a été réalisé sur la base d'une **revue de code technique des grilles/breakpoints Tailwind** et validé par un **script automatisé Playwright** sur 5 viewports clés :
1. Mobile Smart (375px)
2. Mobile Large (390px)
3. Tablette Portrait (768px)
4. Desktop Standard (1280px)
5. Large Desktop (1440px)

### Bilan Global du Comportement Layout :
- **Débordement Horizontal (`overflow-x`) :** **0 débordement détecté** sur l'ensemble des 55 combinaisons de routes et viewports (`docWidth === winWidth`).
- **Comportement du Header / Mega Menu :**
  - **Desktop (>= 1024px) :** Mega Menu centré à largeur fixe (1020px / 720px) évitant tout rognage sur bord d'écran.
  - **Mobile (< 1024px) :** Tiroir mobile fluide avec accordéons pliables et bouton CTA principal visible.

### Tableau de Synthèse des Anomalies & Dégradations Visuelles Repérées

| Route Concernée | Viewport | Composant / Section | Nature du Problème / Dégradation Visuelle | Impact Utilisateur | Recommandation de Correction (Sans Code) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/robots/:seriesId` | Mobile (375-390px) | `Hero Section` (Hauteur fixe `h-[75vh] min-h-[550px]`) | Sur mobile très court, la hauteur fixe de 550px force un tassement du titre H1 et des boutons CTAs. | Lisibilité réduite et boutons parfois proches du pli. | Passer la hauteur en `min-h-auto py-12` sur mobile `< lg` pour laisser le contenu respirer. |
| `/robots/:seriesId` | Mobile (375-390px) | `Catalogue Modèles` (`#modeles`) | Les cartes produits empilent l'image au-dessus d'un pavé de spécifications très dense. La case spec 4 s'affiche sur 2 colonnes mais compresse le texte. | Densité visuelle importante sur petit écran. | Structurer les spécifications en grille 2x2 plus simple avec taille de police ajustée (`text-xs`). |
| `/industries/:industryId` | Tablette (768px) | `Cas d'usage` (`#fonctionnalites`) | Le mode vertical mobile s'active sous 1024px. Sur tablette (768px), les images format 4/3 prennent une hauteur importante. | Défilement vertical très long. | Ajuster le ratio d'image en `aspect-[16/9]` sur tablette 768px. |
| `/` (Home) | Mobile (375px) | `KeyMetricsBar` / `IndustriesSection` | Cartes d'industries empilées avec paddings généreux, créant un rythme vertical très étiré. | Rallonge le scroll mobile. | Alléger les paddings verticaux de `py-24` à `py-12` sur mobile. |
| `/technologie` | Mobile (375-390px) | `Schéma d'Architecture` | Les 3 étapes de l'architecture s'empilent verticalement. Les connecteurs visuels entre étapes disparaissent. | Perte de la sensation de flux horizontal. | Ajouter des flèches discrètes de liaison verticale `↓` entre les cartes sur mobile. |

---

## 6. FOCUS PARTICULIER SUR LA PAGE D'ACCUEIL (HOME)

### Analyse de l'Ordre Actuel des Sections pour un Visiteur Froid

L'ordre actuel de la page d'accueil est le suivant :
1. **Hero** (Accroche + CTAs)
2. **LogoSliderSection** (Preuve sociale partenaires URG / SoftBank / Aldebaran / Robotnik)
3. **IndustriesSection** (Orientation par secteur métier : Retail, Hôtellerie, Santé, Industrie)
4. **RobotsCatalogSection** (Catalogue des gammes uClean, uServe, uLog)
5. **RobotInActionSection** (Démonstration visuelle / vidéo)
6. **ServicesKargoSection** (Ingénierie & Accompagnement)
7. **ProcessSection** (Méthodologie 4 étapes)
8. **FinalContactSection** (Formulaire de contact)

### Diagnostic de Pertinence pour la Conversion B2B :
- **L'ordre actuel est GLOBALEMENT TRÈS LOGIQUE ET PERTINENT :**
  1. Il capte l'attention (Hero).
  2. Il rassure immédiatement par les marques partenaires URG (LogoSlider).
  3. Il qualifie le besoin par le secteur d'activité du visiteur (Industries).
  4. Il présente l'offre de robots correspondante (RobotsCatalog).
  5. Il apporte la preuve de fonctionnement (RobotInAction).
  6. Il affirme le rôle d'intégrateur de service (Services & Process).
  7. Il convertit (FinalContact).

### Recommandations d'Amélioration de Structure pour la Prochaine Phase :
1. **Renforcer le lien vers le Prédiagnostic / Étude de Faisabilité dès le Hero :**
   - Actuellement, le bouton secondaire du Hero mène à `#contact`. Il serait beaucoup plus engageant de proposer un bouton secondaire moussant la faisabilité (ex: `Tester l'éligibilité de mon site` -> redirigeant vers `/industries/industry#prequalification`).
2. **Harmoniser les Titres de Sections :**
   - Passer de *"Nos Services & Accompagnement"* à *"Ingénierie, Déploiement & Maintien en Conditions Opérationnelles"*.
   - Passer de *"Notre Méthodologie & Processus"* à *"De l'Audit In Situ à la Performance Opérationnelle"*.
3. **Optimiser le Catalogue Robot sur la Home :**
   - S'assurer que chaque carte de gamme (uClean, uServe, uLog) affiche un bouton explicite vers la page de gamme dédiée `/robots/[seriesId]`.

---

## 7. ASSETS, LOGOS, MÉDIAS ET COHÉRENCE VISUELLE

### État des Lieux des Assets & Chargement
- **Logos Partenaires & De Marque :**
  - Utilisation de SVG vectoriels nets et légers (`Logo.tsx`, `Header.tsx`, `Footer.tsx`).
  - Palette rigoureusement respectée : Blanc `#FFFFFF`, Ardoise sombre `#0A0F1C` / `#0B1121`, Orange Phoenix `#F97316` / `var(--color-brand-primary)`.
- **Images Produits & Visuels Sectoriels :**
  - Hébergement centralisé sur CDN Cloudinary performant (`res.cloudinary.com`).
  - Utilisation de la fonction d'optimisation dynamique `optimizeCloudinaryUrl()` pour injecter `f_auto,q_auto` et le dimensionnement adapté.
  - Aucune image cassée ou erreur HTTP 404/500 détectée lors des scripts Playwright.
- **Coût & Performance Réseau :**
  - Chargement réactif des vidéos d'arrière-plan en MP4 optimisé.
  - Utilisation d'attributs `loading="lazy"` et `decoding="async"` sur les images hors du pli principal.

---

## 8. SYNTHÈSE FINALE & PRIORITÉS D'AMÉLIORATION

### Points Forts Déjà Solides (À Conserver Absolument)
1. **Architecture & Routing Propres :** Structure React 19 / Vite 6 / React RouterDOM v7 réactive, sans erreurs de compilation ni warnings.
2. **Mega Menu Header B2B :** Mega-menu desktop ultra-performant avec prévisualisation des robots et tags d'accès rapide au prédiagnostic sectoriel.
3. **Module de Prequalification Technique :** Moteur de préqualification sur les pages Industries directement connecté au formulaire de contact et à la mise en valeur des robots recommandés.
4. **Simulateur ROI sur Pages Robots :** Outil interactif très apprécié par les décideurs financiers B2B.
5. **Charte Visuelle Swiss/Architecturale :** Palette sobre (Blanc, Gris clair, Orange Phoenix, Ardoise industrielle) exempte de gadgets néons ou IA.

### Incohérences Majeures Restantes à Traiter
1. **Titres de la Page d'Accueil à Déniaiser :** Libellés de sections trop génériques (*"Nos Services"*, *"Notre Méthodologie"*).
2. **Formulations Ponctuellement Trop Pitcheuses / Sci-Fi :** Quelques scories de rédaction (*"Navettes spatiales"*, *"Le summum de..."*).
3. **Tassement du Hero Robot sur Mobile :** Hauteur fixe 550px à assouplir sur smartphones.
4. **Valorisation du Prédiagnostic depuis la Home :** Manque d'un raccourci direct depuis le Hero d'accueil vers l'outil d'éligibilité.

---

### Plan d'Action & Priorités d'Amélioration Classées par Impact

#### Priorité 1 : CRITIQUE (Impact Fort sur Crédibilité & Conversion)
- [ ] **Nettoyage Éditorial Copywriting :** Éliminer les expressions *"navettes spatiales"* et hyperboley ("summum") au profit de terminologies 100% ingénierie B2B (*"AMR d'intralogistique"*, *"AMR forte capacité 600 kg"*).
- [ ] **Optimisation des Titres de la Home :** Reformuler les H2 de la Home pour affirmer la valeur d'intégration d'ingénierie (*"Ingénierie, Déploiement & Maintien en Conditions Opérationnelles"*).
- [ ] **Prédiagnostic Shortcut sur Home Hero :** Ajouter un CTA explicite orientant les visiteurs froids vers le questionnaire de faisabilité in situ.

#### Priorité 2 : IMPORTANT (Impact Expérience Utilisateur & Responsive)
- [ ] **Ajustement Responsive Hero Robots sur Mobile :** Remplacer le `h-[75vh] min-h-[550px]` par un padding vertical souple sur écrans `< 768px`.
- [ ] **Ajustement Ratios d'Images sur Tablette (768px) :** Optimiser les ratios des cartes de cas d'usage verticales pour éviter les loooongs défilements.
- [ ] **Renforcement du Maillage Interne SEO :** Ajouter des ancres textuelles optimisées (*"étude de faisabilité robotique"*, *"intégration AMR France"*) entre les pages Industrie, Technologie et Robots.

#### Priorité 3 : CONFORT / FINITION (Impact Polish & UX Avancée)
- [ ] **Indicateurs de Flux sur Schéma Technologie Mobile :** Ajouter de légères flèches indicatrices de flux vertical `↓` entre les blocs du schéma d'architecture sur smartphones.
- [ ] **Micro-animations d'Hover sur Cartes Bento :** Peaufiner les transitions au survol sur la page À Propos.

---
*Fin du rapport d'audit d'inventaire complet — Phoenix-Botics4.*
