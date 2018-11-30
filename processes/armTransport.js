const Nanotimer = require('nanotimer');
const { createSelector } = require('reselect');
const logger = require('../utils/logger');
const store = require('../store');
const observeStore = require('../utils/observeStore');
const { selectIsPlaying, selectDidTick, selectUsPerBaseStep } = require('../store/transport/selectors');
const { advanceOne, tick, tickReset } = require('../store/transport/actionCreators');

const timer = new Nanotimer();

const selectTickAndDeley = createSelector(
  selectDidTick,
  selectUsPerBaseStep,
  (didTick, delayInMicroseconds) => ({ didTick, delayInMicroseconds }),
);

module.exports = () => {
  let unsubscribe = () => { };
  observeStore(
    store,
    selectIsPlaying,
    (isPlaying) => {
      if (isPlaying) {
        unsubscribe = observeStore(
          store,
          selectTickAndDeley,
          async ({ didTick, delayInMicroseconds }) => {
            if (!didTick) {
              store.dispatch(advanceOne());
              store.dispatch(tick());
              return;
            }
            await new Promise(resolve => timer.setTimeout(
              () => resolve(store.dispatch(tickReset())),
              '',
              `${delayInMicroseconds}u`,
            ));
          },
        );
        return null;
      }
      return unsubscribe();
    },
  );
};
