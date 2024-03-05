/**
 * @param {Array} transactions
 * @param {String} property
 * @param {String} searchQuery
 * @returns {Array} *
 */

export function filterByNumericProperty(transactions, property, searchQuery) {
  if (searchQuery) {
    const searchNumber = Number(searchQuery);
    if (!isNaN(searchNumber)) {
      return transactions.filter((item) => item[property] === searchNumber);
    }
  }
  return transactions;
}
