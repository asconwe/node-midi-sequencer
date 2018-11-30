const render = require('./utils/render');

const menuList = require('./views/dynamic/menu-list');

render(menuList([
  { text: 'hey', isActive: false },
  { text: 'heeeey', isActive: true },
]));

setTimeout(() => render(menuList([
  { text: 'hey', isActive: true },
  { text: 'heeeey', isActive: false },
])), 1000);

setTimeout(() => { }, 4000);

/**
 * index.js is user config + transport timer
 * each route forks a route process
 * timer sends each route ticks and midi messages
 * each route sends back midi messages
 */
