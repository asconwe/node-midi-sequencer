const constants = require('./constants');

const initialKnobState = {
  movement: 0,
};

const initialState = {
  controlKnob: initialKnobState,
};

const knobReducer = (state = initialKnobState, knobAction) => {
  switch (knobAction.type) {
    case constants.knob.MOVE:
      return {
        ...state,
        movement: knobAction.movement,
      };
    case constants.knob.RESET:
      return {
        ...state,
        movement: 0,
      };
    default:
      return state;
  }
};

const knobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.CONTROL:
      return {
        ...state,
        control: knobReducer(state, action.knobAction),
      };
    default:
      return state;
  }
};

module.exports = knobsReducer;
