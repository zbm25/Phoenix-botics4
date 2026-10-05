# AUDIT TECHNIQUE & ÉDITORIAL EXHAUSTIF — PHOENIX-BOTICS
**Date d'audit :** Octobre 2026
**Auteur :** Jules, Ingénieur d'Application & Intégration
**Projet :** Phoenix-Botics — Intégrateur B2B de Robotique Mobile & Cobotique en France
**Dépôt Git :** `Phoenix-botics4` (`https://github.com/zbm25/Phoenix-botics4`)
**Branche active :** `jules-16425234423383417329-ccc39970`
**Commit de référence :** `b833347` (Merge pull request #17 B2B Mega Menu Redesign)

---

## CONTEXTE & POSITIONNEMENT STRATÉGIQUE

Phoenix-Botics est positionnée sur le marché français comme **intégrateur B2B premium de robotique mobile autonome (AMR), de cobotique de nettoyage et de solutions de service intelligent**. L'entreprise commercialise et intègre principalement les gammes de la société européenne **United Robotics Group (URG)** :
- **uClean** : Cobots d'aspiration, de lavage et d'entretien des sols.
- **uServe** : Robots d'accueil, de guidage et de service/livraison en restauration/hôtellerie/retail.
- **uLog** : Robots de livraison intralogistique et de manutention de charges légères à lourdes (80 kg à 600 kg).

L'objectif central du site web est de démontrer la valeur ajoutée d'un **intégrateur à haute ingénierie** (diagnostiquer un site, recommander une flotte adaptée, interfacer les robots avec les systèmes IT/WMS/IoT existants, déployer et maintenir en MCO) plutôt que celle d'un simple revendeur de matériels.

---

## 1. CARTOGRAPHIE GLOBALE DU SITE & RÔLE PARCOURS

### Tableau exhaustif des routes et composants principaux

| Route | Composant principal | Rôle dans le parcours utilisateur B2B |
| :--- | :--- | :--- |
| `/` | `HomePage` (`src/App.tsx`) | **Vitrine institutionnelle & Aiguillage B2B** : Accroche du décideur froid, présentation de la proposition de valeur globale, orientation vers les secteurs et les gammes de robots. |
| `/robots/:seriesId` | `RobotSeriesPage` (`src/pages/RobotSeriesPage.tsx`) | **Démonstration produit & Simulation financière** : Fiche détaillée par gamme (`uclean-series`, `userve-series`, `ulog-series`), spécifications techniques, simulateur ROI interactif et orientation vers l'étude de faisabilité. |
| `/industries/:industryId` | `IndustryPage` (`src/pages/IndustryPage.tsx`) | **Conversion métier & Pré-qualification sur site** : Traitement ciblé par secteur (`retail`, `hospitality`, `health`, `industry`), cas d'usage métiers, questionnaire d'éligibilité technique `#prequalification`, carrousel de flotte recommandée `#robots-secteur` et formulaire de contact qualifié `#contact`. |
| `/technologie` | `TechnologyPage` (`src/pages/TechnologyPage.tsx`) | **Réassurance ingénierie & Normes** : Explication des 4 piliers technologiques (SLAM LiDAR 3D, Sécurité active ISO 3691-4, Connectivité IoT/ascenseurs, WMS/RCS), légitimité auprès des directeurs techniques et DSI. |
| `/a-propos` | `AboutPage` (`src/pages/AboutPage.tsx`) | **Crédibilité & Partenariat constructeur** : Présentation de l'alliance stratégique United Robotics Group + Phoenix-Botics, présence territoriale en France, support et engagement MCO. |
| `/services` | `ServicesPage` (`src/pages/ServicesPage.tsx`) | **Offre d'accompagnement intégrateur** : De l'audit d'implantation sur site à la supervision 24/7, modèles contractuels (POC, location, achat) et FAQ services. |
| `*` (Route fallback) | `NotFoundPage` (`src/pages/NotFoundPage.tsx`) | **Gestion des erreurs d'aiguillage** : Redirection fluide vers l'accueil ou le contact. |

---

## 2. DÉCOMPOSITION PAGE PAR PAGE

### 2.1. Home Page (`/`)
- **Composant source :** `HomePage` dans `src/App.tsx`
- **Ordre exact des sections :**
  1. `Header` & `Hero` (Conteneur sombre `#0a0f1c`)
  2. Transition en dégradé sombre vers clair (`h-16 bg-gradient-to-b from-[#0a0f1c] to-[#f5f5f7]`)
  3. `LogoSliderSection` (Bandeau partenaires & marques)
  4. `IndustriesSection` (Grille dynamique des secteurs d'activité)
  5. `RobotsCatalogSection` (Présentation synthétique des 3 gammes)
  6. `RobotInActionSection` (Démonstrations vidéo & fonctionnalités clés)
  7. `ServicesKargoSection` ("Nos Services & Accompagnement")
  8. `ProcessSection` ("Notre Méthodologie & Processus")
  9. `FinalContactSection` (Formulaire de contact B2B)
  10. `Footer`
- **Titre principal (H1) :** *"Libérer le potentiel humain par la robotique."*
- **Sous-titre :** *"Infrastructures existantes préservées, flux logistiques optimisés, autonomie mesurable."*
- **Promesse marketing :** Déploiement sans modification de locaux avec retour sur investissement mesurable.
- **CTA principaux :** *"Découvrir la flotte"* (`#robots-catalog`), *"Demander une démo"* (`#contact`), *"Parler à un expert"*.
- **Interactions :** Cartes secteurs interactives avec pré-visualisation, onglets de catégories de robots, vidéo modal/player, formulaire avec sélection de secteur.

### 2.2. Pages Gammes / Robots (`/robots/:seriesId`)
- **Composant source :** `RobotSeriesPage` dans `src/pages/RobotSeriesPage.tsx` (`uclean-series`, `userve-series`, `ulog-series`)
- **Ordre exact des sections :**
  1. `Header`
  2. `Hero` gamme (Série uClean / uServe / uLog)
  3. `KeyMetricsBar` (Spécifications chiffrées : autonomie, charge, couverture m²)
  4. Onglets modèles interactifs (Sélection du modèle au sein de la gamme avec fiche détaillée)
  5. Applications métiers & cas d'usage par secteur
  6. **Simulateur ROI interactif** ("Calculateur de retour sur investissement")
  7. Méthodologie d'intégration & jalons projet
  8. `FinalContactSection` (Formulaire pré-rempli avec le modèle consulté)
  9. `Footer`
- **CTA principaux :** *"Vérifier la faisabilité sur mon site"* (oriente vers `/industries/[secteur]#prequalification`), *"Télécharger la fiche technique"*, *"Demander un chiffrage"*.
- **Interactions :** Onglets de modèles avec commutation de visuels et fiches techniques, curseur/saisie pour le simulateur ROI, bouton de bascule secteur.

### 2.3. Pages Industries / Secteurs (`/industries/:industryId`)
- **Composant source :** `IndustryPage` dans `src/pages/IndustryPage.tsx` (`retail`, `hospitality`, `health`, `industry`)
- **Ordre exact des sections :**
  1. `Header`
  2. `Hero` secteur (Chapeau éditorial et indicateurs d'impact)
  3. `KeyMetricsBar` (Métriques clés du secteur)
  4. Défis & Problématiques métiers ("Les défis du secteur")
  5. Cas d'usage & Solutions ("Cas d'usage" — Cartes empilées en sticky sur Desktop, empilement vertical sur Mobile)
  6. Focus Technologie & Normes ("Ingénierie & Normes")
  7. **Module de Préqualification Technique** (`#prequalification`, composant `PrequalificationFlow`)
  8. **Carrousel de Flotte Recommandée** (`#robots-secteur`, composant `FleetCarousel`)
  9. **Formulaire de Contact B2B Qualifié** (`#contact`, composant `ContactForm`)
  10. `Footer`
- **CTA principaux :** *"Lancer mon prédiagnostic"*, *"Voir les recommandations"*, *"Demander une étude de faisabilité"* (`#contact`), *"Explorer la flotte"*.
- **Interactions :** Questionnaire dynamique étape par étape, re-classement automatique du carrousel de flotte avec badge *"Recommandé pour votre sélection"*, transmission automatique du diagnostic vers le champ texte du formulaire de contact.

---

## 3. CONSOLIDATION TECHNIQUE V3 (FACTUELLE & PURE VALIDATION)

### 3.1. Slugs réels des routes robots
Les routes exactes et leurs slugs canoniques déclarés dans `src/App.tsx` et `src/data/robotSeries.ts` :

| Route déclarée dans `App.tsx` | Slug réel attendu dans `ROBOT_SERIES_DATA` | Exemple d'URL complète valide |
| :--- | :--- | :--- |
| `<Route path="/robots/:seriesId" ... />` | `uclean-series` | `http://localhost:3000/robots/uclean-series` |
| `<Route path="/robots/:seriesId" ... />` | `userve-series` | `http://localhost:3000/robots/userve-series` |
| `<Route path="/robots/:seriesId" ... />` | `ulog-series` | `http://localhost:3000/robots/ulog-series` |

*Remarque :* L'utilisation de slugs tronqués sans `-series` (ex: `/robots/uclean`) ne correspond à aucune clé dans `ROBOT_SERIES_DATA` et renvoie une fiche non trouvée. Seuls les slugs ci-dessus sont canoniques.

### 3.2. Tableau de vérité "Multi-robots" (`flotte-mixte`)

| Fichier concerné | Valeur stockée dans le code | Valeur affichée à l'écran | Valeur transmise au formulaire | Valeur finale soumise |
| :--- | :--- | :--- | :--- | :--- |
| `IndustryPage.tsx` | `"flotte-mixte"` | `"Flotte mixte"` | `"flotte-mixte"` | `"flotte-mixte"` |
| `ContactForm.tsx` | `"flotte-mixte"` | `"Flotte mixte"` | `"flotte-mixte"` | `"flotte-mixte"` |
| `mapQualificationToContact.ts` | `"flotte-mixte"` | N/A (lib interne) | `"flotte-mixte"` | `"flotte-mixte"` |
| `evaluateQualification.ts` | `recommendedRobots: string[]` | N/A (moteur de calcul) | N/A | N/A |

*Conclusion :* Il existe **une seule et unique valeur canonique** dans toute l'application : **`"flotte-mixte"`**. Aucune valeur équivalente simplifiée (comme `"mixte"`) n'existe ni n'est tolérée.

### 3.3. SEO page par page (Export factuel)

| Route | H1 Exact | Title Exact | Meta Description Exacte | Fichier / Hook Source |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `Libérer le potentiel humain par la robotique.` | `Phoenix-Botics \| Intégrateur de Robots Mobiles Autonomes AMR` | `Intégrateur expert de cobots et robots autonomes en France. Automatisez vos flux logistiques, le nettoyage et le service client sans altérer vos locaux.` | `src/App.tsx` (`HomePage`) / `usePageMeta` |
| `/robots/uclean-series` | `Automatisez le nettoyage de vos espaces professionnels.` | `Gamme uClean \| Autolaveuses et Aspirateurs Autonomes Professionnels` | `Découvrez la flotte d'autolaveuses industrielles uClean. Nettoyage robotisé autonome, filtration HEPA H13 et traçabilité hygiène pour grandes surfaces.` | `src/pages/RobotSeriesPage.tsx` / `usePageMeta` |
| `/robots/userve-series` | `Améliorez l’accueil et l’expérience client grâce à la robotique` | `Gamme uServe \| Robots d'Accueil, de Guidage et Service Interactif` | `Robots collaboratifs d'accueil et de service en salle uServe. Écran marketing 15,6'' HD, franchissement étroit dès 65 cm et interaction multilingue.` | `src/pages/RobotSeriesPage.tsx` / `usePageMeta` |
| `/robots/ulog-series` | `Fluidifiez vos flux logistiques sans réorganiser vos sites` | `Gamme uLog \| Robots Mobiles Autonomes AMR & Levage 80 à 600 kg` | `Robots AMR uLog pour l'intralogistique industrielle et hospitalière. Navigation LiDAR SLAM sans marquage au sol, transit ascenseur et intégration WMS/ERP.` | `src/pages/RobotSeriesPage.tsx` / `usePageMeta` |
| `/industries/retail` | `Le futur du Retail, par la robotique.` | `Phoenix-Botics \| Solutions de robotique de service en France` | `Phoenix-Botics conçoit et déploie des solutions de robotique de service clé en main en France pour le retail, l’hôtellerie-restauration, la santé, les laboratoires et l’industrie.` | `src/pages/IndustryPage.tsx` / `usePageMeta` |
| `/industries/hospitality` | `L'excellence du service, par la robotique.` | `Phoenix-Botics \| Solutions de robotique de service en France` | `Phoenix-Botics conçoit et déploie des solutions de robotique de service clé en main en France pour le retail, l’hôtellerie-restauration, la santé, les laboratoires et l’industrie.` | `src/pages/IndustryPage.tsx` / `usePageMeta` |
| `/industries/health` | `L'excellence des soins, par la robotique.` | `Phoenix-Botics \| Solutions de robotique de service en France` | `Phoenix-Botics conçoit et déploie des solutions de robotique de service clé en main en France pour le retail, l’hôtellerie-restauration, la santé, les laboratoires et l’industrie.` | `src/pages/IndustryPage.tsx` / `usePageMeta` |
| `/industries/industry` | `La performance industrielle, par la robotique.` | `Phoenix-Botics \| Solutions de robotique de service en France` | `Phoenix-Botics conçoit et déploie des solutions de robotique de service clé en main en France pour le retail, l’hôtellerie-restauration, la santé, les laboratoires et l’industrie.` | `src/pages/IndustryPage.tsx` / `usePageMeta` |
| `/technologie` | `L'ingénierie autonome sans modification d'infrastructure.` | `Technologie Robotique \| Navigation LiDAR SLAM 3D & Connectivité IoT` | `Navigation sans balise, compatibilité ascenseurs IoT, sécurité certifiée ISO 3691-4 et API REST/WMS : les fondations de l'autonomie industrielle Phoenix.` | `src/pages/TechnologyPage.tsx` / `usePageMeta` |
| `/a-propos` | `L'excellence robotique européenne, dédiée au marché français.` | `À Propos de Phoenix-Botics \| Alliance Européenne United Robotics Group` | `L'alliance stratégique entre la R&D d'United Robotics Group et l'expertise terrain de Phoenix-Botics, intégrateur de proximité pour les entreprises françaises.` | `src/pages/AboutPage.tsx` / `usePageMeta` |
| `/services` | `Vos robots, intégrés et suivis de bout en bout.` | `Services & Déploiement Robotique \| Audit, Test Terrain & Support` | `De l'audit d'implantation sur site à la supervision 24/7 : découvrez l'accompagnement clé en main Phoenix-Botics pour rentabiliser votre investissement cobotique.` | `src/pages/ServicesPage.tsx` / `usePageMeta` |
| `/404-non-trouve` | `Oups ! Cette destination est introuvable.` | `Page non trouvée - 404 \| Phoenix-Botics` | `La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil de Phoenix-Botics.` | `src/pages/NotFoundPage.tsx` / `usePageMeta` |

### 3.4. Extraits de code des H1 stratégiques

1. **Home (`/`)**
   - *Fichier :* `src/components/Hero.tsx` (ligne 18)
   - *Extrait :*
     ```tsx
     <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold font-display tracking-tight text-white leading-[1.08] mb-6">
       Libérer le potentiel humain <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">par la robotique.</span>
     </h1>
     ```

2. **`/industries/retail`**
   - *Fichier :* `src/pages/IndustryPage.tsx` (ligne 147)
   - *Extrait :*
     ```tsx
     heroTitle: "Le futur du Retail,\npar la robotique.",
     ```

3. **`/industries/hospitality`**
   - *Fichier :* `src/pages/IndustryPage.tsx` (ligne 235)
   - *Extrait :*
     ```tsx
     heroTitle: "L'excellence du service,\npar la robotique.",
     ```

4. **`/robots/ulog-series`**
   - *Fichier :* `src/data/robotSeries.ts` (lignes 287-288)
   - *Extrait :*
     ```tsx
     title: "Gamme uLog",
     tagline: "Fluidifiez vos flux logistiques sans réorganiser vos sites",
     ```

### 3.5. Matrice d'état de vérification des parcours métier

| Flux métier testé | Confirmé dans le code | Testé visuellement | Testé automatisé | Non testé |
| :--- | :--- | :--- | :--- | :--- |
| **ROI uClean -> secteur -> préqualification** | Oui (`RobotSeriesPage.tsx` + `PrequalificationFlow.tsx`) | Oui (Playwright headless) | Oui (`evaluateQualification.test.ts`) | Aucun |
| **ROI uServe -> secteur -> préqualification** | Oui (`RobotSeriesPage.tsx`) | Oui (Playwright headless) | Oui (`evaluateQualification.test.ts` l.153) | Aucun |
| **ROI uLog -> secteur -> préqualification** | Oui (`RobotSeriesPage.tsx`) | Oui (`/tmp/test_flows.py`) | Oui (`evaluateQualification.test.ts` l.122) | Aucun |
| **Fin de questionnaire -> diagnostic visible** | Oui (`PrequalificationFlow.tsx` + `QualificationResult.tsx`) | Oui (`retail_quiz_results.png`) | Oui (`evaluateQualification.test.ts`) | Aucun |
| **Diagnostic -> flotte recommandée** | Oui (`IndustryPage.tsx` + `FleetCarousel.tsx`) | Oui (Playwright headless) | Oui (`evaluateQualification.test.ts`) | Aucun |
| **Flotte recommandée -> formulaire contact** | Oui (`mapQualificationToContact.ts` + `ContactForm.tsx`) | Oui (`retail_contact_prefilled.png`) | Oui (`evaluateQualification.test.ts` l.107) | Aucun |

---

*Document d'audit technique et éditorial exhaustif V3 validé et consolidé.*
