var util = require('./util/index')
var expect = require('expect.js')
describe('setOptions.js', function() {
    describe('# basic', function() {
        it('tempalte: "" should return no body', function() {
            var markrun = require('../index')
            markrun.setOptions({
                template: ''
            })
            var file = util.read('setOptions', 'template')
            util.eql(
                markrun(file.md),
                file.html,
                file.path
            )
        })
    })
})
