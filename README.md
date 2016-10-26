# ta-react

## Table of Contents
1. [Installation](#installation)
1. [Redux](#redux)

## Installation

```bash
npm i --save ta-react
```

## Redux

### `createReducer`
`createReducer(actionHandlers: Object, initialState: any) => Function`

Generates a reducer that looks up the action's type in the provided action
handlers and, if it exists, dispatches to that function and returns the
result. If no handler is found for the action type the state is returned
unmodified.

```js
import createReducer from 'ta-react/redux/create-reducer'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

const addReducer = createReducer({
  [INCREMENT]: (state, action) => state + 1,
  [DECREMENT]: (state, action) => state - 1,
}, 0)
```

### `createStore`
`creatStore(rootReducer: Object, initialState?: any) => Store`

Creates an instance of a redux store with preconfigured middleware and enhancers.
Accepts a root reducer that handles dispatched actions and an optional `initialState`
for the store.

```js
import createStore from 'ta-react/redux/create-store'
import rootReducer from './rootReducer'

const INTITIAL_STATE = undefined

const store = createStore(rootReducer, INTITIAL_STATE)
```

## Releasing

On the latest clean `master`:

```sh
npm run release:major
npm run release:minor
npm run release:patch
```

**Heads Up!**

The `/src` directory is flattened to the root of the project on `prerelease` to allow imports like `'ta-react/redux/create-store'`.  It cleans up on success.  If it fails run `npm run postrelease` manually to clean up.
