var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
describe('markrun error message', function() {
    describe('# jsonnet', function() {
        it('should return Jsonnet format error:', function() {
            var file = util.read('error', 'jsonnet')
            var errorMessage = ''
            try {
                util.eql(
                    markrun(file.md),
                    file.html,
                    file.path
                )
            }
            catch (e) {
                errorMessage = e.message
            }
            expect(errorMessage).to.eql(
                'Jsonnet format error: {\n'+
                'a:\n'+
                '}'
            )
        })
    })
})
