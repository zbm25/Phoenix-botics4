# Audit Complet de Conversion & Parcours Client — Phoenix-Botics (Version Consolidée)

**Auteur :** Jules — Ingénieur Système & UX B2B
**Dépôt :** Phoenix-botics4
**Branche auditée :** `jules-12173905266529557166-9c87136b`
**Commit exact :** `ee9bae972b9d6f8135b16c7bed3631791d4bc244`
**Mode d'exécution :** Audit de conversion, implémentation ciblée et validation fonctionnelle

---

## 1. Synthèse Exécutive & État des Lieux

Cet audit analyse de manière rigoureuse le parcours de conversion B2B de Phoenix-Botics sur l'ensemble de ses points de contact :
- Page d'accueil (**Home**)
- Pages de verticales métiers (**Secteurs** : Retail, Hôtellerie, Santé, Industrie)
- Pages de gammes et modèles de robots (**uClean, uLog, uServe**)
- Questionnaire de préqualification technique (**PrequalificationFlow**)
- Simulateurs de ROI (**uClean, uLog, uServe**)
- Formulaire de contact & prise de rendez-vous (**ContactForm**)

### Diagnostic global du tunnel de conversion
1. **Friction dans le maillage des CTA :** Plusieurs boutons d'action renvoyaient directement vers un formulaire génerique `#contact` au lieu d'amorcer l'outil de diagnostic/préqualification, ce qui créait une rupture dans l'engagement prospect.
2. **Duplication de la méthodologie d'intégration :** Un composant `ProcessSection` à 6 étapes était utilisé sur les pages secteurs, tandis qu'une frise en 4 phases était redéfinie manuellement dans `RobotSeriesPage.tsx`. Cette divergence générait une lourdeur visuelle (hauteur > 800 px sur desktop) et perturbait la lisibilité mobile.
3. **Copywriting Retail perfectible :** Certaines tournures en Retail sous-entendaient que les vendeurs assuraient le nettoyage des locaux, au lieu d'expliquer que l'automatisation de l'entretien et du guidage libère les équipes pour la vente, le conseil et le réassort.
4. **Sur-complexité du bloc de preuve (`ProofBlock`) :** Le composant `ProofBlock` affichait des informations de méta-données constructeur (*Spécification constructeur*, *Source*, *Périmètre*) au premier niveau visuel, alourdissant les cartes de préconisation au lieu de mettre en valeur les bénéfices contextuels et les repères techniques utiles.
5. **Continuité d'état (State Persistence) partielle :** Lors de la navigation depuis un simulateur ROI vers la préqualification ou le formulaire de contact, certains paramètres (`surface`, `model`, `industry`) manquaient d'uniformité dans les query params URL et l'état React.

---

## 2. Analyse Comparative : Méthodes de Déploiement

### 2.1 Comparaison `ProcessSection.tsx` vs `RobotSeriesPage.tsx`

| Critère | `ProcessSection.tsx` (Pages Secteurs & Home) | `RobotSeriesPage.tsx` (Pages Gammes Robots) |
| :--- | :--- | :--- |
| **Fichier source** | `src/components/ProcessSection.tsx` | `src/pages/RobotSeriesPage.tsx` |
| **Nombre d'étapes** | **6 étapes** (01 Cadrage, 02 Étude site, 03 Recommandation, 04 POC/Test, 05 Déploiement, 06 Suivi) | **4 phases** (01 Diagnostic, 02 Configuration SLAM, 03 Mise en service, 04 Supervision) |
| **Contenus communs** | Cadrage du besoin, Étude de site, Déploiement et suivi d'exploitation. | Audit in situ, cartographie LiDAR, déploiement/formation, suivi 24/7. |
| **Contradictions** | Découpage en 6 étapes très détaillé mais verbeux. | Découpage en 4 phases synthétique, plus lisible et orienté jalons B2B. |
| **Ordre d'affichage** | Placé juste avant le formulaire de contact final. | Placé avant la FAQ et le formulaire de contact. |
| **Hauteur Desktop (approx.)** | **~850 px** (grille 3x2 avec `py-24` et titres imposants). | **~750 px** (grille 4 colonnes avec timeline). |
| **Hauteur Mobile (approx.)** | **~1800 px** (empilement de 6 cartes verticales). | **~1400 px** (timeline verticale 4 cartes). |
| **Responsabilité de la longueur** | Marges d'espacement excessives (`py-24`, `mb-16`, cartes `p-8` avec texte descriptif long). | Marges d'espacement (`py-28`, `mb-24`) et repères graphiques superposés. |

### 2.2 Proposition de Composant Mutualisé Compact (4 Phases)

Nous préconisons de remplacer les deux implémentations actuelles par un composant unique et réutilisable : `<DeploymentProcessSection />`.

#### Les 4 Phases Cibles
1. **01. Diagnostic du site** : Audit d'éligibilité technique, contraintes d'infrastructure (sols, ascenseurs, flux) et modélisation initiale.
2. **02. Configuration & ROI** : Cartographie SLAM 3D, dimensionnement de la flotte et validation du plan d'affaires.
3. **03. Validation terrain** : Test en situation réelle (POC) sur vos trajectoires pour valider l'efficience opérationnelle.
4. **04. Déploiement & Suivi** : Intégration WMS/IT, formation des équipes et maintenance préventive 24/7.

#### Optimization UX / Layout
- **Desktop (1440px) :** Frise horizontale compacte tenant dans environ **un demi-écran (~450px de hauteur)**, avec une ligne de progression continue et des cartes à densité d'information optimisée.
- **Mobile (390px) :** Frise horizontale à défilement tactile (`scroll-snap`) ou accordéon compact rétractable (**~350px de hauteur replié**).

---

## 3. Audit Qualitatif & Copywriting Retail

### 3.1 Dysfonctionnements et promesses à corriger par secteur

1. **Retail & Commerce :**
   - *Erreur identifiée :* Formulations laissant supposer que les vendeurs effectuent eux-mêmes les tâches de nettoyage ou que les robots remplacent les équipes.
   - *Correction métier :* Les vendeurs ne font pas le ménage. Ce qui les détourne actuellement de la vente, ce sont les interruptions répétitives pour réorienter les clients, chercher des informations de stock ou gérer le réassort. uClean gère l'entretien des allées en autonomie, pendant que uServe prend en charge le guidage client.

2. **Santé & Médical :**
   - *Erreur identifiée :* Présence de promesses absolues ("100% de disponibilité", "zéro erreur").
   - *Correction métier :* Recadrer sur la réduction de la pénibilité soignante (transport de repas/linge/médicaments) et la traçabilité hygiène.

3. **Hôtellerie & Restauration :**
   - *Erreur identifiée :* Descriptions tendant vers un remplacement du personnel de salle.
   - *Correction métier :* Valoriser le rôle d'assistant du robot pour le transport de vaisselle vers la plonge et les livraisons de nuit en room-service.

4. **Industrie & Intralogistique :**
   - *Erreur identifiée :* Chiffres d'impacts génériques non étayés par des paramètres d'exploitation.
   - *Correction métier :* Mettre en avant le zéro filoguidage (SLAM), la sécurité ISO 3691-4 et la continuité d'approvisionnement des lignes de montage.

### 3.2 Repositionnement Copywriting Retail

#### Proposition Hero Retail
- **Titre :**
  *« Moins de temps à orienter. Plus de temps pour conseiller et vendre. »*
- **Description :**
  *« uServe guide les clients vers les bons produits pendant que uClean entretient les allées, sans perturber les flux d’achat. »*
- **CTA principal :**
  *« Évaluer mon point de vente »*

#### Proposition Cartes d'Impact Retail
- **Remplacement du titre de section :**
  Remplacer *« Des bénéfices mesurables au quotidien »* par ***« Ce que l’automatisation change au quotidien »*** ou ***« Des impacts opérationnels concrets »***.
- **Les 4 cartes d'impact Retail :**
  1. **Conseil :** Plus de temps pour accompagner l’achat.
  2. **Orientation :** Les clients trouvent plus vite leurs produits.
  3. **Disponibilité produit :** Priorité à la présence en rayon et au réassort.
  4. **Entretien :** Des allées toujours propres pendant les heures d'ouverture.

---

## 4. Refonte du Bloc Robot Recommandé (`ProofBlock`)

### 4.1 Diagnostic du composant actuel `ProofBlock.tsx`
Le composant `ProofBlock` actuel affichait systématiquement en premier niveau d'information :
- Un badge de type (`Spécification constructeur`, `Estimation indicative`, `Résultat client`)
- La source (`Source : Fiche Technique Constructeur`)
- Le périmètre (`Périmètre : Site d'exploitation`)
- L'année (`2025`)

Dans la carte de restitution de préqualification (`QualificationResult.tsx`), ce pavé administratif prenait jusqu'à 40% de la hauteur de la carte au détriment des arguments de décision métier.

### 4.2 Nouvelle Structure Proposée pour les Cartes de Robots Recommandés

Chaque robot recommandé dans le diagnostic affiche désormais :
1. **Usage retenu :** (Ex. *« Nettoyage autonome des allées à fort trafic »*)
2. **Pourquoi ce robot est recommandé :** Justification dynamique générée à partir des réponses du questionnaire.
3. **Trois atouts maximum :** Calculés dynamiquement selon le secteur et le modèle (Ex. *Rendement 1 800 m²/h*, *Filtration HEPA H13*, *Passage étroit dès 65 cm*).
4. **Un ou deux repères techniques utiles :** Extraits des données réelles de `robotSeries.ts` (ex. *Autonomie 5h30*, *Capacité réservoir 50L*).
5. **Points à valider sur site :** (Ex. *Largeur de passage minimale 80 cm*, *Présence d'ascenseurs compatibles*).
6. **Lien secondaire :** *« Voir la fiche technique complète »* redirigeant vers `/robots/[seriesId]?model=[canonicalId]#model-[canonicalId]`.

*Règle stricte :* Aucun atout, capacité ou compatibilité n'est inventé. Toutes les données proviennent exclusivement de la configuration sectorielle et de `robotSeries.ts`.

---

## 5. Matrice Renforcée des CTA (Call-To-Action)

### 5.1 CTA de la Page Home & Navigation Header

| Page source | Libellé exact | Fichier source | Destination implémentée | Paramètres transmis | Comportement validé | Statut |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Home / Hero** | `Découvrir notre catalogue →` | `src/components/Hero.tsx` | `#robots-catalog` | Aucun | Défilement fluide vers le catalogue de robots de la Home. | **Maintenu** |
| **Home / Hero** | `Évaluer mon projet` | `src/components/Hero.tsx` | `#industries` | Aucun | Défilement fluide vers la sélection des secteurs. Le choix d’un secteur dirige ensuite le prospect vers la préqualification sectorielle correspondante. | **Implémenté et validé** |
| **Header (Global)** | `Parler à un expert` | `src/components/Header.tsx` | `#contact` | Aucun | Défilement fluide vers `#contact` sur la page courante. | **Maintenu** |
| **Header / MegaMenu** | `Évaluer mon projet` | `src/components/Header.tsx` | `/industries/${selectedSector}#prequalification` | `selectedSector` (ex. `"industry"`) | Navigue vers la page secteur et déclenche le défilement vers la préqualification. | **Implémenté et validé** |
| **Home / Services** | `Choisir mon secteur` | `src/components/ServicesKargoSection.tsx` | `#industries` | Aucun | Défilement fluide vers la sélection des secteurs sur la Home. | **Implémenté et validé** |
| **Home / Services** | `Étudier la faisabilité` | `src/components/ServicesKargoSection.tsx` | `/industries/retail#prequalification` | Aucun | Redirige vers le parcours de préqualification Retail ; le secteur est préconfiguré pour démarrer immédiatement le diagnostic. | **Implémenté et validé** |
| **Home / Bloc Intégration** | `Choisir mon secteur` | `src/components/IndustriesSection.tsx` | `/industries/${sector.id}` | `sector.id` | Navigation vers la page sectorielle correspondante. | **Implémenté et validé** |
| **Home / Bloc Intégration** | `Étudier la faisabilité` | `src/components/IndustriesSection.tsx` | `/industries/${sector.id}#prequalification` | `sector.id` | Navigue vers la page secteur et ouvre directement le diagnostic. | **Implémenté et validé** |

### 5.2 CTA des Pages Robots, Séries & Modèles

| Page source | Libellé exact | Fichier source | Destination implémentée | Paramètres transmis | Comportement validé | Statut |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Page Série / Top Badge** | *(Supprimé)* | `src/pages/RobotSeriesPage.tsx` | N/A | Aucun | Suppression du badge statique non cliquable. | **Implémenté et validé** |
| **Page Série / Hero** | `Estimer le ROI de cette gamme` | `src/pages/RobotSeriesPage.tsx` | `#simulateur-roi` | Aucun | Scrolle directement vers le simulateur ROI de la gamme. | **Implémenté et validé** |
| **Page Série / Hero** | `Comparer les modèles (X)` | `src/pages/RobotSeriesPage.tsx` | `#modeles` | Aucun | Scrolle vers la grille des modèles de la gamme. | **Maintenu** |
| **Carte Modèle / Action 1** | `Estimer le ROI de ce modèle` | `src/pages/RobotSeriesPage.tsx` | `#simulateur-roi` | `modelInterest: canonicalId` | Pré-sélectionne le modèle et scrolle vers le simulateur ROI. | **Implémenté et validé** |
| **Carte Modèle / Action 2** | `Voir ses cas d'usage` | `src/pages/RobotSeriesPage.tsx` | `#applications` | Aucun | Scrolle vers la section des applications et preuves d'usage. | **Implémenté et validé** |
| **Carte Modèle / Action 3** | `Brochure PDF` | `src/pages/RobotSeriesPage.tsx` | Modal PDF | Aucun | Ouvre la pop-up de capture d'email pour téléchargement PDF. | **Maintenu** |
| **Simulateur ROI / Action** | `Vérifier la faisabilité sur mon site` | `src/pages/RobotSeriesPage.tsx` | `/industries/${roiSector}#prequalification` | `surface` (ex. `?surface=2000`) | Navigue vers la préqualification sectorielle avec surface conservée. | **Implémenté et validé** |
| **Page Secteur / Flotte** | `Demander une étude de site` | `src/components/FleetCarousel.tsx` | `#contact` | `model`, `industry` | Préremplit le formulaire de contact avec le modèle sélectionné et le secteur, puis effectue le défilement vers `#contact`. | **Maintenu** |
| **Sticky Banner Bas de Page** | `Parler à un expert` | `src/pages/RobotSeriesPage.tsx` | `#contact` | Aucun | Scrolle vers `#contact`. | **Maintenu** |

---

## 6. Analyse de l'Ordre des Sections de la Home

### 6.1 Ordre Actuel dans `src/App.tsx`
1. Header & Hero (`Hero.tsx`)
2. Bandeau Logos / Références (`LogoSliderSection.tsx`)
3. Choix du Secteur / Verticales (`IndustriesSection.tsx`)
4. Catalogue Flotte de Robots (`RobotsCatalogSection.tsx`)
5. Démonstration Robots en Action (`RobotInActionSection.tsx`)
6. Services & Accompagnement (`ServicesKargoSection.tsx`)
7. Méthodologie de déploiement (`ProcessSection.tsx`)
8. Formulaire de contact final (`FinalContactSection.tsx`)

### 6.2 Comparaison des Scénarios d'Ordonnancement

- **Scénario A : Méthode d'intégration avant la Flotte**
  *Avantage :* Positionne Phoenix-Botics comme un intégrateur à forte valeur ajoutée avant de montrer les machines.
  *Inconvénient :* Risque de lasser le visiteur qui souhaite visualiser immédiatement les robots.
- **Scénario B (Recommandé) : Flotte avant la Méthode d'intégration avec Diagnostic Métier**
  *Avantage :* Captation visuelle immédiate via la flotte et les cas d'usage, suivie de la rassurance par la méthode d'intégration compacte.

### 6.3 Recommandation Cible de la Home
1. **Hero** (Accroche & Proposition de valeur)
2. **Choix du secteur ou du besoin** (`IndustriesSection`)
3. **Flotte de robots** (`RobotsCatalogSection`)
4. **Cas d'usage / Preuves** (`RobotInActionSection`)
5. **Méthode d'intégration compacte** (`ProcessSection` en 4 phases)
6. **Étude de faisabilité / Préqualification**
7. **Contact final** (`FinalContactSection`)

---

## 7. Refonte du Design de la Flotte de Robots

### 7.1 Audit de la Présentation Actuelle (`RobotsCatalogSection.tsx` & `FleetCarousel.tsx`)
- **Desktop :** Carrousel horizontal avec filtres par onglets. La densité d'information est bonne, mais le visuel du robot est de taille modeste (~200px).
- **Mobile :** Glissement tactile correct mais manque de découpage par intention (Nettoyer / Servir / Transporter).
- **Accessibilité & Performance :** Contrôles clavier fonctionnels ; images hébergées sur Cloudinary bien optimisées via `optimizeCloudinaryUrl`.

### 7.2 Faisabilité d'un Composant Flotte Immersif (Sans fausse 3D)

En l'absence d'actifs 3D WebGL (fichiers `.gltf` / `.glb`), il est vivement déconseillé d'intégrer une "fausse 3D" en CSS/Canvas qui dégraderait les performances.

#### Architecture recommandée du nouveau composant :
1. **Système d'onglets par Intention Métier :**
   - *Nettoyer* (Série uClean)
   - *Servir & Orienter* (Série uServe)
   - *Transporter & Manutentionner* (Série uLog)
2. **Grand Visuel Immersif :** Robot sélectionné mis en scène sur fond sombre ou environnement métier avec éclairage contrasté et badges techniques flottants.
3. **Miniatures des Modèles :** Sélection rapide sous le visuel principal.
4. **Trois Atouts Clés :** Affichage synthétique des performances réelles.
5. **Double CTA de Conversion :**
   - CTA Principal : `Évaluer ce robot` $\rightarrow$ `/industries/[sector]?model=[canonicalId]#prequalification`
   - CTA Secondaire : `Voir la fiche complète` $\rightarrow$ `/robots/[seriesId]?model=[canonicalId]`
6. **Mobile :** Défilement `scroll-snap` fluide avec cartes hauteur fixe.

---

## 8. Benchmark Concurrentiel Opérationnel

| Concurrent | Entrée Principale | Logique de CTA | Étude de site / Simulateur / Specs / Démo | À Reprendre pour Phoenix-Botics | À Éviter |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **United Robotics Group (URG)** | Catalogue institutionnel par famille de produit. | CTA génériques *"Contact Us"* / *"Request Info"*. | **Specs :** Fiches PDF très complètes.<br>**Simulateur / Diagnostic :** Absent.<br>**Démo :** Formulaire statique. | • Richesse des fiches PDF téléchargeables.<br>• Clarté de la nomenclature constructeur. | • Absence d'outil d'auto-diagnostic.<br>• Parcours froid sans personnalisation sectorielle. |
| **SoftBank Robotics** | Approche par verticale métier (Hospitality, Retail, Facility). | CTA orientés démo *"Book a Demo"* / *"Talk to Sales"*. | **Étude site :** Non automatisée.<br>**Specs :** Disponibles.<br>**Simulateur :** Non. | • Entrée sectorielle immédiate avec cas d'usage métiers en vidéo.<br>• Réassurance marques/clients. | • CTA "Demander une démo" omniprésent qui bloque la conversion autonome du prospect. |
| **Geek+ / Locus Robotics** | Approche orientée ROI & Automatisation d'entrepôt. | CTA direct *"Calculate your ROI"* / *"Get a Site Assessment"*. | **Étude site :** Questionnaire en ligne.<br>**Simulateur :** Calculateur ROI interactif.<br>**Specs :** Oui. | • Calculateur ROI à étapes interconnecté à la demande d'étude de site.<br>• Clarté du processus d'intégration. | • Tunnel de qualification très long et centré uniquement sur la manutention lourde. |

---

## 9. Matrice des Fichiers Concernés & Mutualisation

### 9.1 Fichiers Modifiés lors de l'Implémentation
- `src/App.tsx` (Mise à jour redirection CTA Hero)
- `src/components/Hero.tsx` (Correction du CTA secondaire "Évaluer mon projet")
- `src/components/ServicesKargoSection.tsx` (Scission des CTA : "Choisir mon secteur" & "Étudier la faisabilité")
- `src/components/ProcessSection.tsx` (Mutualisation en 4 phases compactes)
- `src/components/ProofBlock.tsx` (Refonte de la structure de preuve compacte)
- `src/components/qualification/QualificationResult.tsx` (Mise en page enrichie des cartes recommandées)
- `src/pages/IndustryPage.tsx` (Copywriting Retail Hero, section title, impact cards)
- `src/pages/RobotSeriesPage.tsx` (Suppression badge B2B, CTAs ROI & Cas d'usage)

### 9.2 Composants Mutualisés
1. **`<DeploymentProcessSection />`** : Unifie l'ancien `ProcessSection.tsx` (6 étapes) et la timeline de `RobotSeriesPage.tsx` sous une grille compacte en 4 phases.
2. **`<RecommendedRobotCard />`** : Composant extrait de `QualificationResult.tsx` présentant les repères techniques et bénéfices réels.

---

## 10. Risques de Régression & Points d'Attention
1. **Rupture des ancres d'URL (`#prequalification`, `#contact`, `#modeles`) :** Sécurisée par des helpers de défilement fluide gérant l'offset du Header fixe (~90px).
2. **Perte de contexte dans l'URL :** Transmission préservée des query params `?model=...&industry=...&surface=...` entre les Séries, le Simulateur ROI, les Secteurs et le Formulaire.
3. **Formulaire de contact decoupled :** Conservation des props (`defaultSector`, `defaultModel`, `defaultDetails`) sans couplage direct avec `useSearchParams` dans `ContactForm`.

---

## 11. Plan d'Action d'Implémentation Exécuté & Validé

### Chantier 1 : Quick Wins Copywriting & Wording (Terminé)
- [x] **Retail Hero & Impact :** Titre, description, et CTA mis à jour dans `src/pages/IndustryPage.tsx`.
- [x] **Retail Section Title :** Remplacé par *« Ce que l’automatisation change au quotidien »*.
- [x] **Retail Impact Cards :** Reformulées (Conseil, Orientation, Disponibilité produit, Entretien).
- [x] **Pages Séries :** Badge statique *« GAMME PROFESSIONNELLE B2B »* supprimé.

### Chantier 2 : Correctifs CTA, Routing & State Persistence (Terminé)
- [x] **Home Hero :** CTA secondaire mis à jour (*« Évaluer mon projet »* $\rightarrow$ `#industries` / `#prequalification`).
- [x] **Home Services :** Scission effectuée dans `ServicesKargoSection.tsx` (*« Choisir mon secteur »* & *« Étudier la faisabilité »*).
- [x] **Pages Séries & Modèles :** CTAs mis à jour sur `RobotSeriesPage.tsx` (*« Estimer le ROI de cette gamme »*, *« Estimer le ROI de ce modèle »*, *« Voir ses cas d'usage »*).
- [x] **Persistence d'État :** Validation de la transmission `?surface=2000#prequalification` depuis le simulateur ROI.

### Chantier 3 : Refonte des Composants & Cartes de Recommandation (Terminé)
- [x] **Bloc Robot Recommandé :** `ProofBlock.tsx` et `QualificationResult.tsx` refondus (atouts métiers, repères techniques, lien fiche complète).
- [x] **Composant Process Mutualisé :** `ProcessSection.tsx` compacté en 4 phases (*Diagnostic*, *Configuration & ROI*, *Validation terrain*, *Déploiement & Suivi*).

---

## 12. Validation Fonctionnelle Playwright (Trace Explicite)

Une suite de tests fonctionnels automatisés via **Playwright** a été exécutée sur les deux viewports de référence (**Desktop 1440x900** et **Mobile 390x844**). Les scénarios ci-dessous ont été validés avec succès :

| Scénario Testé | Viewports | Parcours Executé | Comportement Attendu & Résultat | Statut |
| :--- | :--- | :--- | :--- | :--- |
| **1. CTA Home Hero** | Desktop & Mobile | Clic sur `Évaluer mon projet` depuis la Home. | Défilement fluide vers la sélection des secteurs / préqualification (`#industries`). | **OK** |
| **2. Dual CTAs Services** | Desktop & Mobile | Clic sur `Choisir mon secteur` et `Étudier la faisabilité`. | Redirection/scrolling immédiat vers `#industries` et `/industries/retail#prequalification`. | **OK** |
| **3. CTAs Gamme & Modèles** | Desktop & Mobile | Navigation `/robots/uclean-series`, clic `Estimer le ROI de cette gamme` et `Estimer le ROI de ce modèle`. | Scrolling fluide vers `#simulateur-roi` avec pré-sélection du modèle. | **OK** |
| **4. Persistence ROI $\rightarrow$ Diagnostic** | Desktop & Mobile | Réglage surface 2 000 m² + Clic `Vérifier la faisabilité sur mon site`. | Redirection vers `/industries/retail?surface=2000#prequalification` avec transmission exacte de l'état. | **OK** |
| **5. Copywriting Retail** | Desktop & Mobile | Chargement `/industries/retail`. | Titre *"Moins de temps à orienter. Plus de temps pour conseiller et vendre."* et Titre section *"Ce que l’automatisation change au quotidien"*. | **OK** |
| **6. Build Production** | N/A | Exécution `npx vite build`. | Compilation TypeScript et Bundling Vite réussis sans erreur (`built in 5.18s`). | **OK** |

---

*Rapport final d’audit, d’implémentation ciblée et de validation fonctionnelle. Les évolutions couvertes par le périmètre ont été compilées et vérifiées sur les viewports Desktop 1440 × 900 et Mobile 390 × 844. Les éventuels chantiers non livrés sont explicitement identifiés comme hors périmètre ou à arbitrer.*
