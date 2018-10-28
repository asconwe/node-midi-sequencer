const constants = require('./constants');

module.exports = {
  nextIndex: () => ({
    type: constants.NEXT_INDEX,
  }),
  previousIndex: () => ({
    type: constants.PREVIOUS_INDEX,
  }),
  setIndex: index => ({
    type: constants.SET_INDEX,
    index,
  }),
  setMenuItems: (menuItems, index = 0) => ({
    type: constants.SET_MENU_ITEMS,
    menuItems,
    index,
  }),
  updateMenuItem: (menuItem, menuItemIndex) => ({
    type: constants.UPDATE_MENU_ITEM,
    menuItem,
    menuItemIndex,
  }),
  saveMenuAsPrevious: () => ({
    type: constants.SAVE_MENU_AS_PREVIOUS,
  }),
  setMenuTitle: title => ({
    type: constants.SET_TITLE,
    title,
  }),
};
