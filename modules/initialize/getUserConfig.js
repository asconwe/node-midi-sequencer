const inquirer = require('inquirer');

const getUserConfig = ({ inputs, outputs }) => {
    // Get routes from an inquirer prompt
    const getPortsAndChannels = (setOfRoutes) => {
        return inquirer
            .prompt([
                {
                    name: 'output',
                    message: 'out-Port',
                    type: 'list',
                    choices: outputs.map(port => ({
                        name: port[1].name,
                        value: {
                            id: port[1].id,
                            name: port[1].name
                        }
                    }))
                },
                {
                    name: 'outChannel',
                    message: 'out-Channel',
                    type: 'list',
                    choices: ['all', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
                },
                {
                    name: 'input',
                    message: 'In-Port',
                    type: 'list',
                    choices: inputs.map(port => ({
                        name: port[1].name,
                        value: {
                            id: port[1].id,
                            name: port[1].name
                        }
                    }))
                },
                {
                    name: 'inChannel',
                    message: 'In-Channel',
                    type: 'list',
                    choices: ['all', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
                },
                {
                    name: 'another',
                    message: 'Set up another route?',
                    type: 'confirm'
                }
            ])
            .then(({ input, inChannel, output, outChannel, another }) => {
                const route = {
                    in: {
                        id: input.id,
                        portName: input.name,
                        channel: inChannel
                    },
                    out: {
                        id: output.id,
                        portName: output.name,
                        channel: outChannel
                    }
                }
                if (another) return getPortsAndChannels(setOfRoutes.concat(route));
                const MIDI = {
                    inputs,
                    outputs,
                    routes: setOfRoutes.concat(route)
                }
                return MIDI;
            })
    }

    return getPortsAndChannels([]);
}

module.exports = (ports) => {
    switch (process.env.UI) {
        case 'test':
            throw new Error('test env not set up');
            break;    
        case 'cli':
            return getUserConfig(ports)
            break;
        case 'hardware':
            throw new Error('hardware UI not available');
            break;
        case 'electron':
            throw new Error('electron UI not available');
            break;
        default:
            return getUserConfig(ports)
            break;
    }
}