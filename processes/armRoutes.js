const sendMIDIOut = require('../utils/sendMIDIOut');
const store = require('../store');
const { routeAction } = require('../store/routes/actionCreators');
const { addMessage } = require('../store/routes/route/actionCreators');
const { addMIDIListener } = require('../store/listeners/actionCreators');
const attachListeners = require('./attachListeners');

let pendingNotes = {};

const sendSequencer = (parsedEvent, index, state) => {
  const route = state.routes[index];
  const currentStep = state.transport.currentIndex % (Math.pow(2, route.n) * route.multiplier * 64);
  const q = route.quantization.recording;
  const quantizedStep = currentStep % q > q / 2
    ? currentStep + (q - (currentStep % q))
    : currentStep - (currentStep % q);

  if (route.armed && state.transport.playing) {
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
  } else if (parsedEvent.messageType === 'noteoff') {
    pendingNotes = {};
  }
};

const createListener = (route, outputPort, index) => {
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
  const { routes = [], ports } = state;
  routes.forEach((route, index) => {
    const outputPort = ports.outputs.get(route.out.id);
    createListener(route, outputPort, index);
  });
};

module.exports = () => {
  createListeners();
  attachListeners();
};
