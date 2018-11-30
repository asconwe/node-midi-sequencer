const logger = require('../../../utils/logger');
const store = require('../../../store');
const { setInterceptor, clearInterceptor } = require('../../../store/knobs/actionCreators');
const { setMenuItems, setMenuTitle, updateMenuItem } = require('../../../store/menus/actionCreators');
const createBackAction = require('./restorePreviousMenu');
const { routeAction } = require('../../../store/routes/actionCreators');
const routeProcessAction = require('../../../store/routes/route/routeProcessActionCreator');
const { toRouteProcess } = require('../../../route_process/messageCreators');
const { selectAllTracks } = require('../../../store/routes/selectors');
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
const { incrementNWithCopy, incrementMultiplierWithCopy } = require('../../../route_process/store/compoundActions');

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
  const state = store.getState();
  const route = selectAllTracks(state)[index];
  store.dispatch(setMenuItems([
    back,
    {
      name: 'set N',
      pressAndHoldAction: dispatchThunk(setInterceptor('control', {
        upAction: () => {
          route.process.send(toRouteProcess.doAction('incrementNWithCopy', index));
          store.dispatch(routeAction(index, incrementN()));
        },
        downAction: () => {
          store.dispatch(routeAction(index, decrementN()));
          routeProcessAction(index, decrementN());
        },
      })),
      pressAndHoldReleaseAction: dispatchThunk(clearInterceptor('control')),
    },
    {
      name: 'set multiplier',
      pressAndHoldAction: dispatchThunk(setInterceptor('control', {
        upAction: () => {
          route.process.send(toRouteProcess.doAction('incrementMultiplierWithCopy', index));
          store.dispatch(routeAction(index, incrementMultiplier()));
        },
        downAction: () => {
          store.dispatch(routeAction(index, decrementMultiplier()));
          routeProcessAction(index, decrementMultiplier());
        },
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
    upAction: () => {
      store.dispatch(routeAction(index, incrementN()));
      routeProcessAction(index, incrementN());
    },
    downAction: () => {
      store.dispatch(routeAction(index, decrementN()));
      routeProcessAction(index, decrementN());
    },
  })),
  pressAndHoldReleaseAction: dispatchThunk(clearInterceptor('control')),
});

const setMultiplier = index => ({
  name: 'set multiplier',
  pressReleaseAction: () => setLengthSubmenu(index),
  pressAndHoldAction: dispatchThunk(setInterceptor('control', {
    upAction: () => {
      store.dispatch(routeAction(index, incrementMultiplier()));
      routeProcessAction(index, incrementMultiplier());
    },
    downAction: () => {
      store.dispatch(routeAction(index, decrementMultiplier()));
      routeProcessAction(index, decrementMultiplier());
    },
  })),
  pressAndHoldReleaseAction: dispatchThunk(clearInterceptor('control')),
});

const setRecordingQuantization = index => ({
  name: 'set recording quantization',
  pressAndHoldAction: dispatchThunk(setInterceptor('control', {
    upAction: () => {
      store.dispatch(routeAction(index, doubleRecordingQuantization()));
      routeProcessAction(index, doubleRecordingQuantization());
    },
    downAction: () => {
      store.dispatch(routeAction(index, halveRecordingQuantization()));
      routeProcessAction(index, halveRecordingQuantization());
    },
  })),
  pressAndHoldReleaseAction: dispatchThunk(clearInterceptor('control')),
});

const clear = index => ({
  name: 'clear track',
  pressReleaseAction: () => routeProcessAction(index, clearTimeline()),
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
