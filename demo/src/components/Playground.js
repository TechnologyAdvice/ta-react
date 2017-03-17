import React from 'react'
import HubConnector from '../../../src/components/HubConnector'

export class Playground extends React.Component {
  render() {
    return (
      <div>
        <HubConnector model='users'>
          {users => (
            <ul>
              {users.map(user => <li key={user.id}>{user.email}</li>)}
            </ul>
          )}
        </HubConnector>
      </div>
    )
  }
}

export default Playground
