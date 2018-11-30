const store = require('../../store');
const { routeAction } = require('../../store/routes/actionCreators');
const { updateRoute } = require('../../store/routes/route/actionCreators');
const initRouteProcess = require('./initRoute');

const reinitPortsByName = () => {
  const state = store.getState();
  const { ports, routes } = state;
  routes.forEach((route, index) => {
    let newInId;
    let newOutId;
    let newOutputPort;
    ports.inputs.forEach((port, id) => {
      if (port.name === route.in.name) {
        newInId = id;
      }
    });
    ports.outputs.forEach((port, id) => {
      if (port.name === route.out.name) {
        newOutId = id;
        newOutputPort = port;
      }
    });
    const updatedRoute = {
      ...route,
      in: {
        ...route.in,
        id: newInId,
      },
      out: {
        ...route.out,
        id: newOutId,
      },
      outputPort: newOutputPort,
      process: initRouteProcess(),
    };
    store.dispatch(routeAction(index, updateRoute(updatedRoute)));
  });
};

module.exports = reinitPortsByName;
