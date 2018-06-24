const logger = require('../utils/logger');

let controlButtonTimeout;

const pressAndHoldDuration = 800;

module.exports = {
  handleKnobControl: knob => (event) => {
    if (event.channel === knob.channel && event.controllerNumber === knob.controllerNumber) {
      if (event.controllerValue > 64) {
        return logger.info('knob right');
      }
      return logger.info('knob left');
    }
    return null;
  },

  handleButtonControl: button => (event) => {
    if (event.channel === button.channel && event.controllerNumber === button.controllerNumber) {
      if (event.controllerValue === 127) {
        clearTimeout(controlButtonTimeout);
        return controlButtonTimeout = setTimeout(() => {
          clearTimeout(controlButtonTimeout);
          logger.info('press and hold');
        }, pressAndHoldDuration);
      }
      if (controlButtonTimeout && !controlButtonTimeout._called) {
        clearTimeout(controlButtonTimeout);
        return logger.info('tap');
      }
    }
  },
};
