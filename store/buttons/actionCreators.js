const constants = require('./constants');

const buttonActionCreators = {
  buttonDown: target => ({
    type: constants[target.trim().toUpperCase()],
    buttonAction: {
      type: constants.button.DOWN,
    },
  }),

  buttonPressAndHold: target => ({
    type: constants[target.trim().toUpperCase()],
    buttonAction: {
      type: constants.button.PRESS_AND_HOLD,
    },
  }),

  buttonUp: target => ({
    type: constants[target.trim().toUpperCase()],
    buttonAction: {
      type: constants.button.UP,
    },
  }),

  buttonPressAndHoldRelease: target => ({
    type: constants[target.trim().toUpperCase()],
    buttonAction: {
      type: constants.button.PRESS_AND_HOLD_RELEASE,
    },
  }),
};

module.exports = {
  ...buttonActionCreators,
};
