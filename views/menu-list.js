const logger = require('../utils/logger');
const menuItem = require('./menu-item');

module.exports = ({ menuItems, currentIndex }) => menuItems.reduce((str, item, index) => `${str}${menuItem(item.name, currentIndex === index)}\n`, '');
