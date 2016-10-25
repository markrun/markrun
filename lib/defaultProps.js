// To facilitate users to copy the default parameters
var markrun = {
    string: require('./string')
}
var highlight = require('./vendor/highlight.js/lib/index')
// If this file is modified, it is necessary to consider version 1.y.z => 2.y.z
var defaultProps = {
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
    templateTransformData: function (data) {
        return data
    },
    templateDefaultData: {
        theme: '',
        keywords: '',
        description: ''
    },
    template: markrun.string([
'<!DOCTYPE html>',
'<html lang="en">',
'<head>',
'    <meta charset="UTF-8">',
'    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
'    <meta http-equiv="X-UA-Compatible" content="ie=edge">',
'    <meta name="keywords" content="<%- keywords?keywords:title %>">',
'    <meta name="description" content="<%- description?description:title %>">',
'    <title><%- title %></title>',
'<!-- https://highlightjs.org/static/demo/styles/atom-one-dark.css -->',
'<style>.hljs{display:block;overflow-x:auto;padding:0.5em;color:#abb2bf;background:#282c34}.hljs-comment,.hljs-quote{color:#5c6370;font-style:italic}.hljs-doctag,.hljs-keyword,.hljs-formula{color:#c678dd}.hljs-section,.hljs-name,.hljs-selector-tag,.hljs-deletion,.hljs-subst{color:#e06c75}.hljs-literal{color:#56b6c2}.hljs-string,.hljs-regexp,.hljs-addition,.hljs-attribute,.hljs-meta-string{color:#98c379}.hljs-built_in,.hljs-class .hljs-title{color:#e6c07b}.hljs-attr,.hljs-variable,.hljs-template-variable,.hljs-type,.hljs-selector-class,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-number{color:#d19a66}.hljs-symbol,.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-title{color:#61aeee}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:bold}.hljs-link{text-decoration:underline}</style>',
'<style>.markrun-source-pre {color: #abb2bf;background: #282c34;display: block;padding: 1em;overflow: auto;border-radius:.2em;}</style>',
'</head>',
'<body>',
'<%- content %>',
'</body>',
'</html>'
    ]),
    codeTemplateTransformData: function (data) {
        return data
    },
    codeTemplateDefaultData: {
        markrun_lastrun: true,
        html: ''
    },
    codeTemplate: markrun.string([
'<div class="markrun markrun--<%- __lang %>">',
'    <div class="markrun-html"><%- html %></div>',
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

module.exports = defaultProps
