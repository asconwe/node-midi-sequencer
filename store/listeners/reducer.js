const constants = require('./constants');

const initialState = {};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD:
      return {
        ...state,
        [action.id]: (state[action.id] || []).concat(action.listener),
      };

    default:
      return state;
  }
};
