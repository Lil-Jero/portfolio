<template>
  <div class="backdrop-glow" aria-hidden="true">
    <span class="glow glow-accent" />
    <span class="glow glow-warm" />
    <span class="glow glow-cool" />
  </div>
</template>

<style lang="scss" scoped>
.backdrop-glow {
  position: fixed;
  inset: 0;
  z-index: var(--z-backdrop);
  overflow: hidden;
  pointer-events: none;
}

.glow {
  position: absolute;
  width: var(--size-glow);
  aspect-ratio: 1;
  border-radius: 50%;
  filter: blur(var(--blur-glow));
  will-change: transform;
}

.glow-accent {
  inset-block-start: -20%;
  inset-inline-end: -12%;
  background-color: var(--color-accent);
  opacity: var(--opacity-glow-strong);
}

.glow-warm {
  inset-block-end: -22%;
  inset-inline-start: -16%;
  width: calc(var(--size-glow) * 0.9);
  background-color: var(--color-warm);
  opacity: var(--opacity-glow-soft);
}

.glow-cool {
  inset-block-start: 28%;
  inset-inline-end: 14%;
  width: calc(var(--size-glow) * 1.1);
  background-color: var(--color-cool);
  opacity: var(--opacity-glow);
}
</style>
