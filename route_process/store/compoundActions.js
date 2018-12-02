const logger = require('../../utils/logger');
const store = require('../store');
const { selectN, selectMultiplier } = require('./length/selectors');
const { selectNewTrackTimelineData } = require('./compoundSelectors');
const { incrementN, incrementMultiplier } = require('./length/actionCreators');
const { replaceTimeline } = require('./messages/actionCreators');

const changeLengthWithCopy = (index, { isN, newValue }) => {
  const state = store.getState();
  const n = selectN(state);
  const multiplier = selectMultiplier(state);
  let newTrackTimeline;
  if (isN) {
    const newN = newValue || n + 1;
    newTrackTimeline = selectNewTrackTimelineData(state, index, { newN });
    store.dispatch(incrementN());
  } else {
    const newMultiplier = newValue || multiplier + 1;
    newTrackTimeline = selectNewTrackTimelineData(state, index, { newMultiplier });
    store.dispatch(incrementMultiplier());
  }
  store.dispatch(replaceTimeline(newTrackTimeline));
};

const incrementNWithCopy = (index) => {
  changeLengthWithCopy(index, { isN: true });
};

const incrementMultiplierWithCopy = (index) => {
  changeLengthWithCopy(index, { isN: false });
};

const setNWithCopy = (index, newValue) => {
  changeLengthWithCopy(index, { isN: true, newValue });
};

const setMultiplierWithCopy = (index, newValue) => {
  changeLengthWithCopy(index, { isN: false, newValue });
};

module.exports = {
  incrementNWithCopy,
  incrementMultiplierWithCopy,
  setNWithCopy,
  setMultiplierWithCopy,
};
