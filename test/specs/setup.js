require('babel-register')()
const chai = require('chai')

// ------------------------------------
// Assertion Setup
// ------------------------------------
chai.should()
global.sinon = require('sinon')
global.expect = chai.expect
chai.use(require('sinon-chai'))
chai.use(require('chai-as-promised'))
chai.use(require('dirty-chai'))
