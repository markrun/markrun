var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
describe('markrun-data-comments.js', function() {
    describe('# markrun-data-comments', function() {
        it('html title desc', function() {
            var file = util.read('markrun-data-comments', 'html-title-desc')
            util.eql(
                markrun(file.md),
                file.html,
                file.path
            )
        })
    })
})
