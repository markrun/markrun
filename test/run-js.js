var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
describe('run-js.js', function() {
    describe('# basic', function() {
        it('should return "pre & script"', function() {
            var file = util.read('run-js', 'basic')
            util.eql(
                markrun(file.md),
                file.html,
                file.path
            )
        })
    })
})
