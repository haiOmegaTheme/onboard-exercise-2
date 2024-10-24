import { isValidArray } from "./validator";

/**
 * Paginates a list of items based on the provided page and limit.
 * If the items array is invalid or the pagination parameters are missing/invalid, an empty array is returned.
 *
 * @param {Array} items - The array of items to paginate.
 * @param {Object} [pagination={}] - The pagination settings.
 * @param {number} pagination.page - The current page number (starts from 1).
 * @param {number} pagination.limit - The number of items per page.
 * @returns {Array} The sliced array of items for the current page, or an empty array if input is invalid.
 *
 * @example
 * const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
 * const paginatedItems = getPaginatedItems(items, { page: 1, limit: 2 });
 * console.log(paginatedItems); // ['Item 1', 'Item 2']
 *
 * @example
 * const paginatedItems = getPaginatedItems([], { page: 1, limit: 2 });
 * console.log(paginatedItems); // []
 */
export const getPaginatedItems = (
  items: any,
  { page, limit }: { page: any; limit: any }
) => {
  if (!isValidArray(items)) {
    return [];
  }

  if (!page || !limit || page < 1 || limit <= 0) {
    return [];
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedItems = items.slice(startIndex, endIndex);

  return paginatedItems;
};
