const noOp = () => { };

/**
 * Direct appropriate button actions based on button state. All methods default to noOp.
 * @param {{ down: boolean, held: boolean }} buttonState
 * @param {{ onPress: function, onPressAndHold: function, onPressAndHoldRelease: function, onPressRelease: function }} buttonMethods
 */
const handleButtonStateChange = ({ down, held }, {
  onPress = noOp,
  onPressAndHold = noOp,
  onPressAndHoldRelease = noOp,
  onPressRelease = noOp,
}) => {
  const up = !down;
  if (down && held) {
    // do thing for press and hold
    onPressAndHold();
    return;
  }
  if (up && held) {
    // do thing for press and hold release
    onPressAndHoldRelease();
    return;
  }
  if (down) {
    // do thing for press
    onPress();
    return;
  }
  // do thing for tap
  onPressRelease();
};

module.exports = handleButtonStateChange;
