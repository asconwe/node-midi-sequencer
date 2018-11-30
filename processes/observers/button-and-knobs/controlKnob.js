const logger = require('../../../utils/logger');
const { throttle } = require('lodash');
const store = require('../../../store');
const observeStore = require('../../../utils/observeStore');
const { selectControlKnobState } = require('../../../store/knobs/selectors');
const { nextIndex, previousIndex } = require('../../../store/menus/actionCreators');
const { renderDerivedMenu } = require('../../../store/view/actionCreators');

const next = throttle(() => {
  const state = store.getState();
  store.dispatch(nextIndex());
  if (!state.initialized) {
    store.dispatch(renderDerivedMenu());
  }
}, 200, { trailing: false });

const previous = throttle(() => {
  const state = store.getState();
  store.dispatch(previousIndex());
  if (!state.initialized) {
    store.dispatch(renderDerivedMenu());
  }
}, 200, { trailing: false });

// If adding more buttons, make this function generic
// like handleButtonStateChange.js
const handleKnobStateChange = (knobState) => {
  if (knobState.movement) {
    if (knobState.movement > 0) {
      if (knobState.intercepted) {
        if (knobState.intercepted.withVelocity && knobState.movement > 3) {
          for (let i = 0; i < movement; i++) knobState.intercepted.upAction();
          return;
        }
        return knobState.intercepted.upAction();
      }
      return next();
    }
    if (knobState.movement < 0) {
      if (knobState.intercepted) {
        if (knobState.intercepted.withVelocity && knobState.movement > 3) {
          for (let i = 0; i > movement; i--) knobState.intercepted.downAction();
          return;
        }
        return knobState.intercepted.downAction();
      }
      return previous();
    }
  }
};

module.exports = () => observeStore(
  store,
  selectControlKnobState,
  handleKnobStateChange,
);
