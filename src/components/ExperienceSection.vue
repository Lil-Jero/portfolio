<script setup lang="ts">
import { DESIGN_SYSTEM_HIGHLIGHTS, EXPERIENCE } from '@/data/content'
import MagneticAction from './MagneticAction.vue'
import SectionShell from './SectionShell.vue'
</script>

<template>
  <SectionShell section-id="experience" :eyebrow="EXPERIENCE.eyebrow">
    <h2 class="section-title reveal">{{ EXPERIENCE.title }}</h2>

    <div class="experience-grid">
      <article class="card reveal">
        <header class="role-header">
          <h3 class="role-title">{{ EXPERIENCE.role }}</h3>
          <p class="role-meta mono-label">
            {{ EXPERIENCE.company }} · {{ EXPERIENCE.period }}
          </p>
        </header>

        <ul class="missions">
          <li v-for="mission in EXPERIENCE.missions" :key="mission" class="mission">
            {{ mission }}
          </li>
        </ul>
      </article>

      <article class="card reveal reveal-late">
        <p class="mono-label">{{ EXPERIENCE.designSystemLabel }}</p>

        <dl class="highlights">
          <div v-for="highlight in DESIGN_SYSTEM_HIGHLIGHTS" :key="highlight.value" class="highlight">
            <dt class="highlight-value">{{ highlight.value }}</dt>
            <dd class="highlight-description">{{ highlight.description }}</dd>
          </div>
        </dl>

        <MagneticAction
          class="storybook-link"
          variant="ghost"
          :href="EXPERIENCE.storybookUrl"
          external
        >
          {{ EXPERIENCE.storybookCta }}
        </MagneticAction>
      </article>
    </div>

    <template #footer>
      <p class="mono-label">{{ EXPERIENCE.previousLabel }}</p>
      <p class="previous-role">{{ EXPERIENCE.previous }}</p>
    </template>
  </SectionShell>
</template>

<style lang="scss" scoped>
.experience-grid {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: var(--space-m);
  margin-block-start: var(--space-s);
}

.role-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3xs);
}

.role-title {
  font-family: var(--font-display);
  font-size: var(--text-lead);
  font-weight: 700;
}

.role-meta {
  text-transform: none;
}

.missions {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.mission {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-2xs);
  align-items: baseline;
  color: var(--color-text-muted);
  font-size: var(--text-small);
}

.mission::before {
  content: '';
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background-color: var(--color-accent);
  translate: 0 -0.15rem;
}

.highlights {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
  margin: 0;
  padding-block-start: var(--space-2xs);
}

.highlight-value {
  font-family: var(--font-display);
  font-size: var(--text-stat);
  font-weight: 700;
  line-height: var(--leading-snug);
}

.highlight-description {
  margin: 0;
  color: var(--color-text-subtle);
  font-size: var(--text-small);
}

.storybook-link {
  align-self: start;
  margin-block-start: auto;
}

.previous-role {
  color: var(--color-text-subtle);
  font-size: var(--text-small);
}

@media (width < 60rem) {
  .experience-grid {
    grid-template-columns: 1fr;
  }
}
</style>
