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

const store = createStore(rootReducer)
```

## Releasing

On the latest clean `master`:

```sh
npm run release:major
npm run release:minor
npm run release:patch
```
