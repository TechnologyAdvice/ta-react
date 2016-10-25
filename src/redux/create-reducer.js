/**
 * @name createReducer
 * @description
 * Generates a reducer that looks up the action's type in the provided action
 * handlers and, if it exists, dispatches to that function and returns the
 * result. If no handler is found for the action type the state is returned
 * unmodified.
 *
 * @example
 * const addReducer = createReducer({
 *   INCREMENT: (state, action) => state + 1,
 *   DECREMENT: (state, action) => state - 1,
 * }, 0)
 *
 * @param {Object} actionHandlers - An object where each key corresponds to a handled
 * action type and its value is the handler for the action.
 * @param {*} initialState - The initialState for the reducer, can be of any type.
 * @returns {Function} the generated reducer function that will look up a
 * received action's type in the provided `actionHandlers` and dispatch to the
 * handling function if it exists.
*/
function createReducer(actionHandlers, initialState) {
  return function generatedReducer(state = initialState, action) {
    if (actionHandlers[action.type]) {
      return actionHandlers[action.type](state, action)
    }
    return state
  }
}

export default createReducer
