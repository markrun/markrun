var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
describe('replace.js', function() {
    describe('# basic', function() {
        it('replace', function() {
            var file = util.read('replace', 'basic')
            util.eql(
                markrun(file.md, {}, {filepath: file.path + '.md'}),
                file.html,
                file.path
            )
        })
    })
})
