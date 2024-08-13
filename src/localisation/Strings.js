import en from "./locale/en";
import jp from "./locale/jp";

const locales = { en, jp };
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