const sendMIDIOut = require('../utils/sendMIDIOut');
const store = require('../store');
const { selectCurrentIndex, selectIsPlaying } = require('../store/transport/selectors');
const { selectTrack } = require('../store/routes/route/selectors');
const { addMIDIListener } = require('../store/listeners/actionCreators');
const attachListeners = require('./attachListeners');

const { toRouteProcess } = require('../route_process/messageCreators');

const createListener = (route, index) => {
  const listener = (parsedEvent) => {
    if (parsedEvent.channel === route.in.channel) {
      const state = store.getState();
      const { armed } = selectTrack(state, index);
      const playing = selectIsPlaying(state);
      if (armed && playing) {
        const step = selectCurrentIndex(state);
        route.process.send(toRouteProcess.setMidiMessage(parsedEvent, step));
      }
      sendMIDIOut(parsedEvent, route);
    }
  };
  store.dispatch(addMIDIListener({ id: route.in.id, listener, type: 'route' }));
};

const createListeners = () => {
  const state = store.getState();
  const { routes = [] } = state;
  routes.forEach((route, index) => {
    createListener(route, index);
  });
};

module.exports = () => {
  createListeners();
  attachListeners();
};
