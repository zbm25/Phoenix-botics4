# Audit Complet de Conversion & Parcours Client — Phoenix-Botics (Version Consolidée)

**Auteur :** Jules — Ingénieur Système & UX B2B
**Dépôt :** Phoenix-botics4
**Branche auditée :** `jules-12173905266529557166-9c87136b`
**Commit exact :** `ee9bae972b9d6f8135b16c7bed3631791d4bc244`
**Mode d'exécution :** AUDIT ONLY (Aucune modification de code effectuée pendant cette phase)

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
1. **Friction dans le maillage des CTA :** Plusieurs boutons d'action renvoient directement vers un formulaire génerique `#contact` au lieu d'amorcer l'outil de diagnostic/préqualification, ce qui crée une rupture dans l'engagement prospect.
2. **Duplication de la méthodologie d'intégration :** Un composant `ProcessSection` à 6 étapes est utilisé sur les pages secteurs, tandis qu'une frise en 4 phases est redéfinie manuellement dans `RobotSeriesPage.tsx`. Cette divergence génère une lourdeur visuelle (hauteur > 800 px sur desktop) et perturbe la lisibilité mobile.
3. **Copywriting Retail perfectible :** Certaines tournures en Retail sous-entendaient que les vendeurs assuraient le nettoyage des locaux, au lieu d'expliquer que l'automatisation de l'entretien et du guidage libère les équipes pour la vente, le conseil et le réassort.
4. **Sur-complexité du bloc de preuve (`ProofBlock`) :** Le composant `ProofBlock` affiche des informations de méta-données constructeur (*Spécification constructeur*, *Source*, *Périmètre*) au premier niveau visuel, alourdissant les cartes de préconisation au lieu de mettre en valeur les bénéfices contextuels et les repères techniques utiles.
5. **Continuité d'état (State Persistence) partielle :** Lors de la navigation depuis un simulateur ROI vers la préqualification ou le formulaire de contact, certains paramètres (`surface`, `model`, `industry`) manquent d'uniformité dans les query params URL et l'état React.

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
4. **04. Déploiement & Suivi** : Intégration WMS/SaaS, formation des équipes et maintenance préventive 24/7.

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
Le composant `ProofBlock` actuel affiche systématiquement en premier niveau d'information :
- Un badge de type (`Spécification constructeur`, `Estimation indicative`, `Résultat client`)
- La source (`Source : Fiche Technique Constructeur`)
- Le périmètre (`Périmètre : Site d'exploitation`)
- L'année (`2025`)

Dans la carte de restitution de préqualification (`QualificationResult.tsx`), ce pavé administratif prend jusqu'à 40% de la hauteur de la carte au détriment des arguments de décision métier.

### 4.2 Nouvelle Structure Proposée pour les Cartes de Robots Recommandés

Chaque robot recommandé dans le diagnostic affichera désormais :
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

| Page Source | Libellé Exact | Fichier Source Exact | Route / Ancre Actuelle | Paramètres Transmis | Comportement Réellement Observé | Cible et Comportement Recommandés |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Home / Hero** | `Découvrir notre catalogue →` | `src/components/Hero.tsx` | `#robots-catalog` | Aucun | Défilement fluide vers la section catalogue de la Home. | **Maintenir** `#robots-catalog` ou rediriger vers le sélecteur de secteur. |
| **Home / Hero** | `Planifier une démo` | `src/components/Hero.tsx` | `#contact` | Aucun | Défilement fluide direct vers le formulaire `#contact` en bas de page. | **Remplacer par :** `Évaluer mon projet` $\rightarrow$ `#prequalification` (ou sélection du secteur si inconnu). |
| **Header (Global)** | `Parler à un expert` | `src/components/Header.tsx` | `#contact` | Aucun | Défilement fluide vers `#contact` sur Home ou page courante. | **Maintenir** `#contact` pour la prise de contact directe B2B. |
| **Header / MegaMenu** | `Évaluer mon projet` | `src/components/Header.tsx` | `/industries/${selectedSector}#prequalification` | `selectedSector` (ex. `"industry"`) | Navigue vers la page secteur et scrolle vers le diagnostic. | **Maintenir** `/industries/${sector}#prequalification`. |
| **Home / Services** | `Découvrir nos services` | `src/components/ServicesKargoSection.tsx` | `/services` | Aucun | Redirection vers la page Services générique. | **Scinder en 2 CTA :**<br>1. `Choisir mon secteur` $\rightarrow$ `#secteurs`<br>2. `Étudier la faisabilité` $\rightarrow$ Lancer le diagnostic (secteur étape 1 si inconnu). |
| **Home / Bloc Intégration** | `Choisir mon secteur` | `src/components/IndustriesSection.tsx` | `/industries/${sector.id}` | `sector.id` | Navigation vers la page sectorielle correspondante. | **Maintenir** et ouvrir la préqualification. |
| **Home / Bloc Intégration** | `Étudier la faisabilité` | `src/components/IndustriesSection.tsx` | `/industries/${sector.id}#prequalification` | `sector.id` | Navigue vers la page secteur et ouvre le questionnaire. | **Maintenir** avec secteur comme étape 1 si non défini. |

### 5.2 CTA des Pages Robots, Séries & Modèles

| Page Source | Libellé Exact | Fichier Source Exact | Route / Ancre Actuelle | Paramètres Transmis | Comportement Réellement Observé | Cible et Comportement Recommandés |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Page Série / Top Badge** | `GAMME PROFESSIONNELLE B2B` | `src/pages/RobotSeriesPage.tsx` | N/A (Badge texte static) | Aucun | Simple élément visuel statique non cliquable. | **Supprimer** le label statique. |
| **Page Série / Hero** | `Parler à un expert` | `src/pages/RobotSeriesPage.tsx` | `#contact` | Aucun | Scrolle vers le formulaire de contact bas de page. | **Remplacer par :**<br>• CTA Principal : `Estimer le ROI de cette gamme` $\rightarrow$ `#simulateur-roi`<br>• CTA Secondaire : `Comparer les modèles` $\rightarrow$ `#modeles`. |
| **Page Série / Hero** | `Voir les modèles (X)` | `src/pages/RobotSeriesPage.tsx` | `#modeles` | Aucun | Scrolle vers le catalogue technique de la gamme. | **Maintenir** `#modeles`. |
| **Carte Modèle / Action 1** | `Demander une étude de site` | `src/pages/RobotSeriesPage.tsx` | `#contact` | `modelInterest: canonicalId` | Remplit le champ modèle du formulaire et scrolle vers `#contact`. | **Remplacer par :**<br>• CTA Principal : `Estimer le ROI de ce modèle` $\rightarrow$ `#simulateur-roi`<br>• CTA Secondaire : `Voir ses cas d'usage` $\rightarrow$ `#applications`. |
| **Carte Modèle / Action 2** | `Télécharger la brochure technique` | `src/pages/RobotSeriesPage.tsx` | Modal PDF | Aucun | Ouvre une pop-up de capture d'email pour la fiche technique PDF. | **Maintenir** (modal très performante). |
| **Simulateur ROI / Action** | `Vérifier la faisabilité sur mon site` | `src/pages/RobotSeriesPage.tsx` | `/industries/${roiSector}#prequalification` | `surface` (si uClean) | Ouvre la page secteur cible au niveau du questionnaire. | **Conserver et enrichir :** Transmettre `model`, `series`, `sector`, `surface` dans l'URL/state. |
| **Page Secteur / Flotte** | `Demander une étude de site` | `src/components/FleetCarousel.tsx` | `#contact` | `model: canonicalId`, `industry` | Pre-remplit le formulaire de contact avec le modèle et scrolle vers `#contact`. | **Rediriger vers :** `#prequalification` si le diagnostic n'a pas été réalisé. |
| **Sticky Banner Bas de Page** | `Parler à un expert` | `src/pages/RobotSeriesPage.tsx` | `#contact` | Aucun | Scrolle vers `#contact`. | **Maintenir** `#contact` avec transmission du modèle consulté. |

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

### 9.1 Fichiers à Modifier lors de l'Implémentation Ultérieure
- `src/App.tsx` (Ordre des sections, CTA Home)
- `src/components/Hero.tsx` (Libellés & destinations CTA)
- `src/components/Header.tsx` (Gestion des liens et navigation)
- `src/components/ProcessSection.tsx` (Refonte compacte 4 phases)
- `src/components/ProofBlock.tsx` (Refonte de la structure de preuve)
- `src/components/qualification/QualificationResult.tsx` (Mise en page des cartes recommandées)
- `src/pages/IndustryPage.tsx` (Copywriting Retail, titre de section, intégration du process)
- `src/pages/RobotSeriesPage.tsx` (Suppression label B2B, CTA dynamiques, ROI, process mutualisé)
- `src/components/ServicesKargoSection.tsx` (Doublement des CTA vers secteur/faisabilité)

### 9.2 Composants à Mutualiser
1. **`<DeploymentProcessSection />`** : Remplace l'ancien `ProcessSection.tsx` et le bloc d'accompagnement de `RobotSeriesPage.tsx`.
2. **`<RecommendedRobotCard />`** : Composant extrait de `QualificationResult.tsx` réutilisable dans le diagnostic et la flotte.

---

## 10. Risques de Régression & Points d'Attention
1. **Rupture des ancres d'URL (`#prequalification`, `#contact`, `#modeles`) :** Doit être sécurisée par un helper de défilement fluide gérant l'offset du Header fixe (~90px).
2. **Perte de contexte dans l'URL :** Veiller à préserver systématiquement les query params `?model=...&industry=...&surface=...` lors des redirections entre la Home, les Séries et les Secteurs.
3. **Formulaire de contact decoupled :** Conserver la transmission des props (`defaultSector`, `defaultModel`, `defaultDetails`) sans réintroduire de couplage direct avec `useSearchParams` au sein du composant `ContactForm`.

---

## 11. Plan d'Action d'Implémentation Priorisé & Exécutable

### Chantier 1 : Quick Wins Copywriting & Wording (Effort : 0.5 jour)
- [ ] **Retail Hero & Impact :** Remplacer le titre et la description du Hero Retail dans `src/pages/IndustryPage.tsx`.
- [ ] **Retail Section Title :** Remplacer *« Des bénéfices mesurables au quotidien »* par *« Ce que l’automatisation change au quotidien »*.
- [ ] **Retail Impact Cards :** Reformuler les 4 cartes d'impact Retail (Conseil, Orientation, Disponibilité produit, Entretien) pour exclure toute référence aux vendeurs faisant le ménage.
- [ ] **Pages Séries :** Supprimer le badge statique non cliquable *« GAMME PROFESSIONNELLE B2B »* sur `RobotSeriesPage.tsx`.

### Chantier 2 : Correctifs CTA, Routing & State Persistence (Effort : 1 jour)
- [ ] **Home Hero :** Modifier le CTA secondaire de `Hero.tsx` (*« Planifier une démo »* $\rightarrow$ *« Évaluer mon projet »* pointant vers `#prequalification`).
- [ ] **Home Services :** Mettre à jour `ServicesKargoSection.tsx` avec les deux CTA cibles (*« Choisir mon secteur »* $\rightarrow$ `#secteurs`, *« Étudier la faisabilité »* $\rightarrow$ Lancer le diagnostic).
- [ ] **Pages Séries & Modèles :** Mettre à jour la hiérarchie CTA sur `RobotSeriesPage.tsx` (*« Estimer le ROI de cette gamme »* / *« Estimer le ROI de ce modèle »* $\rightarrow$ `#simulateur-roi`).
- [ ] **Persistence d'État :** Aligner la transmission des paramètres URL (`sector`, `model`, `surface`) du simulateur ROI vers le questionnaire de préqualification et le formulaire de contact final.

### Chantier 3 : Refonte des Composants & Cartes de Recommandation (Effort : 1.5 jours)
- [ ] **Bloc Robot Recommandé :** Refondre `ProofBlock.tsx` et `QualificationResult.tsx` pour remplacer les métadonnées administratives (source, périmètre) par des atouts utiles (usage, justification, 3 atouts max, repères techniques, points à valider).
- [ ] **Composant Process Mutualisé :** Créer `<DeploymentProcessSection />` compact en 4 phases (*Diagnostic*, *Configuration & ROI*, *Validation terrain*, *Déploiement & Suivi*) et l'intégrer sur les pages Secteurs, Robots et Home.
- [ ] **Flotte Immersive :** Évoluer le composant `RobotsCatalogSection.tsx` / `FleetCarousel.tsx` vers le design immersif multi-onglets (*Nettoyer*, *Servir*, *Transporter*) avec scroll-snap mobile.

### Chantier 4 : Réorganisation de la Home & Validations Métier (Effort : 1 jour)
- [ ] **Re-sequencing Home :** Réordonner les sections dans `src/App.tsx` (1. Hero, 2. Choix Secteur, 3. Flotte, 4. Cas d'usage, 5. Process 4 phases, 6. Étude faisabilité, 7. Contact).
- [ ] **Ajustements de scroll :** Valider le comportement fluide des ancres avec l'offset dynamique du Header.
- [ ] **Arbitrages Produit & Validation Data :** Valider la cohérence des plages de ROI avec l'équipe commerciale et confirmer la liste des fiches PDF disponibles.

---

## 12. Captures d'Écran Réalisées

Les captures d'écran de référence de l'état actuel ont été générées via Playwright et sont stockées dans le dossier `/app/audit_screenshots/` :
- `desktop_1440_home.png` & `mobile_390_home.png`
- `desktop_1440_industry-retail.png` & `mobile_390_industry-retail.png`
- `desktop_1440_industry-retail-prequalification.png` & `mobile_390_industry-retail-prequalification.png`
- `desktop_1440_robot-uclean-series.png` & `mobile_390_robot-uclean-series.png`
- `desktop_1440_robot-ulog-series.png` & `mobile_390_robot-ulog-series.png`
- `desktop_1440_robot-userve-series.png` & `mobile_390_robot-userve-series.png`
- `desktop_1440_services.png` & `mobile_390_services.png`

---

*Fin du rapport d'audit consolidé. Aucun fichier de code n'a été modifié durant cette phase conformément à la consigne AUDIT ONLY.*
