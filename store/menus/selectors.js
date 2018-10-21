const getIfPresent = require('../../utils/getIfPresent');

const selectMenu = state => ({
  menuItems: state.menus.menuItems,
  currentIndex: state.menus.currentIndex,
});

const selectCurrentPressAction = state => getIfPresent(
  () => state.menus.menuItems[state.menus.currentIndex].pressAction,
);

const selectCurrentPressReleaseAction = state => getIfPresent(
  () => state.menus.menuItems[state.menus.currentIndex].pressReleaseAction,
);

const selectCurrentPressAndHoldAction = state => getIfPresent(
  () => state.menus.menuItems[state.menus.currentIndex].pressAndHoldAction,
);

const selectCurrentPressAndHoldReleaseAction = state => getIfPresent(
  () => state.menus.menuItems[state.menus.currentIndex].pressAndHoldReleaseAction,
);

const selectMenuTitle = state => state.menus.menuTitle;

const selectPreviousMenu = state => state.menus.previousMenu;

module.exports = {
  selectCurrentPressAction,
  selectCurrentPressReleaseAction,
  selectCurrentPressAndHoldAction,
  selectCurrentPressAndHoldReleaseAction,
  selectMenu,
  selectMenuTitle,
  selectPreviousMenu,
};
