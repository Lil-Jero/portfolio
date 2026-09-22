<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import { HOME_LINK, NAV_LINKS, PALETTE, type NavLink, type SectionId } from '@/data/content'

const DIACRITICS_PATTERN = /\p{Diacritic}/gu
const PALETTE_ITEMS: NavLink[] = [HOME_LINK, ...NAV_LINKS]

const { open } = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  sectionSelected: [sectionId: SectionId]
}>()

const query = ref('')
const highlightedIndex = ref(0)
const searchInput = useTemplateRef<HTMLInputElement>('searchInput')

const normalize = (value: string): string =>
  value.normalize('NFD').replace(DIACRITICS_PATTERN, '').toLowerCase()

const matchingItems = computed(() => {
  const term = normalize(query.value.trim())
  if (term === '') return PALETTE_ITEMS
  return PALETTE_ITEMS.filter((item) => normalize(item.label).includes(term))
})

const matchCount = computed(() => matchingItems.value.length)
const hasNoMatch = computed(() => matchCount.value === 0)

const selectHighlighted = () => {
  const item = matchingItems.value[highlightedIndex.value]
  if (item === undefined) return
  emit('sectionSelected', item.id)
}

const moveHighlight = (step: number) => {
  const count = matchingItems.value.length
  if (count === 0) return
  highlightedIndex.value = (highlightedIndex.value + step + count) % count
}

watch(query, () => {
  highlightedIndex.value = 0
})

watch(
  () => open,
  async (isOpen) => {
    if (!isOpen) return
    query.value = ''
    highlightedIndex.value = 0
    await nextTick()
    searchInput.value?.focus()
  },
)
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
    <div class="palette" role="dialog" aria-modal="true" :aria-label="PALETTE.label">
      <input
        ref="searchInput"
        v-model="query"
        class="palette-input"
        type="search"
        autocomplete="off"
        :placeholder="PALETTE.placeholder"
        :aria-label="PALETTE.label"
      />

      <div class="palette-results" :data-count="matchCount" :data-highlight="highlightedIndex">
        <span class="palette-highlight" aria-hidden="true" />

        <TransitionGroup tag="ul" name="palette-row" class="palette-list">
          <li v-for="(item, index) in matchingItems" :key="item.id" class="palette-row">
            <button
              class="palette-item"
              :class="{ 'is-highlighted': index === highlightedIndex }"
              type="button"
              @click="emit('sectionSelected', item.id)"
              @mouseenter="highlightedIndex = index"
            >
              <span>{{ item.label }}</span>
              <span class="palette-item-hash">#{{ item.id }}</span>
            </button>
          </li>
        </TransitionGroup>
      </div>

      <p v-if="hasNoMatch" class="palette-empty">{{ PALETTE.emptyState }}</p>

      <p class="palette-hint mono-label">{{ PALETTE.hint }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.palette-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  display: flex;
  justify-content: center;
  padding: var(--space-xl) var(--layout-gutter);
  background-color: var(--color-scrim);
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

@for $count from 0 through 5 {
  .palette-results[data-count='#{$count}'] {
    --palette-rows: #{$count};
  }
}

@for $index from 0 through 4 {
  .palette-results[data-highlight='#{$index}'] {
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

.palette-item-hash {
  color: var(--color-text-faint);
  font-family: var(--font-mono);
  font-size: var(--text-eyebrow);
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
}
</style>
