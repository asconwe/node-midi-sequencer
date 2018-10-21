const _ = require('lodash');
const logger = require('../utils/logger');
const store = require('../store');
const { knobMove, knobReset } = require('../store/knobs/actionCreators');
const {
  buttonDown, buttonPressAndHold, buttonUp, buttonPressAndHoldRelease,
} = require('../store/buttons/actionCreators');

const pressAndHoldDuration = 400;

module.exports = {
  handleKnobEvent: target => knob => (event) => {
    if (event.channel === knob.channel && event.controllerNumber === knob.controllerNumber) {
      const movement = event.controllerValue - 64;
      store.dispatch(knobMove(target, movement));
      store.dispatch(knobReset(target));
    }
    return null;
  },

  handleButtonEvent: target => (button) => {
    let buttonTimeout;
    return (event) => {
      if (event.channel === button.channel && event.controllerNumber === button.controllerNumber) {
        // Button down event
        if (event.controllerValue === 127) {
          store.dispatch(buttonDown(target));
          logger.info(`${target} button down event`);
          clearTimeout(buttonTimeout);
          buttonTimeout = setTimeout(() => {
            clearTimeout(buttonTimeout);
            store.dispatch(buttonPressAndHold(target));
            logger.info(`${target} press and hold`);
          }, pressAndHoldDuration);
          return;
        }
        // Button up event
        clearTimeout(buttonTimeout);
        store.dispatch(buttonUp(target));
        store.dispatch(buttonPressAndHoldRelease(target));
        logger.info(`${target} button up event`);
      }
    };
  },
};
