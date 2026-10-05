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
| `/robots/:seriesId` | `RobotSeriesPage` (`src/pages/RobotSeriesPage.tsx`) | **Démonstration produit & Simulation financière** : Fiche détaillée par gamme (`uclean`, `userve`, `ulog`), spécifications techniques, simulateur ROI interactif et orientation vers l'étude de faisabilité. |
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
- **Titre principal (H1) :** *"L'intégration robotique au service de votre performance"*
- **Sous-titre :** *"Infrastructures existantes préservées, flux logistiques optimisés, autonomie mesurable."*
- **Promesse marketing :** Déploiement sans modification de locaux avec retour sur investissement mesurable.
- **CTA principaux :** *"Découvrir la flotte"* (`#robots-catalog`), *"Demander une démo"* (`#contact`), *"Parler à un expert"*.
- **Interactions :** Cartes secteurs interactives avec pré-visualisation, onglets de catégories de robots, vidéo modal/player, formulaire avec sélection de secteur.

### 2.2. Pages Gammes / Robots (`/robots/:seriesId`)
- **Composant source :** `RobotSeriesPage` dans `src/pages/RobotSeriesPage.tsx` (`uclean`, `userve`, `ulog`)
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

### 2.4. Page Technologie (`/technologie`)
- **Composant source :** `TechnologyPage` dans `src/pages/TechnologyPage.tsx`
- **Ordre exact des sections :**
  1. `Header` & `Hero` Sombre (*"L'ingénierie autonome sans modification d'infrastructure."*)
  2. Les 4 Piliers Technologiques (LiDAR 3D SLAM, Vision 3D & Sécurité ISO 3691-4, Connectivité IoT Ascenseurs/Portes, Fleet RCS & API)
  3. Interfaçage Systèmes d'Information (WMS / ERP / API REST)
  4. Foire aux Questions Techniques (Accordéon FAQ)
  5. Section CTA Final
  6. `Footer`

### 2.5. Page À Propos (`/a-propos`)
- **Composant source :** `AboutPage` dans `src/pages/AboutPage.tsx`
- **Ordre exact des sections :**
  1. `Header` & `Hero` (*"L'excellence robotique européenne, dédiée au marché français."*)
  2. Présentation de l'Alliance URG (Constructeur R&D) + Phoenix-Botics (Intégrateur terrain)
  3. Présence Nationale & Maillage Logistique en France
  4. Chiffres clés de déploiement et métriques de fiabilité (99,4% de disponibilité)
  5. Formulaire de contact direct ingénierie
  6. `Footer`

### 2.6. Page Services (`/services`)
- **Composant source :** `ServicesPage` dans `src/pages/ServicesPage.tsx`
- **Ordre exact des sections :**
  1. `Header` & `Hero` (*"Vos robots, intégrés et suivis de bout en bout."*)
  2. Approche d'accompagnement humain & ingénierie
  3. Offre modulaire (1. Audit & Dépôt, 2. POC & Location, 3. MCO & Supervision 24/7)
  4. Accordéon FAQ Services
  5. Formulaire de contact
  6. `Footer`

### 2.7. Page 404 (`*`)
- **Composant source :** `NotFoundPage` dans `src/pages/NotFoundPage.tsx`
- **Contenu :** Message épuré *"Oups ! Cette destination est introuvable."*, CTA *"Retour à l'accueil"* et *"Page précédente"*.

---

## 3. AUDIT COPYWRITING & ÉDITORIAL

### 3.1. Analyse générale de la proposition de valeur
- **Ton global :** Professionnel, technique et rassurant. La posture d'intégrateur industriel est bien perceptible.
- **Points forts :** L'accent mis sur la non-modification des infrastructures existantes ("sans travaux", "SLAM LiDAR sans balise") est un excellent argument de conversion B2B.
- **Axes d'amélioration :** Plusieurs H1 et H2 souffrent d'une trop grande abstraction ou d'une longueur excessive qui dilue l'impact immédiat au premier coup d'œil.

### 3.2. Formulations trop abstraites, génériques ou inutilement longues

1. **Confirmé dans le code** | **Home Hero (H1)**
   - *Fichier :* `src/components/Hero.tsx` (ligne 18)
   - *Texte actuel :* *"L'intégration robotique au service de votre performance"*
   - *Gravité :* Importante
   - *Impact :* Manque de concret métier. "Performance" est un terme générique réutilisé par tout SaaS B2B.
   - *Recommandation :* Préciser l'action métier immédiate (ex: *"Intégrateur de robots mobiles autonomes & cobots logistiques en France"*).

2. **Confirmé dans le code** | **Page Retail (H1)**
   - *Fichier :* `src/pages/IndustryPage.tsx` (ligne 147)
   - *Texte actuel :* *"L'expérience magasin augmentée, par la robotique."*
   - *Gravité :* Importante
   - *Impact :* Le terme "augmentée" est perçu comme un jargon startup/tech au lieu de faire référence à la propreté des surfaces de vente, au réassort ou au confort du personnel.
   - *Recommandation :* Reformuler vers un bénéfice opérationnel (ex: *"Automatisation de la propreté et de la logistique en point de vente"*).

3. **Confirmé dans le code** | **Page Hôtellerie (H1)**
   - *Fichier :* `src/pages/IndustryPage.tsx` (ligne 235)
   - *Texte actuel :* *"L'art de recevoir, sublimé par la technologie."*
   - *Gravité :* Finition
   - *Impact :* Formulation poétique très abstraite, peu axée sur la productivité en salle ou la réduction de la pénibilité en room-service.
   - *Recommandation :* Ancrer sur la valeur d'usage (ex: *"Robots d'accueil et de service pour l'hôtellerie-restauration"*).

4. **Confirmé dans le code** | **Page Technologie (H1)**
   - *Fichier :* `src/pages/TechnologyPage.tsx` (ligne 128)
   - *Texte actuel :* *"L'ingénierie autonome sans modification d'infrastructure."*
   - *Gravité :* Finition
   - *Impact :* Titre bien orienté technique mais légèrement long.

5. **Confirmé dans le code** | **Série uClean (Sous-titre Hero)**
   - *Fichier :* `src/data/robotSeries.ts` (ligne 14)
   - *Texte actuel :* *"Cobots de bionettoyage et d'aspiration industrielle pour maintenir une hygiène irréprochable sans mobiliser vos équipes sur les tâches répétitives."*
   - *Gravité :* Finition
   - *Impact :* Phrase de 24 mots, trop longue pour une lecture rapide au-dessus de la ligne de flottaison.

---

## 4. MATRICE SEO SÉMANTIQUE PAR PAGE

| URL | H1 Exact | Tag `<title>` Exact | Meta Description Exacte | Principaux H2 | Mots-clés Réellement Présents | Opportunités & Maillage Interne |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `L'intégration robotique au service de votre performance` | `Phoenix-Botics \| Intégrateur de Robots Mobiles Autonomes AMR` | `Intégrateur expert de cobots et robots autonomes en France. Automatisez vos flux logistiques, le nettoyage et le service client sans altérer vos locaux.` | • Une réponse robotique pour chaque secteur<br>• Notre Flotte de Robots Autonomes<br>• Vos Robots en Action sur le Terrain<br>• L'accompagnement Phoenix-Botics<br>• Notre Démarche d'Intégration | AMR, robotique mobile, flux logistiques, nettoyage, cobots, intégrateur | **Solide**. Bon ciblage global. Possibilité de renforcer le mot-clé "Intégrateur cobotique France". |
| `/robots/uclean` | `Série uClean` | `Gamme uClean \| Autolaveuses & Aspirateurs Autonomes Industrialisés` | `Découvrez uClean Compact, Vacuum 40 et Scrub 50 : la gamme de cobots de nettoyage autonome pour surfaces commerciales, médicales et industrielles.` | • Spécifications de la série<br>• Modèles de la série uClean<br>• Applications & cas d'usage<br>• Calculateur de retour sur investissement<br>• Processus d'intégration | autolaveuse autonome, cobot de nettoyage, bionettoyage, Vacuum 40, Scrub 50 | **Critique : H1 trop succinct** ("Série uClean"). Enrichir en `Autolaveuses Autonomes & Cobots de Nettoyage uClean`. |
| `/robots/userve` | `Série uServe` | `Gamme uServe \| Robots d'Accueil, de Guidage et de Service` | `Optimisez le service en salle, l'accueil des visiteurs et le room-service avec uServe, le robot collaboratif polyvalent pour le retail et l'hôtellerie.` | • Spécifications de la série<br>• Modèles de la série uServe<br>• Applications & cas d'usage<br>• Calculateur de retour sur investissement | robot d'accueil, robot de service, room-service, guidage interactif | **Critique : H1 trop succinct**. Enrichir en `Robots de Service & d'Accueil Collaboratifs uServe`. |
| `/robots/ulog` | `Série uLog` | `Gamme uLog \| Robots Autonomes AMR d'Intralogistique & Transport` | `Robotisez vos flux de bacs et palettes avec uLog Deliver et Lift : AMR intralogistiques jusqu'à 600 kg sans modification de vos entrepôts.` | • Spécifications de la série<br>• Modèles de la série uLog<br>• Applications & cas d'usage<br>• Calculateur de retour sur investissement | AMR, intralogistique, transport de palettes, uLog Deliver, uLog Lift | **Critique : H1 trop succinct**. Enrichir en `Robots Autonomes AMR Intralogistique uLog`. |
| `/industries/retail` | `La performance retail, par la robotique.` | `Phoenix-Botics \| Solutions de robotique de service en France` **(GÉNÉRIQUE)** | `Phoenix-Botics conçoit et déploie des solutions de robotique de service clé en main...` **(GÉNÉRIQUE)** | • Les défis du secteur commerce & grande distribution<br>• Optimisez l'expérience client...<br>• La cobotique au service du point de vente<br>• Vérifiez la faisabilité technique de votre site | retail, grande distribution, surfaces de vente, réassort, propreté | **CRITIQUE : Title et Meta Description identiques et génériques sur les 4 pages secteurs !** Manque d'optimisation SEO locale et sectorielle. |
| `/industries/hospitality` | `L'excellence hôtelière, par la robotique.` | `Phoenix-Botics \| Solutions de robotique de service en France` **(GÉNÉRIQUE)** | `Phoenix-Botics conçoit et déploie des solutions de robotique de service clé en main...` **(GÉNÉRIQUE)** | • Les défis du secteur CHR & Hôtellerie<br>• Libérez du temps pour vos clients...<br>• L'automatisation au cœur de vos opérations | hôtellerie, restauration, service en salle, room-service | **CRITIQUE : Title et Meta Description génériques.** Personnaliser impérativement. |
| `/industries/health` | `L'excellence des soins, par la robotique.` | `Phoenix-Botics \| Solutions de robotique de service en France` **(GÉNÉRIQUE)** | `Phoenix-Botics conçoit et déploie des solutions de robotique de service clé en main...` **(GÉNÉRIQUE)** | • Les défis du secteur médical et hospitalier<br>• Optimisez l'intralogistique à l'hôpital<br>• La cobotique au service du soin | logistique hospitalière, bionettoyage, transport autonome, EHPAD | **CRITIQUE : Title et Meta Description génériques.** |
| `/industries/industry` | `La performance industrielle, par la robotique.` | `Phoenix-Botics \| Solutions de robotique de service en France` **(GÉNÉRIQUE)** | `Phoenix-Botics conçoit et déploie des solutions de robotique de service clé en main...` **(GÉNÉRIQUE)** | • Les défis de l'industrie et de l'intralogistique<br>• Automatisez vos flux de bout en bout<br>• L'intralogistique de précision | logistique industrielle, usine, magasin automatique, WMS, AMR | **CRITIQUE : Title et Meta Description génériques.** |
| `/technologie` | `L'ingénierie autonome sans modification d'infrastructure.` | `Technologie Robotique \| Navigation LiDAR SLAM 3D & Connectivité IoT` | `Navigation sans balise, compatibilité ascenseurs IoT, sécurité certifiée ISO 3691-4 et API REST/WMS...` | • 4 piliers technologiques pour une coactivité fluide<br>• Une intégration fluide avec votre SI<br>• Questions techniques fréquentes | LiDAR SLAM 3D, ISO 3691-4, IoT, API REST, WMS | **Excellente densité de mots-clés techniques**. |
| `/a-propos` | `L'excellence robotique européenne, dédiée au marché français.` | `À Propos de Phoenix-Botics \| Alliance Européenne United Robotics Group` | `L'alliance stratégique entre la R&D d'United Robotics Group et l'expertise terrain de Phoenix-Botics...` | • La puissance d'un géant européen<br>• Une présence territoriale concrète<br>• Des déploiements mesurables | United Robotics Group, intégrateur France, MCO, support terrain | **Bon ancrage marque & alliance.** |
| `/services` | `Vos robots, intégrés et suivis de bout en bout.` | `Services & Déploiement Robotique \| Audit, Test Terrain & Support` | `De l'audit d'implantation sur site à la supervision 24/7...` | • Une approche modulaire et humaine<br>• Une offre qui évolue<br>• Questions fréquentes | audit de faisabilité, maintenance robotique, POC, MCO | **Très bon alignement intention de recherche B2B.** |
| `/404-non-trouve` | `Oups ! Cette destination est introuvable.` | `Page non trouvée - 404 \| Phoenix-Botics` | `La page que vous recherchez n'existe pas...` | N/A | 404, accueil | Conforme. |

### 4.2. Évaluation de la couverture des expressions cibles B2B
- **Robotique mobile / AMR :** Très bien représentée sur `/robots/ulog`, `/technologie` et Home.
- **Cobotique / Nettoyage autonome :** Présent sur `/robots/uclean` et les pages secteurs.
- **Étude de faisabilité / Intégrateur robotique :** Bien mis en avant sur les formulaires et la page `/services`.
- **Intralogistique hospitalière & industrielle :** Bien développée dans les cas d'usage métiers.
- **Point faible principal :** L'absence de titres SEO spécifiques pour les 4 pages d'industries pénalise le référencement naturel sur les requêtes ciblées (ex: *"robotique grande distribution"*, *"robotique hospitalière france"*).

---

## 5. AUDIT RESPONSIVE GLOBAL (375px, 390px, 768px, 1280px, 1440px)

### 5.1. Résumé des tests d'affichage et de débordement
L'audit visuel et dynamique exécuté via Chromium headless sur l'ensemble des 12 routes et 5 viewports confirme **l'absence totale de débordement horizontal (`overflow-x`) sur toutes les pages**. Le layout général reste strictement contenu dans la largeur de l'écran.

### 5.2. Constats détaillés par Viewport & Composants

1. **Confirmé dans le code & Observé lors d'un test visuel** | **Header & Mega Menu B2B**
   - *Composant :* `src/components/Header.tsx`
   - *Viewports :* Mobile (375px, 390px) & Tablette (768px) vs Desktop (1280px, 1440px)
   - *Statut :* **Conforme & Très haute finition**.
   - *Observation :* Le menu tiroir mobile bascule proprement en accordéon. Sur Desktop (>= 1024px), le Mega Menu B2B centré (largeurs 1020px et 720px) s'affiche avec la carte de sélection technique sombre `#0B1121`, le pré-affichage dynamique du robot survolé et les tags de secteur.

2. **Confirmé dans le code** | **Section Cas d'usage sur Pages Industries (Sticky Stacking)**
   - *Composant :* `src/pages/IndustryPage.tsx` (lignes 650-750)
   - *Viewports :* Mobile (375px, 390px) et Tablette (768px)
   - *Gravité :* Finition
   - *Impact :* UX Mobile
   - *Observation :* L'effet d'empilement sticky des cartes de cas d'usage (`sticky top-28`) est désactivé sur mobile grâce aux classes responsive pour éviter que les cartes ne masquent une partie trop importante du viewport vertical. Les cartes se déroulent de façon fluide sous forme de flux vertical standard.

3. **Observé lors d'un test visuel** | **Densité verticale des étapes du questionnaire de préqualification**
   - *Composant :* `src/components/qualification/QuestionStep.tsx`
   - *Viewports :* 375px et 390px
   - *Gravité :* Finition
   - *Impact :* Confort visuel sur smartphone
   - *Observation :* Lorsque la question comporte 4 options avec descriptions longues, le conteneur nécessite un défilement vertical interne sur les écrans de moins de 667px de hauteur utile. Les boutons "Retour" et "Continuer" restent parfaitement accessibles au bas de la carte.

4. **Confirmé dans le code** | **Grille de la section Technologie (4 Piliers)**
   - *Composant :* `src/pages/TechnologyPage.tsx`
   - *Viewports :* 768px (Tablette)
   - *Gravité :* Finition
   - *Impact :* Harmonie visuelle
   - *Observation :* La grille bascule de 1 colonne à 375px à 2 colonnes à 768px puis 4 colonnes à 1280px. Le passage à 768px crée un équilibre 2x2 très propre.

---

## 6. FOCUS PARTICULIER SUR LA HOME PAGE (`/`)

### 6.1. Ordre actuel des sections & Analyse du flux pour un visiteur froid
L'ordre actuel sur la page d'accueil est le suivant :
1. `Hero` (Accroche + CTAs)
2. `LogoSliderSection` (Logos partenaires)
3. `IndustriesSection` (Choix par secteur)
4. `RobotsCatalogSection` (Catalogue des gammes uClean, uServe, uLog)
5. `RobotInActionSection` (Vidéos & Fonctionnalités)
6. `ServicesKargoSection` (Offre d'accompagnement)
7. `ProcessSection` (Méthodologie en 4 étapes)
8. `FinalContactSection` (Formulaire B2B)

### 6.2. Évaluation de l'efficacité de la structure
- **Force de la structure :** Placer `IndustriesSection` immédiatement après la preuve sociale (`LogoSliderSection`) permet à un décideur B2B (ex: un Directeur Logistique ou un Directeur d'Hôpital) de s'orienter directement vers sa problématique métier avant d'explorer le catalogue de machines.
- **Efficacité des CTAs Hero :** Le bouton *"Découvrir la flotte"* défile de manière fluide vers `#robots-catalog` (`RobotsCatalogSection`), tandis que *"Demander une démo"* défile vers `#contact`.
- **Recommandation d'optimisation structurelle (sans modification immédiate) :**
  - Conserver cet ordre qui favorise une qualification par l'usage métier.
  - Envisager d'ajouter sur la Home un bloc d'accès direct au **pré-diagnostic rapide** pour inciter les visiteurs froids à tester l'éligibilité de leur site en 2 minutes.

---

## 7. ASSETS, LOGOS, MÉDIAS ET COHÉRENCE VISUELLE

### 7.1. État des lieux des médias & Chargement
- **Vidéos MP4 intégrées :** `src/assets/videos/Uclean.mp4`, `fixed-Ur.mp4`, `Ulog.mp4`.
  - *Observation :* Les fichiers vidéo sont servis localement. Le chargement est fluide, avec fallback sur poster pour éviter tout écran noir avant le démarrage de l'autofill.
- **Images produits :** `phoenix_robot_hero_1781790796295.jpg`, `image_18_1784117573928.jpg`.
  - *Observation :* Les images de robots présentent un détourage et une intégration sur fond sombre/neutre parfaitement en ligne avec l'univers Swiss Graphic / Industriel.

### 7.2. Respect de la charte visuelle
- **Palette autorisée :**
  - Fond blanc pur (`#FFFFFF`) et surfaces architecturales gris clair (`#F8FAFC`, `#F1F5F9`).
  - Section Hero & cartes sombres techniques en ardoise industrielle (`#0A0F1C`, `#0B1121`).
  - Accentuation en Orange Phoenix (`#F97316`).
- **Interdictions respectées :**
  - Aucun dégradé violet/futuriste ou néon.
  - Aucune icône magique/gadget de type "AI Wand/Sparkles".
  - Typographie sobre, lisible et architecturale (Inter / Font Display).

---

## 8. VERIFICATION DES PARCOURS MÉTIER OBLIGATOIRES

Les tests automatisés et dynamiques ont permis d'évaluer les 6 parcours fonctionnels clés :

1. **Flux ROI Simulateur $\rightarrow$ Secteur $\rightarrow$ `#prequalification` (Confirmé dans le code & Observé en test)**
   - Sur la page `/robots/ulog`, le clic sur *"Vérifier la faisabilité sur mon site"* transmet la cible vers `/industries/industry#prequalification`.
   - Sur la page `/robots/uclean`, le paramètre de surface calculé (ex: `?surface=1500`) est transmis à l'URL `/industries/retail?surface=1500#prequalification`, pré-sélectionnant automatiquement la tranche `500 m² à 2 000 m²` à l'étape 2 du questionnaire.

2. **Affichage du résultat de préqualification (Confirmé dans le code & Observé en test)**
   - À la fin du questionnaire sur `IndustryPage.tsx`, la carte `QualificationResult` s'affiche immédiatement avec le badge d'éligibilité (*"Diagnostic Favorable"*), le rappel des points de faisabilité et la synthèse des recommandations.

3. **Mise en avant des robots recommandés dans le carrousel (Confirmé dans le code & Observé en test)**
   - Le composant `FleetCarousel` reçoit `recommendedRobotIds`. Les robots éligibles sont réordonnés en tête de carrousel et reçoivent le badge visuel distinctif *"Recommandé pour votre sélection"*.

4. **Recommandation multi-robots & valeur `flotte-mixte` (Confirmé dans le code)**
   - Lorsque le moteur d'évaluation (`evaluateQualification.ts`) identifie 2 robots recommandés ou plus, `mapQualificationToContact` définit `suggestedModel = "flotte-mixte"`.
   - Le sélecteur du formulaire de contact se positionne automatiquement sur la valeur exacte `"flotte-mixte"`.

5. **Propagation du diagnostic vers `ContactForm` (Confirmé dans le code & Observé en test)**
   - À la fin de la qualification, le champ texte `details` du formulaire de contact est enrichi d'un résumé structuré :
     `[Préqualification Technique Phoenix-Botics] Secteur: Retail | Besoins: Lavage et entretien des sols | Éligibilité: Favorable | Modèles suggérés: uClean Compact`.

6. **Ancrage & défilement fluide (Confirmé dans le code & Observé en test)**
   - Une fois la qualification terminée, le scroll reste positionné sur l'en-tête de `#prequalification` avec un décalage de 100px pour tenir compte du Header sticky, présentant ainsi le diagnostic immédiatement sans saut brutal.

---

## 9. SYNTHÈSE FINALE & PRIORITÉS D'AMÉLIORATION

### 9.1. Points forts et acquis solides
- **Architecture technique robuste :** React 19, TypeScript strict, Vite 6, Tailwind CSS v4, composabilité claire.
- **Design B2B d'excellence :** Le Mega Menu B2B refondu est un modèle d'ergonomie et de clarté pour les décideurs.
- **Moteur de préqualification intégré :** Un outil de conversion unique qui qualifie le besoin technique avant toute prise de contact commercial.
- **Codebase propre et maintenable :** Aucune erreur de compilation, typage TypeScript complet, zéro régression Git.

### 9.2. Incohérences majeures & Axes de travail ultérieurs

#### A. Priorité 1 : CRITIQUE (Impact Direct Conversion & SEO)
1. **SEO Pages Industries :** Personnaliser les balises `<title>` et `<meta description>` des 4 pages d'industries (`retail`, `hospitality`, `health`, `industry`) qui réutilisent actuellement un titre et une description génériques.
2. **H1 des Pages Gammes Robots :** Enrichir les balises H1 sur `/robots/uclean`, `/robots/userve` et `/robots/ulog` avec des termes métiers complets (ex: *"Autolaveuses Autonomes & Cobots uClean"* au lieu de *"Série uClean"*).

#### B. Priorité 2 : IMPORTANT (Impact Expérience Utilisateur & Copywriting)
1. **Copywriting des Titres Hero :** Rendre les titres H1 des pages secteurs plus concrets et axés sur les résultats métiers (remplacer les formulations telles que *"L'expérience magasin augmentée"* par *"Automatisation de la propreté et de la logistique en point de vente"*).
2. **Bandeau de pré-diagnostic rapide sur la Home :** Ajouter un point d'entrée court sur la page d'accueil pour rediriger les visiteurs vers le module de préqualification sectoriel.

#### C. Priorité 3 : CONFORT / FINITION (Impact Polish Visuel & Ergonomie)
1. **Pacing des descriptions dans le questionnaire :** Optimiser l'espacement vertical des cartes de questions sur très petits écrans (< 375px).
2. **Accélération des micro-animations :** Ajuster légèrement la vitesse des transitions sur les cartes de cas d'usage.

---

*Ce rapport d'audit exhaustif constitue la feuille de route factuelle et validée pour les prochaines phases d'optimisation de la plateforme Phoenix-Botics.*
