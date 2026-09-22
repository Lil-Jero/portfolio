<script setup lang="ts">
import { CV_URL, HERO, HERO_METRICS, NAV_LINKS } from '@/data/content'
import MagneticAction from './MagneticAction.vue'
import SectionShell from './SectionShell.vue'

const EXPERIENCE_ANCHOR = `#${NAV_LINKS[0].id}`
</script>

<template>
  <SectionShell section-id="hero" :eyebrow="HERO.eyebrow">
    <h1 class="hero-title reveal">{{ HERO.title }}</h1>
    <p class="hero-lead section-lead reveal">{{ HERO.lead }}</p>

    <div class="hero-actions reveal">
      <MagneticAction variant="primary" :href="EXPERIENCE_ANCHOR">
        {{ HERO.primaryCta }}
      </MagneticAction>
      <MagneticAction variant="ghost" :href="CV_URL" download>
        {{ HERO.secondaryCta }}
      </MagneticAction>
    </div>

    <template #footer>
      <ul class="metrics">
        <li v-for="metric in HERO_METRICS" :key="metric.label" class="metric">
          <p class="metric-value">{{ metric.value }}</p>
          <p class="metric-label mono-label">{{ metric.label }}</p>
        </li>
      </ul>
    </template>
  </SectionShell>
</template>

<style lang="scss" scoped>
.hero-title {
  max-width: var(--measure-hero);
  margin-block-start: var(--space-xs);
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 700;
  line-height: var(--leading-tight);
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.hero-lead {
  max-width: 52ch;
  font-size: var(--text-lead);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-block-start: var(--space-s);
}

.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: var(--space-m);
  width: 100%;
}


.metric {
  display: flex;
  flex-direction: column;
  gap: var(--space-3xs);
  padding-inline-start: var(--space-m);
  border-inline-start: 1px solid var(--color-border);
}

.metric:first-child {
  padding-inline-start: 0;
  border-inline-start: none;
}

.metric-value {
  font-family: var(--font-display);
  font-size: var(--text-stat);
  font-weight: 700;
  line-height: var(--leading-snug);
}

.metric-label {
  line-height: var(--leading-snug);
}

@media (width < 48rem) {
  .metrics {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-s);
  }

  .metric {
    padding-inline-start: 0;
    border-inline-start: none;
  }
}
</style>
