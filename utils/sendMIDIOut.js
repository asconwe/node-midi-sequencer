const logger = require('./logger');

const sendMIDIOut = (parsedEvent, route) => {
  const channelDiff = route.out.channel - route.in.channel;
  const messageTypeAndChannel = parsedEvent._event.data[0] + channelDiff;
  const outMessage = [messageTypeAndChannel, parsedEvent._event.data[1], parsedEvent._event.data[2]];
  route.outputPort.send(outMessage);
};

module.exports = sendMIDIOut;
