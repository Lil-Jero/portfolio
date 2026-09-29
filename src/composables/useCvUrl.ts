import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { CV_URLS } from "@/data/content";
import type { AppLocale } from "@/i18n";

/** URL du CV dans la langue affichée, suivie quand la langue change. */
export function useCvUrl() {
  const { locale } = useI18n();
  return computed(() => CV_URLS[locale.value as AppLocale]);
}
