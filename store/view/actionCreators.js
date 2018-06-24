const constants = require('./constants');

const renderView = view => ({
  type: constants.RENDER_VIEW,
  view,
});

module.exports = {
  renderView,
};
