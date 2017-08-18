import * as React from 'react'
import Notification from './Notification'
import { Notification as INotification } from '../stores/notifications'
import connect from '../stores/connect'

export interface Props {
  notifications: Array<INotification>,
  dismissNotification: (id: string) => any,
}
export const NotificationProvider = ({ notifications, dismissNotification }: Props) => (
  <div className='notifications-provider' role='alert'>
    {notifications.map((notification) => (
      <Notification
        key={notification.id}
        id={notification.id}
        type={notification.type}
        message={notification.message}
        timeout={notification.timeout}
        onDismiss={dismissNotification}
      />
    ))}
  </div>
)

export default connect((store): Props => ({
  notifications: store.notifications.list(),
  dismissNotification: store.notifications.dismiss,
}))(NotificationProvider as any)
