# Audit & Recommandations de Refonte — Home Page Phoenix-Botics

## Executive Summary & Contexte
Le présent document synthétise l'audit ergonomique, visuel et d'ordonnancement de la moitié supérieure de la Home Page Phoenix-Botics, ainsi que le plan de refonte B2B destiné à maximiser la clarté de l'offre robotique et l'impact de conversion.

Conformément aux exigences de la **Phase DESIGN / AUDIT ONLY**, aucun composant de production n'est modifié directement dans `src/` tant que cette proposition et ses maquettes visuelles n'ont pas été validées.

---

## 1. Audit d'ordonnancement Cible (Parcours B2B)

### 1.1 Séquencement Recommandé des Sections

1. **Hero**
   - Accroche percutante axée sur l'autonomie et la rentabilité opérationnelle.
   - Visuel haute définition ancré dans la réalité industrielle/tertiaire.
   - CTA orientés choix de la flotte et estimation ROI.
2. **RobotsCatalogSection (Présentation des Gammes)**
   - **Positionnement clé :** Ancrage technologique immédiat. La flotte de robots est présentée **AVANT** les secteurs d'activité afin de matérialiser concrètement la solution avant d'aborder les cas d'usage métiers.
3. **IndustriesSection (Secteurs & Cas d'usages métiers)**
   - Illustration détaillée de l'implantation des 3 gammes dans le Retail, l'Hôtellerie, la Santé et l'Industrie/Logistique.
4. **RobotInActionSection (Retours d'expérience terrain en vidéos)**
   - Témoignages et cas d'usages vidéo réels (Kili Beach, Henriette, KFC Venise, Intralogistique).
5. **LogoSliderSection (Partenaires & Clients - Immédiatement sous les vidéos)**
   - **Changement stratégique :** Déplacé de sous le Hero vers la position sous les vidéos, à la place de l'ancien bloc répétitif « Demander une étude d'implantation ».
   - Défilement continu fluide, commande accessible Pause/Reprise et support `prefers-reduced-motion`.
6. **ServicesKargoSection (Services & Accompagnement)**
   - Offre de services intégrés : audit, maintenance Phoenix Care, formation et supervision.
7. **ProcessSection (Méthode d'intégration en 4 jalons)**
   - Déploiement B2B clair : Diagnostic, Configuration & ROI, Validation terrain, Suivi.
8. **FinalContactSection (Formulaire de qualification & contact)**
   - Prise de contact directe et demande de démonstration/étude de site.
9. **Footer**
   - Mentions légales, navigation secondaire et réassurance de marque.

---

## 2. Benchmark UI/UX & Choix Techniques (Stack & Libellés)

- **Composants & Animations :** Primitives React, Tailwind CSS et `motion/react` légères et sans dépendance propriétaire.
- **Grille Bento (2x2 / 3 cartes) :** Structuration modulaire des 3 gammes commercialisées (`uClean`, `uLog`, `uServe`) garantissant un équilibre visuel parfait sans case vide.
- **Micro-interactions :**
  - Survol subtil avec translation max 8px et élévation d'ombre portée.
  - Absence de rotations 3D artificielles ou de robots flottants gadgets.
  - Accessibilité totale du contenu et des actions sans survol obligatoire.
- **Navigation & Ancrage ROI :**
  - Action principale : **« Découvrir la gamme → »** (`/robots/[seriesId]`)
  - Action secondaire : **« Estimer le ROI → »** (`/robots/[seriesId]#simulateur-roi`)

---

## 3. Analyse des Gammes & Métriques Vérifiées

### Gamme 1 : uClean (Nettoyage & Propreté Autonome)
- **Modèle dominant :** uClean Scrub 75 (Lavage heavy duty grande capacité).
- **Modèles secondaires :** uClean Scrub 50 Disc, uClean Compact.
- **Métrique vérifiée :** « **Jusqu'à 3 000 m²/h** » *(Rendement théorique maximal du modèle uClean Scrub 75 sur surfaces industrielles lisses)*.
- **Destinations :**
  - Découvrir la gamme : `/robots/uclean-series`
  - Estimer le ROI : `/robots/uclean-series#simulateur-roi`

### Gamme 2 : uLog (Intralogistique & Manutention AMR)
- **Modèle dominant :** uLog Lift 600 (AMR de levage forte capacité).
- **Modèles secondaires :** uLog Deliver 150, uLog Deliver 80.
- **Métrique vérifiée :** « **Charge utile jusqu'à 600 kg** » *(Spécification constructeur modèle uLog Lift 600)*.
- **Destinations :**
  - Découvrir la gamme : `/robots/ulog-series`
  - Estimer le ROI : `/robots/ulog-series#simulateur-roi`

### Gamme 3 : uServe (Accueil, Orientation & Service)
- **Modèle représentatif :** uServe.
- **Métrique vérifiée :** « **Jusqu'à 10h d'autonomie** » *(Autonomie en mission continue avec écran tactile 15.6'' et orientation multi-langues)*.
- **Destinations :**
  - Découvrir la gamme : `/robots/userve-series`
  - Estimer le ROI : `/robots/userve-series#simulateur-roi`

*Note importante : La gamme uLab Mobile est tenue hors maquette de production (non commercialisée à ce stade) tout en maintenant une structure de données extensible pour le futur.*

---

## 4. Liste des Fichiers Impactés pour l'Intégration Finale

Après votre validation explicite des visuels et du rapport, les fichiers suivants seront mis à jour en production :

1. `src/App.tsx` : Réordonnancement des sections (RobotsCatalog avant Industries, suppression de LogoSlider sous le Hero).
2. `src/components/RobotInActionSection.tsx` : Retrait du bloc CTA bas sous les vidéos pour y insérer l'unique instance de `LogoSliderSection`.
3. `src/components/LogoSliderSection.tsx` : Intégration du contrôle Pause/Reprise, gestion `prefers-reduced-motion` et logos partenaires confirmés.
4. `src/components/RobotsCatalogSection.tsx` : Remplacement du cadre statique par la grille Bento dynamique à 3 gammes.
5. `src/data/robotRangeShowcase.ts` : Source de données unifiée pour les gammes et leurs métriques.

---

## 5. Captures de Prévisualisation (Visual Preview Deliverables)

- **Preview Desktop (1440px) :** `audit_screenshots/desktop-1440.png`
- **Preview Mobile (390px) :** `audit_screenshots/mobile-390.png`
- **Grille Bento 3 Gammes :** `audit_screenshots/bento-3-ranges.png`
- **Transition Vidéos -> Logos -> Services :** `audit_screenshots/videos-logos-services.png`
