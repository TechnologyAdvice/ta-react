/**
 * @name createConstants
 * @description
 * Creates an object with mirrored key/values from an array of strings.
 *
 * @example
 * const constants = createConstants([
 *  'USER_FETCH_REQUEST',
 *  'USER_FETCH_SUCCESS',
 *  'USER_FETCH_FAILURE',
 * ])
 *
 * constants.USER_FETCH_REQUEST // => 'USER_FETCH_REQUEST'
 * @param {String[]} constants - An array containing string values to mirror
 * as constants.
 * @returns {Object} - An object where each constant is mirrored as a key/value.
*/
function createConstants(constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant
    return acc
  }, {})
}

export default createConstants
