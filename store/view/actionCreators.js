const constants = require('./constants');
const store = require('../../store');
const menuListView = require('../../views/menu-list');
const { selectMenu, selectMenuTitle } = require('../menus/selectors');

const renderView = view => ({
  type: constants.RENDER_VIEW,
  view,
});

const renderDerivedMenu = () => {
  const state = store.getState();
  const list = menuListView(selectMenu(state));
  const title = selectMenuTitle(state);
  const view = `
${title}
----------------------------
${list}`;
  return renderView(view);
};

module.exports = {
  renderView,
  renderDerivedMenu,
};
