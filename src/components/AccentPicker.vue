<script setup lang="ts">
import { ACCENT_IDS } from "@/data/content";
import { useAccent } from "@/composables/useAccent";
import MagneticAction from "./MagneticAction.vue";

const { accent, selectAccent } = useAccent();

const options = ACCENT_IDS.map((id) => ({
  id,
  labelKey: `accent.options.${id}` as const,
}));
</script>

<template>
  <div class="accent-picker">
    <MagneticAction
      variant="quiet"
      class="accent-trigger"
      popovertarget="accent-popover"
      :aria-label="$t('accent.label')"
      :title="$t('accent.label')"
    >
      <span class="accent-dot" aria-hidden="true" />
    </MagneticAction>

    <div id="accent-popover" class="accent-popover" popover>
      <fieldset class="accent-fieldset">
        <legend class="accent-legend mono-label">
          {{ $t("accent.label") }}
        </legend>

        <div class="accent-options">
          <label
            v-for="option in options"
            :key="option.id"
            class="accent-option"
            :data-accent="option.id"
            :title="$t(option.labelKey)"
          >
            <input
              class="accent-input visually-hidden"
              type="radio"
              name="accent"
              :value="option.id"
              :checked="option.id === accent"
              @change="selectAccent(option.id)"
            />
            <span class="accent-swatch" aria-hidden="true" />
            <span class="visually-hidden">{{ $t(option.labelKey) }}</span>
          </label>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accent-picker {
  display: flex;
}

.accent-trigger {
  padding: var(--space-2xs);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-pill);
  anchor-name: --accent-trigger;
}

// 1lh reprend la hauteur de texte des boutons voisins : la pastille s'aligne
// sur le badge et le choix de langue sans valeur fixe.
.accent-dot {
  width: 1lh;
  height: 1lh;
  border-radius: 50%;
  background-color: var(--color-accent);
}

.accent-popover {
  inset: auto;
  inset-block-start: anchor(end);
  inset-inline-end: anchor(end);
  margin: var(--space-2xs) 0 0;
  padding: var(--space-s);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-l);
  background-color: var(--color-glass-strong);
  color: var(--color-text);
  backdrop-filter: blur(var(--blur-glass));
  position-anchor: --accent-trigger;
}

// Sans anchor positioning, le panneau se cale sous la barre, contre la marge.
@supports not (anchor-name: --accent-trigger) {
  .accent-popover {
    inset-block-start: var(--nav-height);
    inset-inline-end: var(--layout-gutter);
  }
}

.accent-fieldset {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin: 0;
  padding: 0;
  border: none;
}

.accent-legend {
  padding: 0;
}

.accent-options {
  display: flex;
  gap: var(--space-2xs);
}

.accent-option {
  display: flex;
  cursor: pointer;
}

.accent-swatch {
  width: var(--space-m);
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--color-accent);
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.accent-input:checked + .accent-swatch {
  outline-color: var(--color-accent);
}

.accent-input:focus-visible + .accent-swatch {
  outline-color: var(--color-text);
}

@media (prefers-reduced-motion: no-preference) {
  .accent-swatch {
    transition:
      outline-color var(--duration-base) var(--ease-out),
      transform var(--duration-fast) var(--ease-out);
  }

  .accent-option:hover .accent-swatch {
    transform: scale(1.1);
  }

  .accent-popover {
    transition:
      opacity var(--duration-base) var(--ease-out),
      transform var(--duration-base) var(--ease-out),
      overlay var(--duration-base) allow-discrete,
      display var(--duration-base) allow-discrete;
  }

  .accent-popover:not(:popover-open) {
    opacity: 0;
    transform: translateY(-0.25rem);
  }

  .accent-popover:popover-open {
    @starting-style {
      opacity: 0;
      transform: translateY(-0.25rem);
    }
  }
}
</style>
