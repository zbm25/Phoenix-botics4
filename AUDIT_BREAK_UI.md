# Audit UI/UX Systematique & Methode `break-ui` — Phoenix-Botics

**Auteur :** Jules — Ingénieur Système & UX B2B
**Projet :** Phoenix-Botics (Stack React 19, Tailwind CSS V4, Vite)
**Méthodologie :** Audit par cassure visuelle (`break-ui`) sur 3 viewports clés :
- **Desktop :** 1440 × 900 px
- **Tablette :** 768 × 1024 px
- **Mobile :** 375 × 812 px et 390 × 844 px

---

## 1. Executive Summary & Diagnostic Global

L'audit visuel et ergonomique selon la méthode `break-ui` met en évidence une interface globalement moderne mais entachée de plusieurs disparités micro-ergonomiques et de non-conformités par rapport aux standards B2B industriels rigoureux (référentiel *emilkowalski/skills*).

### Défaillances majeures identifiées :
1. **Section Flotte de la Home (`RobotsCatalogSection.tsx`) :**
   - Utilisation d'un visuel panoramique unique tronqué (`FLEET_IMAGE_URL`), masquant les spécificités individuelles des gammes (**uClean**, **uLog**, **uServe**).
   - Manque de mise en valeur individuelle des 3 gammes fondamentales (présentées en de simples boutons horizontaux discrets au bas de la carte).
   - Absences des doubles parcours de conversion par gamme (Découverte `/robots/[gamme]` vs Calculateur ROI `/robots/[gamme]#simulateur-roi`).
2. **Incohérences de grille & rythmes verticaux :**
   - Présence de paddings et marges hors grille 8px (ex. `py-24`, `mb-16`, `py-20`, `py-28`, `mb-24`).
   - Ruptures de rythme entre les sections claires (`bg-[#FFFFFF]`, `bg-[#F8FAFC]`) et les blocs sombres (`bg-[#0A0F1C]`, `bg-[#0B1121]`).
3. **Hiérarchie typographique & contrastes :**
   - Textes d'accompagnement en `text-slate-400` ou `text-gray-500` parfois trop clairs sur fond sombre `#0B1121` (ratio de contraste WCAG < 4.5:1).
   - Titres aux tailles hétérogènes (combinaisons non normalisées de `text-3xl`, `text-4xl`, `text-5xl`).
4. **Ergonomie tactile & États interactifs manquants :**
   - Plusieurs cibles interactives (notamment des cartes interactives et boutons de filtres secondaires) font moins de 44 px de hauteur tactile minimale recommandée en mobile.
   - Absence généralisée de la réponse tactile `active:scale-[0.98]` et des baguettes `focus-visible:ring-2 focus-visible:ring-orange-500` accessibles sur certains composants interactifs.

---

## 2. Tableau de Synthèse par Viewport (`break-ui`)

| Zone / Composant | Viewport Desktop (1440px) | Viewport Tablette (768px) | Viewport Mobile (375px / 390px) | Gravité UI/UX |
| :--- | :--- | :--- | :--- | :--- |
| **Header (`Header.tsx`)** | Mega-menu centré correct, mais hauteur boutons dropdown variable (36px). | Menu burger s'active à 1024px ; le tiroir mobile prend 100% de la hauteur. | Zone tactile hamburger OK (44x44px), mais accordéons internes étroits (36px). | **Moyenne** |
| **Home Hero (`Hero.tsx`)** | Belle présence visuelle. Marges verticales `py-20` non alignées sur grille 8px. | Alignement du titre acceptable, texte d'accroche un peu dense. | Clic CTA secondaire "Évaluer mon projet" proche de la bordure d'écran. | **Faible** |
| **Catalogue Flotte (`RobotsCatalogSection.tsx`)** | Image panoramique unique floue/tronquée ; les 3 gammes sont reléguées en liens bas de carte. | Carte sombre trop étroite, masquage de l'image de flotte sur les côtés. | Image illisible sur mobile (hauteur < 180px), liens trop petits pour les doigts (< 38px). | **CRITIQUE** |
| **Secteurs (`IndustriesSection.tsx`)** | Cartes sectorielles bien organisées, mais bordures trop contrastées (`border-slate-800`). | Empilement 2x2 propre. | Débordement vertical étendu, boutons "Étudier la faisabilité" < 44px. | **Moyenne** |
| **Services & Intégration (`ServicesKargoSection.tsx`)** | Bonne structure de grille, mais typographie secondaire trop sombre. | Lisibilité correcte. | Espacements `py-20` trop importants pour des écrans mobiles 390px. | **Faible** |
| **Processus (`ProcessSection.tsx`)** | Frise en 4 phases unifiée OK. | Passage en grille 2x2 propre. | Timeline verticale lisible mais hauteur totale > 900px. | **Faible** |
| **Formulaire Contact (`ContactForm.tsx`)** | Champs clairs avec labels, manque de feedback visuel tactile sur focus/active. | Formatage 1 colonne. | Inputs tactiles OK (48px), mais boutons de sélection de secteur étroits. | **Moyenne** |

---

## 3. Analyse Détaillée des 4 Axess d'Audit

### 3.1 Incohérences de Grille & Espacements (Grid System 8px)
- **Règle non respectée :** Toute dimension de marge, padding ou hauteur de composant doit être un multiple strict de 8px (8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 128px).
- **Anomalies relevées dans le code actuel :**
  - `py-20` (80px) alterné avec `py-24` (96px) et `py-28` (112px) de manière inconsistante entre les sections.
  - `mb-10 sm:mb-12` (40px / 48px) mixé avec `mb-14` (56px).
  - Padded de cartes arbitraires : `p-5 sm:p-7 lg:p-9` au lieu d'une échelle normalisée `p-6 lg:p-8`.

### 3.2 Hiérarchie Typographique & Contrastes
- **Palette Couleurs B2B Industrielle :**
  - Fond clair principal : `#FFFFFF` (Pure white)
  - Fond clair secondaire (surface) : `#F8FAFC` (Slate 50) / `#F1F5F9` (Slate 100)
  - Fond sombre technique : `#0A0F1C` (Dark Slate) / `#0B1121` (Navy Slate)
  - Accent signal : `#F97316` (Signal Orange 500)
  - Bordures wireframe : `#E2E8F0` (Slate 200) / `#1E293B` (Slate 800)
- **Anomalies de contrastes :**
  - Dans `RobotsCatalogSection.tsx`, le sous-titre `.text-gray-600` sur `bg-gray-50` manque de mordant B2B.
  - Sur le fond sombre `#0B1121`, le texte `.text-slate-400` des sous-titres descend sous le ratio WCAG AA (4.5:1) sur mobile.
  - Les titres principaux alternent sans règle entre `font-bold` et `font-extrabold`.

### 3.3 Ergonomie Mobile & Touch Targets (< 44px)
- **Règle Apple HIG / W3C Mobile :** Les zones cliquables tactiles doivent avoir une taille minimale de **44 × 44 pt** (ou `min-h-[44px] min-w-[44px]`).
- **Anomalies tactiles relevées :**
  - Boutons de bas de carte dans `RobotsCatalogSection.tsx` : `py-3 px-4` (hauteur totale ~40px).
  - Tags de sélection de secteur dans le MegaMenu et la préqualification : hauteur de ~34px, provoquant des misclicks récurrents sur smartphone.
  - Liens secondaires "Voir la fiche" ou "En savoir plus" : cibles tactiles trop petites (< 32px de hauteur active).

### 3.4 États Interactifs Manquants (Design Engineering)
- **Micro-interactions requises (*emilkowalski/skills*) :**
  - **Press state :** `active:scale-[0.98]` pour un retour haptique visuel instantané lors du clic/toucher.
  - **Hover state :** Transitions douces (`transition-all duration-200`) sur bordures et élévation (`hover:-translate-y-0.5`).
  - **Focus state :** Accessibilité clavier complète via `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2`.
- **Anomalies d'interaction :**
  - Les cartes de robots de la section catalogue actuelle n'ont pas d'état `active:scale-[0.98]`.
  - Les boutons secondaires manquent de retour visuel clair lors de l'appui tactile sur smartphone.

---

## 4. Recommandations de Refonte de la Section Flotte (`RobotsCatalogSection`)

Pour répondre aux exigences strictes de la direction visuelle "Apple / LionsBot B2B" :
1. **Architecture à 3 Cartes Monumentales :**
   - Présenter simultanément les 3 gammes (**uClean**, **uLog**, **uServe**) côte à côte sur Desktop (3 colonnes) et en empilement vertical ou swipe sur mobile.
2. **Visualisation Produit Haute Définition :**
   - Chaque carte intègre le vrai visuel transparent HD du robot star de la gamme, se détachant sur une surface studio sobre (`bg-[#F8FAFC]` ou `#0A0F1C`).
   - Pour les gammes multi-modèles (**uClean** et **uLog**), mise en scène d'1 robot principal dominant avec silhouette secondaire en retrait naturel.
3. **Clarté du Message & Métrique Forte :**
   - Suppression des listes à puces verbeuses.
   - Présentation synthétique : Nom de la gamme + Titre d'intention (Nettoyer, Transporter, Servir) + Une métrique d'impact lisible (ex. *"3 000 m²/h"*, *"Charges jusqu'à 600 kg"*, *"Écran 21.5'' HD"*).
4. **Double Parcours CTA Conforme par Carte :**
   - **CTA Principal (Bouton Orange Signal) :** `Calculer le ROI` $\rightarrow$ `/robots/[gamme]#simulateur-roi`
   - **CTA Secondaire (Wireframe / Text Link) :** `Découvrir la gamme` $\rightarrow$ `/robots/[gamme]`

---

*Rapport d'audit visuel `AUDIT_BREAK_UI.md` finalisé et prêt pour la formalisation des spécifications de maquette.*
