const { createSelector } = require('reselect');

const selectControlKnob = state => state.userControl.controlKnob;
const selectControlButton = state => state.userControl.controlButton;
const selectTransportButton = state => state.userControl.transportButton;
const selectRecordButton = state => state.userControl.recordButton;

const selectControls = createSelector(
  selectControlKnob,
  selectControlButton,
  selectTransportButton,
  selectRecordButton,
  (controlKnob, controlButton, transportButton, recordButton) => ({
    controlKnob,
    controlButton,
    transportButton,
    recordButton,
  }),
);

module.exports = {
  selectControlKnob,
  selectControlButton,
  selectTransportButton,
  selectRecordButton,
  selectControls,
};
