# jerome.dev

Portfolio one-page : développeur frontend Vue.js 3, Toulouse et full remote Europe.

## Stack

- Vue 3 (`<script setup>`, TypeScript) + Vite
- SCSS scopé par composant, aucun framework CSS
- `motion-v` pour un seul usage précis (voir plus bas)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # vue-tsc + build de production
npm run preview
```

## Structure

```
src/
  data/content.ts        tout le contenu éditorial, typé
  styles/tokens.scss     design tokens (custom properties)
  styles/base.scss       reset, typographie, classes partagées
  styles/motion.scss     animations scroll-driven, view transitions
  composables/           useMagnetic, useCommandPalette, useReducedMotion
  components/            une section = un composant
```

Le contenu ne vit pas dans les templates : il est centralisé et typé dans
`src/data/content.ts`.

## Design tokens

Couleurs, typographies, espacements, rayons, durées : `src/styles/tokens.scss`.
Le texte secondaire est obtenu par variations d'opacité du blanc, pas par de
nouvelles couleurs. Aucune valeur brute dans les composants.

## Choix d'interaction

Principe : CSS natif par défaut, JavaScript seulement quand le CSS ne sait pas
faire. Chaque dépendance doit se payer.

### Animations au scroll : CSS pur

Les apparitions de contenu, la dérive des halos de fond et l'état actif de la
navigation utilisent les scroll-driven animations (`animation-timeline: view()`
et `scroll()`). Aucun `IntersectionObserver`, aucun listener de scroll : le
travail est fait par le compositeur, hors du thread principal.

L'état actif de la nav mérite un mot : chaque section déclare une
`view-timeline-name`, exposée au reste du document par `timeline-scope` sur
`:root`. Les liens de la barre consomment la timeline de leur section, donc un
lien devient vert quand sa section occupe le centre du viewport, sans une ligne
de JS.

Le survol des liens est vert lui aussi, ce qui a demandé un détour : une
animation l'emporte sur toute déclaration normale, donc animer `color` pour
l'état actif écrasait purement et simplement le `:hover`. Le scroll anime une
propriété enregistrée via `@property`, et `color` reste libre pour le survol.

Repli : tout le bloc est sous `@supports (animation-timeline: view())`. Sans
support, le contenu s'affiche normalement et l'état actif retombe sur
`:target` (le lien reste marqué après un clic).

### Transitions de section : View Transitions API

La palette `⌘K` ouvre, ferme et saute vers une section à travers
`document.startViewTransition()`. Le défilement y est instantané et c'est le
navigateur qui fond l'ancien viewport dans le nouveau, avec une animation
dédiée pour le panneau (`view-transition-name: command-palette`). Aucune lib
de transition n'est installée.

Le type de transition est posé en attribut sur `<html>` le temps de
l'animation, ce qui permet au CSS de séparer les cadences : ouvrir ou fermer la
palette ne change que le voile, le fondu de la racine y dure 240 ms, alors que
le saut de section garde ses 420 ms.

Le panneau de la palette est opaque, contrairement à la barre de navigation et
aux bandes de section qui restent en verre dépoli. La raison est l'interaction
entre `backdrop-filter` et la View Transitions API : le flou est cuit dans
l'instantané de la racine, donc à la fermeture un rectangle flou aux dimensions
du panneau restait par-dessus le titre pendant toute la durée du fondu. Aucune
courbe ni durée ne corrige ça, seule la suppression du flou sur ce panneau.

Le panneau est par ailleurs animé à l'ouverture seulement, il s'efface net en
sortie et seul le voile se dissipe.

Les liens de la barre de navigation restent, eux, de simples ancres : ils
profitent du `scroll-behavior: smooth` natif. Les deux gestes ne se marchent
pas dessus, la page reste navigable sans JavaScript.

### Filtrage de la palette : FLIP natif de Vue

Quand la liste se filtre, les lignes sortantes quittent le flux immédiatement,
les restantes glissent à leur nouvelle place (`<TransitionGroup>`, qui fait le
FLIP en `transform`) et le panneau suit en animant sa hauteur.

La hauteur est calculée, pas mesurée : toutes les lignes ont la même hauteur,
donc `height: calc(var(--palette-rows) * var(--palette-row-height))` suffit, et
`--palette-rows` vient d'un sélecteur d'attribut sur le nombre de résultats.
Pas de lecture de `scrollHeight`, pas de reflow à chaque image.

Le repère de sélection est un seul élément qui glisse d'une ligne à l'autre,
positionné par le même calcul. Colorer le fond de la ligne active faisait
traîner le vert sur les précédentes dès qu'on enchaînait les flèches, plusieurs
lignes se dissipant en même temps ; avec un repère unique, c'est structurellement
impossible.

La View Transitions API serait le mauvais outil ici : chaque frappe annulerait
la transition précédente, et le champ afficherait une image figée pendant
l'animation. Elle reste sur l'ouverture, la fermeture et le saut de section,
où l'état change d'un coup.

### Curseur magnétique : le seul usage de motion-v

`useMagnetic` applique un ressort physique (`useSpring`) à l'attraction des
boutons et des liens vers le pointeur. C'est le cas où le CSS ne suffit pas :
une `transition` repart de zéro à chaque nouvelle valeur cible et perd la
vitesse en cours, ce qui casse l'inertie quand le pointeur balaie l'élément.

Le ressort n'écrit que deux custom properties (`--magnet-x`, `--magnet-y`) ;
le déplacement lui-même reste appliqué par le CSS via `translate`. Éviter les
composants `<motion.*>` divise le poids du bundle par deux : 40 kB gzip au
total, dont environ 5 kB pour motion-v.

Tous les autres états de survol sont de simples `transition` CSS sur la
couleur, le fond et la bordure. Rien n'est animé sur des propriétés de layout.

### prefers-reduced-motion

- les reveals au scroll, la dérive des halos et le `scroll-behavior: smooth`
  sont sous `@media (prefers-reduced-motion: no-preference)` : ils n'existent
  simplement pas pour qui a demandé moins d'animations ;
- `useMagnetic` ne bouge plus rien, et suit le changement de préférence sans
  rechargement ;
- `runViewTransition` court-circuite la View Transitions API, et les
  pseudo-éléments `::view-transition-*` sont neutralisés en CSS.

Seule exception assumée : la coloration du lien de nav actif reste active. Ce
n'est pas un mouvement, et la supprimer priverait ces utilisateurs du repère de
position.

## Accessibilité

- navigation complète au clavier, `⌘K` / `Ctrl+K` pour la palette, flèches et
  `Entrée` dans la liste, `Échap` pour fermer ;
- le reste de la page passe en `inert` quand la palette est ouverte, et le
  focus revient sur l'élément d'origine à la fermeture ;
- sous 48rem, la palette remplace les liens de la barre : elle reste une simple
  liste, utilisable au doigt.

## À compléter

- `src/data/content.ts` : projet vedette (titre, description, stack, code
  source, démo) et sa capture
