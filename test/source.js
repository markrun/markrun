var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
describe('source.js', function() {
    describe('# basic', function() {
        it('no return source', function() {
            var file = util.read('source', 'no-return-source')
            util.eql(
                markrun(file.md),
                file.html,
                file.path
            )
        })
        it('change source', function() {
            var file = util.read('source', 'change-source')
            util.eql(
                markrun(file.md, {
                    compile: {
                        'jsx': function (source) {
                            return {
                                lang: 'html',
                                code: source,
                                source: source.replace(/class=/g, "className=")
                            }
                        }
                    }
                }),
                file.html,
                file.path,true
            )
        })
    })
})
