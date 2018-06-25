const logger = require('../../utils/logger');
const store = require('../../store');
const { renderDerivedMenu } = require('../../store/view/actionCreators');
const { selectPorts } = require('../../store/ports/selectors');
const { setMenuItems, setMenuTitle } = require('../../store/menus/actionCreators');
const { appendRoute } = require('../../store/routes/actionCreators');

const channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const chooseInputPort = async state => new Promise((resolve, reject) => {
  try {
    logger.info('choosing input port');
    const { inputs } = selectPorts(state);
    const menuItems = Array.from(inputs).map(([id, port]) => ({
      action: () => {
        resolve(id);
      },
      name: port.name,
    }));
    store.dispatch(setMenuTitle('Choose an input port'));
    store.dispatch(setMenuItems(menuItems));
    store.dispatch(renderDerivedMenu());
  } catch (error) {
    reject(error);
  }
});

const chooseInputChannel = async () => new Promise((resolve, reject) => {
  try {
    logger.info('choosing input channel');
    const menuItems = channels.map(channel => ({
      action: () => {
        resolve(channel);
      },
      name: channel,
    }));
    store.dispatch(setMenuTitle('Choose an input channel'));
    store.dispatch(setMenuItems(menuItems));
    store.dispatch(renderDerivedMenu());
  } catch (error) {
    reject(error);
  }
});

const chooseOutputPort = async state => new Promise((resolve, reject) => {
  try {
    logger.info('choosing output port');
    const { outputs } = selectPorts(state);
    const menuItems = Array.from(outputs).map(([id, port]) => ({
      action: () => {
        resolve(id);
      },
      name: port.name,
    }));
    store.dispatch(setMenuTitle('Choose an output port'));
    store.dispatch(setMenuItems(menuItems));
    store.dispatch(renderDerivedMenu());
  } catch (error) {
    reject(error);
  }
});

const chooseOutputChannel = async () => new Promise((resolve, reject) => {
  try {
    logger.info('choosing output cahnnel');
    const menuItems = channels.map(channel => ({
      action: () => {
        resolve(channel);
      },
      name: channel,
    }));
    store.dispatch(setMenuTitle('Choose an output port'));
    store.dispatch(setMenuItems(menuItems));
    store.dispatch(renderDerivedMenu());
  } catch (error) {
    reject(error);
  }
});

const chooseMakeAnother = async () => new Promise((resolve, reject) => {
  try {
    logger.info('choosing if we will make another route');
    const menuItems = [{
      name: 'Yes',
      action: () => {
        resolve(true);
      },
    }, {
      name: 'No',
      action: () => {
        resolve(false);
      },
    }];
    store.dispatch(setMenuTitle('Make another route?'));
    store.dispatch(setMenuItems(menuItems));
    store.dispatch(renderDerivedMenu());
  } catch (error) {
    reject(error);
  }
});


const makeRoute = async () => {
  logger.info('user config');
  const state = store.getState();
  const inputPort = await chooseInputPort(state);
  const inputChannel = await chooseInputChannel();
  const outputPort = await chooseOutputPort(state);
  const outputChannel = await chooseOutputChannel();
  store.dispatch(appendRoute({
    in: {
      id: inputPort,
      channel: inputChannel,
    },
    out: {
      id: outputPort,
      channel: outputChannel,
    },
  }));
  const makeAnotherRoute = await chooseMakeAnother();
  if (makeAnotherRoute) {
    return makeRoute();
  }
  return null;
};

module.exports = makeRoute;
