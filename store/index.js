const { combineReducers, createStore } = require('redux');

const ports = require('./ports/reducer');
const routes = require('./routes/reducer');
const MIDIAccess = require('./MIDI-access/reducer');
const listeners = require('./listeners/reducer');
const transport = require('./transport/reducer');
const userControl = require('./userControl/reducer');
const menus = require('./menus/reducer');
const view = require('./view/reducer');
const buttons = require('./buttons/reducer');
const knobs = require('./knobs/reducer');

const initialized = (state = false, action) => (action.type === 'INITIALIZED' ? true : state);

const rootReducer = combineReducers({
  initialized,
  routes,
  ports,
  MIDIAccess,
  listeners,
  transport,
  userControl,
  view,
  menus,
  buttons,
  knobs,
});

const store = createStore(rootReducer);

module.exports = store;
