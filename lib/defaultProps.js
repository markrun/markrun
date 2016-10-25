var string = require('./string')
var highlight = require('./vendor/highlight.js/lib/index')
// If this file is modified, it is necessary to consider version 1.y.z => 2.y.z
module.exports = {
        compile: {
            'js': function (source, data) {
                return {
                    lang: 'js',
                    code: source
                }
            },
            'css': function (source, data) {
                return {
                    lang: 'css',
                    code: source
                }
            },
            'html': function (source, data) {
                return {
                    lang: 'html',
                    code: source
                }
            }
        },
        highlight: function (source) {
            return highlight.highlightAuto(source).value
        },
        markdownParser: require('./marked'),
        templateDefaultData: {
            theme: '',
            keywords: '',
            description: ''
        },
        template: string([
'<!DOCTYPE html>',
'<html lang="en">',
'<head>',
'    <meta charset="UTF-8">',
'    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
'    <meta http-equiv="X-UA-Compatible" content="ie=edge">',
'    <meta name="keywords" content="<%- keywords?keywords:title %>">',
'    <meta name="description" content="<%- description?description:title %>">',
'    <title><%- title %></title>',
'<link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/atom-one-dark.css" />',
'<style>.markrun-source-pre {color: #abb2bf;background: #282c34;display: block;padding: 1em;overflow: auto;border-radius:.2em;}</style>',
'</head>',
'<body>',
'<%- content %>',
'</body>',
'</html>'
        ]),
        codeTemplateDefaultData: {
            markrun_lastrun: true
        },
        codeTemplate: string([
'<div class="markrun markrun--<%- __lang %>">',
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
        ])
}
