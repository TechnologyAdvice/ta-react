import createConstants from '../../../src/redux/create-constants'

describe('(Redux) createConstants', () => {
  it('returns an object with mirrored key/value pairs', () => {
    createConstants(['A', 'B', 'C'])
      .should.deep.equal({
        A: 'A',
        B: 'B',
        C: 'C',
      })
  })
})
