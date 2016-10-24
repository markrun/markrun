# render data

`markrun` support completely customize the renderings.

    <!-- {
        author: 'nimo'
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
        M_lastRun: true
    },
    codeTemplate: markrun.string(function () {
/*!
<div class="markrun markrun--<%= lang %>">
    <div class="markrun-code">
    <% if(lang === 'js') {%>
    <script data-markrun-lastrun="<%= M_lastRun %>" >
        <%= __code %>
    </script>
    <% } %>
    <% if(lang === 'css') {%>
    <style>
        <%= __code %>
    </style>
    <% } %>
    <% if(lang === 'html') {%>
        <%= __code %>
    <% } %>
    </div>
    <div class="markrun-source">
        <pre class="markrun-source-pre" ><%= __source %></pre>
    </div>
</div>
*/
    })
})
```

**!!!** An `codeTemplate` in an `<script>` must have `data-markrun-lastrun="<%= M_lastRun %>"`

`<script data-markrun-lastrun="true" >` Will be append body.

```js
$('script[data-markrun-lastrun]').append('body')
```