const MIDIMessage = require('midimessage');

const store = require('../store');
const { addMIDIListener } = require('../store/listeners/actionCreators');

module.exports = () => {
  createListeners();
  attachListeners();
}


const attachListeners = () => {
  const state = store.getState();
  const { listeners, ports } = state;
  ports.inputs.forEach((input) => {
    input.onmidimessage = (event) => {
      if (listeners[input.id] && listeners[input.id].length > 0) {
        const parsedEvent = MIDIMessage(event);
        callCombinedListeners(listeners[input.id], parsedEvent);
      }
    };
  });
}

const callCombinedListeners = (listeners, parsedEvent) => {
  listeners.forEach(listener => listener(parsedEvent))
}

const createListeners = () => {
  const state = store.getState();
  const { routes, ports } = state;
  routes.forEach(route => {
    const outputPort = ports.outputs.get(route.out.id);
    createListener(route, outputPort)
  });
}

const createListener = (route, outputPort) => {
  const listener = (parsedEvent) => {
    if (parsedEvent.channel === route.in.channel) {
      //Send to sequencer
      //Send to midi out
      sendMIDIOut(parsedEvent, route, outputPort)
    }
  }
  store.dispatch(addMIDIListener({ id: route.in.id, listener }))
}

const sendMIDIOut = (parsedEvent, route, outputPort) => {
  const channelDiff = route.out.channel - route.in.channel
  const messageTypeAndChannel = parsedEvent._event.data[0] + channelDiff;
  const outMessage = [messageTypeAndChannel, ...parsedEvent._event.data.slice(1)]
  outputPort.send(outMessage)
}