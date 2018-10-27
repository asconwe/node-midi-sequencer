const constants = require('./constants');

const incrementMultiplier = () => ({
  trackAction: {
    type: constants.track.INCREMENT_MULTIPLIER,
  },
});

const incrementN = () => ({
  trackAction: {
    type: constants.track.INCREMENT_N,
  },
});

const decrementMultiplier = () => ({
  trackAction: {
    type: constants.DECREMENT_MULTIPLIER,
  },
});

const decrementN = () => ({
  trackAction: {
    type: constants.DECREMENT_N,
  },
});

const arm = () => ({
  trackAction: {
    type: constants.track.ARM,
  },
});

const disarm = () => ({
  trackAction: {
    type: constants.track.ARM,
  },
});

module.exports = {
  incrementMultiplier,
  incrementN,
  decrementMultiplier,
  decrementN,
  arm,
  disarm,
};
