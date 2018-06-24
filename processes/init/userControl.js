const MIDIMessage = require('midimessage');
const logger = require('../../utils/logger');
const render = require('../../utils/render');
const knob = require('../../views/knob');
const button = require('../../views/button');

const { handleKnobControl, handleButtonControl } = require('../handleSequencerControl');
const attachListeners = require('../attachListeners');

const store = require('../../store');
const observeStore = require('../../store/observeStore');
const { renderView } = require('../../store/view/actionCreators');
const { allInputs } = require('../../store/ports/selectors');
const { selectControls } = require('../../store/userControl/selectors');
const { update } = require('../../store/userControl/actionCreators');

module.exports = () => new Promise(((resolve) => {
  const setKnob = (inputs) => {
    store.dispatch(renderView((knob())));
    inputs.forEach((port) => {
      port.onmidimessage = (event) => {
        const parsedEvent = MIDIMessage(event);
        const control = {
          channel: parsedEvent.channel,
          controllerNumber: parsedEvent.controllerNumber,
          id: parsedEvent._event.currentTarget.id,
        };
        logger.info('knob set');
        store.dispatch(update({ knob: control }));
      };
    });
  };

  const setButton = (inputs, knob) => {
    store.dispatch(renderView((button())));
    inputs.forEach((port) => {
      port.onmidimessage = (event) => {
        const parsedEvent = MIDIMessage(event);
        if (
          parsedEvent.channel !== knob.channel
          || parsedEvent.controllerNumber !== knob.controllerNumber
        ) {
          const control = {
            channel: parsedEvent.channel,
            controllerNumber: parsedEvent.controllerNumber,
            id: parsedEvent._event.currentTarget.id,
          };
          logger.info('button set');
          store.dispatch(update({ button: control }));
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
    (state) => {
      try {
        const { knob, button } = state;
        const inputs = allInputs(store.getState());
        if (!knob) {
          return setKnob(inputs);
        } if (!button) {
          return setButton(inputs, knob);
        }
        clearMIDIListeners(inputs);
        store.dispatch(addMIDIListener({ id: knob.id, listener: handleKnobControl(knob) }));
        store.dispatch(addMIDIListener({ id: button.id, listener: handleButtonControl(button) }));
        attachListeners();
        unsubscribe();
        return resolve();
      } catch (error) {
        logger.info(error);
      }
    },
  );
}));
