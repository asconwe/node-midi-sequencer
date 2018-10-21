const constants = require('./constants');
const { selectCurrentIndex } = require('./selectors');
const store = require('../../store');

const getCurrentIndex = () => {
  const state = store.getState();
  return selectCurrentIndex(state);
};

const advanceTransportToNext = (noteLength) => {
  const currentIndex = getCurrentIndex();
  const calculatedLength = 256 * noteLength;
  const diff = calculatedLength - (currentIndex % calculatedLength);
  const newCurrentIndex = currentIndex + diff;
  return ({
    type: constants.UPDATE,
    currentIndex: newCurrentIndex,
  });
};

const retreatTransportToPrevious = (noteLength) => {
  const currentIndex = getCurrentIndex();
  const calculatedLength = 256 * noteLength;
  const diff = (currentIndex % calculatedLength);
  const newCurrentIndex = currentIndex - diff;
  return ({
    type: constants.UPDATE,
    currentIndex: newCurrentIndex,
  });
};

const tick = () => ({
  type: constants.UPDATE,
  payload: { tick: true },
});

const tickReset = () => ({
  type: constants.UPDATE,
  payload: { tick: false },
});

const advanceOne = () => {
  const currentIndex = getCurrentIndex();
  return ({
    type: constants.UPDATE,
    payload: {
      currentIndex: currentIndex + 1,
    },
  });
};

const update = payload => ({
  type: constants.UPDATE,
  payload,
});

const toggleTransport = () => ({
  type: constants.TOGGLE,
});

const tempoUp = () => ({
  type: constants.TEMPO_UP,
});

const tempoDown = () => ({
  type: constants.TEMPO_DOWN,
});

module.exports = {
  advanceOne,
  advanceTransportToNext,
  retreatTransportToPrevious,
  update,
  toggleTransport,
  tick,
  tickReset,
  tempoUp,
  tempoDown,
};
