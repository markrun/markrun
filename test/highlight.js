var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
var highlight = require('../lib/vendor/highlight.js/lib/index.js')
describe('highlight.js', function() {
    describe('# basic', function() {
        it('should return no highlight ', function() {
            var file = util.read('highlight', 'basic')
            util.eql(
                markrun(file.md, {
                    highlight: function (source, data) {
                        return source
                    }
                }),
                file.html,
                file.path
            )
        })
        it('should return data control highlight ', function() {
            var file = util.read('highlight', 'data')
            util.eql(
                markrun(file.md, {
                    codeTemplateDefaultData: {
                        markrun_lastrun: true,
                        html: '',
                        hljs: true
                    },
                    highlight: function (source, data) {
                        if (data.hljs) {
                            return highlight.highlightAuto(source).value
                        }
                        else {
                            return source
                        }

                    }
                }),
                file.html,
                file.path
            )
        })
    })
})
