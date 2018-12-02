const logger = require('../../../utils/logger');
const store = require('../../../store');
const observeStore = require('../../../utils/observeStore');
const { selectTransportButtonState } = require('../../../store/buttons/selectors');
const { toggleTransport } = require('../../../store/transport/actionCreators');
const panic = require('../../../utils/panic');
const handleButtonStateChange = require('./common/handleButtonStateChange');
const { selectAllTracks } = require('../../../store/routes/selectors');

const onPress = () => {
  const state = store.getState();
  const routes = selectAllTracks(state);
  routes.forEach(route => panic(route));
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
