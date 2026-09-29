import { onScopeDispose, readonly, ref } from "vue";

const TOAST_DURATION_MS = 2800;

/**
 * Message de confirmation éphémère. Un nouveau message remplace le précédent
 * et relance la durée d'affichage.
 */
export function useToast() {
  const message = ref<string | null>(null);
  let hideTimer: number | undefined;

  const showToast = (text: string) => {
    window.clearTimeout(hideTimer);
    message.value = text;
    hideTimer = window.setTimeout(() => {
      message.value = null;
    }, TOAST_DURATION_MS);
  };

  onScopeDispose(() => window.clearTimeout(hideTimer));

  return { message: readonly(message), showToast };
}
