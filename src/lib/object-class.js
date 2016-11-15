/**
 * Returns the object class for any value.
 *
 * @param {*} [value] - A value whose object class should be determined.
 *
 * @example
 * const isNull = objectClass(null) === 'null'
 * const isPOJO = objectClass({}) === 'object'
 *
 * @returns {String}
 */
const objectClass = (value) => /\[\w+ (\w+)]/.exec(Object.prototype.toString.call(value))[1].toLowerCase()

export default objectClass
