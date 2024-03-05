/**
 * Get unique values from an array of objects
 * @param {Object[]} array - The array of objects to get unique values from.
 * @param {string} key - The key to get unique values for.
 * @returns {string[]} - An array of unique values.
 */

export function getUniqueValues(array, key) {
  return [...new Set(array.map((item) => item[key]).filter(Boolean))];
}
