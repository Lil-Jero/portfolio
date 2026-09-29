import { nextTick, onScopeDispose, readonly, ref } from "vue";
import { HOME_SECTION, type SectionId } from "@/data/content";
import { runViewTransition } from "@/utils/viewTransition";

const SHORTCUT_KEY = "k";
const OPEN_POPOVER_SELECTOR = ":popover-open";

// Un popover vit dans le top layer : laissé ouvert, il passerait par-dessus la
// palette alors que le reste de la page est inerte.
const hideOpenPopovers = () => {
  document
    .querySelectorAll<HTMLElement>(OPEN_POPOVER_SELECTOR)
    .forEach((popover) => popover.hidePopover());
};

/**
 * Pilote la palette de commandes (⌘K / Ctrl+K) et le saut vers une section.
 *
 * Le saut passe par la View Transitions API : le défilement est instantané et
 * c'est le navigateur qui fond l'ancien viewport dans le nouveau. Une lib
 * d'animation n'apporterait rien ici, et le scroll natif reste disponible via
 * les ancres de la barre de navigation.
 */
export function useCommandPalette() {
  const isOpen = ref(false);
  let elementBeforeOpen: HTMLElement | null = null;

  const open = async () => {
    if (isOpen.value) return;
    hideOpenPopovers();
    elementBeforeOpen =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    await runViewTransition("palette", async () => {
      isOpen.value = true;
      await nextTick();
    });
  };

  const close = async () => {
    if (!isOpen.value) return;
    await runViewTransition("palette", async () => {
      isOpen.value = false;
      await nextTick();
    });
    elementBeforeOpen?.focus();
  };

  const goToSection = async (sectionId: SectionId) => {
    await runViewTransition("section", async () => {
      isOpen.value = false;
      await nextTick();
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
      const url =
        sectionId === HOME_SECTION ? window.location.pathname : `#${sectionId}`;
      window.history.replaceState(null, "", url);
    });
  };

  const onShortcut = (event: KeyboardEvent) => {
    const isShortcut =
      (event.metaKey || event.ctrlKey) &&
      event.key.toLowerCase() === SHORTCUT_KEY;
    if (!isShortcut) return;

    event.preventDefault();
    const toggle = isOpen.value ? close : open;
    toggle();
  };

  window.addEventListener("keydown", onShortcut);
  onScopeDispose(() => window.removeEventListener("keydown", onShortcut));

  return { isOpen: readonly(isOpen), open, close, goToSection };
}
