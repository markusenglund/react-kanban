/**
 * Picking selected items from an object.
 * @param {object} obj to pick from
 * @param {array<string>} items to pick from the object
 */
function pick(obj, items) {
  return items.reduce((accumulator, currentKey) => {
    accumulator[currentKey] = obj[currentKey];
    return accumulator;
  }, {});
}

export default { pick };