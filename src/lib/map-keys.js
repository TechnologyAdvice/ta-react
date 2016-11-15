const mapKeys = (fn, obj) => Object.keys(obj)
  .reduce((acc, key) => {
    acc[fn(key)] = obj[key]
    return acc
  }, {})

export default mapKeys
