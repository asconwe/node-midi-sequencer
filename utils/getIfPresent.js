
/**
 * Delays execution of accessing a deeply nested property and
 * places it in a try/catch block. Returns the deeply nested property,
 * or null, if accessing the property fails.
 * @param {function} func A function returning some deeply nested property
 * @returns {*} The deeply nested property or null.
 */
const getIfPresent = (func) => {
  try {
    return func();
  } catch (error) {
    return null;
  }
};

module.exports = getIfPresent;
