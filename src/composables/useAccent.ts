import { readonly, ref } from "vue";
import type { AccentId } from "@/data/content";
import {
  resolveInitialAccent,
  storeAccent,
  transitionToAccent,
} from "@/utils/accent";

/** Accent du site choisi par le visiteur, appliqué et retenu à chaque choix. */
export function useAccent() {
  const accent = ref<AccentId>(resolveInitialAccent());

  const selectAccent = (next: AccentId) => {
    accent.value = next;
    transitionToAccent(next);
    storeAccent(next);
  };

  return { accent: readonly(accent), selectAccent };
}
