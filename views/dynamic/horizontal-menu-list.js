const horizontalMenuItem = require('./horizontal-menu-item');

module.exports = ({ menuItems, currentIndex }) => menuItems.reduce((str, item, index) => `${str}${horizontalMenuItem(item.name, currentIndex === index)}`, '');
