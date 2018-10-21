const constants = require('./constants');

const initialState = {
  // base unit is 1 beat
  // length is base unit * (2 to the n power) * multiplier
  n: 4,
  multiplier: 1,
  messages: {},
  // good spot for history
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_N:
      return {
        ...state,
        n: action.n,
      };
    case constants.SET_MULTIPLIER:
      return {
        ...state,
        multiplier: action.multiplier,
      };
    case constants.ADD_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.step]: [
            ...state.messages[action.step],
            action.message,
          ],
        },
      };
    default:
      return state;
  }
};


module.exports = {
  initialState,
  reducer,
};
