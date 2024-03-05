/**
 * Filter an array of objects by a string property
 * @param {Object[]} transactions - The array of transactions to filter.
 * @param {string} property - The property to filter by.
 * @param {string} searchQuery - The search query to filter by.
 * @returns {Object[]} - The filtered array of transactions.
 */

export function filterByStringProperty(transactions, property, searchQuery) {
  if (searchQuery) {
    return transactions.filter(
      (item) =>
        item[property] &&
        typeof item[property] === "string" &&
        item[property].toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return transactions;
}
