<script setup lang="ts">
import AppNav from "./components/AppNav.vue";
import BackdropGlow from "./components/BackdropGlow.vue";
import CommandPalette from "./components/CommandPalette.vue";
import ContactSection from "./components/ContactSection.vue";
import ExperienceSection from "./components/ExperienceSection.vue";
import ExpertiseSection from "./components/ExpertiseSection.vue";
import HeroSection from "./components/HeroSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import { useCommandPalette } from "./composables/useCommandPalette";
import { useDocumentLocale } from "./composables/useDocumentLocale";

const { isOpen, open, close, goToSection } = useCommandPalette();

useDocumentLocale();
</script>

<template>
  <BackdropGlow />

  <div class="page" :inert="isOpen">
    <AppNav @palette-requested="open" />

    <main>
      <HeroSection />
      <ExperienceSection />
      <ExpertiseSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  </div>

  <CommandPalette
    :open="isOpen"
    @close="close"
    @section-selected="goToSection"
  />
</template>

<style lang="scss" scoped>
.page {
  position: relative;
  z-index: var(--z-content);
}
</style>
