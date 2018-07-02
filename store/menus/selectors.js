const getIfPresent = require('../../utils/getIfPresent');

const selectMenu = state => ({
  menuItems: state.menus.menuItems,
  currentIndex: state.menus.currentIndex,
});

const selectCurrentItemAction = state => getIfPresent(
  () => state.menus.menuItems[state.menus.currentIndex].action,
);

const selectMenuTitle = state => state.menus.menuTitle;

module.exports = {
  selectCurrentItemAction,
  selectMenu,
  selectMenuTitle,
};
