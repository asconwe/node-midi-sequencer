const { createSelector } = require('reselect');
const { selectMenu, selectMenuTitle } = require('../../../store/menus/selectors');
const {
  selectIsPlaying,
  selectTempo,
  selectCurrentIndex,
  selectBaseStepsPerBeat,
} = require('../../../store/transport/selectors');
const { selectAllTracks } = require('../../../store/routes/selectors');
const horizontalMenu = require('../../../views/dynamic/horizontal-menu-list');
const transportStateView = require('../../../views/dynamic/transportState');
const tempoStateView = require('../../../views/dynamic/tempoState');
const currentTimeStateView = require('../../../views/dynamic/currentTimeState');
const tracksView = require('../../../views/dynamic/tracks');

const buildView = (view, ...selectors) => state => view(...selectors.map(selector => selector(state)));

module.exports = createSelector(
  selectMenuTitle,
  buildView(horizontalMenu, selectMenu),
  buildView(transportStateView, selectIsPlaying),
  () => 'Recording: not implemented',
  buildView(tempoStateView, selectTempo),
  buildView(currentTimeStateView, selectCurrentIndex, selectBaseStepsPerBeat),
  buildView(tracksView, selectAllTracks, selectCurrentIndex, selectBaseStepsPerBeat),
  (menuTitle, menu, transportState, recordingState, tempo, time, tracks) => ({
    menu, menuTitle, transportState, recordingState, tempo, time, tracks,
  }),
);
