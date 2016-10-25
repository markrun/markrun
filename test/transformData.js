var markrun = require('../index')
var util = require('./util/index')
var expect = require('expect.js')
var md5 = require('md5')
var marked = require('marked')
describe('transformData', function() {
    describe('# codeTemplate', function() {
        it('should <!-- {md: ""} --> md => html', function() {
            var file = util.read('transformData', 'codeTemplate')
            util.eql(
                markrun(file.md, {
                    codeTemplateTransformData: function (data) {
                        data.md = data.md || ''
                        data.md = marked(data.md)
                        return data
                    },
                    codeTemplate: [
                        '<div class="markrun markrun--<%- __lang %>">',
                        '    <div class="markrun-md"><%- md %></div>',
                        '    <div class="markrun-code">',
                        '    <% if(__lang === "js") {%>',
                        '    <script data-markrun-lastrun="<%- markrun_lastrun %>" >',
                        '        <%- __code %>',
                        '    </script>',
                        '    <% } %>',
                        '    <% if(__lang === "css") {%>',
                        '    <style>',
                        '        <%- __code %>',
                        '    </style>',
                        '    <% } %>',
                        '    <% if(__lang === "html") {%>',
                        '        <%- __code %>',
                        '    <% } %>',
                        '    </div>',
                        '    <div class="markrun-source">',
                        '        <pre class="markrun-source-pre" ><%- __source %></pre>',
                        '    </div>',
                        '</div>'
                        ].join('\n')
                    }),
                    file.html,
                    file.path
            )
        })
        it('should return <title>markrun template</title> ', function() {
            var file = util.read('transformData', 'template')
            util.eql(
                markrun(file.md, {
                    templateDefaultData: {
                        titleprefix: '',
                        theme: '',
                        keywords: '',
                        description: ''
                    },
                    templateTransformData: function (data) {
                        data.title = data.titleprefix + '|' + data.title + '|' + md5(data.title)
                        return data
                    }
                    }),
                    file.html,
                    file.path
            )
        })
    })
})
