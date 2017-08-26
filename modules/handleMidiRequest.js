module.exports = {

    handleMIDIFaluire(err) {
        console.error(err);
        process.exit(1);
        // restart();
    },


    handleMIDISuccess: {
        getMIDIPorts({ inputs, outputs }) {
            console.log('MIDI Success');

            const handleConfigFailure = (msg) => {
                throw new Error('Failed to start sequencer - ' + msg);
            }

            const inputsAvailable = inputs.size > 0;
            const outputsAvailable = outputs.size > 0;

            if (!inputsAvailable && !outputsAvailable) return handleConfigFailure('No MIDI ports available');
            if (!inputsAvailable) return handleConfigFailure('No MIDI inputs available');
            if (!outputsAvailable) return handleConfigFailure('No MIDI inputs available');

            console.log('MIDI is available')
            return { inputs: Array.from(inputs), outputs: Array.from(outputs) };
        }
    }
}