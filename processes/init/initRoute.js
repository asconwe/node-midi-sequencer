const logger = require('../../utils/logger');
const { fork } = require('child_process');
const sendMIDIOut = require('../../utils/sendMIDIOut');
const { toMainProcess } = require('../../route_process/messageConstants');
const { selectAllTracks } = require('../../store/routes/selectors');
const store = require('../../store');

const initRoute = (index) => {
  const routeProcess = fork('./route_process');
  // add listeners here! :)
  routeProcess.on('message', (data) => {
    logger.info('FROM ROUTE PROCESS');
    if (data.type === 'error') {
      logger.info(data.message);
      logger.info(data.stack);
      const RPError = new Error(data.message);
      RPError.stack = data.stack;
      throw RPError;
    }

    if (data.type === toMainProcess.SEND_MIDI_MESSAGE) {
      const state = store.getState();
      const route = selectAllTracks(state)[index];
      sendMIDIOut(data.midiMessage, route);
    }
    logger.info(`type: ${data.type}`);
  });
  return routeProcess;
};

module.exports = initRoute;
