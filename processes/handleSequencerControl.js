const _ = require('lodash');
const logger = require('../utils/logger');
const store = require('../store');
const { nextIndex, previousIndex } = require('../store/menus/actionCreators');
const { renderDerivedMenu } = require('../store/view/actionCreators');
const { selectCurrentItemAction } = require('../store/menus/selectors');

let controlButtonTimeout;

const pressAndHoldDuration = 800;

const next = _.throttle(() => {
  store.dispatch(nextIndex());
  store.dispatch(renderDerivedMenu());
}, 200, { trailing: false });

const previous = _.throttle(() => {
  store.dispatch(previousIndex());
  store.dispatch(renderDerivedMenu());
}, 200, { trailing: false });

module.exports = {
  handleKnobControl: knob => (event) => {
    if (event.channel === knob.channel && event.controllerNumber === knob.controllerNumber) {
      if (event.controllerValue > 64) {
        next();
        return logger.info('knob right');
      }
      previous();
      return logger.info('knob left');
    }
    return null;
  },

  handleButtonControl: button => (event) => {
    if (event.channel === button.channel && event.controllerNumber === button.controllerNumber) {
      if (event.controllerValue === 127) {
        clearTimeout(controlButtonTimeout);
        return controlButtonTimeout = setTimeout(() => {
          clearTimeout(controlButtonTimeout);
          logger.info('press and hold');
        }, pressAndHoldDuration);
      }
      if (controlButtonTimeout && !controlButtonTimeout._called) {
        clearTimeout(controlButtonTimeout);
        const currentAction = selectCurrentItemAction(store.getState());
        currentAction();
        return logger.info('tap');
      }
    }
  },
};
