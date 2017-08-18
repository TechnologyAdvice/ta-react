import { observable } from 'mobx'

export type Notification = {
  id: string,
  message: string,
  timeout: number | false,
  type: string,
}

export default class Notifications {
  @observable banner = null
  @observable notifications: Array<Notification> = []

  _uuid (): string {
    return '' + Date.now()
  }

  _create (type: string, message: string, timeout: number | false = 5000) {
    this.notifications = this.notifications.concat({
      id: this._uuid(),
      type,
      message,
      timeout,
    })
  }

  clear () {
    this.notifications = []
  }

  list () {
    return this.notifications
  }

  dismiss = (id: string): void => {
    this.notifications = this.notifications.filter(n => n.id !== id)
  }

  info = (message: string, timeout?: number | false): void => {
    this._create('info', message, timeout)
  }

  danger = (message: string, timeout?: number | false): void => {
    this._create('danger', message, timeout)
  }

  success = (message: string, timeout?: number | false): void => {
    this._create('success', message, timeout)
  }

  warning = (message: string, timeout?: number | false): void => {
    this._create('warning', message, timeout)
  }

  // Convert different types of errors (JavaScript runtime + axios network response errors)
  // into a standardized error object.
  _normalizeError = (err: any): Error => {
    // JavaScript error
    if (err && err.message) {
      const error = new Error(err.message)
      return error
    }

    // Network error
    if (err && err.response) {
      const error = new Error(err.response.data.message || 'Unknown network error')
      // error.status = err.response.status
      return error
    }

    const error = new Error('Unhandled exception')
    return error
  }

  fromError = (err: any): void => {
    const error = this._normalizeError(err)
    // const notificationMessage = error.status ? `${error.status}: ${error.message}` : error.message
    const notificationMessage = error.message

    this.danger(notificationMessage, 10000)
  }
}
