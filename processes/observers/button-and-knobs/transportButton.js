const logger = require('../../../utils/logger');
const store = require('../../../store');
const observeStore = require('../../../store/observeStore');
const { selectTransportButtonState } = require('../../../store/buttons/selectors');
const { toggleTransport } = require('../../../store/transport/actionCreators');
const handleButtonStateChange = require('./common/handleButtonStateChange');

const onPress = () => {
  // no-op for now
  store.dispatch(toggleTransport());
};

const onPressAndHold = () => {
  // no-op for now
};

const onPressAndHoldRelease = () => {
  // no-op for now
};

const onPressRelease = () => {
  // no-op for now
};

module.exports = () => observeStore(
  store,
  selectTransportButtonState,
  (transportButtonState) => {
    handleButtonStateChange(
      transportButtonState,
      {
        onPress,
        onPressAndHold,
        onPressAndHoldRelease,
        onPressRelease,
      },
    );
  },
);
