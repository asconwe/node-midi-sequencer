const constants = require('./constants');
const getIfPresent = require('../../../utils/getIfPresent');

const initialState = {
  messages: {},
  // good spot for history
};

const routeIndexReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.ADD_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.step]: getIfPresent(
            () => state.messages[action.step].concat(action.message),
            [action.message],
          ),
        },
      };
    case constants.CLEAR_TIMELINE:
      return {
        ...state,
        messages: {},
      };
    case constants.REPLACE_TIMELINE:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return {
        ...state,
      };
  }
};

module.exports = routeIndexReducer;
