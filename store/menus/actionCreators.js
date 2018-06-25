const constants = require('./constants');

module.exports = {
  nextIndex: () => ({
    type: constants.NEXT_INDEX,
  }),
  previousIndex: () => ({
    type: constants.PREVIOUS_INDEX,
  }),
  setMenuItems: menuItems => ({
    type: constants.SET_MENU_ITEMS,
    menuItems,
  }),
  saveMenuAsPrevious: () => ({
    type: constants.SAVE_MENU_AS_PREVIOUS,
  }),
  setMenuTitle: title => ({
    type: constants.SET_TITLE,
    title,
  }),
};
