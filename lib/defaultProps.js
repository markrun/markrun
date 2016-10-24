var string = require('./string')
// If this file is modified, it is necessary to consider version 1.y.z => 2.y.z
module.exports = function () {
    return {
        marked: require('./marked'),
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
'    <meta name="keywords" content="<%= keywords?keywords:title %>">',
'    <meta name="description" content="<%= description?description:title %>">',
'    <title><%= title %></title>',
'</head>',
'<body>',
'<%= content %>',
'</body>',
'</html>'
        ]),
        codeTemplateDefaultData: {

        },
        codeTemplate: string([
'<div class="markrun markrun--<%= lang %>">',
'    <div class="markrun-code">',
'    <% if(lang === "js") {%>',
'    <script data-markrun-lastrun="<%= M_lastRun %>" >',
'        <%= __code %>',
'    </script>',
'    <% } %>',
'    <% if(lang === "css") {%>',
'    <style>',
'        <%= __code %>',
'    </style>',
'    <% } %>',
'    <% if(lang === "html") {%>',
'        <%= __code %>',
'    <% } %>',
'    </div>',
'    <div class="markrun-source">',
'        <pre class="markrun-source-pre" ><%= __source %></pre>',
'    </div>',
'</div>'
        ])
    }
}
