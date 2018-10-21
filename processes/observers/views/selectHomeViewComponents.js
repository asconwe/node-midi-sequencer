const { createSelector } = require('reselect');
const { selectMenu, selectMenuTitle } = require('../../../store/menus/selectors');
const { selectIsPlaying, selectTempo } = require('../../../store/transport/selectors');
const horizontalMenu = require('../../../views/dynamic/horizontal-menu-list');
const transportStateView = require('../../../views/dynamic/transportState');
const tempoStateView = require('../../../views/dynamic/tempoState');

module.exports = createSelector(
  state => horizontalMenu(selectMenu(state)),
  selectMenuTitle,
  state => transportStateView(selectIsPlaying(state)),
  () => 'Recording: not implemented',
  state => tempoStateView(selectTempo(state)),
  (menu, menuTitle, transportState, recordingState, tempo) => ({
    menu, menuTitle, transportState, recordingState, tempo,
  }),
);
