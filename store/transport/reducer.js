const constants = require('./constants');

const initialState = {
  currentIndex: 0,
  playing: false,
  tempo: 120,
  tick: false,
};

const transportReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.TEMPO_UP:
      return {
        ...state,
        tempo: state.tempo + 1,
      };
    case constants.TEMPO_DOWN:
      return {
        ...state,
        tempo: state.tempo - 1,
      };
    case constants.UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    case constants.TOGGLE:
      return {
        ...state,
        playing: !state.playing,
      };
    default:
      return state;
  }
};

module.exports = transportReducer;
