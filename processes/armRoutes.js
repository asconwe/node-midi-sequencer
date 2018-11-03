const sendMIDIOut = require('../utils/sendMIDIOut');
const store = require('../store');
const { routeAction } = require('../store/routes/actionCreators');
const { addMessage } = require('../store/routes/route/actionCreators');
const { addMIDIListener } = require('../store/listeners/actionCreators');
const attachListeners = require('./attachListeners');

let pendingNotes = {};

const sendSequencer = (parsedEvent, index, state) => {
  const route = state.routes[index];
  if (route.armed && state.transport.playing) {
    const currentStep = state.transport.currentIndex % (Math.pow(2, route.n) * route.multiplier * 64);
    const q = route.quantization.recording;
    const quantizedStep = currentStep % q > q / 2
      ? currentStep + (q - (currentStep % q))
      : currentStep - (currentStep % q);

    if (parsedEvent.messageType === 'noteon') {
      pendingNotes[`${index}-${parsedEvent.channel}-${parsedEvent.key}`] = {
        step: quantizedStep,
        trueStep: currentStep,
        event: parsedEvent,
      };
    } else if (parsedEvent.messageType === 'noteoff') {
      const previousNoteOn = pendingNotes[`${index}-${parsedEvent.channel}-${parsedEvent.key}`];
      if (previousNoteOn) {
        store.dispatch(routeAction(index, addMessage(previousNoteOn.event, previousNoteOn.step)));
        const offStep = quantizedStep <= previousNoteOn.step
          ? quantizedStep + q
          : quantizedStep;
        store.dispatch(routeAction(index, addMessage(parsedEvent, offStep)));
        pendingNotes[`${index}-${parsedEvent.channel}-${parsedEvent.key}`] = null;
      }
    } else {
      store.dispatch(routeAction(index, addMessage(parsedEvent, currentStep)));
    }
  } else if (!state.transport.playing && parsedEvent.messageType === 'noteoff') {
    pendingNotes = {};
  } else if (parsedEvent.messageType === 'noteoff') {
    pendingNotes[`${index}-${parsedEvent.channel}-${parsedEvent.key}`] = null;
  }
};

const createListener = (route, index) => {
  const listener = (parsedEvent) => {
    const state = store.getState();
    if (parsedEvent.channel === route.in.channel) {
      sendSequencer(parsedEvent, index, state);
      sendMIDIOut(parsedEvent, route);
    }
  };
  store.dispatch(addMIDIListener({ id: route.in.id, listener, type: 'route' }));
};

const createListeners = () => {
  const state = store.getState();
  const { routes = [] } = state;
  routes.forEach((route, index) => {
    createListener(route, index);
  });
};

module.exports = () => {
  createListeners();
  attachListeners();
};
