const colors = require('colors');

const X = colors.blue('>>');
const Y = colors.blue('<<');

module.exports = (itemText, isActive) => (isActive
  ? ` ${X}${itemText}${Y}`
  : `  .${itemText}. `);
