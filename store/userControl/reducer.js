const constants = require('./constants');

const initialState = {
  controlKnob: null,
  // knobIsEndless: true,
  controlButton: null,
  // buttonIsMomentary: false,
  transportButton: null,
  recordButton: null,
};

const userControlReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.UPDATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

module.exports = userControlReducer;
