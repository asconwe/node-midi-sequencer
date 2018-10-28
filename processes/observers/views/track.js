const logger = require('../../../utils/logger');
const store = require('../../../store');
const { setInterceptor, clearInterceptor } = require('../../../store/knobs/actionCreators');
const { setMenuItems, setMenuTitle, updateMenuItem } = require('../../../store/menus/actionCreators');
const createBackAction = require('./restorePreviousMenu');
const { routeAction } = require('../../../store/routes/actionCreators');
const {
  arm, disarm, incrementMultiplier, incrementN, decrementMultiplier, decrementN,
} = require('../../../store/routes/route/actionCreators.js');

let holdInterval;

const stopHoldInterval = () => clearInterval(holdInterval);

const dispatchThunk = action => () => {
  store.dispatch(action);
};

const startHoldIntervalThunk = func => () => {
  stopHoldInterval();
  holdInterval = setInterval(func, 50);
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
  pressAndHoldAction: dispatchThunk(setInterceptor('control', {
    upAction: dispatchThunk(routeAction(index, incrementN())),
    downAction: dispatchThunk(routeAction(index, decrementN())),
  })),
  pressAndHoldReleaseAction: dispatchThunk(clearInterceptor('control')),
});

const setMultiplier = index => ({
  name: 'set multiplier',
  pressAndHoldAction: dispatchThunk(setInterceptor('control', {
    upAction: dispatchThunk(routeAction(index, incrementMultiplier())),
    downAction: dispatchThunk(routeAction(index, decrementMultiplier())),
  })),
  pressAndHoldReleaseAction: dispatchThunk(clearInterceptor('control')),
});

module.exports = (track, index) => {
  const back = createBackAction();
  store.dispatch(setMenuItems([back, toggleArm(index, track.armed, back), setN(index), setMultiplier(index)]));
  store.dispatch(setMenuTitle(`track ${index}`));
};
