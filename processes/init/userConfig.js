const inquirer = require('inquirer');

const store = require('../../store');
const { replaceAllRoutes } = require('../../store/routes/actionCreators');

let channels = [];
for (let i = 0; i < 16; i++) {
  channels.push({
    name: (i + 1).toString(),
    value: i
  })
}

const promptUserConfig = async () => {
  const { inputs, outputs } = store.getState().ports;
  // Get routes from an inquirer prompt
  const getPortsAndChannels = (setOfRoutes) => {
    return inquirer
      .prompt([
        {
          name: 'output',
          message: 'out-Port',
          type: 'list',
          choices: Array.from(outputs).map(([id, port]) => ({
            name: port.name,
            value: port,
          }))
        },
        {
          name: 'outChannel',
          message: 'out-Channel',
          type: 'list',
          choices: channels
        },
        {
          name: 'input',
          message: 'In-Port',
          type: 'list',
          choices: Array.from(inputs).map(([id, port]) => ({
            name: port.name,
            value: port,
          }))
        },
        {
          name: 'inChannel',
          message: 'In-Channel',
          type: 'list',
          choices: channels,
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
            name: input.name,
            channel: inChannel
          },
          out: {
            id: output.id,
            name: output.name,
            channel: outChannel
          }
        }
        if (another) return getPortsAndChannels(setOfRoutes.concat(route));
        return setOfRoutes.concat(route);
      })
  }

  const routes = await getPortsAndChannels([]);
  store.dispatch(replaceAllRoutes(routes));
}

module.exports = (ports) => {
  switch (process.env.UI) {
    case 'test':
      throw new Error('test env not set up');
      break;
    case 'cli':
      return promptUserConfig(ports)
      break;
    case 'hardware':
      throw new Error('hardware UI not available');
      break;
    case 'electron':
      throw new Error('electron UI not available');
      break;
    default:
      return promptUserConfig(ports)
      break;
  }
}