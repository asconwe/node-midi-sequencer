const { createSelector } = require('reselect');
const logger = require('../../../utils/logger');
const store = require('../../../store');
const observeStore = require('../../../store/observeStore');
const { selectCurrentIndex } = require('../../../store/transport/selectors');
const { selectAllTracks } = require('../../../store/routes/selectors');
const sendMIDIOut = require('../../../utils/sendMIDIOut');

module.exports = () => observeStore(
  store,
  state => ({
    currentStep: selectCurrentIndex(state),
    tracks: selectAllTracks(state),
  }),
  ({ currentStep, tracks }) => {
    tracks.forEach((route, index) => {
      const { n, multiplier } = route;
      const timelineLength = Math.pow(2, n) * multiplier * 16;
      const trackStep = currentStep % timelineLength;
      if (route.messages[trackStep]) {
        route.messages[trackStep].forEach((message) => {
          sendMIDIOut(message, route);
        });
      }
    });
  },
);
