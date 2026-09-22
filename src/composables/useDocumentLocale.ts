import { watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const DESCRIPTION_SELECTOR = 'meta[name="description"]';

export function useDocumentLocale() {
  const { locale, t } = useI18n();

  watchEffect(() => {
    document.documentElement.lang = locale.value;
    document.title = t("meta.title");
    document
      .querySelector(DESCRIPTION_SELECTOR)
      ?.setAttribute("content", t("meta.description"));
  });
}
