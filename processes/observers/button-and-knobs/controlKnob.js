const { throttle } = require('lodash');
const store = require('../../../store');
const observeStore = require('../../../store/observeStore');
const { selectControlKnobState } = require('../../../store/knobs/selectors');
const { nextIndex, previousIndex } = require('../../../store/menus/actionCreators');
const { renderDerivedMenu } = require('../../../store/view/actionCreators');

const next = throttle(() => {
  store.dispatch(nextIndex());
  store.dispatch(renderDerivedMenu());
}, 200, { trailing: false });

const previous = throttle(() => {
  store.dispatch(previousIndex());
  store.dispatch(renderDerivedMenu());
}, 200, { trailing: false });

// If adding more buttons, make this function generic
// like handleButtonStateChange.js
const handleKnobStateChange = (knobState) => {
  if (knobState.movement) {
    if (knobState.movement > 0) {
      return next();
    }
    if (knobState.movement < 0) {
      return previous();
    }
  }
};

module.exports = () => observeStore(
  store,
  selectControlKnobState,
  handleKnobStateChange,
);
