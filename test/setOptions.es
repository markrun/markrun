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
        it('hightlight', function () {
            var markrun = require('../index')
            markrun.setOptions({
                highlight: function (source, lang, data) {
                    console.log(source)
                    return source
                }
            })
            var file = util.read('setOptions', 'hightlight')
            util.eql(
                markrun(file.md),
                file.html,
                file.path
            )
        })
        it('multipleSettings', function () {
            var markrun = require('../index')
            markrun.setOptions({
                highlight: function (source, lang, data) {
                    return source
                }
            })
            var file = util.read('setOptions', 'multipleSettings')
            util.eql(
                markrun(file.md, {template: '<%- content %>!end'}),
                file.html,
                file.path
            )
        })
    })
})
