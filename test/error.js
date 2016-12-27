var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
describe('error.js', function() {
    describe('# MARKRUN-DATA json5', function() {
        it('should return (MARKRUN-DATA) "Json5 format error:"', function() {
            var file = util.read('error', 'markrun-data')
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
            expect(errorMessage).to.eql(file.html.trim())
        })
        it('should return (MARKRUN-DATA) json5', function() {
            markrun("<!--{some: 'name'}-->\n````js\nconsole.log(1)\n````", {template: '<%- content %>'})
        })
    })
    describe('# compile is ""', function() {
        it('should return "You need to specify the compilation"', function() {
            var file = util.read('error', 'compileName-is-empty-string')
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
            expect(errorMessage).to.eql(file.html.trim())
        })
    })
    describe('# compileName is undefined""', function() {
        it('should return "Not find compile:"', function() {
            var file = util.read('error', 'compileNameIsUndefined')
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
            expect(errorMessage).to.eql(file.html.trim())
        })
    })
    describe('# compile not return lang & code', function() {
        it('should return "return object.lang is undefined"', function() {
            var file = util.read('error', 'compileNotReturnLang')
            var errorMessage = false
            try {
                util.eql(
                    markrun(file.md, {
                        compile: {
                            demo: function (source, data) {return {code: source}}
                        }
                    }),
                    file.html,
                    file.path
                )
            }
            catch (e) {
                errorMessage = e.message
            }
            expect(errorMessage).to.be.a('string')
        })
        it('should return "return object.code is undefined"', function() {
            var file = util.read('error', 'compileNotReturnCode')
            var errorMessage = false
            try {
                util.eql(
                    markrun(file.md, {
                        compile: {
                            demo: function (source, data) {return {lang: 'js'}}
                        }
                    }),
                    file.html,
                    file.path
                )
            }
            catch (e) {
                errorMessage = e.message
            }
            expect(errorMessage).to.be.a('string')
        })
    })

})
