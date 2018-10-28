const constants = require('./constants');
const routeReducer = require('./route/reducer');

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.REPLACE_ALL:
      return action.routes.map(route => routeReducer(route));

    case constants.REPLACE_ONE:
      return [
        ...state.slice(0, action.index),
        routeReducer(action.route),
        ...state.slice(action.index + 1),
      ];

    case constants.APPEND:
      return state.concat(routeReducer(action.route));

    case constants.ROUTE_ACTION:
      return [
        ...state.slice(0, action.index),
        routeReducer(state[action.index], action.routeAction),
        ...state.slice(action.index + 1),
      ];

    default:
      return state;
  }
};


module.exports = reducer;
