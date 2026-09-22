<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { CV_URLS, HERO_METRIC_IDS, NAV_SECTIONS } from "@/data/content";
import type { AppLocale } from "@/i18n";
import MagneticAction from "./MagneticAction.vue";
import SectionShell from "./SectionShell.vue";

const { locale } = useI18n();

const EXPERIENCE_ANCHOR = `#${NAV_SECTIONS[0]}`;

const cvUrl = computed(() => CV_URLS[locale.value as AppLocale]);

const metrics = HERO_METRIC_IDS.map((id) => ({
  id,
  valueKey: `hero.metrics.${id}.value` as const,
  labelKey: `hero.metrics.${id}.label` as const,
}));
</script>

<template>
  <SectionShell section-id="hero" :eyebrow="$t('hero.eyebrow')">
    <h1 class="hero-title reveal">{{ $t("hero.title") }}</h1>
    <p class="hero-lead section-lead reveal">{{ $t("hero.lead") }}</p>

    <div class="hero-actions reveal">
      <MagneticAction variant="primary" :href="EXPERIENCE_ANCHOR">
        {{ $t("hero.primaryCta") }}
      </MagneticAction>
      <MagneticAction variant="ghost" :href="cvUrl" download>
        {{ $t("hero.secondaryCta") }}
      </MagneticAction>
    </div>

    <template #footer>
      <ul class="metrics">
        <li v-for="metric in metrics" :key="metric.id" class="metric">
          <p class="metric-value">{{ $t(metric.valueKey) }}</p>
          <p class="metric-label mono-label">{{ $t(metric.labelKey) }}</p>
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
