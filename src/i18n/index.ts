import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

export const SUPPORTED_LOCALES = ["fr", "en"] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

const STORAGE_KEY = "portfolio-lang";
const DEFAULT_LOCALE: AppLocale = "en";

const isSupported = (value: string | null): value is AppLocale =>
  SUPPORTED_LOCALES.includes(value as AppLocale);

const readStoredLocale = (): AppLocale | undefined => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isSupported(stored) ? stored : undefined;
  } catch {
    return undefined;
  }
};

export const storeLocale = (locale: AppLocale) => {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Le choix ne sera pas retenu à la prochaine visite, la session reste valide.
  }
};

const detectLocale = (): AppLocale =>
  navigator.language.toLowerCase().startsWith("fr") ? "fr" : DEFAULT_LOCALE;

const resolveInitialLocale = (): AppLocale =>
  readStoredLocale() ?? detectLocale();

export const i18n = createI18n<false>({
  legacy: false,
  locale: resolveInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: { fr, en },
});

type MessageSchema = typeof fr;

declare module "vue-i18n" {
  export interface DefineLocaleMessage extends MessageSchema {}
}
