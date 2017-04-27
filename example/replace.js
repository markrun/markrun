var markrun = require('../lib/index')
// var markrun = require('markrun')
var hljs = require('highlight.js')
var fs = require('fs')
var path = require('path')
var json5 = require('json5')
var md = fs.readFileSync(__dirname + '/replace.md').toString()
var infoData = {
    filepath: __dirname + '/replace.html',
}
fs.writeFileSync(
    infoData.filepath,
    markrun(md, {
        // template: '<%- content %>',
        compile: {
            'replace': function (source, data, info) {
                var render = json5.parse(source)
                var jspath = path.join(path.dirname(info.filepath), render.file)
                var desc = markrun(render.desc, {
                    template: '<%- content %>'
                })
                var jscontent = fs.readFileSync(jspath).toString()
                var code = hljs.highlight('js', jscontent).value

                var html = '<div class="markrun-box"> \n\
                    <div class="markrun-box-preview"> \n\
                        <div class="markrun-box-preview-node">' +
                            render.html +
                        '</div> \n\
                        <div class="markrun-box-preview-doc">\n\
                            <div class="markrun-box-preview-doc-title">\n\
                                <span class="markrun-box-preview-doc-title-text">' +
                                    render.title +
                                '</span>\n\
                            </div> \n\
                            <div class="markrun-box-preview-doc-desc">' +
                                desc +
                            '</div>\n\
                        </div>\n\
                    </div>\n\
                    <div class="markrun-box-code">\n\
                        <span class="markrun-box-code-copy">COPY</span>\n\
                        <pre class="markrun-box-code-source" >' +
                            code +
                        '</pre>\n\
                    </div>\n\
                    <span class="markrun-box-toggle"></span>\n\
                </div>'

                return {
                    lang: 'replace',
                    code: html
                }
            }
        }
    }, infoData)
)
