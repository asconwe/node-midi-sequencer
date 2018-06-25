const MIDIMessage = require('midimessage');
const logger = require('../utils/logger');

const store = require('../store');
const { addMIDIListener } = require('../store/listeners/actionCreators');
const attachListeners = require('./attachListeners');

const createListeners = () => {
  const state = store.getState();
  const { routes = [], ports } = state;
  logger.info(routes);
  routes.forEach((route) => {
    logger.info(`route::::${route}`);
    const outputPort = ports.outputs.get(route.out.id);
    createListener(route, outputPort);
  });
};

const createListener = (route, outputPort) => {
  const listener = (parsedEvent) => {
    if (parsedEvent.channel === route.in.channel) {
      // Send to sequencer
      // Send to midi out
      sendMIDIOut(parsedEvent, route, outputPort);
    }
  };
  store.dispatch(addMIDIListener({ id: route.in.id, listener }));
};

const sendMIDIOut = (parsedEvent, route, outputPort) => {
  const channelDiff = route.out.channel - route.in.channel;
  const messageTypeAndChannel = parsedEvent._event.data[0] + channelDiff;
  const outMessage = [messageTypeAndChannel, ...parsedEvent._event.data.slice(1)];
};

module.exports = () => {
  createListeners();
  attachListeners();
};
