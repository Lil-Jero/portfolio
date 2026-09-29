import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "./i18n";
import { applyAccent, resolveInitialAccent } from "./utils/accent";
import "./styles/main.scss";

// Avant le montage, pour que le premier rendu soit déjà dans l'accent retenu.
applyAccent(resolveInitialAccent());

createApp(App).use(i18n).mount("#app");
