<script setup lang="ts">
import { EXPERTISE, TIPS } from '@/data/content'
import MagneticAction from './MagneticAction.vue'
import SectionShell from './SectionShell.vue'
</script>

<template>
  <SectionShell section-id="expertise" :eyebrow="EXPERTISE.eyebrow">
    <h2 class="section-title reveal">{{ EXPERTISE.title }}</h2>
    <p class="section-lead reveal">{{ EXPERTISE.lead }}</p>

    <ul class="tips">
      <li v-for="tip in TIPS" :key="tip.title" class="card tip reveal">
        <p class="tip-tag">{{ EXPERTISE.tag }}</p>
        <h3 class="tip-title">{{ tip.title }}</h3>
        <p class="tip-hook">{{ tip.hook }}</p>
        <MagneticAction class="tip-link" variant="quiet" :href="tip.url" external>
          {{ EXPERTISE.readCta }}
        </MagneticAction>
      </li>
    </ul>
  </SectionShell>
</template>

<style lang="scss" scoped>
.tips {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-m);
  margin-block-start: var(--space-s);
}

.tip {
  gap: var(--space-2xs);
}

.tip-tag {
  align-self: start;
  padding: var(--space-3xs) var(--space-2xs);
  border: 1px solid var(--color-accent-border);
  border-radius: var(--radius-s);
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--text-eyebrow);
  letter-spacing: var(--tracking-mono);
  text-transform: uppercase;
}

.tip-title {
  font-family: var(--font-display);
  font-size: var(--text-lead);
  font-weight: 700;
}

.tip-hook {
  color: var(--color-text-subtle);
  font-size: var(--text-small);
}

.tip-link {
  margin-block-start: auto;
}

@media (width < 60rem) {
  .tips {
    grid-template-columns: 1fr;
  }
}
</style>
