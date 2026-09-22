import { prefersReducedMotion } from './motionPreference'

export type ViewTransitionKind = 'palette' | 'section'

type ViewTransitionUpdate = () => void | Promise<void>

type ViewTransition = {
  finished: Promise<void>
  ready: Promise<void>
  updateCallbackDone: Promise<void>
}

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: ViewTransitionUpdate) => ViewTransition
}

const KIND_ATTRIBUTE = 'viewTransition'

/**
 * Applique une mise à jour du DOM à travers la View Transitions API quand le
 * navigateur la supporte, et l'applique directement sinon. La transition est
 * également court-circuitée si l'utilisateur a demandé moins d'animations.
 *
 * Le type de transition est exposé en attribut sur la racine le temps de
 * l'animation, ce qui permet au CSS de donner une durée différente à la palette
 * et au saut de section.
 *
 * @param kind - Type de transition, lu par le CSS.
 * @param update - Mutation du DOM à jouer pendant la transition.
 */
export const runViewTransition = async (
  kind: ViewTransitionKind,
  update: ViewTransitionUpdate,
): Promise<void> => {
  const documentWithViewTransition = document as DocumentWithViewTransition
  const startViewTransition = documentWithViewTransition.startViewTransition

  if (prefersReducedMotion() || startViewTransition === undefined) {
    await update()
    return
  }

  const root = document.documentElement
  const transition = startViewTransition.call(documentWithViewTransition, update)
  root.dataset[KIND_ATTRIBUTE] = kind

  const clearKind = () => delete root.dataset[KIND_ATTRIBUTE]
  transition.finished.then(clearKind, clearKind)

  await transition.updateCallbackDone
}
