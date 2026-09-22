import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { storeLocale, type AppLocale } from "@/i18n";

export function useLocaleToggle() {
  const { locale, t } = useI18n();

  const currentLocale = computed(() => locale.value as AppLocale);
  const targetLocale = computed<AppLocale>(() =>
    currentLocale.value === "fr" ? "en" : "fr",
  );

  const targetCode = computed(() =>
    t("locale.code", {}, { locale: targetLocale.value }),
  );
  const targetAction = computed(() => t("locale.switchTo"));

  const toggleLocale = () => {
    const next = targetLocale.value;
    locale.value = next;
    storeLocale(next);
  };

  return {
    currentLocale,
    targetLocale,
    targetCode,
    targetAction,
    toggleLocale,
  };
}
