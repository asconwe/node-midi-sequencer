const MIDIMessage = require('midimessage');
const logger = require('../../utils/logger');
const render = require('../../utils/render');
const {
  SET_CONTROL_KNOB_VIEW,
  SET_CONTROL_BUTTON_VIEW,
  SET_TRANSPORT_BUTTON_VIEW,
  SET_RECORD_BUTTON_VIEW,
} = require('../../views/constant/setControls');

const { handleKnobEvent, handleButtonEvent } = require('../handleSequencerControl');
const attachListeners = require('../attachListeners');

const store = require('../../store');
const observeStore = require('../../utils/observeStore');
const { renderView } = require('../../store/view/actionCreators');
const { allInputs } = require('../../store/ports/selectors');
const { selectControls } = require('../../store/userControl/selectors');
const { update } = require('../../store/userControl/actionCreators');

module.exports = () => new Promise(((resolve) => {
  const setKnob = (inputs) => {
    store.dispatch(renderView(SET_CONTROL_KNOB_VIEW));
    inputs.forEach((port) => {
      port.onmidimessage = (event) => {
        const parsedEvent = MIDIMessage(event);
        const controlKnob = {
          channel: parsedEvent.channel,
          controllerNumber: parsedEvent.controllerNumber,
          id: parsedEvent._event.currentTarget.id,
        };
        store.dispatch(update({ controlKnob }));
      };
    });
  };

  const setControlButton = (inputs, knob) => {
    store.dispatch(renderView((SET_CONTROL_BUTTON_VIEW)));
    inputs.forEach((port) => {
      port.onmidimessage = (event) => {
        const parsedEvent = MIDIMessage(event);
        if (
          parsedEvent.channel !== knob.channel
          || parsedEvent.controllerNumber !== knob.controllerNumber
        ) {
          const controlButton = {
            channel: parsedEvent.channel,
            controllerNumber: parsedEvent.controllerNumber,
            id: parsedEvent._event.currentTarget.id,
          };
          store.dispatch(update({ controlButton }));
        }
      };
    });
  };

  const setTransportButton = (inputs, controlKnob, controlButton) => {
    store.dispatch(renderView((SET_TRANSPORT_BUTTON_VIEW)));
    inputs.forEach((port) => {
      port.onmidimessage = (event) => {
        const parsedEvent = MIDIMessage(event);
        if (
          (parsedEvent.channel !== controlKnob.channel || parsedEvent.controllerNumber !== controlKnob.controllerNumber)
          && (parsedEvent.channel !== controlButton.channel || parsedEvent.controllerNumber !== controlButton.controllerNumber)
        ) {
          const transportButton = {
            channel: parsedEvent.channel,
            controllerNumber: parsedEvent.controllerNumber,
            id: parsedEvent._event.currentTarget.id,
          };
          store.dispatch(update({ transportButton }));
        }
      };
    });
  };

  const clearMIDIListeners = (inputs) => {
    inputs.forEach((port) => {
      port.onmidimessage = () => null;
    });
  };

  const unsubscribe = observeStore(
    store,
    selectControls,
    (selectedState) => {
      try {
        const {
          controlKnob,
          controlButton,
          transportButton,
          recordButton,
        } = selectedState;
        const inputs = allInputs(store.getState());
        if (!controlKnob) {
          return setKnob(inputs);
        } if (!controlButton) {
          return setControlButton(inputs, controlKnob);
        } if (!transportButton) {
          return setTransportButton(inputs, controlKnob, controlButton);
        }
        clearMIDIListeners(inputs);
        store.dispatch(addMIDIListener({ id: controlKnob.id, listener: handleKnobEvent('control')(controlKnob), type: 'control-knob' }));
        store.dispatch(addMIDIListener({ id: controlButton.id, listener: handleButtonEvent('control')(controlButton), type: 'control-button' }));
        store.dispatch(addMIDIListener({ id: transportButton.id, listener: handleButtonEvent('transport')(transportButton), type: 'transport-button' }));
        attachListeners();
        unsubscribe();
        return resolve();
      } catch (error) {
        logger.info(error);
        throw error;
      }
    },
  );
}));
