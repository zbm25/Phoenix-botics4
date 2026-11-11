# Document d'Architecture, Spécifications Techniques & Roadmap Officiel
**Projet :** Phoenix-Botics — Site B2B Distribution & Intégration Robotique Industrielle
**Dépôt :** `zbm25/Phoenix-botics4`
**Version :** 1.0.0 (Spécifications V1 - Post-Audit)
**Auteur :** Équipe Lead Front-End Architecture
**Statut :** Recommandé pour Validation Client / Direction

---

## 1. Analyse Technique de l'Existant sur Phoenix-botics4

### 1.1. Structure du Dépôt à la Racine
Le projet repose sur une pile moderne React 19 + TypeScript 5.8 + Vite 6 + Tailwind CSS V4.

```text
Phoenix-botics4/
├── public/                 # Assets statiques (favicons, images publiques)
├── src/                    # Code source de l'application React
│   ├── assets/             # Images et icônes
│   ├── components/         # Composants UI React
│   ├── data/               # Sources de données TypeScript (robotSeries.ts)
│   ├── hooks/              # Hooks personnalisés (ex: usePageMeta.ts)
│   ├── motion/             # Configurations d'animations Framer Motion
│   ├── pages/              # Vues/Pages principales React Router
│   ├── App.tsx             # Composant racine & Définition du routage
│   ├── data.ts             # Ancien fichier de données (données legacy)
│   ├── index.css           # Thème global Tailwind CSS V4 & Variables
│   ├── main.tsx            # Point d'entrée de l'application Vite
│   └── types.ts            # Déclarations de types TypeScript
├── bun.lock                # Lockfile Bun
├── index.html              # Template HTML5 principal
├── package.json            # Manifeste de dépendances et scripts
├── tsconfig.json           # Configuration du compilateur TypeScript
└── vite.config.ts          # Configuration de build Vite
```

### 1.2. État du Routage Actuel (`src/App.tsx`)
Le routage est actuellement géré par `react-router-dom` (v7) avec les routes suivantes :
- `/` : `HomePage` (Assemble Hero, Catalogues, Industries, Process, Services, Contact, Footer)
- `/robots/:seriesId` : `RobotSeriesPage` (Gamme uClean, uLog, uServe)
- `/industries/:industryId` : `IndustryPage` (Secteurs d'activité)
- `/technologie` : `TechnologyPage` (Technologies embarquées)
- `/a-propos` : `AboutPage` (Présentation institutionnelle)
- `/services` : `ServicesPage` (Services d'accompagnement & Kargo)

### 1.3. Structures de Données (`src/data/robotSeries.ts`)
Les données produits sont centralisées sous forme d'objets TypeScript stricts dans `ROBOT_SERIES_DATA` :
- **Séries documentées :** `uclean-series`, `ulog-series`, `userve-series`.
- **Modèles de robots référencés :**
  - *uClean :* Compact, Vacuum 40, Scrub 50 Disc, Scrub 50 Roller, Scrub 75.
  - *uLog :* Deliver 80, Deliver 150, Deliver 300, Deliver 300 XL, Lift 300 Base, Lift 300 XL, Lift 600 Base, Lift 600.
  - *uServe :* uServe (robot d'accueil/guidage).
- **Lacunes identifiées lors de l'audit :**
  - Absence de la gamme **uLab** (robotique pour laboratoires et santé).
  - Absence des champs de traçabilité réglementaires B2B : `sourceDocument`, `lastVerified`, `brochureUrl`, `productVideoUrl`.

### 1.4. Audit des Tokens Tailwind & Charte Visuelle Actuelle
Le fichier `src/index.css` utilise Tailwind CSS V4 avec `@theme`. L'analyse révèle un décalage entre l'existant (hérité d'un style SaaS sombre/futuriste) et la charte B2B industrielle requise :
- **Éléments non conformes observés :**
  - Arrière-plan sombres avec halos violets/cosmiques (`bg-[#070318]`, gradients violet/orange, `glow-purple`).
  - Effets de cartes sombres en verre dépoli (`glassmorphic dark card`).
- **Correction B2B requise :**
  - Migration intégrale vers un design pur B2B : fond blanc pur (#FFFFFF), surfaces gris architectural (#F8FAFC, #F1F5F9), bordures fines (#E2E8F0), accents orange signalétique Phoenix (#F97316), typographies sombres épurées (#0B0F19, #1E293B).

---

## 2. Table de Mapping des URLs SEO Françaises (V1)

Afin d'optimiser le référencement naturel (SEO) sur le marché français tout en maintenant la rétrocompatibilité avec les liens déjà partagés ou référencés, une stratégie de routage duale (Redirection 301 / Alias React Router) est établie.

| Ancien Slug / Path | Nouveau Slug SEO V1 | Nom de la Vue / Composant | Statut & Stratégie de Transition |
| :--- | :--- | :--- | :--- |
| `/` | `/` | `HomePage` | Conservation de la route racine |
| `/robots/uclean-series` | `/robots/uclean` | `RobotSeriesPage` (`seriesId="uclean"`) | **Redirection / Alias** `/robots/uclean-series` -> `/robots/uclean` |
| `/robots/ulog-series` | `/robots/ulog` | `RobotSeriesPage` (`seriesId="ulog"`) | **Redirection / Alias** `/robots/ulog-series` -> `/robots/ulog` |
| `/robots/userve-series` | `/robots/userve` | `RobotSeriesPage` (`seriesId="userve"`) | **Redirection / Alias** `/robots/userve-series` -> `/robots/userve` |
| *Nouveau* | `/robots/ulab` | `RobotSeriesPage` (`seriesId="ulab"`) | **Création de Route** (Gamme Laboratoires & Santé) |
| `/industries/health` | `/secteurs/sante` | `IndustryPage` (`industryId="sante"`) | **Redirection / Alias** `/industries/health` -> `/secteurs/sante` |
| `/industries/industry` | `/secteurs/industrie` | `IndustryPage` (`industryId="industrie"`) | **Redirection / Alias** `/industries/industry` -> `/secteurs/industrie` |
| `/industries/hospitality` | `/secteurs/hotellerie-restauration` | `IndustryPage` (`industryId="hotellerie-restauration"`) | **Redirection / Alias** `/industries/hospitality` -> `/secteurs/hotellerie-restauration` |
| `/industries/retail` | `/secteurs/retail` | `IndustryPage` (`industryId="retail"`) | **Redirection / Alias** `/industries/retail` -> `/secteurs/retail` |
| *Nouveau* | `/secteurs/batiments-erp` | `IndustryPage` (`industryId="batiments-erp"`) | **Création de Route** (Bâtiments publics, gares, aéroports) |
| `/a-propos` | `/about` | `AboutPage` | **Alias bidirectionnel** (`/about` et `/a-propos`) |
| `/services` | `/services` | `ServicesPage` | Conservation de la route |
| `/technologie` | `/technologie` | `TechnologyPage` | Conservation de la route (redirection vers `/services` dans le menu) |
| *Nouveau* | `/contact` | `ContactPage` / `FinalContactSection` | Route dédiée à l'étude de faisabilité et demande de démo |

### Stratégie Technique de Redirection dans React Router
Dans `src/App.tsx`, les anciens slugs seront préservés via des composants `<Navigate replace to="..." />` ou des routes d'alias afin de ne pas casser le trafic entrant :
```tsx
<Route path="/robots/uclean-series" element={<Navigate to="/robots/uclean" replace />} />
<Route path="/industries/health" element={<Navigate to="/secteurs/sante" replace />} />
```

---

## 3. Positionnement de Marque & Gouvernance URG

### 3.1. Identité Officielle
- **Nom de marque officiel et unique :** **Phoenix-Botics** (avec majuscule P et B, reliés par un trait d'union). Aucune variante telle que "Phoenix Robotics" ou "PhoenixBotics" sans trait d'union ne sera tolérée.
- **Positionnement de référence :** "Partenaire de distribution et d'intégration des solutions United Robotics Group en France".

### 3.2. Traitement de la Marque United Robotics Group (URG)
- La marque **United Robotics Group (URG)** est le constructeur partenaire principal. Elle doit apparaître de façon sobre, élégante et secondaire dans le respect de l'équilibre de marque B2B :
  1. **Top Bar B2B :** Mention explicite du partenariat.
  2. **Footer :** Mentions légales de distribution et copyright.
  3. **Page `/about` :** Section dédiée expliquant le modèle "Constructeur URG + Intégrateur Phoenix-Botics".
  4. **Badge de certification :** Composant `UnitedRoboticsGroupPartnerBadge.tsx` affiché sur les fiches produits et dans le Header.
- **Interdictions formelles :** Proscrire tout terme non contractuel ou abusif tel que "certifié URG", "filiale URG", ou "exclusif URG" tant que l'exclusivité territoriale n'est pas validée.

### 3.3. Charte Visuelle B2B Industrielle (Strict Design Tokens)
- **Fond général de page :** Blanc pur `#FFFFFF`.
- **Surfaces de cartes / conteneurs :** Slate-50 `#F8FAFC` et Slate-100 `#F1F5F9`.
- **Bordures et séparateurs :** Slate-200 `#E2E8F0` (bordures 1px épurées).
- **Couleur d'accentuation (Brand) :** Orange Signalétique Phoenix `#F97316` (Tailwind `orange-500` / `orange-600` pour le survol).
- **Typographie & Textes :**
  - Titres principaux : Slate-900 `#0B0F19` (Police sans-serif professionnelle 'Inter' ou 'Space Grotesk').
  - Corps de texte : Slate-700 `#334155` / Slate-600 `#475569`.
- **Proscriptions strictes :** Aucun néon, aucun gradient violet/cyber, aucun fond noir intégral, aucun effet de flou glassmorphic de type SaaS B2C.

---

## 4. Spécifications Détaillées du Header & des Méga-Menus V1

Le Header constitue la pièce maîtresse de la navigation B2B. Il combine une Top Bar d'autorité, une Navbar principale et deux Méga-Menus à interactions hybrides.

```text
+-----------------------------------------------------------------------------------------------------------------------+
| TOP BAR B2B: Phoenix-Botics — Partenaire de distribution et d'intégration URG en France | Tel: 01 XX XX XX XX | Contact |
+-----------------------------------------------------------------------------------------------------------------------+
| [LOGO PHOENIX-BOTICS]   [Robots ▾]   [Secteurs ▾]   À propos   Services                  [Demander une démo (Orange)]|
+-----------------------------------------------------------------------------------------------------------------------+
| MÉGA-MENU ROBOTS (au survol / clic / focus) :                                                                         |
| +-----------------------------------+ +-----------------------------------+ +---------------------------------------+ |
| | uClean - Nettoyage professionnel  | | uLog - Intralogistique & AMR      | | Colonne Éditoriale & Conseil :        | |
| | uServe - Service & Accueil        | | uLab - Laboratoires & Santé       | | "Une flotte robotique adaptée..."   | |
| +-----------------------------------+ +-----------------------------------+ | [Étude de faisabilité gratuite →]    | |
|                                                                             +---------------------------------------+ |
+-----------------------------------------------------------------------------------------------------------------------+
```

### 4.1. Composants du Header

#### A. Top Bar B2B (`TopBarB2B.tsx`)
- **Contenu :**
  - Message de positionnement : *"Phoenix-Botics — Partenaire de distribution et d'intégration des solutions United Robotics Group en France"*.
  - Badge constructeur discret : `UnitedRoboticsGroupPartnerBadge.tsx`.
  - Liens de contact rapide : Téléphone support/commercial et lien vers `/contact`.
- **Style :** Background Slate-900 `#0B0F19`, texte Slate-300 `#D1D5DB`, hauteur 36px, typographie 12px.

#### B. Navbar Principale (`Header.tsx`)
- **Logo :** Phoenix-Botics (Format vectoriel SVG, hauteur 32px) liant vers `/`.
- **Navigation principale :**
  - Déclencheur Méga-Menu 1 : **Robots** (bouton interactif avec chevron `ChevronDown`).
  - Déclencheur Méga-Menu 2 : **Secteurs** (bouton interactif avec chevron `ChevronDown`).
  - Lien simple : **À propos** (`/about`).
  - Lien simple : **Services** (`/services`).
- **CTA Principal :** Bouton Orange Signalétique Phoenix `#F97316` *"Demander une démonstration"* redirigeant vers `/contact` (`focus:ring-2 focus:ring-orange-500`).

#### C. Méga-Menu 1 "Robots" (`MegamenuRobots.tsx`)
Contient une grille à 2 colonnes principales + 1 colonne éditoriale :
1. **Cartes des 4 Gammes Officielle :**
   - **uClean** : Nettoyage autonome professionnel (Autolaveuses, aspirateurs HEPA). -> `/robots/uclean`
   - **uLog** : Transport et manutention autonomes (AMR de 80kg à 600kg). -> `/robots/ulog`
   - **uServe** : Robots autonomes de service, d'accueil et de livraison. *(Note : interdiction du mot "cobot" pour uServe)*. -> `/robots/userve`
   - **uLab** : Robotique pour laboratoires et environnements de santé. -> `/robots/ulab`
2. **Colonne Éditoriale d'Accompagnement :**
   - Titre : *"Une flotte robotique adaptée à vos environnements de travail."*
   - Paragraphe : *"Nos ingénieurs vous accompagnent de l'audit de site jusqu'au maintien en condition opérationnelle."*
   - Bouton CTA secondaire : *"Demander une étude de faisabilité"* (`/contact`).
3. **Style :** Fond blanc, bordure Slate-200, ombre architecturale subtile `shadow-[0_18px_45px_rgba(15,23,42,0.10)]`.

#### D. Méga-Menu 2 "Secteurs" (`MegamenuSecteurs.tsx`)
Grille de 5 cartes présentant les secteurs d'activité cibles :
1. **Santé & Établissements Soignants** (`/secteurs/sante`) : Hygiène HEPA, transport de prélèvements, réduction de la pénibilité.
2. **Industrie & Manufacturier** (`/secteurs/industrie`) : Flux intralogistiques, approvisionnement de lignes, charges lourdes.
3. **Hôtellerie & Restauration** (`/secteurs/hotellerie-restauration`) : Service en salle, nettoyage silencieux, expérience client.
4. **Commerce & Retail** (`/secteurs/retail`) : Entretiens des surfaces de vente, guidage visiteurs, réassort.
5. **Bâtiments Publics & ERP** (`/secteurs/batiments-erp`) : Gares, aéroports, sièges sociaux, entretien haute fréquence.

### 4.2. Interactions Hybrides & Accessibilité (WAI-ARIA)
Pour garantir une expérience utilisateur parfaite tant sur ordinateur que sur appareil mobile :
- **Déclenchement hybride :**
  - **Au survol (Hover intent) :** Ouverture avec temporisation (buffer de 150ms à l'entrée et 200ms à la sortie pour éviter les fermetures intempestives).
  - **Au clic / Focus clavier :** Ouverture immédiate lors de l'appui sur `Entrée` ou `Espace`.
  - **Fermeture à la touche Échap (Escape) :** La pression sur `Échap` ferme immédiatement le méga-menu ouvert et replaçe le focus clavier sur le bouton déclencheur.
- **Attributs WAI-ARIA stricts :**
  - Déclencheurs : `aria-expanded="true|false"`, `aria-controls="megamenu-robots"`, `aria-haspopup="true"`.
  - Conteneur Méga-Menu : `id="megamenu-robots"`, `role="region"`, `aria-label="Gamme de robots Phoenix-Botics"`.
  - Focus Ring : Style d'enclosure visible `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2`.
- **Comportement Mobile (Drawer) :**
  - Sur petit écran (< 1024px), le menu bascule en drawer latéral coulissant (`MobileDrawer.tsx`).
  - Les méga-menus se transforment en accordéons dépliables accessibles au pouce.

### 4.3. Interface TypeScript des Composants Header
```typescript
// src/types/header.ts

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  iconName?: string;
  badge?: string;
}

export interface MegamenuRobotsProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab?: string;
}

export interface MegamenuSecteursProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface PartnerBadgeProps {
  variant?: 'light' | 'dark' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}
```

---

## 5. Détail Page par Page (Sections et Composants)

### 5.1. Page d'Accueil (`/`)
- **Header & TopBar B2B :** Navigation principale avec Méga-Menus V1.
- **Hero Section B2B (`Hero.tsx`) :**
  - Titre à forte valeur industrielle : *"Intégrateur & Distributeur de Robots Mobiles Autonomes (AMR & Cobots)"*.
  - Sous-titre : *"Optimisez la propreté de vos sites et vos flux intralogistiques avec les solutions United Robotics Group."*
  - CTAs : *"Découvrir nos gammes"* (scroll vers catalogue) + *"Étude de faisabilité gratuite"* (`/contact`).
- **Barre d'Éléments d'Autorité (`KeyMetricsBar.tsx`) :** 4 indicateurs B2B (Mètres carrés nettoyés, Taux de disponibilité 99.8%, Flottes déployées, Support France).
- **Bandeau Partenaire Constructeur (`LogoSliderSection.tsx`) :** Logo United Robotics Group + badges de fiabilité industrielle.
- **Section Gammes de Robots (`RobotsCatalogSection.tsx`) :** Présentation sous forme de cartes d'ingénierie des gammes uClean, uLog, uServe et uLab.
- **Section Secteurs d'Activité (`IndustriesSection.tsx`) :** Aperçu des 5 secteurs d'application.
- **Section Méthodologie & Accompagnement (`ProcessSection.tsx`) :** Les 4 étapes Phoenix (1. Audit sur site, 2. Cartographie 3D, 3. Intégration IoT/Fleet, 4. Maintenance Phoenix Care).
- **Section Formulaire d'Étude & Demande de Démo (`FinalContactSection.tsx`) :** Formulaire B2B complet avec choix du projet, type de site et superficie.
- **Footer Institutionnel (`Footer.tsx`).**

### 5.2. Pages Gammes Robots (`/robots/uclean`, `/robots/ulog`, `/robots/userve`, `/robots/ulab`)
- **Hero de Gamme :** Titre, description métier, bénéfices clés et visuel principal du robot phare de la gamme.
- **Filtres de Modèles & Sélecteur :** Navigation rapide entre les modèles de la série.
- **Fiche Technique Détaillée par Modèle :**
  - Caractéristiques d'ingénierie : Rendement (m²/h), autonomie, capacité de charge (kg), dimensions, réservoirs, type de batterie, vitesse.
  - Usages recommandés et types de sols / environnements compatibles.
  - Section médias : Photos HD + Boutons de téléchargement de la brochure PDF (`brochureUrl`) et vidéo de démonstration (`productVideoUrl`).
  - Encart de traçabilité des données : `sourceDocument` et date de dernière vérification `lastVerified`.
- **FAQ Spécifique à la Gamme :** Questions fréquentes sur la sécurité, la cartographie LiDAR et l'entretien.
- **CTA d'Étude de Faisabilité.**

### 5.3. Pages Secteurs d'Activité (`/secteurs/:secteurId`)
- **Hero Sectoriel :** Enjeux du secteur (ex: Santé -> Désinfection et silence ; Industrie -> Cadence et charges lourdes).
- **Défis Métiers & Solutions Robotiques :** Matrice de correspondance entre les problèmes du secteur et les robots recommandés (recherche via `getRobotsByIndustry`).
- **Cas d'Usage Réels & Métriques de Gain :** ROI estimé, réduction de la pénibilité (TMS), continuité de service.
- **Formulaire de Contact Sectoriel.**

### 5.4. Page À propos (`/about`)
- **Positionnement Phoenix-Botics :** Présentation du rôle d'expert intégrateur en France.
- **Explication du Partenariat URG :** Rôles respectifs entre le constructeur européen United Robotics Group et l'intégrateur terrain Phoenix-Botics.
- **Engagements de Service & Valeurs B2B :** Proximité, rigueur technique, conformité sécurité ISO/CE.
- **Section Centre Technique & Showroom Île-de-France `[À VALIDER]`**.

### 5.5. Page Services & Accompagnement (`/services`)
- **Détail de l'Offre de Services Phoenix Care :**
  - **Audit & Ingénierie :** Relevé LiDAR 3D des locaux, analyse des flux et des sols.
  - **Intégration & Fleet RCS :** Connexion aux ascenseurs, portes automatiques et WMS/ERP.
  - **Formation & Prise en main :** Formation des agents et techniciens sur site.
  - **Maintenance & SLA :** Supervisions à distance, pièces de rechange et hotline.

### 5.6. Page Contact & Demande d'Étude (`/contact`)
- **Formulaire de Qualification B2B :**
  - Coordonnées professionnelles (Nom, Entreprise, SIRET optionnel, Email pro, Téléphone).
  - Type de besoin (Nettoyage uClean, Intralogistique uLog, Accueil uServe, Santé uLab).
  - Caractéristiques du site (Superficie en m², contraintes particulières).
  - Choix de modalité souhaitée (Achat, LLD, Robot-as-a-Service RaaS).
- **Coordonnées Directes & Engagements de Réponse sous 24h.**

---

## 6. Tableau des Validations Internes `[À VALIDER]`

Afin de garantir une gouvernance irréprochable des données et d'éviter toute promesse commerciale non tenue, les éléments suivants sont répertoriés avec leur statut de validation requis auprès de la direction et du service juridique/commercial.

| Élément / Assertion | Description & Impact Client | Statut Actuel | Action Requise avant Mep |
| :--- | :--- | :--- | :--- |
| **Exclusivité Contractuelle France** | Mention d'exclusivité de distribution des robots URG sur le territoire français. | `[À VALIDER]` | Vérification des clauses du contrat de distribution URG. En cas de non-exclusivité, utiliser "Partenaire de distribution et d'intégration". |
| **Showroom Île-de-France** | Existence et adresse physique d'un centre de démonstration et showroom en Région Parisienne. | `[À VALIDER]` | Confirmer l'adresse exacte et la possibilité d'accueillir des clients sur rendez-vous. |
| **Garanties SLA 48h & Hotline 24/7** | Engagement de temps d'intervention sur site sous 48h et support téléphonique 24h/24. | `[À VALIDER]` | Valider la capacité opérationnelle de l'équipe technique maintenance. |
| **Stock Pièces détachées France** | Disponibilité immédiate d'un stock de pièces d'usure (brosses, raclettes, batteries) en France. | `[À VALIDER]` | Confirmer la localisation du dépôt de pièces détachées. |
| **Témoignages & Logos Clients** | Utilisation des logos et citations de clients grands comptes. | `[À VALIDER SELON AUTORISATIONS]` | Recueillir les accords écrits de droit à l'image auprès des clients cités. |
| **Tarifs & Modalités Financières** | Affichage de prix ou de loyers mensuels indicatifs. | `[À VALIDER]` | **Règle stricte :** Aucun prix direct. Mention obligatoire *"Sur devis après étude de faisabilité sur site"*. |
| **Intégration Fleet RCS / IoT Bâtiment** | Compatibilité native avec tous types d'ascenseurs et WMS. | `[À VALIDER]` | Mentionner *"Sous réserve d'analyse de compatibilité de l'infrastructure du site"*. |
| **Fiches Produits & Médias uLab** | Données techniques, visuels et brochures pour la gamme uLab (salle blanche / hôpital). | `[À VALIDER / DONNÉES EN ATTENTE]` | Données en attente du constructeur URG ; structure créée mais étiquetée en réserve. |

---

## 7. Roadmap d'Implémentation par Phases

L'exécution des développements front-end s'articulera autour de 4 phases jalonnées.

```text
+-----------------------------------------------------------------------------------------------------------------------+
| PHASE 1 : Header, Méga-Menus, Design System B2B & Badges De Marque                                                    |
| - Création TopBarB2B, Navbar B2B, MegamenuRobots, MegamenuSecteurs, UnitedRoboticsGroupPartnerBadge.                |
| - Refonte de src/index.css (Design tokens B2B stricts, suppression des halos violets/gradients SaaS).                  |
| - Interactions hybrides (survol, focus, clavier, Échap) & Accessibilité WAI-ARIA.                                     |
+-----------------------------------------------------------------------------------------------------------------------+
                                           │
                                           ▼
+-----------------------------------------------------------------------------------------------------------------------+
| PHASE 2 : Refonte Routing SEO, Aliasing & Reprise Modèle de Données                                                   |
| - Mise en place des routes SEO Françaises (/robots/uclean, /secteurs/sante, etc.) dans App.tsx avec redirections 301. |
| - Extension du fichier src/data/robots.ts (ou robotSeries.ts) : Ajout gamme uLab et champs traçabilité B2B.            |
+-----------------------------------------------------------------------------------------------------------------------+
                                           │
                                           ▼
+-----------------------------------------------------------------------------------------------------------------------+
| PHASE 3 : Vues Métiers, Fiches Produits & Formulaires B2B                                                            |
| - Refonte des pages Gammes (/robots/:seriesId) et Secteurs (/secteurs/:secteurId).                                    |
| - Enrichissement des fiches produits avec boutons brochures PDF, vidéos et encarts [À VALIDER].                       |
| - Création du composant dédié de demande d'étude de faisabilité (/contact).                                            |
+-----------------------------------------------------------------------------------------------------------------------+
                                           │
                                           ▼
+-----------------------------------------------------------------------------------------------------------------------+
| PHASE 4 : Finitions, QA, Accessibilité A11y & Performance                                                             |
| - Audit d'accessibilité (contraste des couleurs, navigation 100% clavier, screen readers).                            |
| - Optimisation des images Cloudinary (f_auto, q_auto) et temps de chargement Lighthouse > 90.                        |
| - Tests de non-régression et recette finale avant livraison.                                                         |
+-----------------------------------------------------------------------------------------------------------------------+
```

### Détail des Livrables par Phase

#### Phase 1 : Design System B2B & Composants Header (Priorité Immédiate)
- Clean up de `src/index.css` : éradication du thème sombre/purple au profit d'un thème B2B clair.
- Création du composant `UnitedRoboticsGroupPartnerBadge.tsx`.
- Refonte complète de `Header.tsx` intégrant `TopBarB2B`, `MegamenuRobots` (4 gammes + colonne éditoriale) et `MegamenuSecteurs` (5 secteurs).
- Implémentation des gestionnaires d'événements pour le survol temporisé, le focus clavier et la touche `Échap`.

#### Phase 2 : Données & Infrastructure Routing SEO
- Restructuration des fichiers dans `src/data/` pour inclure la gamme **uLab** et les champs de traçabilité (`sourceDocument`, `lastVerified`, `brochureUrl`, `productVideoUrl`).
- Mise à niveau de `App.tsx` pour prendre en charge l'intégralité des nouvelles routes SEO B2B V1 (`/robots/uclean`, `/secteurs/sante`, etc.) tout en conservant la rétrocompatibilité via redirections.

#### Phase 3 : Vues Produit & Expérience Client
- Mise en conformité visuelle des pages d'accueil, gammes et secteurs avec les nouveaux tokens B2B (fonds clairs, typographie sombre, accents orange).
- Ajout du marquage systématique `[À VALIDER]` sur les éléments soumis à réserve dans les interfaces.
- Implémentation du formulaire de qualification B2B sur `/contact`.

#### Phase 4 : QA & Conformité Industrielle
- Validation de la conformité responsive (Desktop, Tablette, Mobile Drawer).
- Vérification TypeScript intégrale (`npm run lint` / `tsc --noEmit`).
- Vérification du respect des règles d'accessibilité (WCAG 2.1 AA) et validation de l'arborescence finale.

---

*Fin du Document d'Architecture et Spécifications Officiel `docs/site-plan.md`.*
