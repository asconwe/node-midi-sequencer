const constants = require('./constants');

/** @description Create a REPLACE_ALL action to be dispatched
 * @param {[route]} routes All MIDI routes
 * @returns {{ type: string, routes: [{ in: *, out: * }] }} A redux action
 */
const replaceAllRoutes = (routes) => ({
  type: constants.REPLACE_ALL,
  routes,
});

/** @description Create a REPLACE_ONE action to be dispatched
 * @param {{in: *, out: *}} route A midi route object
 * @param {number} index The index of the route to be replaced
 * @returns {{ type: string, route: { in: *, out: * }, index: number }} A redux action
 */
const replaceOneRoute = (route, index) => ({
  type: constants.REPLACE_ONE,
  routes,
  index
});

/** @description Create an APPEND action to be dispatched
 * @param {route} routes A MIDI route
 * @returns {{ type: string, route: { in: *, out: * } }} A redux action
 */
const appendRoute = (route) => ({
  type: constants.APPEND,
  route
})

/**
 * Create a UPDATE_INDEX action
 * @param {{ index: number, payload: object }} indexAndPayload The index and a key value pair to update at index
 * @returns {{ type: string, index: number, payload: object }} A redux action
 */
const updateIndex = ({ index, payload }) => ({
  type: constants.UPDATE_INDEX,
  index,
  payload
})

module.exports = {
  replaceAllRoutes,
  replaceOneRoute,
  appendRoute,
}
