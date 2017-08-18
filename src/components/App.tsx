import * as React from 'react'
import { observer, Provider as MobxProvider } from 'mobx-react'
import NotificationProvider from './NotificationProvider'

export interface AppProps {
  children: any,
  store: any,
}
export const App = ({ children, store }: AppProps) => {
  return (
    <MobxProvider {...store}>
      <div>
        <NotificationProvider />
        {children}
      </div>
    </MobxProvider>
  )
}

export default observer(App)
