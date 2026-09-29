<script setup lang="ts">
import { BRAND, HOME_SECTION, NAV_SECTIONS } from "@/data/content";
import { isApplePlatform } from "@/utils/platform";
import AccentPicker from "./AccentPicker.vue";
import LocaleToggle from "./LocaleToggle.vue";
import MagneticAction from "./MagneticAction.vue";

const emit = defineEmits<{
  paletteRequested: [];
}>();

const navItems = NAV_SECTIONS.map((id) => ({ id, href: `#${id}` }));

const SHORTCUT_LABEL = isApplePlatform() ? "⌘K" : "Ctrl K";
</script>

<template>
  <header class="app-nav glass">
    <nav class="nav-inner layout-container" :aria-label="$t('nav.ariaLabel')">
      <a class="brand" :href="`#${HOME_SECTION}`">
        {{ BRAND.name }}<span class="brand-suffix">{{ BRAND.suffix }}</span>
      </a>

      <ul class="nav-list">
        <li
          v-for="item in navItems"
          :key="item.id"
          class="nav-item"
          :data-section="item.id"
        >
          <a class="nav-link" :href="item.href">
            <span class="nav-link-label">{{ $t(`sections.${item.id}`) }}</span>
          </a>
        </li>
      </ul>

      <div class="nav-actions">
        <MagneticAction
          variant="quiet"
          class="palette-badge"
          :aria-label="$t('palette.label')"
          @click="emit('paletteRequested')"
        >
          <span class="hint-full">{{ $t("nav.shortcutHint", { shortcut: SHORTCUT_LABEL }) }}</span>
          <span class="hint-compact">{{ $t("nav.shortcutHintCompact") }}</span>
        </MagneticAction>

        <AccentPicker />
        <LocaleToggle />
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.app-nav {
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: var(--z-nav);
  border-block-end: 1px solid var(--color-border);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-m);
  height: var(--nav-height);
}

.brand {
  font-family: var(--font-mono);
  font-size: var(--text-body);
  font-weight: 500;
  letter-spacing: -0.02em;
  transition: color var(--duration-base) var(--ease-out);
}

.brand:hover {
  color: var(--color-accent);
}

.brand-suffix {
  color: var(--color-accent);
}

.nav-list {
  display: flex;
  gap: var(--space-l);
}

.nav-item {
  color: var(--color-text-muted);
}

.nav-link {
  font-size: var(--text-small);
}

// Le libellé n'est pas animé : son survol l'emporte sur l'état actif, que le
// scroll anime sur l'item, et sa transition part de la couleur affichée.
.nav-link-label {
  transition: color var(--duration-base) var(--ease-out);
}

.nav-link:hover .nav-link-label {
  color: var(--color-accent);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2xs);
}

.palette-badge {
  padding: var(--space-2xs) var(--space-s);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-pill);
  color: var(--color-text-subtle);
}

.hint-compact {
  display: none;
}

@media (width < 60rem) {
  .nav-list {
    gap: var(--space-m);
  }
}

// Sous cette largeur la barre ne tient plus : la palette devient le menu,
// elle reste utilisable au doigt puisque c'est une simple liste de liens.
@media (width < 48rem) {
  .nav-list {
    display: none;
  }

  .hint-full {
    display: none;
  }

  .hint-compact {
    display: inline;
  }
}
</style>
