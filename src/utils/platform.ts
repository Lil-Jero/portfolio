const APPLE_PLATFORM_PATTERN = /Mac|iPhone|iPad/;

/** Vrai sur macOS et iOS, où le raccourci de la palette passe par ⌘ et non Ctrl. */
export const isApplePlatform = (): boolean =>
  APPLE_PLATFORM_PATTERN.test(navigator.userAgent);
