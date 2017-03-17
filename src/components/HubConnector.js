import React from 'react'
import withTAClient from '../hoc/with-ta-client'

class HubConnector extends React.PureComponent {
  state = {
    isLoading: true,
    response: null,
    error: null,
  }

  componentDidMount() {
    this._makeRequest(this.props)
  }

  // TODO(zuko): only make request if necessary
  componentWillReceiveProps(nextProps) {
    this._makeRequest(nextProps)
  }

  _makeRequest({ model, id, page, pageSize }) {
    this.setState({ isLoading: true, response: null, error: null })

    const client = this.props.taClient

    let promise
    if (id) {
      promise = client[model].get(id)
    } else {
      const opts = {}
      if (pageSize) {
        opts['x-limit'] = pageSize
        opts['x-lastkey'] = pageSize * page
      }
      promise = client[model].list({}, { headers: opts })
    }
    return promise
      .then(this._onRequestSuccess, this._onRequestFailure)
  }

  _onRequestSuccess = (res) => {
    this.setState(() => ({ isLoading: false, response: res.data }))
    if (this.props.onSuccess) this.props.onSuccess(res.data)
  }

  _onRequestFailure = (err) => {
    const error = err || new Error('Server Error')

    this.setState(() => ({ isLoading: false, error }))
    if (this.props.onError) this.props.onError(error)
  }

  render() {
    if (this.state.isLoading && this.props.renderLoader) {
      return this.props.renderLoader()
    }
    if (this.state.error && this.props.renderError) {
      return this.props.renderError(this.state.error)
    }
    // The request is pending or errored, but no renderer for that state was
    // provided, so don't render anything.
    if (this.state.error || this.state.isLoading) {
      return null
    }
    return this.props.children(this.state.response)
  }
}

export default withTAClient(HubConnector)
