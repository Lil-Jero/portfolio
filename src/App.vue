<script setup lang="ts">
import AppNav from "./components/AppNav.vue";
import AppToast from "./components/AppToast.vue";
import BackdropGlow from "./components/BackdropGlow.vue";
import CommandPalette from "./components/CommandPalette.vue";
import ContactSection from "./components/ContactSection.vue";
import ExperienceSection from "./components/ExperienceSection.vue";
import ExpertiseSection from "./components/ExpertiseSection.vue";
import HeroSection from "./components/HeroSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import { useCommandPalette } from "./composables/useCommandPalette";
import { useDocumentLocale } from "./composables/useDocumentLocale";
import { usePaletteActions } from "./composables/usePaletteActions";
import { useToast } from "./composables/useToast";
import type { PaletteActionId } from "./data/content";

const { isOpen, open, close, goToSection } = useCommandPalette();
const { message: toastMessage, showToast } = useToast();
const { runAction } = usePaletteActions(showToast);

// L'action part avant la fermeture : copier dans le presse-papier exige, selon
// les navigateurs, d'être encore dans le geste de l'utilisateur.
const runPaletteAction = (actionId: PaletteActionId) => {
  runAction(actionId);
  close();
};

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
    @action-selected="runPaletteAction"
  />

  <AppToast :message="toastMessage" />
</template>

<style lang="scss" scoped>
.page {
  position: relative;
  z-index: var(--z-content);
}
</style>
