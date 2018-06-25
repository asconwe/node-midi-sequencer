const selectMenu = state => ({
  menuItems: state.menus.menuItems,
  currentIndex: state.menus.currentIndex,
});

const selectCurrentItemAction = state => state.menus.menuItems[state.menus.currentIndex].action;
const selectMenuTitle = state => state.menus.menuTitle;

module.exports = {
  selectCurrentItemAction,
  selectMenu,
  selectMenuTitle,
};
