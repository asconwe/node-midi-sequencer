const constants = require('./constants');


/**
 * Create a knob movement action at <target>
 * @param {string} target The knob target that sent the event
 * @param {number} movement The amount of knob movement (negative for left, positive for right)
 */
const knobMove = (target, movement) => ({
  type: constants[target.trim().toUpperCase()],
  knobAction: {
    type: constants.knob.MOVE,
    movement,
  },
});

/**
 * Create a knob reset action at <target>. Should be sent immediately after knob
 * movement so that the next knob movement is guaranteed to register.
 * @param {string} target The knob target that sent the event
 */
const knobReset = target => ({
  type: constants[target.trim().toUpperCase()],
  knobAction: {
    type: constants.knob.RESET_MOVEMENT,
  },
});

const setInterceptorWithVelocity = (target, interceptor) => ({
  type: constants[target.trim().toUpperCase()],
  knobAction: {
    type: constants.SET_INTERCEPTOR,
    intercepted: {
      ...interceptor,
      withVelocity: true,
    },
  },
});

const setInterceptor = (target, interceptor) => ({
  type: constants[target.trim().toUpperCase()],
  knobAction: {
    type: constants.SET_INTERCEPTOR,
    intercepted: interceptor,
  },
});

module.exports = {
  knobMove,
  knobReset,
};
