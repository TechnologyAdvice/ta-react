import Notifications from '../stores/notifications'

const createStore = (stores?: any) => ({
  notifications: new Notifications(),
  ...stores,
})

export default createStore
