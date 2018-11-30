const { createSelector } = require('reselect');
const { selectBaseStepsPerBeat } = require('../../../store/transport/selectors');

const selectN = state => state.length.n;
const selectMultiplier = state => state.length.multiplier;

const selectLength = createSelector(
  [selectBaseStepsPerBeat, selectN, selectMultiplier],
  (baseStepsPerBeat, n, multiplier) => baseStepsPerBeat * (2 ** n) * multiplier,
);

module.exports = {
  selectN,
  selectMultiplier,
  selectLength,
};
