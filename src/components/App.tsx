import * as React from 'react'
import { Provider as MobxProvider } from 'mobx-react'

export interface AppProps {
  children: any,
  store?: any,
}
export interface AppState {
  modal: {
    open: boolean,
    component: any,
    props: any,
  },
}
class App extends React.Component<AppProps> {
  render () {
    return (
      <MobxProvider {...this.props.store}>
        {this.props.children}
      </MobxProvider>
    )
  }
}

export default App
