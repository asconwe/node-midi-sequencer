const { getUserConfig, armMidi, armSequencer } = require('./initialize/initSequencer');

module.exports = {

    handleMidiFaluire(msg) {
        console.log('Failed to access MIDI - ' + msg);
        restart();
    },
    
    
    handleMidiSucces({ inputs, outputs }) {
        
        const handleConfigFailure = (msg) => {
            console.log('Failed to start sequencer - ' + msg);
            restart();
        },

        const midiIsAvailable = inputs.ports.length > 0  && inputs.ports.length > 0;

        if (midiIsAvailable) {
            return getUserConfig(inputs, outputs)
                .then((userConfig) => {
                    try {
                        armMidi(userConfig);
                        return armSequencer(midiRoutes);
                    } catch (err) {
                        return handleConfigFailure(err.msg);
                    }
                })
                .catch((err) => {
                    return handleConfigFailure(err.msg);
                });
        }
        return handleConfigFailure('midi ports not available');
    }
}