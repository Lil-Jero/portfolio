<script setup lang="ts">
import { BRAND, HOME_SECTION, NAV_SECTIONS } from "@/data/content";
import LocaleToggle from "./LocaleToggle.vue";
import MagneticAction from "./MagneticAction.vue";

const emit = defineEmits<{
  paletteRequested: [];
}>();

const navItems = NAV_SECTIONS.map((id) => ({ id, href: `#${id}` }));
</script>

<template>
  <header class="app-nav glass">
    <nav class="nav-inner layout-container" :aria-label="$t('nav.ariaLabel')">
      <a class="brand" :href="`#${HOME_SECTION}`">
        {{ BRAND.name }}<span class="brand-suffix">{{ BRAND.suffix }}</span>
      </a>

      <ul class="nav-list">
        <li v-for="item in navItems" :key="item.id">
          <a class="nav-link" :href="item.href" :data-section="item.id">
            {{ $t(`sections.${item.id}`) }}
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
          <span class="hint-full">{{ $t("nav.shortcutHint") }}</span>
          <span class="hint-compact">{{ $t("nav.shortcutHintCompact") }}</span>
        </MagneticAction>

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

.nav-link {
  --nav-link-color: var(--color-text-muted);
  --nav-link-hover: 0;

  // La premiere declaration sert de repli aux navigateurs sans color-mix.
  color: var(--nav-link-color);
  color: color-mix(
    in srgb,
    var(--color-accent) calc(var(--nav-link-hover) * 100%),
    var(--nav-link-color)
  );
  font-size: var(--text-small);
  transition: --nav-link-hover var(--duration-base) var(--ease-out);
}

.nav-link:hover {
  --nav-link-hover: 1;
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
