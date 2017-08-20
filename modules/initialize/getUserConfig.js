const inquirer = require('inquirer');

const configureMidiRoutes = (inPorts, outPorts) => {
    // Get routes from an inquirer prompt
    const routes = [{
        input: {
            id: 0,
            channel: [1]
        },
        output: {
            id: 0,
            channel: [1]
        }
    }];
    return routes;
}

module.exports = (inPorts, outPorts) => {
    switch (process.env.UI) {
        case 'cli':
            return configureMidiRoutes(inPorts, outPorts)
            break;
        case 'hardware':
            throw { message: 'hardware UI not available' };
            break;
        case 'electron':
            throw { message: 'electron UI not available' };
            break;
        default:
            return configureMidiRoutes(inPorts, outPorts)
            break;
    }
}