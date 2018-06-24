const constants = require('./constants');

const update = (payload) => ({
  type: constants.UPDATE,
  payload,
})

module.exports = {
  update,
}