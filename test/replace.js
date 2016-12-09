var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
describe('replace.js', function() {
    describe('# basic', function() {
        it('replace', function() {
            var file = util.read('replace', 'basic')
            var info = {filepath: file.path + '.md'}
            util.eql(
                markrun(file.md, {}, info),
                file.html,
                file.path
            )
            expect(markrun.uniq(info.deps).length).to.equal(1)
            expect(markrun.uniq(info.deps)[0]).to.match(/props\.js/)
        })
    })
})
