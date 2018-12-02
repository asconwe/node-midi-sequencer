const logger = require('../utils/logger');
const store = require('./store');
const { selectMessagesForPlayback } = require('./store/messages/selectors');
const constants = require('./messageConstants');
const { toMainProcess } = require('./messageCreators');
const handleMidiMessage = require('./handleMidiMessage');
const compoundActions = require('./store/compoundActions');

try {
  const handleGetMidiMessages = (position) => {
    const state = store.getState();
    const midiMessages = selectMessagesForPlayback(state, position);
    if (midiMessages) {
      midiMessages.forEach((midiMessage) => {
        process.send(toMainProcess.sendMidiMessage(midiMessage));
      });
    }
  };

  const handleGetState = () => {
    const { messages, ...state } = store.getState();
    process.send(toMainProcess.sendState(state));
  };

  const handleDispatch = (action) => {
    store.dispatch(action);
  };

  process.on('message', (message) => {
    switch (message.type) {
      case constants.toRouteProcess.SET_MIDI_MESSAGE:
        handleMidiMessage(message.midiMessage, message.step);
        break;
      case constants.toRouteProcess.GET_MIDI_MESSAGES:
        handleGetMidiMessages(message.position);
        break;
      case constants.toRouteProcess.DISPATCH:
        handleDispatch(message.action);
        break;
      case constants.toRouteProcess.DO:
        compoundActions[message.action](...message.args);
        break;
      case constants.toRouteProcess.GET_STATE:
        handleGetState();
        break;
      default:
        break;
    }
  });
} catch (error) {
  logger.info(error.message);
  process.send({
    type: 'error',
    message: error.message,
    stack: error.stack,
  });
}
