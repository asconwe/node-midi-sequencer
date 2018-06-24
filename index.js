const logger = require('./utils/logger');
const store = require('./store');
const { renderView } = require('./store/view/actionCreators');
const errorView = require('./views/error');

const render = require('./utils/render');
const initMIDIAccess = require('./processes/init/MIDIAccess');
const initPorts = require('./processes/init/ports');
const initUserConfig = require('./processes/init/userConfig.v2');
const initUserControl = require('./processes/init/userControl');
const armRoutes = require('./processes/armRoutes');
const armTransport = require('./processes/armTransport');

const { update: updateTransport } = require('./store/transport/actionCreators');

const main = async () => {
  try {
    render();
    await initMIDIAccess();
    initPorts();
    await initUserControl();
    await initUserConfig();
    armRoutes();
    armTransport();
  } catch (error) {
    store.dispatch(renderView(errorView(error)));
    logger.error(error.message);
  }
};
logger.info('here');
main();
