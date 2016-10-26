var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
describe('run-css.js', function() {
    describe('# basic', function() {
        it('should return <style>', function() {
            var file = util.read('run-css', 'basic')
            util.eql(
                markrun(file.md),
                file.html,
                file.path,true
            )
        })
    })
})
