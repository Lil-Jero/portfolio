import { ACCENT_IDS, DEFAULT_ACCENT, type AccentId } from "@/data/content";
import { prefersReducedMotion } from "./motionPreference";

const STORAGE_KEY = "portfolio-accent";
const DURATION_TOKEN = "--duration-slow";

// Composantes oklch de l'accent déclarées dans styles/tokens.scss, avec l'unité
// à réécrire sur chacune.
const ACCENT_CHANNELS = {
  "--accent-l": "%",
  "--accent-c": "",
  "--accent-x": "",
  "--accent-y": "",
} as const;

type AccentChannel = keyof typeof ACCENT_CHANNELS;

type AccentChannels = Record<AccentChannel, number>;

const CHANNEL_NAMES = Object.keys(ACCENT_CHANNELS) as AccentChannel[];

let tweenFrame: number | undefined;

const isAccentId = (value: string | null): value is AccentId =>
  ACCENT_IDS.includes(value as AccentId);

const readStoredAccent = (): AccentId | undefined => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isAccentId(stored) ? stored : undefined;
  } catch {
    return undefined;
  }
};

/** Accent retenu lors d'une visite précédente, ou celui par défaut. */
export const resolveInitialAccent = (): AccentId =>
  readStoredAccent() ?? DEFAULT_ACCENT;

export const storeAccent = (accent: AccentId) => {
  try {
    localStorage.setItem(STORAGE_KEY, accent);
  } catch {
    // Le choix ne sera pas retenu à la prochaine visite, la session reste valide.
  }
};

/**
 * Applique un accent à tout le site. La teinte n'est pas écrite ici : l'attribut
 * sélectionne la valeur de --color-accent déclarée dans styles/tokens.scss.
 */
export const applyAccent = (accent: AccentId) => {
  document.documentElement.dataset.accent = accent;
};

const MS_PER_SECOND = 1000;

const toMilliseconds = (duration: string): number =>
  duration.trim().endsWith("ms")
    ? parseFloat(duration)
    : parseFloat(duration) * MS_PER_SECOND;

// Même courbe que --ease-out, cubic-bezier(0.22, 1, 0.36, 1) : un ease-out quint.
const easeOut = (progress: number): number => 1 - (1 - progress) ** 5;

const readChannels = (): AccentChannels => {
  const style = getComputedStyle(document.documentElement);
  return Object.fromEntries(
    CHANNEL_NAMES.map((name) => [name, parseFloat(style.getPropertyValue(name))]),
  ) as AccentChannels;
};

const writeChannels = (channels: AccentChannels) => {
  const { style } = document.documentElement;
  CHANNEL_NAMES.forEach((name) =>
    style.setProperty(name, `${channels[name]}${ACCENT_CHANNELS[name]}`),
  );
};

const clearChannels = () => {
  const { style } = document.documentElement;
  CHANNEL_NAMES.forEach((name) => style.removeProperty(name));
};

const interpolateChannels = (
  from: AccentChannels,
  to: AccentChannels,
  progress: number,
): AccentChannels =>
  Object.fromEntries(
    CHANNEL_NAMES.map((name) => [
      name,
      from[name] + (to[name] - from[name]) * progress,
    ]),
  ) as AccentChannels;

/**
 * Passe à un autre accent en fondu, depuis la couleur affichée, y compris si un
 * fondu précédent est en cours.
 *
 * Le fondu est piloté image par image en JS plutôt que par une transition CSS :
 * dans un lien déjà visité, Chrome peint une couleur qui dépend d'une custom
 * property animée avec la couleur héritée, le temps de l'animation. Le logo et
 * les liens de la barre passaient au blanc. Écrire les composantes à chaque
 * image n'est pas une animation, ces liens suivent donc comme le reste.
 */
export const transitionToAccent = (accent: AccentId) => {
  const from = readChannels();
  if (tweenFrame !== undefined) window.cancelAnimationFrame(tweenFrame);
  clearChannels();
  applyAccent(accent);
  if (prefersReducedMotion()) return;

  const to = readChannels();
  const duration = toMilliseconds(
    getComputedStyle(document.documentElement).getPropertyValue(DURATION_TOKEN),
  );
  const start = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    if (progress === 1) {
      clearChannels();
      return;
    }
    writeChannels(interpolateChannels(from, to, easeOut(progress)));
    tweenFrame = window.requestAnimationFrame(step);
  };

  writeChannels(from);
  tweenFrame = window.requestAnimationFrame(step);
};
