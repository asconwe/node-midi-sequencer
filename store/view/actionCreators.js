const constants = require('./constants');
const store = require('../../store');
const menuListView = require('../../views/menu-list');
const { selectMenu } = require('../menus/selectors');

const renderView = view => ({
  type: constants.RENDER_VIEW,
  view,
});

const renderDerivedMenu = () => {
  const state = store.getState();
  const view = menuListView(selectMenu(state));
  return renderView(view);
};

module.exports = {
  renderView,
  renderDerivedMenu,
};
