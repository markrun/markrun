var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
describe('info.js', function() {
    describe('# basic', function() {
        it('markrun._', function() {
            expect(typeof markrun._).to.be('function')
        })
        it('markrun.package', function() {
            expect(typeof markrun.package).to.be('object')
        })
        it('should add "file:/a.js"', function() {
            var file = util.read('info', 'basic')
            util.eql(
                markrun(
                    file.md,
                    {
                        compile: {
                            'js': function (source, data, info) {
                                return {
                                    lang: 'js',
                                    code: source + 'file:' + info.filepath
                                }
                            }
                        }
                    },
                    {
                        filepath: '/a.js'
                    }
                ),
                file.html,
                file.path
            )
        })
    })
})
