const constants = require('./constants');
const getIfPresent = require('../../../utils/getIfPresent');

const initialState = {
  // base unit is 1 beat
  // length is base unit * (2 to the n power) * multiplier
  n: 4,
  multiplier: 1,
};

const routeIndexReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.INCREMENT_MULTIPLIER:
      return {
        ...state,
        multiplier: state.multiplier + 1,
      };
    case constants.INCREMENT_N:
      return {
        ...state,
        n: state.n + 1,
      };
    case constants.DECREMENT_MULTIPLIER:
      return {
        ...state,
        multiplier: state.multiplier > 1 ? state.multiplier - 1 : state.multiplier,
      };
    case constants.DECREMENT_N:
      return {
        ...state,
        n: state.n > 1 ? state.n - 1 : state.n,
      };
    default:
      return {
        ...state,
      };
  }
};

module.exports = routeIndexReducer;
