<script setup lang="ts">
import { CONTACT, CV_URL } from "@/data/content";
import MagneticAction from "./MagneticAction.vue";
import SectionShell from "./SectionShell.vue";
</script>

<template>
  <SectionShell
    section-id="contact"
    :eyebrow="$t('contact.eyebrow')"
    align="center"
  >
    <h2 class="contact-title reveal">{{ $t("contact.title") }}</h2>
    <p class="section-lead reveal">{{ $t("contact.lead") }}</p>

    <div class="contact-actions reveal">
      <MagneticAction variant="primary" :href="CONTACT.emailUrl">
        {{ CONTACT.email }}
      </MagneticAction>
      <MagneticAction variant="ghost" :href="CONTACT.linkedinUrl" external>
        {{ CONTACT.linkedinLabel }}
      </MagneticAction>
      <MagneticAction variant="ghost" :href="CV_URL" download>
        {{ $t("contact.cvCta") }}
      </MagneticAction>
    </div>

    <template #footer>
      <p class="contact-footer mono-label">{{ $t("contact.footer") }}</p>
    </template>
  </SectionShell>
</template>

<style lang="scss" scoped>
.contact-title {
  max-width: var(--measure-title);
  font-family: var(--font-display);
  font-size: var(--text-title);
  font-weight: 700;
  line-height: var(--leading-snug);
  letter-spacing: -0.02em;
  text-wrap: balance;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-xs);
  margin-block-start: var(--space-s);
}

.contact-footer {
  width: 100%;
  text-align: center;
  text-transform: none;
}
</style>
