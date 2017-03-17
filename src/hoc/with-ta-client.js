import React from 'react'

const withTAClient = (WrappedComponent) => {
  class WithTAClient extends React.Component {
    static contextTypes = {
      ta: React.PropTypes.object,
    }

    render() {
      return React.createElement(WrappedComponent, {
        ...this.props,
        taClient: this.context.ta.client,
      })
    }
  }
  return WithTAClient
}

export default withTAClient
