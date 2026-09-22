<script setup lang="ts">
import { EXPLORATIONS, PROJECTS } from "@/data/content";
import SectionShell from "./SectionShell.vue";
</script>

<template>
  <SectionShell section-id="projets" :eyebrow="PROJECTS.eyebrow">
    <h2 class="section-title reveal">{{ PROJECTS.title }}</h2>
    <p class="section-lead reveal">{{ PROJECTS.lead }}</p>

    <ul class="explorations">
      <li
        v-for="exploration in EXPLORATIONS"
        :key="exploration.title"
        class="card exploration reveal"
      >
        <p class="badge" :class="`is-${exploration.tone}`">
          {{ exploration.badge }}
        </p>
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

.explorations {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-m);
  margin-block-start: var(--space-s);
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
  .explorations {
    grid-template-columns: 1fr;
  }
}
</style>
