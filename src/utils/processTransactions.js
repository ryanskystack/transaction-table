/**
 * Processes the transactions data by replacing the category and merchant IDs with their respective names.
 *
 * @param {Object[]} transactionsData - An array of transaction objects. Each object should have the following properties:
 *   @property {string} id - The UUID of the transaction.
 *   @property {('complete'|'incomplete'|'exported')} status - The status of the transaction.
 *   @property {string} date - The date of the transaction in ISO 8601 format.
 *   @property {string} merchant - The UUID of the merchant associated with the transaction.
 *   @property {string} team_member - The name of the team member associated with the transaction.
 *   @property {string} budget - The budget associated with the transaction.
 *   @property {boolean} receipt - Whether the transaction has a receipt.
 *   @property {boolean} billable - Whether the transaction is billable.
 *   @property {number} gst - The GST amount for the transaction.
 *   @property {number} amount - The amount of the transaction.
 *   @property {string} category - The UUID of the category associated with the transaction.
 * @param {Object[]} categoriesData - An array of category objects. Each object should have the following properties:
 *   @property {string} id - The UUID of the category.
 *   @property {string} name - The name of the category.
 * @param {Object[]} merchantsData - An array of merchant objects. Each object should have the following properties:
 *   @property {string} id - The UUID of the merchant.
 *   @property {string} name - The name of the merchant.
 * @returns {Object[]} processedTransactions - An array of processed transaction objects. Each object has the same properties as the input transaction objects, but the `category` and `merchant` properties are replaced with their respective names.
 *   @property {string} id - The UUID of the transaction.
 *   @property {('complete'|'incomplete'|'exported')} status - The status of the transaction.
 *   @property {string} date - The date of the transaction in ISO 8601 format.
 *   @property {string} merchant - The value of the merchant name.
 *   @property {string} team_member - The name of the team member associated with the transaction.
 *   @property {string} budget - The budget associated with the transaction.
 *   @property {boolean} receipt - Whether the transaction has a receipt.
 *   @property {boolean} billable - Whether the transaction is billable.
 *   @property {number} gst - The GST amount for the transaction.
 *   @property {number} amount - The amount of the transaction.
 *   @property {string} category - The value of the category name.
 */

export const processTransactions = (
  transactionsData,
  categoriesData,
  merchantsData
) => {
  // Create a map of categories
  const categoriesMap = categoriesData.reduce((map, category) => {
    map[category.id] = category.name;
    return map
  }, {})

  // Create a map of merchants
  const merchantsMap = merchantsData.reduce((map, merchant) => {
    map[merchant.id] = merchant.name;
    return map;
  }, {});

  // Process the transactions data by replacing the category and merchant ids with their names using the maps created above
  const processedTransactions = transactionsData.map(
    ({ category: categoryId, merchant: merchantId, ...transaction }) => ({
      ...transaction,
      category: categoriesMap[categoryId] || "",
      merchant: merchantsMap[merchantId] || "",
    })
  );

  return processedTransactions;
};
