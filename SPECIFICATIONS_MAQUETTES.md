# Spécifications Visuelles, Tokens B2B & Bac à Sable de Maquettes — Phoenix-Botics

**Auteur :** Jules — Ingénieur Système & UX B2B
**Projet :** Phoenix-Botics (Stack React 19, Tailwind CSS V4, Vite)
**Document de référence :** Design Engineering & Architecture du Composant Flotte

---

## 1. Design System B2B & Tokens de Design Engineering

Le système de design de Phoenix-Botics repose sur un mariage entre **rigueur industrielle B2B** (inspiré du matériel de précision Apple/LionsBot) et **accessibilité haute visibilité**.

### 1.1 Palette de Couleurs & Surfaces
- **Ardoise Industrielle Sombre (Fond Technique) :** `#0A0F1C` (Dark Slate) & `#0B1121` (Navy Dark)
- **Surfaces Claires Architecturales :** `#FFFFFF` (Pure White) & `#F8FAFC` (Slate 50)
- **Accentuation Signalisation B2B :** `#F97316` (Signal Orange 500), `#EA580C` (Signal Orange 600)
- **Bordures Wireframe Fines :** `#E2E8F0` (Slate 200) sur fond clair ; `#1E293B` (Slate 800) sur fond sombre
- **Typographie :** `#0A0F1C` (Titres sombres), `#475569` (Corps de texte slate 600), `#94A3B8` (Métadonnées slate 400)

### 1.2 Grille & Spacing System (Strict 8px Grid)
Toutes les marges, rembourrages et tailles sont basés sur le pas de 8px :
- **Espaces Micro :** `gap-2` (8px), `gap-3` (12px), `gap-4` (16px), `gap-6` (24px)
- **Espaces Section :** `py-12` (48px), `py-16` (64px), `py-24` (96px)
- **Bordure Radius :** `rounded-xl` (12px), `rounded-2xl` (16px), `rounded-3xl` (24px)

### 1.3 États Interactifs & Micro-interactions (*emilkowalski/skills*)
- **Feedback Haptique Visuel (Press) :** `active:scale-[0.98]`
- **Hover Soft Elevation :** `hover:-translate-y-0.5 transition-all duration-200`
- **Focus Visible Accessible (W3C) :** `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2`
- **Taille Tactile Minimale Mobile :** `min-h-[44px] min-w-[44px]`

---

## 2. Architecture & Structure HTML/Tailwind des Composants Clés

### 2.1 Bouton Primaire Signal Orange
```tsx
<button
  type="button"
  className="h-11 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-md shadow-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 cursor-pointer"
>
  <span>Estimer le ROI</span>
  <ArrowRight size={16} />
</button>
```

### 2.2 Bouton Secondaire Wireframe (Bordure 1px)
```tsx
<button
  type="button"
  className="h-11 px-6 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 cursor-pointer"
>
  <span>Découvrir la gamme</span>
  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
</button>
```

### 2.3 Carte Wireframe B2B
```tsx
<div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
  {/* Header & Badges */}
  {/* Visuel Monumental */}
  {/* Métriques & CTAs */}
</div>
```

---

## 3. Nouveau Composant Flotte Bac à Sable (`FleetCatalogMockup.tsx`)

Le composant isolé de prévisualisation `src/components/preview/FleetCatalogMockup.tsx` implémente la nouvelle section de flotte :

- **3 Cartes Monumentales Distinctes :**
  1. **uClean (Propreté & Hygiène Autonome) :** Visuel uClean Scrub 75 dominant + Compact en arrière-plan, promesse *"Lavage et bionettoyage intensif continu"*, métrique clé **"Jusqu'à 3 000 m²/h"**.
  2. **uLog (Intralogistique & Manutention AMR) :** Visuel uLog Lift 600 dominant + Deliver 150 en arrière-plan, promesse *"Transport de charges légères à lourdes sans filoguidage"*, métrique clé **"De 80 kg à 600 kg"**.
  3. **uServe (Accueil & Service Interactif) :** Visuel uServe Full HD dominant, promesse *"Accueil haut de gamme, orientation et guidage interactif"*, métrique clé **"Écran 15.6'' Full HD"**.
- **Double Parcours CTA Réalisé par Carte :**
  - CTA Principal : **Estimer le ROI** (`/robots/[gamme]#simulateur-roi`)
  - CTA Secondaire : **Découvrir la gamme** (`/robots/[gamme]`)

---

## 4. Découpage du Plan d'Implémentation par Lots

Une fois la Phase 1 validée par l'utilisateur, l'exécution s'articulera selon les 3 lots opérationnels suivants :

### Lot 1 : Tokens de Design Engineering & Composants de Base
- Implémentation des tokens globaux dans `src/index.css` (échelles 8px, boutons, cartes B2B, animations 150-250ms).
- Refactorisation du composant `Button` et des cartes génériques avec états `active:scale-[0.98]` et `focus-visible`.
- Intégration du système de notifications Sonner pour la validation des formulaires.

### Lot 2 : Section Flotte Home (`RobotsCatalogSection.tsx`)
- Remplacement du composant `RobotsCatalogSection.tsx` de production par l'architecture 3 cartes monumentales validée dans la maquette bac à sable.
- Optimisation du rendu mobile (empilement vertical propre / touch swipe) et chargement d'images Cloudinary responsive.

### Lot 3 : Formulaires & Pages Gammes / Secteurs
- Harmonisation des cartes produits et du simulateur ROI sur `RobotSeriesPage.tsx`.
- Refonte des blocs de formulaire dans `ContactForm.tsx` et `PrequalificationFlow.tsx` avec retours d'état accessibles et feedback visuel toast.

---

*Document de spécifications visuelles et d'implémentation par lots archivé dans `SPECIFICATIONS_MAQUETTES.md`.*
