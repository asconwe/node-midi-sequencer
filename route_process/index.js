const logger = require('../utils/logger');

try {
  logger.info('here');
  const store = require('./store');
  logger.info('now');
  const { selectMessagesForPlayback } = require('./store/messages/selectors');
  const constants = require('./messageConstants');
  const { toMainProcess } = require('./messageCreators');
  const { addMessage } = require('./store/messages/actionCreators');
  const handleMidiMessage = require('./handleMidiMessage');
  const compoundActions = require('./store/compoundActions');

  logger.info('route-process');

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

  const handleCompoundDispatch = process.on('message', (message) => {
    logger.info('message');
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
        logger.info('constants.toRouteProcess.DO');
        logger.info(`action ${message.action}`);
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
