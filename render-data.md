# render data

`markrun` support completely customize the renderings.

    <!-- {
        "author": "nimo"
    } -->
    ````js
    console.log('markrun')
    ````

```js
markrun(content, {
    compile: function () {
        'js': function (source, data) {
            var code = source
            if (data.nimo) {
                code = code + '/*! author: '+ data.nimo +' */'
            }
            return {
                lang: 'js',
                code: code
            }
        }
    }
})
```

## codeTemplate

```js
markrun(content, {
    codeTemplateDefaultData: {
        markrun_lastrun: true
    },
    codeTemplate: markrun.string([
'<div class="markrun markrun--<%- __lang %>">',
'    <div class="markrun-html"><%- html %></div>',
'    <div class="markrun-code">',
'    <% if(__lang === "js") {%>',
'    <script data-markrun-lastrun="<%- markrun_lastrun %>">',
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
'        <pre class="markrun-source-pre"><%- __source %></pre>',
'    </div>',
'</div>'
    ])
})
```

**!!!** An `codeTemplate` in an `<script>` must have `data-markrun-lastrun="<%= markrun_lastrun %>"`

`<script data-markrun-lastrun="true" >` Will be append body.

```js
$('script[data-markrun-lastrun]').append('body')
```
