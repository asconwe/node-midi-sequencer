const logger = require('../../utils/logger');
const store = require('../../store');
const { renderView, renderDerivedMenu } = require('../../store/view/actionCreators');
const { selectPorts } = require('../../store/ports/selectors');
const { setMenuItems, saveMenuAsPrevious } = require('../../store/menus/actionCreators');

const channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const chooseInputPort = async state => new Promise((resolve, reject) => {
  try {
    logger.info('choosing input port');
    const { inputs } = selectPorts(state);
    const menuItems = Array.from(inputs).map(([id, port]) => ({
      action: () => {
        resolve(id);
        store.dispatch(saveMenuAsPrevious());
      },
      name: port.name,
    }));
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
        store.dispatch(saveMenuAsPrevious());
      },
      name: channel,
    }));
    store.dispatch(setMenuItems(menuItems));
    store.dispatch(renderDerivedMenu());
  } catch (error) {
    reject(error);
  }
});

const chooseOutputPort = async () => new Promise((resolve, reject) => {
  try {
    const { outputs } = selectPorts(state);
    const menuItems = Array.from(outputs).map(([id, port]) => ({
      action: () => {
        resolve(id);
        store.dispatch(saveMenuAsPrevious());
      },
      name: port.name,
    }));
    store.dispatch(setMenuItems(menuItems));
    store.dispatch(renderDerivedMenu());
  } catch (error) {
    reject(error);
  }
});

const chooseOutputChannel = async () => new Promise((resolve, reject) => {
  const menuItems = channels.map(channel => ({
    action: () => {
      resolve(channel);
      store.dispatch(saveMenuAsPrevious());
    },
    name: channel,
  }));
});


module.exports = async () => {
  logger.info('user config');
  const state = store.getState();
  const inputPort = await chooseInputPort(state);
  const inputChannel = await chooseInputChannel(state);
};
