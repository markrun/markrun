var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
describe('markrun-html.js', function() {
    describe('# basic', function() {
        it('should return "This text is display"', function() {
            var file = util.read('markrun-html', 'basic')
            util.eql(
                markrun(file.md),
                file.html,
                file.path
            )
        })
    })
    describe('# one-line', function() {
        it('should return "<div>nimo</div>"', function() {
            var file = util.read('markrun-html', 'one-line')
            util.eql(
                markrun(file.md),
                file.html,
                file.path
            )
        })
    })
    describe('# markdown', function() {
        it('should return markdown', function() {
            var file = util.read('markrun-html', 'markdown')
            util.eql(
                markrun(file.md),
                file.html,
                file.path
            )
        })
    })
})
