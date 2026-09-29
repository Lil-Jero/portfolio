<script setup lang="ts">
defineProps<{
  message: string | null;
}>();
</script>

<template>
  <div class="toast-region" role="status">
    <Transition name="toast">
      <p v-if="message" class="toast glass">{{ message }}</p>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.toast-region {
  position: fixed;
  inset-block-end: var(--space-l);
  inset-inline: var(--layout-gutter);
  z-index: var(--z-overlay);
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.toast {
  padding: var(--space-xs) var(--space-m);
  border: 1px solid var(--color-accent-border);
  border-radius: var(--radius-pill);
  background-color: var(--color-glass-strong);
  font-size: var(--text-small);
  text-align: center;
}

@media (prefers-reduced-motion: no-preference) {
  .toast-enter-active,
  .toast-leave-active {
    transition:
      opacity var(--duration-base) var(--ease-out),
      transform var(--duration-base) var(--ease-out);
  }

  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateY(0.5rem);
  }
}
</style>
