const stopOutputs = () => {
    outputs.forEach(function (port) {
        port.send([0x80, 60, 0]);
    });
}

const stopInputs = () => {
    console.log('Thank you!');
    navigator.close(); // This will close MIDI inputs, otherwise Node.js will wait for MIDI input forever.
}

const panic = stopOutputs;

modules.exports = {
    stopOutputs,
    stopInputs,
    panic
}