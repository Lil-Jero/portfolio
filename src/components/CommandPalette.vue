<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import {
  HOME_SECTION,
  NAV_SECTIONS,
  PALETTE_ACTIONS,
  type PaletteActionId,
  type SectionId,
} from "@/data/content";
import { findEasterEgg, normalizeSearch } from "@/utils/paletteSearch";

const PALETTE_SECTIONS: SectionId[] = [HOME_SECTION, ...NAV_SECTIONS];

type PaletteItem = {
  key: string;
  label: string;
  hint: string;
  select: () => void;
};

const { open } = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
  sectionSelected: [sectionId: SectionId];
  actionSelected: [actionId: PaletteActionId];
}>();

const { t } = useI18n();

const query = ref("");
const highlightedIndex = ref(0);
const searchInput = useTemplateRef<HTMLInputElement>("searchInput");

const sectionItems = computed<PaletteItem[]>(() =>
  PALETTE_SECTIONS.map((id) => ({
    key: id,
    label: t("palette.goTo", { section: t(`sections.${id}`) }),
    hint: `#${id}`,
    select: () => emit("sectionSelected", id),
  })),
);

const actionItems = computed<PaletteItem[]>(() =>
  PALETTE_ACTIONS.map((id) => ({
    key: id,
    label: t(`palette.actions.${id}.label`),
    hint: t(`palette.actions.${id}.hint`),
    select: () => emit("actionSelected", id),
  })),
);

const paletteItems = computed(() => [
  ...sectionItems.value,
  ...actionItems.value,
]);

const matchingItems = computed(() => {
  const term = normalizeSearch(query.value);
  if (term === "") return paletteItems.value;
  return paletteItems.value.filter((item) =>
    normalizeSearch(item.label).includes(term),
  );
});

const matchCount = computed(() => matchingItems.value.length);

const easterEgg = computed(() => findEasterEgg(query.value));

const easterEggMessage = computed(() =>
  easterEgg.value === undefined
    ? undefined
    : t(`palette.easterEggs.${easterEgg.value}`),
);

const hasNoMatch = computed(
  () => matchCount.value === 0 && easterEgg.value === undefined,
);

const announcement = computed(() => {
  if (easterEggMessage.value !== undefined) return easterEggMessage.value;
  return hasNoMatch.value ? t("palette.emptyState") : "";
});

const selectHighlighted = () => {
  matchingItems.value[highlightedIndex.value]?.select();
};

const moveHighlight = (step: number) => {
  const count = matchingItems.value.length;
  if (count === 0) return;
  highlightedIndex.value = (highlightedIndex.value + step + count) % count;
};

watch(query, () => {
  highlightedIndex.value = 0;
});

watch(
  () => open,
  async (isOpen) => {
    if (!isOpen) return;
    query.value = "";
    highlightedIndex.value = 0;
    await nextTick();
    searchInput.value?.focus();
  },
);
</script>

<template>
  <div
    v-if="open"
    class="palette-overlay"
    @click.self="emit('close')"
    @keydown.esc.prevent="emit('close')"
    @keydown.down.prevent="moveHighlight(1)"
    @keydown.up.prevent="moveHighlight(-1)"
    @keydown.enter.prevent="selectHighlighted"
  >
    <div
      class="palette"
      role="dialog"
      aria-modal="true"
      :aria-label="$t('palette.label')"
    >
      <input
        ref="searchInput"
        v-model="query"
        class="palette-input"
        type="search"
        autocomplete="off"
        :placeholder="$t('palette.placeholder')"
        :aria-label="$t('palette.label')"
      />

      <div
        class="palette-results"
        :data-count="matchCount"
        :data-highlight="highlightedIndex"
      >
        <span class="palette-highlight" aria-hidden="true" />

        <TransitionGroup tag="ul" name="palette-row" class="palette-list">
          <li v-for="(item, index) in matchingItems" :key="item.key">
            <button
              class="palette-item"
              :class="{ 'is-highlighted': index === highlightedIndex }"
              type="button"
              @click="item.select()"
              @mouseenter="highlightedIndex = index"
            >
              <span>{{ item.label }}</span>
              <span class="palette-item-hint">{{ item.hint }}</span>
            </button>
          </li>
        </TransitionGroup>
      </div>

      <Transition name="palette-egg">
        <p v-if="easterEggMessage" class="palette-egg" aria-hidden="true">
          {{ easterEggMessage }}
        </p>
      </Transition>

      <p v-if="hasNoMatch" class="palette-empty" aria-hidden="true">
        {{ $t("palette.emptyState") }}
      </p>

      <p class="visually-hidden" role="status">{{ announcement }}</p>

      <p class="palette-hint mono-label">{{ $t("palette.hint") }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Le verre depoli vient du voile, qui floute toute la page : le panneau n'a
// qu'a etre translucide. Un backdrop-filter sur le panneau lui-meme laissait un
// rectangle flou dans l'instantane de la View Transition a la fermeture.
.palette-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  display: flex;
  justify-content: center;
  padding: var(--space-xl) var(--layout-gutter);
  background-color: var(--color-scrim);
  backdrop-filter: blur(var(--blur-glass));
}

.palette {
  --palette-row-height: 2.5rem;

  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  align-self: start;
  width: min(32rem, 100%);
  margin-block-start: 10vh;
  padding: var(--space-s);
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-panel);
  border-radius: var(--radius-l);
  view-transition-name: command-palette;
}

.palette-input {
  width: 100%;
  padding: var(--space-xs) var(--space-s);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-s);
  background-color: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  font-size: var(--text-small);
}

.palette-input::placeholder {
  color: var(--color-text-faint);
}

// Les lignes ont toutes la meme hauteur, donc la hauteur de la liste se deduit
// du nombre de resultats : elle s'anime sans mesure JS ni reflow a chaque image.
.palette-results {
  position: relative;
  height: calc(var(--palette-rows, 0) * var(--palette-row-height));
  overflow: hidden;
}

// A tenir egal au nombre total de commandes (sections et actions).
$palette-max-rows: 7;

@for $count from 0 through $palette-max-rows {
  .palette-results[data-count="#{$count}"] {
    --palette-rows: #{$count};
  }
}

@for $index from 0 through $palette-max-rows - 1 {
  .palette-results[data-highlight="#{$index}"] {
    --palette-highlight-row: #{$index};
  }
}

// Un seul repere se deplace d'une ligne a l'autre. Colorer le fond de la ligne
// active faisait trainer le vert sur les precedentes des qu'on enchainait les
// fleches : plusieurs lignes se dissipaient en meme temps.
.palette-highlight {
  position: absolute;
  inset-block-start: 0;
  inset-inline: 0;
  height: var(--palette-row-height);
  border-radius: var(--radius-s);
  background-color: var(--color-accent-soft);
  translate: 0 calc(var(--palette-highlight-row, 0) * var(--palette-row-height));
}

.palette-list {
  position: relative;
  display: flex;
  flex-direction: column;
}

.palette-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-s);
  width: 100%;
  height: var(--palette-row-height);
  padding-inline: var(--space-s);
  border-radius: var(--radius-s);
  color: var(--color-text-muted);
  font-size: var(--text-small);
  text-align: start;
}

.palette-item:focus-visible {
  outline-offset: -2px;
}

.is-highlighted {
  color: var(--color-text);
}

.palette-item-hint {
  color: var(--color-text-faint);
  font-family: var(--font-mono);
  font-size: var(--text-eyebrow);
}

.palette-egg {
  padding: var(--space-2xs) var(--space-s);
  border: 1px solid var(--color-accent-border);
  border-radius: var(--radius-s);
  background-color: var(--color-accent-soft);
  font-size: var(--text-small);
  text-wrap: pretty;
}

.palette-empty {
  padding: var(--space-2xs) var(--space-s);
  color: var(--color-text-subtle);
  font-size: var(--text-small);
}

.palette-hint {
  padding-inline: var(--space-s);
}

// Filtrage : les lignes sortantes quittent le flux tout de suite, les restantes
// glissent a leur nouvelle place (FLIP de TransitionGroup, en transform) et le
// panneau suit en animant sa hauteur.
@media (prefers-reduced-motion: no-preference) {
  .palette-results {
    transition: height var(--duration-base) var(--ease-out);
  }

  .palette-highlight {
    transition: translate var(--duration-fast) var(--ease-out);
  }

  .palette-row-move,
  .palette-row-enter-active,
  .palette-row-leave-active {
    transition:
      opacity var(--duration-base) var(--ease-out),
      transform var(--duration-base) var(--ease-out);
  }

  .palette-row-enter-from,
  .palette-row-leave-to {
    opacity: 0;
    transform: translateY(-0.25rem);
  }

  .palette-row-leave-active {
    position: absolute;
    inset-inline: 0;
  }

  .palette-egg-enter-active,
  .palette-egg-leave-active {
    transition:
      opacity var(--duration-base) var(--ease-out),
      transform var(--duration-base) var(--ease-out);
  }

  .palette-egg-enter-from,
  .palette-egg-leave-to {
    opacity: 0;
    transform: translateY(0.25rem);
  }
}
</style>
