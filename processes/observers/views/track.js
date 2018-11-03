const logger = require('../../../utils/logger');
const store = require('../../../store');
const { setInterceptor, clearInterceptor } = require('../../../store/knobs/actionCreators');
const { setMenuItems, setMenuTitle, updateMenuItem } = require('../../../store/menus/actionCreators');
const createBackAction = require('./restorePreviousMenu');
const { routeAction } = require('../../../store/routes/actionCreators');
const {
  arm,
  disarm,
  incrementMultiplier,
  incrementN,
  decrementMultiplier,
  decrementN,
  doubleRecordingQuantization,
  halveRecordingQuantization,
  clearTimeline,
} = require('../../../store/routes/route/actionCreators.js');
const { incrementNWithCopy, incrementMultiplierWithCopy } = require('../../../store/routes/route/long-actions/incrementWithCopy');

let holdInterval;

const stopHoldInterval = () => clearInterval(holdInterval);

const dispatchThunk = action => () => {
  store.dispatch(action);
};

const startHoldIntervalThunk = func => () => {
  stopHoldInterval();
  holdInterval = setInterval(func, 50);
};

const setLengthSubmenu = (index) => {
  const back = createBackAction();
  store.dispatch(setMenuItems([
    back,
    {
      name: 'set N',
      pressAndHoldAction: dispatchThunk(setInterceptor('control', {
        upAction: () => incrementNWithCopy(index),
        downAction: dispatchThunk(routeAction(index, decrementN())),
      })),
      pressAndHoldReleaseAction: dispatchThunk(clearInterceptor('control')),
    },
    {
      name: 'set multiplier',
      pressAndHoldAction: dispatchThunk(setInterceptor('control', {
        upAction: () => incrementMultiplierWithCopy(index),
        downAction: dispatchThunk(routeAction(index, decrementMultiplier())),
      })),
      pressAndHoldReleaseAction: dispatchThunk(clearInterceptor('control')),
    },
  ]));
  store.dispatch(setMenuTitle(`track ${index} > expand-timeline with loop (destructive)`));
};

const toggleArm = (index, armed) => ({
  name: armed ? 'disarm' : 'arm',
  pressReleaseAction: () => {
    store.dispatch(routeAction(index, armed ? disarm() : arm()));
    store.dispatch(updateMenuItem(toggleArm(index, !armed), 1));
  },
});

const setN = index => ({
  name: 'set N',
  pressReleaseAction: () => setLengthSubmenu(index),
  pressAndHoldAction: dispatchThunk(setInterceptor('control', {
    upAction: dispatchThunk(routeAction(index, incrementN())),
    downAction: dispatchThunk(routeAction(index, decrementN())),
  })),
  pressAndHoldReleaseAction: dispatchThunk(clearInterceptor('control')),
});

const setMultiplier = index => ({
  name: 'set multiplier',
  pressReleaseAction: () => setLengthSubmenu(index),
  pressAndHoldAction: dispatchThunk(setInterceptor('control', {
    upAction: dispatchThunk(routeAction(index, incrementMultiplier())),
    downAction: dispatchThunk(routeAction(index, decrementMultiplier())),
  })),
  pressAndHoldReleaseAction: dispatchThunk(clearInterceptor('control')),
});

const setRecordingQuantization = index => ({
  name: 'set recording quantization',
  pressAndHoldAction: dispatchThunk(setInterceptor('control', {
    upAction: dispatchThunk(routeAction(index, doubleRecordingQuantization())),
    downAction: dispatchThunk(routeAction(index, halveRecordingQuantization())),
  })),
  pressAndHoldReleaseAction: dispatchThunk(clearInterceptor('control')),
});

const clear = index => ({
  name: 'clear track',
  pressReleaseAction: dispatchThunk(routeAction(index, clearTimeline())),
});

module.exports = (track, index) => {
  const back = createBackAction();
  store.dispatch(setMenuItems([
    back,
    toggleArm(index, track.armed),
    setN(index),
    setMultiplier(index),
    setRecordingQuantization(index),
    clear(index),
  ]));
  store.dispatch(setMenuTitle(`track ${index}`));
};
