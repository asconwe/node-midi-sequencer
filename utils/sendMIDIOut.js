const logger = require('./logger');

const sendMIDIOut = (parsedEvent, route) => {
  logger.info(`Sending message ${parsedEvent.messageType} ${parsedEvent.channel} ${parsedEvent.key}`);
  const channelDiff = route.out.channel - route.in.channel;
  const messageTypeAndChannel = parsedEvent._event.data[0] + channelDiff;
  const outMessage = [messageTypeAndChannel, ...parsedEvent._event.data.slice(1)];
  route.outputPort.send(outMessage);
};

module.exports = sendMIDIOut;
