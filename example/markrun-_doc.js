var markrun = require('../lib/index')
// var markrun = require('markrun')
var hljs = require('highlight.js')
var fs = require('fs')
var path = require('path')
var json5 = require('json5')
var md = fs.readFileSync(__dirname + '/markrun-_doc.md').toString()
var infoData = {
    filepath: __dirname + '/markrun-_doc.html',
}
fs.writeFileSync(
    infoData.filepath,
    markrun(md, {
        template: '<%- content %>',
        compile: {
            '_doc': function (source, data, info) {
                var render = json5.parse(source)
                var jspath = path.join(path.dirname(info.filepath), render.file)
                var html = markrun(render.doc, {
                    template: '<%- content %>'
                })
                var jscontent = fs.readFileSync(jspath).toString()
                html = '<pre>' + hljs.highlight('js', jscontent).value + '</pre>\n' + html
                return {
                    lang: '__code',
                    code: html
                }
            }
        }
    }, infoData)
)
