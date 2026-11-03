# Audit & Conception : Nouvelle Section Flotte Bento + Intégration uLab Mobile

## 1. Audit Préliminaire de l'existant

### A. État des lieux de la route `uLab Mobile`
Après analyse du dépôt (`src/App.tsx`, `src/data/robotSeries.ts`, `src/pages/RobotSeriesPage.tsx`) :
- **Route existante** : `App.tsx` déclare une route dynamique `<Route path="/robots/:seriesId" element={<RobotSeriesPage />} />`. Cette route est générique et peut afficher n'importe quelle série à condition qu'elle existe dans les données.
- **Données** : Il n'y a **aucune trace** de données concernant `uLab` ou `ulab-series` dans `src/data/robotSeries.ts`.
- **Méga-menu / Header** : uLab n'y figure pas. Le Header s'appuie sur une constante indépendante (`ROBOT_GAMMES` dans `src/components/Header.tsx` vraisemblablement, à confirmer).
- **Conclusion & Recommandation** :
  - L'accès `/robots/ulab-series` affichera actuellement une erreur 404 (via le gestionnaire de page non trouvée) car l'ID n'existe pas dans la base de données.
  - La page `RobotSeriesPage.tsx` est parfaitement structurée pour ingérer un nouveau produit. **Il n'est pas nécessaire de créer un composant de page spécifique pour uLab.** L'injection de données formatées selon le contrat `RobotSeriesPageData` suffira.
  - L'identifiant canonique recommandé est bien `ulab-series`.

### B. État des lieux du calculateur ROI
- Le simulateur ROI est intégré sous forme d'une section `<section id="simulateur-roi">` directement dans le composant générique `src/pages/RobotSeriesPage.tsx`.
- Les trois gammes existantes pointent vers leurs ancres de page respectives :
  - `/robots/uclean-series#simulateur-roi`
  - `/robots/ulog-series#simulateur-roi`
  - `/robots/userve-series#simulateur-roi`
- **Recommandation pour la maquette Bento** :
  - Le bloc Bento "Simulateur ROI" ne peut pas envoyer vers une page globale de ROI, car celle-ci n'existe pas de manière autonome (elle est liée à la page d'un produit).
  - Il faut remplacer le CTA unique "Lancer le calculateur ROI" par des options de sélection de la gamme (uClean, uLog, uServe) ou renvoyer par défaut vers une ancre spécifique tout en laissant l'utilisateur choisir. Dans notre implémentation maquette, nous mettrons un menu/boutons pour choisir la gamme à simuler, ou un CTA générique qui ouvre une modale de sélection de la gamme.

## 2. Développement de la Maquette Isolée (Bento Grid)

### A. Structure Bento Grid
La grille Bento a été implémentée dans `src/components/preview/PreviewRobotsCatalogSection.tsx` en respectant la charte Phoenix-Botics (fonds clairs, typographie contrastée, accent Orange `#F97316`) et l'agencement demandé :
- **Ligne 1** : uClean (7 colonnes) + ROI (5 colonnes)
- **Ligne 2** : uLog (5 colonnes) + uServe (7 colonnes)
- **Ligne 3** : uLab Mobile (12 colonnes, pleine largeur)

### B. Corrections Apportées (Données et Textes)
- Suppression des promesses absolues ("zéro modification d'infrastructure" retiré).
- Le bloc ROI a été ajusté. Au lieu d'un CTA généralisant vers un calculateur unique (qui n'existe pas globalement), il ouvre une sélection permettant à l'utilisateur de choisir vers quel calculateur de gamme il souhaite naviguer.
- Le CTA générique "Organiser une démonstration sur site" en bas de section a été supprimé comme demandé.

### C. Prototype uLab Mobile (`src/data/previewUlabData.ts`)
Les données prototypales ont été créées **sans être injectées dans l'application de production**.
- Les caractéristiques techniques incertaines (charge de 10 à 20 kg, autonomie 8h, LIMS, 24/7) ont été retirées ou marquées "à confirmer".
- La route pointera de façon logique vers `/robots/ulab-series`.

## 3. Livrables et Captures Playwright

### Fichiers Modifiés ou Créés
1. `AUDIT_BENTO_FLEET_ULAB.md` (Créé - Rapport complet).
2. `src/data/previewUlabData.ts` (Créé - Données prototype pour uLab Mobile).
3. `src/components/preview/PreviewRobotsCatalogSection.tsx` (Modifié - Maquette Bento Grid à 5 blocs).
4. `run-capture.js` (Créé - Script Playwright de capture dédié).

### Captures d'écran (Disponibles dans le dossier `audit_screenshots/`)
Les captures Playwright prouvent l'implémentation de la nouvelle disposition :
- **Vue Desktop (1440px)** : `audit_screenshots/bento-fleet-1440px.png`
- **Vue Mobile (390px)** : `audit_screenshots/bento-fleet-mobile-390px.png`

L'environnement de production et l'arborescence officielle (`App.tsx`, `robotSeries.ts`) **n'ont pas été altérés**. J'attends votre validation visuelle pour procéder à l'intégration publique.

## 4. Audit du Template `RobotSeriesPage.tsx` et Intégration uLab

### A. Constat sur la navigation (`Header.tsx`)
Contrairement à l'hypothèse initiale, la navigation Mega Menu (`Header.tsx`) **n'est pas générée dynamiquement à partir de `ROBOT_SERIES_DATA`**.
- Elle utilise une constante locale asynchrone `ROBOT_GAMMES` (ligne ~55 de `src/components/Header.tsx`).
- **Action nécessaire pour la production :** Il faudra explicitement créer une entrée complète pour uLab dans `ROBOT_GAMMES` (avec title, subtitle, icon, color et `models: []`) pour qu'elle soit cliquable dans le Mega Menu Desktop et l'accordéon Mobile, sinon la carte Bento sera le seul moyen d'accès à la page.

### B. Constat sur le Template et uLab (`RobotSeriesPage.tsx`)
- La page est robuste. Si `seriesId` n'est pas trouvé dans `ROBOT_SERIES_DATA` (ce qui sera le cas de uLab si l'URL est visitée aujourd'hui), le composant renvoie un fallback d'erreur propre, donc cela ne crashe pas.
- **Module ROI :** Le template conditionne le pré-remplissage du simulateur ROI (uClean, uLog, uServe) en fonction de l'URL et du secteur. Si aucune logique spécifique à uLab n'y est implémentée, le formulaire risque de planter ou de montrer des secteurs inappropriés.
- **Recommandation pour l'intégration publique :** S'il n'y a pas de calculateurs ROI vérifiés pour le monde du laboratoire (uLab), nous devons **désactiver purement et simplement le rendu du composant `<section id="simulateur-roi">`** pour l'identifiant `ulab-series`.


## 5. Diagnostic : Zone blanche et rendu Playwright
Lors de la première itération, les captures d'écran affichaient une zone blanche à la place des cartes des gammes uLog, uServe et uLab. L'analyse a révélé que ce défaut n'était pas un problème de disposition CSS de la grille, mais un conflit d'animation au rendu :
- **Cause :** Les cartes utilisaient des composants `motion.div` (Framer Motion) avec la propriété `whileInView`. Le script Playwright initial effectuait une capture immédiate sans faire défiler la page (`window.scrollTo`). Les éléments n'étant techniquement pas entrés dans le viewport, Framer Motion les laissait à leur état initial `opacity: 0`, ce qui se traduisait visuellement par un espace blanc.
- **Action de contournement :** Pour cette itération de prévisualisation isolée, les balises `motion.div` ont été remplacées par des balises `div` standard sur les cartes (l'en-tête conserve l'animation). Le script de capture a été renforcé avec une boucle de défilement progressive (tous les 100px) pour forcer le rendu des éléments différés (lazy loading). Lors de l'intégration finale, les animations `motion.div` pourront être rétablies, car la navigation humaine déclenchera naturellement l'événement `whileInView`.
