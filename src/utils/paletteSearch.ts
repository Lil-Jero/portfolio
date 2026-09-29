import { EASTER_EGGS, type EasterEggId } from "@/data/content";

const DIACRITICS_PATTERN = /\p{Diacritic}/gu;
const WHITESPACE_PATTERN = /\s+/g;

/** Ramène une saisie à une forme comparable : sans accents, en minuscules. */
export const normalizeSearch = (value: string): string =>
  value.normalize("NFD").replace(DIACRITICS_PATTERN, "").toLowerCase().trim();

/**
 * Cherche l'easter egg dont un déclencheur correspond exactement à la saisie.
 * Les espaces sont ignorés, pour que « vue 2 » vaille « vue2 ».
 */
export const findEasterEgg = (query: string): EasterEggId | undefined => {
  const term = normalizeSearch(query).replace(WHITESPACE_PATTERN, "");
  return EASTER_EGGS.find((egg) => egg.triggers.includes(term))?.id;
};
