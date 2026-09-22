<script setup lang="ts">
import { useLocaleToggle } from "@/composables/useLocaleToggle";
import MagneticAction from "./MagneticAction.vue";

const { targetLocale, targetCode, targetAction, toggleLocale } =
  useLocaleToggle();
</script>

<template>
  <MagneticAction
    variant="quiet"
    class="locale-toggle"
    :lang="targetLocale"
    :aria-label="targetAction"
    :title="targetAction"
    @click="toggleLocale"
  >
    {{ targetCode }}
  </MagneticAction>
</template>

<style lang="scss" scoped>
.locale-toggle {
  padding: var(--space-2xs) var(--space-s);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-pill);
  color: var(--color-text-subtle);
}
</style>
