const render = require('./utils/render');

const menuList = require('./views/menu-list');

render(menuList([
  { text: 'hey', isActive: false },
  { text: 'heeeey', isActive: true },
]));

setTimeout(() => render(menuList([
  { text: 'hey', isActive: true },
  { text: 'heeeey', isActive: false },
])), 1000);

setTimeout(() => { }, 4000);
