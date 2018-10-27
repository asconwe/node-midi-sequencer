const logger = require('../../../utils/logger');
const store = require('../../../store');
const { setMenuItems, setMenuTitle } = require('../../../store/menus/actionCreators');
const createBackAction = require('./restorePreviousMenu');
const { tempoUp, tempoDown } = require('../../../store/transport/actionCreators');

let holdInterval;

const stopHoldInterval = () => clearInterval(holdInterval);

const startHoldIntervalThunk = func => () => {
  logger.info('================ START HOLD INTERVAL');
  stopHoldInterval();
  holdInterval = setInterval(func, 50);
};

const dispatchTempoUp = () => store.dispatch(tempoUp());
const dispatchTempoDown = () => store.dispatch(tempoDown());

const up = {
  name: 'up',
  pressReleaseAction: dispatchTempoUp,
  pressAndHoldAction: startHoldIntervalThunk(dispatchTempoUp),
  pressAndHoldReleaseAction: stopHoldInterval,
};

const down = {
  name: 'down',
  pressReleaseAction: dispatchTempoDown,
  pressAndHoldAction: startHoldIntervalThunk(dispatchTempoDown),
  pressAndHoldReleaseAction: stopHoldInterval,
};

module.exports = () => {
  const back = createBackAction();
  store.dispatch(setMenuItems([back, down, up]));
  store.dispatch(setMenuTitle('set tempo'));
};
