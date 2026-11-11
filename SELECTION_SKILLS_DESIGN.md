# Cadrage et Sélection des Compétences de Design & Interaction — Phoenix-Botics

Ce document définit la boîte à outils design, la classification des compétences issues du répertoire `emilkowalski/skills`, ainsi que la stratégie d'articulation UX/UI pour le site Phoenix-Botics.

---

## 1. Inventaire Complet & Matrice de Sélection des Skills

Le tableau ci-dessous répertorie l'ensemble des 15 modules de compétences du dépôt `emilkowalski/skills`, analyse leur sujet, évalue leur pertinence pour le projet Phoenix-Botics (Web App B2B industrielle React 19 + Tailwind CSS + Vite) et attribue leur rôle exact dans la refonte.

| Skill / Dossier | Sujet Traité | Pertinence Web B2B | Rôle Exact dans la Refonte Phoenix-Botics |
| :--- | :--- | :---: | :--- |
| **`apple-design`** | Standards visuels & éditoriaux Apple (Typographie, espacements, hiérarchie, clarté produit) | **Oui** (Inspiration) | **Socle Typographique & Layout B2B** : Définit la rigueur d'espacement (grid system), la clarté rédactionnelle et l'élégance sobre, adapté aux contrastes industriels Phoenix-Botics. |
| **`emil-design-eng`** | Design Engineering, micro-interactions, états d'interaction (hover/active/focus), feedback tactile web | **Oui** (Essentiel) | **Système d'Interactions & Composants UI** : Établit la qualité des boutons, cartes, feedbacks de formulaires et composants interactifs avec une précision chirurgicale. |
| **`animate`** | Recettes d'animations Framer Motion & CSS (transitions de pages, menus, modales, listes) | **Oui** | **Moteur de Transitions UI** : Guidage des transitions de modales, menus déroulants (Mega Menu Header), accordéons et carrousels de la flotte. |
| **`animation-performance`** | Optimisation GPU, composite layers, `will-change`, GPU-accelerated CSS, prévention des layouts trashing | **Oui** | **Garant de Performance Web** : Assure des animations fluides à 60/120 fps sur mobile et desktop sans saccades ni consommation excessives de ressources. |
| **`animation-vocabulary`** | Glossaire et principes d'animation (easing, spring, timing, spatial positioning) | **Oui** | **Langage d'Animation Unifié** : Normalise la nomenclature des courbes de bézier (`cubic-bezier`), durées et ressorts physiques à travers le projet. |
| **`break-ui`** | Destruction d'interfaces pour audit, identification des incohérences visual & spacing bugs | **Oui** | **Méthodologie d'Audit UI** : Fournit le cadre d'analyse pour isoler et corriger les incohérences visuelles actuelles du site Phoenix-Botics. |
| **`find-animation-opportunities`** | Détection stratégique des opportunités d'animation utiles au guidage de l'utilisateur | **Oui** | **Guidage Fonctionnel Conversions** : Cible les micro-animations à forte valeur ajoutée (ex. progression du prédiagnostic, feedback de soumission, fiches robots). |
| **`improve-animations`** | Audit et correction d'animations existantes trop lentes, bruyantes ou saccadées | **Oui** | **Raffinage UI** : Calibre et adoucit les animations existantes pour supprimer tout effet "gadget" ou "saas générique". |
| **`review-animations`** | Grille de revue de code et de conformité aux standards d'animation Web | **Oui** | **Contrôle Qualité Pre-Commit** : Servira de liste de vérification avant soumission des modifications UI. |
| **`ask-sonner`** | Notifications Toasts élégantes, légères et accessibles (Sonner library) | **Oui** | **Système de Feedback & Toasts** : Utilisé pour notifier l'utilisateur lors de la copie de brochures, soumission de formulaire de contact, ou sauvegarde de prédiagnostic. |
| **`pick-ui-library`** | Stratégie d'analyse et choix des bibliothèques UI secondaires (Radix, Lucide, Framer) | **Oui** | **Choix des Primitives Tech** : Guide l'intégration minimale des primitives d'accessibilité (Radix UI, Lucide Icons) sans surcharger le bundle. |
| **`prototype`** | Prototypage rapide d'interactions complexes avant intégration globale | **Oui** | **Maquetage Interactif** : Permet de valider rapidement les composants complexes (Simulateur ROI, Prequalification Flow). |
| **`mobile-native`** | Directives UX pour applications mobiles natives (iOS/Android) | **Non** | *Non applicable au Web runtime* — Les principes de zone de pouce et de cibles tactiles 44px+ sont toutefois conservés pour le responsive mobile. |
| **`animate-expo`** | Animations React Native & Reanimated pour mobile React Native | **Non** | *Non applicable* — Stack purement React Native / Mobile. |
| **`write-swift`** | Développement iOS en Swift / SwiftUI | **Non** | *Non applicable* — Hors scope du projet Web React. |

---

## 2. Articulation de la Boîte à Outils pour Phoenix-Botics

Pour créer une identité visuelle et une expérience utilisateur B2B haut de gamme, sobre et efficace, les compétences retenues s'articulent selon une architecture en 4 piliers :

```
┌────────────────────────────────────────────────────────────────────────┐
│                   1. SOCLE STRUCTUREL & TYPOGRAPHIQUE                  │
│       Apple Design (Rigueur, Spacing, Hiérarchie) + Visual Charter     │
├────────────────────────────────────────────────────────────────────────┤
│                   2. SYSTÈME D'INTERACTIONS & FABRIQUE UI              │
│       Emil Design Eng + Ask-Sonner + Pick-UI-Library                   │
├────────────────────────────────────────────────────────────────────────┤
│                   3. DYNAMIQUE & PERFORMANCE DES ANIMATIONS            │
│       Animate + Animation Performance + Animation Vocabulary           │
├────────────────────────────────────────────────────────────────────────┤
│                   4. ASSURANCE QUALITÉ & AUDIT PERMANENT               │
│       Break UI + Improve Animations + Review Animations                │
└────────────────────────────────────────────────────────────────────────┘
```

### A. Précision du Style Phoenix-Botics (Apple Design + ADN B2B Industriel)
- **Ce qu'on emprunte à Apple Design :**
  - **Grid & Spacing :** Alignements ultra-stricts sur grille de 8px (margins, paddings 16px/24px/32px/48px/64px).
  - **Hiérarchie Typographique :** Titres nets, contrastes élevés (Slate-900 / White), corps de texte lisible (Inter/Plus Jakarta Sans), zéro texte superflu.
  - **Élégance produit :** Présentation matérielle et technologique valorisant le produit physique (les robots d'intervention et logistiques).
- **Ce qu'on adapte pour Phoenix-Botics :**
  - Pas de dégradés pastel ou néon "iOS consumer".
  - Palette B2B industrielle : Fond blanc pur (`#FFFFFF`), surfaces Slate architectural (`#F8FAFC`, `#F1F5F9`), bordures fines wireframe (`#E2E8F0`), accents Orange Signal (`#F97316`) et Slate sombre industriel (`#0A0F1C`, `#0B1121`).

### B. Micro-interactions & Tactilité (Emil Design Eng)
- **Feedback Immédiat :** Les boutons de CTA principal ("Parler à un expert", "Lancer l'étude de site") réagissent avec un état `active:scale-[0.98]` réactif et un `hover` subtil d'élévation ou d'illumination de bordure.
- **Formulaires & Inputs :** Les éléments du questionnaire de préqualification et du formulaire de contact utilisent des états `focus-visible` très nets, évitant tout saut de layout.

### C. Animation Sobre, Performance & Accessibilité (Animate + Animation Performance)
- **Règle des 200ms :** Toutes les transitions d'UI (Mega Menu, Modales, Accordéons) durent entre 150ms et 250ms max avec des courbes `cubic-bezier(0.16, 1, 0.3, 1)`.
- **GPU Acceleration :** Utilisation stricte de `transform` (`translate3d`, `scale`) et `opacity` pour éviter le *layout reflow*.
- **Respect du `prefers-reduced-motion` :** Désactivation automatique des animations pour les utilisateurs ayant configuré la réduction de mouvement.

---

## 3. Méthodologie d'Audit des Incohérences UI (`break-ui`)

Grâce au cadre `break-ui`, la phase suivante consistera à effectuer un audit systématique du site sur mobile (375px), tablette (768px) et desktop (1440px) pour relever :
1. **Espacements irréguliers :** Incohérences de margin/padding entre sections.
2. **Contrastes & Typographies :** Tailles de police variables ou lisibilité insuffisante sur surfaces sombres.
3. **Comportements Responsive :** Débordements horizontaux, cartes rognées ou boutons trop petits sur touch screens.
4. **Feedbacks manquants :** Formulaires ou boutons sans retour visuel clair lors du clic ou du survol.
