const logger = require('../../../../utils/logger');
const store = require('../../..');
const { selectNewTrackTimelineData, selectTrack } = require('../selectors');
const { routeAction } = require('../../actionCreators');
const { replaceTimeline, incrementN, incrementMultiplier } = require('../actionCreators');

const incrementWithCopy = (index, { isN }) => {
  const state = store.getState();
  const { n, multiplier } = selectTrack(state, index);
  let newTrackTimeline;
  if (isN) {
    const newN = n + 1;
    newTrackTimeline = selectNewTrackTimelineData(state, index, { newN });
    store.dispatch(routeAction(index, incrementN()));
  } else {
    const newMultiplier = multiplier + 1;
    newTrackTimeline = selectNewTrackTimelineData(state, index, { newMultiplier });
    store.dispatch(routeAction(index, incrementMultiplier()));
  }
  store.dispatch(routeAction(index, replaceTimeline(newTrackTimeline)));
};

const incrementNWithCopy = (index) => {
  incrementWithCopy(index, { isN: true });
};

const incrementMultiplierWithCopy = (index) => {
  incrementWithCopy(index, { isN: false });
};

module.exports = {
  incrementNWithCopy,
  incrementMultiplierWithCopy,
};
