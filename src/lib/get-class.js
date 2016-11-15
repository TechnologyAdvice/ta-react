/**
 * Returns the object class for any value.
 *
 * @param {*} [value] - A value whose object class should be determined.
 *
 * @example
 * const isNull = getClass(null) === 'null'
 * const isPOJO = getClass({}) === 'object'
 *
 * @returns {String}
 */
const getClass = (value) => /\[\w+ (\w+)]/.exec(Object.prototype.toString.call(value))[1].toLowerCase()

export default getClass
