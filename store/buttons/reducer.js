const constants = require('./constants');

const initialButtonState = {
  down: false,
  held: false,
};

const initialState = {
  control: initialButtonState,
  transport: initialButtonState,
  record: initialButtonState,
};

const buttonReducer = (state = initialButtonState, buttonAction) => {
  switch (buttonAction.type) {
    case constants.button.DOWN:
      return {
        ...state,
        down: true,
      };
    case constants.button.PRESS_AND_HOLD:
      return {
        ...state,
        held: true,
      };
    case constants.button.UP:
      return {
        ...state,
        down: false,
      };
    case constants.button.PRESS_AND_HOLD_RELEASE:
      return {
        ...state,
        held: false,
      };
    default:
      return state;
  }
};

const buttonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.CONTROL:

      return {
        ...state,
        control: buttonReducer(state.control, action.buttonAction),
      };
    case constants.TRANSPORT:
      return {
        ...state,
        transport: buttonReducer(state.transport, action.buttonAction),
      };
    case constants.RECORD:
      return {
        ...state,
        record: buttonReducer(state.record, action.buttonAction),
      };
    default:
      return state;
  }
};

module.exports = buttonsReducer;
