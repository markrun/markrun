var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
describe('template.js', function() {
    describe('# function', function() {
        it('should return templateData', function() {
            var html = markrun("<!--MR-D{nimo:'24'}-->any", {
                template: function (templateData) {
                    return JSON.stringify(templateData)
                }
            })
            expect(html).to.eql('{"title":"","theme":"","keywords":"","description":"","nimo":"24","content":"<p><!--MR-D{nimo:\'24\'}-->any</p>"}')
        })
    })
})
