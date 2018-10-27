const constants = require('./constants');

/** @description Create a REPLACE_ALL action to be dispatched
 * @param {[route]} routes All MIDI routes
 * @returns {{ type: string, routes: [{ in: *, out: * }] }} A redux action
 */
const replaceAllRoutes = routes => ({
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
  route,
  index,
});

/** @description Create an APPEND action to be dispatched
 * @param {route: { in: *, out: * }} routes A MIDI route
 * @returns {{ type: string, route: { in: *, out: * } }} A redux action
 */
const appendRoute = route => ({
  type: constants.APPEND,
  route,
});

/** @description Create a ROUTE_ACTION action
 * @param {number} index The route
 * @param {*} routeAction A sub action to be applied to route specified at index
 * @returns {{ type: string, index: number, routeAction }} A redux action
 */
const routeAction = (index, routeAction) => ({
  type: constants.UPDATE_INDEX,
  index,
  routeAction,
});

module.exports = {
  replaceAllRoutes,
  replaceOneRoute,
  appendRoute,
  routeAction,
};
