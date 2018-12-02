const logger = require('../../utils/logger');
const store = require('../../store');
const { renderDerivedMenu } = require('../../store/view/actionCreators');
const { selectPorts } = require('../../store/ports/selectors');
const { setMenuItems, setMenuTitle } = require('../../store/menus/actionCreators');
const { appendRoute } = require('../../store/routes/actionCreators');
const initRouteProcess = require('./initRoute');

const channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const chooseInputPort = async state => new Promise((resolve, reject) => {
  try {
    const { inputs } = selectPorts(state);
    const menuItems = Array.from(inputs).map(([id, port]) => ({
      pressReleaseAction: () => {
        resolve({ id, name: port.name });
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
    const menuItems = channels.map(channel => ({
      pressReleaseAction: () => {
        resolve(channel - 1);
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
    const { outputs } = selectPorts(state);
    const menuItems = Array.from(outputs).map(([id, port]) => ({
      pressReleaseAction: () => {
        resolve({ id, name: port.name });
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
    const menuItems = channels.map(channel => ({
      pressReleaseAction: () => {
        resolve(channel - 1);
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
    const menuItems = [{
      name: 'Yes',
      pressReleaseAction: () => {
        resolve(true);
      },
    }, {
      name: 'No',
      pressReleaseAction: () => {
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


const makeRoute = async (index = 0) => {
  const state = store.getState();
  const inputPort = await chooseInputPort(state);
  const inputChannel = await chooseInputChannel();
  const outputPort = await chooseOutputPort(state);
  const outputChannel = await chooseOutputChannel();
  store.dispatch(appendRoute({
    in: {
      id: inputPort.id,
      name: inputPort.name,
      channel: inputChannel,
    },
    out: {
      id: outputPort.id,
      name: outputPort.name,
      channel: outputChannel,
    },
    process: initRouteProcess(index),
    outputPort: state.ports.outputs.get(outputPort.id),
  }));
  const makeAnotherRoute = await chooseMakeAnother();
  if (makeAnotherRoute) {
    return makeRoute(index + 1);
  }
  return null;
};

module.exports = makeRoute;
