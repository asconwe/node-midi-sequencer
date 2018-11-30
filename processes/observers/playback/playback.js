const { createSelector } = require('reselect');
const logger = require('../../../utils/logger');
const store = require('../../../store');
const observeStore = require('../../../utils/observeStore');
const { selectCurrentIndex } = require('../../../store/transport/selectors');
const { selectAllTracks } = require('../../../store/routes/selectors');
const sendMIDIOut = require('../../../utils/sendMIDIOut');
const { toRouteProcess } = require('../../../route_process/messageCreators');


module.exports = () => observeStore(
  store,
  selectCurrentIndex,
  (currentStep) => {
    const state = store.getState();
    const tracks = selectAllTracks(state);
    tracks.forEach((route, index) => {
      // const { n, multiplier } = route;
      // const timelineLength = Math.pow(2, n) * multiplier * 16;
      // const trackStep = currentStep % timelineLength;
      // if (route.messages[trackStep]) {
      //   route.messages[trackStep].forEach((message) => {
      //     sendMIDIOut(message, route);
      //   });
      // }
      route.process.send(toRouteProcess.getMidiMessages(currentStep));
    });
  },
);
