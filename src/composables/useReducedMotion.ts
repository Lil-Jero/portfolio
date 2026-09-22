import { onScopeDispose, readonly, ref } from 'vue'
import { REDUCED_MOTION_QUERY } from '@/utils/motionPreference'

/**
 * Suit la préférence système « réduire les animations » et la garde réactive :
 * l'utilisateur peut la changer sans recharger la page.
 */
export function useReducedMotion() {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  const isReduced = ref(mediaQuery.matches)

  const syncPreference = (event: MediaQueryListEvent) => {
    isReduced.value = event.matches
  }

  mediaQuery.addEventListener('change', syncPreference)
  onScopeDispose(() => mediaQuery.removeEventListener('change', syncPreference))

  return { isReduced: readonly(isReduced) }
}
