const logger = require('../../utils/logger');
const constants = require('./constants');

const initialState = {
  menuItems: [],
  currentIndex: 0,
  previousMenu: null,
  menuTitle: '',
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case constants.NEXT_INDEX:
      return {
        ...state,
        currentIndex: (state.currentIndex + 1) % (state.menuItems.length),
      };
    case constants.PREVIOUS_INDEX:
      return {
        ...state,
        currentIndex: ((state.currentIndex - 1) + (state.menuItems.length)) % (state.menuItems.length),
      };
    case constants.SET_MENU_ITEMS:
      return {
        ...state,
        menuItems: action.menuItems,
        currentIndex: 0,
      };
    case constants.SAVE_MENU_AS_PREVIOUS:
      return {
        ...state,
        previousMenu: {
          ...state,
        },
      };
    case constants.SET_TITLE:
      return {
        ...state,
        menuTitle: action.title,
      };
    default:
      return state;
  }
};
