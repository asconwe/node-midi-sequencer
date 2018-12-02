const handlePanic = (route) => {
  for (let i = 0; i < 127; i++) {
    const outMessage = [
      route.out.channel + 128, // message type and channel
      i, // key
      0, // velocity
    ];
    route.outputPort.send(outMessage);
  }
};

module.exports = handlePanic;
