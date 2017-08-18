import { inject } from 'mobx-react'

export type IWrappedComponent<Props> = React.ComponentClass<Props> | React.StatelessComponent<Props>

const connect = <MappedProps>(mapStoreToProps: (store: any) => MappedProps) => {
  return <WrappedProps>(WrappedComponent: IWrappedComponent<WrappedProps>) => {
    return inject(mapStoreToProps)(WrappedComponent)
  }
}

export default connect
