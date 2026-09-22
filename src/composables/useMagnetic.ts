import { onScopeDispose, toValue, type MaybeRefOrGetter } from "vue";
import { useSpring } from "motion-v";
import { useReducedMotion } from "./useReducedMotion";

const SPRING_CONFIG = { stiffness: 260, damping: 20, mass: 0.6 };
const ATTRACTION_RATIO = 0.28;
const MAX_OFFSET_PX = 12;

const clampOffset = (value: number): number =>
  Math.max(-MAX_OFFSET_PX, Math.min(MAX_OFFSET_PX, value));

/**
 * Attire légèrement un élément vers le pointeur, avec un ressort physique.
 *
 * C'est le seul endroit où motion-v est utilisé : une transition CSS repart de
 * zéro à chaque nouvelle valeur cible et ne conserve pas la vitesse en cours,
 * ce qui casse l'inertie quand le pointeur balaie le bouton. Le ressort n'écrit
 * que deux custom properties, le déplacement reste appliqué par le CSS.
 *
 * @param target - Élément à attirer, résolu à chaque image du ressort.
 */
export function useMagnetic(target: MaybeRefOrGetter<HTMLElement | null>) {
  const x = useSpring(0, SPRING_CONFIG);
  const y = useSpring(0, SPRING_CONFIG);
  const { isReduced } = useReducedMotion();

  const writeOffset = (axis: string) => (value: number) => {
    toValue(target)?.style.setProperty(`--magnet-${axis}`, `${value}px`);
  };

  const unsubscribe = [
    x.on("change", writeOffset("x")),
    y.on("change", writeOffset("y")),
  ];
  onScopeDispose(() => unsubscribe.forEach((stop) => stop()));

  const attract = (event: PointerEvent) => {
    const element = event.currentTarget;
    if (isReduced.value || !(element instanceof HTMLElement)) return;

    const bounds = element.getBoundingClientRect();
    x.set(
      clampOffset(
        (event.clientX - (bounds.left + bounds.width / 2)) * ATTRACTION_RATIO,
      ),
    );
    y.set(
      clampOffset(
        (event.clientY - (bounds.top + bounds.height / 2)) * ATTRACTION_RATIO,
      ),
    );
  };

  const release = () => {
    x.set(0);
    y.set(0);
  };

  return { attract, release };
}
