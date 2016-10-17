var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
describe('MARKRUN-CODE', function() {
    describe('# basic', function() {
        it('should return "This text is display"', function() {
            var file = util.read('markrun-code', 'basic')
            util.eql(
                markrun(file.md),
                file.html,
                file.path,
                true
            )
        })
    })
    describe('# one-line', function() {
        it('should return "<div>nimo</div>"', function() {
            var file = util.read('markrun-code', 'one-line')
            util.eql(
                markrun(file.md),
                file.html,
                file.path
            )
        })
    })
})
