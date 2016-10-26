var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
describe('run-html.js', function() {
    describe('# basic', function() {
        it('should return html', function() {
            var file = util.read('run-html', 'basic')
            util.eql(
                markrun(file.md),
                file.html,
                file.path
            )
        })
    })
})
