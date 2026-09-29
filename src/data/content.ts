import type { AppLocale } from "@/i18n";

export type SectionId =
  | "hero"
  | "experience"
  | "expertise"
  | "projets"
  | "contact";

export type MetricId = "onestock" | "years" | "tips" | "opquast";

export type MissionId = "product" | "designSystem" | "mentoring";

export type HighlightId = "components" | "devs";

export type TipId =
  | "shallowRef"
  | "composables"
  | "defineModel"
  | "pureFunctions";

export type Tip = {
  id: TipId;
  url: string;
};

export type PaletteActionId = "downloadCv" | "copyEmail";

export type EasterEggId = "coffee" | "piano" | "vue2";

export type EasterEgg = {
  id: EasterEggId;
  triggers: string[];
};

export type AccentId = "vue" | "blue" | "coral" | "amber" | "rose";

export type ExplorationId = "coachTracking" | "marketplace";

export type Exploration = {
  id: ExplorationId;
  tone: "cool" | "warm";
};

export const BRAND = {
  name: "jerome",
  suffix: ".dev",
} as const;

export const HOME_SECTION: SectionId = "hero";

export const NAV_SECTIONS: SectionId[] = [
  "experience",
  "expertise",
  "projets",
  "contact",
];

export const CV_URLS: Record<AppLocale, string> = {
  fr: "/jerome_voipierre_cv.pdf",
  en: "/jerome_voipierre_cv_en.pdf",
};

export const PALETTE_ACTIONS: PaletteActionId[] = ["downloadCv", "copyEmail"];

// Les déclencheurs sont comparés à la saisie sans accents, sans espaces et en
// minuscules : « Café » ou « vue 2 » fonctionnent aussi.
export const EASTER_EGGS: EasterEgg[] = [
  { id: "coffee", triggers: ["cafe", "coffee"] },
  { id: "piano", triggers: ["piano"] },
  { id: "vue2", triggers: ["vue2"] },
];

// Les teintes elles-mêmes vivent dans styles/tokens.scss, sous les mêmes ids.
export const ACCENT_IDS: AccentId[] = ["vue", "blue", "coral", "amber", "rose"];

export const DEFAULT_ACCENT: AccentId = "vue";

export const HERO_METRIC_IDS: MetricId[] = [
  "onestock",
  "years",
  "tips",
  "opquast",
];

export const MISSION_IDS: MissionId[] = [
  "product",
  "designSystem",
  "mentoring",
];

export const HIGHLIGHT_IDS: HighlightId[] = ["components", "devs"];

export const STORYBOOK_URL = "https://design-system.onestock-retail.com";

export const TIPS: Tip[] = [
  {
    id: "shallowRef",
    url: "https://www.linkedin.com/posts/j%C3%A9r%C3%B4me-voipierre_tu-utilises-ref-pour-stocker-tes-listes-activity-7487786066242924544-10-_?utm_source=share&utm_medium=member_desktop&rcm=ACoAACotpaoBmaZuZPOBWDzeF75yHhd8ShiBvys",
  },
  {
    id: "composables",
    url: "https://www.linkedin.com/posts/j%C3%A9r%C3%B4me-voipierre_un-fichier-vue-sans-use-cest-quoi-%C3%A0-lint%C3%A9rieur-activity-7490769267957600259-e_dS?utm_source=share&utm_medium=member_desktop&rcm=ACoAACotpaoBmaZuZPOBWDzeF75yHhd8ShiBvys",
  },
  {
    id: "defineModel",
    url: "https://www.linkedin.com/posts/j%C3%A9r%C3%B4me-voipierre_tu-utilises-encore-modelvalue-updatemodelvalue-activity-7493322933604405248-aZzP?utm_source=share&utm_medium=member_desktop&rcm=ACoAACotpaoBmaZuZPOBWDzeF75yHhd8ShiBvys",
  },
  {
    id: "pureFunctions",
    url: "https://www.linkedin.com/posts/j%C3%A9r%C3%B4me-voipierre_une-fonction-qui-modifie-lobjet-quon-lui-activity-7498299371340472320-TrcE?utm_source=share&utm_medium=member_desktop&rcm=ACoAACotpaoBmaZuZPOBWDzeF75yHhd8ShiBvys",
  },
];

export const EXPLORATIONS: Exploration[] = [
  { id: "coachTracking", tone: "cool" },
  { id: "marketplace", tone: "warm" },
];

export const CONTACT = {
  email: "jerome.voipierre@gmail.com",
  emailUrl: "mailto:jerome.voipierre@gmail.com",
  linkedinLabel: "linkedin.com/in/jerome-voipierre",
  linkedinUrl: "https://www.linkedin.com/in/j%C3%A9r%C3%B4me-voipierre/",
} as const;
