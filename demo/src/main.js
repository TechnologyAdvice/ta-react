import React from 'react'
import ReactDOM from 'react-dom'

// Mount App
// ------------------------------------
const MOUNT_NODE = document.createElement('div')
MOUNT_NODE.id = 'root'
document.body.appendChild(MOUNT_NODE)

let render = () => {
  const App = require('./components/App').default

  ReactDOM.render(
    <App />,
    MOUNT_NODE
  )
}

if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    render = () => {
      try {
        renderApp()
      } catch (e) {
        console.error(e) // eslint-disable-line
      }
    }

    module.hot.accept('./components/App', () => {
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    })
  }
}

render()
