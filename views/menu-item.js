const colors = require('colors');

const X = colors.blue('>');

module.exports = (itemText, isActive) => (isActive
  ? `-${X}- ${colors.blue(itemText)}`
  : `--- ${itemText}`);
