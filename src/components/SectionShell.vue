<script setup lang="ts">
import type { SectionId } from '@/data/content'

const { align = 'start' } = defineProps<{
  sectionId: SectionId
  eyebrow: string
  align?: 'start' | 'center'
}>()

const alignClass = `align-${align}`

defineSlots<{
  default: () => unknown
  footer?: () => unknown
}>()
</script>

<template>
  <section :id="sectionId" class="section">
    <div class="section-body layout-container" :class="alignClass">
      <p class="eyebrow reveal">{{ eyebrow }}</p>
      <slot />
    </div>

    <footer v-if="$slots.footer" class="section-band glass">
      <div class="layout-container section-band-inner">
        <slot name="footer" />
      </div>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100dvh;
  border-block-end: 1px solid var(--color-border);
}

.section-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-m);
  padding-block: calc(var(--nav-height) + var(--space-l)) var(--space-l);
}

.align-center {
  align-items: center;
  text-align: center;
}

.section-band {
  border-block-start: 1px solid var(--color-border);
}

.section-band-inner {
  display: flex;
  align-items: center;
  gap: var(--space-m);
  min-height: var(--nav-height);
  padding-block: var(--space-s);
}
</style>
