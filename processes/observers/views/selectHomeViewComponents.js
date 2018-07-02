const { createSelector } = require('reselect');
const { selectMenu, selectMenuTitle } = require('../../../store/menus/selectors');
const { selectIsPlaying } = require('../../../store/transport/selectors');
const horizontalMenu = require('../../../views/dynamic/horizontal-menu-list');
const transportStateView = require('../../../views/dynamic/transportState');

module.exports = createSelector(
  state => horizontalMenu(selectMenu(state)),
  selectMenuTitle,
  state => transportStateView(selectIsPlaying(state)),
  () => 'Recording: not implemented',
  (menu, menuTitle, transportState, recordingState) => ({
    menu, menuTitle, transportState, recordingState,
  }),
);
