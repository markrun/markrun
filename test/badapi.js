var markrun = require('../')
var util = require('./util/index')
var expect = require('expect.js')
describe('badapi.js', function() {
    describe('# output', function() {
        it('badapi.output', function() {
            var markrun = require('../index')
            markrun.setOptions({
                template: ''
            })

            expect(
                markrun('11[some](./some.md)', {
                    badAPI: {
                        output: function (html) {
                            return html.replace(/\.md/g, './html')
                        }
                    }
                })
            ).to.eql(
                '<p>11<a href="./some./html">some</a></p>'
            )
        })
    })
})
