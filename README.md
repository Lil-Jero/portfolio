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
  composables/           useMagnetic, useCommandPalette, useAccent, useToast…
  utils/                 fonctions sans état Vue (recherche, accent, téléchargement)
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

Le survol des liens prend l'accent lui aussi, ce qui a demandé deux détours.
Une animation l'emporte sur toute déclaration normale : animer `color` sur le
lien pour l'état actif écraserait le `:hover`. Et dans un lien déjà visité,
Chrome peint avec la couleur héritée toute couleur animée qui passe par
`var()`, ou qui dépend d'une custom property animée : le lien actif restait
blanc, et le survol passait au blanc avant de basculer sur l'accent. L'état
actif est donc animé sur l'item de liste, qui n'est pas un lien, et le lien en
hérite ; le survol est une simple transition de `color` sur le libellé, à
l'intérieur du lien, qui part de la couleur affichée.

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

Le verre dépoli de la palette est porté par le voile, pas par le panneau : le
voile floute toute la page et le panneau, simplement translucide, laisse voir ce
flou. La raison est l'interaction entre `backdrop-filter` et la View
Transitions API : posé sur le panneau, le flou était cuit dans l'instantané de
la racine, donc à la fermeture un rectangle flou aux dimensions du panneau
restait par-dessus le titre pendant toute la durée du fondu. Posé sur le voile,
il fait partie de la racine et se dissipe avec lui.

Le panneau est par ailleurs animé à l'ouverture seulement, il s'efface net en
sortie et seul le voile se dissipe.

Les liens de la barre de navigation restent, eux, de simples ancres : ils
profitent du `scroll-behavior: smooth` natif. Les deux gestes ne se marchent
pas dessus, la page reste navigable sans JavaScript.

### Commandes de la palette

Outre les sections, la palette télécharge le CV dans la langue affichée et
copie l'adresse email, confirmée par un toast. La copie est lancée avant la
fermeture : selon les navigateurs, le presse-papier n'est accessible que
pendant le geste de l'utilisateur.

Quelques mots tapés dans le champ (`café`, `piano`, `vue2`) affichent une
réponse dans la palette elle-même. Ils sont comparés sans accents ni espaces,
et déclarés dans `src/data/content.ts`.

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

### Accent personnalisable

Le sélecteur de la barre propose cinq accents curés plutôt qu'un choix libre.
Les teintes sont déclarées une seule fois, dans une map Sass de
`tokens.scss` : chacune produit une règle `[data-accent='…']` qui redéfinit
`--color-accent`. Posé sur `<html>`, l'attribut recolore tout le site ; posé
sur une pastille, il ne recolore qu'elle, ce qui évite de répéter les valeurs.
`--color-accent-soft` et `--color-accent-border` en dérivent par `color-mix()`.

Le changement se fait en fondu, sauf sous `prefers-reduced-motion: reduce`,
mais ce n'est pas la couleur qui est interpolée : en ligne droite, elle
passerait par un gris entre deux teintes presque opposées (vert et rose).
Chaque accent est décomposé à la compilation en composantes oklch, la teinte
en cosinus et sinus, et `--color-accent` est recomposée par
`oklch(… atan2(y, x))` : la saturation se maintient et la teinte tourne par le
plus court chemin.

Ces composantes sont interpolées en JS, image par image, et non par une
transition CSS : c'est le seul cas où le CSS ne suffit pas. Une custom property
animée fait passer au blanc tout texte coloré avec elle à l'intérieur d'un lien
visité (le `.dev` du logo, les liens de la barre), le temps de l'animation.
Écrire les valeurs à chaque image n'est pas une animation pour le navigateur,
ces liens suivent donc comme le reste.

Le choix est retenu dans `localStorage` et appliqué avant le montage de l'app,
pour ne pas afficher un premier rendu vert.

Le panneau est un `popover` natif (fermeture par `Échap` ou clic extérieur,
sans code) positionné par anchor positioning, avec un repli sous la barre. Les
pastilles sont de vrais boutons radio : les flèches passent d'un accent à
l'autre. Un popover vivant dans le top layer, la palette le ferme à son
ouverture pour ne pas le laisser par-dessus.

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

- navigation complète au clavier, `⌘K` / `Ctrl+K` pour la palette (le badge
  affiche le raccourci de la plateforme), flèches et `Entrée` dans la liste,
  `Échap` pour fermer ;
- les réponses de la palette et le toast sont annoncés par une région
  `role="status"` ;
- le reste de la page passe en `inert` quand la palette est ouverte, et le
  focus revient sur l'élément d'origine à la fermeture ;
- sous 48rem, la palette remplace les liens de la barre : elle reste une simple
  liste, utilisable au doigt.

## À compléter

- `src/data/content.ts` : projet vedette (titre, description, stack, code
  source, démo) et sa capture
