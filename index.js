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
const armControlButton = require('./processes/observers/button-and-knobs/controlButton');
const armTransportButton = require('./processes/observers/button-and-knobs/transportButton');
const armControlKnob = require('./processes/observers/button-and-knobs/controlKnob');
const renderHome = require('./processes/observers/views/home');

const { update: updateTransport } = require('./store/transport/actionCreators');

async function init() {
  await initMIDIAccess();
  initPorts();
  await initUserControl();
  armControlButton();
  armControlKnob();
  await initUserConfig();
  armRoutes();
  armTransport();
  armTransportButton();
}

const main = async () => {
  try {
    render();
    await init();
    logger.info('init complete.');

    renderHome();
  } catch (error) {
    store.dispatch(renderView(errorView(error)));
    logger.error(error.message);
  }
};
logger.info('here');
main();
