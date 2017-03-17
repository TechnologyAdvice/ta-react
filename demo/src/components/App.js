import React from 'react'
import TAClient from '@technologyadvice/ta-client'
import Playground from '../components/Playground'

const taClient = new TAClient({ env: 'staging' })

export class App extends React.Component {
  static childContextTypes = {
    ta: React.PropTypes.object,
  }

  getChildContext() {
    return {
      ta: {
        client: taClient,
      },
    }
  }

  render() {
    return <Playground />
  }
}

export default App
