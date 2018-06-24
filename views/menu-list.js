const menuItem = require('./menu-item');

module.exports = list => list.reduce((str, item) => `${str}${menuItem(item.text, item.isActive)}\n`, '');
