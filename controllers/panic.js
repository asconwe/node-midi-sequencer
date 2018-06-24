const { close } = require('web-midi-api')

const stopOutputs = (outputs) => {
    logger.info('! Panic!');
    outputs.forEach(function (port) {
        port.send([0x80, 60, 0]);
    });
}

const stopInputs = (navigator) => {
    logger.info('! Close all inputs!');
    close(); // This will close MIDI inputs, otherwise Node.js will wait for MIDI input forever.
}

module.exports = {
    stopOutputs,
    stopInputs,
}