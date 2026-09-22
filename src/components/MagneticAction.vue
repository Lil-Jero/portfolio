<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useMagnetic } from '@/composables/useMagnetic'

const {
  href,
  external = false,
  variant = 'ghost',
} = defineProps<{
  href?: string
  external?: boolean
  variant?: 'primary' | 'ghost' | 'quiet'
}>()

const root = useTemplateRef<HTMLElement>('root')
const { attract, release } = useMagnetic(root)

const element = computed(() => (href === undefined ? 'button' : 'a'))

const elementAttrs = computed(() => {
  if (href === undefined) return { type: 'button' as const }
  return external ? { href, target: '_blank', rel: 'noreferrer noopener' } : { href }
})

const variantClass = computed(() => `is-${variant}`)
</script>

<template>
  <component
    :is="element"
    ref="root"
    v-bind="elementAttrs"
    class="magnetic-action"
    :class="variantClass"
    @pointermove="attract"
    @pointerleave="release"
    @blur="release"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.magnetic-action {
  display: inline-flex;
  translate: var(--magnet-x, 0) var(--magnet-y, 0);
  align-items: center;
  gap: var(--space-2xs);
  border: 1px solid transparent;
  border-radius: var(--radius-s);
  font-size: var(--text-small);
  font-weight: 500;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  transition:
    background-color var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out),
    color var(--duration-base) var(--ease-out);
}

.is-primary,
.is-ghost {
  padding: var(--space-xs) var(--space-m);
}

.is-primary {
  background-color: var(--color-accent);
  color: var(--color-bg);
  font-weight: 600;
}

.is-primary:hover {
  background-color: color-mix(in srgb, var(--color-accent) 85%, white);
}

.is-ghost {
  border-color: var(--color-border-strong);
  background-color: var(--color-surface-raised);
  color: var(--color-text);
}

.is-ghost:hover {
  border-color: var(--color-accent-border);
  background-color: var(--color-accent-soft);
}

.is-quiet {
  padding-block: var(--space-3xs);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-label);
}

.is-quiet:hover {
  color: var(--color-accent);
}
</style>
