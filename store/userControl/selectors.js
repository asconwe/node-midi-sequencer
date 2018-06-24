const { createSelector } = require('reselect');

const selectControlKnob = state => state.userControl.knob;

const selectControlButton = state => state.userControl.button;

const selectControls = createSelector(
  selectControlButton,
  selectControlKnob,
  (button, knob) => ({ knob, button })
)

module.exports = {
  selectControlButton,
  selectControlKnob,
  selectControls,
}