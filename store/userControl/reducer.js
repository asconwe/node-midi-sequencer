const constants = require('./constants');

const initialState = {
  knob: null,
  knobIsEndless: true,
  button: null,
  buttonIsMomentary: false,
}

const userControlReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.UPDATE:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state;
  }
}

module.exports = userControlReducer;