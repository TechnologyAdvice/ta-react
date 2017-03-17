const path = require('path')

require('genesis-core').dev({
  verbose: true,
  dir_root: path.resolve(__dirname, '../'),
})
