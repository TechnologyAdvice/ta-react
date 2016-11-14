import createReducer from '../../../src/redux/create-reducer'

describe('(Redux) createReducer', () => {
  it('returns a function', () => {
    createReducer({})
      .should.be.a('function')
  })

  it('dispatches to the matching action handler if it exists', () => {
    const handler = sinon.spy()
    const reducer = createReducer({
      MY_ACTION: handler,
    })

    const state = {}
    const action = { type: 'MY_ACTION' }
    reducer(state, action)
    handler.should.have.been.calledWithExactly(state, action)
  })

  it('returns the result of the matched action handler', () => {
    const reducer = createReducer({
      MY_ACTION: () => ({ value: 'result' }),
    })

    reducer({ value: 'initial' }, { type: 'MY_ACTION' })
      .should.deep.equal({ value: 'result' })
  })

  it('returns the state it receives if no handler exists', () => {
    const handler = sinon.spy()
    const reducer = createReducer({
      MY_ACTION: handler,
    })

    const state = {}
    const action = { type: '@@__unmatched__@@' }
    const nextState = reducer(state, action)
    handler.should.not.have.been.called()
    nextState.should.equal(state)
  })
})
