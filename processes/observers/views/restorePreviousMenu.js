const store = require('../../../store/');
const { selectPreviousMenu } = require('../../../store/menus/selectors');
const { setMenuItems, setMenuTitle } = require('../../../store/menus/actionCreators');

module.exports = () => {
  const state = store.getState();
  const previousMenu = selectPreviousMenu(state);
  const backAction = () => {
    store.dispatch(setMenuItems(previousMenu.menuItems));
    store.dispatch(setMenuTitle(previousMenu.menuTitle));
  };

  return {
    name: 'back',
    pressReleaseAction: backAction,
  };
};
