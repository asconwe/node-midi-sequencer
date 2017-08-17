const { test, config, startMidi, initLooper } = require('./initialize/initSequencer);

module.exports = {
    /* If request for midi access fails:
    ** log error messaage
    */
    handleMidiFaluire(msg) {
        console.log('Failed to get MIDI access - ' + msg);
        process.exit(1);
    },
    
    handleMidiSucces({ inputs, outputs }) {
        test.inputs(inputs)
        .then(() => test.outputs(outputs))
        .then(() => config.inputs(inputs))
        .then(() => config.outputs(outputs))
        .then(startMidi)
        .then(initLooper)
        .then(monitorInput)
        .catch((err) => {
            return console.error('failed to start sequencer::', err)
        })
    }
}