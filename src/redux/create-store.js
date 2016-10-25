import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'

/**
 * @name createStore
 * @description
 * Creates an instance of a redux store with preconfigured middleware and
 * enhancers. Accepts a root reducer that handles dispatched actionst s and an
 * optional `initialState` for the store.
 *
 * @param {Object} rootReducer - The root reducer of the store. All actions will
 * flow through this reducer.
 * @param {Object} [initialState] - The initial state of the store. Useful for
 * rehydrating the application on subsequent loads.
 * @returns {Object} - the redux store instance.
 */
function createStore(rootReducer, initialState) {
  const enhancers = []

  if (process.env.NODE_ENV === 'development') {
    if (typeof global.devToolsExtension === 'function') {
      enhancers.push(global.devToolsExtension())
    }
  }

  const middleware = applyMiddleware(thunk)
  return createReduxStore(rootReducer, initialState, compose(middleware, ...enhancers))
}

export default createStore
