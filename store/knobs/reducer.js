const logger = require('../../utils/logger');
const constants = require('./constants');

const initialKnobState = {
  movement: 0,
  intercepted: false,
};

const initialState = {
  controlKnob: initialKnobState,
};

const knobReducer = (state = initialKnobState, knobAction) => {
  switch (knobAction.type) {
    case constants.knob.MOVE:
      logger.info(knobAction.movement);
      return {
        ...state,
        movement: knobAction.movement,
      };
    case constants.knob.RESET_MOVEMENT:
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
        controlKnob: knobReducer(state.controlKnob, action.knobAction),
      };
    default:
      return state;
  }
};

module.exports = knobsReducer;
