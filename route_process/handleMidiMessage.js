const logger = require('../utils/logger');
const store = require('./store');
const { selectRecordingQuantization } = require('./store/quantization/selectors');
const { selectPendingNote } = require('./store/pendingNotes/selectors');
const { selectLength } = require('./store/length/selectors');
const { addMessage } = require('./store/messages/actionCreators');
const { addPendingNote, clearPendingNote } = require('./store/pendingNotes/actionCreators');

const handleMidiMessage = (parsedEvent, position) => {
  const state = store.getState();
  const length = selectLength(state);
  const currentStep = position % length;
  const q = selectRecordingQuantization(state, 10);
  const quantizedStep = currentStep % q > q / 2
    ? currentStep + (q - (currentStep % q))
    : currentStep - (currentStep % q);

  if (parsedEvent.messageType === 'noteon') {
    store.dispatch(addPendingNote(parsedEvent.key, {
      step: quantizedStep,
      trueStep: currentStep,
      event: parsedEvent,
    }));
  } else if (parsedEvent.messageType === 'noteoff') {
    const previousNoteOn = selectPendingNote(state, parsedEvent.key);
    if (previousNoteOn) {
      store.dispatch(addMessage(previousNoteOn.event, previousNoteOn.step));
      const qDiff = previousNoteOn.step - previousNoteOn.trueStep;
      const offStep = parseInt(currentStep) + parseInt(qDiff);
      store.dispatch(addMessage(parsedEvent, offStep));
      store.dispatch(clearPendingNote(parsedEvent.key));
    }
  } else {
    store.dispatch(addMessage(parsedEvent, currentStep));
  }
};

module.exports = handleMidiMessage;
