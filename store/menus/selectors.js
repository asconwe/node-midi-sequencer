const selectMenu = state => ({
  menuItems: state.menus.menuItems,
  currentIndex: state.menus.currentIndex,
});

const selectCurrentItemAction = state => state.menus.menuItems[state.menus.currentIndex].action;

module.exports = {
  selectCurrentItemAction,
  selectMenu,
};
