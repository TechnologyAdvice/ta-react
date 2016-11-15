import objectClass from '../../../src/lib/get-class'

describe('(Method) objectClass', () => {
  it('returns `Undefined` when called without an argument', () => {
    objectClass().should.equal('undefined')
  })
  it('returns the lowercased object class for any given value', () => {
    const objectClassMap = {
      array: [],
      boolean: true,
      error: new Error(),
      function: () => {},
      null: null,
      number: 1,
      object: {},
      string: '',
      undefined,
    }

    Object.keys(objectClassMap).forEach(key => {
      objectClass(objectClassMap[key]).should.equal(key)
    })
  })
})
