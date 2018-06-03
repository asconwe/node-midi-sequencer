const store = require('./store');
const initMIDIAccess = require('./processes/init/MIDIAccess');
const initPorts = require('./processes/init/ports');
const initUserConfig = require('./processes/init/userConfig');
const armRoutes = require('./processes/armRoutes');

const main = async () => {
    try {
        await initMIDIAccess();
        initPorts()
        await initUserConfig();
        armRoutes();
    } catch (error) {
        console.log(error);
    }
}

main();