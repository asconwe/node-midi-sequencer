const logger = require('../utils/logger');
const store = require('../store');
const observeStore = require('../store/observeStore');
const { selectIsPlaying, msPerBaseStep } = require('../store/transport/selectors');
const { advanceOneTick } = require('../store/transport/actionCreators');

const promiseTimeout = delay => new Promise((resolve, reject) => {
  if (selectIsPlaying(store.getState())) {
    return setTimeout(() => resolve(), delay);
  }
  return reject('Playback stopped.');
});

const setTimeout4Times = async (callback, delay) => {
  try {
    callback();
    await promiseTimeout(delay);
    callback();
    await promiseTimeout(delay);
    callback();
    await promiseTimeout(delay);
    callback();
    await promiseTimeout(delay);
    return true;
  } catch (error) {
    logger.info('playback is stopped');
    return false;
  }
};

const repeat = async (callback) => {
  if (selectIsPlaying(store.getState())) {
    await callback();
    repeat(callback);
  }
};

const handleChange = (isPlaying) => {
  logger.info(`Transport: ${isPlaying}`);
  if (isPlaying) {
    const duration = msPerBaseStep(state);
    const fourSteps = async () => setTimeout4Times(advanceOneTick, duration);
    const sixteenSteps = async () => setTimeout4Times(fourSteps, duration * 4);
    const sixtyFourSteps = async () => setTimeout4Times(sixteenSteps, duration * 16);
    const twoHundredFiftySixSteps = async () => setTimeout4Times(sixtyFourSteps, duration * 64);

    try {
      setTimeout(() => {
        repeat(twoHundredFiftySixSteps);
      }, msPerBaseStep);
    } catch (error) {
      logger.info('playback stopped');
    }
  }
};

module.exports = () => {
  observeStore(
    store,
    selectIsPlaying,
    handleChange,
  );
};
