const constants = require('./constants');

const initialState = {
  menuItems: [],
  currentIndex: 0,
  previousMenu: null
}

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case constants.NEXT_INDEX:
      return {
        ...state,
        currentIndex: (currentIndex + 1) % (menuItems.length - 1),
      };
    case constants.PREVIOUS_INDEX:
      return {
        ...state,
        currentIndex: ((currentIndex - 1) + (menuItems.length - 1)) % (menuItems.length - 1)
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
    default:
      return state;
  }
}