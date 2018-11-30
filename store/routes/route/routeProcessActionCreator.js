const store = require('../../index');
const { toRouteProcess } = require('../../../route_process/messageCreators');
const { selectTrack } = require('./selectors');


const routeProcessAction = (index, action) => {
  const state = store.getState();
  const { process } = selectTrack(state, index);
  process.send(toRouteProcess.dispatch(action));
};

module.exports = routeProcessAction;
