const logger = require('../../../utils/logger');
const store = require('../../../store');
const observeStore = require('../../../store/observeStore');
const { selectControlButtonState } = require('../../../store/buttons/selectors');
const { selectCurrentItemAction } = require('../../../store/menus/selectors');
const handleButtonStateChange = require('./common/handleButtonStateChange');

const onPress = () => {
  // no-op for now
};

const onPressAndHold = () => {
  // no-op for now
};

const onPressAndHoldRelease = () => {
  // no-op for now
};

const onPressRelease = () => {
  const noOp = () => { };
  const state = store.getState();
  const action = selectCurrentItemAction(state) || noOp;
  action();
};

module.exports = () => observeStore(
  store,
  selectControlButtonState,
  (controlButtonState) => {
    handleButtonStateChange(
      controlButtonState,
      {
        onPress,
        onPressAndHold,
        onPressAndHoldRelease,
        onPressRelease,
      },
    );
  },
);
