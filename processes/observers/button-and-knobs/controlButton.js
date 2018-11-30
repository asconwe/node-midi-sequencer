const store = require('../../../store');
const observeStore = require('../../../utils/observeStore');
const { selectControlButtonState } = require('../../../store/buttons/selectors');
const handleButtonStateChange = require('./common/handleButtonStateChange');
const {
  selectCurrentPressReleaseAction,
  selectCurrentPressAction,
  selectCurrentPressAndHoldAction,
  selectCurrentPressAndHoldReleaseAction,
} = require('../../../store/menus/selectors');


const noOp = () => { };

const onPress = state => () => {
  const action = selectCurrentPressAction(state) || noOp;
  action();
};

const onPressAndHold = state => () => {
  const action = selectCurrentPressAndHoldAction(state) || noOp;
  action();
};

const onPressAndHoldRelease = state => () => {
  const action = selectCurrentPressAndHoldReleaseAction(state) || noOp;
  action();
};

const onPressRelease = state => () => {
  const action = selectCurrentPressReleaseAction(state) || noOp;
  action();
};

module.exports = () => observeStore(
  store,
  selectControlButtonState,
  (controlButtonState) => {
    const state = store.getState();
    handleButtonStateChange(
      controlButtonState,
      {
        onPress: onPress(state),
        onPressAndHold: onPressAndHold(state),
        onPressAndHoldRelease: onPressAndHoldRelease(state),
        onPressRelease: onPressRelease(state),
      },
    );
  },
);
