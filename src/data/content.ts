export type SectionId =
  | "hero"
  | "experience"
  | "expertise"
  | "projets"
  | "contact";

export type NavLink = {
  id: SectionId;
  label: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type DesignSystemHighlight = {
  value: string;
  description: string;
};

export type Tip = {
  title: string;
  hook: string;
  url: string;
};

export type ExplorationFact = {
  label: string;
  value: string;
};

export type Exploration = {
  title: string;
  badge: string;
  tone: "cool" | "warm";
  description: string;
  fact: ExplorationFact;
  nextStep: string;
};

export const BRAND = {
  name: "jerome",
  suffix: ".dev",
  shortcutHint: "⌘K pour naviguer",
  shortcutHintCompact: "Sections",
} as const;

export const NAV_LINKS: NavLink[] = [
  { id: "experience", label: "Expérience" },
  { id: "expertise", label: "Expertise" },
  { id: "projets", label: "Projets" },
  { id: "contact", label: "Contact" },
];

export const CV_URL = "/jerome_voipierre_cv.pdf";

export const HERO = {
  eyebrow: "Frontend Developer · Vue.js 3",
  title:
    "Je façonne des interfaces Vue.js cohérentes, du design system au dernier pixel.",
  lead: "3 ans de dev front en Vue.js 3 chez OneStock, dont un an et demi à concevoir et faire évoluer leur design system, à mentorer et à garder chaque composant cohérent avec le suivant.",
  primaryCta: "Voir mon parcours",
  secondaryCta: "Télécharger le CV",
} as const;

export const HERO_METRICS: Metric[] = [
  { value: "OneStock", label: "Design system & mentorat" },
  { value: "3 ans", label: "Vue.js 3 en production" },
  { value: "100", label: "Accessibilité" },
  { value: "100", label: "Performance Lighthouse" },
];

export const EXPERIENCE = {
  eyebrow: "Expérience",
  title: "De junior à référent design system, chez OneStock.",
  role: "Développeur Frontend",
  company: "OneStock",
  period: "2023 - aujourd’hui",
  missions: [
    "Développement produit en Vue.js 3 sur la plateforme de gestion de commandes",
    "Conception et évolution du design system pendant un an et demi",
    "Mentorat de nouveaux arrivants et accompagnement d’une reconversion interne vers le front",
  ],
  designSystemLabel: "Design system",
  storybookCta: "Voir le Storybook public →",
  storybookUrl: "https://design-system.onestock-retail.com",
  previousLabel: "Avant OneStock",
  previous: "Wiseas Connect - développement et communication digitale",
} as const;

export const DESIGN_SYSTEM_HIGHLIGHTS: DesignSystemHighlight[] = [
  {
    value: "~30 composants",
    description: "documentés et versionnés dans Storybook",
  },
  {
    value: "3 devs",
    description:
      "accompagnés - 2 nouveaux arrivants, 1 reconversion vers le front",
  },
];

export const EXPERTISE = {
  eyebrow: "Expertise",
  title: "Des notes techniques sur Vue.js 3, ancrées dans du code réel.",
  lead: "Publiées chaque semaine sur LinkedIn, sous le tag Vue 3 Tips - chacune est née d’un cas rencontré chez OneStock.",
  tag: "Vue 3 Tips",
  readCta: "Lire sur LinkedIn →",
} as const;

export const TIPS: Tip[] = [
  {
    title: "ref vs shallowRef",
    hook: "Quand la réactivité profonde ne sert à rien - et ce qu’elle coûte en performance.",
    url: "https://www.linkedin.com/posts/j%C3%A9r%C3%B4me-voipierre_tu-utilises-ref-pour-stocker-tes-listes-activity-7487786066242924544-10-_?utm_source=share&utm_medium=member_desktop&rcm=ACoAACotpaoBmaZuZPOBWDzeF75yHhd8ShiBvys",
  },
  {
    title: "Nommer ses composables",
    hook: "Une convention simple pour que toute l’équipe s’y retrouve, projet après projet.",
    url: "https://www.linkedin.com/posts/j%C3%A9r%C3%B4me-voipierre_un-fichier-vue-sans-use-cest-quoi-%C3%A0-lint%C3%A9rieur-activity-7490769267957600259-e_dS?utm_source=share&utm_medium=member_desktop&rcm=ACoAACotpaoBmaZuZPOBWDzeF75yHhd8ShiBvys",
  },
  {
    title: "defineModel",
    hook: "Le sucre syntaxique qui simplifie enfin le v-model des composants.",
    url: "https://www.linkedin.com/posts/j%C3%A9r%C3%B4me-voipierre_tu-utilises-encore-modelvalue-updatemodelvalue-activity-7493322933604405248-aZzP?utm_source=share&utm_medium=member_desktop&rcm=ACoAACotpaoBmaZuZPOBWDzeF75yHhd8ShiBvys",
  },
  {
    title: "Fonctions pures dans les composants",
    hook: "Isoler la logique rend les tests, et la relecture, beaucoup plus simples.",
    url: "https://www.linkedin.com/posts/j%C3%A9r%C3%B4me-voipierre_une-fonction-qui-modifie-lobjet-quon-lui-activity-7498299371340472320-TrcE?utm_source=share&utm_medium=member_desktop&rcm=ACoAACotpaoBmaZuZPOBWDzeF75yHhd8ShiBvys",
  },
];

export const PROJECTS = {
  eyebrow: "Projets",
  title: "Un projet abouti, deux explorations en cours.",
  lead: "Le code parle pour lui-même sur le premier ; les deux autres montrent comment j’aborde un problème avant d’écrire la première ligne.",
  explorationsLabel: "Explorations en cours",
} as const;

// TODO: projet vedette à définir (mini design system ou mini jeu), puis renseigner
// le titre, la description, la stack, les deux liens et la capture d'écran.
export const FEATURED_PROJECT = {
  badge: "Terminé",
  title: "[Nom du projet - mini design system ou mini jeu]",
  description:
    "[Une phrase sur ce que fait le projet et pourquoi tu l’as construit.]",
  stack: ["Vue.js 3", "TypeScript", "[stack]"],
  sourceCta: "Voir le code source",
  sourceUrl: "#projets",
  demoCta: "Essayer en ligne →",
  demoUrl: "#projets",
  previewLabel: "Aperçu / capture",
} as const;

export const EXPLORATIONS: Exploration[] = [
  {
    title: "Suivi coachs sportifs",
    badge: "Phase discovery",
    tone: "cool",
    description:
      "Une app freemium pour que les coachs sportifs indépendants suivent les séances et la progression de leurs clients.",
    fact: { label: "Stack", value: "Vue.js 3 · Capacitor" },
    nextStep:
      "Prochaine étape : 5 à 8 entretiens coachs pour valider le besoin avant la première ligne de code.",
  },
  {
    title: "Marketplace coachs vérifiés",
    badge: "Recherche marché",
    tone: "warm",
    description:
      "Trouver un coach sportif indépendant vérifié à Toulouse - un Doctolib du sport, pensé pour un marché encore peu régulé.",
    fact: {
      label: "Cible offre",
      value: "coachs indépendants (auto-entrepreneurs)",
    },
    nextStep:
      "Piste de différenciation : la carte professionnelle comme signal de confiance.",
  },
];

export const CONTACT = {
  eyebrow: "Contact",
  title: "On construit quelque chose ensemble ?",
  lead: "Ouvert aux opportunités à Toulouse et ses environs, ou en full remote.",
  email: "jerome.voipierre@gmail.com",
  emailUrl: "mailto:jerome.voipierre@gmail.com",
  linkedinLabel: "linkedin.com/in/jerome-voipierre",
  linkedinUrl: "https://www.linkedin.com/in/j%C3%A9r%C3%B4me-voipierre/",
  cvCta: "Télécharger le CV",
  footer: "Merci d’être arrivé jusqu’ici.",
} as const;

export const HOME_LINK: NavLink = { id: "hero", label: "Accueil" };

export const PALETTE = {
  label: "Navigation rapide",
  placeholder: "Aller à une section…",
  emptyState: "Aucune section ne correspond.",
  hint: "Entrée pour y aller · Échap pour fermer",
} as const;
