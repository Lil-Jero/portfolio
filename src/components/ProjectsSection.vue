<script setup lang="ts">
import { EXPLORATIONS, FEATURED_PROJECT, PROJECTS } from '@/data/content'
import MagneticAction from './MagneticAction.vue'
import SectionShell from './SectionShell.vue'
</script>

<template>
  <SectionShell section-id="projets" :eyebrow="PROJECTS.eyebrow">
    <h2 class="section-title reveal">{{ PROJECTS.title }}</h2>
    <p class="section-lead reveal">{{ PROJECTS.lead }}</p>

    <article class="card featured reveal">
      <div class="featured-body">
        <p class="badge is-accent">{{ FEATURED_PROJECT.badge }}</p>
        <h3 class="featured-title">{{ FEATURED_PROJECT.title }}</h3>
        <p class="featured-description">{{ FEATURED_PROJECT.description }}</p>

        <ul class="stack">
          <li v-for="item in FEATURED_PROJECT.stack" :key="item" class="stack-item">{{ item }}</li>
        </ul>

        <div class="featured-actions">
          <MagneticAction variant="primary" :href="FEATURED_PROJECT.sourceUrl">
            <svg class="code-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 7 4 12l5 5M15 7l5 5-5 5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ FEATURED_PROJECT.sourceCta }}
          </MagneticAction>
          <MagneticAction variant="ghost" :href="FEATURED_PROJECT.demoUrl">
            {{ FEATURED_PROJECT.demoCta }}
          </MagneticAction>
        </div>
      </div>

      <p class="featured-preview mono-label">{{ FEATURED_PROJECT.previewLabel }}</p>
    </article>

    <p class="mono-label explorations-label reveal">{{ PROJECTS.explorationsLabel }}</p>

    <ul class="explorations">
      <li v-for="exploration in EXPLORATIONS" :key="exploration.title" class="card exploration reveal">
        <p class="badge" :class="`is-${exploration.tone}`">{{ exploration.badge }}</p>
        <h3 class="exploration-title">{{ exploration.title }}</h3>
        <p class="exploration-description">{{ exploration.description }}</p>
        <p class="exploration-fact mono-label">
          {{ exploration.fact.label }} : {{ exploration.fact.value }}
        </p>
        <p class="exploration-next">{{ exploration.nextStep }}</p>
      </li>
    </ul>
  </SectionShell>
</template>

<style lang="scss" scoped>
.badge {
  align-self: start;
  padding: var(--space-3xs) var(--space-2xs);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-s);
  font-family: var(--font-mono);
  font-size: var(--text-eyebrow);
  letter-spacing: var(--tracking-mono);
  text-transform: uppercase;
}

.is-accent {
  border-color: var(--color-accent-border);
  background-color: var(--color-accent-soft);
  color: var(--color-accent);
}

.is-cool {
  border-color: var(--color-cool-border);
  background-color: var(--color-cool-soft);
  color: var(--color-cool);
}

.is-warm {
  border-color: var(--color-warm-border);
  background-color: var(--color-warm-soft);
  color: var(--color-warm);
}

.featured {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--space-l);
  margin-block-start: var(--space-2xs);
  border-color: var(--color-accent-border);
}

.featured-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.featured-title {
  font-family: var(--font-display);
  font-size: var(--text-stat);
  font-weight: 700;
  line-height: var(--leading-snug);
}

.featured-description {
  color: var(--color-text-muted);
  font-size: var(--text-small);
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2xs);
}

.stack-item {
  padding: var(--space-3xs) var(--space-2xs);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-s);
  color: var(--color-text-subtle);
  font-family: var(--font-mono);
  font-size: var(--text-eyebrow);
}

.featured-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2xs);
  margin-block-start: var(--space-2xs);
}

.code-icon {
  width: 1rem;
  height: 1rem;
}

.featured-preview {
  display: grid;
  place-items: center;
  min-height: 9rem;
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-l);
  background-color: var(--color-surface);
}

.explorations-label {
  margin-block-start: var(--space-s);
}

.explorations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: var(--space-m);
}

.exploration {
  gap: var(--space-2xs);
}

.exploration-title {
  font-family: var(--font-display);
  font-size: var(--text-lead);
  font-weight: 700;
}

.exploration-description {
  color: var(--color-text-muted);
  font-size: var(--text-small);
}

.exploration-fact {
  text-transform: none;
}

.exploration-next {
  margin-block-start: auto;
  padding-block-start: var(--space-xs);
  border-block-start: 1px solid var(--color-border);
  color: var(--color-text-subtle);
  font-size: var(--text-small);
}

@media (width < 60rem) {
  .featured {
    grid-template-columns: 1fr;
  }
}
</style>
