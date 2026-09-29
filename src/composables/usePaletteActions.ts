import { useI18n } from "vue-i18n";
import { CONTACT, type PaletteActionId } from "@/data/content";
import { downloadFile } from "@/utils/download";
import { useCvUrl } from "./useCvUrl";

/**
 * Exécute les commandes de la palette qui ne sont pas des sauts de section.
 *
 * @param notify - Affiche un retour au visiteur, par exemple un toast.
 */
export function usePaletteActions(notify: (message: string) => void) {
  const { t } = useI18n();
  const cvUrl = useCvUrl();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      notify(t("toast.emailCopied"));
    } catch {
      notify(t("toast.emailCopyFailed", { email: CONTACT.email }));
    }
  };

  const actions: Record<PaletteActionId, () => void | Promise<void>> = {
    downloadCv: () => downloadFile(cvUrl.value),
    copyEmail,
  };

  const runAction = (actionId: PaletteActionId) => actions[actionId]();

  return { runAction };
}
