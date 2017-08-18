import * as React from 'react'

export interface NotificationProps {
  id: string,
  type: string,
  message: string,
  onDismiss: (notificationId: string) => any,
  timeout?: number | false,
}
export interface NotificationState {
  transition: 'enter' | 'leave' | null,
}
export class Notification extends React.Component<NotificationProps, NotificationState> {
  _dismissing: boolean
  _autoDismiss: any

  state: NotificationState = {
    transition: null,
  }

  componentWillMount() {
    this._dismissing = false
    if (this.props.timeout) {
      this._autoDismiss = setTimeout(this._onDismiss, this.props.timeout)
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({ transition: 'enter' }))
    })
  }

  componentWillUnmount() {
    if (this._autoDismiss) clearTimeout(this._autoDismiss)
  }

  _onDismiss = () => {
    if (this._dismissing) return

    this._dismissing = true
    this.setState({ transition: 'leave' }, () => {
      setTimeout(() => {
        this.props.onDismiss(this.props.id)
      }, 250)
    })
  }

  render() {
    let classes = `notification notification--${this.props.type}`

    if (this.state.transition) {
      classes += ` notification--${this.state.transition}`
    }

    return (
      <div className={classes} onClick={this._onDismiss}>
        <div className='notification__message'>
          {this.props.message}
        </div>
      </div>
    )
  }
}

export default Notification
