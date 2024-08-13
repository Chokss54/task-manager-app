import en from "./locale/en";
import jp from "./locale/jp";
import bm from "./locale/bm";

const locales = { en, jp, bm };
const currentLocale = locales.en;

/**
 * String function used to fetch text strings for language localisation
 * This is not the best solution for more complex apps but should work fine for this use case
 * 
 * @param path string key
 * @returns string value from currentLocale
 */
export function strings(path) {
  return currentLocale[path]
};